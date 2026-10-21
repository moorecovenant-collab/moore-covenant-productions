"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { DateTime } from "luxon";
import { addClient, findClientByEmail, touchClient } from "@/lib/portal/clients";
import { createInvoice, setInvoiceStatus } from "@/lib/portal/invoices";
import { whenLabel } from "@/lib/portal/format";
import {
  addBlocked, availableSlots, callType, getSchedule, removeBlocked, saveSchedule, type Schedule,
} from "@/lib/portal/schedule";
import { supabaseAdmin } from "@/lib/portal/supabase";
import { devAuthEnabled, hasSupabase, isAdminEmail } from "@/lib/portal/config";
import { DEV_COOKIE, VIEW_AS_COOKIE, getSession } from "@/lib/portal/session";
import { supabaseServer } from "@/lib/portal/supabase";

type Result = { ok: true } | { ok: false; error: string };

const Email = z.string().trim().toLowerCase().pipe(z.email().max(200));

/** Step 1 of login. Only invited emails get a code, but the answer is the same either way. */
export async function requestCode(rawEmail: string): Promise<Result> {
  const parsed = Email.safeParse(rawEmail);
  if (!parsed.success) return { ok: false, error: "Enter a valid email address." };
  if (!hasSupabase) return { ok: false, error: "Sign in isn't switched on yet. Text Elijah and he'll get you in." };

  const email = parsed.data;
  const invited = isAdminEmail(email) || (await findClientByEmail(email));
  if (!invited) return { ok: true };

  const supabase = await supabaseServer();
  const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
  if (error) return { ok: false, error: "Couldn't send the code. Wait a minute and try again." };
  return { ok: true };
}

/** Step 2 of login. The code goes straight to Supabase, which sets the session cookie. */
export async function verifyCode(rawEmail: string, rawCode: string): Promise<Result> {
  const email = Email.safeParse(rawEmail);
  const code = z.string().trim().regex(/^\d{6,10}$/).safeParse(rawCode);
  if (!email.success || !code.success) return { ok: false, error: "Enter the code from your email." };
  if (!hasSupabase) return { ok: false, error: "Sign in isn't switched on yet." };

  const supabase = await supabaseServer();
  const { error } = await supabase.auth.verifyOtp({ email: email.data, token: code.data, type: "email" });
  if (error) return { ok: false, error: "That code didn't work. Check it and try again, or request a new one." };

  const session = await getSession();
  if (!session) {
    await supabase.auth.signOut();
    return { ok: false, error: "That email isn't set up for the portal yet. Text Elijah." };
  }
  if (session.role === "client") await touchClient(session.email);
  return { ok: true };
}

/** Local demo sign in. Refuses to run unless dev auth is on (never in production). */
export async function devLogin(role: "admin" | "client"): Promise<Result> {
  if (!devAuthEnabled) return { ok: false, error: "Not available." };
  const email = role === "admin" ? (process.env.ADMIN_EMAILS?.split(",")[0]?.trim() || "admin@demo.test") : "client@demo.test";
  const value = Buffer.from(JSON.stringify({ email })).toString("base64url");
  (await cookies()).set(DEV_COOKIE, value, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 });
  return { ok: true };
}

export async function signOut(): Promise<Result> {
  if (hasSupabase) {
    const supabase = await supabaseServer();
    await supabase.auth.signOut();
  }
  (await cookies()).delete(DEV_COOKIE);
  return { ok: true };
}

const Invite = z.object({
  name: z.string().trim().min(1).max(120),
  email: Email,
  company: z.string().trim().max(120).optional(),
});

/** Admin only. Adds a client to the invited list so they can sign in. */
export async function inviteClient(input: { name: string; email: string; company?: string }): Promise<Result> {
  const session = await getSession();
  if (session?.role !== "admin") return { ok: false, error: "Not allowed." };
  const parsed = Invite.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Add a name and a valid email." };
  try {
    await addClient(parsed.data);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Couldn't add that client." };
  }
}

// ---------- admin helpers ----------

async function adminOnly() {
  const session = await getSession();
  return session?.role === "admin" && !session.previewing ? session : null;
}
const NOT_ALLOWED: Result = { ok: false, error: "Not allowed." };
const fail = (e: unknown, fallback: string): Result => ({ ok: false, error: e instanceof Error ? e.message : fallback });

/** Admin only: look at the app exactly as one client sees it. Read only. */
export async function previewAs(clientId: string): Promise<Result> {
  if (!(await adminOnly())) return NOT_ALLOWED;
  (await cookies()).set(VIEW_AS_COOKIE, clientId, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 4 });
  return { ok: true };
}

export async function exitPreview(): Promise<Result> {
  (await cookies()).delete(VIEW_AS_COOKIE);
  return { ok: true };
}

// ---------- schedule ----------

const Hhmm = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);
const ScheduleInput = z.object({
  hours: z.record(
    z.string().regex(/^[1-7]$/),
    z.object({ start: Hhmm, end: Hhmm }).refine((h) => h.start < h.end).nullable()
  ),
  bufferMinutes: z.number().int().min(0).max(120),
  noticeHours: z.number().int().min(0).max(168),
  windowDays: z.number().int().min(7).max(90),
  meetLink: z.string().trim().max(300).refine((v) => v === "" || /^https:\/\//.test(v)),
});

export async function saveScheduleSettings(input: Schedule): Promise<Result> {
  if (!(await adminOnly())) return NOT_ALLOWED;
  const parsed = ScheduleInput.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Check the hours (start before end) and that the Meet link starts with https://." };
  try {
    await saveSchedule(parsed.data);
    return { ok: true };
  } catch (e) {
    return fail(e, "Couldn't save.");
  }
}

const Ymd = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export async function addAway(startDate: string, endDate: string): Promise<Result> {
  if (!(await adminOnly())) return NOT_ALLOWED;
  const a = Ymd.safeParse(startDate);
  const b = Ymd.safeParse(endDate || startDate);
  if (!a.success || !b.success || b.data < a.data) return { ok: false, error: "Pick a start date, and an end date on or after it." };
  try {
    await addBlocked(a.data, b.data);
    return { ok: true };
  } catch (e) {
    return fail(e, "Couldn't add those dates.");
  }
}

export async function removeAway(id: string): Promise<Result> {
  if (!(await adminOnly())) return NOT_ALLOWED;
  try {
    await removeBlocked(z.string().uuid().parse(id));
    return { ok: true };
  } catch (e) {
    return fail(e, "Couldn't remove that.");
  }
}

const FORMSPREE = "https://formspree.io/f/mzdwejlk";

async function notifyOwner(subject: string, fields: Record<string, string>) {
  try {
    await fetch(FORMSPREE, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ source: "Client portal", _subject: subject, ...fields }),
    });
  } catch {
    // the booking is saved either way; this is only the heads-up email
  }
}

const gcalLink = (title: string, start: DateTime, end: DateTime, details: string) => {
  const f = (d: DateTime) => d.toUTC().toFormat("yyyyLLdd'T'HHmmss'Z'");
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${f(start)}/${f(end)}&details=${encodeURIComponent(details)}`;
};

/** A client books an open time. Availability is re-checked on the server, and the database refuses double bookings. */
export async function bookSlot(input: { callType: string; start: string; notes?: string }): Promise<Result> {
  const session = await getSession();
  if (!session || session.role !== "client" || !session.clientId) return NOT_ALLOWED;
  if (session.previewing) return { ok: false, error: "You're previewing. Exit the preview to book." };

  const type = callType(input.callType);
  const start = DateTime.fromISO(input.start);
  if (!type || !start.isValid) return { ok: false, error: "Pick a time." };

  const days = await availableSlots(type.minutes);
  const stillOpen = days.some((d) => d.slots.some((sl) => DateTime.fromISO(sl.start).toMillis() === start.toMillis()));
  if (!stillOpen) return { ok: false, error: "That time just got taken. Pick another." };

  const end = start.plus({ minutes: type.minutes });
  const notes = (input.notes ?? "").trim().slice(0, 500) || null;
  const { error } = await supabaseAdmin().from("bookings").insert({
    client_id: session.clientId,
    call_type: type.id,
    starts_at: start.toUTC().toISO(),
    ends_at: end.toUTC().toISO(),
    notes,
  });
  if (error) return { ok: false, error: error.code === "23P01" ? "That time just got taken. Pick another." : "Couldn't book that. Try again." };

  const when = whenLabel(start.toUTC().toISO()!);
  await notifyOwner(`New booking: ${session.name}, ${type.label}, ${when}`, {
    name: session.name,
    email: session.email,
    when,
    call: type.label,
    notes: notes ?? "",
    addToGoogleCalendar: gcalLink(`${type.label}: ${session.name}`, start, end, notes ?? ""),
  });
  return { ok: true };
}

/** A client cancels their own booking; the owner can cancel any. */
export async function cancelBooking(id: string): Promise<Result> {
  const session = await getSession();
  if (!session) return NOT_ALLOWED;
  if (session.previewing) return { ok: false, error: "You're previewing. Exit the preview first." };
  const bookingId = z.string().uuid().safeParse(id);
  if (!bookingId.success) return { ok: false, error: "Not found." };

  let q = supabaseAdmin().from("bookings").update({ status: "cancelled" }).eq("id", bookingId.data).eq("status", "confirmed");
  if (session.role === "client") q = q.eq("client_id", session.clientId!);
  const { data, error } = await q.select("starts_at, call_type, clients(name)");
  if (error || !data?.length) return { ok: false, error: "Couldn't cancel that." };

  if (session.role === "client") {
    const t = callType(data[0].call_type);
    await notifyOwner(`Booking cancelled: ${session.name}, ${whenLabel(data[0].starts_at)}`, {
      name: session.name, email: session.email, call: t?.label ?? data[0].call_type, when: whenLabel(data[0].starts_at),
    });
  }
  return { ok: true };
}

// ---------- invoices ----------

const InvoiceInput = z.object({
  clientId: z.string().uuid(),
  description: z.string().trim().min(1).max(200),
  amount: z.number().positive().max(1_000_000),
  dueDate: Ymd,
  paid: z.boolean().optional(),
});

export async function newInvoice(input: { clientId: string; description: string; amount: number; dueDate: string; paid?: boolean }): Promise<Result> {
  if (!(await adminOnly())) return NOT_ALLOWED;
  const parsed = InvoiceInput.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Pick a client and add a description, an amount, and a due date." };
  try {
    await createInvoice({ ...parsed.data, amountCents: Math.round(parsed.data.amount * 100) });
    return { ok: true };
  } catch (e) {
    return fail(e, "Couldn't save the invoice.");
  }
}

export async function changeInvoice(id: string, status: "open" | "paid" | "void"): Promise<Result> {
  if (!(await adminOnly())) return NOT_ALLOWED;
  const ok = z.string().uuid().safeParse(id).success && ["open", "paid", "void"].includes(status);
  if (!ok) return { ok: false, error: "Not found." };
  try {
    await setInvoiceStatus(id, status);
    return { ok: true };
  } catch (e) {
    return fail(e, "Couldn't update the invoice.");
  }
}

"use server";

import { cookies, headers } from "next/headers";
import { z } from "zod";
import { DateTime } from "luxon";
import { addClient, findClientByEmail, touchClient } from "@/lib/portal/clients";
import { claimInvoices, createInvoice, listInvoices, setInvoiceStatus } from "@/lib/portal/invoices";
import { getLead, markLead, saveLead } from "@/lib/portal/leads";
import { createAlert, deleteAlert as removeAlert, markSeen, ALERT_KINDS } from "@/lib/portal/alerts";
import { savePaymentSettings } from "@/lib/portal/payments";
import { pushEnabled, pushToAllClients, pushToEmails, pushToOwner } from "@/lib/portal/push";
import { SERVICES, serviceLabel } from "@/lib/portal/services";
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
  kind: z.enum(["client", "partner"]).optional(),
});

/** Admin only. Adds a client or partner to the invited list so they can sign in. */
export async function inviteClient(input: { name: string; email: string; company?: string; kind?: "client" | "partner" }): Promise<Result> {
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

async function notifyOwner(subject: string, fields: Record<string, string>, url = "/app") {
  try {
    await fetch(FORMSPREE, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ source: "Client portal", _subject: subject, ...fields }),
    });
  } catch {
    // the booking is saved either way; this is only the heads-up email
  }
  try {
    await pushToOwner({ title: subject, body: "Tap to open the app.", url, tag: "owner" });
  } catch {
    // push is a bonus on top of the email
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
  }, "/app/book");
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
    }, "/app/book");
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
    if (status === "paid") {
      const { data } = await supabaseAdmin().from("invoices").select("amount_cents, description, clients(email)").eq("id", id).maybeSingle();
      const email = (data?.clients as unknown as { email: string } | null)?.email;
      if (email && data) {
        await pushToEmails([email], {
          title: "Payment received",
          body: `Thank you. ${data.description} is marked paid.`,
          url: "/app/pay",
          tag: "payment",
        }).catch(() => 0);
      }
    }
    return { ok: true };
  } catch (e) {
    return fail(e, "Couldn't update the invoice.");
  }
}

// ---------- new client requests ----------

const hits = new Map<string, { n: number; t: number }>();
function tooMany(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > 60 * 60 * 1000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  h.n += 1;
  return h.n > 5;
}

const LeadInput = z.object({
  name: z.string().trim().min(1).max(120),
  email: Email,
  company: z.string().trim().max(120).optional(),
  phone: z.string().trim().max(40).optional(),
  service: z.string().refine((id) => SERVICES.some((s) => s.id === id)),
  goals: z.string().trim().max(1500).optional(),
  website: z.string().max(0).optional(), // honeypot: real people leave this empty
});

/** Public: someone asks to become a client. No account is made until the owner approves. */
export async function submitLead(input: {
  name: string; email: string; company?: string; phone?: string; service: string; goals?: string; website?: string;
}): Promise<Result> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (tooMany(ip)) return { ok: false, error: "Too many requests from this connection. Try again in an hour, or text Elijah." };
  const parsed = LeadInput.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Add your name, a valid email, and pick a service." };
  if (parsed.data.website) return { ok: true }; // bot: pretend it worked
  if (!hasSupabase) return { ok: false, error: "Requests aren't switched on yet. Text Elijah." };

  try {
    // someone already set up gets the same thank-you, but no duplicate request
    const existing = isAdminEmail(parsed.data.email) || (await findClientByEmail(parsed.data.email));
    if (!existing) {
      const { created } = await saveLead(parsed.data);
      await notifyOwner(`${created ? "New client request" : "Updated client request"}: ${parsed.data.name}, ${serviceLabel(parsed.data.service)}`, {
        name: parsed.data.name,
        email: parsed.data.email,
        business: parsed.data.company ?? "",
        phone: parsed.data.phone ?? "",
        service: serviceLabel(parsed.data.service),
        goals: parsed.data.goals ?? "",
        review: "Open the app, Clients tab, to approve or decline.",
      }, "/app/clients");
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Couldn't send that. Try again, or text Elijah." };
  }
}

const Approve = z.object({
  leadId: z.string().uuid(),
  description: z.string().trim().min(1).max(200),
  amount: z.number().positive().max(1_000_000),
  dueDate: Ymd,
});

/** Admin: turn a request into a client with a first invoice. */
export async function approveLead(input: { leadId: string; description: string; amount: number; dueDate: string }): Promise<
  | { ok: true; name: string; email: string; phone: string | null }
  | { ok: false; error: string }
> {
  if (!(await adminOnly())) return { ok: false, error: "Not allowed." };
  const parsed = Approve.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Add a description, an amount, and a due date for the first invoice." };
  try {
    const lead = await getLead(parsed.data.leadId);
    if (!lead || lead.status !== "pending") return { ok: false, error: "That request was already handled." };
    const client =
      (await findClientByEmail(lead.email)) ??
      (await addClient({ email: lead.email, name: lead.name, company: lead.company ?? undefined, phone: lead.phone ?? undefined, service: lead.service }));
    await createInvoice({ clientId: client.id, description: parsed.data.description, amountCents: Math.round(parsed.data.amount * 100), dueDate: parsed.data.dueDate });
    await markLead(lead.id, "approved", client.id);
    return { ok: true, name: lead.name, email: lead.email, phone: lead.phone };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Couldn't approve that." };
  }
}

export async function declineLead(leadId: string): Promise<Result> {
  if (!(await adminOnly())) return NOT_ALLOWED;
  try {
    await markLead(z.string().uuid().parse(leadId), "declined");
    return { ok: true };
  } catch (e) {
    return fail(e, "Couldn't decline that.");
  }
}

// ---------- payment settings and claims ----------

const PaymentInput = z.object({
  paypalHandle: z.string().trim().regex(/^[A-Za-z0-9._-]{0,40}$/),
  zelleEmail: z.string().trim().max(200).refine((v) => v === "" || z.email().safeParse(v).success),
  squareLink: z.string().trim().max(400).refine((v) => v === "" || /^https:\/\//.test(v)),
  cashAppTag: z.string().trim().transform((v) => v.replace(/^\$/, "")).pipe(z.string().regex(/^[A-Za-z0-9_]{0,20}$/)),
});

export async function savePayments(input: { paypalHandle: string; zelleEmail: string; squareLink: string; cashAppTag: string }): Promise<Result> {
  if (!(await adminOnly())) return NOT_ALLOWED;
  const parsed = PaymentInput.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Check the PayPal handle, the Zelle email, the Cash App name, and that the Square link starts with https://." };
  try {
    await savePaymentSettings(parsed.data);
    return { ok: true };
  } catch (e) {
    return fail(e, "Couldn't save.");
  }
}

/** A client says they paid. Nothing is marked paid until the owner confirms. */
export async function claimPayment(method: string): Promise<Result> {
  const session = await getSession();
  if (!session || session.role !== "client" || !session.clientId || session.partner) return NOT_ALLOWED;
  if (session.previewing) return { ok: false, error: "You're previewing. Exit the preview first." };
  const m = z.enum(["Zelle", "PayPal", "Square", "Cash App", "Other"]).safeParse(method);
  if (!m.success) return { ok: false, error: "Pick how you paid." };
  try {
    const open = (await listInvoices(session.clientId)).filter((i) => i.status === "open" && !i.claimedAt);
    if (!open.length) return { ok: false, error: "Nothing open to mark." };
    await claimInvoices(session.clientId, open.map((i) => i.id), m.data);
    const total = open.reduce((n, i) => n + i.amountCents, 0) / 100;
    await notifyOwner(`${session.name} says they paid $${total.toLocaleString("en-US")} by ${m.data}`, {
      name: session.name, email: session.email, method: m.data, amount: `$${total.toLocaleString("en-US")}`,
      confirm: "Check your account, then open the app, Payments tab, and tap Mark paid.",
    }, "/app/pay");
    return { ok: true };
  } catch (e) {
    return fail(e, "Couldn't send that. Text Elijah.");
  }
}

// ---------- alerts and phone notifications ----------

const Subscription = z.object({
  endpoint: z.string().url().max(1000),
  keys: z.object({ p256dh: z.string().min(1).max(300), auth: z.string().min(1).max(100) }),
});

/** This phone or browser wants notifications for the signed-in person. */
export async function saveSubscription(sub: unknown): Promise<Result> {
  const session = await getSession();
  if (!session || session.previewing) return NOT_ALLOWED;
  const parsed = Subscription.safeParse(sub);
  if (!parsed.success) return { ok: false, error: "That device couldn't be registered." };
  const { error } = await supabaseAdmin()
    .from("push_subscriptions")
    .upsert({ user_email: session.email.toLowerCase(), endpoint: parsed.data.endpoint, p256dh: parsed.data.keys.p256dh, auth: parsed.data.keys.auth }, { onConflict: "endpoint" });
  return error ? { ok: false, error: "Couldn't save that device. Try again." } : { ok: true };
}

export async function removeSubscription(endpoint: string): Promise<Result> {
  const session = await getSession();
  if (!session || session.previewing) return NOT_ALLOWED;
  await supabaseAdmin().from("push_subscriptions").delete().eq("endpoint", endpoint).eq("user_email", session.email.toLowerCase());
  return { ok: true };
}

/** Sends a notification to the signed-in person's own devices, to prove it works. */
export async function sendTestPush(): Promise<Result> {
  const session = await getSession();
  if (!session || session.previewing) return NOT_ALLOWED;
  if (!pushEnabled) return { ok: false, error: "Notifications aren't switched on for this site yet." };
  const n = await pushToEmails([session.email], { title: "It works", body: "You'll get alerts from Moore Covenant Productions here.", url: "/app/alerts", tag: "test" });
  return n > 0 ? { ok: true } : { ok: false, error: "No device was reached. Turn notifications on first." };
}

const AlertInput = z.object({
  title: z.string().trim().min(1).max(80),
  body: z.string().trim().min(1).max(500),
  kind: z.enum(["deal", "schedule", "news"]),
  clientId: z.string().uuid().nullable(),
});

/** Admin: post an alert to everyone or one client. It lands in their feed and on their phone. */
export async function sendAlert(input: { title: string; body: string; kind: string; clientId: string | null }): Promise<
  { ok: true; devices: number } | { ok: false; error: string }
> {
  if (!(await adminOnly())) return { ok: false, error: "Not allowed." };
  const parsed = AlertInput.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Add a title (80 characters or fewer) and a message (500 or fewer)." };
  try {
    await createAlert(parsed.data);
    const kind = ALERT_KINDS.find((k) => k.id === parsed.data.kind)!.label;
    const payload = { title: parsed.data.title, body: parsed.data.body, url: "/app/alerts", tag: `alert-${kind}` };
    let devices = 0;
    if (parsed.data.clientId) {
      const { data } = await supabaseAdmin().from("clients").select("email").eq("id", parsed.data.clientId).maybeSingle();
      if (data?.email) devices = await pushToEmails([data.email as string], payload);
    } else {
      devices = await pushToAllClients(payload);
    }
    return { ok: true, devices };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Couldn't send that." };
  }
}

export async function deleteAlert(id: string): Promise<Result> {
  if (!(await adminOnly())) return NOT_ALLOWED;
  try {
    await removeAlert(z.string().uuid().parse(id));
    return { ok: true };
  } catch (e) {
    return fail(e, "Couldn't delete that.");
  }
}

/** A client opened their feed: clear the unread badge. */
export async function markAlertsSeen(): Promise<Result> {
  const session = await getSession();
  if (!session || session.role !== "client" || !session.clientId || session.previewing) return { ok: true };
  await markSeen(session.clientId);
  return { ok: true };
}

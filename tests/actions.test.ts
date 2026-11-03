/**
 * Permission and validation rules on the Server Actions. Nothing here touches a
 * database: Supabase, the session, and side channels (email, push) are all stand-ins.
 * These tests are the proof behind CLAUDE.md's "a client can only reach their own rows".
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Session } from "@/lib/portal/session";

const h = vi.hoisted(() => ({
  session: null as unknown,
  tables: {} as Record<string, { data: unknown; error?: { code?: string; message: string } | null }>,
  createInvoice: vi.fn(),
  availableSlots: vi.fn(),
  fakeCalls: [] as { table: string; ops: string[] }[],
}));
const { tables, createInvoice, availableSlots } = h;
let session: Session | null = null;
const fake = { get calls() { return h.fakeCalls; } };

vi.mock("next/headers", () => ({
  cookies: async () => ({ get: () => undefined, set: () => undefined, delete: () => undefined }),
  headers: async () => ({ get: () => "203.0.113.9" }),
}));
vi.mock("@/lib/portal/session", () => ({
  getSession: async () => h.session,
  DEV_COOKIE: "dev",
  VIEW_AS_COOKIE: "view",
}));
vi.mock("@/lib/portal/config", () => ({
  hasSupabase: true,
  devAuthEnabled: false,
  isAdminEmail: () => false,
}));
vi.mock("@/lib/portal/supabase", async () => {
  const { makeFakeSupabase } = await import("./helpers/fakeSupabase");
  const f = makeFakeSupabase(h.tables);
  h.fakeCalls = f.calls;
  return { supabaseAdmin: f.admin, supabaseServer: async () => ({}) };
});
vi.mock("@/lib/portal/invoices", () => ({
  createInvoice: h.createInvoice,
  listInvoices: async () => [],
  setInvoiceStatus: vi.fn(),
  claimInvoices: vi.fn(),
}));
vi.mock("@/lib/portal/clients", () => ({ addClient: vi.fn(), findClientByEmail: async () => null, touchClient: vi.fn() }));
vi.mock("@/lib/portal/leads", () => ({ getLead: vi.fn(), markLead: vi.fn(), saveLead: vi.fn() }));
vi.mock("@/lib/portal/alerts", () => ({ createAlert: vi.fn(), deleteAlert: vi.fn(), markSeen: vi.fn(), ALERT_KINDS: [] }));
vi.mock("@/lib/portal/payments", () => ({ savePaymentSettings: vi.fn() }));
vi.mock("@/lib/portal/push", () => ({
  pushEnabled: false,
  pushToAllClients: async () => 0,
  pushToEmails: async () => 0,
  pushToOwner: async () => 0,
}));
vi.mock("@/lib/portal/schedule", async (importOriginal) => {
  const real = await importOriginal<typeof import("@/lib/portal/schedule")>();
  return { ...real, availableSlots: h.availableSlots, addBlocked: vi.fn(), removeBlocked: vi.fn(), saveSchedule: vi.fn(), getSchedule: vi.fn() };
});

import { bookSlot, cancelBooking, changeInvoice, claimPayment, inviteClient, newInvoice, saveScheduleSettings } from "@/app/(portal)/app/actions";

const admin: Session = { email: "elijah@example.com", name: "Elijah", role: "admin", clientId: null, previewing: false, partner: false };
const client: Session = { email: "ab@example.com", name: "AB", role: "client", clientId: "c1", previewing: false, partner: false };
const partner: Session = { ...client, email: "pat@example.com", name: "Pat", clientId: "p1", partner: true };
const preview: Session = { ...client, previewing: true };

beforeEach(() => {
  session = null; h.session = session;
  fake.calls.length = 0;
  for (const k of Object.keys(tables)) delete tables[k];
  globalThis.fetch = vi.fn(async () => new Response("{}", { status: 200 })) as unknown as typeof fetch;
});

describe("admin-only actions", () => {
  it("refuse anyone who is not the admin, including an admin previewing a client", async () => {
    for (const who of [null, client, partner, preview]) {
      session = who; h.session = session;
      expect(await inviteClient({ name: "X", email: "x@example.com" })).toEqual({ ok: false, error: "Not allowed." });
      expect(await newInvoice({ clientId: "c1", description: "Deposit", amount: 100, dueDate: "2026-12-01" })).toEqual({ ok: false, error: "Not allowed." });
      expect(await changeInvoice("00000000-0000-4000-8000-000000000001", "paid")).toEqual({ ok: false, error: "Not allowed." });
      expect((await saveScheduleSettings({ hours: {}, bufferMinutes: 0, noticeHours: 0, windowDays: 30, meetLink: "" })).ok).toBe(false);
    }
    expect(createInvoice).not.toHaveBeenCalled();
  });
});

describe("newInvoice", () => {
  beforeEach(() => { session = admin; h.session = session; });

  it("stores money as whole cents", async () => {
    const r = await newInvoice({ clientId: "00000000-0000-4000-8000-000000000001", description: "Starter, November", amount: 1500, dueDate: "2026-12-01" });
    expect(r).toEqual({ ok: true });
    expect(createInvoice).toHaveBeenCalledWith(expect.objectContaining({ amountCents: 150_000 }));
    await newInvoice({ clientId: "00000000-0000-4000-8000-000000000001", description: "Odd", amount: 19.99, dueDate: "2026-12-01" });
    expect(createInvoice).toHaveBeenLastCalledWith(expect.objectContaining({ amountCents: 1999 }));
    await newInvoice({ clientId: "00000000-0000-4000-8000-000000000001", description: "Float trap", amount: 0.1 + 0.2, dueDate: "2026-12-01" });
    expect(createInvoice).toHaveBeenLastCalledWith(expect.objectContaining({ amountCents: 30 }));
  });

  it("rejects bad input before touching the database", async () => {
    const base = { clientId: "00000000-0000-4000-8000-000000000001", description: "x", amount: 10, dueDate: "2026-12-01" };
    expect((await newInvoice({ ...base, amount: 0 })).ok).toBe(false);
    expect((await newInvoice({ ...base, amount: -5 })).ok).toBe(false);
    expect((await newInvoice({ ...base, dueDate: "12/01/2026" })).ok).toBe(false);
    expect((await newInvoice({ ...base, description: "   " })).ok).toBe(false);
    expect((await newInvoice({ ...base, clientId: "not-a-uuid" })).ok).toBe(false);
    expect(createInvoice).not.toHaveBeenCalled();
  });
});

describe("changeInvoice", () => {
  it("only accepts known statuses and real ids", async () => {
    session = admin; h.session = session;
    expect((await changeInvoice("nope", "paid")).ok).toBe(false);
    expect((await changeInvoice("00000000-0000-4000-8000-000000000001", "refunded" as never)).ok).toBe(false);
  });
});

describe("bookSlot", () => {
  const start = "2026-11-17T15:00:00.000Z";
  beforeEach(() => {
    availableSlots.mockResolvedValue([{ date: "2026-11-17", label: "Tue", slots: [{ start, label: "10:00 AM" }] }]);
    tables.bookings = { data: null, error: null };
  });

  it("is for signed-in clients only, never the admin or a preview", async () => {
    session = admin; h.session = session;
    expect(await bookSlot({ callType: "checkin", start })).toEqual({ ok: false, error: "Not allowed." });
    session = preview; h.session = session;
    expect((await bookSlot({ callType: "checkin", start })).ok).toBe(false);
    session = null; h.session = session;
    expect((await bookSlot({ callType: "checkin", start })).ok).toBe(false);
    expect(fake.calls.filter((c) => c.table === "bookings")).toHaveLength(0);
  });

  it("re-checks on the server that the time is still open", async () => {
    session = client; h.session = session;
    const r = await bookSlot({ callType: "checkin", start: "2026-11-17T16:00:00.000Z" });
    expect(r).toEqual({ ok: false, error: "That time just got taken. Pick another." });
    expect(fake.calls.filter((c) => c.table === "bookings")).toHaveLength(0);
  });

  it("rejects an unknown call type or an unparseable time", async () => {
    session = client; h.session = session;
    expect((await bookSlot({ callType: "massage", start })).ok).toBe(false);
    expect((await bookSlot({ callType: "checkin", start: "tomorrow" })).ok).toBe(false);
  });

  it("books an open slot for the signed-in client and treats a database clash as taken", async () => {
    session = client; h.session = session;
    expect(await bookSlot({ callType: "strategy", start, notes: "  Plan Q1  " })).toEqual({ ok: true });
    expect(fake.calls.at(-1)).toMatchObject({ table: "bookings", ops: ["insert"] });

    tables.bookings = { data: null, error: { code: "23P01", message: "exclusion" } };
    expect(await bookSlot({ callType: "checkin", start })).toEqual({ ok: false, error: "That time just got taken. Pick another." });
  });
});

describe("cancelBooking", () => {
  const id = "00000000-0000-4000-8000-000000000002";
  it("scopes a client's cancel to their own bookings, but not the admin's", async () => {
    tables.bookings = { data: [{ starts_at: "2026-11-17T15:00:00Z", call_type: "checkin", clients: { name: "AB" } }] };
    session = client; h.session = session;
    await cancelBooking(id);
    const clientOps = fake.calls.find((c) => c.table === "bookings")!.ops;
    fake.calls.length = 0;
    session = admin; h.session = session;
    await cancelBooking(id);
    const adminOps = fake.calls.find((c) => c.table === "bookings")!.ops;
    // one more .eq() for the client: the client_id filter
    expect(clientOps.filter((o) => o === "eq")).toHaveLength(adminOps.filter((o) => o === "eq").length + 1);
  });

  it("refuses previews and bad ids", async () => {
    session = preview; h.session = session;
    expect((await cancelBooking(id)).ok).toBe(false);
    session = client; h.session = session;
    expect((await cancelBooking("junk")).ok).toBe(false);
  });
});

describe("claimPayment", () => {
  it("is only for paying clients: not partners, previews, or the admin", async () => {
    for (const who of [partner, preview, admin, null]) {
      session = who; h.session = session;
      expect((await claimPayment("Zelle")).ok).toBe(false);
    }
  });
  it("needs a known payment method", async () => {
    session = client; h.session = session;
    expect(await claimPayment("Bitcoin")).toEqual({ ok: false, error: "Pick how you paid." });
  });
});

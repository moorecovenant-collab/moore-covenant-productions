import type Anthropic from "@anthropic-ai/sdk";
import { DateTime } from "luxon";
import { bookSlot, cancelBooking, claimPayment } from "@/app/(portal)/app/actions";
import { findClientById } from "./clients";
import { dateOnly, invoiceState, money, whenLabel } from "./format";
import { listInvoices } from "./invoices";
import { listPendingLeads } from "./leads";
import { getPaymentSettings } from "./payments";
import { CALL_TYPES, availableSlots, callType, getSchedule, listBlocked, listUpcomingBookings } from "./schedule";
import { serviceLabel } from "./services";
import type { Session } from "./session";

/**
 * Everything the in-app assistant can see or do. Every tool is scoped by the signed-in session
 * on the server: a client only ever reaches their own rows, whatever the conversation says.
 */

const CALL_IDS = CALL_TYPES.map((c) => c.id);

export const CLIENT_TOOLS: Anthropic.Tool[] = [
  {
    name: "decline_client_details",
    description:
      "Call this immediately, with no text before it, if the person asks about any OTHER client of the studio: who they are, what they pay, their projects, or anything about them. Never for the signed-in person's own account.",
    strict: true,
    input_schema: { type: "object", properties: {}, required: [], additionalProperties: false },
  },
  {
    name: "get_my_account",
    description: "The signed-in client's own account: service, balance, every invoice with its status, upcoming calls, and how to pay. Call this before answering anything about their money or schedule.",
    strict: true,
    input_schema: { type: "object", properties: {}, required: [], additionalProperties: false },
  },
  {
    name: "get_open_times",
    description: "Times Elijah is open for a call over the next few weeks, in Eastern time. Returns days with bookable start times. Use the exact 'start' value when booking.",
    strict: true,
    input_schema: {
      type: "object",
      properties: { call_type: { type: "string", enum: CALL_IDS, description: "checkin = 30 min project check-in, strategy = 60 min strategy call" } },
      required: ["call_type"],
      additionalProperties: false,
    },
  },
  {
    name: "book_call",
    description: "Book a call for the signed-in client at one of the open times. Only after they have confirmed the day and time in the conversation.",
    strict: true,
    input_schema: {
      type: "object",
      properties: {
        call_type: { type: "string", enum: CALL_IDS },
        start: { type: "string", description: "The exact 'start' value from get_open_times" },
        notes: { type: "string", description: "What they want to cover, or empty string" },
      },
      required: ["call_type", "start", "notes"],
      additionalProperties: false,
    },
  },
  {
    name: "cancel_call",
    description: "Cancel one of the signed-in client's upcoming calls. Only after they confirm which one.",
    strict: true,
    input_schema: {
      type: "object",
      properties: { booking_id: { type: "string", description: "The id from get_my_account" } },
      required: ["booking_id"],
      additionalProperties: false,
    },
  },
  {
    name: "i_paid",
    description: "Record that the client says they have sent a payment for their open balance, so Elijah can confirm it. Only after they tell you how they paid.",
    strict: true,
    input_schema: {
      type: "object",
      properties: { method: { type: "string", enum: ["Zelle", "PayPal", "Square", "Cash App", "Other"] } },
      required: ["method"],
      additionalProperties: false,
    },
  },
];

/** Partners can see and book time, nothing about money. */
export const PARTNER_TOOLS: Anthropic.Tool[] = CLIENT_TOOLS.filter((t) => t.name !== "i_paid");

export const ADMIN_TOOLS: Anthropic.Tool[] = [
  {
    name: "get_studio_overview",
    description: "Elijah's own view: new client requests waiting, upcoming calls with who they are with, who owes what, payments clients say they sent, and days off. Call this before answering anything about the studio's schedule or money.",
    strict: true,
    input_schema: { type: "object", properties: {}, required: [], additionalProperties: false },
  },
  {
    name: "get_open_times",
    description: "Times currently open for clients to book, in Eastern time.",
    strict: true,
    input_schema: {
      type: "object",
      properties: { call_type: { type: "string", enum: CALL_IDS } },
      required: ["call_type"],
      additionalProperties: false,
    },
  },
];

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.slice(0, max) : "");

/** A short account summary for the system prompt, so simple questions need no tool call. */
export async function accountSummary(session: Session): Promise<string> {
  if (session.role !== "client" || !session.clientId) return "";
  const [me, invoices, bookings] = await Promise.all([
    findClientById(session.clientId),
    listInvoices(session.clientId),
    listUpcomingBookings(session.clientId),
  ]);
  const open = invoices.filter((i) => i.status === "open");
  const due = open.reduce((n, i) => n + i.amountCents, 0);
  const overdue = open.filter((i) => invoiceState(i.status, i.dueDate) === "overdue").length;
  return [
    `Name: ${session.name}${me?.company ? `, ${me.company}` : ""}.`,
    session.partner ? "This person is a partner of the studio: scheduling and updates only. They have no invoices and nothing to pay; if money comes up, say it does not apply to them." : `Service: ${me?.service ? serviceLabel(me.service) : "not set"}.`,
    session.partner ? "" : `Balance due: ${due ? money(due) : "nothing"}${overdue ? ` (${overdue} overdue)` : ""}.`,
    `Next call: ${bookings[0] ? `${whenLabel(bookings[0].startsAt)}, ${callType(bookings[0].callType)?.label ?? bookings[0].callType}` : "none booked"}.`,
    session.previewing ? "NOTE: Elijah is previewing this client's view. Booking, cancelling and payment claims are disabled; say so if asked to do them." : "",
  ]
    .filter(Boolean)
    .join("\n");
}

async function openTimes(callTypeId: string) {
  const type = callType(callTypeId);
  if (!type) return { error: "Unknown call type." };
  const days = await availableSlots(type.minutes);
  return {
    call: `${type.label}, ${type.minutes} min, Google Meet`,
    timezone: "America/New_York",
    days: days.slice(0, 7).map((d) => ({ day: d.label, times: d.slots.map((s) => ({ start: s.start, time: s.label })) })),
    more_days_available: days.length > 7,
  };
}

/** Runs one tool for the signed-in person. Returns the text the model sees. */
export async function runTool(name: string, input: unknown, session: Session): Promise<{ text: string; isError?: boolean }> {
  const arg = (input ?? {}) as Record<string, unknown>;
  const ok = (v: unknown) => ({ text: JSON.stringify(v) });
  const err = (text: string) => ({ text, isError: true });

  if (session.role === "client" && session.clientId) {
    switch (name) {
      case "get_my_account": {
        const [me, invoices, bookings, pay, schedule] = await Promise.all([
          findClientById(session.clientId),
          listInvoices(session.clientId),
          listUpcomingBookings(session.clientId),
          getPaymentSettings(),
          getSchedule(),
        ]);
        const open = invoices.filter((i) => i.status === "open");
        return ok({
          name: session.name,
          business: me?.company ?? null,
          service: me?.service ? serviceLabel(me.service) : null,
          partner: session.partner || undefined,
          balance_due: session.partner ? undefined : money(open.reduce((n, i) => n + i.amountCents, 0)),
          invoices: session.partner ? undefined : invoices.map((i) => ({
            description: i.description,
            amount: money(i.amountCents),
            due: dateOnly(i.dueDate, true),
            status: invoiceState(i.status, i.dueDate),
            you_said_paid_by: i.claimedMethod,
          })),
          upcoming_calls: bookings.map((b) => ({
            booking_id: b.id,
            when: whenLabel(b.startsAt),
            call: callType(b.callType)?.label ?? b.callType,
            meet_link: schedule.meetLink || "Elijah will send it",
          })),
          ways_to_pay: session.partner ? undefined : [
            pay.squareLink && "card (Square) from the Pay tab",
            pay.paypalHandle && `PayPal (paypal.me/${pay.paypalHandle})`,
            pay.zelleEmail && `Zelle to ${pay.zelleEmail}`,
            pay.cashAppTag && `Cash App $${pay.cashAppTag}`,
          ].filter(Boolean),
          note: session.partner ? "Partner account: booking and updates only." : "Payments are confirmed by Elijah by hand; the Pay tab has buttons for each method.",
        });
      }
      case "get_open_times":
        return ok(await openTimes(str(arg.call_type, 40)));
      case "book_call": {
        const r = await bookSlot({ callType: str(arg.call_type, 40), start: str(arg.start, 60), notes: str(arg.notes) });
        return r.ok ? ok({ booked: true, when: whenLabel(str(arg.start, 60)) }) : err(r.error);
      }
      case "cancel_call": {
        const r = await cancelBooking(str(arg.booking_id, 60));
        return r.ok ? ok({ cancelled: true }) : err(r.error);
      }
      case "i_paid": {
        const r = await claimPayment(str(arg.method, 20));
        return r.ok ? ok({ recorded: true, note: "Elijah has been told and will confirm it in the app." }) : err(r.error);
      }
    }
  }

  if (session.role === "admin") {
    switch (name) {
      case "get_studio_overview": {
        const [leads, bookings, invoices, blocked] = await Promise.all([listPendingLeads(), listUpcomingBookings(), listInvoices(), listBlocked()]);
        const open = invoices.filter((i) => i.status === "open");
        const byClient = new Map<string, number>();
        for (const i of open) byClient.set(i.clientCompany ?? i.clientName, (byClient.get(i.clientCompany ?? i.clientName) ?? 0) + i.amountCents);
        return ok({
          today: DateTime.now().setZone("America/New_York").toFormat("cccc, LLL d"),
          new_requests: leads.map((l) => ({ name: l.name, business: l.company, service: serviceLabel(l.service), asked: dateOnly(l.createdAt.slice(0, 10)) })),
          upcoming_calls: bookings.slice(0, 10).map((b) => ({ when: whenLabel(b.startsAt), with: b.clientCompany ?? b.clientName, call: callType(b.callType)?.label ?? b.callType, notes: b.notes })),
          outstanding: [...byClient].map(([who, cents]) => ({ who, amount: money(cents) })),
          overdue: open.filter((i) => invoiceState(i.status, i.dueDate) === "overdue").map((i) => ({ who: i.clientCompany ?? i.clientName, amount: money(i.amountCents), due: dateOnly(i.dueDate) })),
          payments_to_confirm: open.filter((i) => i.claimedAt).map((i) => ({ who: i.clientCompany ?? i.clientName, amount: money(i.amountCents), method: i.claimedMethod })),
          days_off: blocked.map((b) => (b.startDate === b.endDate ? dateOnly(b.startDate) : `${dateOnly(b.startDate)} to ${dateOnly(b.endDate)}`)),
        });
      }
      case "get_open_times":
        return ok(await openTimes(str(arg.call_type, 40)));
    }
  }

  return err("That tool is not available here.");
}

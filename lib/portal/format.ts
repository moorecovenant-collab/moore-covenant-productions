import { DateTime } from "luxon";

export const TZ = "America/New_York";

export const money = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: cents % 100 ? 2 : 0 });

/** "2026-11-21" -> "Nov 21" (a plain date, no timezone shift). */
export const dateOnly = (ymd: string, withYear = false) =>
  DateTime.fromISO(ymd, { zone: TZ }).toFormat(withYear ? "LLL d, yyyy" : "LLL d");

export const dayLabel = (iso: string) => DateTime.fromISO(iso).setZone(TZ).toFormat("cccc, LLL d");
export const timeLabel = (iso: string) => DateTime.fromISO(iso).setZone(TZ).toFormat("h:mm a");
export const whenLabel = (iso: string) => DateTime.fromISO(iso).setZone(TZ).toFormat("ccc, LLL d 'at' h:mm a 'ET'");

export const todayYmd = () => DateTime.now().setZone(TZ).toISODate()!;

export type InvoiceState = "paid" | "void" | "overdue" | "today" | "due";
export function invoiceState(status: string, dueDate: string): InvoiceState {
  if (status === "paid") return "paid";
  if (status === "void") return "void";
  const today = todayYmd();
  return dueDate < today ? "overdue" : dueDate === today ? "today" : "due";
}

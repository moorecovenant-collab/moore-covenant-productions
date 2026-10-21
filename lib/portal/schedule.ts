import { DateTime } from "luxon";
import { busyBlocks, type Interval } from "./busy";
import { TZ, dayLabel, timeLabel } from "./format";
import { supabaseAdmin } from "./supabase";

export type DayHours = { start: string; end: string } | null;
export type Schedule = {
  /** ISO weekday: "1" = Monday ... "7" = Sunday. null = not available. */
  hours: Record<string, DayHours>;
  bufferMinutes: number;
  noticeHours: number;
  windowDays: number;
  meetLink: string;
};

export const CALL_TYPES = [
  { id: "checkin", label: "Project check-in", minutes: 30, blurb: "A quick catch up on your content and anything pending." },
  { id: "strategy", label: "Strategy call", minutes: 60, blurb: "Plan the next stretch: goals, content, and what to change." },
] as const;
export type CallTypeId = (typeof CALL_TYPES)[number]["id"];
export const callType = (id: string) => CALL_TYPES.find((c) => c.id === id);

const weekday = (): DayHours => ({ start: "10:00", end: "17:00" });
export const DEFAULT_SCHEDULE: Schedule = {
  hours: { "1": weekday(), "2": weekday(), "3": weekday(), "4": weekday(), "5": weekday(), "6": null, "7": null },
  bufferMinutes: 15,
  noticeHours: 12,
  windowDays: 30,
  meetLink: "",
};

export type Blocked = { id: string; startDate: string; endDate: string };
export type Booking = {
  id: string;
  clientId: string;
  clientName: string;
  clientCompany: string | null;
  callType: string;
  startsAt: string;
  endsAt: string;
  notes: string | null;
  status: "confirmed" | "cancelled";
};

export async function getSchedule(): Promise<Schedule> {
  const { data } = await supabaseAdmin().from("settings").select("value").eq("key", "schedule").maybeSingle();
  const v = (data?.value ?? {}) as Partial<Schedule>;
  return { ...DEFAULT_SCHEDULE, ...v, hours: { ...DEFAULT_SCHEDULE.hours, ...(v.hours ?? {}) } };
}

export async function saveSchedule(s: Schedule) {
  const { error } = await supabaseAdmin().from("settings").upsert({ key: "schedule", value: s });
  if (error) throw new Error(error.message);
}

export async function listBlocked(): Promise<Blocked[]> {
  const today = DateTime.now().setZone(TZ).toISODate()!;
  const { data, error } = await supabaseAdmin().from("blocked_dates").select("*").gte("end_date", today).order("start_date");
  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => ({ id: r.id, startDate: r.start_date, endDate: r.end_date }));
}

export async function addBlocked(startDate: string, endDate: string) {
  const { error } = await supabaseAdmin().from("blocked_dates").insert({ start_date: startDate, end_date: endDate });
  if (error) throw new Error(error.message);
}

export async function removeBlocked(id: string) {
  const { error } = await supabaseAdmin().from("blocked_dates").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

type BookingRow = {
  id: string; client_id: string; call_type: string; starts_at: string; ends_at: string; notes: string | null;
  status: "confirmed" | "cancelled"; clients: { name: string; company: string | null } | null;
};
const toBooking = (r: BookingRow): Booking => ({
  id: r.id, clientId: r.client_id, clientName: r.clients?.name ?? "Client", clientCompany: r.clients?.company ?? null,
  callType: r.call_type, startsAt: r.starts_at, endsAt: r.ends_at, notes: r.notes, status: r.status,
});

/** Upcoming confirmed bookings, soonest first. Pass clientId to limit to one client. */
export async function listUpcomingBookings(clientId?: string): Promise<Booking[]> {
  let q = supabaseAdmin()
    .from("bookings")
    .select("*, clients(name, company)")
    .eq("status", "confirmed")
    .gte("ends_at", new Date().toISOString())
    .order("starts_at");
  if (clientId) q = q.eq("client_id", clientId);
  const { data, error } = await q;
  if (error) throw new Error(error.message);
  return ((data ?? []) as unknown as BookingRow[]).map(toBooking);
}

export type DaySlots = { date: string; label: string; slots: { start: string; label: string }[] };

const overlaps = (a: Interval, b: Interval) => a.start < b.end && b.start < a.end;

/** Open start times for a call of `minutes`, per day, in Eastern time. */
export async function availableSlots(minutes: number): Promise<DaySlots[]> {
  const s = await getSchedule();
  const now = DateTime.now().setZone(TZ);
  const first = now.startOf("day");
  const last = first.plus({ days: s.windowDays + 1 });

  const [blockedRes, bookingsRes, busy] = await Promise.all([
    supabaseAdmin().from("blocked_dates").select("start_date, end_date").gte("end_date", first.toISODate()!),
    supabaseAdmin().from("bookings").select("starts_at, ends_at").eq("status", "confirmed").gte("ends_at", first.toISO()!),
    busyBlocks(first.toJSDate(), last.toJSDate()),
  ]);
  const blocked = blockedRes.data ?? [];
  const buffer = s.bufferMinutes * 60_000;
  const taken: Interval[] = [
    ...(bookingsRes.data ?? []).map((b) => ({
      start: new Date(new Date(b.starts_at).getTime() - buffer),
      end: new Date(new Date(b.ends_at).getTime() + buffer),
    })),
    ...busy,
  ];

  const earliest = now.plus({ hours: s.noticeHours });
  const days: DaySlots[] = [];
  for (let i = 0; i <= s.windowDays; i++) {
    const day = first.plus({ days: i });
    const window = s.hours[String(day.weekday)];
    if (!window) continue;
    const ymd = day.toISODate()!;
    if (blocked.some((b) => b.start_date <= ymd && ymd <= b.end_date)) continue;

    const [oh, om] = window.start.split(":").map(Number);
    const [ch, cm] = window.end.split(":").map(Number);
    const open = day.set({ hour: oh, minute: om });
    const close = day.set({ hour: ch, minute: cm });
    const slots: DaySlots["slots"] = [];
    for (let t = open; t.plus({ minutes }) <= close; t = t.plus({ minutes: 30 })) {
      if (t < earliest) continue;
      const slot = { start: t.toJSDate(), end: t.plus({ minutes }).toJSDate() };
      if (taken.some((i) => overlaps(slot, i))) continue;
      slots.push({ start: t.toUTC().toISO()!, label: timeLabel(t.toISO()!) });
    }
    if (slots.length) days.push({ date: ymd, label: dayLabel(slots[0].start), slots });
  }
  return days;
}

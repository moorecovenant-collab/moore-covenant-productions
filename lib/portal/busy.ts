import ical from "node-ical";

export type Interval = { start: Date; end: Date };

/** True when a Google Calendar secret iCal address is configured. */
export const calendarConnected = () => Boolean(process.env.GOOGLE_CALENDAR_ICS_URL);

/**
 * Busy times from the owner's Google Calendar, read through its private iCal address.
 * All-day events and "free" events do not block. Any failure returns no busy time,
 * so a calendar hiccup never takes booking down (the portal's own bookings still apply).
 */
export async function busyBlocks(from: Date, to: Date): Promise<Interval[]> {
  const url = process.env.GOOGLE_CALENDAR_ICS_URL;
  if (!url) return [];
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data = ical.sync.parseICS(await res.text());
    const out: Interval[] = [];
    for (const item of Object.values(data) as any[]) {
      if (!item || item.type !== "VEVENT") continue;
      if (item.status === "CANCELLED" || item.transparency === "TRANSPARENT" || item.datetype === "date") continue;
      const start: Date = item.start;
      const end: Date = item.end ?? start;
      const length = end.getTime() - start.getTime();
      if (item.rrule) {
        const exdates = new Set(Object.values(item.exdate ?? {}).map((d: any) => new Date(d).getTime()));
        for (const occ of item.rrule.between(new Date(from.getTime() - length), to, true) as Date[]) {
          if (exdates.has(occ.getTime())) continue;
          out.push({ start: occ, end: new Date(occ.getTime() + length) });
        }
      } else if (end > from && start < to) {
        out.push({ start, end });
      }
    }
    return out;
  } catch {
    return [];
  }
}

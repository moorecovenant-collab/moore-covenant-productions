import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { busyBlocks, calendarConnected } from "@/lib/portal/busy";

const ICS = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//test//EN
BEGIN:VEVENT
UID:one
DTSTART:20261117T170000Z
DTEND:20261117T180000Z
SUMMARY:Client shoot
END:VEVENT
BEGIN:VEVENT
UID:allday
DTSTART;VALUE=DATE:20261118
DTEND;VALUE=DATE:20261119
SUMMARY:All day thing
END:VEVENT
BEGIN:VEVENT
UID:free
DTSTART:20261119T140000Z
DTEND:20261119T150000Z
TRANSP:TRANSPARENT
SUMMARY:Marked free
END:VEVENT
BEGIN:VEVENT
UID:cancelled
DTSTART:20261119T160000Z
DTEND:20261119T170000Z
STATUS:CANCELLED
SUMMARY:Cancelled
END:VEVENT
BEGIN:VEVENT
UID:weekly
DTSTART:20261116T200000Z
DTEND:20261116T203000Z
RRULE:FREQ=WEEKLY;COUNT=4
EXDATE:20261123T200000Z
SUMMARY:Weekly standup
END:VEVENT
END:VCALENDAR
`;

const from = new Date("2026-11-16T00:00:00Z");
const to = new Date("2026-12-16T00:00:00Z");

describe("busyBlocks", () => {
  const realFetch = globalThis.fetch;
  beforeEach(() => {
    process.env.GOOGLE_CALENDAR_ICS_URL = "https://calendar.example/secret.ics";
  });
  afterEach(() => {
    globalThis.fetch = realFetch;
    delete process.env.GOOGLE_CALENDAR_ICS_URL;
  });

  it("is off when no feed is configured", async () => {
    delete process.env.GOOGLE_CALENDAR_ICS_URL;
    expect(calendarConnected()).toBe(false);
    expect(await busyBlocks(from, to)).toEqual([]);
  });

  it("blocks timed events, skips all-day, free and cancelled ones, expands recurrences and honors exceptions", async () => {
    globalThis.fetch = vi.fn(async () => new Response(ICS, { status: 200 })) as unknown as typeof fetch;
    const blocks = await busyBlocks(from, to);
    const starts = blocks.map((b) => b.start.toISOString()).sort();
    expect(starts).toEqual([
      "2026-11-16T20:00:00.000Z", // weekly #1
      "2026-11-17T17:00:00.000Z", // client shoot
      // 2026-11-23 is excluded by EXDATE
      "2026-11-30T20:00:00.000Z", // weekly #3
      "2026-12-07T20:00:00.000Z", // weekly #4
    ]);
  });

  it("returns nothing (and never throws) when the feed is unreachable", async () => {
    globalThis.fetch = vi.fn(async () => new Response("nope", { status: 500 })) as unknown as typeof fetch;
    expect(await busyBlocks(from, to)).toEqual([]);
    globalThis.fetch = vi.fn(async () => {
      throw new Error("network down");
    }) as unknown as typeof fetch;
    expect(await busyBlocks(from, to)).toEqual([]);
  });
});

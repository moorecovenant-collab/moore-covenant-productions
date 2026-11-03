import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { TableResult } from "./helpers/fakeSupabase";

// What each table returns; tests overwrite before calling availableSlots.
const state = vi.hoisted(() => ({
  tables: {} as Record<string, TableResult>,
  busy: [] as { start: Date; end: Date }[],
}));
const { tables } = state;

vi.mock("@/lib/portal/supabase", async () => {
  const { makeFakeSupabase } = await import("./helpers/fakeSupabase");
  const fake = makeFakeSupabase(state.tables);
  return { supabaseAdmin: fake.admin, supabaseServer: async () => ({}) };
});
vi.mock("@/lib/portal/busy", () => ({
  busyBlocks: async () => state.busy,
  calendarConnected: () => false,
}));

import { availableSlots, DEFAULT_SCHEDULE } from "@/lib/portal/schedule";

const ET = (s: string) => new Date(s); // helper for readability; strings carry their own offset

describe("availableSlots", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Monday Nov 16, 2026 at 9:00 AM Eastern (EST, UTC-5)
    vi.setSystemTime(ET("2026-11-16T09:00:00-05:00"));
    tables.settings = { data: { value: DEFAULT_SCHEDULE } };
    tables.blocked_dates = { data: [] };
    tables.bookings = { data: [] };
    state.busy = [];
  });
  afterEach(() => vi.useRealTimers());

  it("skips days with no hours (weekends by default)", async () => {
    const days = await availableSlots(30);
    const weekdays = days.map((d) => new Date(d.date + "T12:00:00Z").getUTCDay());
    expect(weekdays.every((w) => w >= 1 && w <= 5)).toBe(true);
    expect(days.length).toBeGreaterThan(15);
  });

  it("honors the notice period: nothing today when it is 9 AM and notice is 12 hours", async () => {
    const days = await availableSlots(30);
    expect(days[0].date).toBe("2026-11-17");
  });

  it("offers a slot every 30 minutes that fits before closing", async () => {
    const [tue30] = await availableSlots(30);
    expect(tue30.slots.map((s) => s.label)).toEqual([
      "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM",
      "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
    ]);
    const [tue60] = await availableSlots(60);
    expect(tue60.slots.at(-1)?.label).toBe("4:00 PM"); // 4:30 would run past 5 PM
    expect(tue60.slots).toHaveLength(13);
  });

  it("returns slot starts as UTC instants that map back to Eastern wall-clock times", async () => {
    const [tue] = await availableSlots(30);
    // 10:00 AM EST on Nov 17 is 15:00 UTC
    expect(tue.slots[0].start).toBe("2026-11-17T15:00:00.000Z");
  });

  it("removes away dates entirely", async () => {
    tables.blocked_dates = { data: [{ start_date: "2026-11-17", end_date: "2026-11-18" }] };
    const days = await availableSlots(30);
    expect(days[0].date).toBe("2026-11-19");
    expect(days.some((d) => d.date === "2026-11-17" || d.date === "2026-11-18")).toBe(false);
  });

  it("blocks existing bookings plus the buffer on each side", async () => {
    // Confirmed booking Tue Nov 17, 12:00-12:30 PM ET, with the default 15-minute buffer
    tables.bookings = { data: [{ starts_at: "2026-11-17T17:00:00Z", ends_at: "2026-11-17T17:30:00Z" }] };
    const [tue] = await availableSlots(30);
    const labels = tue.slots.map((s) => s.label);
    expect(labels).not.toContain("11:30 AM"); // 11:30-12:00 overlaps the 11:45 buffer
    expect(labels).not.toContain("12:00 PM");
    expect(labels).not.toContain("12:30 PM"); // 12:30-1:00 overlaps the 12:45 buffer
    expect(labels).toContain("11:00 AM");
    expect(labels).toContain("1:00 PM");
  });

  it("blocks Google Calendar busy time with no buffer", async () => {
    state.busy = [{ start: ET("2026-11-17T12:00:00-05:00"), end: ET("2026-11-17T12:30:00-05:00") }];
    const [tue] = await availableSlots(30);
    const labels = tue.slots.map((s) => s.label);
    expect(labels).not.toContain("12:00 PM");
    expect(labels).toContain("11:30 AM");
    expect(labels).toContain("12:30 PM");
  });

  it("respects custom hours per weekday", async () => {
    tables.settings = {
      data: { value: { ...DEFAULT_SCHEDULE, hours: { ...DEFAULT_SCHEDULE.hours, "2": null, "3": { start: "13:00", end: "15:00" } } } },
    };
    const days = await availableSlots(60);
    expect(days[0].date).toBe("2026-11-18"); // Tuesday is off
    expect(days[0].slots.map((s) => s.label)).toEqual(["1:00 PM", "1:30 PM", "2:00 PM"]);
  });

  it("falls back to defaults when settings are missing or partial", async () => {
    tables.settings = { data: null };
    const days = await availableSlots(30);
    expect(days.length).toBeGreaterThan(0);
    tables.settings = { data: { value: { bufferMinutes: 0 } } };
    const days2 = await availableSlots(30);
    expect(days2[0].slots.length).toBe(14);
  });
});

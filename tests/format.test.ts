import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { dateOnly, invoiceState, money, timeLabel, whenLabel } from "@/lib/portal/format";

describe("money", () => {
  it("formats whole dollars without cents", () => {
    expect(money(150_000)).toBe("$1,500");
  });
  it("formats cents when present", () => {
    expect(money(123_45)).toBe("$123.45");
    expect(money(5)).toBe("$0.05");
  });
  it("formats zero", () => {
    expect(money(0)).toBe("$0");
  });
});

describe("invoiceState", () => {
  // Freeze "today" in Eastern time: Nov 15, 2026 at noon ET.
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-15T17:00:00Z"));
  });
  afterEach(() => vi.useRealTimers());

  it("paid and void win regardless of date", () => {
    expect(invoiceState("paid", "2020-01-01")).toBe("paid");
    expect(invoiceState("void", "2099-01-01")).toBe("void");
  });
  it("open invoices are overdue, due today, or due", () => {
    expect(invoiceState("open", "2026-11-14")).toBe("overdue");
    expect(invoiceState("open", "2026-11-15")).toBe("today");
    expect(invoiceState("open", "2026-11-16")).toBe("due");
  });
  it("uses the Eastern date, not UTC, near midnight", () => {
    // 11:30 PM ET on Nov 14 is 04:30 UTC on Nov 15. It is still Nov 14 for the business.
    vi.setSystemTime(new Date("2026-11-15T04:30:00Z"));
    expect(invoiceState("open", "2026-11-14")).toBe("today");
    expect(invoiceState("open", "2026-11-15")).toBe("due");
  });
});

describe("date labels", () => {
  it("dateOnly does not shift a plain date", () => {
    expect(dateOnly("2026-11-21")).toBe("Nov 21");
    expect(dateOnly("2026-11-21", true)).toBe("Nov 21, 2026");
  });
  it("time labels are shown in Eastern time", () => {
    // 15:00 UTC on Nov 21 (EST) is 10:00 AM ET
    expect(timeLabel("2026-11-21T15:00:00Z")).toBe("10:00 AM");
    expect(whenLabel("2026-11-21T15:00:00Z")).toBe("Sat, Nov 21 at 10:00 AM ET");
  });
  it("handles daylight saving time", () => {
    // 15:00 UTC on Jul 1 (EDT) is 11:00 AM ET
    expect(timeLabel("2026-07-01T15:00:00Z")).toBe("11:00 AM");
  });
});

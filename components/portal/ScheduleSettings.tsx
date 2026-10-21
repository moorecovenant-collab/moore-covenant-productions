"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { addAway, removeAway, saveScheduleSettings } from "@/app/(portal)/app/actions";
import type { Schedule } from "@/lib/portal/schedule";

const DAYS = [
  ["1", "Monday"], ["2", "Tuesday"], ["3", "Wednesday"], ["4", "Thursday"], ["5", "Friday"], ["6", "Saturday"], ["7", "Sunday"],
] as const;

const field =
  "w-full rounded-xl border border-border bg-black px-3 py-2.5 text-base text-cream outline-none focus:border-gold";

export function HoursForm({ initial }: { initial: Schedule }) {
  const router = useRouter();
  const [s, setS] = useState<Schedule>(initial);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();

  const setDay = (k: string, v: { start: string; end: string } | null) => setS({ ...s, hours: { ...s.hours, [k]: v } });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          const r = await saveScheduleSettings(s);
          setMsg(r.ok ? { ok: true, text: "Saved. Clients see this right away." } : { ok: false, text: r.error });
          if (r.ok) router.refresh();
        });
      }}
      className="space-y-5 rounded-2xl border border-border bg-charcoal p-5"
    >
      <p className="text-[10px] uppercase tracking-[0.2em] text-gold">Weekly hours (Eastern)</p>
      <div className="space-y-3">
        {DAYS.map(([k, name]) => {
          const h = s.hours[k];
          return (
            <div key={k} className="flex items-center gap-3">
              <label className="flex w-28 shrink-0 items-center gap-2 text-sm text-cream">
                <input
                  type="checkbox"
                  checked={!!h}
                  onChange={(e) => setDay(k, e.target.checked ? { start: "10:00", end: "17:00" } : null)}
                  className="h-4 w-4 accent-[#c4974a]"
                />
                {name.slice(0, 3)}
              </label>
              {h ? (
                <div className="flex flex-1 items-center gap-2">
                  <input type="time" value={h.start} onChange={(e) => setDay(k, { ...h, start: e.target.value })} className={field} />
                  <span className="text-text-muted">to</span>
                  <input type="time" value={h.end} onChange={(e) => setDay(k, { ...h, end: e.target.value })} className={field} />
                </div>
              ) : (
                <span className="text-sm text-text-muted">Not available</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <label className="block text-xs text-text-secondary">
          Buffer (min)
          <input type="number" min={0} max={120} value={s.bufferMinutes} onChange={(e) => setS({ ...s, bufferMinutes: Number(e.target.value) })} className={`${field} mt-1`} />
        </label>
        <label className="block text-xs text-text-secondary">
          Notice (hrs)
          <input type="number" min={0} max={168} value={s.noticeHours} onChange={(e) => setS({ ...s, noticeHours: Number(e.target.value) })} className={`${field} mt-1`} />
        </label>
        <label className="block text-xs text-text-secondary">
          Days ahead
          <input type="number" min={7} max={90} value={s.windowDays} onChange={(e) => setS({ ...s, windowDays: Number(e.target.value) })} className={`${field} mt-1`} />
        </label>
      </div>

      <label className="block text-xs text-text-secondary">
        Google Meet link (shown to clients on their bookings)
        <input type="url" inputMode="url" autoCapitalize="none" value={s.meetLink} onChange={(e) => setS({ ...s, meetLink: e.target.value })} placeholder="https://meet.google.com/abc-defg-hij" className={`${field} mt-1`} />
      </label>

      <button disabled={pending} className="w-full rounded-full bg-gold py-3 text-sm font-medium text-black disabled:opacity-50">
        {pending ? "Saving..." : "Save hours"}
      </button>
      {msg && <p role="status" className={msg.ok ? "text-sm text-gold-light" : "text-sm text-red-300"}>{msg.text}</p>}
    </form>
  );
}

export function AwayForm() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          const r = await addAway(from, to || from);
          if (r.ok) {
            setFrom("");
            setTo("");
            setMsg(null);
            router.refresh();
          } else setMsg(r.error);
        });
      }}
      className="space-y-3 rounded-2xl border border-border bg-charcoal p-5"
    >
      <p className="text-[10px] uppercase tracking-[0.2em] text-gold">Block days off</p>
      <div className="flex items-center gap-2">
        <input type="date" required value={from} onChange={(e) => setFrom(e.target.value)} className={field} />
        <span className="text-text-muted">to</span>
        <input type="date" value={to} min={from} onChange={(e) => setTo(e.target.value)} className={field} />
      </div>
      <button disabled={pending} className="w-full rounded-full border border-gold py-3 text-sm text-gold disabled:opacity-50">
        {pending ? "Blocking..." : "Block these days"}
      </button>
      {msg && <p role="alert" className="text-sm text-red-300">{msg}</p>}
    </form>
  );
}

export function RemoveAway({ id }: { id: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() =>
        start(async () => {
          await removeAway(id);
          router.refresh();
        })
      }
      className="text-xs text-text-secondary underline-offset-4 hover:text-red-300 hover:underline disabled:opacity-50"
    >
      Remove
    </button>
  );
}

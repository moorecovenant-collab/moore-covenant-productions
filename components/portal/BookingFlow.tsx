"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import clsx from "clsx";
import { bookSlot } from "@/app/(portal)/app/actions";

type Slot = { start: string; label: string };
type Day = { date: string; label: string; slots: Slot[] };
type CallType = { id: string; label: string; minutes: number; blurb: string };

export default function BookingFlow({
  types,
  daysByType,
  readOnly,
}: {
  types: CallType[];
  daysByType: Record<string, Day[]>;
  readOnly: boolean;
}) {
  const router = useRouter();
  const [typeId, setTypeId] = useState(types[0].id);
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();

  const days = daysByType[typeId] ?? [];
  const day = days.find((d) => d.date === date) ?? null;
  const type = types.find((t) => t.id === typeId)!;

  const confirm = () =>
    start(async () => {
      setMsg(null);
      const r = await bookSlot({ callType: typeId, start: slot!, notes });
      if (r.ok) {
        setMsg({ ok: true, text: "You're booked. It's on your list above, and Elijah has been notified." });
        setSlot(null);
        setDate(null);
        setNotes("");
        router.refresh();
      } else {
        setMsg({ ok: false, text: r.error });
        router.refresh();
      }
    });

  return (
    <div className="space-y-6">
      <div className="grid gap-3">
        {types.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTypeId(t.id);
              setDate(null);
              setSlot(null);
              setMsg(null);
            }}
            className={clsx(
              "rounded-2xl border p-4 text-left transition-colors",
              t.id === typeId ? "border-gold bg-gold/[0.06]" : "border-border bg-charcoal hover:border-gold/50"
            )}
          >
            <p className="font-display text-xl text-cream">
              {t.label} <span className="text-sm text-text-secondary">· {t.minutes} min · Google Meet</span>
            </p>
            <p className="mt-1 text-sm text-text-secondary">{t.blurb}</p>
          </button>
        ))}
      </div>

      {days.length === 0 ? (
        <p className="rounded-2xl border border-border bg-charcoal p-5 text-sm text-text-secondary">
          Nothing open right now. Text Elijah and he'll find a time.
        </p>
      ) : (
        <>
          <section>
            <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-text-secondary">Pick a day</p>
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
              {days.map((d) => {
                const [wd, rest] = [d.label.split(",")[0].slice(0, 3), d.label.split(", ")[1]];
                return (
                  <button
                    key={d.date}
                    onClick={() => {
                      setDate(d.date);
                      setSlot(null);
                      setMsg(null);
                    }}
                    className={clsx(
                      "shrink-0 rounded-2xl border px-4 py-3 text-center transition-colors",
                      d.date === date ? "border-gold bg-gold text-black" : "border-border bg-charcoal text-cream hover:border-gold/60"
                    )}
                  >
                    <span className="block text-[10px] uppercase tracking-widest opacity-70">{wd}</span>
                    <span className="block text-sm">{rest}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {day && (
            <section>
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-text-secondary">{day.label} · Eastern time</p>
              <div className="grid grid-cols-3 gap-2">
                {day.slots.map((s) => (
                  <button
                    key={s.start}
                    onClick={() => setSlot(s.start)}
                    className={clsx(
                      "rounded-full border py-2.5 text-sm transition-colors",
                      s.start === slot ? "border-gold bg-gold text-black" : "border-border text-cream hover:border-gold/60"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </section>
          )}

          {slot && (
            <section className="space-y-3">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={500}
                rows={3}
                placeholder="Anything you want to cover? (optional)"
                className="w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-base text-cream placeholder:text-text-muted outline-none focus:border-gold"
              />
              <button
                disabled={pending || readOnly}
                onClick={confirm}
                className="w-full rounded-full bg-gold py-3.5 text-sm font-medium text-black disabled:opacity-50"
              >
                {readOnly ? "Preview only" : pending ? "Booking..." : `Book ${type.label}`}
              </button>
            </section>
          )}
        </>
      )}

      {msg && (
        <p role="status" className={msg.ok ? "text-sm text-gold-light" : "text-sm text-red-300"}>
          {msg.text}
        </p>
      )}
    </div>
  );
}

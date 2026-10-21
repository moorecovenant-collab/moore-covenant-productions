"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import clsx from "clsx";
import { submitLead } from "@/app/(portal)/app/actions";
import { SERVICES } from "@/lib/portal/services";

const input =
  "w-full rounded-xl border border-border bg-charcoal px-4 py-3.5 text-base text-cream placeholder:text-text-muted outline-none focus:border-gold";

export default function StartForm() {
  const [v, setV] = useState({ name: "", email: "", company: "", phone: "", service: "", goals: "", website: "" });
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setV({ ...v, [k]: e.target.value });

  if (done) {
    return (
      <div className="rounded-2xl border border-gold/30 bg-gold/[0.06] p-6">
        <h2 className="mb-2 font-display text-3xl text-cream">Got it.</h2>
        <p className="text-sm leading-relaxed text-text-primary">
          Elijah reviews every request himself and will reach out within 24 to 48 hours. Once you're approved, sign in with{" "}
          <span className="text-cream">{v.email}</span> to see your invoice, pay, and book time.
        </p>
        <Link href="/app/login" className="mt-5 inline-block text-sm text-gold underline-offset-4 hover:underline">
          Go to sign in
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          setError("");
          const r = await submitLead(v);
          if (r.ok) setDone(true);
          else setError(r.error);
        });
      }}
      className="space-y-4"
    >
      <input required value={v.name} onChange={set("name")} placeholder="Your name" autoComplete="name" className={input} />
      <input required type="email" inputMode="email" autoCapitalize="none" value={v.email} onChange={set("email")} placeholder="Email" autoComplete="email" className={input} />
      <input value={v.company} onChange={set("company")} placeholder="Business name (optional)" autoComplete="organization" className={input} />
      <input type="tel" inputMode="tel" value={v.phone} onChange={set("phone")} placeholder="Phone (optional)" autoComplete="tel" className={input} />

      <fieldset>
        <legend className="mb-3 text-[10px] uppercase tracking-[0.2em] text-text-secondary">What do you need?</legend>
        <div className="grid gap-2">
          {SERVICES.map((s) => (
            <label
              key={s.id}
              className={clsx(
                "cursor-pointer rounded-2xl border p-4 transition-colors",
                v.service === s.id ? "border-gold bg-gold/[0.06]" : "border-border bg-charcoal hover:border-gold/50"
              )}
            >
              <input type="radio" name="service" value={s.id} checked={v.service === s.id} onChange={() => setV({ ...v, service: s.id })} className="sr-only" />
              <span className="flex items-baseline justify-between gap-3">
                <span className="font-display text-xl text-cream">{s.label}</span>
                <span className="shrink-0 text-xs text-gold">{s.price}</span>
              </span>
              <span className="mt-1 block text-sm text-text-secondary">{s.note}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <textarea value={v.goals} onChange={set("goals")} maxLength={1500} rows={4} placeholder="Tell us about your business and what you want to achieve." className={input} />

      {/* honeypot: hidden from people, bots fill it in */}
      <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={v.website} onChange={set("website")} className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      <button disabled={pending || !v.service} className="w-full rounded-full bg-gold py-3.5 text-sm font-medium text-black disabled:opacity-50">
        {pending ? "Sending..." : "Send my request"}
      </button>
      {error && (
        <p role="alert" className="text-sm text-red-300">
          {error}
        </p>
      )}
      <p className="text-xs leading-relaxed text-text-muted">
        Nothing is charged by sending this. Elijah reviews your request first, then you get an invoice in the app.
      </p>
    </form>
  );
}

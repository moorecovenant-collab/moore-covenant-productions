"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { inviteClient } from "@/app/(portal)/app/actions";

const input =
  "w-full rounded-xl border border-border bg-black px-4 py-3 text-base text-cream placeholder:text-text-muted outline-none focus:border-gold";

export default function InviteForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [kind, setKind] = useState<"client" | "partner">("client");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          const r = await inviteClient({ name, email, company, kind });
          if (r.ok) {
            setMsg({ ok: true, text: `${name} can now sign in with ${email}.` });
            setName("");
            setEmail("");
            setCompany("");
            router.refresh();
          } else setMsg({ ok: false, text: r.error });
        });
      }}
      className="space-y-3 rounded-2xl border border-border bg-charcoal p-5"
    >
      <p className="text-[10px] uppercase tracking-[0.2em] text-gold">Add a client</p>
      <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" autoComplete="off" className={input} />
      <input required type="email" inputMode="email" autoCapitalize="none" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" autoComplete="off" className={input} />
      <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Business (optional)" autoComplete="off" className={input} />
      <div className="flex gap-2">
        {([["client", "Client", "Invoices, payments, booking"], ["partner", "Partner", "Booking and updates only, no money"]] as const).map(([k, label, blurb]) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            className={`flex-1 rounded-xl border px-3 py-2.5 text-left ${k === kind ? "border-gold bg-gold/[0.06]" : "border-border"}`}
          >
            <span className="block text-sm text-cream">{label}</span>
            <span className="block text-[11px] text-text-secondary">{blurb}</span>
          </button>
        ))}
      </div>
      <button disabled={pending} className="w-full rounded-full bg-gold py-3 text-sm font-medium text-black disabled:opacity-50">
        {pending ? "Adding..." : "Add client"}
      </button>
      {msg && (
        <p role="status" className={msg.ok ? "text-sm text-gold-light" : "text-sm text-red-300"}>
          {msg.text}
        </p>
      )}
    </form>
  );
}

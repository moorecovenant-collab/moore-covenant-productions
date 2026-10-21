"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { changeInvoice, newInvoice } from "@/app/(portal)/app/actions";

const input =
  "w-full rounded-xl border border-border bg-black px-4 py-3 text-base text-cream placeholder:text-text-muted outline-none focus:border-gold";

export function InvoiceForm({ clients }: { clients: { id: string; name: string; company: string | null }[] }) {
  const router = useRouter();
  const [clientId, setClientId] = useState(clients[0]?.id ?? "");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [paid, setPaid] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();

  if (clients.length === 0) return <p className="text-sm text-text-secondary">Add a client first, then you can bill them here.</p>;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          const r = await newInvoice({ clientId, description, amount: Number(amount), dueDate, paid });
          if (r.ok) {
            setMsg({ ok: true, text: "Invoice added." });
            setDescription("");
            setAmount("");
            setPaid(false);
            router.refresh();
          } else setMsg({ ok: false, text: r.error });
        });
      }}
      className="space-y-3 rounded-2xl border border-border bg-charcoal p-5"
    >
      <p className="text-[10px] uppercase tracking-[0.2em] text-gold">New invoice</p>
      <select value={clientId} onChange={(e) => setClientId(e.target.value)} className={input}>
        {clients.map((c) => (
          <option key={c.id} value={c.id}>
            {c.company ? `${c.company} (${c.name})` : c.name}
          </option>
        ))}
      </select>
      <input required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What it's for (e.g. Social media, November)" className={input} />
      <div className="flex gap-3">
        <input required type="number" inputMode="decimal" min="1" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount ($)" className={input} />
        <input required type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={input} />
      </div>
      <label className="flex items-center gap-2 text-sm text-text-secondary">
        <input type="checkbox" checked={paid} onChange={(e) => setPaid(e.target.checked)} className="h-4 w-4 accent-[#c4974a]" />
        Already paid
      </label>
      <button disabled={pending} className="w-full rounded-full bg-gold py-3 text-sm font-medium text-black disabled:opacity-50">
        {pending ? "Saving..." : "Add invoice"}
      </button>
      {msg && <p role="status" className={msg.ok ? "text-sm text-gold-light" : "text-sm text-red-300"}>{msg.text}</p>}
    </form>
  );
}

export function InvoiceActions({ id, status }: { id: string; status: "open" | "paid" | "void" }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const run = (s: "open" | "paid" | "void") =>
    start(async () => {
      await changeInvoice(id, s);
      router.refresh();
    });
  return (
    <div className="flex items-center gap-3">
      {status === "open" ? (
        <button disabled={pending} onClick={() => run("paid")} className="rounded-full bg-gold px-3 py-1.5 text-xs font-medium text-black disabled:opacity-50">
          Mark paid
        </button>
      ) : (
        <button disabled={pending} onClick={() => run("open")} className="text-xs text-text-secondary underline-offset-4 hover:underline disabled:opacity-50">
          Reopen
        </button>
      )}
      <button
        disabled={pending}
        onClick={() => confirm("Remove this invoice?") && run("void")}
        className="text-xs text-text-secondary underline-offset-4 hover:text-red-300 hover:underline disabled:opacity-50"
      >
        Remove
      </button>
    </div>
  );
}

import { savePayments } from "@/app/(portal)/app/actions";
import type { PaymentSettings } from "@/lib/portal/payments";

export function PaymentSettingsForm({ initial }: { initial: PaymentSettings }) {
  const router = useRouter();
  const [s, setS] = useState(initial);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          const r = await savePayments(s);
          setMsg(r.ok ? { ok: true, text: "Saved. Clients see these options right away." } : { ok: false, text: r.error });
          if (r.ok) router.refresh();
        });
      }}
      className="space-y-3 rounded-2xl border border-border bg-charcoal p-5"
    >
      <p className="text-[10px] uppercase tracking-[0.2em] text-gold">How clients pay you</p>
      <label className="block text-xs text-text-secondary">
        PayPal.me name
        <input value={s.paypalHandle} onChange={(e) => setS({ ...s, paypalHandle: e.target.value })} autoCapitalize="none" placeholder="isthatelii" className={`${input} mt-1`} />
      </label>
      <label className="block text-xs text-text-secondary">
        Zelle email
        <input type="email" value={s.zelleEmail} onChange={(e) => setS({ ...s, zelleEmail: e.target.value })} autoCapitalize="none" className={`${input} mt-1`} />
      </label>
      <label className="block text-xs text-text-secondary">
        Square payment link (adds a "Pay by card" button)
        <input type="url" inputMode="url" value={s.squareLink} onChange={(e) => setS({ ...s, squareLink: e.target.value })} autoCapitalize="none" placeholder="https://square.link/u/..." className={`${input} mt-1`} />
      </label>
      <button disabled={pending} className="w-full rounded-full border border-gold py-3 text-sm text-gold disabled:opacity-50">
        {pending ? "Saving..." : "Save payment options"}
      </button>
      {msg && <p role="status" className={msg.ok ? "text-sm text-gold-light" : "text-sm text-red-300"}>{msg.text}</p>}
    </form>
  );
}

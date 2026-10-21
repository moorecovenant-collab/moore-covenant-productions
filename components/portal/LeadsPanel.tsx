"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { approveLead, declineLead } from "@/app/(portal)/app/actions";
import type { Lead } from "@/lib/portal/leads";
import { SERVICES, serviceLabel } from "@/lib/portal/services";

const input =
  "w-full rounded-xl border border-border bg-black px-3 py-2.5 text-base text-cream placeholder:text-text-muted outline-none focus:border-gold";

type Approved = { name: string; email: string; phone: string | null };

const tell = (a: Approved) => {
  const body = `Hi ${a.name.split(" ")[0]}, you're approved. Go to moorecovenantproductions.com/app, sign in with ${a.email} (we email you a code), and you'll see your invoice and can book a call. - Elijah`;
  return {
    mail: `mailto:${a.email}?subject=${encodeURIComponent("You're approved: Moore Covenant Productions")}&body=${encodeURIComponent(body)}`,
    sms: a.phone ? `sms:${a.phone.replace(/[^\d+]/g, "")}&body=${encodeURIComponent(body)}` : null,
  };
};

function LeadCard({ lead }: { lead: Lead }) {
  const router = useRouter();
  const svc = SERVICES.find((s) => s.id === lead.service);
  const [description, setDescription] = useState(`${serviceLabel(lead.service)}: first payment`);
  const [amount, setAmount] = useState(svc?.suggestedCents ? String(svc.suggestedCents / 100) : "");
  const [dueDate, setDueDate] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [approved, setApproved] = useState<Approved | null>(null);
  const [pending, start] = useTransition();

  if (approved) {
    const t = tell(approved);
    return (
      <li className="rounded-2xl border border-gold/40 bg-gold/[0.06] p-5">
        <p className="font-display text-xl text-cream">{approved.name} is approved.</p>
        <p className="mt-1 text-sm text-text-secondary">Their invoice is ready. Let them know they can sign in:</p>
        <div className="mt-4 flex gap-3">
          <a href={t.mail} className="rounded-full bg-gold px-4 py-2 text-sm font-medium text-black">
            Email them
          </a>
          {t.sms && (
            <a href={t.sms} className="rounded-full border border-border px-4 py-2 text-sm text-cream">
              Text them
            </a>
          )}
          <button onClick={() => router.refresh()} className="ml-auto text-sm text-text-secondary underline-offset-4 hover:underline">
            Done
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="rounded-2xl border border-border bg-charcoal p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-cream">{lead.name}{lead.company ? ` · ${lead.company}` : ""}</p>
          <p className="truncate text-sm text-text-secondary">{lead.email}{lead.phone ? ` · ${lead.phone}` : ""}</p>
        </div>
        <span className="shrink-0 rounded-full border border-gold/50 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">New</span>
      </div>
      <p className="mt-3 text-sm text-cream">{serviceLabel(lead.service)} <span className="text-text-secondary">· {svc?.price}</span></p>
      {lead.goals && <p className="mt-2 text-sm leading-relaxed text-text-secondary">“{lead.goals}”</p>}

      {!open ? (
        <div className="mt-4 flex items-center gap-3">
          <button onClick={() => setOpen(true)} className="rounded-full bg-gold px-4 py-2 text-sm font-medium text-black">
            Approve
          </button>
          <button
            disabled={pending}
            onClick={() => confirm(`Decline ${lead.name}?`) && start(async () => { await declineLead(lead.id); router.refresh(); })}
            className="text-sm text-text-secondary underline-offset-4 hover:text-red-300 hover:underline disabled:opacity-50"
          >
            Decline
          </button>
        </div>
      ) : (
        <form
          className="mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            start(async () => {
              setError("");
              const r = await approveLead({ leadId: lead.id, description, amount: Number(amount), dueDate });
              if (r.ok) setApproved({ name: r.name, email: r.email, phone: r.phone });
              else setError(r.error);
            });
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold">First invoice (deposit)</p>
          <input required value={description} onChange={(e) => setDescription(e.target.value)} className={input} />
          <div className="flex gap-3">
            <input required type="number" inputMode="decimal" min="1" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount ($)" className={input} />
            <input required type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={input} />
          </div>
          <div className="flex items-center gap-3">
            <button disabled={pending} className="rounded-full bg-gold px-4 py-2 text-sm font-medium text-black disabled:opacity-50">
              {pending ? "Approving..." : "Approve and send invoice"}
            </button>
            <button type="button" onClick={() => setOpen(false)} className="text-sm text-text-secondary underline-offset-4 hover:underline">
              Back
            </button>
          </div>
          {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
        </form>
      )}
    </li>
  );
}

export default function LeadsPanel({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) return null;
  return (
    <section>
      <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-gold">New requests ({leads.length})</p>
      <ul className="space-y-3">
        {leads.map((l) => (
          <LeadCard key={l.id} lead={l} />
        ))}
      </ul>
    </section>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteAlert, sendAlert } from "@/app/(portal)/app/actions";
import { ALERT_KINDS } from "@/lib/portal/alert-kinds";
import type { Alert } from "@/lib/portal/alerts";
import { whenLabel } from "@/lib/portal/format";

const input =
  "w-full rounded-xl border border-border bg-black px-4 py-3 text-base text-cream placeholder:text-text-muted outline-none focus:border-gold";

export function AlertComposer({ clients }: { clients: { id: string; name: string; company: string | null }[] }) {
  const router = useRouter();
  const [kind, setKind] = useState("deal");
  const [clientId, setClientId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          const r = await sendAlert({ title, body, kind, clientId: clientId || null });
          if (r.ok) {
            setMsg({ ok: true, text: r.devices ? `Sent. It reached ${r.devices} phone${r.devices === 1 ? "" : "s"} and is in their feed.` : "Posted to their feed. No phones have notifications on yet." });
            setTitle("");
            setBody("");
            router.refresh();
          } else setMsg({ ok: false, text: r.error });
        });
      }}
      className="space-y-3 rounded-2xl border border-border bg-charcoal p-5"
    >
      <p className="text-[10px] uppercase tracking-[0.2em] text-gold">New alert</p>
      <div className="flex gap-2">
        {ALERT_KINDS.map((k) => (
          <button
            key={k.id}
            type="button"
            onClick={() => setKind(k.id)}
            className={`rounded-full border px-3 py-1.5 text-xs ${k.id === kind ? "border-gold text-gold" : "border-border text-text-secondary"}`}
          >
            {k.label}
          </button>
        ))}
      </div>
      <select value={clientId} onChange={(e) => setClientId(e.target.value)} className={input}>
        <option value="">Send to everyone</option>
        {clients.map((c) => (
          <option key={c.id} value={c.id}>
            Only {c.company ? `${c.company} (${c.name})` : c.name}
          </option>
        ))}
      </select>
      <input required maxLength={80} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (e.g. 20% off content days this month)" className={input} />
      <textarea required maxLength={500} rows={3} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Message" className={input} />
      <button disabled={pending} className="w-full rounded-full bg-gold py-3 text-sm font-medium text-black disabled:opacity-50">
        {pending ? "Sending..." : "Send alert"}
      </button>
      {msg && <p role="status" className={msg.ok ? "text-sm text-gold-light" : "text-sm text-red-300"}>{msg.text}</p>}
    </form>
  );
}

export function DeleteAlert({ id }: { id: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => confirm("Delete this alert for everyone it reached?") && start(async () => { await deleteAlert(id); router.refresh(); })}
      className="text-xs text-text-secondary underline-offset-4 hover:text-red-300 hover:underline disabled:opacity-50"
    >
      Delete
    </button>
  );
}

export const KIND_LABEL: Record<Alert["kind"], string> = { deal: "Deal", schedule: "Schedule change", news: "News" };
export const when = whenLabel;

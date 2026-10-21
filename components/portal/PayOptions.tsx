"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { claimPayment } from "@/app/(portal)/app/actions";
import type { PaymentSettings } from "@/lib/portal/payments";

const METHODS = ["Zelle", "PayPal", "Square", "Cash App", "Other"] as const;

export default function PayOptions({
  amountCents,
  settings,
  alreadyClaimed,
  readOnly,
}: {
  amountCents: number;
  settings: PaymentSettings;
  alreadyClaimed: boolean;
  readOnly: boolean;
}) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [method, setMethod] = useState<(typeof METHODS)[number]>("Zelle");
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const dollars = (amountCents / 100).toFixed(2);
  const pill = "rounded-full px-5 py-2.5 text-sm";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {settings.squareLink && (
          <a href={settings.squareLink} target="_blank" rel="noopener noreferrer" className={`${pill} bg-gold font-medium text-black`}>
            Pay by card
          </a>
        )}
        {settings.paypalHandle && (
          <a
            href={`https://paypal.me/${settings.paypalHandle}/${dollars}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${pill} ${settings.squareLink ? "border border-border text-cream hover:border-gold" : "bg-gold font-medium text-black"}`}
          >
            Pay with PayPal
          </a>
        )}
        {settings.cashAppTag && (
          <a
            href={`https://cash.app/$${settings.cashAppTag}/${dollars}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${pill} border border-border text-cream hover:border-gold`}
          >
            Pay with Cash App
          </a>
        )}
        {settings.zelleEmail && (
          <button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(settings.zelleEmail);
                setCopied(true);
                setTimeout(() => setCopied(false), 2500);
              } catch {}
            }}
            className={`${pill} border border-border text-cream hover:border-gold`}
          >
            {copied ? "Zelle email copied" : "Pay with Zelle"}
          </button>
        )}
      </div>
      {settings.zelleEmail && (
        <p className="text-xs leading-relaxed text-text-muted">
          Zelle: send ${dollars} to <span className="text-text-secondary">{settings.zelleEmail}</span> from your bank app.
        </p>
      )}

      {alreadyClaimed ? (
        <p className="rounded-xl border border-gold/30 bg-gold/[0.06] px-4 py-3 text-sm text-text-primary">
          Thanks. Elijah was told you paid and will confirm it here shortly.
        </p>
      ) : (
        <div className="rounded-xl border border-border p-4">
          <p className="mb-3 text-sm text-cream">Already sent it?</p>
          <div className="flex flex-wrap items-center gap-2">
            {METHODS.map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`rounded-full border px-3 py-1.5 text-xs ${m === method ? "border-gold text-gold" : "border-border text-text-secondary"}`}
              >
                {m}
              </button>
            ))}
            <button
              disabled={pending || readOnly}
              onClick={() =>
                start(async () => {
                  const r = await claimPayment(method);
                  if (r.ok) router.refresh();
                  else setMsg(r.error);
                })
              }
              className="ml-auto rounded-full bg-gold px-4 py-1.5 text-xs font-medium text-black disabled:opacity-50"
            >
              {readOnly ? "Preview only" : pending ? "Sending..." : "I've paid"}
            </button>
          </div>
          {msg && <p role="alert" className="mt-2 text-sm text-red-300">{msg}</p>}
        </div>
      )}
      <p className="text-xs text-text-muted">Elijah confirms each payment on his end. It can take a few hours.</p>
    </div>
  );
}

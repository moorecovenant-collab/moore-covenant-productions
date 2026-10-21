"use client";

import { useState } from "react";

const PAYPAL = "https://paypal.me/isthatelii";
const ZELLE = "elijahandisaacsworld@gmail.com";

export default function PayOptions({ amountCents }: { amountCents: number }) {
  const [copied, setCopied] = useState(false);
  const dollars = (amountCents / 100).toFixed(2);
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={`${PAYPAL}/${dollars}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-black"
      >
        Pay with PayPal
      </a>
      <button
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(ZELLE);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
          } catch {}
        }}
        className="rounded-full border border-border px-5 py-2.5 text-sm text-cream hover:border-gold"
      >
        {copied ? "Zelle email copied" : "Pay with Zelle"}
      </button>
    </div>
  );
}

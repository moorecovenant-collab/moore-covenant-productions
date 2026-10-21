"use client";

import { useEffect, useState } from "react";
import { ShareIcon } from "./Icons";

type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

const DISMISS = "mcp-install-dismissed";

export default function InstallCard() {
  const [mode, setMode] = useState<"hidden" | "ios" | "prompt">("hidden");
  const [evt, setEvt] = useState<InstallEvent | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS)) return;
    } catch {}
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone) return;

    const ios = /iPhone|iPad|iPod/.test(navigator.userAgent);
    if (ios) setMode("ios");

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvt(e as InstallEvent);
      setMode("prompt");
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  const dismiss = () => {
    setMode("hidden");
    try {
      localStorage.setItem(DISMISS, "1");
    } catch {}
  };

  if (mode === "hidden") return null;

  return (
    <section className="rounded-2xl border border-gold/30 bg-gold/[0.06] p-5">
      <p className="text-[10px] uppercase tracking-[0.2em] text-gold mb-2">Add to your phone</p>
      {mode === "ios" ? (
        <p className="text-sm leading-relaxed text-text-primary">
          Tap <span className="inline-flex translate-y-[3px] text-gold"><ShareIcon /></span> at the bottom of Safari, then{" "}
          <span className="text-cream">Add to Home Screen</span>. That gives you the app icon and lets us send you alerts.
        </p>
      ) : (
        <p className="text-sm leading-relaxed text-text-primary">Install the app for one-tap access and alerts when something changes.</p>
      )}
      <div className="mt-4 flex items-center gap-3">
        {mode === "prompt" && evt && (
          <button
            onClick={async () => {
              await evt.prompt();
              await evt.userChoice;
              setEvt(null);
              dismiss();
            }}
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-black"
          >
            Install
          </button>
        )}
        <button onClick={dismiss} className="text-sm text-text-secondary underline-offset-4 hover:underline">
          Not now
        </button>
      </div>
    </section>
  );
}

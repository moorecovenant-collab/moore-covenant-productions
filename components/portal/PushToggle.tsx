"use client";

import { useEffect, useState, useTransition } from "react";
import { removeSubscription, saveSubscription, sendTestPush } from "@/app/(portal)/app/actions";

type State = "loading" | "unsupported" | "install" | "denied" | "off" | "on";

const toKey = (b64: string) => {
  const pad = "=".repeat((4 - (b64.length % 4)) % 4);
  const raw = atob((b64 + pad).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
};

export default function PushToggle({ publicKey, compact }: { publicKey: string | null; compact?: boolean }) {
  const [state, setState] = useState<State>("loading");
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();

  useEffect(() => {
    (async () => {
      const ios = /iPhone|iPad|iPod/.test(navigator.userAgent);
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;
      if (!publicKey || !("serviceWorker" in navigator)) return setState("unsupported");
      // iPhones only allow notifications for apps added to the Home Screen
      if (ios && !standalone) return setState("install");
      if (!("PushManager" in window) || !("Notification" in window)) return setState("unsupported");
      if (Notification.permission === "denied") return setState("denied");
      try {
        const reg = await navigator.serviceWorker.ready;
        const sub = await reg.pushManager.getSubscription();
        if (sub && Notification.permission === "granted") {
          // the phone already has a subscription: make sure the server has it too (safe to repeat)
          const r = await saveSubscription(sub.toJSON());
          if (!r.ok) setMsg(r.error);
          setState("on");
        } else {
          setState("off");
        }
      } catch {
        setState("unsupported");
      }
    })();
  }, [publicKey]);

  const turnOn = () =>
    start(async () => {
      setMsg(null);
      try {
        const perm = await Notification.requestPermission();
        if (perm !== "granted") return setState(perm === "denied" ? "denied" : "off");
        const reg = await navigator.serviceWorker.ready;
        const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: toKey(publicKey!) });
        const r = await saveSubscription(sub.toJSON());
        if (r.ok) setState("on");
        else setMsg(r.error);
      } catch {
        setMsg("Couldn't turn notifications on. Try again.");
      }
    });

  const turnOff = () =>
    start(async () => {
      try {
        const reg = await navigator.serviceWorker.ready;
        const sub = await reg.pushManager.getSubscription();
        if (sub) {
          await removeSubscription(sub.endpoint);
          await sub.unsubscribe();
        }
        setState("off");
      } catch {
        setMsg("Couldn't turn that off. Try again.");
      }
    });

  if (state === "loading" || state === "unsupported") return null;
  if (compact && (state === "on" || state === "denied")) return null;

  return (
    <section className="rounded-2xl border border-border bg-charcoal p-5">
      <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-gold">Notifications</p>
      {state === "install" && (
        <p className="text-sm leading-relaxed text-text-secondary">
          On iPhone, notifications work once the app is on your Home Screen. Tap Share in Safari, then <span className="text-cream">Add to Home Screen</span>, then open the app from its icon.
        </p>
      )}
      {state === "denied" && (
        <p className="text-sm leading-relaxed text-text-secondary">
          Notifications are blocked for this app. Turn them on in your phone's Settings, under Notifications, then Moore Covenant.
        </p>
      )}
      {state === "off" && (
        <>
          <p className="mb-4 text-sm leading-relaxed text-text-secondary">Get deals, schedule changes, and payment updates on your phone the moment they happen.</p>
          <button disabled={pending} onClick={turnOn} className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-black disabled:opacity-50">
            {pending ? "Turning on..." : "Turn on notifications"}
          </button>
        </>
      )}
      {state === "on" && (
        <>
          <p className="mb-4 text-sm leading-relaxed text-text-secondary">Notifications are on for this device.</p>
          <div className="flex items-center gap-4">
            <button
              disabled={pending}
              onClick={() =>
                start(async () => {
                  // re-register this device first, in case the server lost it
                  try {
                    const reg = await navigator.serviceWorker.ready;
                    const sub = await reg.pushManager.getSubscription();
                    if (sub) await saveSubscription(sub.toJSON());
                  } catch {}
                  const r = await sendTestPush();
                  setMsg(r.ok ? "Sent. Check your phone." : r.error);
                })
              }
              className="rounded-full border border-border px-4 py-2 text-sm text-cream hover:border-gold disabled:opacity-50"
            >
              Send me a test
            </button>
            <button disabled={pending} onClick={turnOff} className="text-sm text-text-secondary underline-offset-4 hover:underline disabled:opacity-50">
              Turn off
            </button>
          </div>
        </>
      )}
      {msg && <p role="status" className="mt-3 text-sm text-gold-light">{msg}</p>}
    </section>
  );
}

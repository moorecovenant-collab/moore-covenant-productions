"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { devLogin, requestCode, verifyCode } from "@/app/(portal)/app/actions";

const input =
  "w-full rounded-xl border border-border bg-charcoal px-4 py-3.5 text-base text-cream placeholder:text-text-muted outline-none focus:border-gold";
const primary = "w-full rounded-full bg-gold py-3.5 text-sm font-medium text-black transition-opacity disabled:opacity-50";

export default function LoginForm({ dev }: { dev: boolean }) {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [pending, start] = useTransition();

  const enter = () => {
    router.replace("/app");
    router.refresh();
  };

  const sendCode = () =>
    start(async () => {
      setError("");
      const r = await requestCode(email);
      if (r.ok) setStep("code");
      else setError(r.error);
    });

  const submitCode = () =>
    start(async () => {
      setError("");
      const r = await verifyCode(email, code);
      if (r.ok) enter();
      else setError(r.error);
    });

  const demo = (role: "admin" | "client") =>
    start(async () => {
      const r = await devLogin(role);
      if (r.ok) enter();
      else setError(r.error);
    });

  return (
    <div className="space-y-4">
      {step === "email" ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendCode();
          }}
          className="space-y-4"
        >
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-text-secondary">Email</span>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className={input}
            />
          </label>
          <button disabled={pending || !email} className={primary}>
            {pending ? "Sending..." : "Email me a code"}
          </button>
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitCode();
          }}
          className="space-y-4"
        >
          <p className="text-sm leading-relaxed text-text-secondary">
            If <span className="text-cream">{email}</span> is set up, a code is on its way. Enter it below.
          </p>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="\d*"
            maxLength={10}
            required
            autoFocus
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="123456"
            className={`${input} text-center text-2xl tracking-[0.4em]`}
          />
          <button disabled={pending || code.length < 6} className={primary}>
            {pending ? "Checking..." : "Sign in"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStep("email");
              setCode("");
              setError("");
            }}
            className="w-full text-sm text-text-secondary underline-offset-4 hover:underline"
          >
            Use a different email
          </button>
        </form>
      )}

      {error && (
        <p role="alert" className="text-sm text-red-300">
          {error}
        </p>
      )}

      {dev && (
        <div className="mt-8 rounded-xl border border-dashed border-border p-4">
          <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-text-muted">Local dev only</p>
          <div className="flex gap-3">
            <button disabled={pending} onClick={() => demo("client")} className="flex-1 rounded-full border border-border py-2.5 text-sm hover:border-gold">
              Demo client
            </button>
            <button disabled={pending} onClick={() => demo("admin")} className="flex-1 rounded-full border border-border py-2.5 text-sm hover:border-gold">
              Demo admin
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

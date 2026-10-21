"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type Message = { role: "user" | "assistant"; text: string };

const CLIENT_QUICK = ["What do I owe?", "When's my next call?", "Book a check-in", "What's included in my plan?"];
const ADMIN_QUICK = ["What's on today?", "Who owes me?", "Any new requests?", "What's open this week?"];

export default function AssistantChat({ role, name, previewing }: { role: "admin" | "client"; name: string; previewing: boolean }) {
  const store = `mcp-assistant-${role}-${name}`;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [offline, setOffline] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const first = name.split(" ")[0];
  const greeting =
    role === "admin"
      ? `Hey ${first}. Ask me what's on today, who owes you, or what's open this week.`
      : `Hey ${first}. Ask me about your balance, your next call, or what's included in your plan. I can book or move a call for you too.`;

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(store);
      if (saved) setMessages(JSON.parse(saved));
    } catch {}
  }, [store]);
  useEffect(() => {
    try {
      if (messages.length) sessionStorage.setItem(store, JSON.stringify(messages.slice(-40)));
    } catch {}
  }, [messages, store]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || busy) return;
    const history: Message[] = [...messages, { role: "user", text: content }];
    setMessages(history);
    setInput("");
    setBusy(true);
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: ac.signal,
        body: JSON.stringify({ messages: history.slice(-30).map((m) => ({ role: m.role, content: m.text })) }),
      });
      if (res.status === 503 || res.status === 401) {
        setOffline(true);
        setMessages((prev) => [...prev, { role: "assistant", text: "The assistant is offline right now. Text Elijah at (202) 407-5248 and he'll help directly." }]);
        return;
      }
      if (!res.ok || !res.body) throw new Error(String(res.status));
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      setMessages((prev) => [...prev, { role: "assistant", text: "" }]);
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        const snapshot = acc;
        setMessages((prev) => {
          const next = prev.slice();
          next[next.length - 1] = { role: "assistant", text: snapshot };
          return next;
        });
      }
      if (!acc.trim()) {
        setMessages((prev) => {
          const next = prev.slice();
          next[next.length - 1] = { role: "assistant", text: "Say that one more time? I didn't catch it." };
          return next;
        });
      }
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      setMessages((prev) => [...prev, { role: "assistant", text: "I lost the connection for a second. Try again, or text Elijah at (202) 407-5248." }]);
    } finally {
      setBusy(false);
    }
  };

  const shown: Message[] = messages.length ? messages : [{ role: "assistant", text: greeting }];
  const quick = role === "admin" ? ADMIN_QUICK : CLIENT_QUICK;

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100dvh - 12rem)" }}>
      <div className="flex-1 space-y-3 pb-40">
        {previewing && (
          <p className="rounded-xl border border-gold/30 bg-gold/[0.06] px-4 py-3 text-xs text-text-primary">
            You're previewing as {name}. The assistant answers from their account, but booking and payments are switched off in preview.
          </p>
        )}
        {shown.map((m, i) => (
          <div key={i} className={clsx("flex", m.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={clsx(
                "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed",
                m.role === "user" ? "bg-gold text-black" : "border border-border bg-charcoal text-text-primary"
              )}
            >
              {m.text || <span className="inline-block animate-pulse text-text-muted">…</span>}
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {quick.map((q) => (
              <button key={q} onClick={() => send(q)} className="rounded-full border border-border px-3 py-1.5 text-xs text-cream hover:border-gold">
                {q}
              </button>
            ))}
          </div>
        )}
        {messages.length > 0 && !busy && (
          <button
            onClick={() => {
              abortRef.current?.abort();
              setMessages([]);
              try {
                sessionStorage.removeItem(store);
              } catch {}
            }}
            className="text-xs text-text-muted underline-offset-4 hover:underline"
          >
            Start over
          </button>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="fixed inset-x-0 z-30 border-t border-border/60 bg-black/90 backdrop-blur-md"
        style={{ bottom: "calc(4.25rem + env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-xl items-center gap-2 px-5 py-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={busy || offline}
            placeholder={offline ? "Assistant offline" : role === "admin" ? "Ask about today, requests, or money" : "Ask anything about your account"}
            maxLength={2000}
            autoComplete="off"
            className="flex-1 rounded-full border border-border bg-charcoal px-4 py-3 text-base text-cream placeholder:text-text-muted outline-none focus:border-gold disabled:opacity-50"
          />
          <button
            disabled={busy || offline || !input.trim()}
            className="h-11 w-11 shrink-0 rounded-full bg-gold text-black disabled:opacity-40"
            aria-label="Send"
          >
            <svg viewBox="0 0 24 24" className="mx-auto h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

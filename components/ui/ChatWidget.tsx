"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type Message = { role: "user" | "assistant"; text: string };

const GREETING =
  "Hey, this is the front desk at Moore Covenant Productions. Ask me about social, video, or websites, or tell me what you're building and I'll point you the right way.";

const QUICK = ["What do you charge?", "What's a content day?", "I need a website", "Book a call with Elijah"];

const STORE = "mcp-agent-chat";

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [offline, setOffline] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // remember the conversation for the session
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORE);
      if (saved) setMessages(JSON.parse(saved));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      if (messages.length) sessionStorage.setItem(STORE, JSON.stringify(messages.slice(-40)));
    } catch {}
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

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
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: ac.signal,
        body: JSON.stringify({
          page: pathname,
          messages: history.slice(-30).map((m) => ({ role: m.role, content: m.text })),
        }),
      });
      if (res.status === 503) {
        setOffline(true);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: "The desk is closed for a moment. Text Elijah at (202) 407-5248 or use the contact page and he'll get right back to you." },
        ]);
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
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "I lost the connection for a second. Try again, or text Elijah at (202) 407-5248." },
      ]);
    } finally {
      setBusy(false);
    }
  };

  const shown: Message[] = messages.length ? messages : [{ role: "assistant", text: GREETING }];

  return (
    <>
      {/* FAB */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 border border-gold bg-black text-gold flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-300 shadow-lg"
        aria-label="Open chat"
        style={{ display: open ? "none" : "flex" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-1.5rem)] bg-black border border-border/60 shadow-2xl flex flex-col"
            style={{ height: "560px", maxHeight: "calc(100vh - 3rem)" }}
            role="dialog"
            aria-label="Chat with Moore Covenant Productions"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/40 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full border border-gold flex items-center justify-center">
                  <span className="font-display text-sm text-gold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>M</span>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.14em] uppercase text-cream">Moore Covenant</p>
                  <p className="text-[9px] text-text-muted flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full inline-block ${offline ? "bg-text-muted" : "bg-gold"}`} />
                    {offline ? "Leave a message" : "Front desk, online now"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={() => {
                      abortRef.current?.abort();
                      setMessages([]);
                      try {
                        sessionStorage.removeItem(STORE);
                      } catch {}
                    }}
                    className="text-[9px] tracking-[0.14em] uppercase text-text-muted hover:text-cream transition-colors duration-200 px-2 py-1"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="text-text-muted hover:text-cream transition-colors duration-200 p-1"
                  aria-label="Close chat"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {shown.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 text-xs leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user" ? "bg-gold text-black" : "bg-charcoal text-text-secondary border border-border/40"
                    }`}
                  >
                    {msg.text || (busy ? " " : "")}
                  </div>
                </motion.div>
              ))}
              {busy && (shown[shown.length - 1]?.role !== "assistant" || !shown[shown.length - 1]?.text) && (
                <div className="flex justify-start">
                  <div className="bg-charcoal border border-border/40 px-4 py-3 flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1 h-1 rounded-full bg-gold/50"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick prompts, then the input */}
            <div className="border-t border-border/40 px-4 py-3 shrink-0 space-y-2">
              {messages.length === 0 && !offline && (
                <div className="flex flex-wrap gap-2">
                  {QUICK.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="px-3 py-1.5 text-[10px] tracking-[0.08em] border border-border/60 text-text-secondary hover:border-gold hover:text-gold transition-all duration-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
              {offline ? (
                <a
                  href="/contact"
                  className="block text-center px-3 py-2 border border-gold text-gold hover:bg-gold hover:text-black text-[10px] tracking-[0.14em] uppercase transition-all duration-200"
                >
                  Go to the contact page
                </a>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send(input);
                  }}
                  className="flex gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything about the studio"
                    maxLength={2000}
                    className="flex-1 bg-transparent border border-border/60 focus:border-gold text-cream placeholder-text-muted px-3 py-2 text-xs outline-none transition-colors duration-300"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || busy}
                    className="px-3 py-2 border border-gold text-gold hover:bg-gold hover:text-black disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                    aria-label="Send"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </form>
              )}
              <p className="text-[9px] text-text-muted/70 text-center">Elijah reads every conversation. Text (202) 407-5248 any time.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

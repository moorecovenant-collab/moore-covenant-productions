"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Step = {
  id: string;
  question: string;
  field?: keyof LeadData;
  options?: string[];
  type?: "text" | "email" | "tel";
  placeholder?: string;
};

type LeadData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
};

type Message = {
  role: "bot" | "user";
  text: string;
};

const steps: Step[] = [
  {
    id: "intro",
    question: "Hey, I'm Elijah's assistant at Moore Covenant Productions. What's your name?",
    field: "name",
    type: "text",
    placeholder: "Your first name",
  },
  {
    id: "service",
    question: "Good to meet you, {name}. What are you looking for help with?",
    field: "service",
    options: [
      "Social Media Management",
      "Content Strategy",
      "Content Creation",
      "Brand Building + Website",
      "1:1 Coaching / Mentorship",
      "Content Day Production",
      "Not sure yet",
    ],
  },
  {
    id: "budget",
    question: "Got it. What's your approximate monthly budget?",
    field: "budget",
    options: [
      "Under $1,000",
      "$1,000 – $3,000",
      "$3,000 – $7,500",
      "$7,500+",
      "Let's discuss",
    ],
  },
  {
    id: "timeline",
    question: "When are you looking to get started?",
    field: "timeline",
    options: ["ASAP", "Within 30 days", "1–3 months", "Just exploring"],
  },
  {
    id: "email",
    question: "Perfect. What email should Elijah reach you at?",
    field: "email",
    type: "email",
    placeholder: "your@email.com",
  },
  {
    id: "phone",
    question: "And your phone number? (optional, for a quicker reply)",
    field: "phone",
    type: "tel",
    placeholder: "(301) 000-0000",
  },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [lead, setLead] = useState<Partial<LeadData>>({});
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentStep = steps[stepIndex];

  const interpolate = (text: string) =>
    text.replace("{name}", lead.name ?? "there");

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "bot", text: steps[0].question }]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open && !currentStep?.options) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, stepIndex, currentStep?.options]);

  const advance = (value: string) => {
    const step = steps[stepIndex];
    const newLead = step.field ? { ...lead, [step.field]: value } : lead;
    setLead(newLead);
    setMessages((prev) => [...prev, { role: "user", text: value }]);
    setInput("");

    const next = stepIndex + 1;
    if (next < steps.length) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: interpolate(steps[next].question).replace("{name}", newLead.name ?? "there") },
        ]);
        setStepIndex(next);
      }, 500);
    } else {
      submitLead(newLead as LeadData);
    }
  };

  const submitLead = async (data: LeadData) => {
    setSending(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // fail silently, lead still captured in state
    } finally {
      setSending(false);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: `Thanks, ${data.name}. Elijah will be in touch within 24–48 hours. You can also reach him directly at (202) 407-5248.`,
          },
        ]);
        setDone(true);
      }, 500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    advance(input.trim());
  };

  const handleSkip = () => {
    advance(", ");
  };

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
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-1.5rem)] bg-black border border-border/60 shadow-2xl flex flex-col"
            style={{ height: "520px", maxHeight: "calc(100vh - 3rem)" }}
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
                    <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                    Usually replies within 24h
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-text-muted hover:text-cream transition-colors duration-200 p-1"
                aria-label="Close chat"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gold text-black"
                        : "bg-charcoal text-text-secondary border border-border/40"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {sending && (
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

            {/* Input */}
            {!done && (
              <div className="border-t border-border/40 px-4 py-3 shrink-0">
                {currentStep?.options ? (
                  <div className="flex flex-wrap gap-2">
                    {currentStep.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => advance(opt)}
                        className="px-3 py-1.5 text-[10px] tracking-[0.08em] border border-border/60 text-text-secondary hover:border-gold hover:text-gold transition-all duration-200"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                      ref={inputRef}
                      type={currentStep?.type ?? "text"}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={currentStep?.placeholder ?? "Type here..."}
                      className="flex-1 bg-transparent border border-border/60 focus:border-gold text-cream placeholder-text-muted px-3 py-2 text-xs outline-none transition-colors duration-300"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim()}
                      className="px-3 py-2 border border-gold text-gold hover:bg-gold hover:text-black disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {currentStep?.id === "phone" && (
                      <button
                        type="button"
                        onClick={handleSkip}
                        className="px-3 py-2 text-[10px] tracking-[0.08em] text-text-muted hover:text-cream transition-colors duration-200 border border-border/40"
                      >
                        Skip
                      </button>
                    )}
                  </form>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

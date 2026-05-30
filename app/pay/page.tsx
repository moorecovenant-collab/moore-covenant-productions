"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link";

const methods = [
  {
    name: "PayPal",
    handle: "@isthatelii",
    desc: "Send payment directly via PayPal. Fast, secure, and accepted worldwide.",
    link: "https://paypal.me/isthatelii",
    cta: "Pay with PayPal",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.217a.641.641 0 0 1 .633-.537h6.964c2.77 0 4.68.596 5.677 1.768.956 1.127 1.164 2.7.62 4.68-.018.065-.036.13-.055.196-1.048 3.73-4.013 5.012-7.975 5.012H8.63a.641.641 0 0 0-.633.537l-.921 6.464zM19.808 7.1c-.955 3.393-3.565 5.377-8.031 5.377H9.62l-1.107 7.065h2.532l.773-4.896a.641.641 0 0 1 .633-.537h1.178c3.538 0 6.11-1.44 6.894-5.604.35-1.85.072-3.248-.715-4.405z" />
      </svg>
    ),
    color: "rgba(0, 112, 186, 0.1)",
    border: "rgba(0, 112, 186, 0.3)",
    textColor: "#0070ba",
  },
  {
    name: "Zelle",
    handle: "elijahandisaacsworld@gmail.com",
    desc: "Send payment via Zelle directly from your bank app. Instant transfers, no fees.",
    link: null,
    cta: "Copy Email",
    copyText: "elijahandisaacsworld@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
      </svg>
    ),
    color: "rgba(109, 40, 217, 0.08)",
    border: "rgba(109, 40, 217, 0.3)",
    textColor: "#6d28d9",
  },
  {
    name: "Square",
    handle: "Coming Soon",
    desc: "Square payments will be available shortly. Use PayPal or Zelle in the meantime.",
    link: null,
    cta: "Coming Soon",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="3" />
      </svg>
    ),
    color: "rgba(196, 151, 74, 0.05)",
    border: "rgba(196, 151, 74, 0.2)",
    textColor: "#c4974a",
    disabled: true,
  },
];

export default function PayPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative pt-40 md:pt-52 pb-20 md:pb-28 px-6 md:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 20%, rgba(196,151,74,0.06) 0%, transparent 60%)" }} />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="section-label mb-6 flex items-center gap-3"
          >
            <span className="block w-6 h-px bg-gold" />
            Make a Payment
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-display-xl font-light text-cream leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Secure. Simple.
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-display-xl font-light italic text-gold leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Covenant-backed.
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="text-text-secondary text-base leading-loose max-w-xl mt-8"
          >
            Choose your preferred payment method below. All transactions are secure. If you have questions, reach us at <a href="tel:3013776958" className="text-gold">(301) 377-6958</a>.
          </motion.p>
        </div>
      </section>

      {/* ─── PAYMENT METHODS ─── */}
      <section className="px-6 md:px-10 lg:px-16 pb-32 md:pb-44">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/40 mb-12">
            {methods.map((method, i) => (
              <ScrollReveal key={method.name} delay={i * 0.1} direction="up">
                <div
                  className="bg-dark p-10 md:p-12 flex flex-col h-full"
                  style={{ opacity: method.disabled ? 0.5 : 1 }}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-6"
                    style={{ background: method.color, border: `1px solid ${method.border}`, color: method.textColor }}
                  >
                    {method.icon}
                  </div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gold mb-2">{method.name}</p>
                  <p
                    className="font-display text-xl font-light text-cream mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {method.handle}
                  </p>
                  <p className="text-xs text-text-muted leading-relaxed mb-8 flex-1">{method.desc}</p>

                  {method.link ? (
                    <a
                      href={method.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center py-3.5 text-[10px] tracking-[0.16em] uppercase border border-gold/40 text-gold hover:bg-gold hover:text-black transition-all duration-300"
                    >
                      {method.cta}
                    </a>
                  ) : method.copyText ? (
                    <button
                      onClick={() => copyToClipboard(method.copyText!)}
                      className="block w-full text-center py-3.5 text-[10px] tracking-[0.16em] uppercase border border-gold/40 text-gold hover:bg-gold hover:text-black transition-all duration-300"
                    >
                      Copy Zelle Email
                    </button>
                  ) : (
                    <div className="block text-center py-3.5 text-[10px] tracking-[0.16em] uppercase border border-border/40 text-text-muted cursor-not-allowed">
                      {method.cta}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Note */}
          <ScrollReveal>
            <div className="flex items-start gap-4 p-6 border border-gold/20 bg-gold/5">
              <span className="text-gold shrink-0 mt-0.5">—</span>
              <p className="text-xs text-text-secondary leading-relaxed">
                <span className="text-gold">Payment Note: </span>
                All projects require a deposit before work begins. Invoices will be sent via email prior to payment. Questions? Text or call <a href="tel:3013776958" className="text-gold">(301) 377-6958</a> or email <a href="mailto:moorecovenant@gmail.com" className="text-gold">moorecovenant@gmail.com</a>.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

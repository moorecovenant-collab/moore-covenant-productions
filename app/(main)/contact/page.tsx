"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link";

type FormData = {
  name: string;
  email: string;
  phone: string;
  type: string;
  budget: string;
  message: string;
};

const projectTypes = [
  "Content Strategy",
  "Social Media Management",
  "Content Creation",
  "Growth Strategy",
  "1:1 Mentorship / Coaching",
  "Website Building",
  "Brand Building + Website",
  "Content Day Production",
  "Multiple Services",
  "Not sure yet",
];

const budgetRanges = [
  "Under $1,000",
  "$1,000 – $3,000",
  "$3,000 – $7,500",
  "$7,500 – $15,000",
  "$15,000+",
  "Let's discuss",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const res = await fetch("https://formspree.io/f/mzdwejlk", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) setSubmitted(true);
  };

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative pt-40 md:pt-52 pb-20 md:pb-28 px-6 md:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(196,151,74,0.05) 0%, transparent 60%)" }} />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="section-label mb-6 flex items-center gap-3"
          >
            <span className="block w-6 h-px bg-gold" />
            Contact
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-display-xl font-light text-cream leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Tell us your story.
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
              We&apos;ll help you tell it better.
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="text-text-secondary text-base leading-loose max-w-xl mt-8"
          >
            We take on a limited number of clients each quarter to ensure everyone gets our full attention. If you&apos;re building something meaningful, let&apos;s connect.
          </motion.p>
        </div>
      </section>

      {/* ─── CONTENT ─── */}
      <section className="px-6 md:px-10 lg:px-16 pb-32 md:pb-44">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
            {/* Left info */}
            <ScrollReveal direction="left">
              <div className="lg:sticky lg:top-32 space-y-12">
                <div>
                  <p className="section-label mb-5 flex items-center gap-3">
                    <span className="block w-6 h-px bg-gold" />
                    How to Reach Us
                  </p>
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs tracking-widest uppercase text-text-muted mb-1">Phone / Text</p>
                      <a
                        href="tel:3013776958"
                        className="text-sm text-cream hover:text-gold transition-colors duration-300 font-medium"
                      >
                        (301) 377-6958
                      </a>
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-text-muted mb-1">Email</p>
                      <a
                        href="mailto:moorecovenant@gmail.com"
                        className="text-sm text-cream hover:text-gold transition-colors duration-300 break-all"
                      >
                        moorecovenant@gmail.com
                      </a>
                    </div>
                    <div>
                      <p className="text-xs tracking-widests uppercase text-text-muted mb-1">Instagram</p>
                      <a
                        href="https://instagram.com/moore.covenant"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-cream hover:text-gold transition-colors duration-300"
                      >
                        @moore.covenant
                      </a>
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-text-muted mb-1">YouTube / TikTok</p>
                      <a
                        href="https://youtube.com/@moorefavor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-cream hover:text-gold transition-colors duration-300"
                      >
                        @moorefavor
                      </a>
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-text-muted mb-1">Response Time</p>
                      <p className="text-sm text-text-secondary">Within 24–48 hours</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="section-label mb-5 flex items-center gap-3">
                    <span className="block w-6 h-px bg-gold" />
                    What to Expect
                  </p>
                  <div className="space-y-5">
                    {[
                      { step: "01", text: "Submit this form with as much detail as you have." },
                      { step: "02", text: "We review and reach out to schedule a free discovery call." },
                      { step: "03", text: "We connect, listen, and confirm if we're the right fit." },
                      { step: "04", text: "If it's a yes — we build something together." },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4">
                        <span className="section-label shrink-0 mt-0.5">{item.step}</span>
                        <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border/40 pt-8">
                  <p
                    className="font-display text-xl italic text-gold/70 leading-snug"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    &ldquo;We don&apos;t just take your project — we take your vision personally.&rdquo;
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Form */}
            <ScrollReveal delay={0.2} direction="right">
              <div className="flex items-start gap-4 p-5 border border-gold/20 bg-gold/5 mb-8">
                <span className="text-gold shrink-0 mt-0.5">—</span>
                <p className="text-xs text-text-secondary leading-relaxed">
                  <span className="text-gold">A note before you reach out: </span>
                  Moore Covenant Productions is built on faith — that&apos;s where our work ethic and commitment to you come from. It&apos;s not a requirement for working together. If you value integrity and work done right, you&apos;re in the right place.
                </p>
              </div>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-start justify-center min-h-[400px] py-20"
                >
                  <div className="w-12 h-12 border border-gold flex items-center justify-center mb-8">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10l5 5 8-8" stroke="#c4974a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="section-label mb-4">Message Received</p>
                  <h2
                    className="font-display text-3xl md:text-4xl font-light text-cream leading-tight mb-5"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Thank you for reaching out.
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed max-w-md mb-6">
                    We&apos;ve received your message and will be in touch within 24–48 hours. In the meantime, follow us on Instagram at <span className="text-gold">@moore.covenant</span>.
                  </p>
                  <p className="text-text-secondary text-sm">
                    Or text/call directly: <a href="tel:3013776958" className="text-gold">(301) 377-6958</a>
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <div>
                      <label className="block section-label mb-3">Your Name *</label>
                      <input
                        {...register("name", { required: "Name is required" })}
                        type="text"
                        placeholder="First and last name"
                        className="w-full bg-transparent border border-border/60 focus:border-gold text-cream placeholder-text-muted px-4 py-3.5 text-sm outline-none transition-colors duration-300"
                      />
                      {errors.name && <p className="text-xs text-red-500/70 mt-2">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block section-label mb-3">Phone Number</label>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="(301) 000-0000"
                        className="w-full bg-transparent border border-border/60 focus:border-gold text-cream placeholder-text-muted px-4 py-3.5 text-sm outline-none transition-colors duration-300"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block section-label mb-3">Email Address *</label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                      })}
                      type="email"
                      placeholder="your@email.com"
                      className="w-full bg-transparent border border-border/60 focus:border-gold text-cream placeholder-text-muted px-4 py-3.5 text-sm outline-none transition-colors duration-300"
                    />
                    {errors.email && <p className="text-xs text-red-500/70 mt-2">{errors.email.message}</p>}
                  </div>

                  {/* Project type */}
                  <div>
                    <label className="block section-label mb-3">Service Interested In *</label>
                    <select
                      {...register("type", { required: "Please select a service" })}
                      className="w-full bg-charcoal border border-border/60 focus:border-gold text-cream px-4 py-3.5 text-sm outline-none transition-colors duration-300 appearance-none cursor-pointer"
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%239a9590' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center" }}
                    >
                      <option value="" className="bg-charcoal">Select a service...</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-charcoal">{type}</option>
                      ))}
                    </select>
                    {errors.type && <p className="text-xs text-red-500/70 mt-2">{errors.type.message}</p>}
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block section-label mb-3">Approximate Budget</label>
                    <select
                      {...register("budget")}
                      className="w-full bg-charcoal border border-border/60 focus:border-gold text-cream px-4 py-3.5 text-sm outline-none transition-colors duration-300 appearance-none cursor-pointer"
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%239a9590' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center" }}
                    >
                      <option value="" className="bg-charcoal">Select a range...</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range} className="bg-charcoal">{range}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block section-label mb-3">Tell Us About Your Vision *</label>
                    <textarea
                      {...register("message", { required: "Please tell us about your project" })}
                      rows={6}
                      placeholder="Who are you, what are you building, and what do you need? The more you share, the better we can serve you."
                      className="w-full bg-transparent border border-border/60 focus:border-gold text-cream placeholder-text-muted px-4 py-3.5 text-sm outline-none transition-colors duration-300 resize-none leading-relaxed"
                    />
                    {errors.message && <p className="text-xs text-red-500/70 mt-2">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full sm:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Your Message"}</span>
                    {!isSubmitting && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="relative z-10">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>

                  <div className="p-4 border border-gold/20 bg-gold/5">
                    <p className="text-xs text-text-secondary leading-relaxed">
                      <span className="text-gold">Commitment Notice: </span>
                      All contracts require a minimum 3-month commitment.
                    </p>
                  </div>

                  <p className="text-xs text-text-muted">
                    Prefer to text or call?{" "}
                    <a href="tel:3013776958" className="text-gold hover:text-gold-light transition-colors">
                      (301) 377-6958
                    </a>
                  </p>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}

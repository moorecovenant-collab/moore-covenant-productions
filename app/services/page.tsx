"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedText from "@/components/ui/AnimatedText";

const services = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    name: "Content Strategy",
    price: "From $500",
    period: "/mo",
    desc: "Strategic content calendars mapped to your brand voice, audience, and goals — consistency that converts.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    name: "Content Creation",
    price: "From $800",
    period: "/mo",
    desc: "Scroll-stopping visuals, captions, and short-form video crafted to grow your audience and your revenue.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    name: "Social Management",
    price: "From $1,297",
    period: "/mo",
    desc: "Fully managed posting, engagement, community building, and monthly reporting — we handle it all.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    name: "Growth Strategy",
    price: "From $750",
    period: "/mo",
    desc: "Data-driven strategy sessions, analytics review, and platform-specific roadmaps built for real growth.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    name: "Content Days",
    price: "From $1,500",
    period: "/day",
    desc: "Full-day production shoots to capture weeks of high-quality, on-brand content in a single session.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    name: "1:1 Mentorship",
    price: "$297",
    period: "/session",
    desc: "Private coaching for creators and entrepreneurs who want to grow their platform with purpose. Monthly retainers from $1,497.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
    name: "Website & Brand Building",
    price: "From $1,500",
    period: " flat",
    desc: "Custom brand identity, logo, and website design that positions you as the authority in your space. Full packages from $3,500.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
    name: "Website Building",
    price: "From $997",
    period: " flat",
    desc: "Clean, conversion-focused websites built to represent your brand at the highest level. Includes design, development, and launch.",
  },
  {
    icon: null,
    name: "Custom Package",
    price: "Let's Talk",
    period: "",
    desc: "Need something built around you? We customize every engagement. Book a call and we&apos;ll build the right solution.",
    isCustom: true,
  },
];

const packages = [
  {
    name: "Starter / Foundation",
    price: "1,297",
    period: "Billed monthly",
    commitment: "Minimum 3-month commitment",
    features: [
      "3 posts per week (12/month)",
      "Content calendar & scheduling",
      "Caption writing + hashtag strategy",
      "Basic performance analytics",
      "Client-provided content",
      "Monthly check-in call",
    ],
    cta: "Start Here",
    featured: false,
  },
  {
    name: "Growth Package",
    price: "2,750",
    period: "Billed monthly",
    commitment: "Minimum 3-month commitment",
    features: [
      "5 posts per week (20+/month)",
      "Reels / TikTok / Shorts creation",
      "Caption strategy + CTAs",
      "Community engagement (comments & DMs)",
      "Monthly performance reporting",
      "Organic growth optimization",
      "Bi-weekly strategy calls",
    ],
    cta: "Book a Call",
    featured: true,
    badge: "Most Popular",
  },
  {
    name: "Scale Package",
    price: "5,500",
    period: "Billed monthly",
    commitment: "Minimum 3-month commitment",
    features: [
      "Daily posting (5–7×/week)",
      "Full content production",
      "Paid ads setup & management",
      "Lead funnels & automations",
      "Full analytics + conversion tracking",
      "Priority support & weekly calls",
      "Dedicated account strategist",
    ],
    cta: "Scale Your Brand",
    featured: false,
  },
];

const process = [
  { step: "01", title: "Discovery", desc: "We sit down, listen, and learn everything about you, your brand, your goals, and your vision." },
  { step: "02", title: "Strategy", desc: "We build the creative roadmap that ensures every deliverable serves a purpose." },
  { step: "03", title: "Creation", desc: "We execute with precision — every post, edit, and caption crafted to match the vision." },
  { step: "04", title: "Delivery", desc: "We deliver work that exceeds the brief, and stay in it with you to make sure it lands." },
];

export default function ServicesPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative pt-40 md:pt-52 pb-24 md:pb-28 px-6 md:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(196,151,74,0.05) 0%, transparent 60%)" }} />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="section-label mb-6 flex items-center gap-3"
          >
            <span className="block w-6 h-px bg-gold" />
            Services
          </motion.p>
          <div className="max-w-4xl">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-display-xl font-light text-cream leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Everything you need to
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
                build something lasting.
              </motion.h1>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="text-text-secondary text-base leading-loose max-w-xl mt-8"
          >
            From social media management to full brand production — customized creative services for the kingdom-minded entrepreneur. Every service is built around your goals.
          </motion.p>
        </div>
      </section>

      {/* ─── WHO WE WORK WITH ─── */}
      <section className="px-6 md:px-10 lg:px-16 pb-10">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex items-start gap-5 p-6 border border-gold/20 bg-gold/5">
              <span className="text-gold shrink-0 mt-0.5 text-lg">—</span>
              <p className="text-sm text-text-secondary leading-relaxed">
                <span className="text-gold font-medium">Who we work with: </span>
                Moore Covenant Productions is a faith-driven agency. That&apos;s where our standards and commitment come from — not a barrier to working with us. Clients who value integrity and work done right are always welcome here, regardless of where they stand on faith. We reserve the right to decline engagements that conflict with our core values.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── SERVICE CARDS ─── */}
      <section className="px-6 md:px-10 lg:px-16 pb-12 md:pb-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40">
            {services.map((service, i) => (
              <ScrollReveal key={service.name} delay={i * 0.06} direction="up">
                <div
                  className={`bg-dark p-8 md:p-10 group hover:bg-gold/5 transition-colors duration-300 ${
                    service.isCustom ? "flex flex-col items-center justify-center text-center" : ""
                  }`}
                >
                  {service.icon && (
                    <div className="w-10 h-10 border border-gold/40 flex items-center justify-center text-gold mb-5">
                      {service.icon}
                    </div>
                  )}
                  {service.isCustom ? (
                    <>
                      <p
                        className="font-display italic text-lg text-text-muted leading-relaxed mb-5"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        &ldquo;Need something custom? We build around you.&rdquo;
                      </p>
                      <Link href="/contact" className="text-[10px] tracking-[0.14em] uppercase text-gold border-b border-gold/40 pb-0.5">
                        Let&apos;s Talk →
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="text-xs tracking-[0.12em] uppercase text-cream font-medium mb-2">{service.name}</p>
                      <p
                        className="font-display text-xl font-light text-gold mb-2"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {service.price}
                        <span className="text-sm text-text-muted font-sans">{service.period}</span>
                      </p>
                      <p className="text-xs text-text-muted leading-relaxed">{service.desc}</p>
                    </>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ANNUAL PLAN BANNER ─── */}
      <section className="px-6 md:px-10 lg:px-16 pb-2">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="bg-gold/8 border border-gold/45 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center" style={{ background: "rgba(201,168,76,0.08)" }}>
              <div>
                <p className="text-[9px] tracking-[0.22em] uppercase text-gold mb-3">⭐ Best Value — Annual Covenant Plan</p>
                <p
                  className="font-display text-3xl md:text-4xl font-light text-cream mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  $10,000{" "}
                  <span className="text-base text-text-secondary font-sans font-light">paid once / full year</span>
                </p>
                <p className="text-text-secondary text-sm leading-loose max-w-xl mb-5">
                  One investment. Twelve months of dedicated social media management, quarterly strategy reviews, priority support, and a brand built to last — at a fraction of the month-to-month cost.
                </p>
                <div className="flex gap-8 flex-wrap">
                  <div>
                    <p className="font-display text-2xl text-gold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Save $5,500+</p>
                    <p className="text-[9px] tracking-[0.14em] uppercase text-text-muted mt-0.5">vs Starter monthly</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl text-gold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Save $23,000+</p>
                    <p className="text-[9px] tracking-[0.14em] uppercase text-text-muted mt-0.5">vs Growth monthly</p>
                  </div>
                </div>
              </div>
              <div className="shrink-0 text-center">
                <Link href="/contact" className="btn-primary block mb-2">
                  <span>Claim This Rate</span>
                </Link>
                <p className="text-[9px] text-text-muted tracking-[0.1em]">Limited spots available</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── PACKAGES ─── */}
      <section id="packages" className="py-20 md:py-28 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <ScrollReveal>
              <p className="section-label justify-center mb-4 flex">
                <span className="block w-6 h-px bg-gold mr-3 mt-[6px]" />
                Investment
              </p>
              <h2
                className="font-display text-display-lg font-light text-cream leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Choose Your <em className="italic text-gold">Covenant</em>
              </h2>
              <p className="text-text-muted text-sm mt-4">
                Transparent pricing. Real results. Every package includes a free strategy call to make sure it&apos;s the right fit.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/40">
            {packages.map((pkg, i) => (
              <ScrollReveal key={pkg.name} delay={i * 0.1} direction="up">
                <div
                  className={`relative p-10 md:p-12 flex flex-col ${
                    pkg.featured
                      ? "bg-gold/6 border border-gold/35"
                      : "bg-dark"
                  }`}
                  style={pkg.featured ? { background: "rgba(201,168,76,0.06)" } : {}}
                >
                  {pkg.badge && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gold text-black text-[9px] tracking-[0.16em] uppercase px-4 py-1 font-medium">
                      {pkg.badge}
                    </div>
                  )}
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gold mb-2 mt-4">{pkg.name}</p>
                  <p
                    className="font-display text-5xl font-light text-cream leading-none mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    <sup className="text-xl align-super">$</sup>{pkg.price}<span className="text-lg text-text-secondary font-sans font-light">/mo</span>
                  </p>
                  <p className="text-[11px] text-text-muted mb-1">{pkg.period}</p>
                  <p className="text-[10px] text-gold/60 tracking-[0.08em] mb-6">{pkg.commitment}</p>
                  <div className="h-px bg-border/60 mb-6" />
                  <ul className="space-y-3 flex-1">
                    {pkg.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-xs text-text-secondary leading-relaxed">
                        <span className="text-gold shrink-0 mt-0.5">—</span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`mt-8 block text-center py-3.5 text-[10px] tracking-[0.16em] uppercase transition-all duration-300 border ${
                      pkg.featured
                        ? "border-gold text-gold hover:bg-gold hover:text-black"
                        : "border-border/60 text-text-secondary hover:border-gold hover:text-gold"
                    }`}
                  >
                    {pkg.cta}
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="text-center p-6 border border-border/40 border-t-0 bg-dark">
              <p className="text-sm text-text-muted mb-4">All packages are customizable. Not sure which is right for you? Let&apos;s talk — no pressure, no obligation.</p>
              <Link href="/contact" className="btn-ghost text-xs">
                <span>Book a Free Strategy Call</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CONTRACT NOTICE ─── */}
      <section className="px-6 md:px-10 lg:px-16 py-10 bg-dark border-y border-border/40">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex items-start gap-4 p-6 border border-gold/20 bg-gold/5">
              <span className="text-gold text-lg shrink-0 mt-0.5">—</span>
              <p className="text-sm text-text-secondary leading-relaxed">
                <span className="text-gold font-medium">Commitment Notice: </span>
                All contracts require a minimum 3-month commitment. This ensures we have the time to build real momentum, deliver measurable results, and honor the covenant we make with every client.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="py-24 md:py-36 px-6 md:px-10 lg:px-16 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 md:mb-20">
            <ScrollReveal>
              <p className="section-label mb-4 flex items-center gap-3">
                <span className="block w-6 h-px bg-gold" />
                How We Work
              </p>
            </ScrollReveal>
            <AnimatedText
              text="The Process"
              tag="h2"
              className="font-display text-display-lg font-light text-cream"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {process.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.12} direction="up">
                <div>
                  <span className="section-label">{item.step}</span>
                  <h3
                    className="font-display text-2xl md:text-3xl font-light text-cream mt-5 mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-32 md:py-44 px-6 md:px-10 lg:px-16 bg-dark border-t border-border/40">
        <div className="max-w-[1400px] mx-auto text-center">
          <ScrollReveal>
            <p className="section-label justify-center mb-8 flex">
              <span className="block w-6 h-px bg-gold mr-3 mt-[6px]" />
              Ready to Begin
            </p>
            <h2
              className="font-display text-display-xl font-light text-cream leading-tight max-w-3xl mx-auto mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Tell us what you&apos;re building.{" "}
              <em className="italic text-gold">We&apos;ll tell you how we can help.</em>
            </h2>
            <p className="text-text-secondary text-sm mb-8">Text or call: <a href="tel:3013776958" className="text-gold hover:text-gold-light transition-colors">(301) 377-6958</a></p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                <span>Start a Project</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="relative z-10">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

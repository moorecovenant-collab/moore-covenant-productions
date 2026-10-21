"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedText from "@/components/ui/AnimatedText";
import Station from "@/components/ui/Station";

const socialTiers = [
  {
    name: "Starter",
    price: "1,500",
    tagline: "Consistent, on-brand presence for a business that is ready to show up.",
    features: [
      "3 posts per week on your main platform",
      "Monthly content calendar and scheduling",
      "Caption writing and hashtag strategy",
      "Basic engagement and inbox check-ins",
      "Monthly performance recap",
      "Monthly strategy call",
    ],
    featured: false,
  },
  {
    name: "Growth",
    price: "2,750",
    tagline: "For an established business that wants to scale reach and bookings.",
    features: [
      "5 posts per week across 2 platforms",
      "Reels, TikToks, and Shorts produced for you",
      "One on-site content day per month",
      "Community engagement, comments and DMs",
      "Monthly report with next steps",
      "Biweekly strategy calls",
    ],
    featured: true,
  },
  {
    name: "Sovereign",
    price: "5,000",
    tagline: "A full brand partnership. Content, strategy, and cinematic production.",
    features: [
      "Daily posting across 3 platforms",
      "Two content days per month, cinema camera",
      "Brand films and campaign creative",
      "Paid ads setup and management",
      "Lead funnels and DM automations",
      "Weekly calls and priority turnaround",
    ],
    featured: false,
  },
];

const videoOffers = [
  {
    title: "Content Day",
    price: "From $1,500",
    desc: "A full day on site. We plan the shot list ahead of time and you leave with weeks of reels, photos, and B-roll you own outright.",
  },
  {
    title: "Brand Film",
    price: "Quoted per project",
    desc: "A two to four minute film that says who you are and why it matters. Interview, B-roll, original sound design, and a cut for every platform.",
  },
  {
    title: "Event and Livestream Edits",
    price: "Quoted per project",
    desc: "Conferences, services, and shows turned into vertical reels and a highlight film. Every word captioned, color graded, audio remixed.",
  },
  {
    title: "Short Film",
    price: "Quoted per project",
    desc: "Narrative work, written and directed with you. This is where the company started and it still gets our best hours.",
  },
];

const webIncludes = [
  "Custom design, no templates",
  "Built for phones first",
  "Booking and contact forms that email and text you",
  "Search-ready structure and metadata",
  "Domain and launch handled for you",
  "30 days of post-launch support",
];

const process = [
  { step: "01", title: "Discovery", desc: "A free call. We learn your brand, your goals, and what has not worked before." },
  { step: "02", title: "Strategy", desc: "A written plan with the content, the cadence, and the numbers we are aiming at." },
  { step: "03", title: "Creation", desc: "Shoot days, edits, copy, and design. You see everything before it goes out." },
  { step: "04", title: "Delivery", desc: "Work goes live, reporting comes back, and we adjust every month." },
];

const serif = { fontFamily: "'Cormorant Garamond', serif" };

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-44 md:pt-56 pb-24 md:pb-32 px-6 md:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/dc/kennedy-night.jpg" alt="" fill className="object-cover object-center opacity-45 kenburns" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.7) 0%, rgba(8,8,8,0.5) 50%, #080808 100%)" }} />
        </div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mb-8">
            <Station scene="01" name="Services and pricing" />
          </motion.div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-display-hero font-light text-cream"
              style={serif}
            >
              Three things,
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-display-hero font-light italic text-gold"
              style={serif}
            >
              done properly.
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1 }}
            className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl mt-10"
          >
            Social media management, video production, and websites. Every engagement starts
            with a free call, and every price below is a real starting point, not a bait number.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 1.3 }} className="flex flex-wrap gap-3 mt-10">
            {[
              { href: "#social", label: "Social Media" },
              { href: "#video", label: "Video Production" },
              { href: "#web", label: "Websites & Brand" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="pill-tag">
                {l.label}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SOCIAL MEDIA MANAGEMENT (cream) */}
      <section id="social" className="section-cream py-24 md:py-32 px-6 md:px-10 lg:px-16 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-20">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <Station scene="02" name="Social Media Management" tone="light" className="mb-6" />
              </ScrollReveal>
              <AnimatedText text="Run the business. We run the feed." tag="h2" className="font-display text-display-huge font-light text-black" style={serif} />
            </div>
            <ScrollReveal delay={0.2} className="lg:col-span-5 lg:pt-14">
              <p className="text-black/70 text-base leading-relaxed">
                Monthly retainers with a three month minimum. That is how long it takes to see real
                movement, and we would rather be honest about it than sell you a month. Every plan
                includes a free strategy call before you commit.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {socialTiers.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 0.1}>
                <div className={`relative h-full p-8 md:p-10 flex flex-col pill-card ${tier.featured ? "bg-black text-cream" : "bg-cream/60 text-black border border-black/10"}`}>
                  {tier.featured && (
                    <span className="absolute top-5 right-5 px-3 py-1 rounded-full bg-gold text-black text-[9px] tracking-[0.2em] uppercase">
                      Most chosen
                    </span>
                  )}
                  <p className="text-[10px] tracking-[0.22em] uppercase text-gold mb-4">{tier.name}</p>
                  <p className="font-display text-5xl md:text-6xl font-light leading-none mb-2" style={serif}>
                    <sup className="text-2xl align-super">$</sup>
                    {tier.price}
                    <span className={`text-base font-sans font-light ml-1 ${tier.featured ? "text-text-muted" : "text-black/50"}`}>/mo</span>
                  </p>
                  <p className={`text-[10px] tracking-[0.18em] uppercase mb-6 ${tier.featured ? "text-text-muted" : "text-black/50"}`}>3 month minimum</p>
                  <p className={`text-sm leading-relaxed mb-8 ${tier.featured ? "text-text-secondary" : "text-black/70"}`}>{tier.tagline}</p>
                  <ul className="space-y-3 mb-10 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className={`flex items-start gap-3 text-sm ${tier.featured ? "text-text-secondary" : "text-black/75"}`}>
                        <span className="block w-1 h-1 rounded-full bg-gold mt-2 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className={tier.featured ? "btn-primary justify-center" : "btn-dark justify-center"}>
                    <span>Book a Call</span>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="pill-card bg-cream/60 border border-black/10 p-8 md:p-10">
                <p className="text-[10px] tracking-[0.22em] uppercase text-gold mb-3">Annual Covenant Plan</p>
                <p className="font-display text-4xl font-light text-black mb-3" style={serif}>
                  $20,000 <span className="text-base text-black/50 font-sans font-light">/ year, prepaid</span>
                </p>
                <p className="text-sm text-black/70 leading-relaxed">
                  Growth level service for a full year at a lower monthly rate. For the business that
                  already knows it is staying.
                </p>
              </div>
              <div className="pill-card bg-cream/60 border border-black/10 p-8 md:p-10">
                <p className="text-[10px] tracking-[0.22em] uppercase text-gold mb-3">Need something custom?</p>
                <p className="font-display text-4xl font-light text-black mb-3" style={serif}>
                  Let&apos;s talk
                </p>
                <p className="text-sm text-black/70 leading-relaxed">
                  Multiple locations, a launch, a campaign with a deadline. We scope it on the call and
                  send one clear number.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* VIDEO PRODUCTION (black) */}
      <section id="video" className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-black scroll-mt-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-20">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <Station scene="03" name="Video Production" className="mb-6" />
              </ScrollReveal>
              <AnimatedText text="The movie feel, for your brand." tag="h2" className="font-display text-display-huge font-light text-cream" style={serif} />
            </div>
            <ScrollReveal delay={0.2} className="lg:col-span-5 lg:pt-14">
              <p className="text-text-secondary text-base leading-relaxed">
                Shot on a Sony cinema body, cut in DaVinci Resolve, delivered in every format you
                need. Content days are priced flat. Films are quoted after we talk, because no two
                are the same.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/40 border border-border/40">
            {videoOffers.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.08}>
                <div className="bg-black p-8 md:p-12 h-full group hover:bg-dark transition-colors duration-500">
                  <div className="flex items-baseline justify-between gap-6 mb-4">
                    <h3 className="font-display text-3xl md:text-4xl font-light text-cream group-hover:text-gold transition-colors duration-300" style={serif}>
                      {v.title}
                    </h3>
                    <p className="text-[10px] tracking-[0.18em] uppercase text-gold shrink-0 text-right">{v.price}</p>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-md">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/portfolio" className="btn-ghost">
                <span>Watch the Work</span>
              </Link>
              <Link href="/contact" className="btn-primary">
                <span>Book a Content Day</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* WEBSITES AND BRAND (cream) */}
      <section id="web" className="section-cream py-24 md:py-32 px-6 md:px-10 lg:px-16 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-20">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <Station scene="04" name="Websites and Brand" tone="light" className="mb-6" />
              </ScrollReveal>
              <AnimatedText text="Look like the authority you already are." tag="h2" className="font-display text-display-huge font-light text-black" style={serif} />
            </div>
            <ScrollReveal delay={0.2} className="lg:col-span-5 lg:pt-14">
              <p className="text-black/70 text-base leading-relaxed">
                A website should make the person who found you feel like they found the right one.
                We design and build it, hand you the keys, and keep it running if you want us to.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 pill-card bg-black text-cream p-8 md:p-12">
              <p className="text-[10px] tracking-[0.22em] uppercase text-gold mb-4">Custom Website</p>
              <p className="font-display text-5xl md:text-6xl font-light leading-none mb-2" style={serif}>
                <span className="text-2xl align-super">from </span>$1,000
              </p>
              <p className="text-[10px] tracking-[0.18em] uppercase text-text-muted mb-8">Scoped on a free call</p>
              <p className="text-sm text-text-secondary leading-relaxed mb-8">
                A landing page starts at a thousand. A multi-page business site with booking lands
                between fifteen hundred and twenty-five hundred. Fully custom builds with e-commerce
                or advanced features run three to five thousand and up. You get one number before any
                work starts.
              </p>
              <Link href="/contact" className="btn-primary">
                <span>Start a Website</span>
              </Link>
            </div>
            <div className="lg:col-span-4 pill-card bg-cream/60 border border-black/10 p-8 md:p-12">
              <p className="text-[10px] tracking-[0.22em] uppercase text-gold mb-6">Every build includes</p>
              <ul className="space-y-3">
                {webIncludes.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-black/75">
                    <span className="block w-1 h-1 rounded-full bg-gold mt-2 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-3 pill-card bg-cream/60 border border-black/10 p-8 md:p-12">
              <p className="text-[10px] tracking-[0.22em] uppercase text-gold mb-4">Care Plan</p>
              <p className="font-display text-4xl font-light text-black leading-none mb-1" style={serif}>
                $150 <span className="text-base text-black/50 font-sans font-light">/mo</span>
              </p>
              <p className="text-[10px] tracking-[0.18em] uppercase text-black/50 mb-6">or $1,200 / year</p>
              <p className="text-sm text-black/70 leading-relaxed">
                Hosting, updates, security patches, small content edits, and a real person to call when
                something breaks.
              </p>
            </div>
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="pill-card bg-cream/60 border border-black/10 p-8 md:p-10">
                <p className="text-[10px] tracking-[0.22em] uppercase text-gold mb-3">Brand Identity</p>
                <p className="text-sm text-black/70 leading-relaxed">
                  Logo, type, color, and the rules for using them. Built alongside your site or on its
                  own. Quoted per project.
                </p>
              </div>
              <div className="pill-card bg-cream/60 border border-black/10 p-8 md:p-10">
                <p className="text-[10px] tracking-[0.22em] uppercase text-gold mb-3">Recent builds</p>
                <p className="text-sm text-black/70 leading-relaxed">
                  Desire Delights, a bakery in South Jersey with online ordering. 121 Auto Repair, a shop
                  in Depew, NY with same-day booking.{" "}
                  <Link href="/portfolio" className="text-black underline decoration-gold underline-offset-4 hover:text-gold transition-colors">See them</Link>.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PROCESS (black) */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <Station scene="05" name="How it works" className="mb-6" />
          </ScrollReveal>
          <AnimatedText text="No surprises." tag="h2" className="font-display text-display-huge font-light text-cream mb-16" style={serif} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40 border border-border/40">
            {process.map((p, i) => (
              <ScrollReveal key={p.step} delay={i * 0.08}>
                <div className="bg-black p-8 md:p-10 h-full">
                  <span className="font-display text-5xl font-light text-gold/30" style={serif}>{p.step}</span>
                  <h3 className="font-display text-2xl text-cream mt-6 mb-3" style={serif}>{p.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-dark border-t border-border/40">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-display-huge font-light text-cream mb-6" style={serif}>
              Not sure which one you need?
            </h2>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-10">
              That is what the first call is for. Twenty minutes, no pitch, and you leave with a clear
              recommendation either way.
            </p>
            <Link href="/contact" className="btn-primary">
              <span>Book the Free Call</span>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedText from "@/components/ui/AnimatedText";

const stats = [
  { value: "60M+", label: "Total Views Generated" },
  { value: "50M+", label: "Total Likes Generated" },
  { value: "100K+", label: "Followers Grown" },
  { value: "1,000+", label: "High-Performing Videos" },
];

const services = [
  { number: "01", title: "Content Strategy", desc: "Strategic content calendars mapped to your brand voice, audience, and goals — consistency that converts." },
  { number: "02", title: "Social Management", desc: "Fully managed posting, engagement, community building, and monthly reporting — we handle it all." },
  { number: "03", title: "Content Creation", desc: "Scroll-stopping visuals, captions, and short-form video crafted to grow your audience and your revenue." },
  { number: "04", title: "Growth Strategy", desc: "Data-driven strategy sessions, analytics review, and platform-specific roadmaps built for real growth." },
  { number: "05", title: "Brand Building", desc: "Custom brand identity, logo, and website that positions you as the authority in your space." },
  { number: "06", title: "1:1 Mentorship", desc: "Private coaching for creators and entrepreneurs who want to grow their platform with purpose." },
];

const values = [
  { letter: "C", name: "Covenant First", desc: "We honor our word above convenience and operate with unwavering commitment to every client we serve." },
  { letter: "O", name: "Operational Excellence", desc: "We build with precision, discipline, and excellence — as unto the Lord, not just the client." },
  { letter: "V", name: "Visionary Stewardship", desc: "We steward people, resources, and opportunities with foresight, responsibility, and long-term thinking." },
  { letter: "E", name: "Ethical Integrity", desc: "Our decisions are anchored in truth. Our foundation is unshakeable — no shortcuts, no compromise." },
  { letter: "N", name: "Noble Leadership", desc: "We lead with humility, accountability, and service-first authority — strength that uplifts, not overpowers." },
  { letter: "A", name: "Accountability", desc: "We take full ownership of outcomes and uphold the highest standards — to our clients and to God." },
  { letter: "N", name: "Next-Gen Mindset", desc: "We think generationally — building beyond today for those who come after us and the legacy we leave." },
  { letter: "T", name: "Trust", desc: "We cultivate trust through consistency, transparency, and faithfulness. Trust is earned here — and it is." },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
      >
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.3) 40%, rgba(8,8,8,0.8) 80%, rgba(8,8,8,1) 100%)",
            }}
          />
          <Image
            src="/metro-1.jpg"
            alt="Moore Covenant Productions"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>

        {/* Decorative lines */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/3 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent origin-left"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-1/3 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/10 to-transparent origin-right"
          />
        </div>

        {/* Content — two-column */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="block w-8 h-px bg-gold" />
              <span className="section-label">Results-Driven Social Media Growth</span>
            </motion.div>

            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-display-2xl font-light text-cream leading-none"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Your Story.
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-display-2xl font-light text-cream leading-none"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Your <em className="italic text-gold">Legacy.</em>
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-display-2xl font-light text-cream leading-none"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Your Covenant.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.2 }}
              className="text-text-secondary text-sm md:text-base leading-loose max-w-md mb-5"
            >
              Faith-driven social media management and storytelling for the called, the committed, and the kingdom-minded entrepreneur.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="font-display text-base italic text-gold/70 pl-4 border-l border-gold/40 mb-8 md:mb-10"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              "I will establish my covenant between me and you and your descendants after you, for an everlasting covenant." — Genesis 17:7
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.5 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link href="/contact" className="btn-primary">
                <span>Start Your Covenant</span>
              </Link>
              <Link href="/portfolio" className="btn-ghost">
                <span>See the Results</span>
              </Link>
            </motion.div>
          </div>

          {/* Right — Hero lifestyle */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[3/4] max-h-[75vh] w-full max-w-md mx-auto lg:mx-0"
          >
            <div className="w-full h-full border border-gold/15 relative overflow-hidden">
              <Image
                src="/metro-1.jpg"
                alt="Elijah Moore — Founder, Moore Covenant Productions"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(8,8,8,0.75) 100%)" }} />
              <div className="absolute bottom-5 left-5 bg-black/80 px-3 py-1.5">
                <span className="text-[9px] tracking-[0.16em] uppercase text-gold">Elijah Moore · Founder</span>
              </div>
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/30" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/30" />
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-text-muted">Scroll</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-gold/50 to-transparent"
          />
        </motion.div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="bg-dark border-y border-border/40">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border/40">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08} direction="up">
                <div className="text-center py-8 px-6">
                  <p
                    className="font-display text-4xl md:text-5xl font-light text-gold leading-none mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-text-muted">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── METRO PHOTO STRIP ─── */}
      <section className="grid grid-cols-2 gap-px bg-border/40">
        {["/metro-1.jpg", "/metro-2.jpg"].map((src, i) => (
          <ScrollReveal key={src} delay={i * 0.15} direction="up">
            <div className="relative overflow-hidden group" style={{ aspectRatio: "4/3" }}>
              <Image
                src={src}
                alt="Moore Covenant Productions"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-gold/30 group-hover:border-gold/60 transition-colors duration-500" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-gold/30 group-hover:border-gold/60 transition-colors duration-500" />
            </div>
          </ScrollReveal>
        ))}
      </section>

      {/* ─── MANIFESTO / ABOUT TEASER ─── */}
      <section className="py-24 md:py-36 lg:py-44 px-6 md:px-10 lg:px-16 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
            {/* Photo */}
            <ScrollReveal direction="left">
              <div className="relative aspect-[2/3] max-w-lg overflow-hidden border border-gold/15">
                <Image
                  src="/metro-2.jpg"
                  alt="Elijah Moore — Moore Covenant Productions"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 55%, rgba(8,8,8,0.65) 100%)" }} />
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/30" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/30" />
              </div>
            </ScrollReveal>

            {/* Bio */}
            <div>
              <ScrollReveal>
                <p className="section-label mb-6">My Story</p>
              </ScrollReveal>
              <AnimatedText
                text="Built From Purpose."
                tag="h2"
                className="font-display text-display-lg font-light text-cream leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              />
              <AnimatedText
                text="Not Accident."
                tag="h2"
                className="font-display text-display-lg font-light italic text-gold leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                delay={0.2}
              />

              <ScrollReveal delay={0.4}>
                <div className="mt-8 space-y-5 text-text-secondary text-sm md:text-base leading-loose">
                  <p>
                    I didn&apos;t stumble into this. I was called to it. There was a moment — not long ago — when I looked around and saw people with something real to say, businesses with something real to offer, and leaders with something real to give — but no one could see them. They were invisible. And I knew that was something I could fix.
                  </p>
                  <p>
                    I&apos;m Elijah Moore — storyteller, strategist, and founder of Moore Covenant Productions. I built this company on a covenant: a promise that every brand we touch will be seen, felt, and remembered. Faith isn&apos;t just a backdrop to what I do — it&apos;s the foundation.
                  </p>
                  <p>
                    I&apos;ve helped creators, beauty brands, and entrepreneurs generate over <em className="text-cream">60 million views</em>, grow six-figure followings, and build digital presences that convert — not just impress.
                  </p>
                </div>

                <blockquote
                  className="font-display text-xl italic text-cream border-l-2 border-gold pl-5 my-8 leading-snug"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  &ldquo;My story is who I am.<br />Are you ready to tell yours?&rdquo;
                </blockquote>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["Faith-Driven", "Storytelling", "Social Strategy", "Brand Building", "Coaching"].map((tag) => (
                    <span key={tag} className="px-3 py-1.5 border border-gold/15 text-[10px] tracking-[0.14em] uppercase text-gold bg-gold/5">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link href="/about" className="btn-primary">
                  <span>Read the Full Story</span>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COVENANT FRAMEWORK ─── */}
      <section className="py-24 md:py-36 px-6 md:px-10 lg:px-16 bg-dark border-y border-border/40">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16 md:mb-20">
            <ScrollReveal>
              <p className="section-label justify-center mb-4 flex">
                <span className="block w-6 h-px bg-gold mr-3 mt-[6px]" />
                What We Stand On
              </p>
              <h2
                className="font-display text-display-lg font-light text-cream"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                The <em className="italic text-gold">Covenant</em> Framework
              </h2>
              <p
                className="font-display italic text-gold/60 mt-3 text-lg"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Built on Covenant. Established for More.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40">
            {values.map((v, i) => (
              <ScrollReveal key={v.letter + i} delay={i * 0.06} direction="up">
                <div className="bg-black p-8 md:p-10 group hover:bg-gold/5 transition-colors duration-300 relative">
                  <span
                    className="absolute top-3 right-4 font-display text-5xl font-light text-gold/10 leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {v.letter}
                  </span>
                  <p className="text-[11px] tracking-[0.16em] uppercase text-gold font-medium mb-3 relative z-10">{v.name}</p>
                  <p className="text-xs text-text-muted leading-relaxed relative z-10">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES OVERVIEW ─── */}
      <section className="py-24 md:py-36 px-6 md:px-10 lg:px-16 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <ScrollReveal>
              <p className="section-label justify-center mb-4 flex">
                <span className="block w-6 h-px bg-gold mr-3 mt-[6px]" />
                What We Do
              </p>
            </ScrollReveal>
            <AnimatedText
              text="Built to Elevate"
              tag="h2"
              className="font-display text-display-lg font-light text-cream"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            />
            <ScrollReveal delay={0.3}>
              <p className="text-text-muted text-sm mt-4">Every service is customized. Prices reflect starting rates — book a call and we&apos;ll build around your goals.</p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/40">
            {services.map((s, i) => (
              <ScrollReveal key={s.number} delay={i * 0.08} direction="up">
                <div className="service-card p-8 md:p-10 bg-dark group">
                  <span className="section-label">{s.number}</span>
                  <h3
                    className="font-display text-2xl md:text-3xl font-light text-cream mt-4 mb-4 group-hover:text-gold transition-colors duration-300"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="text-center mt-8">
              <Link href="/services" className="btn-ghost">
                <span>View All Services + Pricing</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── SCRIPTURE ─── */}
      <section className="py-20 md:py-28 px-6 md:px-10 lg:px-16 bg-dark border-y border-border/40">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0 items-center">
            <ScrollReveal direction="left">
              <div className="text-center py-10 lg:py-8 px-8">
                <p
                  className="font-display italic text-xl md:text-2xl font-light text-cream leading-relaxed max-w-md mx-auto mb-5"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  &ldquo;I will establish{" "}
                  <span className="text-gold not-italic">my covenant</span>{" "}
                  between me and you and your descendants after you, throughout your generations, for an everlasting covenant.&rdquo;
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-gold">Genesis 17:7</p>
              </div>
            </ScrollReveal>

            <div className="hidden lg:block bg-border/40 self-stretch" />

            <ScrollReveal direction="right">
              <div className="text-center py-10 lg:py-8 px-8 border-t border-border/40 lg:border-t-0">
                <p
                  className="font-display italic text-xl md:text-2xl font-light text-cream leading-relaxed max-w-md mx-auto mb-5"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  &ldquo;For we are{" "}
                  <span className="text-gold not-italic">God&apos;s handiwork</span>
                  , created in Christ Jesus to do good works, which God prepared in advance for us to do.&rdquo;
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-gold">Ephesians 2:10</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-0">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[440px]">
          <div className="py-20 md:py-28 px-6 md:px-10 lg:px-16 flex flex-col justify-center bg-dark">
            <ScrollReveal>
              <p className="section-label mb-6 flex items-center gap-3">
                <span className="block w-6 h-px bg-gold" />
                Ready to Build?
              </p>
              <h2
                className="font-display text-display-lg font-light text-cream leading-tight mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Let&apos;s Build Something<br />
                That <em className="italic text-gold">Lasts</em>
              </h2>
              <p className="text-text-secondary text-sm md:text-base leading-loose mb-8 max-w-md">
                Book a free Interest Meeting and let&apos;s talk about your brand, your vision, and how Moore Covenant Productions can help you build an online presence worthy of your calling.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary">
                  <span>Book a Free Call</span>
                </Link>
                <Link href="/services" className="btn-ghost">
                  <span>View Packages</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Visual side */}
          <div className="relative min-h-[300px] bg-black border-l border-border/40 flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
              }}
            />
            <div className="flex flex-col items-center gap-4 opacity-20">
              <svg viewBox="0 0 48 48" className="w-16 h-16" style={{ stroke: "#C9A84C", fill: "none", strokeWidth: 1 }}>
                <rect x="8" y="4" width="32" height="40" rx="2" />
                <circle cx="24" cy="18" r="7" />
                <path d="M8 44c0-8.837 7.163-16 16-16s16 7.163 16 16" />
              </svg>
              <span className="text-[9px] tracking-[0.14em] uppercase text-gold">Add lifestyle photo here</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const COGNAC = "#C4956A";
const COGNAC_LIGHT = "#DEB08A";
const CREAM = "#F0E8DC";
const MUTED = "#7a736a";
const BORDER = "rgba(196,149,106,0.15)";
const BG = "#080807";
const SURFACE = "#0E0D0B";

function Reveal({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" | "none" }) {
  const init =
    direction === "up" ? { opacity: 0, y: 30 } :
    direction === "left" ? { opacity: 0, x: -30 } :
    direction === "right" ? { opacity: 0, x: 30 } :
    { opacity: 0 };
  return (
    <motion.div
      initial={init}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const timeline = [
  {
    era: "The Beginning",
    label: "Running Away",
    desc: "Fashion felt like a spotlight nobody asked for. Getting dressed meant risking being seen — really seen. So the clothes stayed safe, stayed small, stayed invisible.",
  },
  {
    era: "The Shift",
    label: "The First Risk",
    desc: "One piece. Pulled from a rack with no plan, no logic — just instinct. Worn once. And something changed. Not just in how it looked. In how it felt to walk into a room.",
  },
  {
    era: "The Discovery",
    label: "Vintage Finds You",
    desc: "Vintage doesn't announce itself. It waits. In thrift stores, estate sales, the back of someone else's closet. When you find the right piece, you don't buy it — you claim it.",
  },
  {
    era: "DeLorean 88",
    label: "The Brand is Born",
    desc: "Named for the car that refused to be ordinary, built to move through time on its own terms. DeLorean 88 Vintage launched as a curation platform for the bold — the ones done hiding.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: BG }}>

      {/* ─── HERO ─── */}
      <div
        className="relative min-h-[70vh] flex items-end overflow-hidden"
        style={{ borderBottom: `1px solid ${BORDER}` }}
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(155deg, #160e06 0%, #080706 50%, #120f08 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 25% 40%, rgba(196,149,106,0.08) 0%, transparent 55%)` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(8,8,7,0.9) 85%, rgba(8,8,7,1) 100%)" }}
        />

        {/* Decorative number */}
        <div className="absolute top-1/2 right-10 md:right-20 -translate-y-1/2 pointer-events-none select-none">
          <p
            className="font-light italic"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(8rem, 20vw, 18rem)", color: `${COGNAC}05`, lineHeight: 1 }}
          >
            88
          </p>
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pb-16 md:pb-24 pt-36">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="block w-8 h-px" style={{ background: COGNAC }} />
            <span style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COGNAC }}>
              The Story Behind the Name
            </span>
          </motion.div>

          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-light leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 8vw, 7rem)", color: CREAM }}
            >
              From Running.
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
              className="font-light leading-none italic"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 8vw, 7rem)", color: COGNAC }}
            >
              To Arriving.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="text-sm md:text-base leading-loose max-w-lg"
            style={{ color: MUTED }}
          >
            A story about fear, instinct, and the moment someone decided that hiding in clothes wasn&apos;t living — it was disappearing.
          </motion.p>
        </div>
      </div>

      {/* ─── ORIGIN STORY ─── */}
      <section className="py-24 md:py-36 px-6 md:px-10 lg:px-16" style={{ backgroundColor: BG }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          {/* Visual */}
          <Reveal direction="left">
            <div
              className="relative aspect-[2/3] max-w-md overflow-hidden"
              style={{ border: `1px solid ${BORDER}` }}
            >
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(150deg, #1c1408 0%, #0e0a05 55%, #181208 100%)" }}
              />
              <div
                className="absolute inset-0"
                style={{ background: `radial-gradient(ellipse at 40% 35%, rgba(196,149,106,0.07) 0%, transparent 60%)` }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-10">
                  <p
                    className="font-light italic"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "6rem", color: `${COGNAC}18`, lineHeight: 1, marginBottom: "0.5rem" }}
                  >
                    88
                  </p>
                  <p style={{ fontSize: "8px", letterSpacing: "0.28em", textTransform: "uppercase", color: `${COGNAC}25` }}>
                    Every Era Matters
                  </p>
                </div>
              </div>
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(8,8,7,0.85) 100%)" }}
              />
              <div className="absolute bottom-5 left-5" style={{ backgroundColor: "rgba(0,0,0,0.88)", padding: "8px 14px" }}>
                <span style={{ fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: COGNAC }}>
                  DeLorean 88 · Vintage Since Day One
                </span>
              </div>
              <div className="absolute top-4 left-4 w-5 h-5" style={{ borderTop: `1px solid ${COGNAC}30`, borderLeft: `1px solid ${COGNAC}30` }} />
              <div className="absolute bottom-4 right-4 w-5 h-5" style={{ borderBottom: `1px solid ${COGNAC}30`, borderRight: `1px solid ${COGNAC}30` }} />
            </div>
          </Reveal>

          {/* Story text */}
          <div>
            <Reveal>
              <p className="flex items-center gap-3 mb-6" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: COGNAC }}>
                <span className="block w-6 h-px" style={{ background: COGNAC }} />
                The Origin
              </p>
            </Reveal>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-light leading-tight mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: CREAM }}
            >
              It Started With Fear.
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="font-light leading-tight italic mb-10"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: COGNAC }}
            >
              Not Fashion.
            </motion.h2>

            <Reveal delay={0.35}>
              <div className="space-y-5 text-sm leading-loose" style={{ color: MUTED }}>
                <p>
                  There was a time when getting dressed was about disappearing. Not standing out. Not drawing attention. Just getting through the day without anyone looking too long.
                </p>
                <p>
                  Clothes were armor — the wrong kind. Built to blend in. Built to shrink. And for a while, that felt safer than the alternative.
                </p>
                <p>
                  Then something shifted. It wasn&apos;t a moment. It was a decision. A risk — small at first. One piece, worn differently. An era that didn&apos;t match the room. Something vintage that said: <em style={{ color: CREAM }}>I&apos;ve been here before, and I&apos;m still standing.</em>
                </p>
                <p>
                  That&apos;s where DeLorean 88 came from. Not from confidence already possessed — but from the decision to build it, piece by piece, era by era.
                </p>
              </div>

              <blockquote
                className="font-light italic leading-snug pl-5 my-10"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: CREAM, borderLeft: `2px solid ${COGNAC}` }}
              >
                &ldquo;The DeLorean didn&apos;t ask permission to be what it was. You don&apos;t have to either.&rdquo;
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── THE NAME ─── */}
      <section
        className="py-20 md:py-28 px-6 md:px-10 lg:px-16"
        style={{ backgroundColor: SURFACE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1px_1fr_1fr] gap-0 items-start">
            <div className="hidden md:block self-stretch" style={{ backgroundColor: BORDER }} />
            <div className="py-0 md:py-0 md:px-16">
              <Reveal>
                <p className="flex items-center gap-3 mb-6" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: COGNAC }}>
                  <span className="block w-6 h-px" style={{ background: COGNAC }} />
                  The Name
                </p>
                <h3
                  className="font-light mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: CREAM }}
                >
                  Why DeLorean.<br />
                  <em style={{ color: COGNAC }}>Why 88.</em>
                </h3>
                <div className="space-y-4 text-sm leading-loose" style={{ color: MUTED }}>
                  <p>
                    The DeLorean DMC-12 was built on a bet that someone made against the entire auto industry. Stainless steel. Gull-wing doors. Rear engine. It broke every rule and paid for it — and became immortal for exactly that reason.
                  </p>
                  <p>
                    88 mph. The speed it took to go somewhere else entirely. That number isn&apos;t coincidence — it&apos;s intention.
                  </p>
                </div>
              </Reveal>
            </div>
            <div className="md:px-16 mt-10 md:mt-0" style={{ borderTop: "none" }}>
              <Reveal delay={0.15}>
                <p className="flex items-center gap-3 mb-6" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: COGNAC }}>
                  <span className="block w-6 h-px" style={{ background: COGNAC }} />
                  The Mission
                </p>
                <h3
                  className="font-light mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: CREAM }}
                >
                  One of One.<br />
                  <em style={{ color: COGNAC }}>Always.</em>
                </h3>
                <div className="space-y-4 text-sm leading-loose" style={{ color: MUTED }}>
                  <p>
                    Every piece in the DeLorean 88 collection is sourced because it carries something. A decade. A subculture. A moment in fashion history when someone decided to be bold.
                  </p>
                  <p>
                    We don&apos;t stock multiples. When you buy a DeLorean 88 piece, you&apos;re buying the only one. That&apos;s the whole philosophy.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="py-24 md:py-36 px-6 md:px-10 lg:px-16" style={{ backgroundColor: BG }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-xl mb-16 md:mb-20">
            <Reveal>
              <p className="flex items-center gap-3 mb-5" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: COGNAC }}>
                <span className="block w-6 h-px" style={{ background: COGNAC }} />
                The Journey
              </p>
            </Reveal>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: CREAM }}
            >
              Four Chapters.<br />
              <em style={{ color: COGNAC }}>One Direction.</em>
            </motion.h2>
          </div>

          <div className="space-y-px" style={{ backgroundColor: BORDER }}>
            {timeline.map((chapter, i) => (
              <Reveal key={chapter.era} delay={i * 0.1} direction="none">
                <div
                  className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-12 p-8 md:p-10 group transition-colors duration-300"
                  style={{ backgroundColor: BG }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = SURFACE; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = BG; }}
                >
                  <div>
                    <p style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: `${COGNAC}60`, marginBottom: "0.5rem" }}>
                      {chapter.era}
                    </p>
                    <p
                      className="font-light italic"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", color: COGNAC }}
                    >
                      {chapter.label}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm leading-loose" style={{ color: MUTED }}>{chapter.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY QUOTE ─── */}
      <section
        className="py-20 md:py-28 px-6 md:px-10 lg:px-16"
        style={{ backgroundColor: SURFACE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="max-w-[1400px] mx-auto text-center max-w-3xl mx-auto">
          <Reveal direction="none">
            <p style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COGNAC, marginBottom: "1.5rem" }}>
              Our Belief
            </p>
            <blockquote
              className="font-light italic leading-relaxed mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.4rem, 3vw, 2rem)", color: CREAM }}
            >
              &ldquo;Vintage isn&apos;t nostalgia. It&apos;s the courage to wear something that already survived — and bet that it will survive you, too.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-10" style={{ background: `linear-gradient(to right, transparent, ${COGNAC}50)` }} />
              <span style={{ fontSize: "0.58rem", letterSpacing: "0.24em", textTransform: "uppercase", color: `${COGNAC}60` }}>
                DeLorean 88 Vintage
              </span>
              <div className="h-px w-10" style={{ background: `linear-gradient(to left, transparent, ${COGNAC}50)` }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16" style={{ backgroundColor: BG }}>
        <div className="max-w-[1400px] mx-auto text-center max-w-2xl mx-auto">
          <Reveal direction="none">
            <p className="flex items-center justify-center gap-3 mb-6" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: COGNAC }}>
              <span className="block w-6 h-px" style={{ background: COGNAC }} />
              You&apos;ve heard enough
            </p>
            <h2
              className="font-light leading-tight mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: CREAM }}
            >
              Stop Running.<br />
              <em style={{ color: COGNAC }}>Start Wearing.</em>
            </h2>
            <p className="text-sm leading-loose mb-10 max-w-md mx-auto" style={{ color: MUTED }}>
              The collection is live. One of one pieces, each waiting for the right person to claim them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/delorean88/shop"
                className="inline-flex items-center justify-center gap-3 transition-all duration-300"
                style={{ padding: "1rem 2.5rem", border: `1px solid ${COGNAC}`, color: COGNAC, fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = COGNAC; el.style.color = BG; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = "transparent"; el.style.color = COGNAC; }}
              >
                <span>Shop the Collection</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <a
                href="https://instagram.com/delorean88vintage"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 transition-all duration-300"
                style={{ padding: "1rem 2.5rem", border: "1px solid rgba(240,232,220,0.15)", color: CREAM, fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase" }}
              >
                <span>Follow the Drops</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

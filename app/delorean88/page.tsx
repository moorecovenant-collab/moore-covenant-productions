"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const COGNAC = "#C4956A";
const COGNAC_LIGHT = "#DEB08A";
const CREAM = "#F0E8DC";
const MUTED = "#7a736a";
const BORDER = "rgba(196,149,106,0.15)";
const BG = "#080807";
const SURFACE = "#0E0D0B";

function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}) {
  const init =
    direction === "up" ? { opacity: 0, y: 36 } :
    direction === "left" ? { opacity: 0, x: -36 } :
    direction === "right" ? { opacity: 0, x: 36 } :
    { opacity: 0 };
  return (
    <motion.div
      initial={init}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const featuredItems = [
  {
    id: 1,
    name: "Archive Varsity Jacket",
    era: "1980s · Americana",
    price: "$148",
    tag: "Just Dropped",
    gradient: "linear-gradient(145deg, #1a1410 0%, #120d08 60%, #1c1208 100%)",
  },
  {
    id: 2,
    name: "Washed Denim Trench",
    era: "1990s · Workwear",
    price: "$124",
    tag: "1 Left",
    gradient: "linear-gradient(145deg, #0e1218 0%, #080c14 60%, #101520 100%)",
  },
  {
    id: 3,
    name: "Suede Western Shirt",
    era: "1970s · Western",
    price: "$96",
    tag: "New",
    gradient: "linear-gradient(145deg, #180e08 0%, #100a05 60%, #1a1008 100%)",
  },
];

const values = [
  {
    symbol: "◈",
    title: "Every Piece Has a Past",
    desc: "We don't sell fast fashion. Every item is sourced, inspected, and selected because it carries weight — history you can feel when you put it on.",
  },
  {
    symbol: "◉",
    title: "One of One",
    desc: "Vintage is inherently limited. When it's gone, it's gone. That scarcity isn't a gimmick — it's the point. You wear something nobody else has.",
  },
  {
    symbol: "✦",
    title: "The Bold Choice",
    desc: "Wearing vintage isn't safe. It's a declaration. It says you know who you are and you're not borrowing someone else's identity to prove it.",
  },
];

export default function D88HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <>
      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden">
        {/* Background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(160deg, #120e08 0%, #080706 45%, #0d0b07 100%)",
            }}
          />
          {/* Warm ambient light — upper left */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 20% 30%, rgba(196,149,106,0.09) 0%, transparent 55%)",
            }}
          />
          {/* Warm ambient — lower right */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 80% 80%, rgba(196,149,106,0.05) 0%, transparent 50%)",
            }}
          />
          {/* Bottom fade */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: "linear-gradient(to bottom, rgba(8,8,7,0.15) 0%, rgba(8,8,7,0.05) 30%, rgba(8,8,7,0.7) 70%, rgba(8,8,7,1) 100%)",
            }}
          />
        </motion.div>

        {/* Decorative grain-style lines */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3, delay: 2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[42%] left-0 h-px w-full origin-left"
            style={{ background: `linear-gradient(to right, transparent, rgba(196,149,106,0.12), transparent)` }}
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[44%] left-0 h-px w-full origin-right"
            style={{ background: `linear-gradient(to right, transparent, rgba(196,149,106,0.06), transparent)` }}
          />
        </div>

        {/* Hero content — bottom anchored for editorial feel */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pb-16 md:pb-24 pt-36"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-end">
            {/* Left — headline */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-center gap-3 mb-10"
              >
                <span className="block w-8 h-px" style={{ background: COGNAC }} />
                <span style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COGNAC }}>
                  Curated Vintage · Est. DeLorean 88
                </span>
              </motion.div>

              {/* Stacked headline */}
              <div className="overflow-hidden mb-1">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="font-light leading-none"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.8rem, 9vw, 8.5rem)", color: CREAM }}
                >
                  You Used
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-1">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, delay: 0.88, ease: [0.16, 1, 0.3, 1] }}
                  className="font-light leading-none italic"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.8rem, 9vw, 8.5rem)", color: COGNAC }}
                >
                  to Run.
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-10">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, delay: 1.06, ease: [0.16, 1, 0.3, 1] }}
                  className="font-light leading-none"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.8rem, 9vw, 8.5rem)", color: CREAM }}
                >
                  Now Arrive.
                </motion.h1>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/delorean88/shop"
                  className="inline-flex items-center gap-3 transition-all duration-400 group"
                  style={{
                    padding: "1rem 2.5rem",
                    border: `1px solid ${COGNAC}`,
                    color: COGNAC,
                    fontSize: "0.68rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.backgroundColor = COGNAC;
                    el.style.color = BG;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.backgroundColor = "transparent";
                    el.style.color = COGNAC;
                  }}
                >
                  <span>Shop the Collection</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link
                  href="/delorean88/about"
                  className="inline-flex items-center gap-3 transition-all duration-300"
                  style={{
                    padding: "1rem 2.5rem",
                    border: "1px solid rgba(240,232,220,0.16)",
                    color: CREAM,
                    fontSize: "0.68rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  <span>Our Story</span>
                </Link>
              </motion.div>
            </div>

            {/* Right — editorial callout */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block"
            >
              <div
                className="p-8 md:p-10"
                style={{ border: `1px solid ${BORDER}`, backgroundColor: "rgba(14,13,11,0.7)", backdropFilter: "blur(8px)" }}
              >
                <p style={{ fontSize: "0.58rem", letterSpacing: "0.26em", textTransform: "uppercase", color: COGNAC, marginBottom: "1rem" }}>
                  The DeLorean 88 Ethos
                </p>
                <blockquote
                  className="font-light italic leading-snug mb-5"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: CREAM }}
                >
                  &ldquo;Vintage isn&apos;t nostalgia. It&apos;s the courage to wear something that already survived.&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${COGNAC}40, transparent)` }} />
                  <span style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: `${COGNAC}60` }}>
                    DeLorean 88 Vintage
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <p style={{ fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#3a3530" }}>Scroll</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10"
            style={{ background: `linear-gradient(to bottom, ${COGNAC}50, transparent)` }}
          />
        </motion.div>
      </section>

      {/* ─── MANIFESTO STRIP ─── */}
      <section style={{ backgroundColor: SURFACE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-10">
          <Reveal direction="none">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p
                className="font-light italic text-center md:text-left"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: `${CREAM}80` }}
              >
                From running away from clothes —<br className="hidden md:block" />
                <span style={{ color: CREAM }}> to taking the risk to embrace them.</span>
              </p>
              <div className="h-px w-full md:w-px md:h-16 flex-shrink-0" style={{ backgroundColor: BORDER }} />
              <p
                className="text-center md:text-right text-sm leading-relaxed max-w-sm"
                style={{ color: MUTED }}
              >
                DeLorean 88 isn&apos;t a shop. It&apos;s a turning point — the moment you stop hiding and start wearing your truth.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FEATURED DROP ─── */}
      <section className="py-24 md:py-36 px-6 md:px-10 lg:px-16" style={{ backgroundColor: BG }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <Reveal>
                <p className="flex items-center gap-3 mb-4" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: COGNAC }}>
                  <span className="block w-6 h-px" style={{ background: COGNAC }} />
                  Current Drop
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
                The Latest <em style={{ color: COGNAC }}>Finds</em>
              </motion.h2>
            </div>
            <Reveal direction="right">
              <Link
                href="/delorean88/shop"
                className="hidden md:inline-flex items-center gap-2 text-xs tracking-widest uppercase transition-colors duration-300"
                style={{ color: MUTED }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = COGNAC; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = MUTED; }}
              >
                View All
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: BORDER }}>
            {featuredItems.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1} direction="up">
                <Link href="/delorean88/shop" className="group block" style={{ backgroundColor: BG }}>
                  {/* Image placeholder */}
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "3/4", background: item.gradient }}
                  >
                    {/* Ambient light */}
                    <div
                      className="absolute inset-0"
                      style={{ background: `radial-gradient(ellipse at 50% 35%, rgba(196,149,106,0.07) 0%, transparent 65%)` }}
                    />
                    {/* Photo placeholder icon */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ opacity: 0.12 }}>
                        <rect x="3" y="5" width="26" height="22" rx="2" stroke={COGNAC} strokeWidth="1" />
                        <circle cx="11" cy="12" r="2.5" stroke={COGNAC} strokeWidth="1" />
                        <path d="M3 22l7-7 5 4.5 4-3.5 8 6" stroke={COGNAC} strokeWidth="1" strokeLinejoin="round" />
                      </svg>
                      <p style={{ fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase", color: `${COGNAC}35`, marginTop: "10px" }}>
                        Product Photo
                      </p>
                    </div>
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6"
                      style={{ background: `linear-gradient(to top, rgba(8,8,7,0.85) 0%, transparent 55%)` }}
                    >
                      <span
                        className="inline-flex items-center gap-2 transition-all duration-300"
                        style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: COGNAC }}
                      >
                        View Piece
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>
                    {/* Tag */}
                    {item.tag && (
                      <div className="absolute top-4 left-4">
                        <span style={{ fontSize: "0.5rem", letterSpacing: "0.18em", textTransform: "uppercase", color: COGNAC, backgroundColor: "rgba(8,8,7,0.9)", padding: "4px 10px", border: `1px solid ${COGNAC}40` }}>
                          {item.tag}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="px-4 py-5" style={{ backgroundColor: SURFACE }}>
                    <p style={{ fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: `${COGNAC}70`, marginBottom: "0.375rem" }}>
                      {item.era}
                    </p>
                    <div className="flex items-center justify-between">
                      <h3
                        className="font-light transition-colors duration-300 group-hover:text-[#DEB08A]"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: CREAM }}
                      >
                        {item.name}
                      </h3>
                      <p className="font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: COGNAC_LIGHT }}>
                        {item.price}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="text-center mt-8">
              <Link
                href="/delorean88/shop"
                className="inline-flex items-center gap-3 transition-all duration-300"
                style={{ padding: "1rem 2.5rem", border: "1px solid rgba(240,232,220,0.15)", color: CREAM, fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = `${COGNAC}50`; el.style.color = COGNAC; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(240,232,220,0.15)"; el.style.color = CREAM; }}
              >
                <span>View All Vintage Pieces</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── THE ETHOS ─── */}
      <section
        className="py-24 md:py-36 px-6 md:px-10 lg:px-16"
        style={{ backgroundColor: SURFACE, borderTop: `1px solid ${BORDER}` }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
            {/* Left — visual */}
            <Reveal direction="left">
              <div
                className="relative aspect-[2/3] max-w-md overflow-hidden"
                style={{ border: `1px solid ${BORDER}` }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(150deg, #1c1408 0%, #0e0a05 55%, #181208 100%)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `radial-gradient(ellipse at 50% 35%, rgba(196,149,106,0.08) 0%, transparent 60%)` }}
                />
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center text-center px-10"
                >
                  <p
                    className="font-light italic"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "5rem", color: `${COGNAC}15`, lineHeight: 1 }}
                  >
                    88
                  </p>
                  <p style={{ fontSize: "8px", letterSpacing: "0.28em", textTransform: "uppercase", color: `${COGNAC}30`, marginTop: "8px" }}>
                    DeLorean Vintage
                  </p>
                </div>
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(8,8,7,0.8) 100%)" }}
                />
                <div className="absolute bottom-5 left-5" style={{ backgroundColor: "rgba(0,0,0,0.85)", padding: "8px 14px" }}>
                  <span style={{ fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: COGNAC }}>
                    The Collection · Always One of One
                  </span>
                </div>
                <div className="absolute top-4 left-4 w-5 h-5" style={{ borderTop: `1px solid ${COGNAC}35`, borderLeft: `1px solid ${COGNAC}35` }} />
                <div className="absolute bottom-4 right-4 w-5 h-5" style={{ borderBottom: `1px solid ${COGNAC}35`, borderRight: `1px solid ${COGNAC}35` }} />
              </div>
            </Reveal>

            {/* Right — text */}
            <div>
              <Reveal>
                <p className="flex items-center gap-3 mb-6" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: COGNAC }}>
                  <span className="block w-6 h-px" style={{ background: COGNAC }} />
                  Why DeLorean 88
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
                The Risk Is the Point.
              </motion.h2>
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="font-light leading-tight italic mb-10"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: COGNAC }}
              >
                Always Was.
              </motion.h2>

              <Reveal delay={0.35}>
                <div className="space-y-5 text-sm leading-loose mb-10" style={{ color: MUTED }}>
                  <p>
                    The DeLorean car wasn&apos;t built to play it safe. It was built to be remembered. That&apos;s the energy we carry into every piece we source, every drop we put out — chosen because someone looked at it and said <em style={{ color: CREAM }}>yes, that&apos;s it.</em>
                  </p>
                  <p>
                    Vintage fashion isn&apos;t about the past. It&apos;s about choosing something real over something manufactured. Something with a story over something with a season.
                  </p>
                  <p>
                    You used to run from clothes — scared they&apos;d say too much about you. Now you understand: <em style={{ color: CREAM }}>that&apos;s the whole idea.</em>
                  </p>
                </div>

                <blockquote
                  className="font-light italic leading-snug pl-5 mb-10"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", color: CREAM, borderLeft: `2px solid ${COGNAC}` }}
                >
                  &ldquo;Wear your story. Own your era.&rdquo;
                </blockquote>

                <Link
                  href="/delorean88/about"
                  className="inline-flex items-center gap-3 transition-all duration-300"
                  style={{ padding: "1rem 2.5rem", border: `1px solid ${COGNAC}`, color: COGNAC, fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = COGNAC; el.style.color = BG; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = "transparent"; el.style.color = COGNAC; }}
                >
                  <span>Read the Full Story</span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section
        className="py-24 md:py-32 px-6 md:px-10 lg:px-16"
        style={{ backgroundColor: BG, borderTop: `1px solid ${BORDER}` }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <Reveal>
              <p className="flex items-center justify-center gap-3 mb-5" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: COGNAC }}>
                <span className="block w-6 h-px" style={{ background: COGNAC }} />
                What We Stand On
              </p>
            </Reveal>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: CREAM }}
            >
              Built on <em style={{ color: COGNAC }}>Bold</em> Choices
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: BORDER }}>
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.12} direction="up">
                <div
                  className="p-10 md:p-12 relative group transition-colors duration-300"
                  style={{ backgroundColor: BG }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "#0e0d0b"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = BG; }}
                >
                  <span
                    className="absolute top-6 right-8"
                    style={{ fontSize: "2.5rem", color: `${COGNAC}10`, lineHeight: 1 }}
                  >
                    {v.symbol}
                  </span>
                  <p className="text-xl mb-5" style={{ color: COGNAC }}>{v.symbol}</p>
                  <h3
                    className="font-light mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: CREAM }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: MUTED }}>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── QUOTE BREAK ─── */}
      <section
        className="py-20 md:py-28 px-6 md:px-10 lg:px-16"
        style={{ backgroundColor: SURFACE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="max-w-[1400px] mx-auto">
          <Reveal direction="none">
            <div className="text-center max-w-3xl mx-auto">
              <p style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COGNAC, marginBottom: "1.5rem" }}>
                The DeLorean 88 Philosophy
              </p>
              <blockquote
                className="font-light italic leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: CREAM }}
              >
                &ldquo;The DeLorean wasn&apos;t built for the cautious. Neither is this collection. Every piece we carry survived — decades, owners, eras. The only question is whether you&apos;re bold enough to give it the next chapter.&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${COGNAC}50)` }} />
                <span style={{ fontSize: "0.58rem", letterSpacing: "0.24em", textTransform: "uppercase", color: `${COGNAC}60` }}>
                  DeLorean 88 Vintage
                </span>
                <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${COGNAC}50)` }} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-0" style={{ backgroundColor: BG }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[460px]" style={{ borderTop: `1px solid ${BORDER}` }}>
          <div
            className="py-20 md:py-28 px-6 md:px-10 lg:px-16 flex flex-col justify-center"
            style={{ backgroundColor: SURFACE }}
          >
            <Reveal>
              <p className="flex items-center gap-3 mb-6" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: COGNAC }}>
                <span className="block w-6 h-px" style={{ background: COGNAC }} />
                The Collection Is Live
              </p>
              <h2
                className="font-light leading-tight mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: CREAM }}
              >
                Stop Running.<br />
                Start <em style={{ color: COGNAC }}>Wearing.</em>
              </h2>
              <p className="text-sm leading-loose mb-8 max-w-md" style={{ color: MUTED }}>
                Curated vintage pieces — each one selected because it commands a room. No fast fashion, no filler. Just bold, one-of-one pieces waiting for the right person to claim them.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/delorean88/shop"
                  className="inline-flex items-center gap-3 transition-all duration-300"
                  style={{ padding: "1rem 2.5rem", border: `1px solid ${COGNAC}`, color: COGNAC, fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = COGNAC; el.style.color = BG; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = "transparent"; el.style.color = COGNAC; }}
                >
                  <span>Shop the Drop</span>
                </Link>
                <Link
                  href="/delorean88/about"
                  className="inline-flex items-center gap-3 transition-all duration-300"
                  style={{ padding: "1rem 2.5rem", border: "1px solid rgba(240,232,220,0.15)", color: CREAM, fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase" }}
                >
                  <span>Our Story</span>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Visual */}
          <div
            className="relative min-h-[280px] flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: "#0a0906", borderLeft: `1px solid ${BORDER}` }}
          >
            <div
              className="absolute inset-0"
              style={{ background: `radial-gradient(ellipse at 50% 50%, rgba(196,149,106,0.06) 0%, transparent 65%)` }}
            />
            <div className="flex flex-col items-center gap-3" style={{ opacity: 0.12 }}>
              <p
                className="font-light italic"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "6rem", color: COGNAC, lineHeight: 1 }}
              >
                88
              </p>
              <p style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: COGNAC }}>
                DeLorean · Vintage
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

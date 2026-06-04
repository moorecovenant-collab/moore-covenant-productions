"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

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
    direction === "up" ? { opacity: 0, y: 32 } :
    direction === "left" ? { opacity: 0, x: -32 } :
    direction === "right" ? { opacity: 0, x: 32 } :
    { opacity: 0 };
  return (
    <motion.div
      initial={init}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const pillars = [
  {
    action: "Buy",
    desc: "Hand-selected vintage pieces sourced from the best eras. Every item inspected before it hits the drop.",
    icon: "◈",
  },
  {
    action: "Sell",
    desc: "Got heat collecting dust? We help you move it to someone who'll actually wear it.",
    icon: "◉",
  },
  {
    action: "Trade",
    desc: "Straight swap or value difference — trade your pieces for something that fits your current era.",
    icon: "✦",
  },
];

const drops = [
  { name: "Archive Varsity Jacket", era: "1980s · Americana", price: "$148", tag: "Just Dropped", gradient: "from-[#1a1410] to-[#0d0a06]" },
  { name: "Washed Denim Trench", era: "1990s · Workwear",   price: "$124", tag: "1 Left",       gradient: "from-[#0e1218] to-[#080c14]" },
  { name: "Suede Western Shirt",  era: "1970s · Western",   price: "$96",  tag: "New",          gradient: "from-[#180e08] to-[#100a05]" },
];

const values = [
  { num: "01", title: "Only the Real", desc: "No reproductions. No fast fashion with a vintage filter. Everything we carry is the actual thing." },
  { num: "02", title: "One of One",    desc: "Vintage is inherently limited. When it's gone, it's gone. That's not a gimmick — it's the point." },
  { num: "03", title: "Bold by Default", desc: "This isn't for people who blend in. DeLorean 88 is for the ones done hiding in their wardrobe." },
];

export default function D88HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-d88-bg" />
          {/* Pink ambient glow — upper right */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 75% 25%, rgba(240,168,200,0.08) 0%, transparent 55%)" }} />
          {/* Second glow — lower left */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 15% 75%, rgba(240,168,200,0.04) 0%, transparent 45%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.75) 80%, rgba(0,0,0,1) 100%)" }} />
        </motion.div>

        {/* Vertical label — right edge */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
          <p
            className="text-[8px] tracking-[0.35em] uppercase text-d88-pink/30"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            DeLorean 88 · Vintage · Buy Sell Trade
          </p>
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pb-16 md:pb-24 pt-40"
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="block w-8 h-px bg-d88-pink" />
            <span className="text-[0.58rem] tracking-[0.32em] uppercase text-d88-pink">
              Curated Vintage · Est. DeLorean 88
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.05, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-light leading-none text-d88-white"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(4rem, 10vw, 9.5rem)" }}
            >
              You Used
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.05, delay: 0.82, ease: [0.16, 1, 0.3, 1] }}
              className="font-light leading-none italic text-d88-pink"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(4rem, 10vw, 9.5rem)" }}
            >
              to Run.
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-12">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.05, delay: 0.98, ease: [0.16, 1, 0.3, 1] }}
              className="font-light leading-none text-d88-white"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(4rem, 10vw, 9.5rem)" }}
            >
              Now Arrive.
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/delorean88/shop"
              className="inline-flex items-center gap-3 px-8 py-4 bg-d88-pink text-d88-bg text-[0.7rem] tracking-[0.18em] uppercase font-medium hover:bg-d88-pink-light transition-all duration-300"
            >
              <span>Shop the Drop</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link
              href="/delorean88/about"
              className="inline-flex items-center gap-3 px-8 py-4 border border-d88-white/15 text-d88-white text-[0.7rem] tracking-[0.18em] uppercase hover:border-d88-pink/40 hover:text-d88-pink transition-all duration-300"
            >
              Our Story
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <p className="text-[8px] tracking-[0.32em] uppercase text-d88-gray/40">Scroll</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10"
            style={{ background: "linear-gradient(to bottom, rgba(240,168,200,0.5), transparent)" }}
          />
        </motion.div>
      </section>

      {/* ─── BUY · SELL · TRADE ─── */}
      <section className="bg-d88-surface border-y border-d88-pink/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-d88-pink/10">
            {pillars.map((p, i) => (
              <Reveal key={p.action} delay={i * 0.1} direction="up">
                <div className="p-10 md:p-12 group hover:bg-d88-card transition-colors duration-300">
                  <p className="text-2xl text-d88-pink mb-6">{p.icon}</p>
                  <h3
                    className="font-light text-d88-white mb-3 group-hover:text-d88-pink transition-colors duration-300"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem" }}
                  >
                    {p.action}
                  </h3>
                  <p className="text-sm text-d88-gray leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MANIFESTO STRIP ─── */}
      <section className="bg-d88-bg border-b border-d88-pink/10 py-10 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <Reveal direction="none">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p
                className="font-light italic text-center md:text-left text-d88-white/50"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)" }}
              >
                From running away from clothes —
                <span className="text-d88-white"> to taking the risk to embrace them.</span>
              </p>
              <div className="hidden md:block w-px h-14 bg-d88-pink/15" />
              <p className="text-sm text-d88-gray leading-relaxed max-w-sm text-center md:text-right">
                DeLorean 88 is for the ones done hiding. Bold pieces for bold people — and that&apos;s the only kind we carry.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── LATEST DROP ─── */}
      <section className="py-24 md:py-36 px-6 md:px-10 lg:px-16 bg-d88-bg">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <Reveal>
                <p className="flex items-center gap-3 mb-4 text-[0.6rem] tracking-[0.28em] uppercase text-d88-pink">
                  <span className="block w-6 h-px bg-d88-pink" />
                  Current Drop
                </p>
              </Reveal>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="font-light text-d88-white"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                The Latest <em className="text-d88-pink">Finds</em>
              </motion.h2>
            </div>
            <Reveal direction="right">
              <Link href="/delorean88/shop" className="hidden md:inline-flex items-center gap-2 text-xs tracking-widest uppercase text-d88-gray hover:text-d88-pink transition-colors duration-300">
                View All
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-d88-pink/10">
            {drops.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.1} direction="up">
                <Link href="/delorean88/shop" className="group block bg-d88-bg">
                  {/* Image */}
                  <div className={`relative overflow-hidden aspect-[3/4] bg-gradient-to-br ${item.gradient}`}>
                    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 35%, rgba(240,168,200,0.06) 0%, transparent 60%)" }} />
                    {/* Placeholder */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ opacity: 0.1 }}>
                        <rect x="3" y="5" width="26" height="22" rx="2" stroke="#F0A8C8" strokeWidth="0.8" />
                        <circle cx="11" cy="12" r="2.5" stroke="#F0A8C8" strokeWidth="0.8" />
                        <path d="M3 22l7-7 5 4.5 4-3.5 8 6" stroke="#F0A8C8" strokeWidth="0.8" strokeLinejoin="round" />
                      </svg>
                      <p className="text-[8px] tracking-[0.18em] uppercase text-d88-pink/20 mt-2.5">Product Photo</p>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)" }}>
                      <span className="text-[0.6rem] tracking-[0.18em] uppercase text-d88-pink flex items-center gap-2">
                        View Piece
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>
                    {/* Tag */}
                    {item.tag && (
                      <div className="absolute top-4 left-4">
                        <span className="text-[0.5rem] tracking-[0.18em] uppercase text-d88-pink bg-d88-bg/90 border border-d88-pink/30 px-2.5 py-1">
                          {item.tag}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="px-4 py-5 bg-d88-surface">
                    <p className="text-[0.55rem] tracking-[0.18em] uppercase text-d88-pink/60 mb-1">{item.era}</p>
                    <div className="flex items-center justify-between">
                      <h3 className="font-light text-d88-white group-hover:text-d88-pink-light transition-colors duration-300"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}>
                        {item.name}
                      </h3>
                      <p className="font-light text-d88-pink-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
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
              <Link href="/delorean88/shop" className="inline-flex items-center gap-3 px-8 py-4 border border-d88-white/12 text-d88-white text-[0.7rem] tracking-[0.18em] uppercase hover:border-d88-pink/40 hover:text-d88-pink transition-all duration-300">
                View All Vintage Pieces
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── THE RISK ─── */}
      <section className="py-24 md:py-36 px-6 md:px-10 lg:px-16 bg-d88-surface border-t border-d88-pink/10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          {/* Visual */}
          <Reveal direction="left">
            <div className="relative aspect-[2/3] max-w-md border border-d88-pink/10">
              <div className="absolute inset-0 bg-d88-card" />
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 40% 35%, rgba(240,168,200,0.06) 0%, transparent 60%)" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-light italic text-d88-pink/12" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "9rem", lineHeight: 1 }}>
                  88
                </p>
              </div>
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.85) 100%)" }} />
              <div className="absolute bottom-5 left-5 bg-d88-bg/90 px-3 py-2">
                <span className="text-[8px] tracking-[0.2em] uppercase text-d88-pink">The Collection · Always One of One</span>
              </div>
              <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-d88-pink/20" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-d88-pink/20" />
            </div>
          </Reveal>

          {/* Text */}
          <div>
            <Reveal>
              <p className="flex items-center gap-3 mb-6 text-[0.6rem] tracking-[0.28em] uppercase text-d88-pink">
                <span className="block w-6 h-px bg-d88-pink" />
                Why DeLorean 88
              </p>
            </Reveal>
            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-light text-d88-white leading-tight mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              The Risk Is the Point.
            </motion.h2>
            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="font-light text-d88-pink leading-tight italic mb-10"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              Always Was.
            </motion.h2>
            <Reveal delay={0.35}>
              <div className="space-y-5 text-sm text-d88-gray leading-loose mb-8">
                <p>The DeLorean car wasn&apos;t built to play it safe. It was built to be remembered. That&apos;s the energy behind every piece we source — chosen because someone looked at it and said <em className="text-d88-white">yes, that&apos;s it.</em></p>
                <p>Vintage fashion isn&apos;t about the past. It&apos;s about choosing something real over something manufactured. Something with a story over something with a season.</p>
                <p>You used to run from clothes — scared they&apos;d say too much about you. Now you understand: <em className="text-d88-white">that&apos;s the whole idea.</em></p>
              </div>
              <blockquote className="font-light italic text-d88-white border-l-2 border-d88-pink pl-5 mb-10 text-xl leading-snug"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                &ldquo;Wear your story. Own your era.&rdquo;
              </blockquote>
              <Link href="/delorean88/about"
                className="inline-flex items-center gap-3 px-8 py-4 border border-d88-pink text-d88-pink text-[0.7rem] tracking-[0.18em] uppercase hover:bg-d88-pink hover:text-d88-bg transition-all duration-300">
                Read the Full Story
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-d88-bg border-t border-d88-pink/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <Reveal>
              <p className="flex items-center justify-center gap-3 mb-5 text-[0.6rem] tracking-[0.28em] uppercase text-d88-pink">
                <span className="block w-6 h-px bg-d88-pink" />
                What We Stand On
              </p>
            </Reveal>
            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="font-light text-d88-white"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              Built on <em className="text-d88-pink">Bold</em> Choices
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-d88-pink/10">
            {values.map((v, i) => (
              <Reveal key={v.num} delay={i * 0.12} direction="up">
                <div className="bg-d88-bg p-10 md:p-12 relative group hover:bg-d88-surface transition-colors duration-300">
                  <span className="absolute top-6 right-8 font-light text-d88-pink/6 text-5xl leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {v.num}
                  </span>
                  <p className="text-[0.58rem] tracking-[0.22em] uppercase text-d88-pink mb-4">{v.num}</p>
                  <h3 className="font-light text-d88-white mb-3 group-hover:text-d88-pink transition-colors duration-300"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem" }}>
                    {v.title}
                  </h3>
                  <p className="text-xs text-d88-gray leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── QUOTE ─── */}
      <section className="py-20 md:py-28 px-6 md:px-10 lg:px-16 bg-d88-surface border-y border-d88-pink/10">
        <div className="max-w-[1400px] mx-auto text-center max-w-3xl mx-auto">
          <Reveal direction="none">
            <p className="text-[0.58rem] tracking-[0.3em] uppercase text-d88-pink mb-6">The DeLorean 88 Philosophy</p>
            <blockquote className="font-light italic text-d88-white leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}>
              &ldquo;The DeLorean wasn&apos;t built for the cautious. Neither is this collection. Every piece we carry survived — decades, owners, eras. The only question is whether you&apos;re bold enough to give it the next chapter.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-d88-pink/40" />
              <span className="text-[0.58rem] tracking-[0.24em] uppercase text-d88-pink/50">DeLorean 88 Vintage</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-d88-pink/40" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-0 bg-d88-bg">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[460px] border-t border-d88-pink/10">
          <div className="py-20 md:py-28 px-6 md:px-10 lg:px-16 flex flex-col justify-center bg-d88-surface">
            <Reveal>
              <p className="flex items-center gap-3 mb-6 text-[0.6rem] tracking-[0.28em] uppercase text-d88-pink">
                <span className="block w-6 h-px bg-d88-pink" />
                The Collection Is Live
              </p>
              <h2 className="font-light text-d88-white leading-tight mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                Stop Running.<br />
                Start <em className="text-d88-pink">Wearing.</em>
              </h2>
              <p className="text-sm text-d88-gray leading-loose mb-8 max-w-md">
                Curated vintage — each piece selected because it commands attention. No fast fashion. No filler. Bold, one-of-one pieces waiting for the right person.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/delorean88/shop"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-d88-pink text-d88-bg text-[0.7rem] tracking-[0.18em] uppercase font-medium hover:bg-d88-pink-light transition-all duration-300">
                  Shop the Drop
                </Link>
                <Link href="/delorean88/about"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-d88-white/12 text-d88-white text-[0.7rem] tracking-[0.18em] uppercase hover:border-d88-pink/40 hover:text-d88-pink transition-all duration-300">
                  Our Story
                </Link>
              </div>
            </Reveal>
          </div>
          {/* Visual */}
          <div className="relative min-h-[280px] flex items-center justify-center overflow-hidden bg-d88-bg border-l border-d88-pink/10">
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(240,168,200,0.05) 0%, transparent 65%)" }} />
            <div className="flex flex-col items-center gap-3 opacity-10">
              <p className="font-light italic text-d88-pink" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "7rem", lineHeight: 1 }}>88</p>
              <p className="text-[9px] tracking-[0.32em] uppercase text-d88-pink">DeLorean · Vintage</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

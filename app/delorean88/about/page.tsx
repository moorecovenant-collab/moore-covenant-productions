"use client";

import { motion } from "framer-motion";
import Link from "next/link";

function Reveal({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up" | "left" | "none" }) {
  const init = direction === "up" ? { opacity: 0, y: 28 } : direction === "left" ? { opacity: 0, x: -28 } : { opacity: 0 };
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
  { era: "The Beginning", label: "Running Away",       desc: "Fashion felt like a spotlight nobody asked for. Getting dressed meant risking being seen — really seen. So the clothes stayed safe, stayed small, stayed invisible." },
  { era: "The Shift",     label: "The First Risk",     desc: "One piece. Pulled from a rack with no plan, no logic — just instinct. Worn once. And something changed. Not just in how it looked. In how it felt to walk into a room." },
  { era: "The Discovery", label: "Vintage Finds You",  desc: "Vintage doesn't announce itself. It waits. In thrift stores, estate sales, the back of someone else's closet. When you find the right piece, you don't buy it — you claim it." },
  { era: "DeLorean 88",   label: "The Brand is Born",  desc: "Named for the car that refused to be ordinary. DeLorean 88 Vintage launched as a buy/sell/trade platform for the bold — the ones done hiding in their wardrobe." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-d88-bg">

      {/* ─── HERO ─── */}
      <div className="relative min-h-[70vh] flex items-end overflow-hidden border-b border-d88-pink/10">
        <div className="absolute inset-0 bg-d88-bg" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 40%, rgba(240,168,200,0.07) 0%, transparent 55%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85) 85%, black 100%)" }} />
        {/* Giant decorative 88 */}
        <div className="absolute top-1/2 right-8 md:right-16 -translate-y-1/2 pointer-events-none select-none">
          <p className="font-light italic text-d88-pink/[0.04]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(8rem, 22vw, 20rem)", lineHeight: 1 }}>
            88
          </p>
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pb-16 md:pb-24 pt-40">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center gap-3 mb-8">
            <span className="block w-8 h-px bg-d88-pink" />
            <span className="text-[0.58rem] tracking-[0.3em] uppercase text-d88-pink">The Story Behind the Name</span>
          </motion.div>
          <div className="overflow-hidden mb-1">
            <motion.h1 initial={{ y: "110%" }} animate={{ y: "0%" }}
              transition={{ duration: 1.05, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-light leading-none text-d88-white"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 8vw, 7rem)" }}>
              From Running.
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1 initial={{ y: "110%" }} animate={{ y: "0%" }}
              transition={{ duration: 1.05, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
              className="font-light leading-none italic text-d88-pink"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 8vw, 7rem)" }}>
              To Arriving.
            </motion.h1>
          </div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }}
            className="text-sm md:text-base text-d88-gray leading-loose max-w-lg">
            A story about fear, instinct, and the moment someone decided that hiding in clothes wasn&apos;t living — it was disappearing.
          </motion.p>
        </div>
      </div>

      {/* ─── ORIGIN ─── */}
      <section className="py-24 md:py-36 px-6 md:px-10 lg:px-16 bg-d88-bg">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          <Reveal direction="left">
            <div className="relative aspect-[2/3] max-w-md border border-d88-pink/10">
              <div className="absolute inset-0 bg-d88-card" />
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 40% 35%, rgba(240,168,200,0.06) 0%, transparent 60%)" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-light italic text-d88-pink/10" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "7rem", lineHeight: 1 }}>88</p>
              </div>
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.85) 100%)" }} />
              <div className="absolute bottom-5 left-5 bg-d88-bg/90 px-3 py-2">
                <span className="text-[8px] tracking-[0.2em] uppercase text-d88-pink">DeLorean 88 · Vintage Since Day One</span>
              </div>
              <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-d88-pink/20" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-d88-pink/20" />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="flex items-center gap-3 mb-6 text-[0.6rem] tracking-[0.28em] uppercase text-d88-pink">
                <span className="block w-6 h-px bg-d88-pink" />
                The Origin
              </p>
            </Reveal>
            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-light text-d88-white leading-tight mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              It Started With Fear.
            </motion.h2>
            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="font-light text-d88-pink leading-tight italic mb-10"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              Not Fashion.
            </motion.h2>
            <Reveal delay={0.35}>
              <div className="space-y-5 text-sm text-d88-gray leading-loose">
                <p>There was a time when getting dressed was about disappearing. Not standing out. Not drawing attention. Just getting through the day without anyone looking too long.</p>
                <p>Clothes were armor — the wrong kind. Built to blend in. Built to shrink. And for a while, that felt safer than the alternative.</p>
                <p>Then something shifted. A risk — small at first. One piece, worn differently. Something vintage that said: <em className="text-d88-white">I&apos;ve been here before, and I&apos;m still standing.</em></p>
                <p>That&apos;s where DeLorean 88 came from. Not from confidence already possessed — but from the decision to build it, piece by piece, era by era.</p>
              </div>
              <blockquote className="font-light italic text-d88-white border-l-2 border-d88-pink pl-5 my-10 text-xl leading-snug"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                &ldquo;The DeLorean didn&apos;t ask permission to be what it was. You don&apos;t have to either.&rdquo;
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── THE NAME ─── */}
      <section className="py-20 md:py-28 px-6 md:px-10 lg:px-16 bg-d88-surface border-y border-d88-pink/10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <Reveal>
            <p className="flex items-center gap-3 mb-6 text-[0.6rem] tracking-[0.28em] uppercase text-d88-pink">
              <span className="block w-6 h-px bg-d88-pink" />
              The Name
            </p>
            <h3 className="font-light text-d88-white mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Why DeLorean.<br /><em className="text-d88-pink">Why 88.</em>
            </h3>
            <div className="space-y-4 text-sm text-d88-gray leading-loose">
              <p>The DeLorean DMC-12 was built on a bet against the entire auto industry. Stainless steel. Gull-wing doors. It broke every rule and became immortal for exactly that reason.</p>
              <p>88 mph. The speed it took to go somewhere else entirely. That number isn&apos;t coincidence — it&apos;s intention. This brand is about shifting eras on your own terms.</p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="flex items-center gap-3 mb-6 text-[0.6rem] tracking-[0.28em] uppercase text-d88-pink">
              <span className="block w-6 h-px bg-d88-pink" />
              The Mission
            </p>
            <h3 className="font-light text-d88-white mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Buy, Sell, Trade.<br /><em className="text-d88-pink">Always One of One.</em>
            </h3>
            <div className="space-y-4 text-sm text-d88-gray leading-loose">
              <p>Every piece in the DeLorean 88 collection is sourced because it carries something. A decade. A subculture. A moment in fashion history when someone decided to be bold.</p>
              <p>We don&apos;t stock multiples. Buy a DeLorean 88 piece and you&apos;re the only one. Want to move something on? Sell it here. Found something worth swapping for? Trade it. That&apos;s the whole community.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="py-24 md:py-36 px-6 md:px-10 lg:px-16 bg-d88-bg">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-xl mb-16 md:mb-20">
            <Reveal>
              <p className="flex items-center gap-3 mb-5 text-[0.6rem] tracking-[0.28em] uppercase text-d88-pink">
                <span className="block w-6 h-px bg-d88-pink" />
                The Journey
              </p>
            </Reveal>
            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="font-light text-d88-white"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              Four Chapters.<br /><em className="text-d88-pink">One Direction.</em>
            </motion.h2>
          </div>

          <div className="space-y-px bg-d88-pink/10">
            {timeline.map((chapter, i) => (
              <Reveal key={chapter.era} delay={i * 0.1} direction="none">
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-12 p-8 md:p-10 bg-d88-bg hover:bg-d88-surface transition-colors duration-300 group">
                  <div>
                    <p className="text-[0.55rem] tracking-[0.2em] uppercase text-d88-pink/50 mb-2">{chapter.era}</p>
                    <p className="font-light italic text-d88-pink"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem" }}>
                      {chapter.label}
                    </p>
                  </div>
                  <p className="text-sm text-d88-gray leading-loose">{chapter.desc}</p>
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
            <p className="text-[0.58rem] tracking-[0.3em] uppercase text-d88-pink mb-6">Our Belief</p>
            <blockquote className="font-light italic text-d88-white leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
              &ldquo;Vintage isn&apos;t nostalgia. It&apos;s the courage to wear something that already survived — and bet that it will survive you, too.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-d88-pink/35" />
              <span className="text-[0.58rem] tracking-[0.24em] uppercase text-d88-pink/45">DeLorean 88 Vintage</span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-d88-pink/35" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-d88-bg">
        <div className="max-w-[1400px] mx-auto text-center max-w-2xl mx-auto">
          <Reveal direction="none">
            <p className="flex items-center justify-center gap-3 mb-6 text-[0.6rem] tracking-[0.28em] uppercase text-d88-pink">
              <span className="block w-6 h-px bg-d88-pink" />
              You&apos;ve heard enough
            </p>
            <h2 className="font-light text-d88-white leading-tight mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
              Stop Running.<br /><em className="text-d88-pink">Start Wearing.</em>
            </h2>
            <p className="text-sm text-d88-gray leading-loose mb-10 max-w-md mx-auto">
              One of one pieces, each waiting for the right person to claim them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/delorean88/shop"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-d88-pink text-d88-bg text-[0.7rem] tracking-[0.18em] uppercase font-medium hover:bg-d88-pink-light transition-all duration-300">
                Shop the Collection
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <a href="https://instagram.com/delorean88vintage" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-d88-white/12 text-d88-white text-[0.7rem] tracking-[0.18em] uppercase hover:border-d88-pink/35 hover:text-d88-pink transition-all duration-300">
                Follow the Drops
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

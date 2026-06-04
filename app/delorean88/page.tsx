"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─── DeLorean DMC-12 SVG ─── */
function DeLoreanSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 340"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Glow under car */}
      <ellipse cx="400" cy="295" rx="310" ry="18" fill="#FF69B4" opacity="0.18" />

      {/* Chassis / underside */}
      <rect x="90" y="265" width="620" height="18" rx="4" fill="#888" />

      {/* Side skirts */}
      <path d="M110 265 L690 265 L700 275 L100 275 Z" fill="#555" />

      {/* Main body — low wedge shape */}
      <path
        d="M120 265
           L120 185
           L175 125
           L290 95
           L510 90
           L620 110
           L680 150
           L700 195
           L700 265 Z"
        fill="#C8C8C8"
        stroke="#999"
        strokeWidth="1.5"
      />

      {/* Brushed stainless texture lines */}
      {[130,150,170,190,210,230,250,270,290,310,330,350,370,390,
        410,430,450,470,490,510,530,550,570,590,610,630,650,670,690].map((x, i) => (
        <line
          key={i}
          x1={x} y1="115"
          x2={x} y2="265"
          stroke="#aaa"
          strokeWidth="0.4"
          opacity="0.35"
        />
      ))}

      {/* Hood — sloping front */}
      <path
        d="M120 185 L175 125 L290 95 L295 105 L185 135 L130 195 Z"
        fill="#BEBEBE"
        stroke="#999"
        strokeWidth="1"
      />

      {/* Windshield */}
      <path
        d="M295 105 L370 90 L510 90 L510 100 L375 100 L300 115 Z"
        fill="#2a3a4a"
        stroke="#555"
        strokeWidth="1"
        opacity="0.95"
      />
      {/* Windshield glare */}
      <path
        d="M310 108 L360 93 L380 93 L330 110 Z"
        fill="white"
        opacity="0.12"
      />

      {/* Gull-wing door — left panel visible from side */}
      <path
        d="M295 110 L505 100 L505 108 L295 120 Z"
        fill="#B0B0B0"
        stroke="#888"
        strokeWidth="1"
      />
      {/* Door line */}
      <path
        d="M400 95 L400 265"
        stroke="#888"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        opacity="0.5"
      />

      {/* Rear window / louvres */}
      <path
        d="M510 90 L620 110 L615 120 L510 100 Z"
        fill="#1a2530"
        stroke="#555"
        strokeWidth="1"
      />
      {[0,5,10,15,20].map((offset) => (
        <line
          key={offset}
          x1={510 + offset * 18}
          y1={90 + offset * 3}
          x2={615 + offset * 2}
          y2={112 + offset * 2}
          stroke="#333"
          strokeWidth="1"
          opacity="0.6"
        />
      ))}

      {/* Rear end / tail */}
      <path
        d="M620 110 L680 150 L700 195 L700 265 L685 265 L680 160 L665 125 Z"
        fill="#ADADAD"
        stroke="#999"
        strokeWidth="1"
      />

      {/* Tail lights */}
      <rect x="685" y="195" width="14" height="35" rx="2" fill="#FF3333" opacity="0.9" />
      <rect x="685" y="235" width="14" height="22" rx="2" fill="#FF8888" opacity="0.6" />

      {/* Front end */}
      <path
        d="M120 185 L130 195 L100 225 L95 250 L110 265 L90 265 L90 235 Z"
        fill="#ADADAD"
        stroke="#999"
        strokeWidth="1"
      />
      {/* Front light strip */}
      <rect x="93" y="215" width="12" height="30" rx="2" fill="#FFEE88" opacity="0.9" />

      {/* Front bumper */}
      <path d="M90 250 L120 248 L120 265 L90 265 Z" fill="#777" />
      {/* Rear bumper */}
      <path d="M700 250 L680 248 L680 265 L700 265 Z" fill="#777" />

      {/* Door handles */}
      <rect x="310" y="185" width="55" height="6" rx="3" fill="#777" />
      <rect x="440" y="185" width="55" height="6" rx="3" fill="#777" />

      {/* Rear wheel arch */}
      <ellipse cx="565" cy="270" rx="75" ry="22" fill="black" />
      <circle cx="565" cy="270" r="68" fill="#1a1a1a" stroke="#555" strokeWidth="2" />
      <circle cx="565" cy="270" r="48" fill="#2a2a2a" />
      {/* Rim spokes */}
      {[0,45,90,135,180,225,270,315].map((angle) => (
        <line
          key={angle}
          x1={565 + Math.cos((angle * Math.PI) / 180) * 10}
          y1={270 + Math.sin((angle * Math.PI) / 180) * 10}
          x2={565 + Math.cos((angle * Math.PI) / 180) * 44}
          y2={270 + Math.sin((angle * Math.PI) / 180) * 44}
          stroke="#666"
          strokeWidth="3"
        />
      ))}
      <circle cx="565" cy="270" r="10" fill="#555" />

      {/* Front wheel arch */}
      <ellipse cx="200" cy="270" rx="75" ry="22" fill="black" />
      <circle cx="200" cy="270" r="68" fill="#1a1a1a" stroke="#555" strokeWidth="2" />
      <circle cx="200" cy="270" r="48" fill="#2a2a2a" />
      {[0,45,90,135,180,225,270,315].map((angle) => (
        <line
          key={angle}
          x1={200 + Math.cos((angle * Math.PI) / 180) * 10}
          y1={270 + Math.sin((angle * Math.PI) / 180) * 10}
          x2={200 + Math.cos((angle * Math.PI) / 180) * 44}
          y2={270 + Math.sin((angle * Math.PI) / 180) * 44}
          stroke="#666"
          strokeWidth="3"
        />
      ))}
      <circle cx="200" cy="270" r="10" fill="#555" />

      {/* DMC badge */}
      <text
        x="400" y="200"
        textAnchor="middle"
        fontSize="11"
        fill="#FF69B4"
        fontFamily="'Cormorant Garamond', serif"
        letterSpacing="3"
        opacity="0.7"
      >
        DMC · 12
      </text>

      {/* Pink glow on body */}
      <path
        d="M120 265 L120 185 L175 125 L290 95 L510 90 L620 110 L680 150 L700 195 L700 265 Z"
        fill="none"
        stroke="#FF69B4"
        strokeWidth="1"
        opacity="0.35"
      />
    </svg>
  );
}

/* ─── Shoe silhouette SVG ─── */
function SneakerSVG({ color = "#FF69B4", className = "" }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 300 180" className={className} fill="none">
      {/* Sole */}
      <path d="M20 140 Q150 155 280 140 L285 155 Q150 175 15 155 Z" fill="#222" />
      {/* Midsole */}
      <path d="M22 130 Q150 145 278 132 L280 140 Q150 155 20 140 Z" fill={color} opacity="0.8" />
      {/* Upper */}
      <path d="M40 130 L50 80 L120 55 L220 65 L270 100 L278 130 Z" fill="#f0f0f0" />
      {/* Swoosh-style stripe */}
      <path d="M55 110 Q120 70 235 95" stroke={color} strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.9" />
      {/* Toe box */}
      <path d="M40 130 L50 80 L80 75 L70 125 Z" fill="#e0e0e0" />
      {/* Laces */}
      {[85, 105, 125, 145, 165].map((x, i) => (
        <line key={i} x1={x} y1={68 + i * 4} x2={x + 60} y2={70 + i * 4} stroke="#ccc" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      ))}
      {/* Heel tab */}
      <path d="M250 80 L265 60 L270 62 L255 82 Z" fill={color} opacity="0.7" />
      {/* Shadow */}
      <ellipse cx="155" cy="165" rx="120" ry="6" fill="black" opacity="0.3" />
    </svg>
  );
}

/* ─── Clothing hanger SVG ─── */
function ClothingSVG({ color = "#FF69B4", className = "" }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 220 260" className={className} fill="none">
      {/* Hanger */}
      <circle cx="110" cy="15" r="6" fill="#888" />
      <path d="M110 21 L110 40 Q110 50 50 80 L170 80 Q110 50 110 40" stroke="#888" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* T-shirt / jacket body */}
      <path d="M50 80 L30 110 L55 120 L60 100 L60 230 L160 230 L160 100 L165 120 L190 110 L170 80 Z" fill={color} opacity="0.85" />
      {/* Collar */}
      <path d="M85 80 Q110 100 135 80" stroke="white" strokeWidth="3" fill="none" opacity="0.5" />
      {/* Pocket */}
      <rect x="75" y="130" width="35" height="28" rx="3" fill="white" opacity="0.15" />
      {/* Sleeve stitching */}
      <line x1="55" y1="120" x2="60" y2="100" stroke="white" strokeWidth="1.5" opacity="0.3" />
      <line x1="165" y1="120" x2="160" y2="100" stroke="white" strokeWidth="1.5" opacity="0.3" />
    </svg>
  );
}

function Reveal({
  children, delay = 0, direction = "up", className = "",
}: {
  children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" | "none"; className?: string;
}) {
  const init = direction === "up" ? { opacity: 0, y: 32 } : direction === "left" ? { opacity: 0, x: -32 } : direction === "right" ? { opacity: 0, x: 32 } : { opacity: 0 };
  return (
    <motion.div initial={init} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const y2kDrops = [
  {
    name: "Archive Varsity Jacket",
    era: "1980s · Americana",
    price: "$148",
    tag: "Just Dropped",
    visual: "jacket",
    bg: "from-[#1a0030] via-[#2d0050] to-[#0d0020]",
    glow: "#BF00FF",
    accentColor: "#DA70FF",
  },
  {
    name: "Chunky Platform Sneaker",
    era: "Y2K · 2000s",
    price: "$112",
    tag: "1 Left",
    visual: "shoe",
    bg: "from-[#001a30] via-[#003366] to-[#000d1a]",
    glow: "#00BFFF",
    accentColor: "#60D0FF",
  },
  {
    name: "Suede Western Shirt",
    era: "1970s · Western",
    price: "$96",
    tag: "New",
    visual: "jacket",
    bg: "from-[#1a3000] via-[#2d5000] to-[#0d1800]",
    glow: "#7FFF00",
    accentColor: "#A0F040",
  },
  {
    name: "Air Sole Trainer",
    era: "1990s · Sport",
    price: "$138",
    tag: "Rare",
    visual: "shoe",
    bg: "from-[#300010] via-[#500020] to-[#1a0008]",
    glow: "#FF3DA0",
    accentColor: "#FF69B4",
  },
  {
    name: "Nylon Track Jacket",
    era: "2000s · Y2K",
    price: "$85",
    tag: "New",
    visual: "jacket",
    bg: "from-[#1a1000] via-[#332000] to-[#0d0800]",
    glow: "#FFA500",
    accentColor: "#FFB84D",
  },
  {
    name: "Leather Blazer",
    era: "1980s · Glam",
    price: "$195",
    tag: "Just Dropped",
    visual: "jacket",
    bg: "from-[#001818] via-[#003333] to-[#000d0d]",
    glow: "#00FFCC",
    accentColor: "#40FFD8",
  },
];

export default function D88HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const carY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <>
      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-d88-bg" />
          {/* Pink radial glow — center left */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(255,105,180,0.14) 0%, transparent 55%)" }} />
          {/* Blue radial — upper right */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(0,191,255,0.07) 0%, transparent 45%)" }} />
          {/* Purple — lower right */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 90% 80%, rgba(191,0,255,0.06) 0%, transparent 45%)" }} />
          {/* Fade to black at bottom */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.4) 65%, black 100%)" }} />

          {/* Grid overlay — Y2K vibe */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,105,180,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,105,180,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </motion.div>

        {/* DeLorean SVG — right side */}
        <motion.div
          style={{ y: carY }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-24 right-0 z-10 w-[55%] max-w-2xl pointer-events-none"
        >
          <DeLoreanSVG className="w-full drop-shadow-[0_0_40px_rgba(255,105,180,0.3)]" />
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pb-20 md:pb-32 pt-40"
        >
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-center gap-3 mb-10">
            <span className="block w-8 h-px bg-d88-pink" />
            <span className="text-[0.58rem] tracking-[0.32em] uppercase text-d88-pink">
              Curated Vintage · Buy · Sell · Trade
            </span>
          </motion.div>

          <div className="max-w-[55%]">
            <div className="overflow-hidden mb-1">
              <motion.h1 initial={{ y: "110%" }} animate={{ y: "0%" }}
                transition={{ duration: 1.05, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="font-light leading-none text-d88-white"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(4rem, 9vw, 8.5rem)" }}>
                You Used
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-1">
              <motion.h1 initial={{ y: "110%" }} animate={{ y: "0%" }}
                transition={{ duration: 1.05, delay: 0.82, ease: [0.16, 1, 0.3, 1] }}
                className="font-light leading-none italic text-d88-pink"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(4rem, 9vw, 8.5rem)",
                  textShadow: "0 0 40px rgba(255,105,180,0.5)",
                }}>
                to Run.
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-12">
              <motion.h1 initial={{ y: "110%" }} animate={{ y: "0%" }}
                transition={{ duration: 1.05, delay: 0.98, ease: [0.16, 1, 0.3, 1] }}
                className="font-light leading-none text-d88-white"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(4rem, 9vw, 8.5rem)" }}>
                Now Arrive.
              </motion.h1>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-4">
              <Link href="/delorean88/shop"
                className="inline-flex items-center gap-3 px-8 py-4 bg-d88-pink text-black text-[0.7rem] tracking-[0.18em] uppercase font-semibold hover:bg-d88-pink-light transition-all duration-300"
                style={{ boxShadow: "0 0 30px rgba(255,105,180,0.4)" }}>
                Shop the Drop
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link href="/delorean88/about"
                className="inline-flex items-center gap-3 px-8 py-4 border border-d88-pink/30 text-d88-white text-[0.7rem] tracking-[0.18em] uppercase hover:border-d88-pink hover:text-d88-pink transition-all duration-300">
                Our Story
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <p className="text-[8px] tracking-[0.32em] uppercase text-d88-gray/40">Scroll</p>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10" style={{ background: "linear-gradient(to bottom, #FF69B4, transparent)" }} />
        </motion.div>
      </section>

      {/* ─── BUY · SELL · TRADE ─── */}
      <section className="bg-d88-surface border-y border-d88-pink/15">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-d88-pink/15">
            {[
              { action: "Buy", icon: "◈", desc: "Hand-selected vintage pieces sourced from the best eras. Every item inspected before it hits the drop." },
              { action: "Sell", icon: "◉", desc: "Got heat collecting dust? We help you move it to someone who'll actually wear it. Quick turnaround, real prices." },
              { action: "Trade", icon: "✦", desc: "Straight swap or value difference — trade your pieces for something that fits your current era." },
            ].map((p, i) => (
              <Reveal key={p.action} delay={i * 0.1} direction="up">
                <div className="p-10 md:p-12 group hover:bg-d88-card transition-colors duration-300">
                  <p className="text-3xl text-d88-pink mb-5" style={{ textShadow: "0 0 20px rgba(255,105,180,0.5)" }}>{p.icon}</p>
                  <h3 className="font-light text-d88-white mb-3 text-3xl group-hover:text-d88-pink transition-colors duration-300"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>
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
      <section className="py-10 px-6 md:px-10 lg:px-16 border-b border-d88-pink/15"
        style={{ background: "linear-gradient(90deg, #000 0%, #0d0005 50%, #000 100%)" }}>
        <div className="max-w-[1400px] mx-auto">
          <Reveal direction="none">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="font-light italic text-center md:text-left"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)", color: "rgba(255,255,255,0.45)" }}>
                From running away from clothes —
                <span className="text-white"> to taking the risk to embrace them.</span>
              </p>
              <div className="hidden md:block w-px h-14 bg-d88-pink/15" />
              <p className="text-sm text-d88-gray leading-relaxed max-w-sm text-center md:text-right">
                DeLorean 88 is for the ones done hiding. Bold pieces for bold people.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── LATEST DROP — Y2K GRID ─── */}
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
              <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="font-light text-d88-white"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-d88-pink/10">
            {y2kDrops.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.08} direction="up">
                <Link href="/delorean88/shop" className="group block bg-d88-bg hover:bg-d88-surface transition-colors duration-300">
                  {/* Visual card */}
                  <div className={`relative overflow-hidden aspect-[4/5] bg-gradient-to-br ${item.bg}`}>
                    {/* Neon glow radial */}
                    <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-150"
                      style={{ background: `radial-gradient(ellipse at 50% 45%, ${item.glow}22 0%, transparent 65%)` }} />
                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-[0.06]"
                      style={{
                        backgroundImage: `linear-gradient(${item.glow}80 1px, transparent 1px), linear-gradient(90deg, ${item.glow}80 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                      }} />
                    {/* SVG illustration */}
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      {item.visual === "shoe" ? (
                        <SneakerSVG color={item.accentColor} className="w-full max-w-[220px] drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]" />
                      ) : (
                        <ClothingSVG color={item.accentColor} className="w-full max-w-[160px] drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]" />
                      )}
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)" }}>
                      <span className="text-[0.6rem] tracking-[0.18em] uppercase flex items-center gap-2" style={{ color: item.accentColor }}>
                        View Piece →
                      </span>
                    </div>
                    {/* Tag */}
                    {item.tag && (
                      <div className="absolute top-4 left-4">
                        <span className="text-[0.5rem] tracking-[0.18em] uppercase bg-black/90 border px-2.5 py-1"
                          style={{ color: item.accentColor, borderColor: `${item.accentColor}40` }}>
                          {item.tag}
                        </span>
                      </div>
                    )}
                    {/* Glow line at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-px opacity-40"
                      style={{ background: `linear-gradient(90deg, transparent, ${item.glow}, transparent)` }} />
                  </div>
                  {/* Info */}
                  <div className="px-5 py-4 bg-d88-surface border-t border-d88-pink/8">
                    <p className="text-[0.5rem] tracking-[0.16em] uppercase mb-1" style={{ color: `${item.accentColor}80` }}>{item.era}</p>
                    <div className="flex items-center justify-between">
                      <h3 className="font-light text-d88-white group-hover:text-d88-pink transition-colors duration-300 leading-tight"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>
                        {item.name}
                      </h3>
                      <p className="font-light text-d88-pink" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
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
              <Link href="/delorean88/shop"
                className="inline-flex items-center gap-3 px-8 py-4 border border-d88-white/12 text-d88-white text-[0.7rem] tracking-[0.18em] uppercase hover:border-d88-pink hover:text-d88-pink transition-all duration-300">
                View All Vintage Pieces
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── THE RISK + DELOREAN CALLOUT ─── */}
      <section className="py-24 md:py-36 px-6 md:px-10 lg:px-16 bg-d88-surface border-t border-d88-pink/15">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* DeLorean illustration panel */}
          <Reveal direction="left">
            <div className="relative aspect-[4/3] border border-d88-pink/15 overflow-hidden">
              <div className="absolute inset-0 bg-d88-card" />
              {/* Y2K glow background */}
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 60%, rgba(255,105,180,0.1) 0%, rgba(0,191,255,0.05) 50%, transparent 75%)" }} />
              {/* Grid */}
              <div className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,105,180,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,105,180,1) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }} />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <DeLoreanSVG className="w-full drop-shadow-[0_0_25px_rgba(255,105,180,0.35)]" />
              </div>
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-d88-pink/35" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-d88-pink/35" />
              <div className="absolute bottom-5 left-5 bg-d88-bg/90 px-3 py-2">
                <span className="text-[8px] tracking-[0.22em] uppercase text-d88-pink">DMC-12 · The Risk Was the Point</span>
              </div>
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
              className="font-light leading-tight italic mb-10"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#FF69B4", textShadow: "0 0 30px rgba(255,105,180,0.4)" }}>
              Always Was.
            </motion.h2>
            <Reveal delay={0.35}>
              <div className="space-y-5 text-sm text-d88-gray leading-loose mb-8">
                <p>The DeLorean car was stainless steel, gull-wing doors, and an entire industry that said it couldn&apos;t be done. It was built to be remembered — and it is. That&apos;s the energy behind every piece we source.</p>
                <p>Vintage fashion isn&apos;t about the past. It&apos;s about choosing something real over something manufactured. Something with a story over something with a season.</p>
              </div>
              <blockquote className="font-light italic text-d88-white border-l-2 border-d88-pink pl-5 mb-10 text-xl leading-snug"
                style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: "0 0 20px rgba(255,105,180,0.2)" }}>
                &ldquo;Wear your story. Own your era.&rdquo;
              </blockquote>
              <Link href="/delorean88/about"
                className="inline-flex items-center gap-3 px-8 py-4 border border-d88-pink text-d88-pink text-[0.7rem] tracking-[0.18em] uppercase hover:bg-d88-pink hover:text-black transition-all duration-300"
                style={{ boxShadow: "0 0 20px rgba(255,105,180,0.15)" }}>
                Read the Full Story
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── QUOTE ─── */}
      <section className="py-20 md:py-24 px-6 md:px-10 lg:px-16 border-y border-d88-pink/15"
        style={{ background: "linear-gradient(135deg, #000 0%, #0d0008 50%, #000 100%)" }}>
        <div className="max-w-[1400px] mx-auto text-center">
          <Reveal direction="none">
            <p className="text-[0.58rem] tracking-[0.3em] uppercase text-d88-pink mb-6">The Philosophy</p>
            <blockquote className="font-light italic text-d88-white leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}>
              &ldquo;The DeLorean wasn&apos;t built for the cautious. Neither is this collection. Every piece survived — decades, owners, eras. The only question is whether you&apos;re bold enough to give it the next chapter.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="h-px w-14" style={{ background: "linear-gradient(to right, transparent, #FF69B4)" }} />
              <span className="text-[0.58rem] tracking-[0.26em] uppercase text-d88-pink/60">DeLorean 88 Vintage</span>
              <div className="h-px w-14" style={{ background: "linear-gradient(to left, transparent, #FF69B4)" }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-0 bg-d88-bg">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[460px] border-t border-d88-pink/15">
          <div className="py-20 md:py-28 px-6 md:px-10 lg:px-16 flex flex-col justify-center bg-d88-surface">
            <Reveal>
              <p className="flex items-center gap-3 mb-6 text-[0.6rem] tracking-[0.28em] uppercase text-d88-pink">
                <span className="block w-6 h-px bg-d88-pink" />
                The Collection Is Live
              </p>
              <h2 className="font-light text-d88-white leading-tight mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                Stop Running.<br />
                Start <em className="text-d88-pink" style={{ textShadow: "0 0 30px rgba(255,105,180,0.4)" }}>Wearing.</em>
              </h2>
              <p className="text-sm text-d88-gray leading-loose mb-8 max-w-md">
                Bold, one-of-one pieces waiting for the right person to claim them. No fast fashion. No filler.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/delorean88/shop"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-d88-pink text-black text-[0.7rem] tracking-[0.18em] uppercase font-semibold hover:bg-d88-pink-light transition-all duration-300"
                  style={{ boxShadow: "0 0 30px rgba(255,105,180,0.35)" }}>
                  Shop the Drop
                </Link>
                <Link href="/delorean88/about"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-d88-white/12 text-d88-white text-[0.7rem] tracking-[0.18em] uppercase hover:border-d88-pink/40 hover:text-d88-pink transition-all duration-300">
                  Our Story
                </Link>
              </div>
            </Reveal>
          </div>
          {/* Visual — pink glow + 88 */}
          <div className="relative min-h-[280px] flex items-center justify-center overflow-hidden bg-d88-bg border-l border-d88-pink/12">
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,105,180,0.08) 0%, transparent 65%)" }} />
            <div className="flex flex-col items-center gap-3" style={{ opacity: 0.1 }}>
              <p className="font-light italic text-d88-pink" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "7rem", lineHeight: 1 }}>88</p>
              <p className="text-[9px] tracking-[0.32em] uppercase text-d88-pink">DeLorean · Vintage</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

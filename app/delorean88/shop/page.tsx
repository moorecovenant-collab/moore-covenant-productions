"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Shoe silhouette SVG ─── */
function SneakerSVG({ color = "#FF69B4", className = "" }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 300 180" className={className} fill="none">
      <path d="M20 140 Q150 155 280 140 L285 155 Q150 175 15 155 Z" fill="#222" />
      <path d="M22 130 Q150 145 278 132 L280 140 Q150 155 20 140 Z" fill={color} opacity="0.8" />
      <path d="M40 130 L50 80 L120 55 L220 65 L270 100 L278 130 Z" fill="#f0f0f0" />
      <path d="M55 110 Q120 70 235 95" stroke={color} strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.9" />
      <path d="M40 130 L50 80 L80 75 L70 125 Z" fill="#e0e0e0" />
      {[85, 105, 125, 145, 165].map((x, i) => (
        <line key={i} x1={x} y1={68 + i * 4} x2={x + 60} y2={70 + i * 4} stroke="#ccc" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      ))}
      <path d="M250 80 L265 60 L270 62 L255 82 Z" fill={color} opacity="0.7" />
      <ellipse cx="155" cy="165" rx="120" ry="6" fill="black" opacity="0.3" />
    </svg>
  );
}

/* ─── Clothing hanger SVG ─── */
function ClothingSVG({ color = "#FF69B4", className = "" }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 220 260" className={className} fill="none">
      <circle cx="110" cy="15" r="6" fill="#888" />
      <path d="M110 21 L110 40 Q110 50 50 80 L170 80 Q110 50 110 40" stroke="#888" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M50 80 L30 110 L55 120 L60 100 L60 230 L160 230 L160 100 L165 120 L190 110 L170 80 Z" fill={color} opacity="0.85" />
      <path d="M85 80 Q110 100 135 80" stroke="white" strokeWidth="3" fill="none" opacity="0.5" />
      <rect x="75" y="130" width="35" height="28" rx="3" fill="white" opacity="0.15" />
      <line x1="55" y1="120" x2="60" y2="100" stroke="white" strokeWidth="1.5" opacity="0.3" />
      <line x1="165" y1="120" x2="160" y2="100" stroke="white" strokeWidth="1.5" opacity="0.3" />
    </svg>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const categories = ["All", "Jackets", "Tops", "Bottoms", "Outerwear", "Accessories"];

const products = [
  { id: 1,  name: "Archive Varsity Jacket",   era: "1980s · Americana",      price: "$148", category: "Jackets",     tag: "Just Dropped", visual: "jacket", bg: "from-[#1a0030] via-[#2d0050] to-[#0d0020]", glow: "#BF00FF",  accent: "#DA70FF" },
  { id: 2,  name: "Washed Denim Trench",       era: "1990s · Workwear",       price: "$124", category: "Outerwear",   tag: "1 Left",       visual: "jacket", bg: "from-[#001a30] via-[#003366] to-[#000d1a]", glow: "#00BFFF",  accent: "#60D0FF" },
  { id: 3,  name: "Suede Western Shirt",       era: "1970s · Western",        price: "$96",  category: "Tops",        tag: "New",          visual: "jacket", bg: "from-[#1a3000] via-[#2d5000] to-[#0d1800]", glow: "#7FFF00",  accent: "#A0F040" },
  { id: 4,  name: "Corduroy Field Jacket",     era: "1980s · Military",       price: "$112", category: "Outerwear",   tag: "",             visual: "jacket", bg: "from-[#1a1000] via-[#332000] to-[#0d0800]", glow: "#FFA500",  accent: "#FFB84D" },
  { id: 5,  name: "Silk Band Collar Shirt",    era: "1990s · Minimal",        price: "$78",  category: "Tops",        tag: "New",          visual: "jacket", bg: "from-[#001818] via-[#003333] to-[#000d0d]", glow: "#00FFCC",  accent: "#40FFD8" },
  { id: 6,  name: "Wide Leg Denim",            era: "1990s · Streetwear",     price: "$98",  category: "Bottoms",     tag: "",             visual: "jacket", bg: "from-[#180018] via-[#300030] to-[#0d000d]", glow: "#FF00FF",  accent: "#FF69FF" },
  { id: 7,  name: "Leather Blazer",            era: "1980s · Glam",           price: "$195", category: "Jackets",     tag: "Rare",         visual: "jacket", bg: "from-[#1a0030] via-[#2d0050] to-[#0d0020]", glow: "#BF00FF",  accent: "#DA70FF" },
  { id: 8,  name: "Knit Polo Sweater",         era: "1970s · Preppy",         price: "$85",  category: "Tops",        tag: "",             visual: "jacket", bg: "from-[#300010] via-[#500020] to-[#1a0008]", glow: "#FF3DA0",  accent: "#FF69B4" },
  { id: 9,  name: "Gabardine Trousers",        era: "1980s · Power Dressing", price: "$108", category: "Bottoms",     tag: "Just Dropped", visual: "jacket", bg: "from-[#001a30] via-[#003366] to-[#000d1a]", glow: "#00BFFF",  accent: "#60D0FF" },
  { id: 10, name: "Chunky Platform Sneaker",   era: "Y2K · 2000s",            price: "$112", category: "Accessories", tag: "1 Left",       visual: "shoe",   bg: "from-[#1a3000] via-[#2d5000] to-[#0d1800]", glow: "#7FFF00",  accent: "#A0F040" },
  { id: 11, name: "Oversized Coach Jacket",    era: "1990s · Sport",          price: "$132", category: "Outerwear",   tag: "New",          visual: "jacket", bg: "from-[#001818] via-[#003333] to-[#000d0d]", glow: "#00FFCC",  accent: "#40FFD8" },
  { id: 12, name: "Air Sole Trainer",          era: "1990s · Sport",          price: "$138", category: "Accessories", tag: "Rare",         visual: "shoe",   bg: "from-[#300010] via-[#500020] to-[#1a0008]", glow: "#FF3DA0",  accent: "#FF69B4" },
];

const tagColors: Record<string, { text: string; border: string }> = {
  "Just Dropped": { text: "#FF69B4", border: "rgba(255,105,180,0.3)" },
  "1 Left":       { text: "#FF6060", border: "rgba(255,96,96,0.3)" },
  "New":          { text: "#A0F040", border: "rgba(160,240,64,0.3)" },
  "Rare":         { text: "#DA70FF", border: "rgba(218,112,255,0.3)" },
};

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const filtered = products.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return parseInt(a.price.slice(1)) - parseInt(b.price.slice(1));
    if (sortBy === "price-high") return parseInt(b.price.slice(1)) - parseInt(a.price.slice(1));
    return 0;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 bg-d88-bg">

      {/* Header */}
      <div className="px-6 md:px-10 lg:px-16 py-14 md:py-20 border-b border-d88-pink/10 bg-d88-surface">
        <div className="max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <p className="flex items-center gap-3 mb-5 text-[0.6rem] tracking-[0.28em] uppercase text-d88-pink">
              <span className="block w-6 h-px bg-d88-pink" />
              The Vault
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h1 className="font-light text-d88-white leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
                The Collection.<br />
                <em className="text-d88-pink" style={{ textShadow: "0 0 40px rgba(255,105,180,0.4)" }}>Every Era.</em>
              </h1>
              <p className="text-sm text-d88-gray leading-relaxed max-w-sm">
                Sourced carefully. Each piece is one of one. When it&apos;s gone, it&apos;s gone — and that&apos;s the point.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 py-6 border-b border-d88-pink/10">
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-[0.6rem] tracking-[0.14em] uppercase border transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-d88-pink text-d88-bg border-d88-pink"
                      : "bg-transparent text-d88-gray border-d88-pink/15 hover:text-d88-white hover:border-d88-pink/30"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[0.58rem] tracking-[0.18em] uppercase text-d88-gray/40">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border border-d88-pink/15 text-d88-gray text-[0.6rem] tracking-[0.12em] px-3 py-1.5 outline-none cursor-pointer"
            >
              <option value="newest"     style={{ backgroundColor: "#0A0A0A" }}>Newest First</option>
              <option value="price-low"  style={{ backgroundColor: "#0A0A0A" }}>Price: Low → High</option>
              <option value="price-high" style={{ backgroundColor: "#0A0A0A" }}>Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Count */}
        <div className="py-5">
          <p className="text-[0.6rem] tracking-[0.18em] uppercase text-d88-gray/40">
            {sorted.length} piece{sorted.length !== 1 ? "s" : ""} available
          </p>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-d88-pink/10"
          >
            {sorted.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.04}>
                <div className="group bg-d88-bg">
                  {/* Image / visual */}
                  <div className={`relative overflow-hidden aspect-[3/4] bg-gradient-to-br ${item.bg} cursor-pointer`}>
                    {/* Neon glow radial */}
                    <div className="absolute inset-0"
                      style={{ background: `radial-gradient(ellipse at 50% 45%, ${item.glow}22 0%, transparent 65%)` }} />
                    {/* Grid overlay */}
                    <div className="absolute inset-0 opacity-[0.05]"
                      style={{
                        backgroundImage: `linear-gradient(${item.glow}80 1px, transparent 1px), linear-gradient(90deg, ${item.glow}80 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                      }} />
                    {/* SVG illustration */}
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      {item.visual === "shoe" ? (
                        <SneakerSVG color={item.accent} className="w-full max-w-[200px] drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
                      ) : (
                        <ClothingSVG color={item.accent} className="w-full max-w-[130px] drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
                      )}
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)" }}>
                      <button className="w-full py-2.5 text-[0.55rem] tracking-[0.18em] uppercase font-medium cursor-pointer transition-colors duration-200"
                        style={{ backgroundColor: item.accent, color: "#000" }}>
                        View Piece
                      </button>
                    </div>
                    {/* Tag */}
                    {item.tag && (
                      <div className="absolute top-3 left-3">
                        <span className="text-[7px] tracking-[0.16em] uppercase bg-d88-bg/92 border px-2 py-0.5"
                          style={{ color: tagColors[item.tag]?.text, borderColor: tagColors[item.tag]?.border }}>
                          {item.tag}
                        </span>
                      </div>
                    )}
                    {/* Glow line at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-px opacity-30"
                      style={{ background: `linear-gradient(90deg, transparent, ${item.glow}, transparent)` }} />
                  </div>
                  {/* Info */}
                  <div className="px-3.5 py-4 bg-d88-surface">
                    <p className="text-[0.5rem] tracking-[0.16em] uppercase mb-1" style={{ color: `${item.accent}70` }}>{item.era}</p>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-light text-d88-white group-hover:text-d88-pink transition-colors duration-300 flex-1 leading-tight"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}>
                        {item.name}
                      </h3>
                      <p className="font-light shrink-0"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: item.accent }}>
                        {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </motion.div>
        </AnimatePresence>

        {sorted.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-[0.6rem] tracking-[0.2em] uppercase text-d88-gray/40">Nothing here right now. Check back soon.</p>
          </div>
        )}

        {sorted.length > 0 && (
          <Reveal delay={0.2}>
            <div className="text-center mt-12 pb-4">
              <button className="inline-flex items-center gap-3 px-8 py-4 border border-d88-white/10 text-d88-gray text-[0.7rem] tracking-[0.18em] uppercase cursor-pointer hover:border-d88-pink/30 hover:text-d88-pink transition-all duration-300 bg-transparent">
                Load More Pieces
              </button>
            </div>
          </Reveal>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="mt-20 mx-6 md:mx-10 max-w-[1400px] lg:mx-auto p-10 md:p-14 border border-d88-pink/12 bg-d88-surface">
        <Reveal>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-[0.6rem] tracking-[0.26em] uppercase text-d88-pink mb-3">Can&apos;t find what you&apos;re looking for?</p>
              <h3 className="font-light text-d88-white"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem" }}>
                New drops hit every week.<br />
                <em className="text-d88-pink" style={{ textShadow: "0 0 25px rgba(255,105,180,0.4)" }}>Follow the chase.</em>
              </h3>
            </div>
            <a
              href="https://instagram.com/delorean88vintage"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-d88-pink text-d88-bg text-[0.7rem] tracking-[0.18em] uppercase font-medium hover:bg-d88-pink-light transition-colors duration-300"
              style={{ boxShadow: "0 0 25px rgba(255,105,180,0.3)" }}
            >
              Follow on Instagram
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

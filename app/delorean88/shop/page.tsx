"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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

const tagColors: Record<string, string> = {
  "Just Dropped": "text-d88-pink border-d88-pink/30",
  "1 Left":       "text-red-400 border-red-400/30",
  "New":          "text-green-400 border-green-400/30",
  "Rare":         "text-purple-400 border-purple-400/30",
};

const products = [
  { id: 1,  name: "Archive Varsity Jacket",   era: "1980s · Americana",      price: "$148", category: "Jackets",     tag: "Just Dropped", gradient: "from-[#1a1410] to-[#0d0a06]" },
  { id: 2,  name: "Washed Denim Trench",       era: "1990s · Workwear",       price: "$124", category: "Outerwear",   tag: "1 Left",       gradient: "from-[#0e1218] to-[#080c14]" },
  { id: 3,  name: "Suede Western Shirt",       era: "1970s · Western",        price: "$96",  category: "Tops",        tag: "New",          gradient: "from-[#180e08] to-[#100a05]" },
  { id: 4,  name: "Corduroy Field Jacket",     era: "1980s · Military",       price: "$112", category: "Outerwear",   tag: "",             gradient: "from-[#111508] to-[#0d1005]" },
  { id: 5,  name: "Silk Band Collar Shirt",    era: "1990s · Minimal",        price: "$78",  category: "Tops",        tag: "New",          gradient: "from-[#181510] to-[#100d08]" },
  { id: 6,  name: "Wide Leg Denim",            era: "1990s · Streetwear",     price: "$98",  category: "Bottoms",     tag: "",             gradient: "from-[#0c1018] to-[#080c12]" },
  { id: 7,  name: "Leather Blazer",            era: "1980s · Glam",           price: "$195", category: "Jackets",     tag: "Rare",         gradient: "from-[#1a1008] to-[#120a05]" },
  { id: 8,  name: "Knit Polo Sweater",         era: "1970s · Preppy",         price: "$85",  category: "Tops",        tag: "",             gradient: "from-[#141010] to-[#0d0808]" },
  { id: 9,  name: "Gabardine Trousers",        era: "1980s · Power Dressing", price: "$108", category: "Bottoms",     tag: "Just Dropped", gradient: "from-[#101414] to-[#0a0e0e]" },
  { id: 10, name: "Canvas Bucket Hat",         era: "1990s · Hip-Hop",        price: "$45",  category: "Accessories", tag: "",             gradient: "from-[#141210] to-[#0e0c08]" },
  { id: 11, name: "Oversized Coach Jacket",    era: "1990s · Sport",          price: "$132", category: "Outerwear",   tag: "New",          gradient: "from-[#0c1410] to-[#080e0a]" },
  { id: 12, name: "Beaded Chain Belt",         era: "1980s · Statement",      price: "$55",  category: "Accessories", tag: "1 Left",       gradient: "from-[#181510] to-[#100e08]" },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const filtered = products.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

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
                <em className="text-d88-pink">Every Era.</em>
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
            {filtered.length} piece{filtered.length !== 1 ? "s" : ""} available
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
            {filtered.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.04}>
                <div className="group bg-d88-bg">
                  {/* Image */}
                  <div className={`relative overflow-hidden aspect-[3/4] bg-gradient-to-br ${item.gradient} cursor-pointer`}>
                    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(240,168,200,0.05) 0%, transparent 55%)" }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ opacity: 0.08 }}>
                        <rect x="2" y="4" width="24" height="20" rx="2" stroke="#F0A8C8" strokeWidth="0.8" />
                        <circle cx="9" cy="10" r="2" stroke="#F0A8C8" strokeWidth="0.8" />
                        <path d="M2 18l6-5 4 3.5 4-3 8 4.5" stroke="#F0A8C8" strokeWidth="0.8" strokeLinejoin="round" />
                      </svg>
                      <p className="text-[7px] tracking-[0.16em] uppercase text-d88-pink/20 mt-2">Product Photo</p>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)" }}>
                      <button className="w-full py-2.5 bg-d88-pink text-d88-bg text-[0.55rem] tracking-[0.18em] uppercase font-medium cursor-pointer hover:bg-d88-pink-light transition-colors duration-200">
                        View Piece
                      </button>
                    </div>
                    {/* Tag */}
                    {item.tag && (
                      <div className="absolute top-3 left-3">
                        <span className={`text-[7px] tracking-[0.16em] uppercase bg-d88-bg/92 border px-2 py-0.5 ${tagColors[item.tag] || "text-d88-pink border-d88-pink/30"}`}>
                          {item.tag}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="px-3.5 py-4 bg-d88-surface">
                    <p className="text-[0.5rem] tracking-[0.16em] uppercase text-d88-pink/55 mb-1">{item.era}</p>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-light text-d88-white group-hover:text-d88-pink-light transition-colors duration-300 flex-1 leading-tight"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}>
                        {item.name}
                      </h3>
                      <p className="font-light text-d88-pink-light shrink-0"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-[0.6rem] tracking-[0.2em] uppercase text-d88-gray/40">Nothing here right now. Check back soon.</p>
          </div>
        )}

        {filtered.length > 0 && (
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
                <em className="text-d88-pink">Follow the chase.</em>
              </h3>
            </div>
            <a
              href="https://instagram.com/delorean88vintage"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-d88-pink text-d88-bg text-[0.7rem] tracking-[0.18em] uppercase font-medium hover:bg-d88-pink-light transition-colors duration-300"
            >
              Follow on Instagram
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

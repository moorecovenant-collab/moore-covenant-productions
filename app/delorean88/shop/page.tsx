"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const COGNAC = "#C4956A";
const COGNAC_LIGHT = "#DEB08A";
const CREAM = "#F0E8DC";
const MUTED = "#7a736a";
const BORDER = "rgba(196,149,106,0.15)";
const BG = "#080807";
const SURFACE = "#0E0D0B";

function Reveal({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up" | "none" }) {
  const init = direction === "up" ? { opacity: 0, y: 28 } : { opacity: 0 };
  return (
    <motion.div
      initial={init}
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
  { id: 1, name: "Archive Varsity Jacket", era: "1980s · Americana", price: "$148", category: "Jackets", tag: "Just Dropped", gradient: "linear-gradient(145deg, #1a1410 0%, #120d08 100%)" },
  { id: 2, name: "Washed Denim Trench", era: "1990s · Workwear", price: "$124", category: "Outerwear", tag: "1 Left", gradient: "linear-gradient(145deg, #0e1218 0%, #080c14 100%)" },
  { id: 3, name: "Suede Western Shirt", era: "1970s · Western", price: "$96", category: "Tops", tag: "New", gradient: "linear-gradient(145deg, #180e08 0%, #100a05 100%)" },
  { id: 4, name: "Corduroy Field Jacket", era: "1980s · Military", price: "$112", category: "Outerwear", tag: "", gradient: "linear-gradient(145deg, #111508 0%, #0d1005 100%)" },
  { id: 5, name: "Silk Band Collar Shirt", era: "1990s · Minimal", price: "$78", category: "Tops", tag: "New", gradient: "linear-gradient(145deg, #181510 0%, #100d08 100%)" },
  { id: 6, name: "Wide Leg Denim", era: "1990s · Streetwear", price: "$98", category: "Bottoms", tag: "", gradient: "linear-gradient(145deg, #0c1018 0%, #080c12 100%)" },
  { id: 7, name: "Leather Blazer", era: "1980s · Glam", price: "$195", category: "Jackets", tag: "Rare", gradient: "linear-gradient(145deg, #1a1008 0%, #120a05 100%)" },
  { id: 8, name: "Knit Polo Sweater", era: "1970s · Preppy", price: "$85", category: "Tops", tag: "", gradient: "linear-gradient(145deg, #141010 0%, #0d0808 100%)" },
  { id: 9, name: "Gabardine Trousers", era: "1980s · Power Dressing", price: "$108", category: "Bottoms", tag: "Just Dropped", gradient: "linear-gradient(145deg, #101414 0%, #0a0e0e 100%)" },
  { id: 10, name: "Canvas Bucket Hat", era: "1990s · Hip-Hop", price: "$45", category: "Accessories", tag: "", gradient: "linear-gradient(145deg, #141210 0%, #0e0c08 100%)" },
  { id: 11, name: "Oversized Coach Jacket", era: "1990s · Sport", price: "$132", category: "Outerwear", tag: "New", gradient: "linear-gradient(145deg, #0c1410 0%, #080e0a 100%)" },
  { id: 12, name: "Beaded Chain Belt", era: "1980s · Statement", price: "$55", category: "Accessories", tag: "1 Left", gradient: "linear-gradient(145deg, #181510 0%, #100e08 100%)" },
];

const tagColors: Record<string, string> = {
  "Just Dropped": COGNAC,
  "1 Left": "#B8544A",
  "New": "#5A8050",
  "Rare": "#8B5AB8",
};

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const filtered = products.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ backgroundColor: BG }}>

      {/* Page Header */}
      <div
        className="px-6 md:px-10 lg:px-16 py-14 md:py-20"
        style={{ borderBottom: `1px solid ${BORDER}`, backgroundColor: SURFACE }}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="flex items-center gap-3 mb-5" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: COGNAC }}>
              <span className="block w-6 h-px" style={{ background: COGNAC }} />
              The Vault
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h1
                className="font-light leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", color: CREAM }}
              >
                The Collection.<br />
                <em style={{ color: COGNAC }}>Every Era.</em>
              </h1>
              <p className="text-sm leading-relaxed max-w-sm" style={{ color: MUTED }}>
                Sourced carefully. Each piece is one of one. When it&apos;s gone, it&apos;s gone — and that&apos;s the point.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Filters */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 py-6"
          style={{ borderBottom: `1px solid ${BORDER}` }}
        >
          {/* Category tabs */}
          <div className="flex items-center gap-1 flex-wrap">
            {categories.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="transition-all duration-200"
                  style={{
                    padding: "0.45rem 0.875rem",
                    fontSize: "0.6rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: active ? BG : MUTED,
                    backgroundColor: active ? COGNAC : "transparent",
                    border: `1px solid ${active ? COGNAC : BORDER}`,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = CREAM; }}
                  onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = MUTED; }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span style={{ fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#4a4540" }}>
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="outline-none text-xs"
              style={{
                backgroundColor: "transparent",
                border: `1px solid ${BORDER}`,
                color: MUTED,
                padding: "0.4rem 0.75rem",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                cursor: "pointer",
              }}
            >
              <option value="newest" style={{ backgroundColor: "#0E0D0B" }}>Newest First</option>
              <option value="price-low" style={{ backgroundColor: "#0E0D0B" }}>Price: Low to High</option>
              <option value="price-high" style={{ backgroundColor: "#0E0D0B" }}>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Count */}
        <div className="py-5">
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#4a4540" }}>
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
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px"
            style={{ backgroundColor: BORDER }}
          >
            {filtered.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.04} direction="up">
                <div className="group" style={{ backgroundColor: BG }}>
                  {/* Image area */}
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "3/4", background: item.gradient, cursor: "pointer" }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{ background: `radial-gradient(ellipse at 50% 30%, rgba(196,149,106,0.06) 0%, transparent 60%)` }}
                    />
                    {/* Placeholder */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ opacity: 0.1 }}>
                        <rect x="2" y="4" width="24" height="20" rx="2" stroke={COGNAC} strokeWidth="0.8" />
                        <circle cx="9" cy="10" r="2" stroke={COGNAC} strokeWidth="0.8" />
                        <path d="M2 18l6-5 4 3.5 4-3 8 4.5" stroke={COGNAC} strokeWidth="0.8" strokeLinejoin="round" />
                      </svg>
                      <p style={{ fontSize: "7px", letterSpacing: "0.16em", textTransform: "uppercase", color: `${COGNAC}25`, marginTop: "8px" }}>
                        Product Photo
                      </p>
                    </div>
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4"
                      style={{ background: `linear-gradient(to top, rgba(8,8,7,0.9) 0%, transparent 50%)` }}
                    >
                      <button
                        className="w-full py-2.5 transition-all duration-300"
                        style={{
                          backgroundColor: COGNAC,
                          color: BG,
                          fontSize: "0.55rem",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        View Piece
                      </button>
                    </div>
                    {/* Tag */}
                    {item.tag && (
                      <div className="absolute top-3 left-3">
                        <span style={{
                          fontSize: "7px",
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: tagColors[item.tag] || COGNAC,
                          backgroundColor: "rgba(8,8,7,0.92)",
                          padding: "3px 8px",
                          border: `1px solid ${tagColors[item.tag] || COGNAC}40`,
                        }}>
                          {item.tag}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="px-4 py-4" style={{ backgroundColor: SURFACE }}>
                    <p style={{ fontSize: "0.5rem", letterSpacing: "0.16em", textTransform: "uppercase", color: `${COGNAC}60`, marginBottom: "0.3rem" }}>
                      {item.era}
                    </p>
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className="font-light leading-tight transition-colors duration-300 group-hover:text-[#DEB08A] flex-1"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: CREAM }}
                      >
                        {item.name}
                      </h3>
                      <p
                        className="font-light shrink-0"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: COGNAC_LIGHT }}
                      >
                        {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a4540" }}>
              No pieces in this category right now. Check back soon.
            </p>
          </div>
        )}

        {/* Load more */}
        {filtered.length > 0 && (
          <Reveal delay={0.2}>
            <div className="text-center mt-12 pb-4">
              <button
                className="inline-flex items-center gap-3 transition-all duration-300"
                style={{ padding: "1rem 2.5rem", border: "1px solid rgba(240,232,220,0.12)", color: MUTED, fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer", backgroundColor: "transparent" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = `${COGNAC}40`; el.style.color = COGNAC; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = "rgba(240,232,220,0.12)"; el.style.color = MUTED; }}
              >
                Load More Pieces
              </button>
            </div>
          </Reveal>
        )}
      </div>

      {/* Bottom CTA */}
      <div
        className="mt-20 mx-6 md:mx-10 lg:mx-16 p-10 md:p-14 max-w-[1400px] md:mx-auto"
        style={{ border: `1px solid ${BORDER}`, backgroundColor: SURFACE }}
      >
        <Reveal direction="none">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.26em", textTransform: "uppercase", color: COGNAC, marginBottom: "0.875rem" }}>
                Can&apos;t find what you&apos;re looking for?
              </p>
              <h3
                className="font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: CREAM }}
              >
                New drops hit every week.<br />
                <em style={{ color: COGNAC }}>Follow the chase.</em>
              </h3>
            </div>
            <a
              href="https://instagram.com/delorean88vintage"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-3 transition-all duration-300"
              style={{ padding: "1rem 2.5rem", border: `1px solid ${COGNAC}`, color: COGNAC, fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = COGNAC; el.style.color = BG; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = "transparent"; el.style.color = COGNAC; }}
            >
              <span>Follow on Instagram</span>
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedText from "@/components/ui/AnimatedText";

const categories = ["All", "Social Media", "Personal Brand"];

const projects = [
  {
    id: 1,
    title: "Dieu Trippin",
    category: "Social Media",
    type: "TikTok Creator · @dieu_tripin",
    year: "2023–2024",
    desc: "Managed full TikTok content strategy from the ground up. Built a fiercely loyal community through viral-engineered video — multiple videos hit 17M+ views.",
    stats: [
      { value: "249K", label: "Followers" },
      { value: "60M+", label: "Views" },
      { value: "22.6M", label: "Likes" },
    ],
    tags: ["TikTok", "Content Strategy", "Growth"],
    color: "#0e1208",
  },
  {
    id: 2,
    title: "Hair Academy MD",
    category: "Social Media",
    type: "Beauty Education · @hairacademy_md",
    year: "2022–2023",
    desc: "Managed social media for the main academy and 5 sister schools. Promoted enrollment events and grew from 2,250 → 14,300 followers across all campuses in under 18 months.",
    stats: [
      { value: "+535%", label: "Growth" },
      { value: "14.3K", label: "Followers" },
    ],
    tags: ["Instagram", "Social Management", "Education"],
    color: "#0e0c18",
  },
  {
    id: 3,
    title: "Utrophia Robinson",
    category: "Personal Brand",
    type: "Superior Court Campaign · @trophy4clayton",
    year: "2023",
    desc: "Built community trust and digital visibility for a Superior Court campaign. Message-driven content increased engagement and established a credible online presence during the critical voting window.",
    stats: [
      { value: "+36%", label: "Growth" },
      { value: "+125", label: "Followers" },
    ],
    tags: ["Facebook", "Instagram", "Political Campaign"],
    color: "#12100e",
  },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative pt-40 md:pt-52 pb-20 md:pb-28 px-6 md:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 20%, rgba(196,151,74,0.05) 0%, transparent 60%)" }} />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="section-label mb-6 flex items-center gap-3"
          >
            <span className="block w-6 h-px bg-gold" />
            Client Results
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-display-xl font-light text-cream leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              The Proof is in the{" "}
              <em className="italic text-gold">Growth.</em>
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="text-text-secondary text-base leading-loose max-w-xl mt-6"
          >
            Real clients. Real numbers. Real results — across politics, beauty, ministry, and entertainment.
          </motion.p>
        </div>
      </section>

      {/* ─── FILTER ─── */}
      <section className="px-6 md:px-10 lg:px-16 pb-10">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 text-xs tracking-widest uppercase transition-all duration-300 border ${
                    activeCategory === cat
                      ? "border-gold text-gold"
                      : "border-border/60 text-text-secondary hover:border-text-secondary hover:text-cream"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── RESULTS GRID ─── */}
      <section className="px-6 md:px-10 lg:px-16 pb-24 md:pb-36">
        <div className="max-w-[1400px] mx-auto">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/40">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group bg-dark hover:bg-gold/5 transition-colors duration-400"
                >
                  {/* Visual placeholder */}
                  <div
                    className="relative h-56 overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${project.color} 0%, #141414 100%)` }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)" }}
                    />
                    <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-gold/20 group-hover:border-gold/60 transition-colors duration-500" />
                    <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-gold/20 group-hover:border-gold/60 transition-colors duration-500" />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-[9px] tracking-[0.2em] uppercase text-gold/60 block mb-1">{project.type}</span>
                      <span className="text-[9px] tracking-[0.1em] text-text-muted">{project.year}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex divide-x divide-border/40 border-b border-border/40">
                    {project.stats.map((stat) => (
                      <div key={stat.label} className="flex-1 text-center py-4 px-2">
                        <p
                          className="font-display text-xl font-light text-gold leading-none"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {stat.value}
                        </p>
                        <p className="text-[9px] tracking-[0.14em] uppercase text-text-muted mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Info */}
                  <div className="p-6 md:p-7">
                    <h3
                      className="font-display text-2xl md:text-3xl font-light text-cream group-hover:text-gold transition-colors duration-300 mb-2"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed mb-4">{project.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[9px] tracking-widest uppercase text-text-muted border border-border/60 px-2 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ─── OVERALL STATS ─── */}
      <section className="py-20 md:py-28 px-6 md:px-10 lg:px-16 bg-dark border-y border-border/40">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border/40">
            {[
              { value: "60M+", label: "Total Views Generated" },
              { value: "50M+", label: "Total Likes Generated" },
              { value: "100K+", label: "Followers Grown" },
              { value: "1,000+", label: "High-Performing Videos" },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08} direction="up">
                <div className="bg-black text-center py-10 px-6">
                  <p
                    className="font-display text-4xl md:text-5xl font-light text-gold leading-none mb-3"
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

      {/* ─── CTA ─── */}
      <section className="py-32 md:py-44 px-6 md:px-10 lg:px-16 bg-black">
        <div className="max-w-[1400px] mx-auto text-center">
          <ScrollReveal>
            <p className="section-label justify-center mb-8 flex">
              <span className="block w-6 h-px bg-gold mr-3 mt-[6px]" />
              Your Story, Next
            </p>
            <h2
              className="font-display text-display-xl font-light text-cream leading-tight max-w-2xl mx-auto mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Ready to add your name{" "}
              <em className="italic text-gold">to the list?</em>
            </h2>
            <p className="text-text-secondary text-sm mb-8">Text or call us directly: <a href="tel:3013776958" className="text-gold hover:text-gold-light transition-colors">(301) 377-6958</a></p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                <span>Let&apos;s Talk</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="relative z-10">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

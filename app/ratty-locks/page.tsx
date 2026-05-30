"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const AMBER = "#C8860A";
const AMBER_LIGHT = "#E8A030";
const CREAM = "#EEE7D8";
const MUTED = "#7a7570";
const SURFACE = "#111110";
const BORDER = "rgba(200,134,10,0.15)";

function ScrollReveal({
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
  const initial =
    direction === "up" ? { opacity: 0, y: 32 } :
    direction === "left" ? { opacity: 0, x: -32 } :
    direction === "right" ? { opacity: 0, x: 32 } :
    { opacity: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const services = [
  {
    num: "01",
    title: "Départ Twist",
    sub: "Starter Locs",
    desc: "Installation de tes locks depuis zéro. Technique twist soignée pour un départ propre et durable.",
    duration: "3 – 5h",
    price: "À partir de 120€",
  },
  {
    num: "02",
    title: "Entretien & Retwist",
    sub: "Maintenance",
    desc: "Retwist complet, nettoyage en profondeur et soin des pointes pour garder tes locks au top.",
    duration: "2 – 3h",
    price: "À partir de 80€",
  },
  {
    num: "03",
    title: "Coiffure Créative",
    sub: "Locks Styling",
    desc: "Coiffures élaborées, designs gravés et mises en forme artistiques pour sortir du lot.",
    duration: "1 – 2h",
    price: "À partir de 60€",
  },
  {
    num: "04",
    title: "Réparation",
    sub: "Repair & Finish",
    desc: "Remise en forme des locks abîmées, jointure de locks cassées et finitions soignées.",
    duration: "1 – 3h",
    price: "À partir de 50€",
  },
  {
    num: "05",
    title: "Combo Complet",
    sub: "Full Session",
    desc: "Entretien complet + coiffure créative en une seule session — la totale.",
    duration: "3 – 4h",
    price: "À partir de 130€",
  },
  {
    num: "06",
    title: "Consultation",
    sub: "Conseil Perso",
    desc: "Analyse de ta texture, conseil sur l'entretien quotidien et bilan de l'état de tes locks.",
    duration: "30 min",
    price: "25€",
  },
];

const stats = [
  { value: "10+", label: "Ans d'Expérience" },
  { value: "7.3K", label: "Abonnés Instagram" },
  { value: "436", label: "Posts · Réalisations" },
  { value: "Paris", label: "Île-de-France" },
];

const pillars = [
  { icon: "✦", title: "Précision", desc: "Chaque lock est posée avec soin. Aucun détail n'est laissé au hasard." },
  { icon: "◈", title: "Expertise", desc: "10+ ans de pratique, des centaines de clients satisfaits." },
  { icon: "◉", title: "Authenticité", desc: "Un style unique qui reflète ta personnalité, pas un template." },
];

export default function RattyLocksPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <>
      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          {/* Gradient background — replace with real photo */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #0a0a08 0%, #1a1208 40%, #0f0c05 100%)",
            }}
          />
          {/* Subtle texture overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 70% 50%, rgba(200,134,10,0.07) 0%, transparent 60%)`,
            }}
          />
          {/* Dark fade bottom */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: "linear-gradient(to bottom, rgba(10,10,8,0.4) 0%, rgba(10,10,8,0.2) 40%, rgba(10,10,8,0.85) 85%, rgba(10,10,8,1) 100%)",
            }}
          />
        </motion.div>

        {/* Decorative lines */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.5, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[38%] left-0 h-px w-full origin-left"
            style={{ background: `linear-gradient(to right, transparent, rgba(200,134,10,0.18), transparent)` }}
          />
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 w-full max-w-[1300px] mx-auto px-6 md:px-10 lg:px-14 py-16 md:py-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="block w-8 h-px" style={{ background: AMBER }} />
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: AMBER }}>
              Spécialiste Locs · Villeneuve-Saint-Georges · Paris
            </span>
          </motion.div>

          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-light leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.5rem, 9vw, 8rem)", color: CREAM }}
            >
              Tes Locks.
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.88, ease: [0.16, 1, 0.3, 1] }}
              className="font-light leading-none italic"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.5rem, 9vw, 8rem)", color: AMBER }}
            >
              Ton Art.
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
              className="font-light leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.5rem, 9vw, 8rem)", color: CREAM }}
            >
              Ton Identité.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.25 }}
            className="text-sm md:text-base leading-loose mb-3 max-w-md"
            style={{ color: MUTED }}
          >
            Plus de 10 ans d&apos;expertise en pose et entretien de locks à Paris. Chaque client repart avec une identité affirmée.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-sm md:text-base italic mb-10 pl-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: `${AMBER}90`, borderLeft: `1px solid ${AMBER}50` }}
          >
            &ldquo;Chaque lock est une histoire. La tienne mérite d&apos;être bien racontée.&rdquo;
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.5 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Link
              href="/ratty-locks/booking"
              className="inline-flex items-center gap-3 transition-all duration-400 group"
              style={{
                padding: "1rem 2.5rem",
                border: `1px solid ${AMBER}`,
                color: AMBER,
                fontSize: "0.7rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span>Réserver Maintenant</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center gap-3 transition-all duration-300"
              style={{
                padding: "1rem 2.5rem",
                border: "1px solid rgba(238,231,216,0.18)",
                color: CREAM,
                fontSize: "0.7rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              <span>Voir les Services</span>
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
          <p style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#4a4540" }}>Défiler</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10"
            style={{ background: `linear-gradient(to bottom, ${AMBER}60, transparent)` }}
          />
        </motion.div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section style={{ backgroundColor: "#0D0D0B", borderTop: BORDER, borderBottom: BORDER, borderTopWidth: "1px", borderBottomWidth: "1px", borderStyle: "solid" }}>
        <div className="max-w-[1300px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderColor: BORDER }}>
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.08} direction="up">
                <div
                  className="text-center py-8 px-6"
                  style={{ borderRight: i < 3 ? BORDER : "none", borderRightWidth: "1px", borderRightStyle: "solid" }}
                >
                  <p
                    className="font-light leading-none mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: AMBER }}
                  >
                    {s.value}
                  </p>
                  <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#5a5550" }}>
                    {s.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PILLARS ─── */}
      <section className="py-20 md:py-28 px-6 md:px-10 lg:px-14" style={{ backgroundColor: "#080806" }}>
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: BORDER }}>
          {pillars.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.1} direction="up">
              <div
                className="p-10 md:p-12"
                style={{ backgroundColor: "#0A0A08" }}
              >
                <p className="text-2xl mb-5" style={{ color: AMBER }}>{p.icon}</p>
                <h3
                  className="font-light mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: CREAM }}
                >
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{p.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-24 md:py-36 px-6 md:px-10 lg:px-14" style={{ backgroundColor: "#0A0A08" }}>
        <div className="max-w-[1300px] mx-auto">
          <div className="max-w-xl mb-16 md:mb-20">
            <ScrollReveal>
              <p className="flex items-center gap-3 mb-5" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: AMBER }}>
                <span className="block w-6 h-px" style={{ background: AMBER }} />
                Prestations
              </p>
            </ScrollReveal>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-light leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: CREAM }}
            >
              Chaque Service,<br />
              <em style={{ color: AMBER }}>Un Résultat.</em>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: BORDER }}>
            {services.map((s, i) => (
              <ScrollReveal key={s.num} delay={i * 0.07} direction="up">
                <div
                  className="p-8 md:p-10 transition-colors duration-300 group"
                  style={{ backgroundColor: "#0A0A08" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "#111108"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "#0A0A08"; }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <p style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: `${AMBER}70` }}>
                      {s.num}
                    </p>
                    <p style={{ fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#4a4540" }}>
                      {s.duration}
                    </p>
                  </div>
                  <h3
                    className="font-light mb-1 transition-colors duration-300 group-hover:text-[#E8A030]"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: CREAM }}
                  >
                    {s.title}
                  </h3>
                  <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: AMBER, marginBottom: "1rem" }}>
                    {s.sub}
                  </p>
                  <p className="text-xs leading-relaxed mb-6" style={{ color: MUTED }}>{s.desc}</p>
                  <p
                    className="font-light text-sm"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: AMBER_LIGHT }}
                  >
                    {s.price}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-8 text-center">
              <Link
                href="/ratty-locks/booking"
                className="inline-flex items-center gap-3 transition-all duration-300"
                style={{
                  padding: "1rem 2.5rem",
                  border: `1px solid ${AMBER}`,
                  color: AMBER,
                  fontSize: "0.7rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                <span>Réserver une Prestation</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section id="galerie" className="py-24 md:py-36 px-6 md:px-10 lg:px-14" style={{ backgroundColor: "#080806", borderTop: `1px solid ${BORDER}` }}>
        <div className="max-w-[1300px] mx-auto">
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <ScrollReveal>
                <p className="flex items-center gap-3 mb-4" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: AMBER }}>
                  <span className="block w-6 h-px" style={{ background: AMBER }} />
                  Galerie
                </p>
              </ScrollReveal>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: CREAM }}
              >
                Le Travail<br /><em style={{ color: AMBER }}>Parle</em> pour Lui.
              </motion.h2>
            </div>
            <ScrollReveal direction="right">
              <a
                href="https://instagram.com/ratty_locks"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 text-xs tracking-widest uppercase transition-colors duration-300"
                style={{ color: MUTED }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = AMBER; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = MUTED; }}
              >
                Voir sur Instagram
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </ScrollReveal>
          </div>

          {/* Gallery Grid — placeholder slots */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ backgroundColor: BORDER }}>
            {[
              { label: "Départ Twist", tag: "New" },
              { label: "Design Gravé", tag: "New" },
              { label: "Entretien Complet", tag: "" },
              { label: "Coiffure Créative", tag: "New" },
              { label: "Locks Longues", tag: "" },
              { label: "Retwist Propre", tag: "New" },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.06} direction="up">
                <div
                  className="aspect-square relative overflow-hidden group"
                  style={{ backgroundColor: "#111110" }}
                >
                  {/* Gradient placeholder representing photo */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(${135 + i * 20}deg, #1a1510 0%, #0f0c06 50%, #151208 100%)`,
                    }}
                  />
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ background: "rgba(10,10,8,0.3)" }}
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ opacity: 0.15 }}>
                      <rect x="3" y="3" width="22" height="22" rx="2" stroke={AMBER} strokeWidth="1" />
                      <circle cx="10" cy="10" r="2" stroke={AMBER} strokeWidth="1" />
                      <path d="M3 18l7-6 5 4 4-3 6 5" stroke={AMBER} strokeWidth="1" strokeLinejoin="round" />
                    </svg>
                    <p style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: `${AMBER}40`, marginTop: "10px" }}>
                      Photo à venir
                    </p>
                  </div>
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5"
                    style={{ background: `linear-gradient(to top, rgba(10,10,8,0.9) 0%, transparent 60%)` }}
                  >
                    <p style={{ fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: AMBER }}>
                      {item.label}
                    </p>
                  </div>
                  {item.tag && (
                    <div className="absolute top-3 left-3">
                      <span style={{ fontSize: "8px", letterSpacing: "0.16em", textTransform: "uppercase", color: AMBER, backgroundColor: "rgba(10,10,8,0.85)", padding: "3px 8px", border: `1px solid ${AMBER}40` }}>
                        {item.tag}
                      </span>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-8 text-center">
              <a
                href="https://instagram.com/ratty_locks"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 transition-all duration-300"
                style={{
                  padding: "1rem 2.5rem",
                  border: "1px solid rgba(238,231,216,0.15)",
                  color: CREAM,
                  fontSize: "0.7rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                <span>Voir tout le travail · @ratty_locks</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 md:py-36 px-6 md:px-10 lg:px-14" style={{ backgroundColor: "#0A0A08" }}>
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          {/* Visual side */}
          <ScrollReveal direction="left">
            <div className="relative aspect-[3/4] max-w-md overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(160deg, #1a1410 0%, #0e0b06 60%, #141008 100%)",
                }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: `radial-gradient(ellipse at 50% 40%, rgba(200,134,10,0.06) 0%, transparent 65%)` }}
              >
                <div className="text-center px-8">
                  <p
                    className="font-light italic mb-4 text-5xl"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: `${AMBER}30` }}
                  >
                    R
                  </p>
                  <p style={{ fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: `${AMBER}30` }}>
                    Ratty · Locs Specialist
                  </p>
                </div>
              </div>
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, transparent 55%, rgba(10,10,8,0.8) 100%)" }}
              />
              <div className="absolute bottom-5 left-5" style={{ backgroundColor: "rgba(0,0,0,0.8)", padding: "8px 14px" }}>
                <span style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: AMBER }}>
                  Ratty · Fondateur
                </span>
              </div>
              <div className="absolute top-4 left-4 w-5 h-5" style={{ borderTop: `1px solid ${AMBER}40`, borderLeft: `1px solid ${AMBER}40` }} />
              <div className="absolute bottom-4 right-4 w-5 h-5" style={{ borderBottom: `1px solid ${AMBER}40`, borderRight: `1px solid ${AMBER}40` }} />
            </div>
          </ScrollReveal>

          {/* Bio */}
          <div>
            <ScrollReveal>
              <p className="flex items-center gap-3 mb-6" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: AMBER }}>
                <span className="block w-6 h-px" style={{ background: AMBER }} />
                Mon Histoire
              </p>
            </ScrollReveal>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-light leading-tight mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: CREAM }}
            >
              Plus qu&apos;un Coiffeur.
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="font-light leading-tight italic mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: AMBER }}
            >
              Un Artiste.
            </motion.h2>

            <ScrollReveal delay={0.35}>
              <div className="space-y-5 text-sm leading-loose mb-8" style={{ color: MUTED }}>
                <p>
                  Ratty Locks, c&apos;est plus de 10 ans d&apos;amour pour les locks, la culture et le soin du détail. Basé à Villeneuve-Saint-Georges, au coeur de l&apos;Île-de-France, je travaille avec chaque client pour créer quelque chose d&apos;unique.
                </p>
                <p>
                  Ici, les locks ne sont pas juste une coiffure — c&apos;est une expression de qui tu es. De ton parcours, ta culture, ton énergie. Mon travail, c&apos;est de te donner la confiance de te montrer tel que tu es.
                </p>
                <p>
                  Chaque session est personnalisée. Que tu démarres tes locks ou que tu entretiens des années de progression — tu repars toujours avec quelque chose de propre, de soigné, de <em style={{ color: CREAM }}>toi.</em>
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-10">
                {["Départ Twist", "Entretien", "Locks Design", "10+ Ans", "Paris"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "6px 14px",
                      border: `1px solid ${AMBER}25`,
                      fontSize: "0.6rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: AMBER,
                      backgroundColor: `${AMBER}08`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href="/ratty-locks/booking"
                className="inline-flex items-center gap-3 transition-all duration-300"
                style={{
                  padding: "1rem 2.5rem",
                  border: `1px solid ${AMBER}`,
                  color: AMBER,
                  fontSize: "0.7rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                <span>Prendre Rendez-Vous</span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-14" style={{ backgroundColor: "#080806", borderTop: `1px solid ${BORDER}` }}>
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <ScrollReveal>
              <p className="flex items-center justify-center gap-3 mb-5" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: AMBER }}>
                <span className="block w-6 h-px" style={{ background: AMBER }} />
                Comment ça marche
              </p>
            </ScrollReveal>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: CREAM }}
            >
              Simple comme <em style={{ color: AMBER }}>Bonjour</em>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: BORDER }}>
            {[
              { step: "01", title: "Choisis ta Prestation", desc: "Sélectionne le service qui correspond à tes besoins parmi nos 6 prestations." },
              { step: "02", title: "Prends ton RDV", desc: "Choisis une date et un créneau horaire disponible en ligne — simple et rapide." },
              { step: "03", title: "Arrive & Profite", desc: "Présente-toi à l'adresse, on s'occupe du reste. Tu repars avec de l'identité." },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.12} direction="up">
                <div className="p-10 md:p-12 relative" style={{ backgroundColor: "#0A0A08" }}>
                  <span
                    className="absolute top-6 right-8 font-light"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "4rem", color: `${AMBER}08`, lineHeight: 1 }}
                  >
                    {item.step}
                  </span>
                  <p style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: AMBER, marginBottom: "1rem" }}>
                    Étape {item.step}
                  </p>
                  <h3
                    className="font-light mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: CREAM }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: MUTED }}>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOOKING CTA ─── */}
      <section className="py-0" style={{ backgroundColor: "#0A0A08" }}>
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[440px]" style={{ borderTop: `1px solid ${BORDER}` }}>
          <div
            className="py-20 md:py-28 px-6 md:px-10 lg:px-14 flex flex-col justify-center"
            style={{ backgroundColor: "#0D0D0B" }}
          >
            <ScrollReveal>
              <p className="flex items-center gap-3 mb-6" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: AMBER }}>
                <span className="block w-6 h-px" style={{ background: AMBER }} />
                Prêt à te démarquer?
              </p>
              <h2
                className="font-light leading-tight mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: CREAM }}
              >
                Réserve ta Place.<br />
                Affirme ton <em style={{ color: AMBER }}>Style.</em>
              </h2>
              <p className="text-sm leading-loose mb-8 max-w-md" style={{ color: MUTED }}>
                Les créneaux partent vite. Prends ton rendez-vous maintenant et prépare-toi à repartir avec des locks qui te ressemblent vraiment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/ratty-locks/booking"
                  className="inline-flex items-center gap-3 transition-all duration-300"
                  style={{
                    padding: "1rem 2.5rem",
                    border: `1px solid ${AMBER}`,
                    color: AMBER,
                    fontSize: "0.7rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  <span>Réserver en Ligne</span>
                </Link>
                <a
                  href="https://wa.me/330983328241"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 transition-all duration-300"
                  style={{
                    padding: "1rem 2.5rem",
                    border: "1px solid rgba(238,231,216,0.15)",
                    color: CREAM,
                    fontSize: "0.7rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  <span>WhatsApp Direct</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Visual side */}
          <div
            className="relative min-h-[280px] flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: "#080806", borderLeft: `1px solid ${BORDER}` }}
          >
            <div
              className="absolute inset-0"
              style={{ background: `radial-gradient(ellipse at 50% 50%, rgba(200,134,10,0.05) 0%, transparent 70%)` }}
            />
            <div className="flex flex-col items-center gap-4" style={{ opacity: 0.15 }}>
              <svg viewBox="0 0 48 48" width="60" height="60" style={{ stroke: AMBER, fill: "none", strokeWidth: 0.8 }}>
                <circle cx="24" cy="16" r="7" />
                <path d="M8 42c0-8.84 7.16-16 16-16s16 7.16 16 16" />
                <path d="M20 10 Q24 4 28 10" />
              </svg>
              <p style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: AMBER }}>
                Ratty Locks · Paris
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT INFO BAR ─── */}
      <section style={{ backgroundColor: "#080806", borderTop: `1px solid ${BORDER}` }}>
        <div className="max-w-[1300px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: BORDER }}>
            {[
              {
                icon: "📍",
                label: "Adresse",
                value: "10, avenue des fusillés\nVilleneuve-Saint-Georges, 94190",
              },
              {
                icon: "📞",
                label: "Téléphone",
                value: "07 68 74 53 71\nWhatsApp: 09 83 32 82 41",
              },
              {
                icon: "📸",
                label: "Instagram",
                value: "@ratty_locks\n@Ratty_09",
              },
            ].map((item) => (
              <div key={item.label} className="py-8 px-8 md:px-10 text-center">
                <p className="text-xl mb-3">{item.icon}</p>
                <p style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: AMBER, marginBottom: "0.5rem" }}>
                  {item.label}
                </p>
                {item.value.split("\n").map((line, i) => (
                  <p key={i} className="text-xs" style={{ color: MUTED }}>{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

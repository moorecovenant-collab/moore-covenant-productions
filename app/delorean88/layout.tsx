"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const COGNAC = "#C4956A";
const COGNAC_LIGHT = "#DEB08A";
const CREAM = "#F0E8DC";
const MUTED = "#7a736a";
const BORDER = "rgba(196,149,106,0.15)";
const BG = "#080807";

const links = [
  { href: "/delorean88", label: "Home" },
  { href: "/delorean88/shop", label: "Shop" },
  { href: "/delorean88/about", label: "Our Story" },
];

function D88Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={
          scrolled
            ? { backgroundColor: "rgba(8,8,7,0.94)", backdropFilter: "blur(14px)", borderBottom: `1px solid ${BORDER}` }
            : { backgroundColor: "transparent" }
        }
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="/delorean88" className="group flex flex-col leading-none">
              <span
                className="font-light tracking-[0.25em] transition-colors duration-300"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: CREAM }}
              >
                DeLorean<span style={{ color: COGNAC }}>88</span>
              </span>
              <span style={{ fontSize: "8px", letterSpacing: "0.32em", textTransform: "uppercase", color: `${COGNAC}80` }}>
                Vintage
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    style={{
                      fontSize: "0.68rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: active ? COGNAC : MUTED,
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = CREAM; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = active ? COGNAC : MUTED; }}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="/delorean88/shop"
                className="hidden md:inline-flex items-center gap-2 transition-all duration-300"
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  padding: "0.6rem 1.4rem",
                  border: `1px solid ${COGNAC}`,
                  color: COGNAC,
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
                Shop Now
              </Link>

              <button
                onClick={() => setOpen(!open)}
                className="md:hidden flex flex-col justify-center items-end gap-[5px] w-8 h-8"
                aria-label="Menu"
              >
                <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block h-px w-6 origin-center" style={{ background: CREAM }} />
                <motion.span animate={open ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }} className="block h-px w-4" style={{ background: CREAM }} />
                <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block h-px w-6 origin-center" style={{ background: CREAM }} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-10"
            style={{ backgroundColor: BG }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={l.href}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2.8rem",
                    fontWeight: 300,
                    letterSpacing: "0.06em",
                    color: pathname === l.href ? COGNAC : CREAM,
                  }}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
              <Link
                href="/delorean88/shop"
                style={{
                  display: "inline-flex",
                  padding: "0.875rem 2.5rem",
                  border: `1px solid ${COGNAC}`,
                  color: COGNAC,
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Shop the Collection
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function D88Footer() {
  return (
    <footer style={{ backgroundColor: "#050504", borderTop: `1px solid ${BORDER}` }}>
      {/* CTA banner */}
      <div style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-14 md:py-20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="flex items-center gap-3 mb-4" style={{ fontSize: "0.6rem", letterSpacing: "0.26em", textTransform: "uppercase", color: COGNAC }}>
                <span className="block w-6 h-px" style={{ background: COGNAC }} />
                New Drops Weekly
              </p>
              <h2
                className="font-light leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: CREAM }}
              >
                The bold pieces don&apos;t wait.<br />
                <em style={{ color: COGNAC }}>Neither should you.</em>
              </h2>
            </div>
            <Link
              href="/delorean88/shop"
              className="shrink-0 inline-flex items-center gap-3 transition-all duration-300"
              style={{ padding: "1rem 2.5rem", border: `1px solid ${COGNAC}`, color: COGNAC, fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = COGNAC; el.style.color = BG; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = "transparent"; el.style.color = COGNAC; }}
            >
              <span>Shop the Drop</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <p className="font-light tracking-[0.25em] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: CREAM }}>
              DeLorean<span style={{ color: COGNAC }}>88</span>
            </p>
            <p style={{ fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: `${COGNAC}70`, marginBottom: "1.25rem" }}>Vintage</p>
            <p className="text-sm leading-relaxed mb-5 max-w-xs" style={{ color: MUTED }}>
              Curated vintage pieces for those bold enough to wear their story. You used to run. Now you arrive.
            </p>
            <p className="italic text-sm" style={{ fontFamily: "'Cormorant Garamond', serif", color: `${COGNAC}60` }}>
              &ldquo;The risk changed everything.&rdquo;
            </p>
          </div>

          <div>
            <p style={{ fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: COGNAC, marginBottom: "1.25rem" }}>Navigate</p>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/delorean88" },
                { label: "Shop Vintage", href: "/delorean88/shop" },
                { label: "Our Story", href: "/delorean88/about" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors duration-300"
                    style={{ color: MUTED }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = COGNAC; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = MUTED; }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p style={{ fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: COGNAC, marginBottom: "1.25rem" }}>Connect</p>
            <ul className="space-y-3">
              <li>
                <a href="https://www.delorean88vintage.com" target="_blank" rel="noopener noreferrer"
                  className="text-sm transition-colors duration-300" style={{ color: MUTED }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = COGNAC; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = MUTED; }}>
                  delorean88vintage.com
                </a>
              </li>
              <li>
                <a href="https://instagram.com/delorean88vintage" target="_blank" rel="noopener noreferrer"
                  className="text-sm transition-colors duration-300" style={{ color: MUTED }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = COGNAC; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = MUTED; }}>
                  Instagram · @delorean88vintage
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: `1px solid ${BORDER}` }}>
          <p className="text-xs" style={{ color: "#3a3530" }}>
            <span style={{ color: COGNAC }}>DeLorean 88 Vintage</span> &copy; {new Date().getFullYear()} · All rights reserved
          </p>
          <p className="text-xs italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#3a3530" }}>
            Wear your story. Own your era.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function D88Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: BG, color: CREAM, fontFamily: "var(--font-inter)" }}>
      <D88Nav />
      {children}
      <D88Footer />
    </div>
  );
}

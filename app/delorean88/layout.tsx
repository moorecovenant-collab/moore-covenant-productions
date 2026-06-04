"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/delorean88", label: "Home" },
  { href: "/delorean88/shop", label: "Shop" },
  { href: "/delorean88/about", label: "Story" },
];

function D88Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
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
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-d88-bg/95 backdrop-blur-md border-b border-d88-pink/10" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Logo */}
            <Link href="/delorean88" className="flex flex-col leading-none group">
              <span className="font-light tracking-[0.2em] text-d88-white text-lg md:text-xl group-hover:text-d88-pink transition-colors duration-300"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                DELOREAN<span className="text-d88-pink">&apos;88</span>
              </span>
              <span className="text-[8px] tracking-[0.35em] uppercase text-d88-pink/60">
                Buy · Sell · Trade
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-[0.65rem] tracking-[0.22em] uppercase transition-colors duration-300 ${
                    pathname === l.href ? "text-d88-pink" : "text-d88-gray hover:text-d88-white"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="/delorean88/shop"
                className="hidden md:inline-flex items-center gap-2 text-[0.62rem] tracking-[0.18em] uppercase px-5 py-2.5 border border-d88-pink text-d88-pink hover:bg-d88-pink hover:text-d88-bg transition-all duration-300"
              >
                Shop Now
              </Link>

              <button
                onClick={() => setOpen(!open)}
                className="md:hidden flex flex-col justify-center items-end gap-[5px] w-8 h-8"
                aria-label="Menu"
              >
                <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block h-px w-6 bg-d88-white origin-center" />
                <motion.span animate={open ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }} className="block h-px w-4 bg-d88-white" />
                <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block h-px w-6 bg-d88-white origin-center" />
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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden bg-d88-bg flex flex-col items-center justify-center gap-10"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={l.href}
                  className={`text-4xl font-light tracking-wide transition-colors duration-300 ${
                    pathname === l.href ? "text-d88-pink" : "text-d88-white"
                  }`}
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
              <Link href="/delorean88/shop" className="inline-flex px-8 py-3 border border-d88-pink text-d88-pink text-[0.65rem] tracking-[0.18em] uppercase">
                Shop the Drop
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
    <footer className="bg-d88-bg border-t border-d88-pink/10">
      {/* CTA strip */}
      <div className="border-b border-d88-pink/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-14 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <p className="flex items-center gap-3 mb-4 text-[0.58rem] tracking-[0.28em] uppercase text-d88-pink">
              <span className="block w-6 h-px bg-d88-pink" />
              New Drops Weekly
            </p>
            <h2 className="font-light text-d88-white leading-tight text-display-lg" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              The bold pieces don&apos;t wait.<br />
              <em className="text-d88-pink">Neither should you.</em>
            </h2>
          </div>
          <Link
            href="/delorean88/shop"
            className="shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-d88-pink text-d88-bg text-[0.7rem] tracking-[0.18em] uppercase font-medium hover:bg-d88-pink-light transition-colors duration-300"
          >
            Shop the Drop
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* Footer grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p className="font-light tracking-[0.2em] text-d88-white text-xl mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            DELOREAN<span className="text-d88-pink">&apos;88</span>
          </p>
          <p className="text-[8px] tracking-[0.32em] uppercase text-d88-pink/50 mb-5">Vintage</p>
          <p className="text-sm text-d88-gray leading-relaxed max-w-xs mb-4">
            Curated vintage pieces. Buy, sell, and trade with people who actually know what they&apos;re looking at.
          </p>
          <p className="text-sm italic text-d88-pink/50" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            &ldquo;Wear your story. Own your era.&rdquo;
          </p>
        </div>
        <div>
          <p className="text-[9px] tracking-[0.22em] uppercase text-d88-pink mb-5">Navigate</p>
          <ul className="space-y-3">
            {[
              { label: "Home", href: "/delorean88" },
              { label: "Shop Vintage", href: "/delorean88/shop" },
              { label: "Our Story", href: "/delorean88/about" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-d88-gray hover:text-d88-pink transition-colors duration-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[9px] tracking-[0.22em] uppercase text-d88-pink mb-5">Connect</p>
          <ul className="space-y-3">
            <li>
              <a href="https://www.delorean88vintage.com" target="_blank" rel="noopener noreferrer"
                className="text-sm text-d88-gray hover:text-d88-pink transition-colors duration-300">
                delorean88vintage.com
              </a>
            </li>
            <li>
              <a href="https://instagram.com/delorean88vintage" target="_blank" rel="noopener noreferrer"
                className="text-sm text-d88-gray hover:text-d88-pink transition-colors duration-300">
                Instagram · @delorean88vintage
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pb-10 pt-6 border-t border-d88-pink/8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-d88-gray/40">
          <span className="text-d88-pink">DeLorean 88 Vintage</span> &copy; {new Date().getFullYear()} · All rights reserved
        </p>
        <p className="text-xs italic text-d88-gray/40" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Buy · Sell · Trade
        </p>
      </div>
    </footer>
  );
}

export default function D88Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-d88-bg text-d88-white" style={{ fontFamily: "var(--font-inter)" }}>
      <D88Nav />
      {children}
      <D88Footer />
    </div>
  );
}

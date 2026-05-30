"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const AMBER = "#C8860A";
const CREAM = "#EEE7D8";

const links = [
  { href: "/ratty-locks", label: "Accueil" },
  { href: "/ratty-locks#services", label: "Services" },
  { href: "/ratty-locks#galerie", label: "Galerie" },
  { href: "/ratty-locks#about", label: "À Propos" },
  { href: "/ratty-locks/booking", label: "Réserver" },
];

function RattyNav() {
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
            ? { backgroundColor: "rgba(10,10,8,0.93)", backdropFilter: "blur(12px)", borderBottom: `1px solid rgba(200,134,10,0.18)` }
            : { backgroundColor: "transparent" }
        }
      >
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 lg:px-14">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/ratty-locks" className="group flex flex-col leading-none">
              <span
                className="text-xl md:text-2xl font-light tracking-widest transition-colors duration-300"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: CREAM }}
              >
                RATTY
              </span>
              <span style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: AMBER }}>
                Locks · Paris
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="transition-colors duration-300"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: pathname === l.href ? AMBER : "#7a7570",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = CREAM; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = pathname === l.href ? AMBER : "#7a7570"; }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="/ratty-locks/booking"
                className="hidden md:inline-flex items-center gap-2 transition-all duration-300"
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "0.625rem 1.25rem",
                  border: `1px solid ${AMBER}`,
                  color: AMBER,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = AMBER;
                  (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a08";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = AMBER;
                }}
              >
                Prendre RDV
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
            style={{ backgroundColor: "#0A0A08" }}
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
                  className="text-4xl font-light tracking-wide transition-colors duration-300"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: pathname === l.href ? AMBER : CREAM }}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function RattyFooter() {
  return (
    <footer style={{ backgroundColor: "#080806", borderTop: "1px solid rgba(200,134,10,0.15)" }}>
      <div className="max-w-[1300px] mx-auto px-6 md:px-10 lg:px-14 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="text-2xl font-light tracking-widest mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: CREAM }}>
              RATTY LOCKS
            </p>
            <p style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: AMBER }} className="mb-5">
              Locs Specialist · Paris
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#6a6560", maxWidth: "240px" }}>
              Spécialiste des locks depuis plus de 10 ans à Villeneuve-Saint-Georges, Paris.
            </p>
          </div>

          <div>
            <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: AMBER }} className="mb-5">
              Adresse
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#7a7570" }}>
              10, avenue des fusillés<br />
              Villeneuve-Saint-Georges<br />
              94190, France
            </p>
          </div>

          <div>
            <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: AMBER }} className="mb-5">
              Contact
            </p>
            <div className="space-y-3">
              <a href="tel:0768745371" className="block text-sm transition-colors duration-300" style={{ color: "#7a7570" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = AMBER; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#7a7570"; }}>
                Tel: 07 68 74 53 71
              </a>
              <a href="https://wa.me/330983328241" target="_blank" rel="noopener noreferrer" className="block text-sm transition-colors duration-300" style={{ color: "#7a7570" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = AMBER; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#7a7570"; }}>
                WhatsApp: 09 83 32 82 41
              </a>
              <a href="https://instagram.com/ratty_locks" target="_blank" rel="noopener noreferrer" className="block text-sm transition-colors duration-300" style={{ color: "#7a7570" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = AMBER; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#7a7570"; }}>
                Instagram: @ratty_locks
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(200,134,10,0.1)" }}>
          <p className="text-xs" style={{ color: "#4a4540" }}>
            <span style={{ color: AMBER }}>Ratty Locks</span> &copy; {new Date().getFullYear()} · Tous droits réservés
          </p>
          <p className="text-xs italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4a4540" }}>
            L&apos;art des locks, ton identité.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RattyLocksLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: "#0A0A08", color: CREAM, fontFamily: "var(--font-inter)" }}>
      <RattyNav />
      {children}
      <RattyFooter />
    </div>
  );
}

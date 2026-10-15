"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import Logo from "@/components/ui/Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/photography", label: "Photography" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          scrolled ? "bg-black/85 backdrop-blur-md border-b border-border/40" : "bg-transparent"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="group" aria-label="Moore Covenant Productions, home">
              <Logo size={34} animate />
            </Link>

            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={clsx("nav-link", pathname === link.href && "active")}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <Link href="/contact" className="btn-primary text-[10px] py-2.5 px-5">
                  <span>Start a Project</span>
                </Link>
              </div>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex flex-col justify-center items-end gap-[5px] w-8 h-8 group"
                aria-label="Toggle menu"
              >
                <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block h-px bg-cream w-6 origin-center transition-all" />
                <motion.span animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }} className="block h-px bg-cream w-4" />
                <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block h-px bg-cream w-6 origin-center transition-all" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black md:hidden"
          >
            {/* Metro line on the mobile menu */}
            <div className="absolute left-8 top-24 bottom-24 w-px bg-gold/30" />
            <div className="flex flex-col justify-center h-full gap-7 pl-16 pr-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <span className={clsx("absolute -left-[2.3rem] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-black", pathname === link.href ? "bg-gold" : "bg-text-muted")} />
                  <Link
                    href={link.href}
                    className={clsx(
                      "font-display text-4xl font-light tracking-wide transition-colors duration-300",
                      pathname === link.href ? "text-gold" : "text-cream hover:text-gold"
                    )}
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4">
                <Link href="/contact" className="btn-primary">
                  <span>Start a Project</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

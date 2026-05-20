"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const photos = [
  { src: "/metro-1.jpg", aspect: "3/4" },
  { src: "/metro-2.jpg", aspect: "4/3" },
  { src: null, aspect: "3/4" },
  { src: null, aspect: "4/3" },
  { src: null, aspect: "3/4" },
  { src: null, aspect: "4/3" },
  { src: null, aspect: "3/4" },
  { src: null, aspect: "4/3" },
  { src: null, aspect: "3/4" },
];

export default function PhotographyPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative pt-40 md:pt-52 pb-20 md:pb-28 px-6 md:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 20%, rgba(196,151,74,0.06) 0%, transparent 60%)" }} />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="section-label mb-6 flex items-center gap-3"
          >
            <span className="block w-6 h-px bg-gold" />
            Photography
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-display-xl font-light text-cream leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Still frames.
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-display-xl font-light italic text-gold leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Permanent stories.
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="text-text-secondary text-base leading-loose max-w-xl mt-8"
          >
            Editorial, brand, and personal photography — crafted to stop the scroll and hold the moment.
          </motion.p>
        </div>
      </section>

      {/* ─── COMING SOON ─── */}
      <section className="px-6 md:px-10 lg:px-16 pb-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="border border-gold/20 p-8 md:p-12 text-center mb-12"
            style={{ background: "linear-gradient(135deg, rgba(196,151,74,0.04) 0%, transparent 70%)" }}
          >
            <div className="w-10 h-px bg-gold/40 mx-auto mb-6" />
            <p
              className="font-display text-2xl md:text-3xl font-light italic text-cream mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Portfolio coming soon.
            </p>
            <p className="text-text-muted text-sm max-w-md mx-auto leading-relaxed">
              We&apos;re curating the full gallery. In the meantime, reach out directly to inquire about photography services.
            </p>
            <div className="w-10 h-px bg-gold/40 mx-auto mt-6 mb-8" />
            <Link href="/contact" className="btn-primary inline-flex">
              <span>Inquire About Photography</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="relative z-10">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── GALLERY PLACEHOLDERS ─── */}
      <section className="px-6 md:px-10 lg:px-16 pb-32 md:pb-44">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border/40">
            {photos.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.2 + i * 0.08, ease: "easeOut" }}
                className="bg-dark relative overflow-hidden group"
                style={{ aspectRatio: photo.aspect }}
              >
                {photo.src ? (
                  <>
                    <Image
                      src={photo.src}
                      alt="Moore Covenant Productions photography"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                  </>
                ) : (
                  <>
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(${135 + i * 15}deg, #${["141414", "1a1208", "0e0e0e", "12100e", "0e1218"][i % 5]} 0%, #0d0d0d 100%)`,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border border-gold/10 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" style={{ stroke: "rgba(196,151,74,0.2)", fill: "none", strokeWidth: 1.2 }}>
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                      </div>
                    </div>
                  </>
                )}
                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-gold/10" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-gold/10" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

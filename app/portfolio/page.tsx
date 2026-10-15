"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedText from "@/components/ui/AnimatedText";
import ReelCard from "@/components/ui/ReelCard";
import Station from "@/components/ui/Station";

const serif = { fontFamily: "'Cormorant Garamond', serif" };

const growth = [
  {
    client: "Dieu Trippin",
    handle: "@dieu_tripin",
    platform: "TikTok",
    from: "0",
    to: "255K",
    unit: "followers",
    extra: [
      { value: "24.8M", label: "likes" },
      { value: "17M+", label: "views, top video" },
    ],
    desc: "A personal brand built from a blank profile. Full content strategy, shooting, editing, and posting, with a community that still shows up for every drop.",
    tags: ["Content Strategy", "Short-form Video", "Community"],
  },
  {
    client: "Hair Academy MD",
    handle: "@hairacademy_md",
    platform: "Instagram",
    from: "1K",
    to: "14K",
    unit: "followers in 3 months",
    extra: [
      { value: "15M+", label: "content views" },
      { value: "6", label: "campuses" },
    ],
    desc: "A dormant account for a beauty school and its sister campuses. Rebuilt the content system and posting cadence from scratch, promoted enrollment events, and took it to a 14x follower increase in a single quarter.",
    tags: ["Social Management", "Enrollment Campaigns", "Education"],
  },
  {
    client: "Morena Cafe DC",
    handle: "@morenacafedc",
    platform: "Instagram + TikTok",
    from: "7.5K",
    to: "20K",
    unit: "followers",
    extra: [
      { value: "Flat", label: "to growing" },
      { value: "DC", label: "creator network" },
    ],
    desc: "Inherited a stalled account with almost no engagement. Worked side by side with ownership on a content and engagement plan, then drove TikTok through direct creator partnerships around the city.",
    tags: ["Growth Strategy", "Creator Partnerships", "Local Business"],
  },
];

const sites = [
  {
    name: "Desire Delights",
    type: "Bakery, South Jersey and Philadelphia",
    url: "https://desiredelightssweets.com",
    img: "/work/desire-delights.jpg",
    desc: "A premium custom cake site with a gallery, reviews, and an order form that emails the owner and pings her phone.",
  },
  {
    name: "121 Auto Repair & Sales",
    type: "Auto shop, Depew, NY",
    url: null,
    img: "/work/121-auto.jpg",
    desc: "A single-page site with same-day booking, nine animated service covers, a reviews carousel, and a chatbot that answers the questions the phone used to.",
  },
];

export default function PortfolioPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-44 md:pt-56 pb-20 md:pb-28 px-6 md:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 flicker">
          <Image src="/dc/georgetown-night.jpg" alt="" fill className="object-cover object-[50%_35%] opacity-35 kenburns" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.5) 55%, #080808 100%)" }} />
        </div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mb-8">
            <Station scene="01" name="Now showing" />
          </motion.div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-display-hero font-light text-cream"
              style={serif}
            >
              The proof is in
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-display-hero font-light italic text-gold"
              style={serif}
            >
              the growth.
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1 }}
            className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl mt-10"
          >
            Real clients and real numbers. Beauty, ministry, local business, creators, and film,
            most of it within a Metro ride of DC.
          </motion.p>
        </div>
      </section>

      {/* GROWTH CASE STUDIES */}
      <section className="px-6 md:px-10 lg:px-16 pb-24 md:pb-32 bg-black">
        <div className="max-w-[1400px] mx-auto space-y-px">
          {growth.map((g, i) => (
            <ScrollReveal key={g.client} delay={0.05}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 py-14 md:py-20 border-t border-border/40 group">
                <div className="lg:col-span-5">
                  <p className="text-[9px] tracking-[0.22em] uppercase text-text-muted mb-5">
                    {String(i + 1).padStart(2, "0")} · {g.platform}
                  </p>
                  <div className="flex items-baseline gap-4 mb-1">
                    <span className="font-display text-3xl text-text-muted line-through decoration-gold/40" style={serif}>{g.from}</span>
                    <span className="font-display text-7xl md:text-8xl font-light text-cream leading-none" style={serif}>{g.to}</span>
                  </div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gold mb-8">{g.unit}</p>
                  <div className="flex gap-10">
                    {g.extra.map((e) => (
                      <div key={e.label}>
                        <p className="font-display text-3xl text-cream leading-none" style={serif}>{e.value}</p>
                        <p className="text-[9px] tracking-[0.2em] uppercase text-text-muted mt-1">{e.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-7 lg:pt-2">
                  <h3 className="font-display text-4xl md:text-5xl font-light text-cream leading-tight mb-2 group-hover:text-gold transition-colors duration-500" style={serif}>
                    {g.client}
                  </h3>
                  <p className="text-xs text-text-muted mb-6">{g.handle}</p>
                  <p className="text-text-secondary text-base leading-relaxed max-w-xl mb-6">{g.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {g.tags.map((t) => (
                      <span key={t} className="pill-tag pointer-events-none">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* REELS (cream) */}
      <section className="section-cream py-24 md:py-32 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <Station scene="02" name="Short-form and reels" tone="light" className="mb-6" />
          </ScrollReveal>
          <AnimatedText text="Hover to play. Click for sound." tag="h2" className="font-display text-display-huge font-light text-black mb-6" style={serif} />
          <ScrollReveal delay={0.2}>
            <p className="text-black/70 text-base leading-relaxed max-w-xl mb-14">
              Two current partners. ELEV8D Innovations, a low-voltage installer whose feeds we built
              from zero and now shoot on site. Nicholas Padilla, whose Miami conference livestream we
              turned into twenty-one reels and a highlight film.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            <ScrollReveal delay={0}><ReelCard src="/work/elev8d-01.mp4" poster="/work/elev8d-01.jpg" client="ELEV8D" title="Integrate, don't install" className="pill-card" /></ScrollReveal>
            <ScrollReveal delay={0.08} className="md:mt-10"><ReelCard src="/work/elev8d-02.mp4" poster="/work/elev8d-02.jpg" client="ELEV8D" title="100-inch screens for a church" className="pill-card" /></ScrollReveal>
            <ScrollReveal delay={0.16}><ReelCard src="/work/elev8d-04.mp4" poster="/work/elev8d-04.jpg" client="ELEV8D" title="No shortcuts" className="pill-card" /></ScrollReveal>
            <ScrollReveal delay={0.24} className="md:mt-10"><ReelCard src="/work/nick-highlight.mp4" poster="/work/nick-highlight.jpg" client="Nicholas Padilla" title="Night of Glory, Miami" className="pill-card" /></ScrollReveal>
            <ScrollReveal delay={0.32}><ReelCard src="/work/nick-captives.mp4" poster="/work/nick-captives.jpg" client="Nicholas Padilla" title="Set the captives free" className="pill-card" /></ScrollReveal>
            <ScrollReveal delay={0.4} className="md:mt-10"><ReelCard src="/work/nick-fire.mp4" poster="/work/nick-fire.jpg" client="Nicholas Padilla" title="Fire" className="pill-card" /></ScrollReveal>
          </div>
        </div>
      </section>

      {/* FILM (black) */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-12">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <Station scene="03" name="Film" className="mb-6" />
              </ScrollReveal>
              <AnimatedText text="A short film." tag="h2" className="font-display text-display-huge font-light text-cream" style={serif} />
            </div>
            <ScrollReveal delay={0.2} className="lg:col-span-5">
              <p className="text-text-secondary text-base leading-relaxed">
                A man alone in the woods, and the memory that put him there. Written, shot, and cut
                in house on a Sony cinema body. The first of several.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {["/work/jakei-2.jpg", "/work/jakei-1.jpg", "/work/jakei-4.jpg", "/work/jakei-3.jpg"].map((src, i) => (
              <ScrollReveal key={src} delay={i * 0.08}>
                <div className={`relative aspect-[16/9] overflow-hidden ${i % 2 ? "lg:mt-10" : ""}`}>
                  <Image src={src} alt="Still from a short film by Moore Covenant Productions" fill className="object-cover transition-transform duration-[1500ms] hover:scale-105" />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(8,8,8,0.5) 0%, transparent 50%)" }} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WEBSITES (cream) */}
      <section className="section-cream py-24 md:py-32 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <Station scene="04" name="Websites" tone="light" className="mb-6" />
          </ScrollReveal>
          <AnimatedText text="Built, launched, and handed over." tag="h2" className="font-display text-display-huge font-light text-black mb-14" style={serif} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {sites.map((s, i) => (
              <ScrollReveal key={s.name} delay={i * 0.1}>
                <div className="group">
                  <div className="relative aspect-[16/10] overflow-hidden pill-card border border-black/10 bg-black">
                    <Image src={s.img} alt={`${s.name} website by Moore Covenant Productions`} fill className="object-cover object-top transition-transform duration-[1500ms] group-hover:scale-[1.03]" />
                  </div>
                  <div className="flex items-start justify-between gap-6 mt-6">
                    <div>
                      <h3 className="font-display text-3xl text-black" style={serif}>{s.name}</h3>
                      <p className="text-[10px] tracking-[0.18em] uppercase text-black/50 mt-1">{s.type}</p>
                      <p className="text-sm text-black/70 leading-relaxed mt-4 max-w-md">{s.desc}</p>
                    </div>
                    {s.url && (
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="pill-tag shrink-0 mt-1">
                        Visit
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-black border-t border-border/40">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-display-huge font-light text-cream mb-6" style={serif}>
              Your name goes here next.
            </h2>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-10">
              Book a free call and we will tell you honestly what it would take.
            </p>
            <Link href="/contact" className="btn-primary">
              <span>Book a Free Call</span>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}

"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedText from "@/components/ui/AnimatedText";
import HeroVideo from "@/components/ui/HeroVideo";
import ReelCard from "@/components/ui/ReelCard";
import Marquee from "@/components/ui/Marquee";
import Station from "@/components/ui/Station";
import Logo from "@/components/ui/Logo";
import TrainRide from "@/components/ui/TrainRide";

const serif = { fontFamily: "'Cormorant Garamond', serif" };

const clients = [
  "Hair Academy MD",
  "Dieu Trippin",
  "Morena Cafe DC",
  "ELEV8D Innovations",
  "Desire Delights",
  "Nicholas Padilla",
  "121 Auto Repair",
];

const stats = [
  { value: "60M+", label: "Views generated" },
  { value: "50M+", label: "Likes generated" },
  { value: "100K+", label: "Followers grown" },
  { value: "7+", label: "Years in the work" },
];

const growth = [
  { client: "Dieu Trippin", platform: "TikTok", from: "0", to: "255K", unit: "followers", note: "Built from a blank profile. 24.8M likes and multiple videos past 17M views." },
  { client: "Hair Academy MD", platform: "Instagram", from: "1K", to: "14K", unit: "followers", note: "A dormant account rebuilt from the ground up. 15M+ views in one quarter." },
  { client: "Morena Cafe DC", platform: "Instagram + TikTok", from: "7.5K", to: "20K", unit: "followers", note: "A stalled DC cafe turned growing again through creator partnerships." },
];

const services = [
  { number: "01", title: "Social Media Management", price: "From $1,500 / month", terms: "Three month minimum", desc: "Strategy, content, posting, engagement, and monthly reporting. You run the business. We run the feed.", href: "/services#social" },
  { number: "02", title: "Video Production", price: "Content days from $1,500", terms: "Films quoted per project", desc: "Content days, short-form reels, brand films, and short films. Shot on cinema glass, cut with intention.", href: "/services#video" },
  { number: "03", title: "Websites & Brand", price: "Starting at $1,000", terms: "Care plan from $150 / month", desc: "Custom sites and brand identity that make you look like the authority you already are.", href: "/services#web" },
];

const partners = [
  { name: "Market Research Design LLC", note: "Unique Brand Solutions", href: "https://mrdubs.com/" },
  { name: "AMD Branding", note: "Design your future", href: "https://www.instagram.com/amdbranding" },
  { name: "Sam Studios", note: "Photography", href: "https://thesamstudio.mypixieset.com/portfolio/" },
];


// The ride: frame numbers refer to the exported sequence (every 3rd render frame, 8.5 s per stop at 24 fps -> 68 frames per stop).
const rideStops = [
  { frame: 30, hold: 24, number: "01", name: "Social Media Management", blurb: "Strategy, content, posting, engagement, and reporting. From $1,500 a month.", href: "/services#social" },
  { frame: 98, hold: 24, number: "02", name: "Video Production", blurb: "Content days, reels, brand films, and short films. Content days from $1,500.", href: "/services#video" },
  { frame: 166, hold: 24, number: "03", name: "Websites & Brand", blurb: "Custom sites and identity that make you look like the authority you already are. From $1,000.", href: "/services#web" },
  { frame: 234, hold: 30, number: "04", name: "Your Brand", blurb: "The last stop is yours. Book a free call and tell us where you want to go.", href: "/contact" },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {/* HERO: letterboxed city loop */}
      <section ref={heroRef} className="letterbox relative min-h-[100svh] flex items-end overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 z-0 flicker">
          <HeroVideo src="" poster="/dc/metro-interior-night.jpg" intro="/hero/intro.mp4" introPoster="/hero/intro-poster.jpg" onIntroEnd={() => setIntroDone(true)} />
          <div
            className="absolute inset-0 z-10"
            style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.6) 0%, rgba(8,8,8,0.15) 35%, rgba(8,8,8,0.55) 70%, rgba(8,8,8,0.98) 100%)" }}
          />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className={`relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pb-24 md:pb-32 pt-40 transition-opacity duration-700 ${introDone ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mb-8">
            <Station scene="01" name="Washington, DC" />
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-display-hero font-light text-cream"
              style={serif}
            >
              Built on Covenant.
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.2, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-display-hero font-light italic text-gold"
              style={serif}
            >
              Established for More.
            </motion.h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-20 items-end mt-10 md:mt-14">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.1 }}
              className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl"
            >
              We bring the movie feel to the DMV. Social media management, cinematic content, and
              websites for founders, ministries, creators, and local businesses that want to be seen
              and remembered.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.25 }} className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary">
                <span>Start a Project</span>
              </Link>
              <Link href="/portfolio" className="btn-ghost">
                <span>See the Work</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }} className="absolute top-24 right-6 md:right-10 lg:right-16 z-20 hidden md:block text-right">
          <p className="text-[9px] tracking-[0.3em] uppercase text-text-muted">Now showing</p>
          <p className="text-[9px] tracking-[0.3em] uppercase text-gold mt-1">The DMV, on film</p>
        </motion.div>
      </section>

      {/* THE RIDE: scroll-driven Metro sequence */}
      <TrainRide framePath="/train/t_" mobileFramePath="/train/m/t_" frameCount={272} ext="webp" stops={rideStops} poster="/dc/metro-interior-night.jpg" pxPerFrame={11} />

      {/* CLIENT TICKER */}
      <section className="bg-black border-y border-border/40 py-6">
        <Marquee items={clients} />
      </section>

      {/* PROOF */}
      <section className="bg-black px-6 md:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border/40 border-b border-border/40">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08}>
                <div className="bg-black py-12 md:py-16 px-4 text-center">
                  <p className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-cream leading-none mb-3" style={serif}>{stat.value}</p>
                  <p className="text-[9px] md:text-[10px] tracking-[0.22em] uppercase text-text-muted">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED WORK (black) */}
      <section className="py-24 md:py-36 px-6 md:px-10 lg:px-16 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
            <div>
              <ScrollReveal>
                <Station scene="02" name="Selected work" className="mb-6" />
              </ScrollReveal>
              <AnimatedText text="The proof is in the growth." tag="h2" className="font-display text-display-huge font-light text-cream" style={serif} />
            </div>
            <ScrollReveal delay={0.2}>
              <Link href="/portfolio" className="btn-ghost shrink-0">
                <span>All Work</span>
              </Link>
            </ScrollReveal>
          </div>

          {/* ELEV8D */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24 md:mb-32">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <ScrollReveal>
                <p className="text-[9px] tracking-[0.22em] uppercase text-text-muted mb-4">Current partner</p>
                <h3 className="font-display text-4xl md:text-5xl font-light text-cream leading-tight mb-5" style={serif}>ELEV8D Innovations</h3>
                <p className="text-text-secondary text-base leading-relaxed mb-6 max-w-md">
                  A low-voltage installer in the Mid-Atlantic who wanted his company to stand on its
                  own. We built his TikTok, Instagram, and Facebook from zero, shot his installs on
                  site, and cut a short-form series that shows the craft instead of talking about it.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Social Management", "On-site Production", "Short-form Series"].map((t) => (
                    <span key={t} className="pill-tag pointer-events-none">{t}</span>
                  ))}
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 grid grid-cols-2 gap-4 md:gap-6">
              <ScrollReveal delay={0.1}>
                <ReelCard src="/work/elev8d-01.mp4" poster="/work/elev8d-01.jpg" client="ELEV8D" title="Integrate, don't install" className="pill-card" />
              </ScrollReveal>
              <ScrollReveal delay={0.25} className="mt-10 md:mt-16">
                <ReelCard src="/work/elev8d-02.mp4" poster="/work/elev8d-02.jpg" client="ELEV8D" title="100-inch screens for a church" className="pill-card" />
              </ScrollReveal>
            </div>
          </div>

          {/* Nicholas Padilla */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24 md:mb-32">
            <div className="lg:col-span-7 grid grid-cols-2 gap-4 md:gap-6">
              <ScrollReveal delay={0.1} className="mt-10 md:mt-16">
                <ReelCard src="/work/nick-highlight.mp4" poster="/work/nick-highlight.jpg" client="Nicholas Padilla" title="Night of Glory, Miami" className="pill-card" />
              </ScrollReveal>
              <ScrollReveal delay={0.25}>
                <ReelCard src="/work/nick-captives.mp4" poster="/work/nick-captives.jpg" client="Nicholas Padilla" title="Set the captives free" className="pill-card" />
              </ScrollReveal>
            </div>
            <div className="lg:col-span-5">
              <ScrollReveal>
                <p className="text-[9px] tracking-[0.22em] uppercase text-text-muted mb-4">Ministry</p>
                <h3 className="font-display text-4xl md:text-5xl font-light text-cream leading-tight mb-5" style={serif}>Nicholas Padilla</h3>
                <p className="text-text-secondary text-base leading-relaxed mb-6 max-w-md">
                  Two hours of a Miami conference livestream, turned into twenty-one vertical reels
                  and a highlight film. Every word captioned, the room regraded so it does not look
                  like a livestream, and the band remixed to sit under the voice.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Reels Editing", "Captions", "Color Grade", "Audio Remix"].map((t) => (
                    <span key={t} className="pill-tag pointer-events-none">{t}</span>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Growth numbers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {growth.map((g, i) => (
              <ScrollReveal key={g.client} delay={i * 0.1}>
                <div className="pill-card bg-dark border border-border/40 p-8 md:p-10 h-full group hover:border-gold/40 transition-colors duration-500">
                  <p className="text-[9px] tracking-[0.22em] uppercase text-text-muted mb-6">{g.platform}</p>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-display text-2xl text-text-muted line-through decoration-gold/40" style={serif}>{g.from}</span>
                    <span className="font-display text-5xl md:text-6xl font-light text-cream leading-none" style={serif}>{g.to}</span>
                  </div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gold mb-5">{g.unit}</p>
                  <h4 className="font-display text-2xl text-cream mb-2" style={serif}>{g.client}</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">{g.note}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES (cream) */}
      <section className="section-cream py-24 md:py-36 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-2xl mb-16 md:mb-20">
            <ScrollReveal>
              <Station scene="03" name="What we do" tone="light" className="mb-6" />
            </ScrollReveal>
            <AnimatedText text="Three things, done properly." tag="h2" className="font-display text-display-huge font-light text-black" style={serif} />
            <ScrollReveal delay={0.3}>
              <p className="text-black/70 text-base leading-relaxed mt-6">
                Every engagement starts with a free call. We scope the work around your goals, not
                the other way round.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((s, i) => (
              <ScrollReveal key={s.number} delay={i * 0.1}>
                <Link href={s.href} className="pill-card block bg-cream/60 border border-black/10 p-8 md:p-12 h-full group hover:bg-black hover:text-cream transition-colors duration-500">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-gold">{s.number}</span>
                  <h3 className="font-display text-3xl md:text-4xl font-light mt-6 mb-4 group-hover:text-gold transition-colors duration-300" style={serif}>{s.title}</h3>
                  <p className="text-sm leading-relaxed mb-8 text-black/70 group-hover:text-text-secondary transition-colors duration-500">{s.desc}</p>
                  <p className="font-display text-xl" style={serif}>{s.price}</p>
                  <p className="text-[10px] tracking-[0.18em] uppercase mt-1 text-black/50 group-hover:text-text-muted transition-colors duration-500">{s.terms}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER (black) */}
      <section className="py-24 md:py-36 lg:py-44 px-6 md:px-10 lg:px-16 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-center">
            <ScrollReveal direction="left" className="lg:col-span-5">
              <div className="relative aspect-[3/4] max-w-md pill-photo border border-gold/20">
                <Image src="/elijah-amyah-cafe.jpg" alt="Elijah Moore, founder of Moore Covenant Productions" fill className="object-cover object-center" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(8,8,8,0.8) 100%)" }} />
                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <p className="text-[9px] tracking-[0.22em] uppercase text-gold">Elijah Moore</p>
                  <p className="text-[9px] tracking-[0.22em] uppercase text-text-secondary mt-1">Founder & Creative Director</p>
                </div>
              </div>
            </ScrollReveal>

            <div className="lg:col-span-7">
              <ScrollReveal>
                <Station scene="04" name="The founder" className="mb-6" />
              </ScrollReveal>
              <AnimatedText text="I did not stumble into this." tag="h2" className="font-display text-display-huge font-light text-cream" style={serif} />
              <ScrollReveal delay={0.3}>
                <div className="mt-8 space-y-5 text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl">
                  <p>
                    I kept meeting people with something real to offer and no one could see them. A
                    salon owner with a full book and a dead Instagram. A pastor with a word for
                    thousands and a livestream nobody clipped. I knew I could fix that, so I did.
                  </p>
                  <p>
                    Moore Covenant Productions is the company I built around that. The name is a
                    promise. When I take on your brand, I treat it like my own, and my faith is the
                    reason the work gets done right.
                  </p>
                </div>
                <blockquote className="font-display text-2xl italic text-cream border-l-2 border-gold pl-6 my-10 leading-snug max-w-xl" style={serif}>
                  &ldquo;My story is who I am. Are you ready to tell yours?&rdquo;
                </blockquote>
                <Link href="/about" className="btn-primary">
                  <span>Read the Full Story</span>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS (cream) */}
      <section className="section-cream py-16 md:py-20 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
              <div className="shrink-0">
                <Station scene="05" name="Covenant partners" tone="light" />
              </div>
              <div className="flex flex-wrap gap-x-12 gap-y-4">
                {partners.map((p) => (
                  <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="group">
                    <p className="font-display text-2xl md:text-3xl text-black leading-none group-hover:text-gold transition-colors" style={serif}>{p.name}</p>
                    <p className="text-[9px] tracking-[0.22em] uppercase text-black/50 mt-2">{p.note}</p>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SCRIPTURE */}
      <section className="py-20 md:py-28 px-6 md:px-10 lg:px-16 bg-black">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <Logo size={56} wordmark={false} className="mb-8" />
            <p className="font-display italic text-2xl md:text-3xl font-light text-cream leading-relaxed mb-6" style={serif}>
              &ldquo;I will establish <span className="text-gold not-italic">my covenant</span> between me and you and your
              descendants after you, throughout your generations, for an everlasting covenant.&rdquo;
            </p>
            <p className="text-[10px] tracking-[0.25em] uppercase text-gold">Genesis 17:7</p>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="letterbox relative py-32 md:py-44 px-6 md:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 flicker">
          <Image src="/dc/kennedy-night.jpg" alt="" fill className="object-cover object-center opacity-70 kenburns" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #080808 0%, rgba(8,8,8,0.35) 45%, rgba(8,8,8,0.6) 75%, #080808 100%)" }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto text-center">
          <ScrollReveal>
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-6">Next stop</p>
            <h2 className="font-display text-display-huge font-light text-cream leading-tight mb-8" style={serif}>
              Let&apos;s build something<br />
              <em className="italic text-gold">worth remembering.</em>
            </h2>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Book a free call. We talk about your brand, where it is, and where it should be. No
              pressure, no pitch deck.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                <span>Book a Free Call</span>
              </Link>
              <Link href="/services" className="btn-ghost">
                <span>View Packages</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

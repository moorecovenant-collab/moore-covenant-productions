"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedText from "@/components/ui/AnimatedText";
import Station from "@/components/ui/Station";

const serif = { fontFamily: "'Cormorant Garamond', serif" };

const values = [
  { letter: "C", name: "Covenant First", desc: "We keep our word, even when convenience says otherwise." },
  { letter: "O", name: "Operational Excellence", desc: "We build with precision and discipline, as unto the Lord, not just the client." },
  { letter: "V", name: "Visionary Stewardship", desc: "We treat your people, your budget, and your opportunities like they are our own." },
  { letter: "E", name: "Ethical Integrity", desc: "Decisions anchored in truth. No shortcuts, no games with the numbers." },
  { letter: "N", name: "Noble Leadership", desc: "We lead with humility and accountability. Strength that lifts, not overpowers." },
  { letter: "A", name: "Accountability", desc: "We own the outcome. To you, and to God." },
  { letter: "N", name: "Next-Gen Mindset", desc: "We build beyond today, for the people who come after us." },
  { letter: "T", name: "Trust", desc: "Earned through consistency, transparency, and showing up." },
];

const timeline = [
  { year: "2019", text: "Started shooting and editing for YouTubers and online personalities. Learned the algorithm by living in it." },
  { year: "2022", text: "Took Hair Academy MD from 1K to 14K followers in a quarter. Figured out the system was repeatable." },
  { year: "2023", text: "Built Dieu Trippin from a blank TikTok profile to 255K followers and 24.8M likes." },
  { year: "2025", text: "Founded Moore Covenant Productions Inc. in Maryland. Social, video, and websites under one roof." },
  { year: "2026", text: "Current partners across the DMV and beyond. First short film shot. Sony cinema body on every shoot." },
];

const team = [
  {
    name: "Elijah Moore",
    role: "CEO · Founder & Creative Director",
    bio: "Strategy, creative direction, and the camera. Every project runs through him.",
    img: "/elijah-amyah-cafe.jpg",
  },
  {
    name: "You.",
    role: "The dreamer",
    bio: "The key component. Your story, your business, your calling. Nothing here works without it.",
    img: null,
  },
  {
    name: "Your people.",
    role: "The support",
    bio: "Your team, your family, your church, your customers. We build so they can carry it with you.",
    img: null,
  },
  {
    name: "Covenant partners",
    role: "The network",
    bio: "Market Research Design LLC, AMD Branding, and Sam Studios. Design, strategy, and photography when the job calls for more hands.",
    img: null,
  },
];

const tools = ["Sony a7C II", "DaVinci Resolve", "Final Cut Pro", "Premiere Pro", "Lightroom", "Photoshop", "Meta Business Suite", "CapCut", "Descript", "Next.js"];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-44 md:pt-56 pb-20 md:pb-28 px-6 md:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 flicker">
          <Image src="/dc/georgetown-night.jpg" alt="" fill className="object-cover object-center opacity-30 kenburns" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.6) 0%, rgba(8,8,8,0.5) 50%, #080808 100%)" }} />
        </div>
        <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mb-8">
              <Station scene="01" name="The founder" />
            </motion.div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-display-hero font-light text-cream"
                style={serif}
              >
                Elijah Moore
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9 }}
              className="text-[11px] tracking-[0.28em] uppercase text-gold mt-6"
            >
              Founder & Creative Director · Washington, DC
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05 }}
              className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl mt-8"
            >
              Brand architect, social strategist, and the person behind the camera. Married,
              family first, built on faith. Seven years of making people and businesses
              impossible to scroll past.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 lg:ml-auto pill-photo border border-gold/20">
              <Image src="/elijah-amyah-cafe.jpg" alt="Elijah Moore, Founder & Creative Director" fill className="object-cover object-center" priority />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 65%, rgba(8,8,8,0.7) 100%)" }} />
              <div className="absolute bottom-7 left-0 right-0 text-center">
                <p className="text-[9px] tracking-[0.25em] uppercase text-gold">Founder & Creative Director</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STORY (cream) */}
      <section className="section-cream py-24 md:py-32 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <Station scene="02" name="The story" tone="light" className="mb-6" />
            </ScrollReveal>
            <AnimatedText text="I did not stumble into this." tag="h2" className="font-display text-display-huge font-light text-black" style={serif} />
          </div>
          <ScrollReveal delay={0.2} className="lg:col-span-7">
            <div className="space-y-6 text-black/75 text-base md:text-lg leading-relaxed max-w-2xl">
              <p>
                I kept meeting people with something real to offer and no one could see them. A
                salon owner with a full book and a dead Instagram. A pastor with a word for
                thousands and a livestream nobody clipped. A cafe on a DC corner with better food
                than the places getting the press. I knew I could fix that, so I did.
              </p>
              <p>
                I started by editing for YouTubers at nineteen. Then I ran accounts, then I shot
                the content myself, then I built the websites, because handing a client off to
                three different vendors never ended well for the client. Moore Covenant Productions
                is all of that under one roof.
              </p>
              <p>
                The name is a promise. A covenant is a bond you do not walk away from. When I take
                on your brand, I treat it like my own, and my faith is the reason the work gets
                done right, not a sales line.
              </p>
              <p>
                I am based in DC and I bring the movie feel to the DMV. That means cinema cameras
                on a job that used to get an iPhone, and a story where there used to be a flyer.
              </p>
            </div>
            <blockquote className="font-display text-2xl md:text-3xl italic text-black border-l-2 border-gold pl-6 mt-10 leading-snug max-w-xl" style={serif}>
              &ldquo;My story is who I am. Are you ready to tell yours?&rdquo;
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* TIMELINE (black) */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <Station scene="03" name="The line so far" className="mb-6" />
          </ScrollReveal>
          <AnimatedText text="Stops along the way." tag="h2" className="font-display text-display-huge font-light text-cream mb-16" style={serif} />
          <div className="relative">
            <div className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px bg-gold/30" />
            <div className="space-y-12 md:space-y-0">
              {timeline.map((t, i) => (
                <ScrollReveal key={t.year} delay={i * 0.06}>
                  <div className={`relative md:grid md:grid-cols-2 md:gap-16 md:py-8 ${i % 2 ? "" : ""}`}>
                    <span className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1 w-[15px] h-[15px] rounded-full bg-gold border-[3px] border-black shadow-[0_0_0_3px_rgba(196,151,74,0.25)]" />
                    <div className={`pl-10 md:pl-0 ${i % 2 ? "md:col-start-2 md:pl-16" : "md:text-right md:pr-16"}`}>
                      <p className="font-display text-5xl font-light text-gold leading-none mb-3" style={serif}>{t.year}</p>
                      <p className="text-text-secondary text-base leading-relaxed max-w-md md:inline-block">{t.text}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COVENANT VALUES (cream) */}
      <section className="section-cream py-24 md:py-32 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <Station scene="04" name="What we stand on" tone="light" className="mb-6" />
          </ScrollReveal>
          <AnimatedText text="The Covenant Framework." tag="h2" className="font-display text-display-huge font-light text-black mb-4" style={serif} />
          <ScrollReveal delay={0.2}>
            <p className="font-display italic text-black/60 text-xl mb-14" style={serif}>Built on Covenant. Established for More.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <ScrollReveal key={v.letter + i} delay={i * 0.05}>
                <div className="pill-card bg-cream/60 border border-black/10 p-7 h-full relative overflow-hidden group hover:bg-black hover:text-cream transition-colors duration-500">
                  <span className="absolute -top-2 right-4 font-display text-7xl font-light text-gold/20 leading-none" style={serif}>{v.letter}</span>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-gold font-medium mb-3 relative z-10">{v.name}</p>
                  <p className="text-sm leading-relaxed relative z-10 text-black/70 group-hover:text-text-secondary transition-colors duration-500">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM (black) */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <Station scene="05" name="Our team" className="mb-6" />
          </ScrollReveal>
          <AnimatedText text="Small on purpose." tag="h2" className="font-display text-display-huge font-light text-cream mb-4" style={serif} />
          <ScrollReveal delay={0.2}>
            <p className="text-text-secondary text-base leading-relaxed max-w-xl mb-14">
              One person answers your calls, shoots your content, and signs off on the edit. The rest of
              the team is you.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {team.map((m, i) => (
              <ScrollReveal key={m.name} delay={i * 0.08}>
                <div className="pill-card bg-dark border border-border/40 overflow-hidden h-full group hover:border-gold/40 transition-colors duration-500">
                  <div className="relative aspect-square overflow-hidden">
                    {m.img ? (
                      <Image src={m.img} alt={m.name} fill className="object-cover object-[50%_30%] transition-transform duration-[1500ms] group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-black">
                        <span className="font-display text-8xl font-light text-gold/20 group-hover:text-gold/50 transition-colors duration-500" style={serif}>
                          {i === 1 ? "?" : i === 2 ? "+" : "&"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="font-display text-2xl text-cream leading-none mb-2" style={serif}>{m.name}</p>
                    <p className="text-[9px] tracking-[0.22em] uppercase text-gold mb-4">{m.role}</p>
                    <p className="text-sm text-text-secondary leading-relaxed">{m.bio}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS + SCRIPTURE (black) */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-black border-t border-border/40">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <Station scene="06" name="The kit" className="mb-6" />
              <p className="text-text-secondary text-base leading-relaxed mb-8 max-w-md">
                What the work gets made with. Nothing rented, nothing outsourced.
              </p>
              <div className="flex flex-wrap gap-2">
                {tools.map((t) => (
                  <span key={t} className="pill-tag pointer-events-none">{t}</span>
                ))}
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2} className="lg:col-span-7">
            <p className="font-display italic text-2xl md:text-3xl font-light text-cream leading-relaxed mb-5" style={serif}>
              &ldquo;For we are <span className="text-gold not-italic">God&apos;s handiwork</span>, created in Christ Jesus to do good works, which God prepared in advance for us to do.&rdquo;
            </p>
            <p className="text-[10px] tracking-[0.25em] uppercase text-gold">Ephesians 2:10</p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-dark border-t border-border/40">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-display-huge font-light text-cream mb-6" style={serif}>
              Let&apos;s talk about yours.
            </h2>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-10">
              A free call, twenty minutes, and an honest read on where your brand is.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                <span>Book a Free Call</span>
              </Link>
              <Link href="/portfolio" className="btn-ghost">
                <span>See the Work</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}

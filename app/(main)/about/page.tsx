"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedText from "@/components/ui/AnimatedText";

const values = [
  { letter: "C", name: "Covenant First", desc: "We honor our word above convenience and operate with unwavering commitment to every client we serve." },
  { letter: "O", name: "Operational Excellence", desc: "We build with precision, discipline, and excellence — as unto the Lord, not just the client." },
  { letter: "V", name: "Visionary Stewardship", desc: "We steward people, resources, and opportunities with foresight, responsibility, and long-term thinking." },
  { letter: "E", name: "Ethical Integrity", desc: "Our decisions are anchored in truth. Our foundation is unshakeable — no shortcuts, no compromise." },
  { letter: "N", name: "Noble Leadership", desc: "We lead with humility, accountability, and service-first authority — strength that uplifts, not overpowers." },
  { letter: "A", name: "Accountability", desc: "We take full ownership of outcomes and uphold the highest standards — to our clients and to God." },
  { letter: "N", name: "Next-Gen Mindset", desc: "We think generationally — building beyond today for those who come after us and the legacy we leave." },
  { letter: "T", name: "Trust", desc: "We cultivate trust through consistency, transparency, and faithfulness. Trust is earned here — and it is." },
];

export default function AboutPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative pt-40 md:pt-52 pb-24 md:pb-36 px-6 md:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 30%, rgba(196,151,74,0.06) 0%, transparent 60%)" }} />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="section-label mb-6 flex items-center gap-3"
          >
            <span className="block w-6 h-px bg-gold" />
            About
          </motion.p>

          <div className="max-w-4xl">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-display-xl font-light text-cream leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Built From Purpose.
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
                Not Accident.
              </motion.h1>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="text-text-secondary text-base md:text-lg leading-loose max-w-xl mt-8"
          >
            Moore Covenant Productions isn&apos;t just a media company. It&apos;s a covenant — a promise that every brand we touch will be seen, felt, and remembered.
          </motion.p>
        </div>
      </section>

      {/* ─── THE STORY ─── */}
      <section className="py-24 md:py-36 px-6 md:px-10 lg:px-16 bg-dark">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">
            {/* Photo frame */}
            <ScrollReveal direction="left">
              <div className="sticky top-32">
                <div className="relative aspect-[2/3] max-w-lg overflow-hidden border border-gold/15">
                  <Image
                    src="/IMG_2404.jpg"
                    alt="Elijah Moore — Founder, Moore Covenant Productions"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 55%, rgba(8,8,8,0.85) 100%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[9px] tracking-[0.2em] uppercase text-gold mb-1">Elijah Moore</p>
                    <p className="text-[9px] tracking-[0.14em] uppercase text-text-muted">Founder · Moore Covenant Productions</p>
                  </div>
                  <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/30" />
                  <div className="absolute bottom-16 right-4 w-6 h-6 border-b border-r border-gold/30" />
                </div>
              </div>
            </ScrollReveal>

            {/* Story text */}
            <div className="space-y-10">
              <ScrollReveal>
                <p className="section-label mb-6 flex items-center gap-3">
                  <span className="block w-6 h-px bg-gold" />
                  My Story
                </p>
                <div className="space-y-5 text-text-secondary text-sm md:text-base leading-loose">
                  <p>
                    I didn&apos;t stumble into this. I was called to it. There was a moment — not long ago — when I looked around and saw people with something real to say, businesses with something real to offer, and leaders with something real to give — but no one could see them. They were invisible. And I knew that was something I could fix.
                  </p>
                  <p>
                    I&apos;m Elijah Moore — storyteller, strategist, and founder of Moore Covenant Productions. I built this company on a covenant: a promise that every brand we touch will be seen, felt, and remembered. Faith isn&apos;t just a backdrop to what I do — it&apos;s the foundation. I believe God prepared good works for each of us in advance. My assignment is helping you show the world yours.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.12}>
                <div className="my-8 p-7 border border-gold/20 bg-gold/5">
                  <p className="text-[9px] tracking-[0.2em] uppercase text-gold mb-4">Who We Work With</p>
                  <p
                    className="font-display text-xl md:text-2xl font-light text-cream leading-snug mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Faith-driven. Open to everyone built on purpose.
                  </p>
                  <div className="space-y-3 text-text-secondary text-sm leading-loose">
                    <p>
                      Moore Covenant Productions is a faith-driven creative agency. That&apos;s where our work ethic, our standards, and our commitment to you come from. It doesn&apos;t mean we&apos;ll preach at you or turn down your project because you don&apos;t share our beliefs.
                    </p>
                    <p>
                      It means you&apos;re getting someone who takes their word seriously. The covenant isn&apos;t just a name — it&apos;s how we operate. Clients who value integrity, discipline, and work done right will always have a home here — regardless of where they stand on faith.
                    </p>
                    <p className="text-cream/80">
                      We reserve the right to decline or exit engagements that conflict with our core values. That determination is made with honesty, respect, and written notice — never without conversation.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.12}>
                <div className="border-l-2 border-gold/40 pl-6 py-2 my-8">
                  <p className="text-[9px] tracking-[0.2em] uppercase text-gold mb-4">January 2nd, 2025</p>
                  <div className="space-y-4 text-text-secondary text-sm md:text-base leading-loose italic font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    <p className="text-cream/80 text-base md:text-lg">
                      &ldquo;On January 2nd, 2025, God slowed me down faster than anything I&apos;ve ever seen.
                    </p>
                    <p>
                      I&apos;ve seen Him lift me up and drop me. I&apos;ve been broke, made wrong financial decisions, and lived a fast life. Even in my speed, God slowed me down.
                    </p>
                    <p className="text-cream/80">
                      What felt like failure became refinement. What felt like delay became direction. Moore Covenant Productions wasn&apos;t built from perfection — it was built from rebuilding.&rdquo;
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <h2
                  className="font-display text-2xl md:text-3xl font-light text-cream leading-tight mb-5"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  The results speak.
                </h2>
                <div className="space-y-4 text-text-secondary text-sm md:text-base leading-loose">
                  <p>
                    I&apos;ve helped creators, beauty brands, and entrepreneurs generate over <em className="text-cream">60 million views</em>, grow six-figure followings, and build digital presences that convert — not just impress. I don&apos;t just manage your social media. I tell your story.
                  </p>
                  <p>
                    And there is nothing more powerful than a story told right.
                  </p>
                </div>

                <blockquote
                  className="font-display text-xl italic text-cream border-l-2 border-gold pl-5 my-8 leading-snug"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  &ldquo;My story is who I am.<br />Are you ready to tell yours?&rdquo;
                </blockquote>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <h2
                  className="font-display text-2xl md:text-3xl font-light text-cream leading-tight mb-5"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Where the name comes from.
                </h2>
                <div className="space-y-4 text-text-secondary text-sm md:text-base leading-loose">
                  <p>
                    &ldquo;Moore&rdquo; is legacy — family, name, lineage. &ldquo;Covenant&rdquo; is commitment — to truth, to craft, to the people we serve. &ldquo;Productions&rdquo; is the vessel — the work, the art, the output that carries everything forward.
                  </p>
                  <p>
                    Together, it&apos;s a statement: we are building something here that matters beyond any single project.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-6 mb-8">
                  {["Faith-Driven", "Storytelling", "Social Strategy", "Brand Building", "Coaching"].map((tag) => (
                    <span key={tag} className="px-3 py-1.5 border border-gold/15 text-[10px] tracking-[0.14em] uppercase text-gold bg-gold/5">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="btn-primary">
                    <span>Work With Elijah</span>
                  </Link>
                  <Link href="/services" className="btn-ghost">
                    <span>View Services</span>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COVENANT VALUES ─── */}
      <section className="py-24 md:py-36 px-6 md:px-10 lg:px-16 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16 md:mb-20">
            <ScrollReveal>
              <p className="section-label justify-center mb-4 flex">
                <span className="block w-6 h-px bg-gold mr-3 mt-[6px]" />
                What We Stand On
              </p>
              <h2
                className="font-display text-display-lg font-light text-cream"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                The <em className="italic text-gold">Covenant</em> Framework
              </h2>
              <p
                className="font-display italic text-gold/60 mt-3 text-lg"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Built on Covenant. Established for More.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40">
            {values.map((v, i) => (
              <ScrollReveal key={v.letter + i} delay={i * 0.06} direction="up">
                <div className="bg-black p-8 md:p-10 group hover:bg-gold/5 transition-colors duration-300 relative">
                  <span
                    className="absolute top-3 right-4 font-display text-5xl font-light text-gold/10 leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {v.letter}
                  </span>
                  <p className="text-[11px] tracking-[0.16em] uppercase text-gold font-medium mb-3 relative z-10">{v.name}</p>
                  <p className="text-xs text-text-muted leading-relaxed relative z-10">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SCRIPTURE ─── */}
      <section className="py-20 md:py-28 px-6 md:px-10 lg:px-16 bg-dark border-y border-border/40">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0 items-center">
            <ScrollReveal direction="left">
              <div className="text-center py-10 lg:py-8 px-8">
                <p
                  className="font-display italic text-xl md:text-2xl font-light text-cream leading-relaxed max-w-md mx-auto mb-5"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  &ldquo;I will establish{" "}
                  <span className="text-gold not-italic">my covenant</span>{" "}
                  between me and you and your descendants after you, throughout your generations, for an everlasting covenant.&rdquo;
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-gold">Genesis 17:7</p>
              </div>
            </ScrollReveal>
            <div className="hidden lg:block bg-border/40 self-stretch" />
            <ScrollReveal direction="right">
              <div className="text-center py-10 lg:py-8 px-8 border-t border-border/40 lg:border-t-0">
                <p
                  className="font-display italic text-xl md:text-2xl font-light text-cream leading-relaxed max-w-md mx-auto mb-5"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  &ldquo;For we are{" "}
                  <span className="text-gold not-italic">God&apos;s handiwork</span>
                  , created in Christ Jesus to do good works, which God prepared in advance for us to do.&rdquo;
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-gold">Ephesians 2:10</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-32 md:py-44 px-6 md:px-10 lg:px-16 bg-black">
        <div className="max-w-[1400px] mx-auto text-center">
          <ScrollReveal>
            <p className="section-label justify-center mb-8 flex">
              <span className="block w-6 h-px bg-gold mr-3 mt-[6px]" />
              The Invitation
            </p>
            <h2
              className="font-display text-display-xl font-light text-cream leading-tight max-w-3xl mx-auto mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              If you&apos;re building something{" "}
              <em className="italic text-gold">worth remembering — we want to help.</em>
            </h2>
            <p className="text-text-secondary text-sm max-w-md mx-auto mb-8">
              Our work is selective. We choose projects we believe in, so we can give them everything we have.
            </p>
            <p className="text-sm text-text-secondary mb-8">
              Call or text directly:{" "}
              <a href="tel:3013776958" className="text-gold hover:text-gold-light transition-colors font-medium">
                (301) 377-6958
              </a>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                <span>Start the Conversation</span>
              </Link>
              <Link href="/services" className="btn-ghost">
                <span>What We Offer</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

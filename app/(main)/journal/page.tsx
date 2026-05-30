"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedText from "@/components/ui/AnimatedText";

const posts = [
  {
    slug: "legacy-over-virality",
    category: "Creative Philosophy",
    title: "Legacy Over Virality: Why We Create What We Create",
    excerpt:
      "In a world that rewards the fleeting — the trending, the viral, the algorithm-approved — we made a different choice. Here's why building for legacy still matters more than building for views.",
    readTime: "6 min read",
    date: "May 2026",
    featured: true,
  },
  {
    slug: "what-brand-storytelling-actually-means",
    category: "Brand Strategy",
    title: "What Brand Storytelling Actually Means (And What It Doesn't)",
    excerpt:
      "Everyone talks about storytelling. Few actually do it. The difference between a brand that moves people and one that just exists comes down to something simple — and most brands miss it.",
    readTime: "5 min read",
    date: "April 2026",
    featured: false,
  },
  {
    slug: "faith-and-creativity",
    category: "Personal",
    title: "Faith and Creativity: Why They Were Never Meant to Be Separate",
    excerpt:
      "I've been asked more than once why I talk about faith in a creative business. The answer is the same every time: because it's where all of this started. And everything I create reflects it.",
    readTime: "7 min read",
    date: "April 2026",
    featured: false,
  },
  {
    slug: "why-visual-identity-matters",
    category: "Brand Strategy",
    title: "The First 3 Seconds: Why Your Visual Identity Decides Everything",
    excerpt:
      "People form impressions faster than you can speak. Before your words land, your visuals have already said everything. Here's how to make sure they say the right things.",
    readTime: "4 min read",
    date: "March 2026",
    featured: false,
  },
  {
    slug: "the-art-of-the-brand-film",
    category: "Videography",
    title: "The Art of the Brand Film: More Than a Marketing Video",
    excerpt:
      "A brand film done right doesn't feel like advertising — it feels like an invitation. Here's what separates a cinematic brand story from just another video.",
    readTime: "5 min read",
    date: "March 2026",
    featured: false,
  },
  {
    slug: "building-personal-brand",
    category: "Personal Brand",
    title: "You Are the Brand: Building a Personal Identity That Attracts",
    excerpt:
      "The most powerful brands in the world today aren't companies — they're people. Coaches, creatives, pastors, entrepreneurs. Here's how to build yours with intention.",
    readTime: "6 min read",
    date: "February 2026",
    featured: false,
  },
];

export default function JournalPage() {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative pt-40 md:pt-52 pb-20 md:pb-28 px-6 md:px-10 lg:px-16 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 40% 20%, rgba(196,151,74,0.05) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="section-label mb-6"
          >
            Journal
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-display-xl font-light text-cream leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Thoughts on craft,
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
              faith, and creation.
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="text-text-secondary text-base leading-loose max-w-xl mt-8"
          >
            Reflections from behind the lens — on storytelling, brand building, faith, and what it
            means to create work that lasts.
          </motion.p>
        </div>
      </section>

      {/* ─── FEATURED POST ─── */}
      {featured && (
        <section className="px-6 md:px-10 lg:px-16 pb-12 md:pb-16">
          <div className="max-w-[1400px] mx-auto">
            <ScrollReveal>
              <div className="group relative border border-border/40 hover:border-gold/30 transition-colors duration-500 cursor-pointer">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Visual */}
                  <div
                    className="relative h-64 lg:h-auto min-h-[320px] overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #1a1208 0%, #2e2018 50%, #0e0c06 100%)",
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "radial-gradient(ellipse at 40% 50%, rgba(196,151,74,0.15) 0%, transparent 60%)",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center p-10">
                      <div className="text-center">
                        <div className="w-16 h-px bg-gold/40 mx-auto mb-6" />
                        <p
                          className="font-display text-3xl italic text-cream/30 leading-tight"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          Featured
                        </p>
                        <div className="w-16 h-px bg-gold/40 mx-auto mt-6" />
                      </div>
                    </div>
                    <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-gold/30 group-hover:border-gold/60 transition-colors duration-500" />
                    <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-gold/30 group-hover:border-gold/60 transition-colors duration-500" />
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="section-label">{featured.category}</span>
                      <span className="text-text-muted text-xs">—</span>
                      <span className="text-xs text-text-muted">{featured.date}</span>
                    </div>
                    <h2
                      className="font-display text-2xl md:text-3xl lg:text-4xl font-light text-cream leading-tight mb-5 group-hover:text-gold transition-colors duration-300"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {featured.title}
                    </h2>
                    <p className="text-text-secondary text-sm leading-loose mb-8">{featured.excerpt}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-text-muted">{featured.readTime}</span>
                      <Link
                        href={`/journal/${featured.slug}`}
                        className="text-xs tracking-widest uppercase text-gold border-b border-gold/40 hover:border-gold pb-0.5 transition-colors duration-300"
                      >
                        Read Article
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ─── POST GRID ─── */}
      <section className="px-6 md:px-10 lg:px-16 pb-32 md:pb-44">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.08} direction="up">
                <div className="group border border-border/40 hover:border-gold/30 transition-colors duration-500 cursor-pointer h-full flex flex-col">
                  {/* Visual placeholder */}
                  <div
                    className="h-44 relative overflow-hidden shrink-0"
                    style={{
                      background: `linear-gradient(135deg, #${
                        ["1a1208", "0e1218", "12100e"][i % 3]
                      } 0%, #141414 100%)`,
                    }}
                  >
                    <div
                      className="absolute inset-0 group-hover:opacity-100 opacity-0 transition-opacity duration-500"
                      style={{
                        background: "radial-gradient(ellipse at 50% 50%, rgba(196,151,74,0.08) 0%, transparent 70%)",
                      }}
                    />
                    <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-gold/20 group-hover:border-gold/50 transition-colors duration-500" />
                    <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-gold/20 group-hover:border-gold/50 transition-colors duration-500" />
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="section-label">{post.category}</span>
                      <span className="text-xs text-text-muted">{post.date}</span>
                    </div>
                    <h3
                      className="font-display text-xl md:text-2xl font-light text-cream leading-tight mb-4 group-hover:text-gold transition-colors duration-300 flex-1"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-text-secondary text-xs leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs text-text-muted">{post.readTime}</span>
                      <Link
                        href={`/journal/${post.slug}`}
                        className="text-[10px] tracking-widest uppercase text-gold border-b border-gold/40 hover:border-gold pb-0.5 transition-colors duration-300"
                      >
                        Read
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

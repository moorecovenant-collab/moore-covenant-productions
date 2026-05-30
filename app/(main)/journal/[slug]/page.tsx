"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const articles: Record<string, {
  category: string;
  title: string;
  date: string;
  readTime: string;
  body: string[];
}> = {
  "legacy-over-virality": {
    category: "Creative Philosophy",
    title: "Legacy Over Virality: Why We Create What We Create",
    date: "May 2026",
    readTime: "6 min read",
    body: [
      "In a world that rewards the fleeting — the trending, the viral, the algorithm-approved — we made a different choice. We chose legacy.",
      "Virality is a moment. Legacy is a life. A video can hit 10 million views in 48 hours and be completely forgotten in 72. But a brand built on truth, on story, on covenant — that lives. That compounds. That creates something the algorithm can't give you: permanence.",
      "At Moore Covenant Productions, we don't chase trends. We don't reverse-engineer what's popping. We ask a deeper question: What does this brand stand for? And then we build everything around that answer.",
      "There's a real tension here. Social media is a performance sport. The platforms reward volume, speed, novelty. Post more. Post faster. Post for the trend. And if you're building a business in 2025, you can't ignore those realities.",
      "But there's a difference between using the platform and being used by it. You can show up consistently, stay on trend, and still anchor every piece of content in something real. In something that will still make sense five years from now.",
      "That's what we build. Content that has a reason to exist beyond today. Stories that hold. Brands that mean something.",
      "Virality can open the door. Legacy is what makes people stay.",
      "We create for the long game — because that's the only game worth playing.",
    ],
  },
  "what-brand-storytelling-actually-means": {
    category: "Brand Strategy",
    title: "What Brand Storytelling Actually Means (And What It Doesn't)",
    date: "April 2026",
    readTime: "5 min read",
    body: [
      "Everyone talks about brand storytelling. It's become one of those phrases that sounds profound until you try to define it — and suddenly nobody agrees on what it means.",
      "Let me make it simple. Brand storytelling is not a content format. It's not a reel series. It's not a \"behind the scenes\" post. Those can be vehicles for it — but they're not the thing itself.",
      "Brand storytelling is the art of making someone feel something true about who you are and what you stand for.",
      "The key word is true. Not aspirational. Not polished. True.",
      "The brands that move people aren't the ones with the best graphics. They're the ones where you watch a 30-second video and somehow feel like you understand something real about the person behind it. You feel the conviction. You feel the sacrifice. You feel the purpose.",
      "That doesn't come from a template. It comes from doing the hard work of figuring out what you actually believe — and then having the courage to say it clearly, consistently, and in public.",
      "Most brands miss this because they skip the inner work. They want content before they've done the character work. They want strategy before they've defined their story.",
      "Start with the truth. The content will follow.",
    ],
  },
  "faith-and-creativity": {
    category: "Personal",
    title: "Faith and Creativity: Why They Were Never Meant to Be Separate",
    date: "April 2026",
    readTime: "7 min read",
    body: [
      "I've been asked more than once why I talk about faith in a creative business. The question always comes with a subtext: Isn't that a liability? Doesn't it limit your market? Doesn't it make people uncomfortable?",
      "The answer is the same every time: it's where all of this started.",
      "I didn't build Moore Covenant Productions in spite of my faith. I built it because of it. Because I believe God calls people into creative work. Because I believe the gifts we have — for storytelling, for vision, for building — are assignments, not accidents.",
      "Ephesians 2:10 says we are God's handiwork, created in Christ Jesus to do good works which God prepared in advance for us to do. I take that literally. The work I do isn't just marketing. It's stewardship.",
      "That changes everything about how I show up. It changes my standard. It changes my ethics. It changes how I treat clients. When you believe your work is a calling, not just a career, you can't cut corners. You can't just do what's easy. You have to do what's right.",
      "I also believe faith is one of the most creatively generative forces in the world. The greatest art in human history — the Sistine Chapel, Bach's cantatas, the book of Psalms — came from people who understood that creativity was a form of worship.",
      "We've been told in modern culture that faith and creativity exist in separate boxes. That bringing God into your brand makes you niche, makes you small, makes you less.",
      "I've found the exact opposite to be true.",
      "When your work is rooted in something eternal, it doesn't feel small. It feels like it matters. And that gravity is something people feel — whether they share your faith or not.",
    ],
  },
  "why-visual-identity-matters": {
    category: "Brand Strategy",
    title: "The First 3 Seconds: Why Your Visual Identity Decides Everything",
    date: "March 2026",
    readTime: "4 min read",
    body: [
      "People form impressions faster than you can speak. In fact, research consistently shows that first impressions are formed in under a second. Before you've said a word, your visuals have already said everything.",
      "This is not an argument for shallow design. It's an argument for intentional design.",
      "Your colors, your typography, your spacing, your photography style — all of it communicates something. The question is whether it's communicating what you intend.",
      "A brand that looks inconsistent communicates unreliability. A brand that looks generic communicates that it has nothing unique to say. A brand that looks cheap communicates that it doesn't value its own work — which makes it very hard for clients to value it.",
      "On the other hand, a brand that has been built with intention — where every visual choice reflects something true about the company's values and character — communicates authority before a single word is read.",
      "This is why we spend time in brand strategy before we ever open a design program. What do you want people to feel when they see you? What words describe your brand's personality? What does your ideal client dream about?",
      "The answers to those questions should drive every visual decision. Not aesthetics for aesthetics' sake. Meaning made visible.",
      "You have three seconds. Make them count.",
    ],
  },
  "the-art-of-the-brand-film": {
    category: "Videography",
    title: "The Art of the Brand Film: More Than a Marketing Video",
    date: "March 2026",
    readTime: "5 min read",
    body: [
      "A brand film done right doesn't feel like advertising. It feels like an invitation.",
      "The difference between a commercial and a brand film is intent. A commercial is trying to sell you something. A brand film is trying to show you something. It says: here is who we are, here is what we believe, here is why we do what we do — and if that resonates with you, we'd love to build something together.",
      "The best brand films don't even mention the product for most of their runtime. They build a world. They establish a feeling. They make you want to be part of what this brand is building.",
      "Think of the most memorable brand work you've ever seen. Chances are it didn't lead with features. It led with feeling.",
      "That's what we're trying to capture when we make a brand film. The soul of the brand — the thing that can't be communicated in a bullet point or a tagline.",
      "It requires the brand to be honest. You can't make a compelling film about a brand that doesn't know what it stands for. The camera finds truth. If the foundation isn't there, the film will feel hollow.",
      "But when the story is real — when the founder actually believes what they're saying, when the product actually solves a real problem, when the mission is genuine — a brand film becomes something extraordinary.",
      "It becomes evidence. Proof of conviction. A reason to believe.",
    ],
  },
  "building-personal-brand": {
    category: "Personal Brand",
    title: "You Are the Brand: Building a Personal Identity That Attracts",
    date: "February 2026",
    readTime: "6 min read",
    body: [
      "The most powerful brands in the world right now aren't companies. They're people.",
      "Coaches, creatives, pastors, entrepreneurs, athletes — the individuals who've built loyal audiences aren't doing it because they have better products. They're doing it because they've made themselves legible. You understand what they stand for. You know their story. You trust them.",
      "That's what a personal brand does. It makes you findable. It makes you trustworthy. It makes you memorable.",
      "But here's what most people get wrong: they think a personal brand is about marketing yourself. It's not. It's about clarifying yourself.",
      "The work of building a personal brand starts before the cameras come on, before the bio is written, before the content calendar is planned. It starts with the question: Who am I, actually? What do I believe? What am I building? Who am I building it for?",
      "Most people skip this because it's uncomfortable. It requires honesty. It requires knowing what you're not as much as what you are.",
      "But when you do this work, something remarkable happens. Everything gets easier. The content becomes easier because you know what to say. The offers become clearer because you know who you're serving. The positioning becomes obvious because you know what you uniquely provide.",
      "Your story is the asset. Your perspective is the differentiator. No one can replicate being you — if you're actually willing to be you.",
      "Build the brand that's already inside you. The world needs to see it.",
    ],
  },
};

export default function JournalArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const article = articles[slug];

  if (!article) {
    notFound();
  }

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative pt-40 md:pt-52 pb-16 md:pb-20 px-6 md:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 40% 20%, rgba(196,151,74,0.05) 0%, transparent 60%)" }} />
        <div className="max-w-[800px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center gap-4 mb-8"
          >
            <Link
              href="/journal"
              className="text-[10px] tracking-[0.16em] uppercase text-text-muted hover:text-gold transition-colors duration-300"
            >
              ← Journal
            </Link>
            <span className="text-border/60">·</span>
            <span className="section-label">{article.category}</span>
            <span className="text-border/60">·</span>
            <span className="text-xs text-text-muted">{article.date}</span>
            <span className="text-border/60">·</span>
            <span className="text-xs text-text-muted">{article.readTime}</span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-cream leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {article.title}
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center gap-3 mt-8"
          >
            <div className="w-7 h-7 rounded-full border border-gold flex items-center justify-center shrink-0">
              <span className="font-display text-sm text-gold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>E</span>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.14em] uppercase text-cream">Elijah Moore</p>
              <p className="text-[9px] tracking-[0.1em] uppercase text-text-muted">Founder · Moore Covenant Productions</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div className="px-6 md:px-10 lg:px-16">
        <div className="max-w-[800px] mx-auto">
          <div className="h-px bg-border/40" />
        </div>
      </div>

      {/* ─── BODY ─── */}
      <section className="px-6 md:px-10 lg:px-16 py-16 md:py-24 pb-32 md:pb-44">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-7"
          >
            {article.body.map((paragraph, i) => (
              <p
                key={i}
                className={`leading-loose text-text-secondary ${
                  i === 0
                    ? "text-base md:text-lg text-cream/90 font-light"
                    : "text-sm md:text-base"
                }`}
                style={i === 0 ? { fontFamily: "'Cormorant Garamond', serif" } : {}}
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 pt-10 border-t border-border/40"
          >
            <p
              className="font-display italic text-gold/60 text-lg mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              &ldquo;My story is who I am. Are you ready to tell yours?&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary">
                <span>Work With Us</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="relative z-10">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link href="/journal" className="btn-ghost">
                <span>More Articles</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

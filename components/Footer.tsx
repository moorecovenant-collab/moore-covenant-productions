"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";

const serif = { fontFamily: "'Cormorant Garamond', serif" };

const partners = [
  { name: "Market Research Design LLC", note: "Unique Brand Solutions", href: "https://mrdubs.com/" as string | null },
  { name: "AMD Branding", note: "Design your future", href: "https://www.instagram.com/amdbranding" as string | null },
  { name: "Sam Studios", note: "Photography", href: "https://thesamstudio.mypixieset.com/portfolio/" as string | null },
];

const socials = [
  { label: "Instagram", handle: "@moore.covenant", href: "https://instagram.com/moore.covenant" },
  { label: "LinkedIn", handle: "Elijah Moore", href: "https://www.linkedin.com/in/elijah-moore-366b493a8" },
  { label: "YouTube", handle: "@moorefavor", href: "https://youtube.com/@moorefavor" },
  { label: "TikTok", handle: "@moorefavor", href: "https://tiktok.com/@moorefavor" },
];

const credits = [
  ["Founder & Creative Director", "Elijah Moore"],
  ["Based in", "Washington, DC"],
  ["Serving", "DC, Maryland, Virginia, and anywhere with a signal"],
  ["Established", "On faith"],
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-border/40 relative overflow-hidden">
      {/* END CREDITS */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-20 md:pt-28 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10">
          {/* Left: mark + line */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-8">
              <Logo size={64} />
            </Link>
            <p className="font-display text-3xl md:text-4xl font-light text-cream leading-tight max-w-md" style={serif}>
              Let&apos;s build something <em className="italic text-gold">worth remembering.</em>
            </p>
            <Link href="/contact" className="btn-primary mt-8">
              <span>Start a Conversation</span>
            </Link>
          </div>

          {/* Right: credits roll */}
          <div className="lg:col-span-7 lg:pl-10">
            <p className="text-[9px] tracking-[0.3em] uppercase text-gold mb-6">Credits</p>
            <dl className="divide-y divide-border/40 border-y border-border/40">
              {credits.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[1fr_1.4fr] gap-6 py-3">
                  <dt className="text-[10px] tracking-[0.2em] uppercase text-text-muted">{k}</dt>
                  <dd className="text-sm text-cream" style={serif}>{v}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[1fr_1.4fr] gap-6 py-3">
                <dt className="text-[10px] tracking-[0.2em] uppercase text-text-muted">Covenant partners</dt>
                <dd className="text-sm text-cream space-y-1" style={serif}>
                  {partners.map((p) =>
                    p.href ? (
                      <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="block hover:text-gold transition-colors">
                        {p.name} <span className="text-text-muted">· {p.note}</span>
                      </a>
                    ) : (
                      <span key={p.name} className="block">
                        {p.name} <span className="text-text-muted">· {p.note}</span>
                      </span>
                    )
                  )}
                </dd>
              </div>
              <div className="grid grid-cols-[1fr_1.4fr] gap-6 py-3">
                <dt className="text-[10px] tracking-[0.2em] uppercase text-text-muted">Find us</dt>
                <dd className="text-sm text-cream flex flex-wrap gap-x-5 gap-y-1" style={serif}>
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                      {s.label}
                    </a>
                  ))}
                </dd>
              </div>
              <div className="grid grid-cols-[1fr_1.4fr] gap-6 py-3">
                <dt className="text-[10px] tracking-[0.2em] uppercase text-text-muted">Contact</dt>
                <dd className="text-sm text-cream flex flex-wrap gap-x-5 gap-y-1" style={serif}>
                  <a href="tel:2024075248" className="hover:text-gold transition-colors">(202) 407-5248</a>
                  <a href="mailto:moorecovenant@gmail.com" className="hover:text-gold transition-colors break-all">moorecovenant@gmail.com</a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-6 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] tracking-[0.18em] uppercase text-text-muted">
            <span className="text-gold">Moore Covenant Productions</span> &copy; {year}
          </p>
          <p className="text-[10px] tracking-[0.18em] uppercase text-text-muted">
            Built on Covenant. Established for More.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/app" className="text-[10px] tracking-[0.18em] uppercase text-text-muted hover:text-gold transition-colors">
              Client app
            </Link>
            <Link href="/pay" className="text-[10px] tracking-[0.18em] uppercase text-text-muted hover:text-gold transition-colors">
              Make a payment
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

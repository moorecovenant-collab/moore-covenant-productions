export default function ComingSoon({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-charcoal p-6">
      <p className="text-[10px] uppercase tracking-[0.2em] text-gold mb-3">Opening soon</p>
      <h2 className="font-display text-2xl text-cream mb-2">{title}</h2>
      <p className="text-sm leading-relaxed text-text-secondary">{children}</p>
    </div>
  );
}

export default function PageHeader({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <header className="mb-6">
      {eyebrow && <p className="text-[10px] uppercase tracking-[0.2em] text-text-secondary mb-2">{eyebrow}</p>}
      <h1 className="font-display text-4xl leading-tight text-cream">{title}</h1>
    </header>
  );
}

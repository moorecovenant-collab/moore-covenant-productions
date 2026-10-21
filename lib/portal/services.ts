/** What a new client can ask for. Prices mirror the services page; the owner sets the real amount when approving. */
export type Service = { id: string; label: string; price: string; suggestedCents: number; note: string };

export const SERVICES: Service[] = [
  { id: "social-starter", label: "Social Media: Starter", price: "$1,500/mo", suggestedCents: 150_000, note: "3 posts a week, calendar, captions, engagement. 3 month minimum." },
  { id: "social-growth", label: "Social Media: Growth", price: "$2,750/mo", suggestedCents: 275_000, note: "5 posts a week on 2 platforms, reels, one content day a month. Most popular." },
  { id: "social-sovereign", label: "Social Media: Sovereign", price: "$5,000/mo", suggestedCents: 500_000, note: "Daily posting, two content days a month, brand films, paid ads." },
  { id: "content-day", label: "Content Day", price: "from $1,500", suggestedCents: 150_000, note: "A full day on site. Weeks of reels, photos, and B-roll you own." },
  { id: "website", label: "Website", price: "from $1,000", suggestedCents: 100_000, note: "A custom site. Final scope and price are set on a call." },
  { id: "care-plan", label: "Website Care Plan", price: "$150/mo", suggestedCents: 15_000, note: "Hosting, updates, security, small edits." },
  { id: "coaching", label: "Covenant Coaching", price: "from $20/mo", suggestedCents: 2_000, note: "A monthly group coaching call for creators and small businesses." },
  { id: "other", label: "Something else / not sure", price: "quoted", suggestedCents: 0, note: "Tell us what you need and Elijah will scope it." },
];

export const serviceLabel = (id: string | null | undefined) => SERVICES.find((s) => s.id === id)?.label ?? id ?? "";

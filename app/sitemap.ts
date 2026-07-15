import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://moorecovenantproductions.com";

  const routes = [
    { path: "", priority: 1.0 },
    { path: "/about", priority: 0.9 },
    { path: "/services", priority: 0.9 },
    { path: "/portfolio", priority: 0.8 },
    { path: "/photography", priority: 0.7 },
    { path: "/journal", priority: 0.8 },
    { path: "/contact", priority: 0.9 },
    { path: "/journal/legacy-over-virality", priority: 0.6 },
    { path: "/journal/what-brand-storytelling-actually-means", priority: 0.6 },
    { path: "/journal/faith-and-creativity", priority: 0.6 },
    { path: "/journal/why-visual-identity-matters", priority: 0.6 },
    { path: "/journal/the-art-of-the-brand-film", priority: 0.6 },
    { path: "/journal/building-personal-brand", priority: 0.6 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
  }));
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const AMBER = "#C8860A";
const AMBER_LIGHT = "#E8A030";
const CREAM = "#EEE7D8";
const MUTED = "#7a7570";
const BORDER = "rgba(200,134,10,0.15)";

function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const pillars = [
  {
    num: "01",
    title: "Transformation",
    subtitle: "Avant / Après",
    desc: "Les comparaisons avant/après sont le contenu le plus viral pour un salon. Départ twist, entretien, styling — chaque session est une story.",
    formats: ["Vidéo Reel 15–30s", "Carrousel 2 photos", "Story séquencée"],
    freq: "3× / semaine",
    color: AMBER,
  },
  {
    num: "02",
    title: "Éducation",
    subtitle: "Tips & Conseils",
    desc: "Partage ton expertise: comment entretenir ses locks, les produits recommandés, la fréquence d'entretien. Tu deviens la référence.",
    formats: ["Vidéo tuto 30–60s", "Carrousel informatif", "Story Q&A"],
    freq: "2× / semaine",
    color: "#9B7D3A",
  },
  {
    num: "03",
    title: "Coulisses",
    subtitle: "Behind the Scenes",
    desc: "Les gens achètent la personne autant que le service. Montre ton espace, ta routine, tes outils, tes moments authentiques.",
    formats: ["Story quotidienne", "Reel vibe/ambiance", "Photo lifestyle"],
    freq: "4–5 Stories/jour",
    color: "#7a6030",
  },
  {
    num: "04",
    title: "Témoignages",
    subtitle: "Social Proof",
    desc: "Les avis clients et les réactions de satisfaction sont du marketing gratuit. Capture ces moments — ils convertissent.",
    formats: ["Vidéo client content", "Screenshot DM/avis", "Reel réaction"],
    freq: "1× / semaine",
    color: "#5a8035",
  },
];

const schedule = [
  { day: "Lun", type: "Éducation", content: "Conseil: Comment maintenir ses locks à la maison", format: "Carrousel" },
  { day: "Mar", type: "Transformation", content: "Résultat session du week-end (avant/après)", format: "Reel" },
  { day: "Mer", type: "Coulisses", content: "Story: ta journée, ton espace, ambiance", format: "Story" },
  { day: "Jeu", type: "Transformation", content: "Close-up travail de précision sur un client", format: "Reel" },
  { day: "Ven", type: "Éducation", content: "Produit de la semaine / recommandation", format: "Carrousel" },
  { day: "Sam", type: "Témoignage", content: "Client satisfait + son résultat", format: "Reel/Story" },
  { day: "Dim", type: "Repos", content: "Pas de post — recharge", format: "—" },
];

const growth = [
  {
    title: "Hashtag Strategy",
    items: [
      "#LocksLife #DreadsParis #LocksParis",
      "#NaturalHair #LocsNaturels #TwistStarter",
      "#CoiffeurParis #VilleneuveSaintGeorges",
      "#Dreads #LocStyle #BlackHair",
      "5–8 hashtags ciblés > 20 hashtags génériques",
    ],
  },
  {
    title: "Engagement Tactics",
    items: [
      "Répondre aux commentaires dans les 2h",
      "Utiliser les sondages Story 3× / semaine",
      "Question box: «Quel est ton plus grand problème avec tes locks?»",
      "Republier les tags clients en Story",
      "DM de remerciement après chaque post client",
    ],
  },
  {
    title: "Optimisation Profil",
    items: [
      "Bio claire: service + ville + CTA (lien réservation)",
      "Photo de profil: toi ou ton meilleur avant/après",
      "Highlights: Services · Transformations · Tarifs · Avis",
      "Lien: site de réservation direct",
      "Username + nom: inclure «Locks Paris»",
    ],
  },
  {
    title: "Collaboration & Reach",
    items: [
      "Tag les clients dans les posts (avec permission)",
      "Collaboration avec barbershops locaux",
      "Partenariat avec influenceurs lifestyle Paris",
      "Contenu en duo avec d'autres coiffeurs naturels",
      "Présence sur TikTok pour capter 18–25 ans",
    ],
  },
];

const kpis = [
  { metric: "Reach Mensuel", target: "+40% en 90 jours", current: "~2,000–5,000" },
  { metric: "Abonnés", target: "+500/mois → 10K objectif", current: "7,304" },
  { metric: "Taux Engagement", target: "4–8% (excellente niche)", current: "À mesurer" },
  { metric: "Réservations via Insta", target: "10+ / semaine", current: "À tracker" },
];

export default function ContentPlanPage() {
  return (
    <div className="min-h-screen pt-24 pb-20" style={{ backgroundColor: "#0A0A08" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-14">

        {/* Header */}
        <div className="mb-16 md:mb-24 pb-12 md:pb-16" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px" style={{ background: AMBER }} />
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: AMBER }}>
                Stratégie de Contenu · Moore Covenant Productions
              </span>
            </div>
            <h1
              className="font-light leading-tight mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", color: CREAM }}
            >
              Plan de Contenu<br />
              <em style={{ color: AMBER }}>Ratty Locks</em>
            </h1>
            <p className="text-sm leading-relaxed max-w-xl mb-8" style={{ color: MUTED }}>
              Stratégie complète sur 90 jours pour structurer la présence Instagram de Ratty Locks, doubler l&apos;engagement et transformer les abonnés en clients récurrents.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Instagram First", "90 Jours", "7K → 10K Followers", "Réservations +50%"].map((tag) => (
                <span key={tag} style={{ padding: "6px 14px", border: `1px solid ${AMBER}25`, fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: AMBER, backgroundColor: `${AMBER}08` }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Audit rapide */}
        <Section>
          <div className="mb-16 md:mb-24">
            <p className="flex items-center gap-3 mb-8" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: AMBER }}>
              <span className="block w-6 h-px" style={{ background: AMBER }} />
              État des Lieux
            </p>
            <h2
              className="font-light mb-10"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: CREAM }}
            >
              Audit du Compte Actuel
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: BORDER }}>
              <div className="p-8" style={{ backgroundColor: "#0D0D0B" }}>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5a8035", marginBottom: "0.75rem" }}>
                  ✓ Points Forts
                </p>
                <ul className="space-y-3">
                  {[
                    "7,304 abonnés — base solide pour la niche",
                    "436 posts — historique et crédibilité",
                    "Travail de qualité visible dans les photos",
                    "Présence locale forte (Paris / VSG)",
                    "Contacts clairs dans la bio (tel + WhatsApp)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span style={{ color: "#5a8035", fontSize: "0.75rem", marginTop: "2px" }}>—</span>
                      <span className="text-sm" style={{ color: MUTED }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8" style={{ backgroundColor: "#0D0D0B" }}>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: AMBER, marginBottom: "0.75rem" }}>
                  ◈ Opportunités
                </p>
                <ul className="space-y-3">
                  {[
                    "Pas de lien de réservation directe dans la bio",
                    "Peu de contenu éducatif (attire de nouveaux abonnés)",
                    "Highlights Instagram non optimisés",
                    "Aucune présence TikTok visible",
                    "Pas de stratégie hashtag visible",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span style={{ color: AMBER, fontSize: "0.75rem", marginTop: "2px" }}>—</span>
                      <span className="text-sm" style={{ color: MUTED }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Content Pillars */}
        <Section delay={0.05}>
          <div className="mb-16 md:mb-24">
            <p className="flex items-center gap-3 mb-8" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: AMBER }}>
              <span className="block w-6 h-px" style={{ background: AMBER }} />
              Architecture du Contenu
            </p>
            <h2
              className="font-light mb-10"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: CREAM }}
            >
              Les 4 Piliers de Contenu
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: BORDER }}>
              {pillars.map((p) => (
                <div key={p.num} className="p-8 md:p-10 relative" style={{ backgroundColor: "#0A0A08" }}>
                  <span
                    className="absolute top-5 right-7 font-light"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "4rem", color: `${AMBER}06`, lineHeight: 1 }}
                  >
                    {p.num}
                  </span>
                  <div className="flex items-center gap-3 mb-4">
                    <span style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: AMBER }}>
                      {p.num}
                    </span>
                    <span style={{ fontSize: "0.55rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#4a4540" }}>
                      {p.freq}
                    </span>
                  </div>
                  <h3
                    className="font-light mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: CREAM }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: AMBER, marginBottom: "0.875rem" }}>
                    {p.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: MUTED }}>{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.formats.map((f) => (
                      <span key={f} style={{ padding: "4px 10px", border: `1px solid ${AMBER}20`, fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: `${AMBER}80`, backgroundColor: `${AMBER}06` }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Weekly Schedule */}
        <Section delay={0.08}>
          <div className="mb-16 md:mb-24">
            <p className="flex items-center gap-3 mb-8" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: AMBER }}>
              <span className="block w-6 h-px" style={{ background: AMBER }} />
              Planning
            </p>
            <h2
              className="font-light mb-10"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: CREAM }}
            >
              Calendrier Éditorial — Type
            </h2>
            <div style={{ border: `1px solid ${BORDER}` }}>
              <div className="grid grid-cols-4 px-6 py-3" style={{ backgroundColor: "#0D0D0B", borderBottom: `1px solid ${BORDER}` }}>
                {["Jour", "Pilier", "Contenu", "Format"].map((h) => (
                  <p key={h} style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#5a5550" }}>{h}</p>
                ))}
              </div>
              {schedule.map((row, i) => (
                <div
                  key={row.day}
                  className="grid grid-cols-4 px-6 py-4 transition-colors duration-200"
                  style={{
                    backgroundColor: i % 2 === 0 ? "#0A0A08" : "#0D0D0B",
                    borderBottom: i < schedule.length - 1 ? `1px solid rgba(200,134,10,0.06)` : "none",
                    opacity: row.type === "Repos" ? 0.45 : 1,
                  }}
                >
                  <p className="text-sm font-medium" style={{ color: row.type === "Repos" ? "#4a4540" : CREAM }}>{row.day}</p>
                  <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", color: row.type === "Transformation" ? AMBER : row.type === "Éducation" ? AMBER_LIGHT : row.type === "Coulisses" ? "#9a8560" : row.type === "Témoignage" ? "#5a8035" : "#4a4540", textTransform: "uppercase" }}>
                    {row.type}
                  </p>
                  <p className="text-xs pr-4" style={{ color: MUTED }}>{row.content}</p>
                  <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", color: "#5a5550" }}>{row.format}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Growth Tactics */}
        <Section delay={0.1}>
          <div className="mb-16 md:mb-24">
            <p className="flex items-center gap-3 mb-8" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: AMBER }}>
              <span className="block w-6 h-px" style={{ background: AMBER }} />
              Tactiques de Croissance
            </p>
            <h2
              className="font-light mb-10"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: CREAM }}
            >
              4 Leviers de Croissance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: BORDER }}>
              {growth.map((g) => (
                <div key={g.title} className="p-8" style={{ backgroundColor: "#0A0A08" }}>
                  <h3
                    className="font-light mb-5"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", color: AMBER_LIGHT }}
                  >
                    {g.title}
                  </h3>
                  <ul className="space-y-3">
                    {g.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span style={{ color: AMBER, fontSize: "0.6rem", marginTop: "3px" }}>→</span>
                        <span className="text-sm" style={{ color: MUTED }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* KPIs */}
        <Section delay={0.12}>
          <div className="mb-16 md:mb-24">
            <p className="flex items-center gap-3 mb-8" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: AMBER }}>
              <span className="block w-6 h-px" style={{ background: AMBER }} />
              Objectifs & Mesure
            </p>
            <h2
              className="font-light mb-10"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: CREAM }}
            >
              KPIs sur 90 Jours
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: BORDER }}>
              {kpis.map((k) => (
                <div key={k.metric} className="p-8 text-center" style={{ backgroundColor: "#0A0A08" }}>
                  <p style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#5a5550", marginBottom: "0.5rem" }}>
                    {k.metric}
                  </p>
                  <p
                    className="font-light mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: AMBER_LIGHT, lineHeight: 1.3 }}
                  >
                    {k.target}
                  </p>
                  <p style={{ fontSize: "0.6rem", color: "#4a4540" }}>Actuellement: {k.current}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section delay={0.14}>
          <div
            className="p-10 md:p-14 text-center"
            style={{ border: `1px solid ${BORDER}`, backgroundColor: "#0D0D0B" }}
          >
            <p className="flex items-center justify-center gap-3 mb-6" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: AMBER }}>
              <span className="block w-6 h-px" style={{ background: AMBER }} />
              Prêt à passer à la vitesse supérieure?
            </p>
            <h2
              className="font-light mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: CREAM }}
            >
              Moore Covenant Productions<br />
              <em style={{ color: AMBER }}>s&apos;occupe de tout.</em>
            </h2>
            <p className="text-sm leading-relaxed mb-8 max-w-lg mx-auto" style={{ color: MUTED }}>
              Création de contenu, gestion des réseaux, stratégie et site web — tu te concentres sur tes locks, on se charge du reste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 transition-all duration-300"
                style={{
                  padding: "1rem 2.5rem",
                  border: `1px solid ${AMBER}`,
                  color: AMBER,
                  fontSize: "0.7rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                Démarrer la Collaboration
              </Link>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}

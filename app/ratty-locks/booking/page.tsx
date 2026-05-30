"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const AMBER = "#C8860A";
const AMBER_LIGHT = "#E8A030";
const CREAM = "#EEE7D8";
const MUTED = "#7a7570";
const BORDER = "rgba(200,134,10,0.15)";

const services = [
  {
    id: "depart-twist",
    title: "Départ Twist",
    sub: "Starter Locs",
    duration: "3 – 5h",
    price: "À partir de 120€",
    desc: "Installation de locks depuis zéro.",
  },
  {
    id: "entretien",
    title: "Entretien & Retwist",
    sub: "Maintenance",
    duration: "2 – 3h",
    price: "À partir de 80€",
    desc: "Retwist complet et soin des pointes.",
  },
  {
    id: "coiffure",
    title: "Coiffure Créative",
    sub: "Locks Styling",
    duration: "1 – 2h",
    price: "À partir de 60€",
    desc: "Coiffures élaborées et designs gravés.",
  },
  {
    id: "reparation",
    title: "Réparation",
    sub: "Repair & Finish",
    duration: "1 – 3h",
    price: "À partir de 50€",
    desc: "Remise en forme des locks abîmées.",
  },
  {
    id: "combo",
    title: "Combo Complet",
    sub: "Full Session",
    duration: "3 – 4h",
    price: "À partir de 130€",
    desc: "Entretien complet + coiffure créative.",
  },
  {
    id: "consultation",
    title: "Consultation",
    sub: "Conseil Perso",
    duration: "30 min",
    price: "25€",
    desc: "Conseil personnalisé et bilan de tes locks.",
  },
];

const timeSlots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:30"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTHS_FR = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const DAYS_FR = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

function Calendar({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (d: string) => void;
}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const days = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center transition-colors duration-200" style={{ color: MUTED, border: `1px solid ${BORDER}` }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = AMBER; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = MUTED; }}>
          ‹
        </button>
        <p className="font-light text-lg" style={{ fontFamily: "'Cormorant Garamond', serif", color: CREAM }}>
          {MONTHS_FR[viewMonth]} {viewYear}
        </p>
        <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center transition-colors duration-200" style={{ color: MUTED, border: `1px solid ${BORDER}` }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = AMBER; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = MUTED; }}>
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {DAYS_FR.map((d) => (
          <div key={d} className="text-center py-1" style={{ fontSize: "0.6rem", letterSpacing: "0.14em", color: "#5a5550" }}>
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isPast = dateStr < todayStr;
          const isSunday = new Date(viewYear, viewMonth, day).getDay() === 0;
          const isDisabled = isPast || isSunday;
          const isSelected = selected === dateStr;
          const isToday = dateStr === todayStr;

          return (
            <button
              key={day}
              disabled={isDisabled}
              onClick={() => onSelect(dateStr)}
              className="w-full aspect-square flex items-center justify-center text-sm transition-all duration-200"
              style={{
                fontSize: "0.75rem",
                cursor: isDisabled ? "not-allowed" : "pointer",
                color: isSelected ? "#0a0a08" : isDisabled ? "#2a2820" : isToday ? AMBER_LIGHT : CREAM,
                backgroundColor: isSelected ? AMBER : "transparent",
                border: isToday && !isSelected ? `1px solid ${AMBER}50` : "1px solid transparent",
                opacity: isDisabled ? 0.35 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isDisabled && !isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = `${AMBER}15`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                }
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
};

const STEPS = ["Service", "Date & Heure", "Vos Infos", "Confirmation"];

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({ firstName: "", lastName: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const serviceObj = services.find((s) => s.id === selectedService);

  const formatDate = (d: string) => {
    const [y, m, day] = d.split("-");
    return `${day} ${MONTHS_FR[parseInt(m) - 1]} ${y}`;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const canNext = () => {
    if (step === 0) return !!selectedService;
    if (step === 1) return !!selectedDate && !!selectedTime;
    if (step === 2) return form.firstName && form.lastName && form.phone && form.email;
    return true;
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6 pt-20"
        style={{ backgroundColor: "#0A0A08" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-lg w-full py-20"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8"
            style={{ border: `1px solid ${AMBER}`, backgroundColor: `${AMBER}10` }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5L19 7" stroke={AMBER} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: AMBER, marginBottom: "1rem" }}>
            Réservation Confirmée
          </p>
          <h1
            className="font-light mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", color: CREAM }}
          >
            À très bientôt,<br />
            <em style={{ color: AMBER }}>{form.firstName}</em>
          </h1>
          <p className="text-sm leading-relaxed mb-2" style={{ color: MUTED }}>
            Ta réservation a bien été enregistrée.
          </p>
          <div className="my-8 p-6 text-left" style={{ border: `1px solid ${BORDER}`, backgroundColor: "#0D0D0B" }}>
            <div className="space-y-3">
              {[
                ["Service", serviceObj?.title],
                ["Date", selectedDate ? formatDate(selectedDate) : ""],
                ["Heure", selectedTime],
                ["Durée estimée", serviceObj?.duration],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between">
                  <span style={{ fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5a5550" }}>{label}</span>
                  <span className="text-sm" style={{ color: CREAM }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs mb-8" style={{ color: MUTED }}>
            Un message de confirmation sera envoyé sur <span style={{ color: CREAM }}>{form.phone}</span>.<br />
            Pour toute question: <a href="https://wa.me/330983328241" style={{ color: AMBER }}>WhatsApp 09 83 32 82 41</a>
          </p>
          <Link
            href="/ratty-locks"
            className="inline-flex items-center gap-3 transition-all duration-300"
            style={{
              padding: "0.875rem 2rem",
              border: `1px solid ${AMBER}`,
              color: AMBER,
              fontSize: "0.65rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Retour à l&apos;Accueil
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-10" style={{ backgroundColor: "#0A0A08" }}>
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="flex items-center gap-3 mb-4" style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: AMBER }}>
              <span className="block w-6 h-px" style={{ background: AMBER }} />
              Réservation en Ligne
            </p>
            <h1
              className="font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: CREAM }}
            >
              Prends ton Rendez-Vous
            </h1>
          </motion.div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-0 mb-12 md:mb-16 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex items-center gap-2 shrink-0">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-400"
                  style={{
                    border: `1px solid ${i <= step ? AMBER : "#2a2a28"}`,
                    backgroundColor: i < step ? AMBER : i === step ? `${AMBER}15` : "transparent",
                  }}
                >
                  {i < step ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 2.5" stroke="#0a0a08" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <span style={{ fontSize: "0.55rem", color: i === step ? AMBER : "#4a4540" }}>{i + 1}</span>
                  )}
                </div>
                <span
                  className="hidden sm:block"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: i === step ? AMBER : i < step ? "#7a7570" : "#3a3a38",
                  }}
                >
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className="w-8 sm:w-16 h-px mx-2"
                  style={{ backgroundColor: i < step ? `${AMBER}40` : "#1e1e1c" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* ── Step 0: Service ── */}
            {step === 0 && (
              <div>
                <h2 className="font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: CREAM }}>
                  Quelle prestation tu veux?
                </h2>
                <p className="text-sm mb-8" style={{ color: MUTED }}>Sélectionne un service pour continuer.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: BORDER }}>
                  {services.map((s) => {
                    const isSelected = selectedService === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSelectedService(s.id)}
                        className="text-left p-6 transition-all duration-300"
                        style={{
                          backgroundColor: isSelected ? "#161410" : "#0A0A08",
                          outline: "none",
                        }}
                        onMouseEnter={(e) => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#111108"; }}
                        onMouseLeave={(e) => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0A0A08"; }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <p style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: isSelected ? AMBER : "#5a5550" }}>
                            {s.sub}
                          </p>
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                            style={{
                              border: `1px solid ${isSelected ? AMBER : "#2a2a28"}`,
                              backgroundColor: isSelected ? AMBER : "transparent",
                            }}
                          >
                            {isSelected && (
                              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                <path d="M1.5 4l1.5 1.5L6.5 2" stroke="#0a0a08" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <h3
                          className="font-light mb-2"
                          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: isSelected ? AMBER_LIGHT : CREAM }}
                        >
                          {s.title}
                        </h3>
                        <p className="text-xs leading-relaxed mb-4" style={{ color: MUTED }}>{s.desc}</p>
                        <div className="flex items-center justify-between">
                          <p style={{ fontSize: "0.6rem", letterSpacing: "0.12em", color: isSelected ? AMBER : MUTED }}>
                            {s.price}
                          </p>
                          <p style={{ fontSize: "0.6rem", letterSpacing: "0.12em", color: "#4a4540" }}>
                            {s.duration}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Step 1: Date & Time ── */}
            {step === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                <div>
                  <h2 className="font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: CREAM }}>
                    Choisis une date
                  </h2>
                  <p className="text-sm mb-8" style={{ color: MUTED }}>Les dimanches ne sont pas disponibles.</p>
                  <div className="p-6" style={{ backgroundColor: "#0D0D0B", border: `1px solid ${BORDER}` }}>
                    <Calendar selected={selectedDate} onSelect={setSelectedDate} />
                  </div>
                </div>

                <div>
                  <h2 className="font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: CREAM }}>
                    {selectedDate ? `Créneaux — ${formatDate(selectedDate)}` : "Choisis une heure"}
                  </h2>
                  <p className="text-sm mb-8" style={{ color: MUTED }}>
                    {selectedDate ? "Sélectionne ton créneau horaire." : "Sélectionne une date pour voir les créneaux."}
                  </p>
                  {selectedDate && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                      {timeSlots.map((t) => {
                        const isSelected = selectedTime === t;
                        return (
                          <button
                            key={t}
                            onClick={() => setSelectedTime(t)}
                            className="py-3 px-4 text-sm transition-all duration-200"
                            style={{
                              border: `1px solid ${isSelected ? AMBER : BORDER}`,
                              backgroundColor: isSelected ? `${AMBER}15` : "transparent",
                              color: isSelected ? AMBER_LIGHT : CREAM,
                              fontSize: "0.8rem",
                              fontFamily: "var(--font-inter)",
                              cursor: "pointer",
                            }}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Step 2: Personal Info ── */}
            {step === 2 && (
              <div className="max-w-xl">
                <h2 className="font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: CREAM }}>
                  Tes informations
                </h2>
                <p className="text-sm mb-8" style={{ color: MUTED }}>Remplis tes coordonnées pour confirmer le rendez-vous.</p>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    {(["firstName", "lastName"] as const).map((field) => (
                      <div key={field}>
                        <label
                          className="block mb-2"
                          style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: AMBER }}
                        >
                          {field === "firstName" ? "Prénom *" : "Nom *"}
                        </label>
                        <input
                          type="text"
                          value={form[field]}
                          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                          placeholder={field === "firstName" ? "Ton prénom" : "Ton nom"}
                          className="w-full px-4 py-3 text-sm outline-none transition-all duration-200"
                          style={{
                            backgroundColor: "#0D0D0B",
                            border: `1px solid ${BORDER}`,
                            color: CREAM,
                            fontSize: "0.85rem",
                          }}
                          onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = `${AMBER}60`; }}
                          onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = BORDER; }}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block mb-2" style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: AMBER }}>
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="06 XX XX XX XX"
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-200"
                      style={{ backgroundColor: "#0D0D0B", border: `1px solid ${BORDER}`, color: CREAM, fontSize: "0.85rem" }}
                      onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = `${AMBER}60`; }}
                      onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = BORDER; }}
                    />
                  </div>
                  <div>
                    <label className="block mb-2" style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: AMBER }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="ton@email.com"
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-200"
                      style={{ backgroundColor: "#0D0D0B", border: `1px solid ${BORDER}`, color: CREAM, fontSize: "0.85rem" }}
                      onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = `${AMBER}60`; }}
                      onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = BORDER; }}
                    />
                  </div>
                  <div>
                    <label className="block mb-2" style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: AMBER }}>
                      Message (optionnel)
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Précisions sur tes locks, longueur, état actuel..."
                      rows={3}
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-200 resize-none"
                      style={{ backgroundColor: "#0D0D0B", border: `1px solid ${BORDER}`, color: CREAM, fontSize: "0.85rem" }}
                      onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = `${AMBER}60`; }}
                      onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = BORDER; }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 3: Review ── */}
            {step === 3 && (
              <div className="max-w-xl">
                <h2 className="font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: CREAM }}>
                  Récapitulatif
                </h2>
                <p className="text-sm mb-8" style={{ color: MUTED }}>Vérifie les détails avant de confirmer.</p>

                <div className="p-6 mb-6 space-y-4" style={{ border: `1px solid ${BORDER}`, backgroundColor: "#0D0D0B" }}>
                  {[
                    ["Service", serviceObj?.title],
                    ["Prix estimé", serviceObj?.price],
                    ["Durée", serviceObj?.duration],
                    ["Date", selectedDate ? formatDate(selectedDate) : ""],
                    ["Heure", selectedTime],
                    ["Prénom", form.firstName],
                    ["Nom", form.lastName],
                    ["Téléphone", form.phone],
                    ["Email", form.email],
                  ].map(([label, val]) => (
                    <div key={label} className="flex items-start justify-between gap-4 py-2" style={{ borderBottom: `1px solid ${BORDER}` }}>
                      <span style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#5a5550", minWidth: "80px" }}>
                        {label}
                      </span>
                      <span className="text-sm text-right" style={{ color: CREAM }}>{val || "—"}</span>
                    </div>
                  ))}
                  {form.message && (
                    <div className="pt-2">
                      <p style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#5a5550", marginBottom: "6px" }}>
                        Message
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{form.message}</p>
                    </div>
                  )}
                </div>

                <div className="p-4 mb-8" style={{ border: `1px solid rgba(200,134,10,0.2)`, backgroundColor: `${AMBER}08` }}>
                  <p className="text-xs leading-relaxed" style={{ color: MUTED }}>
                    En confirmant, tu acceptes d&apos;être contacté(e) par WhatsApp au <span style={{ color: CREAM }}>09 83 32 82 41</span> pour la confirmation du rendez-vous. Le paiement s&apos;effectue sur place.
                  </p>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full py-4 transition-all duration-300 font-medium"
                  style={{
                    backgroundColor: AMBER,
                    color: "#0a0a08",
                    fontSize: "0.7rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    border: `1px solid ${AMBER}`,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = AMBER_LIGHT; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = AMBER; }}
                >
                  Confirmer la Réservation
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        {step < 3 && (
          <div className="flex items-center justify-between mt-10 pt-8" style={{ borderTop: `1px solid ${BORDER}` }}>
            <button
              onClick={() => setStep(step - 1)}
              disabled={step === 0}
              className="inline-flex items-center gap-2 transition-all duration-200"
              style={{
                padding: "0.75rem 1.5rem",
                border: `1px solid ${step === 0 ? "#1e1e1c" : BORDER}`,
                color: step === 0 ? "#3a3a38" : MUTED,
                fontSize: "0.65rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                cursor: step === 0 ? "not-allowed" : "pointer",
                backgroundColor: "transparent",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M10 6H2M5 9L2 6l3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Précédent
            </button>

            <button
              onClick={() => setStep(step + 1)}
              disabled={!canNext()}
              className="inline-flex items-center gap-2 transition-all duration-300"
              style={{
                padding: "0.875rem 2rem",
                border: `1px solid ${canNext() ? AMBER : "#2a2a28"}`,
                color: canNext() ? AMBER : "#3a3a38",
                fontSize: "0.65rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                cursor: canNext() ? "pointer" : "not-allowed",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                if (canNext()) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = AMBER;
                  (e.currentTarget as HTMLButtonElement).style.color = "#0a0a08";
                }
              }}
              onMouseLeave={(e) => {
                if (canNext()) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = AMBER;
                }
              }}
            >
              {step === 2 ? "Vérifier" : "Suivant"}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h10M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

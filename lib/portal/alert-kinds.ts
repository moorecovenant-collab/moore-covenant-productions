/** Safe to import from screens: no server or database code in here. */
export type AlertKind = "deal" | "schedule" | "news";

export const ALERT_KINDS: { id: AlertKind; label: string }[] = [
  { id: "deal", label: "Deal" },
  { id: "schedule", label: "Schedule change" },
  { id: "news", label: "News" },
];

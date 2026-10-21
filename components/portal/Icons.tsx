const base = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const HomeIcon = () => (
  <svg {...base}><path d="M4 11l8-7 8 7" /><path d="M6 10v9h12v-9" /><path d="M10 19v-5h4v5" /></svg>
);
export const CalendarIcon = () => (
  <svg {...base}><rect x="4" y="5" width="16" height="15" rx="3" /><path d="M4 10h16M9 3v4M15 3v4" /></svg>
);
export const CardIcon = () => (
  <svg {...base}><rect x="3" y="6" width="18" height="13" rx="3" /><path d="M3 11h18M7 16h3" /></svg>
);
export const BellIcon = () => (
  <svg {...base}><path d="M6 17V11a6 6 0 0112 0v6l1.5 2h-15L6 17z" /><path d="M10 21h4" /></svg>
);
export const ChatIcon = () => (
  <svg {...base}><path d="M5 5h14a2 2 0 012 2v8a2 2 0 01-2 2h-7l-5 4v-4H5a2 2 0 01-2-2V7a2 2 0 012-2z" /></svg>
);
export const UsersIcon = () => (
  <svg {...base}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5" /><path d="M16 5a3.5 3.5 0 010 6.5M18 14.8c1.9.7 3.1 2.5 3.5 5.2" /></svg>
);
export const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12M8 7l4-4 4 4" /><path d="M6 11H5a1 1 0 00-1 1v7a1 1 0 001 1h14a1 1 0 001-1v-7a1 1 0 00-1-1h-1" /></svg>
);

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#080808",
        charcoal: "#141414",
        dark: "#1c1c1c",
        muted: "#2a2a2a",
        border: "#2e2e2e",
        gold: "#c4974a",
        "gold-light": "#e8c07e",
        "gold-dim": "#8a6532",
        cream: "#f0ebe0",
        "off-white": "#d9d4c8",
        "text-primary": "#e8e3d8",
        "text-secondary": "#9a9590",
        "text-muted": "#5a5550",
        // DeLorean 88 Vintage
        "d88-bg":           "#000000",
        "d88-surface":      "#0A0A0A",
        "d88-card":         "#111111",
        "d88-pink":         "#FF69B4",
        "d88-pink-light":   "#FFB3D9",
        "d88-pink-dim":     "#E0498A",
        "d88-pink-glow":    "rgba(255,105,180,0.18)",
        "d88-white":        "#FFFFFF",
        "d88-gray":         "#888888",
        "d88-gray-dark":    "#222222",
        "d88-border":       "rgba(255,105,180,0.15)",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(3.5rem, 8vw, 7rem)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        "display-xl": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "section": "clamp(5rem, 10vw, 10rem)",
      },
      animation: {
        "grain": "grain 8s steps(10) infinite",
        "fade-up": "fadeUp 0.8s ease forwards",
        "line-grow": "lineGrow 1.2s ease forwards",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(3%, 2%)" },
          "30%": { transform: "translate(-1%, 4%)" },
          "40%": { transform: "translate(2%, -1%)" },
          "50%": { transform: "translate(-3%, 3%)" },
          "60%": { transform: "translate(1%, -2%)" },
          "70%": { transform: "translate(-2%, 1%)" },
          "80%": { transform: "translate(3%, -3%)" },
          "90%": { transform: "translate(-1%, 2%)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        lineGrow: {
          from: { width: "0" },
          to: { width: "100%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "vignette": "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.8) 100%)",
      },
      transitionTimingFunction: {
        "cinematic": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "dramatic": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

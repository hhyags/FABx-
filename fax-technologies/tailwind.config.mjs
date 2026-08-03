import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          elevated: "hsl(var(--surface-elevated))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)"],
        sans: ["var(--font-inter)"],
        mono: ["var(--font-jetbrains-mono)"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 8vw, 8rem)", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
        "display": ["clamp(2.5rem, 6vw, 5.5rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "headline": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        "title": ["clamp(1.25rem, 2vw, 1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.8" }],
        "body": ["1rem", { lineHeight: "1.7" }],
        "caption": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.2em" }],
        "overline": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.25em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
        "42": "10.5rem",
        "section": "clamp(8rem, 14vh, 12rem)",
      },
      maxWidth: {
        "editorial": "1200px",
        "reading": "680px",
        "narrow": "520px",
      },
      boxShadow: {
        "glow": "0 0 40px hsl(var(--accent) / 0.15)",
        "glow-sm": "0 0 20px hsl(var(--accent) / 0.1)",
        "glow-lg": "0 0 60px hsl(var(--accent) / 0.2)",
        "elevated": "0 24px 48px rgba(0, 0, 0, 0.4)",
      },
      keyframes: {
        "reveal-up": {
          from: { opacity: "0", transform: "translateY(60px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "reveal-line": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "progress-dot": {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(24px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "reveal-up": "reveal-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "reveal-line": "reveal-line 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fade-in 0.6s ease forwards",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        "progress-dot": "progress-dot 2.4s cubic-bezier(0.45, 0, 0.55, 1) infinite",
      },
      transitionTimingFunction: {
        "cinematic": "cubic-bezier(0.22, 1, 0.36, 1)",
        "smooth": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;

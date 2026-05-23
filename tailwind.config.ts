import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./types/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "app-bg": "var(--app-bg)",
        "app-surface": "var(--app-surface)",
        "app-card": "var(--app-card)",
        "app-muted": "var(--app-muted)",
        "app-line": "var(--app-line)",
        "app-text": "var(--app-text)",
        "app-accent": "var(--app-accent)",
        "app-accent-soft": "var(--app-accent-soft)",
        "app-accent-secondary": "var(--app-accent-secondary)",
        "app-warning": "var(--app-warning)",
        "app-warning-soft": "var(--app-warning-soft)",
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-kr)", "sans-serif"],
      },
      boxShadow: {
        app: "var(--app-shadow)",
      },
      backgroundImage: {
        "card-gradient":
          "linear-gradient(135deg, rgba(19,123,97,0.12), rgba(35,59,117,0.06))",
      },
    },
  },
  plugins: [],
};

export default config;

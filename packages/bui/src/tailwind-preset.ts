import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const preset: Config = {
  theme: {
    extend: {
      // UI library’s theme extensions
      colors: {
        primary: "#1D4ED8",
        secondary: "#9333EA",
        // Add more colors as needed…
      },
    },
  },
  // safelist: [
  //   "bg-primary",
  //   "text-secondary",
  //   {
  //     pattern: /^(bg|text|border)-(primary|secondary|tertiary)/,
  //     variants: ["hover", "focus"],
  //   },
  // ],
  plugins: [
    // Custom dark variant
    plugin(({ addVariant }) => {
      addVariant("dark", "&:where([data-theme=\"dark\"], [data-theme=\"dark\"] *)");
    }),
    // Base styles (similar to @layer base)
    plugin(({ addBase }) => {
      addBase({
        "body": {
          "fontFamily":
            "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
          "lineHeight": "1.5",
          "fontWeight": "400",
          "fontSynthesis": "none",
          "textRendering": "optimizeLegibility",
          "-webkit-font-smoothing": "antialiased",
          "-moz-osx-font-smoothing": "grayscale",
          "margin": "0",
          "padding": "0",
          "boxSizing": "border-box",
          "display": "flex",
          "height": "100vh",
        },
        "h1": { "@apply text-2xl font-bold": {} },
        "h2": { "@apply text-xl font-bold": {} },
        "h3": { "@apply text-lg font-bold": {} },
        "h4": { "@apply text-base font-bold": {} },
        "h5": { "@apply text-sm font-bold": {} },
        // Remove the number input spinner
        "input[type=\"number\"]::-webkit-inner-spin-button, input[type=\"number\"]::-webkit-outer-spin-button": {
          "-webkit-appearance": "none",
          "margin": "0",
        },
        // CSS variables for theming (default values)
        ":root": {
          "--color-action": "var(--color-blue-500)",
          "--color-action-hover": "var(--color-blue-600)",
          "--color-action-active": "var(--color-blue-700)",
          "--color-destructive": "var(--color-red-500)",
          "--color-destructive-hover": "var(--color-red-600)",
          "--color-destructive-active": "var(--color-red-700)",
        },
        "[data-theme=\"light\"]": {
          "--color-bg-primary": "var(--color-white)",
          "--color-bg-secondary": "var(--color-stone-100)",
          "--color-bg-tertiary": "var(--color-stone-200)",
          "--color-border-weak": "var(--color-stone-200)",
          "--color-border-default": "var(--color-stone-300)",
          "--color-border-strong": "var(--color-stone-400)",
          "--color-text-primary": "var(--color-slate-900)",
          "--color-text-secondary": "var(--color-slate-700)",
          "--color-text-tertiary": "var(--color-slate-500)",
          "--color-text-muted": "var(--color-slate-300)",
        },
        "[data-theme=\"dark\"]": {
          "--color-bg-primary": "#212121",
          "--color-bg-secondary": "var(--color-neutral-800)",
          "--color-bg-tertiary": "#333333",
          "--color-border-weak": "var(--color-neutral-800)",
          "--color-border-default": "var(--color-neutral-700)",
          "--color-border-strong": "var(--color-neutral-600)",
          "--color-text-primary": "var(--color-stone-100)",
          "--color-text-secondary": "var(--color-stone-300)",
          "--color-text-tertiary": "var(--color-stone-400)",
          "--color-text-muted": "var(--color-stone-500)",
        },
      });
    }),
    // Custom utilities
    plugin(({ addUtilities }) => {
      const newUtilities = {
        ".bg-primary": { backgroundColor: "var(--color-bg-primary)" },
        ".bg-secondary": { backgroundColor: "var(--color-bg-secondary)" },
        ".bg-tertiary": { backgroundColor: "var(--color-bg-tertiary)" },
        ".bg-action": { backgroundColor: "var(--color-action)" },
        ".bg-action-hover": { backgroundColor: "var(--color-action-hover)" },
        ".bg-action-active": { backgroundColor: "var(--color-action-active)" },
        ".border-weak": { borderColor: "var(--color-border-weak)" },
        ".border-default": { borderColor: "var(--color-border-default)" },
        ".border-strong": { borderColor: "var(--color-border-strong)" },
        ".border-action": { borderColor: "var(--color-action)" },
        ".border-action-hover": { borderColor: "var(--color-action-hover)" },
        ".border-action-active": { borderColor: "var(--color-action-active)" },
        ".text-primary": { color: "var(--color-text-primary)" },
        ".text-secondary": { color: "var(--color-text-secondary)" },
        ".text-tertiary": { color: "var(--color-text-tertiary)" },
        ".text-muted": { color: "var(--color-text-muted)" },
        ".text-action": { color: "var(--color-action)" },
      };
      addUtilities(newUtilities, { variants: ["responsive"] });
    }),
  ],
};

export default preset;

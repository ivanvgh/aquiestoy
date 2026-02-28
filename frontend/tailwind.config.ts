import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#003366",
          dark: "#002244",
        },
        secondary: {
          DEFAULT: "#FF6B00",
          dark: "#E55D00",
        },
        "background-light": "#FFFFFF",
        "background-dark": "#0f0f23",
        "surface-light": "#F5F5F8",
        "accent-blue": {
          light: "#eff6ff",
          border: "#dbeafe",
          dark: "#1e3a5f",
        },
        "accent-green": {
          light: "#f0fdf4",
          border: "#bbf7d0",
          DEFAULT: "#22c55e",
          muted: "#4ade80",
          dark: "#15803d",
          darker: "#166534",
        },
        "accent-orange": {
          light: "#fff7ed",
          border: "#ffedd5",
          dark: "#ea580c",
        },
        "accent-red": {
          light: "#fef2f2",
          border: "#fecaca",
          DEFAULT: "#ef4444",
          dark: "#dc2626",
        },
        info: "#93c5fd",
      },
      fontFamily: {
        display: ["var(--font-outfit)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};
export default config;

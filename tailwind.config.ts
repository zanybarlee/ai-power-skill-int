import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        forest: {
          DEFAULT: "#0A1F2F", // Deeper, more mysterious blue-green
          light: "#132B41", // Rich navy
        },
        mint: {
          DEFAULT: "#64FFDA", // Bright ethereal cyan
          light: "#A5F3FC", // Celestial light blue
        },
        divine: {
          DEFAULT: "#FFD700", // Divine gold
          light: "#FFF4BD", // Soft golden glow
        }
      },
      fontFamily: {
        sans: ["Inter var", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
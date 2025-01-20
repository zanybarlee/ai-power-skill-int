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
        aptiv: {
          DEFAULT: "#ea384c", // Main brand red
          light: "#ee5d6d", // Lighter shade of red
          dark: "#d62238", // Darker shade of red
          gray: {
            100: "#F1F1F1",
            200: "#C8C8C9",
            300: "#8E9196",
            400: "#8A898C",
            500: "#555555",
            600: "#333333",
            700: "#222222",
          }
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
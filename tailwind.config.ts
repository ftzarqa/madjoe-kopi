// ============================================================
// tailwind.config.ts
// Konfigurasi Palet Warna Resmi & Identitas Visual Madjoe Kopi
// ============================================================

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
        // Palet Warna Resmi Madjoe Kopi (Brand Guidelines)
        "signature-red": "#CE1827",  // Primary / CTA / Active badges
        "warm-cream":    "#F3ECE3",  // Background utama (60-70%)
        "pure-white":    "#FFFFFF",  // Background sekunder (card, modal)
        "espresso-brown": "#4A2E1B", // Teks utama & border kontras
        "caramel-brown":  "#C68E58", // Aksen, transisi, secondary badge

        // Alias penamaan brand untuk kemudahan implementasi
        brand: {
          red:      "#CE1827",
          cream:    "#F3ECE3",
          white:    "#FFFFFF",
          espresso: "#4A2E1B",
          caramel:  "#C68E58",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans:  ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        "soft-card": "0 2px 10px rgba(74, 46, 27, 0.06)",
        "hover-card": "0 12px 24px -6px rgba(74, 46, 27, 0.12)",
        "cta-glow": "0 4px 16px rgba(206, 24, 39, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;

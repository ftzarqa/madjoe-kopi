// ============================================================
// src/data/menu.ts
// Data dummy menu Madjoe Kopi
// Untuk production: ganti array ini dengan fetch ke API/CMS
// ============================================================

import { MenuItem } from "@/types";

/**
 * Daftar menu Madjoe Kopi — Mataram, NTB.
 * Gambar menggunakan placehold.co sebagai placeholder.
 * Ganti imageUrl dengan path gambar nyata saat production.
 */
export const menuItems: MenuItem[] = [
  // ─── KOPI SUSU ───────────────────────────────────────────
  {
    id: "ks-001",
    name: "Madjoe Latte",
    description:
      "Signature kami. Espresso double shot dipadu susu segar pilihan & sedikit gula aren Lombok.",
    price: 28000,
    category: "kopi-susu",
    imageUrl: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400&h=300&fit=crop",
    imageAlt: "Segelas Madjoe Latte dengan latte art",
    isAvailable: true,
  },
  {
    id: "ks-002",
    name: "Aren Cappuccino",
    description:
      "Cappuccino klasik dengan twis gula aren Sumbawa — manis alami, aroma karamel.",
    price: 26000,
    category: "kopi-susu",
    imageUrl: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop",
    imageAlt: "Cappuccino dengan topping kayu manis",
    isAvailable: true,
  },
  {
    id: "ks-003",
    name: "Matcha Kopi",
    description:
      "Perpaduan unik matcha Jepang grade premium dengan espresso — creamy, bitter, segar.",
    price: 32000,
    category: "kopi-susu",
    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
    imageAlt: "Matcha latte dengan espresso shot",
    isAvailable: true,
  },
  {
    id: "ks-004",
    name: "Es Kopi Susu Madjoe",
    description:
      "Kopi susu es kekinian. Cold brew 12 jam + susu UHT full cream + gula aren cair.",
    price: 22000,
    category: "kopi-susu",
    imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
    imageAlt: "Es kopi susu dalam gelas besar",
    isAvailable: true,
  },

  // ─── KOPI HITAM ──────────────────────────────────────────
  {
    id: "kh-001",
    name: "Americano",
    description:
      "Dua shot espresso diencerkan air panas — bersih, bold, tanpa distraksi.",
    price: 20000,
    category: "kopi-hitam",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop",
    imageAlt: "Secangkir americano hitam",
    isAvailable: true,
  },
  {
    id: "kh-002",
    name: "V60 Pour Over",
    description:
      "Single origin Flores Bajawa. Diseduh manual V60, profil rasa floral & fruity.",
    price: 30000,
    category: "kopi-hitam",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    imageAlt: "Barista menyeduh V60 pour over",
    isAvailable: true,
  },
  {
    id: "kh-003",
    name: "Espresso Double Shot",
    description:
      "Pure & intense. Dua shot espresso segar dari biji Arabika Gayo pilihan.",
    price: 18000,
    category: "kopi-hitam",
    imageUrl: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop",
    imageAlt: "Dua shot espresso dalam demitasse cup",
    isAvailable: true,
  },
  {
    id: "kh-004",
    name: "Cold Brew 12 Jam",
    description:
      "Kopi hitam cold brew yang diseduh selama 12 jam — halus, rendah asam, super smooth.",
    price: 25000,
    category: "kopi-hitam",
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
    imageAlt: "Cold brew kopi hitam dalam gelas mason jar",
    isAvailable: true,
  },

  // ─── CAMILAN ─────────────────────────────────────────────
  {
    id: "cm-001",
    name: "Croissant Butter",
    description:
      "Croissant laminated homemade — garing di luar, lembut di dalam. Pasangan sempurna kopi.",
    price: 18000,
    category: "camilan",
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
    imageAlt: "Croissant butter segar",
    isAvailable: true,
  },
  {
    id: "cm-002",
    name: "Brownies Kopi",
    description:
      "Brownies fudgy dengan infusi espresso — intense chocolate meets coffee dalam satu gigitan.",
    price: 20000,
    category: "camilan",
    imageUrl: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&h=300&fit=crop",
    imageAlt: "Sepotong brownies kopi yang lembap",
    isAvailable: true,
  },
  {
    id: "cm-003",
    name: "Banana Bread",
    description:
      "Banana bread moist dari pisang lokal Mataram yang matang sempurna, dipanggang harian.",
    price: 15000,
    category: "camilan",
    imageUrl: "https://images.unsplash.com/photo-1605816988069-b11383b50717?w=400&h=300&fit=crop",
    imageAlt: "Sepotong banana bread moist",
    isAvailable: true,
  },
  {
    id: "cm-004",
    name: "Roti Bakar Selai Kacang",
    description:
      "Roti sourdough lokal dipanggang, selai kacang homemade — sederhana, mengenyangkan.",
    price: 12000,
    category: "camilan",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    imageAlt: "Roti bakar dengan selai kacang",
    isAvailable: true,
  },
];

/**
 * Label kategori dalam Bahasa Indonesia untuk ditampilkan di UI.
 */
export const categoryLabels: Record<MenuItem["category"], string> = {
  "kopi-susu":  "☕ Kopi Susu",
  "kopi-hitam": "🖤 Kopi Hitam",
  "camilan":    "🍪 Camilan",
};

/**
 * Urutan tampilan kategori di menu.
 */
export const categoryOrder: MenuItem["category"][] = [
  "kopi-susu",
  "kopi-hitam",
  "camilan",
];

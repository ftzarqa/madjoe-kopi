// ============================================================
// src/data/menu.ts
// Data Menu Fisik Resmi Madjoe Kopi — Mataram, NTB
// ============================================================

import { MenuItem, MenuCategory } from "@/types";

/**
 * Urutan tampilan kategori di katalog menu
 */
export const categoryOrder: MenuCategory[] = [
  "signature",
  "coffee",
  "americano",
  "sweet-coffee",
  "matcha",
  "milk-based",
  "fresh-juice",
  "snack",
  "makanan-berat",
];

/**
 * Daftar Menu Fisik Asli Madjoe Kopi
 * Jl. Pejanggik No.66X, Mataram, NTB
 */
export const menuItems: MenuItem[] = [
  // ─── 1. SIGNATURE MADJOE ──────────────────────────────────
  {
    id: "sig-001",
    name: "Signature Madjoe Coffee",
    description: "Kopi susu andalan Madjoe Kopi dengan racikan espresso ganda dan sirup rahasia khas kedai.",
    price: 16000,
    category: "signature",
    imageUrl: "/images/madjoe/blueberry_cheesecake_dengankopisusu.jpeg",
    imageAlt: "Signature Madjoe Coffee & Blueberry Cheesecake",
    isAvailable: true,
    isPopular: true,
  },
  {
    id: "sig-002",
    name: "Madjoe Oat Latte",
    description: "Perpaduan creamy oat milk nabati pilihan dengan double shot espresso nusantara.",
    price: 20000,
    category: "signature",
    imageUrl: "",
    imageAlt: "Madjoe Oat Latte",
    isAvailable: true,
    isPopular: true,
  },

  // ─── 2. COFFEE SERIES (CLASSIC) ───────────────────────────
  {
    id: "cof-001",
    name: "Espresso",
    description: "Ekstraksi murni biji kopi arabika pilihan dengan crema tebal dan aroma intens.",
    price: 8000,
    category: "coffee",
    imageUrl: "",
    imageAlt: "Single shot espresso",
    isAvailable: true,
  },
  {
    id: "cof-002",
    name: "Tubruk",
    description: "Seduhan kopi tubruk tradisional nusantara dengan gilingan medium-fine yang harum.",
    price: 14000,
    category: "coffee",
    imageUrl: "",
    imageAlt: "Secangkir Kopi Tubruk",
    isAvailable: true,
  },
  {
    id: "cof-003",
    name: "Latte",
    description: "Espresso halus berpadu susu segar steamed bersuhu pas, menghasilkan rasa manis alami susu.",
    price: 15000,
    category: "coffee",
    imageUrl: "",
    imageAlt: "Hot / Ice Caffe Latte",
    isAvailable: true,
    isPromo: true, // Promo Happy Hour 25%
  },
  {
    id: "cof-004",
    name: "Cappuccino",
    description: "Keseimbangan sepertiga espresso, steamed milk, dan busa susu tebal bertabur bubuk cokelat.",
    price: 15000,
    category: "coffee",
    imageUrl: "",
    imageAlt: "Cappuccino klasik",
    isAvailable: true,
  },
  {
    id: "cof-005",
    name: "V60 Manual Brew",
    description: "Seduhan filter manual pour over V60. Biji single origin berganti berkala, tanya barista.",
    price: 20000,
    category: "coffee",
    imageUrl: "",
    imageAlt: "Seduhan V60 pour over",
    isAvailable: true,
  },

  // ─── 3. AMERICANO SERIES ──────────────────────────────────
  {
    id: "ame-001",
    name: "Americano Oji",
    description: "Americano klasik Madjoe dengan double shot espresso diencerkan air mineral dingin/panas.",
    price: 15000,
    category: "americano",
    imageUrl: "",
    imageAlt: "Americano Oji segar",
    isAvailable: true,
    isPromo: true, // Promo Happy Hour 25%
  },
  {
    id: "ame-002",
    name: "Wild Blackberry",
    description: "Americano dingin berpadu sirup sari buah liar blackberry asam manis yang menyegarkan.",
    price: 20000,
    category: "americano",
    imageUrl: "",
    imageAlt: "Wild Blackberry Americano",
    isAvailable: true,
    isPopular: true,
  },
  {
    id: "ame-003",
    name: "Panana Coffee",
    description: "Kreasi segar espresso hitam dipadu aroma tropis nanas dan pisang pilihan.",
    price: 18000,
    category: "americano",
    imageUrl: "",
    imageAlt: "Panana Coffee",
    isAvailable: true,
  },

  // ─── 4. SWEET COFFEE SERIES ───────────────────────────────
  {
    id: "swc-001",
    name: "Roasted Peanut Butter",
    description: "Espresso susu dengan selai kacang panggang homemade gurih manis legit.",
    price: 15000,
    category: "sweet-coffee",
    imageUrl: "",
    imageAlt: "Roasted Peanut Butter Coffee",
    isAvailable: true,
    isPopular: true,
  },
  {
    id: "swc-002",
    name: "Caramel Macchiato",
    description: "Lapisan susu vanila dingin, espresso pekat, dan siraman saus karamel leleh harum.",
    price: 16000,
    category: "sweet-coffee",
    imageUrl: "",
    imageAlt: "Caramel Macchiato",
    isAvailable: true,
  },
  {
    id: "swc-003",
    name: "Sweet Strawberry",
    description: "Perpaduan unik rasa stroberi manis segar dengan shot espresso dan susu lembut.",
    price: 16000,
    category: "sweet-coffee",
    imageUrl: "",
    imageAlt: "Sweet Strawberry Coffee",
    isAvailable: true,
  },
  {
    id: "swc-004",
    name: "Butterscotch Sea Salt Latte",
    description: "Kombinasi butterscotch manis gurih dengan sentuhan sea salt penyeimbang rasa.",
    price: 16000,
    category: "sweet-coffee",
    imageUrl: "",
    imageAlt: "Butterscotch Sea Salt Latte",
    isAvailable: true,
    isPopular: true,
  },
  {
    id: "swc-005",
    name: "Choco Crumble Coffee",
    description: "Kopi susu cokelat kental dengan taburan biskuit cokelat renyah di atasnya.",
    price: 16000,
    category: "sweet-coffee",
    imageUrl: "",
    imageAlt: "Choco Crumble Coffee",
    isAvailable: true,
  },
  {
    id: "swc-006",
    name: "Palm Sugar Coffee",
    description: "Kopi susu gula aren murni Lombok — aroma karamel alami khas dan manis pas.",
    price: 16000,
    category: "sweet-coffee",
    imageUrl: "",
    imageAlt: "Palm Sugar Coffee",
    isAvailable: true,
  },

  // ─── 5. MATCHA SERIES ─────────────────────────────────────
  {
    id: "mtc-001",
    name: "Ice Matcha Latte",
    description: "Bubuk matcha Jepang murni dipadu susu segar dingin dan es batu segar.",
    price: 16000,
    category: "matcha",
    imageUrl: "",
    imageAlt: "Ice Matcha Latte",
    isAvailable: true,
    isPopular: true,
  },
  {
    id: "mtc-002",
    name: "Matcha Oat Latte",
    description: "Matcha kualitas tinggi dengan oat milk gurih nabati yang lembut dan sehat.",
    price: 20000,
    category: "matcha",
    imageUrl: "",
    imageAlt: "Matcha Oat Latte",
    isAvailable: true,
  },
  {
    id: "mtc-003",
    name: "Coffee Matcha Latte",
    description: "Lapisan matcha hijau, susu segar, dan shot espresso di atasnya (Dirty Matcha).",
    price: 20000,
    category: "matcha",
    imageUrl: "",
    imageAlt: "Coffee Matcha Latte",
    isAvailable: true,
  },
  {
    id: "mtc-004",
    name: "Strawberry Matcha",
    description: "Lapisan pure buah stroberi segar berpadu susu dan matcha jepang aromatic.",
    price: 22000,
    category: "matcha",
    imageUrl: "",
    imageAlt: "Strawberry Matcha Latte",
    isAvailable: true,
    isPopular: true,
  },

  // ─── 6. MILK BASED SERIES ─────────────────────────────────
  {
    id: "mlk-001",
    name: "Chocholate Punch",
    description: "Minuman cokelat Belgia pekat creamy tanpa kopi, kaya rasa dan manis pas.",
    price: 16000,
    category: "milk-based",
    imageUrl: "",
    imageAlt: "Chocholate Punch",
    isAvailable: true,
  },
  {
    id: "mlk-002",
    name: "Goguma / Ice Taro Latte",
    description: "Racikan taro dan ubi manis ala Korea (Goguma) yang wangi dan lembut.",
    price: 16000,
    category: "milk-based",
    imageUrl: "",
    imageAlt: "Goguma Ice Taro Latte",
    isAvailable: true,
  },
  {
    id: "mlk-003",
    name: "Teh Gajah / Thai Tea",
    description: "Teh rempah khas Thailand berpadu kental manis dan evaporated milk legit.",
    price: 16000,
    category: "milk-based",
    imageUrl: "",
    imageAlt: "Teh Gajah Thai Tea",
    isAvailable: true,
  },

  // ─── 7. FRESH JUICE ───────────────────────────────────────
  {
    id: "juc-001",
    name: "Jus Semangka",
    description: "Semangka merah segar Mataram diblender murni tanpa tambahan perisa buatan.",
    price: 16000,
    category: "fresh-juice",
    imageUrl: "",
    imageAlt: "Jus Semangka Segar",
    isAvailable: true,
  },
  {
    id: "juc-002",
    name: "Jus Buah Naga",
    description: "Buah naga ungu kaya antioksidan segar dingin dengan rasa manis alami.",
    price: 16000,
    category: "fresh-juice",
    imageUrl: "",
    imageAlt: "Jus Buah Naga",
    isAvailable: true,
  },
  {
    id: "juc-003",
    name: "Jus Nanas",
    description: "Nanas madu tropis segar manis asam nikmat penambah energi seketika.",
    price: 16000,
    category: "fresh-juice",
    imageUrl: "",
    imageAlt: "Jus Nanas Segar",
    isAvailable: true,
  },

  // ─── 8. SNACK ─────────────────────────────────────────────
  {
    id: "snk-000",
    name: "Madjoe Artisanal Pastry",
    description: "Croissant dan pastry mentega renyah gurih aromatik yang dipanggang segar setiap hari di etalase kedai.",
    price: 20000,
    category: "snack",
    imageUrl: "/images/madjoe/madjoe-pastry.jpeg",
    imageAlt: "Madjoe Artisanal Pastry",
    isAvailable: true,
    isPopular: true,
  },
  {
    id: "snk-001",
    name: "Tempe Mendoan",
    description: "Tempe berbalut tepung bumbu daun bawang goreng setengah matang plus sambal kecap pedas.",
    price: 15000,
    category: "snack",
    imageUrl: "",
    imageAlt: "Tempe Mendoan Panas",
    isAvailable: true,
    isPopular: true,
  },
  {
    id: "snk-002",
    name: "Sosis Cop Cop",
    description: "Sosis sapi goreng mekar disajikan dengan cocolan saus sambal dan mayones gurih.",
    price: 15000,
    category: "snack",
    imageUrl: "",
    imageAlt: "Sosis Cop Cop",
    isAvailable: true,
  },
  {
    id: "snk-003",
    name: "Ubi Goreng",
    description: "Ubi jalar lokal manis dipotong tebal dan digoreng renyah di luar, lembut di dalam.",
    price: 15000,
    category: "snack",
    imageUrl: "",
    imageAlt: "Ubi Goreng Renyah",
    isAvailable: true,
  },
  {
    id: "snk-004",
    name: "Pisang Goreng",
    description: "Pisang kepok manis berbalut tepung krispi keemasan, teman setia kopi hitam.",
    price: 15000,
    category: "snack",
    imageUrl: "",
    imageAlt: "Pisang Goreng Krispi",
    isAvailable: true,
    isPopular: true,
  },

  // ─── 9. MAKANAN BERAT ─────────────────────────────────────
  {
    id: "mkn-001",
    name: "Nasi Telur Kribo",
    description: "Nasi putih hangat dengan telur dadar keriting krispi khas kedai, lalapan, dan sambal pedas.",
    price: 17000,
    category: "makanan-berat",
    imageUrl: "",
    imageAlt: "Nasi Telur Kribo",
    isAvailable: true,
    isPopular: true,
  },
  {
    id: "mkn-002",
    name: "Ayam Goreng Tempong",
    description: "Ayam goreng bumbu rempah renyah disiram sambal tempong segar super pedas nampol.",
    price: 25000,
    category: "makanan-berat",
    imageUrl: "",
    imageAlt: "Ayam Goreng Tempong",
    isAvailable: true,
    isPopular: true,
  },
  {
    id: "mkn-003",
    name: "Nila Goreng Tempong",
    description: "Ikan nila air tawar segar digoreng garing dengan cocolan sambal tempong khas Lombok.",
    price: 23000,
    category: "makanan-berat",
    imageUrl: "",
    imageAlt: "Nila Goreng Tempong",
    isAvailable: true,
  },
  {
    id: "mkn-004",
    name: "Nasi Goreng RW",
    description: "Nasi goreng racikan wajan khas kedai dengan bumbu gurih rempah, telur mata sapi, dan kerupuk.",
    price: 17000,
    category: "makanan-berat",
    imageUrl: "",
    imageAlt: "Nasi Goreng RW Madjoe",
    isAvailable: true,
  },
];

/**
 * Add-on pilihan yang dapat ditambahkan pada pesanan minuman
 */
export const menuAddons = [
  { id: "add-001", name: "+1 Shot Espresso", price: 5000 },
  { id: "add-002", name: "Ganti Oat Milk", price: 5000 },
];

/**
 * Label Kategori untuk Tab Navigasi & Filter Menu
 */
export const categoryTabs: { id: MenuCategory; label: string; icon: string }[] = [
  { id: "all", label: "Semua", icon: "✨" },
  { id: "signature", label: "Signature", icon: "⭐" },
  { id: "coffee", label: "Coffee", icon: "☕" },
  { id: "americano", label: "Americano", icon: "🖤" },
  { id: "sweet-coffee", label: "Sweet Coffee", icon: "🍯" },
  { id: "matcha", label: "Matcha", icon: "🍵" },
  { id: "milk-based", label: "Milk Based", icon: "🥛" },
  { id: "fresh-juice", label: "Fresh Juice", icon: "🍉" },
  { id: "snack", label: "Snack", icon: "🍟" },
  { id: "makanan-berat", label: "Makanan Berat", icon: "🍛" },
];

/**
 * Banner Promo Resmi Madjoe Kopi
 */
export const promoBannerData = {
  title: "Happy Hour Diskon 25%",
  time: "Jam 08.00 – 11.00 Pagi",
  description: "Dapatkan diskon 25% setiap hari khusus untuk menu Americano Series & Latte. Awali harimu di Madjoe Kopi!",
  badge: "PROMO PAGI",
};

/**
 * Category labels dictionary
 */
export const categoryLabels: Record<MenuCategory, string> = {
  all: "Semua Menu",
  signature: "Signature Madjoe",
  coffee: "Coffee Series",
  americano: "Americano Series",
  "sweet-coffee": "Sweet Coffee",
  matcha: "Matcha Series",
  "milk-based": "Milk Based",
  "fresh-juice": "Fresh Juice",
  snack: "Snack & Camilan",
  "makanan-berat": "Makanan Berat",
};

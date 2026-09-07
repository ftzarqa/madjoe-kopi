// ============================================================
// src/data/menu.ts
// Data Menu Fisik Resmi Madjoe Kopi — Mataram, NTB (Total 36 Items)
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
 * Daftar 34 Menu Makanan & Minuman Fisik Asli Madjoe Kopi
 * Jl. Pejanggik No.66X, Mataram, NTB
 */
export const menuItems: MenuItem[] = [
  // ─── 1. SIGNATURE MADJOE (2 Item) ─────────────────────────
  {
    id: "sig-001",
    name: "Signature Madjoe Coffee",
    description: "Kopi susu andalan racikan khas kedai dengan double shot espresso dan gula aren legit.",
    price: 16000,
    category: "signature",
    imageUrl: "/images/madjoe/blueberry_cheesecake_dengankopisusu.jpeg",
    imageAlt: "Signature Madjoe Coffee",
    isAvailable: true,
    isPopular: true,
  },
  {
    id: "sig-002",
    name: "Madjoe Oat Latte",
    description: "Perpaduan lembut oat milk nabati pilihan dengan double shot espresso nusantara.",
    price: 20000,
    category: "signature",
    imageUrl: "",
    imageAlt: "Madjoe Oat Latte",
    isAvailable: true,
    isPopular: true,
  },

  // ─── 2. COFFEE SERIES (5 Item) ────────────────────────────
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
    description: "Espresso halus berpadu steamed milk segar bersuhu pas. Manis alami susu.",
    price: 15000,
    category: "coffee",
    imageUrl: "",
    imageAlt: "Hot / Ice Caffe Latte",
    isAvailable: true,
    isPromo: true, // Promo Happy Hour 25% (08.00 - 11.00)
  },
  {
    id: "cof-004",
    name: "Cappuccino",
    description: "Keseimbangan seimbang sepertiga espresso, steamed milk, dan busa susu tebal.",
    price: 15000,
    category: "coffee",
    imageUrl: "",
    imageAlt: "Cappuccino klasik",
    isAvailable: true,
  },
  {
    id: "cof-005",
    name: "V60",
    description: "Manual brew pour over V60. Pilihan beans single origin berganti berkala (tanya barista).",
    price: 0,
    category: "coffee",
    imageUrl: "",
    imageAlt: "Seduhan V60 pour over",
    isAvailable: true,
  },

  // ─── 3. AMERICANO SERIES (3 Item) ─────────────────────────
  {
    id: "ame-001",
    name: "Americano Oji",
    description: "Americano klasik dingin atau panas dengan double shot espresso murni.",
    price: 15000,
    category: "americano",
    imageUrl: "",
    imageAlt: "Americano Oji segar",
    isAvailable: true,
    isPromo: true, // Promo Happy Hour 25% (08.00 - 11.00)
  },
  {
    id: "ame-002",
    name: "Wild Blackberry",
    description: "Espresso americano berpadu ekstrak sari blackberry liar asam manis menyegarkan.",
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
    description: "Kreasi segar espresso hitam dipadu aroma tropis nanas dan pisang.",
    price: 18000,
    category: "americano",
    imageUrl: "",
    imageAlt: "Panana Coffee",
    isAvailable: true,
  },

  // ─── 4. SWEET COFFEE SERIES (6 Item) ──────────────────────
  {
    id: "swc-001",
    name: "Roasted Peanut Butter",
    description: "Espresso susu berpadu rasa gurih-manis selai kacang panggang.",
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
    description: "Lapisan susu vanila, espresso pekat, dan siraman saus karamel leleh.",
    price: 16000,
    category: "sweet-coffee",
    imageUrl: "",
    imageAlt: "Caramel Macchiato",
    isAvailable: true,
  },
  {
    id: "swc-003",
    name: "Sweet Strawberry",
    description: "Perpaduan unik sensasi buah stroberi manis segar dengan shot espresso dan susu.",
    price: 16000,
    category: "sweet-coffee",
    imageUrl: "",
    imageAlt: "Sweet Strawberry Coffee",
    isAvailable: true,
  },
  {
    id: "swc-004",
    name: "Butterscotch Sea Salt Latte",
    description: "Karamel butterscotch manis gurih dengan sentuhan taburan sea salt penyeimbang rasa.",
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
    description: "Kopi susu cokelat kental dengan taburan remah biskuit cokelat renyah.",
    price: 16000,
    category: "sweet-coffee",
    imageUrl: "",
    imageAlt: "Choco Crumble Coffee",
    isAvailable: true,
  },
  {
    id: "swc-006",
    name: "Palm Sugar Coffee",
    description: "Kopi susu gula aren murni dengan aroma karamel alami khas nusantara.",
    price: 16000,
    category: "sweet-coffee",
    imageUrl: "",
    imageAlt: "Palm Sugar Coffee",
    isAvailable: true,
  },

  // ─── 5. MATCHA SERIES (4 Item) ────────────────────────────
  {
    id: "mtc-001",
    name: "Ice Matcha Latte",
    description: "Bubuk matcha Jepang murni dipadu susu segar dingin yang seimbang.",
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
    description: "Seduhan matcha aromatik berpadu creamy oat milk nabati yang lembut.",
    price: 20000,
    category: "matcha",
    imageUrl: "",
    imageAlt: "Matcha Oat Latte",
    isAvailable: true,
  },
  {
    id: "mtc-003",
    name: "Coffee Matcha Latte",
    description: "Fusion dua rasa: espresso bold berpadu lembutnya matcha latte dingin.",
    price: 20000,
    category: "matcha",
    imageUrl: "",
    imageAlt: "Coffee Matcha Latte",
    isAvailable: true,
  },
  {
    id: "mtc-004",
    name: "Strawberry Matcha",
    description: "Lapisan buah stroberi manis berpadu susu dan seduhan matcha pekat.",
    price: 22000,
    category: "matcha",
    imageUrl: "",
    imageAlt: "Strawberry Matcha Latte",
    isAvailable: true,
    isPopular: true,
  },

  // ─── 6. MILK BASED SERIES (3 Item) ────────────────────────
  {
    id: "mlk-001",
    name: "Chocholate Punch",
    description: "Sajian minuman cokelat pekat tanpa kopi yang creamy dan manis pas.",
    price: 16000,
    category: "milk-based",
    imageUrl: "",
    imageAlt: "Chocholate Punch",
    isAvailable: true,
  },
  {
    id: "mlk-002",
    name: "Goguma (Ice Taro Latte)",
    description: "Racikan taro dan ubi manis ala Korea (Goguma) yang wangi dan lembut.",
    price: 16000,
    category: "milk-based",
    imageUrl: "",
    imageAlt: "Goguma Ice Taro Latte",
    isAvailable: true,
  },
  {
    id: "mlk-003",
    name: "Teh Gajah (Thai Tea)",
    description: "Seduhan teh rempah Thailand bercampur susu kental manis gurih legit.",
    price: 16000,
    category: "milk-based",
    imageUrl: "",
    imageAlt: "Teh Gajah Thai Tea",
    isAvailable: true,
  },

  // ─── 7. FRESH JUICE (3 Item) ──────────────────────────────
  {
    id: "juc-001",
    name: "Semangka",
    description: "Jus buah semangka merah segar tanpa tambahan pemanis buatan.",
    price: 16000,
    category: "fresh-juice",
    imageUrl: "",
    imageAlt: "Jus Semangka Segar",
    isAvailable: true,
  },
  {
    id: "juc-002",
    name: "Buah Naga",
    description: "Jus buah naga merah padat vitamin dan serat yang menyegarkan dahaga.",
    price: 16000,
    category: "fresh-juice",
    imageUrl: "",
    imageAlt: "Jus Buah Naga",
    isAvailable: true,
  },
  {
    id: "juc-003",
    name: "Nanas",
    description: "Jus buah nanas manis asam segar penambah energi seketika.",
    price: 16000,
    category: "fresh-juice",
    imageUrl: "",
    imageAlt: "Jus Nanas Segar",
    isAvailable: true,
  },

  // ─── 8. SNACK (4 Item) ────────────────────────────────────
  {
    id: "snk-001",
    name: "Tempe Mendoan",
    description: "Tempe kedelai tipis berbalut tepung bumbu daun bawang dengan sambal kecap pedas.",
    price: 15000,
    category: "snack",
    imageUrl: "",
    imageAlt: "Tempe Mendoan Panas",
    isAvailable: true,
    isPopular: true,
  },
  {
    id: "snk-002",
    name: "Sosis Cop cop",
    description: "Sosis goreng mekar gurih disajikan dengan cocolan saus sambal dan mayones.",
    price: 15000,
    category: "snack",
    imageUrl: "",
    imageAlt: "Sosis Cop cop",
    isAvailable: true,
  },
  {
    id: "snk-003",
    name: "Ubi Goreng",
    description: "Stik ubi manis lokal digoreng renyah di luar dan lembut pulen di dalam.",
    price: 15000,
    category: "snack",
    imageUrl: "",
    imageAlt: "Ubi Goreng Renyah",
    isAvailable: true,
  },
  {
    id: "snk-004",
    name: "Pisang Goreng",
    description: "Pisang goreng tepung krispi keemasan pendamping klasik seduhan kopi hitam.",
    price: 15000,
    category: "snack",
    imageUrl: "/images/madjoe/madjoe-pastry.jpeg",
    imageAlt: "Pisang Goreng Krispi",
    isAvailable: true,
    isPopular: true,
  },

  // ─── 9. MAKANAN BERAT (4 Item) ────────────────────────────
  {
    id: "mkn-001",
    name: "Nasi Telur Kribo",
    description: "Nasi putih hangat dengan telur dadar keriting krispi gurih dan sambal khas kedai.",
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
    description: "Ayam goreng bumbu rempah disiram sambal tempong segar pedas nampol khas Lombok.",
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
    description: "Ikan nila tawar digoreng garing bersanding lalapan dan sambal tempong segar.",
    price: 23000,
    category: "makanan-berat",
    imageUrl: "",
    imageAlt: "Nila Goreng Tempong",
    isAvailable: true,
  },
  {
    id: "mkn-004",
    name: "Nasi Goreng RW",
    description: "Nasi goreng racikan bumbu khas kedai dengan telur mata sapi dan kerupuk.",
    price: 17000,
    category: "makanan-berat",
    imageUrl: "",
    imageAlt: "Nasi Goreng RW Madjoe",
    isAvailable: true,
  },
];

/**
 * ─── 10. ADD ON (2 Item) ────────────────────────────────────
 * Tambahan pilihan yang dapat disematkan ke pesanan minuman
 */
export const menuAddons = [
  { id: "add-001", name: "+1 Shot Espresso", price: 5000 },
  { id: "add-002", name: "Oat Milk", price: 5000 },
];

/**
 * Label Kategori untuk Tab Navigasi & Filter Menu
 */
export const categoryTabs: { id: MenuCategory | "all"; label: string; icon: string }[] = [
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
  description: "Dapatkan diskon 25% setiap hari khusus untuk menu Americano Oji & Latte. Awali harimu di Madjoe Kopi!",
  badge: "PROMO PAGI",
};

/**
 * Category labels dictionary
 */
export const categoryLabels: Record<MenuCategory | "all", string> = {
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
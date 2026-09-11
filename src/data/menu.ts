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
    imageAlt: "Signature Madjoe Coffee - Kopi Susu Gula Aren",
    isAvailable: true,
    isPopular: true,
  },
  {
    id: "sig-002",
    name: "Madjoe Oat Latte",
    description: "Perpaduan lembut oat milk nabati pilihan dengan double shot espresso nusantara.",
    price: 20000,
    category: "signature",
    imageUrl: "https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Madjoe Oat Latte Dingin dengan Oat Milk",
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
    imageUrl: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Single shot espresso dengan crema tebal",
    isAvailable: true,
  },
  {
    id: "cof-002",
    name: "Tubruk",
    description: "Seduhan kopi tubruk tradisional nusantara dengan gilingan medium-fine yang harum.",
    price: 14000,
    category: "coffee",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Secangkir Kopi Tubruk Tradisional",
    isAvailable: true,
  },
  {
    id: "cof-003",
    name: "Latte",
    description: "Espresso halus berpadu steamed milk segar bersuhu pas. Manis alami susu.",
    price: 15000,
    category: "coffee",
    imageUrl: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Caffe Latte hangat dengan latte art",
    isAvailable: true,
    isPromo: true, // Promo Happy Hour 25% (08.00 - 11.00)
  },
  {
    id: "cof-004",
    name: "Cappuccino",
    description: "Keseimbangan seimbang sepertiga espresso, steamed milk, dan busa susu tebal.",
    price: 15000,
    category: "coffee",
    imageUrl: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Cappuccino klasik dengan foam susu tebal",
    isAvailable: true,
  },
  {
    id: "cof-005",
    name: "V60",
    description: "Manual brew pour over V60. Pilihan beans single origin berganti berkala (tanya barista).",
    price: 0,
    category: "coffee",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Seduhan manual brew V60 pour over",
    isAvailable: true,
  },

  // ─── 3. AMERICANO SERIES (3 Item) ─────────────────────────
  {
    id: "ame-001",
    name: "Americano Oji",
    description: "Americano klasik dingin atau panas dengan double shot espresso murni.",
    price: 15000,
    category: "americano",
    imageUrl: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Iced Americano Oji segar",
    isAvailable: true,
    isPromo: true, // Promo Happy Hour 25% (08.00 - 11.00)
  },
  {
    id: "ame-002",
    name: "Wild Blackberry",
    description: "Espresso americano berpadu ekstrak sari blackberry liar asam manis menyegarkan.",
    price: 20000,
    category: "americano",
    imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Wild Blackberry Americano dengan sari buah berry",
    isAvailable: true,
    isPopular: true,
  },
  {
    id: "ame-003",
    name: "Panana Coffee",
    description: "Kreasi segar espresso hitam dipadu aroma tropis nanas dan pisang.",
    price: 18000,
    category: "americano",
    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Panana Coffee espresso dingin aroma tropis",
    isAvailable: true,
  },

  // ─── 4. SWEET COFFEE SERIES (6 Item) ──────────────────────
  {
    id: "swc-001",
    name: "Roasted Peanut Butter",
    description: "Espresso susu berpadu rasa gurih-manis selai kacang panggang.",
    price: 15000,
    category: "sweet-coffee",
    imageUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Roasted Peanut Butter Coffee creamy gurih",
    isAvailable: true,
    isPopular: true,
  },
  {
    id: "swc-002",
    name: "Caramel Macchiato",
    description: "Lapisan susu vanila, espresso pekat, dan siraman saus karamel leleh.",
    price: 16000,
    category: "sweet-coffee",
    imageUrl: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Caramel Macchiato dengan siraman saus karamel leleh",
    isAvailable: true,
  },
  {
    id: "swc-003",
    name: "Sweet Strawberry",
    description: "Perpaduan unik sensasi buah stroberi manis segar dengan shot espresso dan susu.",
    price: 16000,
    category: "sweet-coffee",
    imageUrl: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Sweet Strawberry Coffee segar",
    isAvailable: true,
  },
  {
    id: "swc-004",
    name: "Butterscotch Sea Salt Latte",
    description: "Karamel butterscotch manis gurih dengan sentuhan taburan sea salt penyeimbang rasa.",
    price: 16000,
    category: "sweet-coffee",
    imageUrl: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Butterscotch Sea Salt Latte gurih manis",
    isAvailable: true,
    isPopular: true,
  },
  {
    id: "swc-005",
    name: "Choco Crumble Coffee",
    description: "Kopi susu cokelat kental dengan taburan remah biskuit cokelat renyah.",
    price: 16000,
    category: "sweet-coffee",
    imageUrl: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Choco Crumble Coffee dengan remah biskuit cokelat",
    isAvailable: true,
  },
  {
    id: "swc-006",
    name: "Palm Sugar Coffee",
    description: "Kopi susu gula aren murni dengan aroma karamel alami khas nusantara.",
    price: 16000,
    category: "sweet-coffee",
    imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Palm Sugar Coffee gula aren nusantara",
    isAvailable: true,
  },

  // ─── 5. MATCHA SERIES (4 Item) ────────────────────────────
  {
    id: "mtc-001",
    name: "Ice Matcha Latte",
    description: "Bubuk matcha Jepang murni dipadu susu segar dingin yang seimbang.",
    price: 16000,
    category: "matcha",
    imageUrl: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Ice Matcha Latte dingin creamy",
    isAvailable: true,
    isPopular: true,
  },
  {
    id: "mtc-002",
    name: "Matcha Oat Latte",
    description: "Seduhan matcha aromatik berpadu creamy oat milk nabati yang lembut.",
    price: 20000,
    category: "matcha",
    imageUrl: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Matcha Oat Latte nabati lembut",
    isAvailable: true,
  },
  {
    id: "mtc-003",
    name: "Coffee Matcha Latte",
    description: "Fusion dua rasa: espresso bold berpadu lembutnya matcha latte dingin.",
    price: 20000,
    category: "matcha",
    imageUrl: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Coffee Matcha Latte Dirty Matcha kombinasi espresso dan matcha",
    isAvailable: true,
  },
  {
    id: "mtc-004",
    name: "Strawberry Matcha",
    description: "Lapisan buah stroberi manis berpadu susu dan seduhan matcha pekat.",
    price: 22000,
    category: "matcha",
    imageUrl: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Strawberry Matcha Latte dengan selai buah stroberi",
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
    imageUrl: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Chocholate Punch pekat dan creamy",
    isAvailable: true,
  },
  {
    id: "mlk-002",
    name: "Goguma (Ice Taro Latte)",
    description: "Racikan taro dan ubi manis ala Korea (Goguma) yang wangi dan lembut.",
    price: 16000,
    category: "milk-based",
    imageUrl: "https://images.unsplash.com/photo-1579954115563-e72bf1381629?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Goguma Ice Taro Latte ubi manis ungu Korea",
    isAvailable: true,
  },
  {
    id: "mlk-003",
    name: "Teh Gajah (Thai Tea)",
    description: "Seduhan teh rempah Thailand bercampur susu kental manis gurih legit.",
    price: 16000,
    category: "milk-based",
    imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Teh Gajah Thai Tea rempah Thailand manis legit",
    isAvailable: true,
  },

  // ─── 7. FRESH JUICE (3 Item) ──────────────────────────────
  {
    id: "juc-001",
    name: "Semangka",
    description: "Jus buah semangka merah segar tanpa tambahan pemanis buatan.",
    price: 16000,
    category: "fresh-juice",
    imageUrl: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Jus Semangka merah segar alami",
    isAvailable: true,
  },
  {
    id: "juc-002",
    name: "Buah Naga",
    description: "Jus buah naga merah padat vitamin dan serat yang menyegarkan dahaga.",
    price: 16000,
    category: "fresh-juice",
    imageUrl: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Jus Buah Naga merah segar kaya vitamin",
    isAvailable: true,
  },
  {
    id: "juc-003",
    name: "Nanas",
    description: "Jus buah nanas manis asam segar penambah energi seketika.",
    price: 16000,
    category: "fresh-juice",
    imageUrl: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Jus Nanas segar asam manis tropis",
    isAvailable: true,
  },

  // ─── 8. SNACK (4 Item) ────────────────────────────────────
  {
    id: "snk-001",
    name: "Tempe Mendoan",
    description: "Tempe kedelai tipis berbalut tepung bumbu daun bawang dengan sambal kecap pedas.",
    price: 15000,
    category: "snack",
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Tempe Mendoan panas gurih dengan sambal kecap",
    isAvailable: true,
    isPopular: true,
  },
  {
    id: "snk-002",
    name: "Sosis Cop cop",
    description: "Sosis goreng mekar gurih disajikan dengan cocolan saus sambal dan mayones.",
    price: 15000,
    category: "snack",
    imageUrl: "https://images.unsplash.com/photo-1585325701165-351af916e581?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Sosis Cop cop goreng gurih renyah",
    isAvailable: true,
  },
  {
    id: "snk-003",
    name: "Ubi Goreng",
    description: "Stik ubi manis lokal digoreng renyah di luar dan lembut pulen di dalam.",
    price: 15000,
    category: "snack",
    imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Ubi Goreng stik renyah legit",
    isAvailable: true,
  },
  {
    id: "snk-004",
    name: "Pisang Goreng",
    description: "Pisang goreng tepung krispi keemasan pendamping klasik seduhan kopi hitam.",
    price: 15000,
    category: "snack",
    imageUrl: "/images/madjoe/madjoe-pastry.jpeg",
    imageAlt: "Pisang Goreng Krispi legit Madjoe Kopi",
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
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Nasi Telur Kribo dadar keriting krispi khas kedai",
    isAvailable: true,
    isPopular: true,
  },
  {
    id: "mkn-002",
    name: "Ayam Goreng Tempong",
    description: "Ayam goreng bumbu rempah disiram sambal tempong segar pedas nampol khas Lombok.",
    price: 25000,
    category: "makanan-berat",
    imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Ayam Goreng Tempong sambal segar pedas nampol",
    isAvailable: true,
    isPopular: true,
  },
  {
    id: "mkn-003",
    name: "Nila Goreng Tempong",
    description: "Ikan nila tawar digoreng garing bersanding lalapan dan sambal tempong segar.",
    price: 23000,
    category: "makanan-berat",
    imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Nila Goreng Tempong garing renyah dengan lalapan",
    isAvailable: true,
  },
  {
    id: "mkn-004",
    name: "Nasi Goreng RW",
    description: "Nasi goreng racikan bumbu khas kedai dengan telur mata sapi dan kerupuk.",
    price: 17000,
    category: "makanan-berat",
    imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Nasi Goreng RW Madjoe spesial dengan telur mata sapi",
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
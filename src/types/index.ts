// ============================================================
// src/types/index.ts
// Definisi tipe data global untuk aplikasi Madjoe Kopi
// ============================================================

/**
 * Kategori menu Madjoe Kopi sesuai data fisik kafe
 */
export type MenuCategory =
  | "all"
  | "signature"
  | "coffee"
  | "americano"
  | "sweet-coffee"
  | "matcha"
  | "milk-based"
  | "fresh-juice"
  | "snack"
  | "makanan-berat";

/**
 * Representasi satu item menu di daftar menu kafe.
 */
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;        // Harga dalam Rupiah
  category: MenuCategory;
  imageUrl: string;
  imageAlt?: string;
  isAvailable: boolean;
  isPopular?: boolean;
  isPromo?: boolean;
}

/**
 * Representasi satu item di dalam keranjang belanja.
 */
export interface CartItem extends MenuItem {
  quantity: number;
  selectedAddons?: string[]; // misal: "+1 Shot Espresso", "Oat Milk"
}

/**
 * Status keranjang belanja secara keseluruhan.
 */
export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

/**
 * Pilihan metode pembayaran in-app (ala Kopi Kenangan)
 */
export type PaymentMethod = "qris" | "va" | "cash";
export type EWalletProvider = "gopay" | "ovo" | "shopeepay";
export type BankProvider = "bca" | "mandiri" | "bri";

/**
 * Data form pemesanan & checkout
 */
export interface CheckoutFormData {
  customerName: string;
  pickupTime: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  paymentProvider?: string; // "GoPay", "BCA", dll
}

/**
 * Hasil pesanan yang berhasil dibuat
 */
export interface OrderResult {
  orderId: string; // misal: #MDK-8921
  customerName: string;
  pickupTime: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  paymentProvider?: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  status: "pending_payment" | "paid" | "ready_for_pickup";
  vaNumber?: string;
}

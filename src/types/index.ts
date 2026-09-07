// ============================================================
// src/types/index.ts
// Definisi tipe data global untuk aplikasi Madjoe Kopi
// ============================================================

/**
 * Representasi satu item menu di daftar menu kafe.
 */
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;        // Harga dalam Rupiah
  category: "kopi-susu" | "kopi-hitam" | "camilan";
  imageUrl: string;
  imageAlt: string;
  isAvailable: boolean;
}

/**
 * Representasi satu item di dalam keranjang belanja.
 * Extends MenuItem dengan tambahan field `quantity`.
 */
export interface CartItem extends MenuItem {
  quantity: number;
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
 * Data yang dikumpulkan dari form checkout.
 */
export interface CheckoutFormData {
  customerName: string;
  pickupTime: string;
}

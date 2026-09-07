// ============================================================
// src/hooks/useCart.ts
// Custom hook untuk state management keranjang belanja.
// Menggunakan React useState — dapat diganti dengan
// useReducer atau Zustand untuk skala lebih besar.
// ============================================================

"use client";

import { useState, useCallback, useMemo } from "react";
import { MenuItem, CartItem } from "@/types";

/**
 * Return type dari hook useCart.
 */
interface UseCartReturn {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  decreaseItem: (itemId: string) => void;
  clearCart: () => void;
  getItemQuantity: (itemId: string) => number;
}

/**
 * useCart — Custom hook pengelola keranjang belanja.
 *
 * Menyediakan:
 * - `items`          : Daftar item di keranjang beserta quantity
 * - `totalItems`     : Jumlah total unit item
 * - `totalPrice`     : Total harga keseluruhan (Rupiah)
 * - `addItem`        : Tambah 1 unit item (buat baru jika belum ada)
 * - `removeItem`     : Hapus item sepenuhnya dari keranjang
 * - `decreaseItem`   : Kurangi 1 unit (hapus jika qty mencapai 0)
 * - `clearCart`      : Kosongkan seluruh keranjang
 * - `getItemQuantity`: Cek quantity item tertentu di keranjang
 */
export function useCart(): UseCartReturn {
  const [items, setItems] = useState<CartItem[]>([]);

  /**
   * Tambah 1 unit item ke keranjang.
   * Jika item sudah ada, increment quantity-nya.
   */
  const addItem = useCallback((menuItem: MenuItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === menuItem.id);
      if (existing) {
        // Item sudah ada — tambah quantity
        return prev.map((i) =>
          i.id === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      // Item baru — tambahkan ke array
      return [...prev, { ...menuItem, quantity: 1 }];
    });
  }, []);

  /**
   * Kurangi 1 unit item. Jika quantity menjadi 0, hapus dari keranjang.
   */
  const decreaseItem = useCallback((itemId: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (!existing) return prev;

      if (existing.quantity === 1) {
        // Quantity sudah 1 — hapus item dari keranjang
        return prev.filter((i) => i.id !== itemId);
      }
      // Kurangi quantity
      return prev.map((i) =>
        i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  }, []);

  /**
   * Hapus item sepenuhnya dari keranjang (tanpa memperdulikan quantity).
   */
  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  /**
   * Kosongkan seluruh keranjang. Dipanggil setelah order berhasil dikirim.
   */
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  /**
   * Ambil quantity item tertentu di keranjang (0 jika tidak ada).
   */
  const getItemQuantity = useCallback(
    (itemId: string): number => {
      return items.find((i) => i.id === itemId)?.quantity ?? 0;
    },
    [items]
  );

  /**
   * Total unit item di keranjang (untuk badge notifikasi).
   * Di-memoize agar tidak dihitung ulang kecuali items berubah.
   */
  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  /**
   * Total harga keseluruhan dalam Rupiah.
   */
  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    decreaseItem,
    clearCart,
    getItemQuantity,
  };
}

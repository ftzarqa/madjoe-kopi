// ============================================================
// src/components/FloatingCartButton.tsx
// Floating Action Button (FAB) keranjang untuk mobile.
// Tampil hanya saat ada item di keranjang dan sidebar tertutup.
// ============================================================

"use client";

import { ShoppingCart } from "lucide-react";

interface FloatingCartButtonProps {
  totalItems: number;
  isCartOpen: boolean;
  onOpen: () => void;
}

/**
 * FloatingCartButton — FAB yang muncul di pojok kanan bawah.
 * Hanya tampil di mobile (md:hidden) saat keranjang tidak kosong
 * dan sidebar belum terbuka — membantu aksesibilitas di layar kecil.
 */
export default function FloatingCartButton({
  totalItems,
  isCartOpen,
  onOpen,
}: FloatingCartButtonProps) {
  // Jangan tampil jika keranjang kosong atau sidebar sudah terbuka
  if (totalItems === 0 || isCartOpen) return null;

  return (
    <button
      onClick={onOpen}
      aria-label={`Buka keranjang (${totalItems} item)`}
      className="fixed bottom-6 right-6 z-30
                 md:hidden
                 bg-brand-coffee text-white
                 w-16 h-16 rounded-full shadow-2xl
                 flex items-center justify-center
                 transition-all duration-300
                 hover:bg-brand-espresso hover:scale-110
                 active:scale-95
                 animate-fade-in"
    >
      <ShoppingCart size={24} />

      {/* Badge jumlah item */}
      <span
        className="absolute -top-1 -right-1
                   bg-red-500 text-white text-xs font-bold
                   w-6 h-6 rounded-full flex items-center justify-center"
      >
        {totalItems > 9 ? "9+" : totalItems}
      </span>
    </button>
  );
}

// ============================================================
// src/components/CartItem.tsx
// Baris Item di Keranjang — Animasi Layout & Tactile Micro-Interactions
// ============================================================

"use client";

import { motion } from "framer-motion";
import { Plus, Minus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { CINEMATIC_EASE } from "./Reveal";

interface CartItemProps {
  item: CartItemType;
  onAdd: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

/**
 * CartItem — Satu baris item di dalam keranjang belanja.
 * Menggunakan motion layout untuk transisi pergeseran item yang sangat halus.
 */
export default function CartItem({ item, onAdd, onDecrease, onRemove }: CartItemProps) {
  const subtotal = item.price * item.quantity;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, height: 0, paddingBottom: 0, paddingTop: 0 }}
      transition={{ duration: 0.25, ease: CINEMATIC_EASE }}
      className="flex items-center justify-between gap-3 py-3 border-b border-[#4A2E1B]/10 last:border-b-0"
    >
      
      {/* ── Nama Item & Harga Satuan ── */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[#4A2E1B] text-sm truncate">
          {item.name}
        </p>
        <p className="text-xs text-[#4A2E1B]/60 mt-0.5">
          {formatPrice(item.price)} × {item.quantity}
        </p>
        <p className="text-sm font-bold text-[#CE1827] mt-0.5">
          {formatPrice(subtotal)}
        </p>
      </div>

      {/* ── Kontrol Quantity & Hapus ── */}
      <div className="flex items-center gap-1.5 shrink-0">
        <div className="flex items-center gap-1 bg-[#F3ECE3] p-1 rounded-lg border border-[#C68E58]/30">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={onDecrease}
            className="w-6 h-6 rounded-md bg-white text-[#4A2E1B]
                       flex items-center justify-center shadow-xs
                       hover:bg-[#F3ECE3] hover:text-[#CE1827]
                       transition-colors duration-150 cursor-pointer"
            aria-label="Kurangi 1 item"
          >
            <Minus size={11} />
          </motion.button>

          <span className="w-5 text-center text-xs font-bold text-[#4A2E1B]">
            {item.quantity}
          </span>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={onAdd}
            className="w-6 h-6 rounded-md bg-[#CE1827] text-white
                       flex items-center justify-center shadow-xs
                       hover:bg-[#B51320]
                       transition-colors duration-150 cursor-pointer"
            aria-label="Tambah 1 item"
          >
            <Plus size={11} />
          </motion.button>
        </div>

        {/* Tombol Hapus Baris */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={onRemove}
          className="w-7 h-7 rounded-lg text-[#4A2E1B]/40
                     flex items-center justify-center
                     hover:bg-red-50 hover:text-[#CE1827]
                     transition-colors duration-150 cursor-pointer"
          aria-label={`Hapus ${item.name}`}
        >
          <Trash2 size={13} />
        </motion.button>
      </div>
    </motion.div>
  );
}

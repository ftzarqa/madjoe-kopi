// ============================================================
// src/components/CartItem.tsx
// Satu baris item di dalam panel keranjang belanja.
// ============================================================

import { Plus, Minus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
  onAdd: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

/**
 * CartItem — Baris item dalam keranjang dengan kontrol qty dan hapus.
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
    <div className="flex items-start gap-3 py-3 border-b border-brand-cream
                    last:border-b-0 animate-fade-in">
      {/* Nama & Subtotal */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-brand-espresso text-sm truncate">
          {item.name}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          {formatPrice(item.price)} × {item.quantity}
        </p>
        <p className="text-sm font-bold text-brand-coffee mt-1">
          {formatPrice(subtotal)}
        </p>
      </div>

      {/* Kontrol Qty */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button
          onClick={onDecrease}
          className="w-7 h-7 rounded-lg bg-brand-cream text-brand-espresso
                     flex items-center justify-center
                     hover:bg-brand-latte transition-colors duration-150
                     active:scale-90"
          aria-label="Kurangi"
        >
          <Minus size={12} />
        </button>

        <span className="w-6 text-center text-sm font-bold text-brand-espresso">
          {item.quantity}
        </span>

        <button
          onClick={onAdd}
          className="w-7 h-7 rounded-lg bg-brand-coffee text-white
                     flex items-center justify-center
                     hover:bg-brand-espresso transition-colors duration-150
                     active:scale-90"
          aria-label="Tambah"
        >
          <Plus size={12} />
        </button>

        {/* Tombol Hapus */}
        <button
          onClick={onRemove}
          className="w-7 h-7 ml-1 rounded-lg bg-red-50 text-red-400
                     flex items-center justify-center
                     hover:bg-red-100 hover:text-red-600
                     transition-colors duration-150 active:scale-90"
          aria-label={`Hapus ${item.name}`}
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
}

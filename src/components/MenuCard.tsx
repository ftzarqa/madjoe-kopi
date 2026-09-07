// ============================================================
// src/components/MenuCard.tsx
// Card untuk menampilkan satu item menu.
// Menampilkan gambar, nama, deskripsi, harga, dan kontrol qty.
// ============================================================

"use client";

import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { MenuItem } from "@/types";
import { categoryLabels } from "@/data/menu";

interface MenuCardProps {
  item: MenuItem;
  quantity: number;           // Jumlah item ini di keranjang
  onAdd: (item: MenuItem) => void;
  onDecrease: (itemId: string) => void;
}

/**
 * MenuCard — Menampilkan satu item menu dalam bentuk card.
 *
 * Jika item belum di keranjang: tampil tombol "Tambah".
 * Jika sudah di keranjang: tampil kontrol +/- dengan quantity.
 */
export default function MenuCard({ item, quantity, onAdd, onDecrease }: MenuCardProps) {
  const isInCart = quantity > 0;

  /**
   * Format harga ke format Rupiah Indonesia.
   * Contoh: 28000 → "Rp 28.000"
   */
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  // Warna badge berdasarkan kategori
  const badgeColors: Record<MenuItem["category"], string> = {
    "kopi-susu":  "bg-amber-100 text-amber-800",
    "kopi-hitam": "bg-gray-200 text-gray-800",
    "camilan":    "bg-orange-100 text-orange-800",
  };

  return (
    <div className="menu-card group">
      {/* ── Gambar Menu ── */}
      <div className="relative h-48 overflow-hidden bg-brand-cream">
        <Image
          src={item.imageUrl}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          // Fallback jika gambar gagal load
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://placehold.co/400x300/6F4E37/F5ECD7?text=${encodeURIComponent(item.name)}`;
          }}
        />

        {/* Badge kategori di atas gambar */}
        <span
          className={`category-badge absolute top-3 left-3 ${badgeColors[item.category]}`}
        >
          {categoryLabels[item.category]}
        </span>

        {/* Overlay jika tidak tersedia */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Habis</span>
          </div>
        )}
      </div>

      {/* ── Detail Menu ── */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-serif font-bold text-lg text-brand-espresso leading-tight">
          {item.name}
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {/* Harga & Kontrol Tambah/Kurang */}
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-brand-coffee text-lg">
            {formatPrice(item.price)}
          </span>

          {/* Tombol Tambah ke Keranjang atau Kontrol Qty */}
          {!isInCart ? (
            // Belum di keranjang — tampil tombol "Tambah"
            <button
              onClick={() => onAdd(item)}
              disabled={!item.isAvailable}
              className="btn-primary flex items-center gap-1 text-sm"
              aria-label={`Tambah ${item.name} ke keranjang`}
            >
              <Plus size={16} />
              Tambah
            </button>
          ) : (
            // Sudah di keranjang — tampil kontrol +/-
            <div className="flex items-center gap-2">
              <button
                onClick={() => onDecrease(item.id)}
                className="w-8 h-8 rounded-lg bg-brand-latte text-brand-espresso
                           flex items-center justify-center
                           hover:bg-brand-coffee hover:text-white
                           transition-colors duration-200 active:scale-90"
                aria-label={`Kurangi ${item.name}`}
              >
                <Minus size={14} />
              </button>

              <span
                className="w-8 text-center font-bold text-brand-espresso
                           animate-fade-in"
              >
                {quantity}
              </span>

              <button
                onClick={() => onAdd(item)}
                className="w-8 h-8 rounded-lg bg-brand-coffee text-white
                           flex items-center justify-center
                           hover:bg-brand-espresso
                           transition-colors duration-200 active:scale-90"
                aria-label={`Tambah lagi ${item.name}`}
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

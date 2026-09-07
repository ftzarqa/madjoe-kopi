// ============================================================
// src/components/MenuGrid.tsx
// Grid layout yang menampilkan semua menu, dikelompokkan
// berdasarkan kategori dengan section heading.
// ============================================================

"use client";

import { MenuItem } from "@/types";
import { menuItems, categoryLabels, categoryOrder } from "@/data/menu";
import MenuCard from "./MenuCard";

interface MenuGridProps {
  getItemQuantity: (itemId: string) => number;
  onAdd: (item: MenuItem) => void;
  onDecrease: (itemId: string) => void;
}

/**
 * MenuGrid — Menampilkan seluruh daftar menu dalam grid responsif,
 * dikelompokkan per kategori (Kopi Susu, Kopi Hitam, Camilan).
 *
 * Layout:
 * - Mobile (< 640px): 1 kolom
 * - Tablet (640-1023px): 2 kolom
 * - Desktop (≥ 1024px): 3 kolom
 */
export default function MenuGrid({ getItemQuantity, onAdd, onDecrease }: MenuGridProps) {
  return (
    <section id="menu" className="max-w-6xl mx-auto px-4 py-8">

      {/* ── Section Title ── */}
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-espresso mb-2">
          Menu Kami
        </h2>
        <p className="text-gray-500 text-sm md:text-base">
          Semua dibuat segar setiap hari. Pilih, pesan, ambil — semudah itu.
        </p>
        <div className="mt-3 w-16 h-1 bg-brand-gold mx-auto rounded-full" />
      </div>

      {/* ── Iterasi per Kategori ── */}
      {categoryOrder.map((category) => {
        // Filter item sesuai kategori
        const itemsInCategory = menuItems.filter(
          (item) => item.category === category
        );

        if (itemsInCategory.length === 0) return null;

        return (
          <div key={category} className="mb-12">
            {/* Heading Kategori */}
            <h3 className="font-serif text-2xl font-bold text-brand-espresso mb-6
                           pb-2 border-b-2 border-brand-latte">
              {categoryLabels[category]}
            </h3>

            {/* Grid kartu menu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {itemsInCategory.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  quantity={getItemQuantity(item.id)}
                  onAdd={onAdd}
                  onDecrease={onDecrease}
                />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

// ============================================================
// src/components/MenuGrid.tsx
// Grid Layout Menu Madjoe Kopi dengan Scroll Reveal Animasi
// ============================================================

"use client";

import { MenuItem, MenuCategory } from "@/types";
import { menuItems, categoryLabels, categoryOrder } from "@/data/menu";
import MenuCard from "./MenuCard";
import Reveal from "./Reveal";

interface MenuGridProps {
  getItemQuantity: (itemId: string) => number;
  onAdd: (item: MenuItem) => void;
  onDecrease: (itemId: string) => void;
}

/**
 * MenuGrid — Menampilkan seluruh daftar menu dalam layout grid responsif
 * dengan scroll-driven entrance animation menggunakan Reveal component.
 */
export default function MenuGrid({ getItemQuantity, onAdd, onDecrease }: MenuGridProps) {
  return (
    <section id="menu" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">

      {/* ── Section Title dengan Scroll Reveal ── */}
      <Reveal className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C68E58]/15 border border-[#C68E58]/30 text-[#4A2E1B] text-xs font-semibold uppercase tracking-wider mb-3">
          Fresh Brews &amp; Bites
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A2E1B] tracking-tight">
          Daftar Menu Madjoe
        </h2>
        <p className="text-[#4A2E1B]/75 text-sm sm:text-base max-w-xl mx-auto mt-2 leading-relaxed">
          Diramu dari biji kopi nusantara pilihan dan camilan segar harian. Pilih menu favoritmu untuk diambil langsung di kafe.
        </p>
        <div className="mt-4 w-20 h-1 bg-[#C68E58] mx-auto rounded-full" />
      </Reveal>

      {/* ── Iterasi per Kategori ── */}
      {categoryOrder.map((category: MenuCategory) => {
        const itemsInCategory = menuItems.filter(
          (item) => item.category === category
        );

        if (itemsInCategory.length === 0) return null;

        return (
          <div key={category} className="mb-14 last:mb-0">
            {/* Header Kategori */}
            <Reveal delay={0.1} className="flex items-center gap-4 mb-6 pb-3 border-b border-[#C68E58]/30">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A2E1B]">
                {categoryLabels[category]}
              </h3>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white border border-[#C68E58]/30 text-[#4A2E1B]/80">
                {itemsInCategory.length} pilihan
              </span>
            </Reveal>

            {/* Grid Kartu Menu dengan Staggered Entrance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {itemsInCategory.map((item, idx) => (
                <Reveal key={item.id} delay={0.08 * (idx % 3)} y={20}>
                  <MenuCard
                    item={item}
                    quantity={getItemQuantity(item.id)}
                    onAdd={onAdd}
                    onDecrease={onDecrease}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

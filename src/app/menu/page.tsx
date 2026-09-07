// ============================================================
// src/app/menu/page.tsx
// Halaman Katalog Menu Lengkap Madjoe Kopi
// Filter Kategori Interaktif, Pencarian, Add-on, & Promo Banner
// ============================================================

"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import MenuCard from "@/components/MenuCard";
import Reveal, { CINEMATIC_EASE } from "@/components/Reveal";
import { menuItems, categoryTabs, promoBannerData, menuAddons } from "@/data/menu";
import { MenuCategory } from "@/types";
import { Search, Tag, Clock, Sparkles, Coffee, PlusCircle } from "lucide-react";

export default function MenuCatalogPage() {
  const { addItem, decreaseItem, getItemQuantity } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter items berdasarkan kategori & search query
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="pt-24 sm:pt-28 pb-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      
      {/* ── HEADER HALAMAN KATALOG ── */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#C68E58]/35 text-[#4A2E1B] text-[11px] font-semibold uppercase tracking-[0.25em] shadow-xs mb-3">
            <Coffee size={13} className="text-[#CE1827]" />
            <span>Katalog Resmi · Madjoe Kopi</span>
          </div>

          <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[#4A2E1B] tracking-tight">
            Pilihan Menu Lengkap
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#4A2E1B]/70 mt-2.5 leading-relaxed">
            Semua diracik segar harian di Jl. Pejanggik No.66X Mataram. Pilih menu, masukkan keranjang, dan bayar in-app.
          </p>
        </Reveal>
      </div>

      {/* ── BANNER PROMO HAPPY HOUR DISKON 25% ── */}
      <Reveal className="mb-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#CE1827] via-[#B51320] to-[#8C0E18] text-white p-4 sm:p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Tag size={20} className="text-amber-200" />
            </div>
            <div>
              <p className="font-serif font-bold text-base sm:text-lg leading-tight">
                {promoBannerData.title}
              </p>
              <p className="text-xs text-white/80 mt-0.5">
                {promoBannerData.description}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 bg-black/25 px-3 py-1.5 rounded-xl text-xs font-semibold">
            <Clock size={14} className="text-amber-300" />
            <span>{promoBannerData.time}</span>
          </div>
        </div>
      </Reveal>

      {/* ── KARTU INFORMASI ADD-ON PILIHAN ── */}
      <Reveal delay={0.05} className="mb-8">
        <div className="bg-white rounded-2xl p-4 border border-[#4A2E1B]/10 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F3ECE3] flex items-center justify-center text-[#C68E58]">
              <PlusCircle size={18} />
            </div>
            <div>
              <span className="font-serif font-bold text-sm text-[#4A2E1B] block">
                Tersedia Pilihan Add-on Minuman:
              </span>
              <span className="text-[11px] text-[#4A2E1B]/60">
                Bisa di-request saat checkout di catatan pesanan
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {menuAddons.map((addon) => (
              <span
                key={addon.id}
                className="inline-flex items-center gap-1.5 bg-[#F3ECE3] border border-[#C68E58]/35 text-[#4A2E1B] font-semibold px-3 py-1 rounded-full text-xs"
              >
                <span>{addon.name}</span>
                <span className="text-[#CE1827] font-bold">+Rp 5.000</span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── SEARCH BAR & TAB FILTER KATEGORI ── */}
      <div className="mb-8 space-y-4">
        
        {/* Input Pencarian */}
        <div className="relative max-w-md mx-auto sm:mx-0">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A2E1B]/40" />
          <input
            type="text"
            placeholder="Cari menu kopi, matcha, makanan berat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#4A2E1B]/20 rounded-full pl-11 pr-4 py-2.5 text-xs sm:text-sm text-[#4A2E1B] placeholder-[#4A2E1B]/40 focus:outline-none focus:border-[#4A2E1B] focus:ring-2 focus:ring-[#C68E58]/30 shadow-xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#4A2E1B]/50 hover:text-[#4A2E1B]"
            >
              Hapus
            </button>
          )}
        </div>

        {/* Tab Kategori Lengkap */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoryTabs.map((tab) => {
            const isActive = selectedCategory === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#CE1827] text-white shadow-md shadow-[#CE1827]/25"
                    : "bg-white text-[#4A2E1B]/75 border border-[#4A2E1B]/12 hover:border-[#C68E58]/50 hover:bg-[#F3ECE3]/60"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── GRID MENU UTAMA ── */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#4A2E1B]/10 p-8">
          <p className="text-4xl mb-2">🔍</p>
          <h3 className="font-serif font-bold text-xl text-[#4A2E1B]">
            Menu Tidak Ditemukan
          </h3>
          <p className="text-xs text-[#4A2E1B]/70 mt-1">
            Coba kata kunci lain atau pilih tab kategori &quot;Semua&quot;.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 text-xs font-bold text-[#CE1827] underline"
          >
            Reset Pencarian
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: Math.min(idx * 0.03, 0.3) }}
              >
                <MenuCard
                  item={item}
                  quantity={getItemQuantity(item.id)}
                  onAdd={addItem}
                  onDecrease={decreaseItem}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* ── FOOTER STATISTIK ── */}
      <div className="mt-16 text-center text-xs text-[#4A2E1B]/60 border-t border-[#4A2E1B]/10 pt-6">
        Menampilkan <strong>{filteredItems.length}</strong> dari <strong>{menuItems.length}</strong> menu fisik asli Madjoe Kopi Mataram.
      </div>
    </div>
  );
}

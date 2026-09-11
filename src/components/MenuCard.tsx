// ============================================================
// src/components/MenuCard.tsx
// Card Menu Resmi Madjoe Kopi — Proporsi Visual Bersih & Modern
// Diadaptasi dari card showcase portofolio-ref
// ============================================================

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  Coffee,
  Leaf,
  Sparkles,
  GlassWater,
  Cookie,
  Utensils,
  ArrowUpRight,
} from "lucide-react";
import { MenuItem } from "@/types";
import { categoryLabels } from "@/data/menu";
import { CINEMATIC_EASE } from "./Reveal";

interface MenuCardProps {
  item: MenuItem;
  quantity: number;
  onAdd: (item: MenuItem) => void;
  onDecrease: (itemId: string) => void;
}

/**
 * Helper memilih ikon minimalis sesuai kategori menu
 */
function getCategoryIcon(category: MenuItem["category"]) {
  switch (category) {
    case "coffee":
    case "americano":
    case "sweet-coffee":
    case "signature":
      return <Coffee size={26} className="text-[#C68E58]" />;
    case "matcha":
      return <Leaf size={26} className="text-[#5B8246]" />;
    case "milk-based":
      return <Sparkles size={26} className="text-[#C68E58]" />;
    case "fresh-juice":
      return <GlassWater size={26} className="text-[#D97706]" />;
    case "snack":
      return <Cookie size={26} className="text-[#C68E58]" />;
    case "makanan-berat":
      return <Utensils size={26} className="text-[#CE1827]" />;
    default:
      return <Coffee size={26} className="text-[#C68E58]" />;
  }
}

/**
 * Helper memilih sub-label artistik untuk fallback card
 */
function getCategorySubtitle(category: MenuItem["category"]) {
  switch (category) {
    case "coffee":
    case "americano":
    case "sweet-coffee":
    case "signature":
      return "Freshly Brewed";
    case "matcha":
      return "Artisan Blend";
    case "milk-based":
      return "Creamy & Smooth";
    case "fresh-juice":
      return "Cold Pressed";
    case "snack":
      return "Crispy Savory";
    case "makanan-berat":
      return "Main Dish";
    default:
      return "Freshly Crafted";
  }
}

/**
 * MenuCard — Kartu menu dengan proporsi bersih, sudut tegas rounded-2xl,
 * tipografi editorial, dan micro-interaction taktil saat disentuh/di-hover.
 */
export default function MenuCard({ item, quantity, onAdd, onDecrease }: MenuCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isInCart = quantity > 0;
  const hasImage = Boolean(item.imageUrl) && !imgError;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: CINEMATIC_EASE }}
      className="bg-white rounded-2xl border border-[#4A2E1B]/12 shadow-[0_4px_16px_rgba(74,46,27,0.05)] hover:shadow-[0_20px_40px_-8px_rgba(74,46,27,0.14)] hover:border-[#C68E58]/45 transition-colors duration-300 flex flex-col overflow-hidden group"
    >
      
      {/* ── Visual Media Container dengan Aspect Ratio Proporsional (4/3) ── */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3ECE3]">
        {hasImage ? (
          <>
            {/* Shimmer / Skeleton Placeholder saat memuat gambar */}
            {isLoading && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#EFE5D8] via-[#FAF5EE] to-[#EFE5D8] animate-pulse flex items-center justify-center z-1">
                <Coffee size={24} className="text-[#C68E58]/35 animate-pulse" />
              </div>
            )}
            <Image
              src={item.imageUrl}
              alt={item.imageAlt || item.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-cover transition-all duration-700 ease-out group-hover:scale-108 ${
                isLoading ? "opacity-0 scale-102" : "opacity-100 scale-100"
              }`}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setImgError(true);
                setIsLoading(false);
              }}
            />
          </>
        ) : (
          /* ── Fallback Visual Elegan Bertema Warm Cream / Caramel Brown ── */
          <div className="w-full h-full flex flex-col items-center justify-center relative bg-gradient-to-br from-[#FAF5EE] via-[#F3ECE3] to-[#E5D7C5] p-5 text-center select-none overflow-hidden">
            {/* Ornamen Garis Cincin Dekoratif Stempel Kedai */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <div className="w-36 h-36 rounded-full border border-dashed border-[#C68E58]/40" />
              <div className="absolute w-24 h-24 rounded-full border border-[#C68E58]/30" />
            </div>

            {/* Ikon Minimalis Sesuai Kategori */}
            <div className="relative z-10 w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white/90 border border-[#C68E58]/35 flex items-center justify-center mb-2 shadow-xs group-hover:scale-108 group-hover:rotate-2 transition-transform duration-300">
              {getCategoryIcon(item.category)}
            </div>

            {/* Tipografi Identitas Madjoe Kopi */}
            <div className="relative z-10">
              <span className="text-xs font-serif font-black text-[#4A2E1B] tracking-tight block">
                Madjoe Kopi
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#4A2E1B]/60 font-semibold block mt-0.5">
                {getCategorySubtitle(item.category)}
              </span>
            </div>
          </div>
        )}

        {/* Gradient Overlay Halus untuk Kontras Visual (Hanya untuk foto agar teks/badge terbaca jelas) */}
        {hasImage && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 opacity-70 group-hover:opacity-40 transition-opacity duration-300" />
        )}

        {/* Badge Kategori Sekunder (Caramel Brown Pill) */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-[#4A2E1B] border border-[#C68E58]/40 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs">
            {categoryLabels[item.category]}
          </span>
        </div>

        {/* Micro-interaction Panah Sudut (Terinspirasi ProjectCard portofolio-ref) */}
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1.5 -translate-y-1.5 group-hover:translate-x-0 group-hover:translate-y-0">
          <div className="w-7 h-7 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#4A2E1B] shadow-xs">
            <ArrowUpRight size={14} className="text-[#CE1827]" />
          </div>
        </div>

        {/* Overlay jika menu sedang habis */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-[#4A2E1B]/80 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="bg-white text-[#CE1827] font-black text-xs uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
              Sedang Habis
            </span>
          </div>
        )}
      </div>

      {/* ── Detail Konten Menu ── */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 className="font-serif font-bold text-lg text-[#4A2E1B] leading-snug group-hover:text-[#CE1827] transition-colors duration-200">
            {item.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#4A2E1B]/70 leading-relaxed mt-1.5 line-clamp-2 font-normal">
            {item.description}
          </p>
        </div>

        {/* ── Baris Harga & Aksi ── */}
        <div className="flex items-center justify-between pt-3 border-t border-[#4A2E1B]/10 mt-auto">
          {/* Badge Harga (Signature Red Highlight) */}
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#4A2E1B]/50 block font-bold">
              Harga
            </span>
            <span className="font-bold text-lg text-[#CE1827] tracking-tight">
              {formatPrice(item.price)}
            </span>
          </div>

          {/* Kontrol Tambah atau Qty */}
          {!isInCart ? (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.18, ease: CINEMATIC_EASE }}
              onClick={() => onAdd(item)}
              disabled={!item.isAvailable}
              className="bg-[#CE1827] text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl
                         flex items-center gap-1.5 shadow-md shadow-[#CE1827]/25
                         hover:bg-[#B51320] hover:shadow-lg hover:shadow-[#CE1827]/35
                         cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
              aria-label={`Tambah ${item.name} ke keranjang`}
            >
              <Plus size={15} />
              <span>Tambah</span>
            </motion.button>
          ) : (
            <motion.div
              layout
              className="flex items-center gap-1.5 bg-[#F3ECE3]/90 p-1 rounded-xl border border-[#C68E58]/35 shadow-xs"
            >
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => onDecrease(item.id)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white text-[#4A2E1B]
                           flex items-center justify-center shadow-xs
                           hover:bg-[#F3ECE3] hover:text-[#CE1827]
                           transition-colors duration-150 cursor-pointer"
                aria-label={`Kurangi ${item.name}`}
              >
                <Minus size={13} />
              </motion.button>

              <AnimatePresence mode="wait">
                <motion.span
                  key={quantity}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="w-6 text-center font-bold text-xs sm:text-sm text-[#4A2E1B]"
                >
                  {quantity}
                </motion.span>
              </AnimatePresence>

              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => onAdd(item)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#CE1827] text-white
                           flex items-center justify-center shadow-xs
                           hover:bg-[#B51320]
                           transition-colors duration-150 cursor-pointer"
                aria-label={`Tambah lagi ${item.name}`}
              >
                <Plus size={13} />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

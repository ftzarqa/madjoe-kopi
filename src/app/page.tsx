// ============================================================
// src/app/page.tsx
// Halaman utama — Orchestrator seluruh aplikasi Madjoe Kopi.
// Mengelola state keranjang dan visibilitas sidebar.
// ============================================================

"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import Navbar from "@/components/Navbar";
import MenuGrid from "@/components/MenuGrid";
import CartSidebar from "@/components/CartSidebar";
import FloatingCartButton from "@/components/FloatingCartButton";

/**
 * HomePage — Root page component (SPA).
 *
 * Bertanggung jawab:
 * 1. Inisialisasi useCart hook
 * 2. Mengelola state isCartOpen (sidebar keranjang)
 * 3. Meneruskan callbacks ke komponen anak
 */
export default function HomePage() {
  // ── State keranjang dari custom hook ──
  const {
    items,
    totalItems,
    totalPrice,
    addItem,
    decreaseItem,
    removeItem,
    clearCart,
    getItemQuantity,
  } = useCart();

  // ── State visibilitas sidebar keranjang ──
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart  = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* ── Navigasi Atas ── */}
      <Navbar
        totalItems={totalItems}
        onCartOpen={openCart}
      />

      {/* ── Hero Section ── */}
      <section
        className="relative bg-brand-espresso text-white
                   py-16 px-4 text-center overflow-hidden"
      >
        {/* Dekorasi lingkaran background */}
        <div
          className="absolute -top-20 -left-20 w-80 h-80
                     bg-brand-gold/10 rounded-full blur-3xl"
        />
        <div
          className="absolute -bottom-10 -right-10 w-60 h-60
                     bg-brand-coffee/20 rounded-full blur-2xl"
        />

        <div className="relative max-w-2xl mx-auto">
          <p className="text-brand-gold text-sm font-semibold tracking-widest uppercase mb-3">
            ✦ Mataram, Nusa Tenggara Barat ✦
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Madjoe Kopi
          </h1>
          <p className="text-brand-latte text-lg md:text-xl mb-2">
            Order &amp; Take — Pesan online, ambil langsung.
          </p>
          <p className="text-brand-latte/70 text-sm">
            Pilih menu favoritmu, isi nama &amp; waktu, kirim via WhatsApp — kopimu siap saat kamu tiba!
          </p>

          {/* CTA scroll ke menu */}
          <a
            href="#menu"
            className="inline-block mt-8 bg-brand-gold text-brand-espresso
                       font-bold px-8 py-3 rounded-2xl
                       transition-all duration-200
                       hover:brightness-110 hover:scale-105 active:scale-95"
          >
            Lihat Menu →
          </a>
        </div>
      </section>

      {/* ── Grid Menu ── */}
      <main>
        <MenuGrid
          getItemQuantity={getItemQuantity}
          onAdd={addItem}
          onDecrease={decreaseItem}
        />
      </main>

      {/* ── Footer ── */}
      <footer className="bg-brand-espresso text-brand-latte text-center
                         py-8 px-4 mt-8">
        <p className="font-serif text-xl text-brand-gold mb-1">Madjoe Kopi</p>
        <p className="text-sm">📍 Mataram, Nusa Tenggara Barat</p>
        <p className="text-sm mt-1">
          📞 <a href="tel:+6287852005008" className="hover:text-white transition-colors">
            0878-5200-5008
          </a>
        </p>
        <p className="text-xs text-brand-latte/50 mt-4">
          © 2024 Madjoe Kopi. Dibuat dengan ☕ &amp; 💻
        </p>
      </footer>

      {/* ── Sidebar Keranjang ── */}
      <CartSidebar
        isOpen={isCartOpen}
        items={items}
        totalItems={totalItems}
        totalPrice={totalPrice}
        onClose={closeCart}
        onAdd={addItem}
        onDecrease={decreaseItem}
        onRemove={removeItem}
        onClear={clearCart}
      />

      {/* ── FAB Keranjang (Mobile Only) ── */}
      <FloatingCartButton
        totalItems={totalItems}
        isCartOpen={isCartOpen}
        onOpen={openCart}
      />
    </div>
  );
}

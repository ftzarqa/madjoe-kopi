// ============================================================
// src/components/CartSidebar.tsx
// Panel keranjang belanja — slide-in dari kanan.
// Berisi daftar item, total, dan form checkout.
// ============================================================

"use client";

import { X, ShoppingBag } from "lucide-react";
import { CartItem as CartItemType, MenuItem } from "@/types";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";

interface CartSidebarProps {
  isOpen: boolean;
  items: CartItemType[];
  totalItems: number;
  totalPrice: number;
  onClose: () => void;
  onAdd: (item: MenuItem) => void;
  onDecrease: (itemId: string) => void;
  onRemove: (itemId: string) => void;
  onClear: () => void;
}

/**
 * CartSidebar — Panel keranjang yang slide-in dari kanan layar.
 *
 * Terdiri dari:
 * - Header: judul + tombol tutup
 * - Daftar item (CartItem) dengan scroll
 * - Ringkasan total harga
 * - Form checkout (CheckoutForm)
 *
 * Di-overlay dengan backdrop semi-transparan saat terbuka.
 */
export default function CartSidebar({
  isOpen,
  items,
  totalItems,
  totalPrice,
  onClose,
  onAdd,
  onDecrease,
  onRemove,
  onClear,
}: CartSidebarProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <>
      {/* ── Backdrop Overlay ── */}
      {/* Klik backdrop untuk menutup sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm
                     animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar Panel ── */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Keranjang belanja"
        className={`
          fixed top-0 right-0 z-50 h-full
          w-full max-w-md
          bg-white shadow-2xl
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* ── Header Sidebar ── */}
        <div className="flex items-center justify-between
                        px-5 py-4 bg-brand-espresso text-white
                        flex-shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <h2 className="font-serif font-bold text-lg">
              Keranjang
            </h2>
            {totalItems > 0 && (
              <span className="bg-brand-gold text-brand-espresso
                               text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems} item
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup keranjang"
            className="p-1.5 rounded-lg hover:bg-white/20 transition-colors duration-150"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Body Sidebar (scrollable) ── */}
        <div className="flex-1 overflow-y-auto cart-scroll px-5 py-4">
          {items.length === 0 ? (
            // State kosong
            <div className="flex flex-col items-center justify-center h-full
                            text-center text-gray-400 gap-4 py-16">
              <span className="text-6xl">🛒</span>
              <div>
                <p className="font-semibold text-lg">Keranjang Kosong</p>
                <p className="text-sm mt-1">
                  Pilih menu favoritmu dari daftar di bawah!
                </p>
              </div>
            </div>
          ) : (
            // Daftar item
            <div>
              {/* Tombol Kosongkan */}
              <div className="flex justify-end mb-3">
                <button
                  onClick={onClear}
                  className="text-xs text-red-400 hover:text-red-600
                             underline transition-colors duration-150"
                >
                  Kosongkan semua
                </button>
              </div>

              {/* Daftar CartItem */}
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onAdd={() => onAdd(item)}
                  onDecrease={() => onDecrease(item.id)}
                  onRemove={() => onRemove(item.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Footer: Total + Checkout ── */}
        {items.length > 0 && (
          <div className="flex-shrink-0 px-5 pb-6 bg-white
                          shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">

            {/* Ringkasan harga */}
            <div className="flex justify-between items-center py-4
                            border-b border-brand-cream">
              <span className="text-gray-600 font-medium">
                Subtotal ({totalItems} item)
              </span>
              <span className="font-bold text-xl text-brand-espresso">
                {formatPrice(totalPrice)}
              </span>
            </div>

            {/* Form Checkout */}
            <CheckoutForm
              cartItems={items}
              totalPrice={totalPrice}
              onClose={onClose}
              onOrderSuccess={onClear}
            />
          </div>
        )}
      </aside>
    </>
  );
}

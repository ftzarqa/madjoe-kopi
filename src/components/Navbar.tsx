// ============================================================
// src/components/Navbar.tsx
// Header / navigasi atas aplikasi Madjoe Kopi
// ============================================================

import { MapPin, Clock } from "lucide-react";

interface NavbarProps {
  totalItems: number;
  onCartOpen: () => void;
}

/**
 * Navbar — Header kafe dengan branding dan info lokasi.
 * Tombol keranjang dengan badge jumlah item.
 */
export default function Navbar({ totalItems, onCartOpen }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-brand-espresso shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* ── Logo & Branding ── */}
        <div className="flex flex-col">
          <span className="text-brand-gold font-serif text-2xl font-bold tracking-wide leading-tight">
            Madjoe Kopi
          </span>
          <div className="flex items-center gap-1 text-brand-latte text-xs">
            <MapPin size={11} />
            <span>Mataram, NTB</span>
            <span className="mx-1">·</span>
            <Clock size={11} />
            <span>07.00 – 22.00</span>
          </div>
        </div>

        {/* ── Tagline (hidden di mobile) ── */}
        <p className="hidden md:block text-brand-latte text-sm italic">
          &ldquo;Order & Take — Cepat, Nikmat, Tanpa Ribet&rdquo;
        </p>

        {/* ── Tombol Keranjang ── */}
        <button
          onClick={onCartOpen}
          aria-label={`Buka keranjang belanja (${totalItems} item)`}
          className="relative flex items-center gap-2 bg-brand-gold text-brand-espresso
                     font-bold px-4 py-2 rounded-xl
                     transition-all duration-200
                     hover:brightness-110 active:scale-95"
        >
          {/* Ikon keranjang SVG sederhana */}
          <span className="text-lg">🛒</span>
          <span className="hidden sm:inline text-sm">Keranjang</span>

          {/* Badge jumlah item — hanya tampil jika ada item */}
          {totalItems > 0 && (
            <span
              className="absolute -top-2 -right-2
                         bg-red-500 text-white text-xs font-bold
                         w-5 h-5 rounded-full flex items-center justify-center
                         animate-bounce-once"
            >
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

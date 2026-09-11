// ============================================================
// src/components/Navbar.tsx
// Floating Pill Navbar dengan Multi-Page Link & Logo Retro Madjoe
// ============================================================

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { CINEMATIC_EASE } from "./Reveal";

interface NavbarProps {
  totalItems: number;
  onCartOpen: () => void;
}

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Katalog Menu", href: "/menu" },
  { label: "Cerita", href: "/cerita" },
  { label: "Lokasi & Jam", href: "/lokasi" },
  { label: "Dapur", href: "/dapur" },
];

export default function Navbar({ totalItems, onCartOpen }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-4 sm:top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: CINEMATIC_EASE }}
        className={`pointer-events-auto w-full max-w-5xl rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-500 ease-out flex items-center justify-between border ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-[#4A2E1B]/15 shadow-[0_12px_35px_rgba(74,46,27,0.12)]"
            : "bg-white/90 backdrop-blur-md border-[#4A2E1B]/10 shadow-[0_8px_25px_rgba(74,46,27,0.06)]"
        }`}
      >
        {/* ── LOGO RESMI MADJOE KOPI ── */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group cursor-pointer select-none"
        >
          {/* Logo Asli dari /images/madjoe/logo-madjoe.jpeg */}
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#C68E58]/35 shadow-xs group-hover:border-[#CE1827] group-hover:scale-105 transition-all duration-200 shrink-0 bg-[#F3ECE3]">
            <Image
              src="/images/madjoe/logo-madjoe.jpeg"
              alt="Logo Resmi Madjoe Kopi Mataram"
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5 leading-none">
              {/* Tipografi Retro Serif Berkarakter */}
              <span className="font-serif italic font-black text-xl sm:text-2xl text-[#4A2E1B] tracking-tight group-hover:text-[#CE1827] transition-colors">
                Madjoe
              </span>
              <span className="font-sans font-extrabold text-[10px] tracking-[0.22em] text-[#C68E58] uppercase">
                KOPI
              </span>
            </div>

            {/* Subtext Resmi Sesuai Brand Guidelines */}
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#4A2E1B]/60 font-semibold mt-0.5">
              MATARAM · EST. 2024
            </span>
          </div>
        </Link>

        {/* ── MULTI-PAGE NAVIGATION LINKS DENGAN ACTIVE INDICATOR ── */}
        <ul className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                    isActive
                      ? "text-[#CE1827] bg-red-50/80 font-bold"
                      : "text-[#4A2E1B]/75 hover:text-[#4A2E1B] hover:bg-black/5"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#CE1827] rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── TOMBOL KERANJANG FLOATING PILL ── */}
        <div className="flex items-center gap-2">
          <motion.button
            onClick={onCartOpen}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 8px 24px rgba(206, 24, 39, 0.38)",
            }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.2, ease: CINEMATIC_EASE }}
            aria-label={`Buka keranjang belanja (${totalItems} item)`}
            className="relative flex items-center gap-2 bg-[#CE1827] text-white
                       font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full
                       shadow-md shadow-[#CE1827]/25 hover:bg-[#B51320] cursor-pointer"
          >
            <motion.div
              animate={totalItems > 0 ? { rotate: [0, -12, 12, -6, 6, 0] } : {}}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ShoppingBag size={16} className="text-white" />
            </motion.div>
            
            <span className="text-xs sm:text-sm font-medium">Keranjang</span>

            {/* Dynamic Spring Badge Counter */}
            <AnimatePresence mode="wait">
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.3, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 600, damping: 22 }}
                  className="bg-white text-[#CE1827] text-[11px] font-black
                             w-5 h-5 rounded-full flex items-center justify-center
                             shadow-xs ml-0.5"
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>
    </div>
  );
}

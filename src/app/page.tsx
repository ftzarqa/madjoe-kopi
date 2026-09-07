// ============================================================
// src/app/page.tsx
// Halaman Beranda Madjoe Kopi — Editorial Visual & Motion
// ============================================================

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import MenuCard from "@/components/MenuCard";
import Reveal, { CINEMATIC_EASE } from "@/components/Reveal";
import { menuItems, promoBannerData } from "@/data/menu";
import {
  Coffee,
  Zap,
  ShoppingBag,
  ArrowDown,
  ArrowRight,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  CreditCard,
  Tag,
  Wifi,
} from "lucide-react";

export default function HomePage() {
  const { addItem, decreaseItem, getItemQuantity, openCart } = useCart();

  // Ambil 6 menu populer / pilihan untuk showcase di beranda
  const featuredMenu = menuItems.filter((m) => m.isPopular || m.isPromo).slice(0, 6);

  return (
    <div className="flex flex-col overflow-x-hidden">
      
      {/* ── 1. HERO SECTION SPLIT 2-KOLOM ── */}
      <section
        id="home"
        className="relative min-h-[92vh] sm:min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-8 md:px-12 xl:px-20 flex items-center overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          
          {/* Kolom Kiri: Tipografi Raksasa Majalah */}
          <div className="lg:col-span-7 z-20 flex flex-col justify-center">
            
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: CINEMATIC_EASE }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#C68E58]/35 text-[#4A2E1B] text-[11px] font-semibold uppercase tracking-[0.25em] shadow-xs mb-6 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-[#CE1827] animate-pulse" />
              <span>Mataram, NTB · Est. 2024</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: CINEMATIC_EASE }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[8rem] font-black uppercase leading-[0.84] tracking-tighter text-[#4A2E1B]"
            >
              MADJOE
              <br />
              <span className="text-[#CE1827]">
                KOPI.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: CINEMATIC_EASE }}
              className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-[#4A2E1B]/85 font-serif italic max-w-xl leading-relaxed"
            >
              &ldquo;Kedai kopi klasik di jantung Kota Mataram. Pesan mandiri via web, bayar in-app, ambil tanpa antre.&rdquo;
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: CINEMATIC_EASE }}
              className="mt-3 text-xs sm:text-sm text-[#4A2E1B]/70 max-w-lg leading-relaxed font-normal"
            >
              Kini hadir dengan sistem order mandiri ala Kopi Kenangan. Dukung pembayaran QRIS instan, Transfer Virtual Account, atau Tunai di meja kasir Jl. Pejanggik No.66X.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: CINEMATIC_EASE }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/menu"
                className="bg-[#CE1827] text-white font-bold px-7 sm:px-8 py-3.5 sm:py-4 rounded-full
                           flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider
                           shadow-lg shadow-[#CE1827]/25 hover:bg-[#B51320] transition-all hover:scale-103 active:scale-95 cursor-pointer"
              >
                <span>Lihat Katalog Menu</span>
                <ArrowRight size={16} />
              </Link>

              <button
                onClick={openCart}
                className="bg-white/90 border border-[#C68E58]/40 text-[#4A2E1B] font-semibold px-6 py-3.5 sm:py-4 rounded-full
                           flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider
                           hover:border-[#4A2E1B] hover:bg-[#F3ECE3] shadow-xs transition-all hover:scale-102 active:scale-96 cursor-pointer"
              >
                <ShoppingBag size={16} className="text-[#C68E58]" />
                <span>Buka Keranjang</span>
              </button>
            </motion.div>

            {/* Quick Badges Informasi */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4 text-xs text-[#4A2E1B]/75 border-t border-[#4A2E1B]/10 pt-5"
            >
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-[#C68E58]" />
                <span className="font-medium">08.00 – 24.00 WITA</span>
              </div>
              <span className="text-[#C68E58]">•</span>
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-[#C68E58]" />
                <span className="font-medium">Jl. Pejanggik No.66X</span>
              </div>
              <span className="text-[#C68E58]">•</span>
              <div className="flex items-center gap-1.5">
                <CreditCard size={14} className="text-[#CE1827]" />
                <span className="font-medium">QRIS · VA · Kasir</span>
              </div>
            </motion.div>

          </div>

          {/* ── Kolom Kanan: Bento Showcase 4 Foto Asli Madjoe Kopi ── */}
          <div className="lg:col-span-5 relative w-full">
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
              
              {/* Card 1 (Utama): Blueberry Cheesecake dengan Kopi Susu */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: CINEMATIC_EASE }}
                className="col-span-2 relative aspect-[16/10] sm:aspect-[16/9.5] rounded-[22px] overflow-hidden border border-[#4A2E1B]/15 shadow-md group bg-white"
              >
                <Image
                  src="/images/madjoe/blueberry_cheesecake_dengankopisusu.jpeg"
                  alt="Blueberry Cheesecake dengan Kopi Susu Madjoe"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E1B]/90 via-black/20 to-transparent" />
                <div className="absolute top-3.5 left-3.5">
                  <span className="bg-[#CE1827] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
                    Signature Pairing
                  </span>
                </div>
                <div className="absolute bottom-3.5 left-4 right-4 text-white">
                  <h3 className="font-serif font-bold text-base sm:text-lg leading-tight">
                    Blueberry Cheesecake &amp; Kopi Susu
                  </h3>
                  <p className="text-[11px] text-white/80 mt-1 line-clamp-1">
                    Kombinasi klasik manis lembut cheesecake dengan espresso kopi susu Madjoe.
                  </p>
                </div>
              </motion.div>

              {/* Card 2: Madjoe Pastry */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: CINEMATIC_EASE }}
                className="relative aspect-[4/3] rounded-[20px] overflow-hidden border border-[#4A2E1B]/15 shadow-sm group bg-white"
              >
                <Image
                  src="/images/madjoe/madjoe-pastry.jpeg"
                  alt="Pastry Segar Madjoe Kopi"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E1B]/85 via-transparent to-black/10" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="font-serif font-bold text-xs sm:text-sm leading-tight">Artisan Pastry</p>
                  <p className="text-[10px] text-white/75 mt-0.5">Freshly baked harian</p>
                </div>
              </motion.div>

              {/* Card 3: Suasana Kafe Madjoe */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: CINEMATIC_EASE }}
                className="relative aspect-[4/3] rounded-[20px] overflow-hidden border border-[#4A2E1B]/15 shadow-sm group bg-white"
              >
                <Image
                  src="/images/madjoe/suasana_kafemadjoe.jpeg"
                  alt="Suasana Kedai Madjoe Kopi"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E1B]/85 via-transparent to-black/10" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="font-serif font-bold text-xs sm:text-sm leading-tight">Kedai Homey</p>
                  <p className="text-[10px] text-white/75 mt-0.5">Jl. Pejanggik No.66X</p>
                </div>
              </motion.div>

              {/* Card 4: Barista Madjoe */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: CINEMATIC_EASE }}
                className="col-span-2 relative aspect-[21/9] sm:aspect-[2.4/1] rounded-[20px] overflow-hidden border border-[#4A2E1B]/15 shadow-sm group bg-white"
              >
                <Image
                  src="/images/madjoe/barista-madjoe.jpeg"
                  alt="Barista Madjoe Kopi Seduh Manual"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E1B]/85 via-transparent to-black/10" />
                <div className="absolute bottom-3 left-4 right-4 text-white flex items-center justify-between">
                  <div>
                    <p className="font-serif font-bold text-xs sm:text-sm leading-tight">Barista Berdedikasi</p>
                    <p className="text-[10px] text-white/75 mt-0.5">Keahlian seduh manual &amp; espresso</p>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-full text-white">
                    Made to Order
                  </span>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </section>

      {/* ── 2. PROMO BANNER: HAPPY HOUR DISKON 25% ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#CE1827] to-[#8C0E18] text-white p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative z-10 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-[11px] font-black uppercase tracking-wider mb-3">
                <Tag size={13} />
                <span>{promoBannerData.badge}</span>
              </div>
              <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl leading-tight">
                {promoBannerData.title}
              </h2>
              <p className="text-white/90 text-xs sm:text-sm mt-2 leading-relaxed font-medium">
                {promoBannerData.description}
              </p>
              <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-xl bg-black/20 text-xs font-semibold">
                <Clock size={14} className="text-amber-300" />
                <span>Setiap Hari {promoBannerData.time}</span>
              </div>
            </div>

            <div className="relative z-10 shrink-0">
              <Link
                href="/menu"
                className="bg-white text-[#CE1827] font-bold px-6 py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:bg-[#F3ECE3] transition-colors flex items-center gap-2"
              >
                <span>Pesan Menu Promo</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Dekorasi Aksen Lingkaran di Background */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/10 pointer-events-none blur-xl" />
          </div>
        </Reveal>
      </section>

      {/* ── 3. MENU SIGNATURE PILIHAN ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C68E58] block mb-2">
              Pilihan Barista
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A2E1B] tracking-tight">
              Menu Terlaris &amp; Signature
            </h2>
            <p className="text-xs sm:text-sm text-[#4A2E1B]/70 mt-1 max-w-md">
              Mulai dari Signature Madjoe Coffee, Wild Blackberry Americano, hingga Nasi Telur Kribo renyah.
            </p>
          </Reveal>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#CE1827] hover:text-[#B51320] transition-colors group self-start sm:self-auto border-b border-[#CE1827]/40 pb-0.5"
          >
            <span>Buka Semua Menu ({menuItems.length} Pilihan)</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid 6 Menu Pilihan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredMenu.map((item, idx) => (
            <Reveal key={item.id} delay={0.08 * (idx % 3)}>
              <MenuCard
                item={item}
                quantity={getItemQuantity(item.id)}
                onAdd={addItem}
                onDecrease={decreaseItem}
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-[#CE1827] text-white font-bold px-8 py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#CE1827]/25 hover:bg-[#B51320] transition-all hover:scale-102 cursor-pointer"
          >
            <span>Eksplorasi Seluruh Menu Madjoe</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── 4. BENTO SHOWCASE: FILOSOFI & NILAI MADJOE ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <Reveal className="mb-10 text-center md:text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C68E58] block mb-2">
            Nilai Kami
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A2E1B] tracking-tight">
            Filosofi Seduhan &amp; Pelayanan
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Reveal delay={0.05}>
            <div className="bg-white rounded-2xl p-6 border border-[#4A2E1B]/10 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
              <div>
                <span className="font-serif font-black text-3xl text-[#C68E58]/50 block mb-3">01</span>
                <h3 className="font-serif font-bold text-lg text-[#4A2E1B] mb-2">Kopi Nusantara Murni</h3>
                <p className="text-xs sm:text-sm text-[#4A2E1B]/70 leading-relaxed">
                  Diracik dari biji kopi arabika pilihan Nusantara dengan profil roasting optimal untuk rasa bersih dan seimbang.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#4A2E1B]/10 flex items-center justify-between text-xs text-[#C68E58] font-semibold">
                <span>100% Arabika</span>
                <Coffee size={16} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="bg-white rounded-2xl p-6 border border-[#4A2E1B]/10 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
              <div>
                <span className="font-serif font-black text-3xl text-[#CE1827]/40 block mb-3">02</span>
                <h3 className="font-serif font-bold text-lg text-[#4A2E1B] mb-2">Order Mandiri In-App</h3>
                <p className="text-xs sm:text-sm text-[#4A2E1B]/70 leading-relaxed">
                  Pesan langsung dari ponselmu ala Kopi Kenangan. Dukung pembayaran QRIS instan dan transfer VA otomatis.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#4A2E1B]/10 flex items-center justify-between text-xs text-[#CE1827] font-semibold">
                <span>Tanpa Antre</span>
                <Zap size={16} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.19}>
            <div className="bg-white rounded-2xl p-6 border border-[#4A2E1B]/10 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
              <div>
                <span className="font-serif font-black text-3xl text-[#C68E58]/50 block mb-3">03</span>
                <h3 className="font-serif font-bold text-lg text-[#4A2E1B] mb-2">Camilan &amp; Makanan Segar</h3>
                <p className="text-xs sm:text-sm text-[#4A2E1B]/70 leading-relaxed">
                  Mulai dari Tempe Mendoan panas, Pisang Goreng krispi, hingga Ayam Tempong pedas nikmat untuk makan siang/malam.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#4A2E1B]/10 flex items-center justify-between text-xs text-[#C68E58] font-semibold">
                <span>Made to Order</span>
                <Sparkles size={16} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="bg-white rounded-2xl p-6 border border-[#4A2E1B]/10 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
              <div>
                <span className="font-serif font-black text-3xl text-[#4A2E1B]/40 block mb-3">04</span>
                <h3 className="font-serif font-bold text-lg text-[#4A2E1B] mb-2">Tempat Hangat &amp; Luas</h3>
                <p className="text-xs sm:text-sm text-[#4A2E1B]/70 leading-relaxed">
                  Jl. Pejanggik No.66X dengan area indoor AC dingin, Wi-Fi kencang, stopkontak banyak, dan area outdoor smoking.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#4A2E1B]/10 flex items-center justify-between text-xs text-[#4A2E1B] font-semibold">
                <span>Homey Vibe</span>
                <Wifi size={16} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5. TEASER CERITA & LOKASI ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Reveal>
            <div className="bg-white rounded-3xl p-8 border border-[#4A2E1B]/10 shadow-sm flex flex-col justify-between h-full">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C68E58] block mb-2">
                  Sejarah Kami
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#4A2E1B] leading-tight">
                  Cerita di Balik Madjoe Kopi
                </h3>
                <p className="text-xs sm:text-sm text-[#4A2E1B]/70 mt-3 leading-relaxed">
                  Lahir dari kerinduan akan ruang berkumpul yang hangat dan bersahaja di tengah hiruk-pikuk Kota Mataram, Madjoe Kopi memadukan nuansa nostalgia dengan kecepatan teknologi modern.
                </p>
              </div>
              <Link
                href="/cerita"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#CE1827] hover:text-[#B51320] border-b border-[#CE1827]/30 pb-0.5 w-fit"
              >
                <span>Baca Selengkapnya Tentang Kami</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-white rounded-3xl p-8 border border-[#4A2E1B]/10 shadow-sm flex flex-col justify-between h-full">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C68E58] block mb-2">
                  Temukan Kami
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#4A2E1B] leading-tight">
                  Lokasi &amp; Jam Operasional
                </h3>
                <p className="text-xs sm:text-sm text-[#4A2E1B]/70 mt-3 leading-relaxed">
                  Jl. Pejanggik No.66X, Pejanggik, Kec. Mataram. Buka setiap hari dari pukul <strong>08.00 hingga 24.00 WITA</strong>. Fasilitas Wi-Fi cepat, area kerja nyaman, dan parkir lega.
                </p>
              </div>
              <Link
                href="/lokasi"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#CE1827] hover:text-[#B51320] border-b border-[#CE1827]/30 pb-0.5 w-fit"
              >
                <span>Lihat Peta &amp; Panduan Arah</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. FOOTER RESMI MADJOE KOPI ── */}
      <footer className="bg-white border-t border-[#4A2E1B]/10 text-[#4A2E1B] py-12 px-4 sm:px-6 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-serif italic font-black text-2xl text-[#4A2E1B]">
                Madjoe
              </span>
              <span className="font-sans font-black text-xs tracking-widest text-[#C68E58] uppercase">
                KOPI
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C68E58]/15 text-[#4A2E1B] border border-[#C68E58]/30 font-bold uppercase">
                MATARAM · EST. 2024
              </span>
            </div>
            <p className="text-xs text-[#4A2E1B]/70 mt-1 max-w-sm">
              Jl. Pejanggik No.66X, Pejanggik, Kec. Mataram, Kota Mataram, NTB 83122.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-[#4A2E1B]/80">
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#C68E58]" />
              <span>08.00 – 24.00 WITA</span>
            </div>
            <span className="hidden sm:inline text-[#C68E58]">•</span>
            <div className="flex items-center gap-1.5">
              <Phone size={14} className="text-[#CE1827]" />
              <a
                href="https://wa.me/6287852005008"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#CE1827] font-semibold transition-colors"
              >
                0878-5200-5008
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-[#4A2E1B]/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#4A2E1B]/60 text-center">
          <p>© {new Date().getFullYear()} Madjoe Kopi. Seluruh hak cipta dilindungi.</p>
          <div className="flex gap-4">
            <Link href="/menu" className="hover:text-[#CE1827]">Katalog Menu</Link>
            <Link href="/cerita" className="hover:text-[#CE1827]">Cerita Kami</Link>
            <Link href="/lokasi" className="hover:text-[#CE1827]">Lokasi</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

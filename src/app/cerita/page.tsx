// ============================================================
// src/app/cerita/page.tsx
// Halaman Cerita & Profil Sejarah Madjoe Kopi
// Kedai kopi klasik di jantung Kota Mataram, NTB
// ============================================================

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Reveal, { CINEMATIC_EASE } from "@/components/Reveal";
import { Coffee, Heart, Users, Sparkles, ArrowRight, MapPin } from "lucide-react";

export default function CeritaPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-20 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
      
      {/* ── HEADER CERITA ── */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#C68E58]/35 text-[#4A2E1B] text-[11px] font-semibold uppercase tracking-[0.25em] shadow-xs mb-3">
            <Heart size={12} className="text-[#CE1827]" />
            <span>Kisah Di Balik Cangkir</span>
          </div>

          <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[#4A2E1B] tracking-tight leading-[1.1]">
            Melangkah Madjoe Bersama Secangkir Cerita
          </h1>
          <p className="font-serif italic text-base sm:text-lg text-[#4A2E1B]/80 mt-3 max-w-xl mx-auto leading-relaxed">
            &ldquo;Bukan sekadar tempat minum kopi, tapi ruang bersahaja untuk bertukar ide dan bernafas sejenak di Kota Mataram.&rdquo;
          </p>
        </Reveal>
      </div>

      {/* ── HERO IMAGE CERITA ── */}
      <Reveal className="mb-14">
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-xl border border-[#4A2E1B]/15">
          <Image
            src="/images/madjoe/suasana_kafemadjoe.jpeg"
            alt="Kedai Madjoe Kopi Mataram"
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E1B]/85 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white max-w-lg">
            <span className="text-[10px] uppercase tracking-widest text-[#C68E58] font-bold block mb-1">
              Jl. Pejanggik No.66X, Mataram
            </span>
            <p className="font-serif font-bold text-lg sm:text-2xl leading-snug">
              Ruang temu yang menyatukan aroma masa lalu dengan energi masa kini.
            </p>
          </div>
        </div>
      </Reveal>

      {/* ── BAB 1: SEJARAH & AWAL MULA ── */}
      <section className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C68E58] block mb-2">
              Bab 01 · Awal Mula
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-[#4A2E1B] mb-4 leading-tight">
              Lahir di Jantung Kota Mataram
            </h2>
            <div className="text-xs sm:text-sm text-[#4A2E1B]/80 space-y-3.5 leading-relaxed">
              <p>
                Didirikan pada tahun 2024 di sepanjang jalur legendaris <strong>Jl. Pejanggik No.66X</strong>, Madjoe Kopi berakar dari kerinduan akan sebuah kedai kopi yang tidak berjarak dengan masyarakatnya.
              </p>
              <p>
                Di era kedai modern yang serba tergesa-gesa, kami memilih kata <em>&quot;Madjoe&quot;</em> bukan hanya sebagai harapan untuk terus melangkah ke depan, melainkan sebagai komitmen untuk memajukan budaya ngopi santai yang penuh kehangatan persaudaraan khas Lombok.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-6">
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#4A2E1B]/15 shadow-md group">
              <Image
                src="/images/madjoe/kasirdanbarista-madjoekopi.jpeg"
                alt="Kasir dan Barista Madjoe Kopi"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E1B]/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3.5 left-4 right-4 text-white">
                <p className="font-serif font-bold text-xs sm:text-sm">Pelayanan Hangat di Meja Bar</p>
                <p className="text-[10px] text-white/75">Menyapa setiap pelanggan bagai kawan lama</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BAB 2: DEDIKASI BIJI KOPI NUSANTARA ── */}
      <section className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6 order-2 md:order-1">
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#4A2E1B]/15 shadow-md group">
              <Image
                src="/images/madjoe/barista-madjoe.jpeg"
                alt="Barista Madjoe Kopi menyeduh kopi"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E1B]/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3.5 left-4 right-4 text-white">
                <p className="font-serif font-bold text-xs sm:text-sm">Presisi Tiap Ekstraksi</p>
                <p className="text-[10px] text-white/75">Dedikasi seduhan manual brew dan espresso</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-6 order-1 md:order-2">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C68E58] block mb-2">
              Bab 02 · Kualitas
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-[#4A2E1B] mb-4 leading-tight">
              Dedikasi Biji Kopi Lokal Nusantara
            </h2>
            <div className="text-xs sm:text-sm text-[#4A2E1B]/80 space-y-3.5 leading-relaxed">
              <p>
                Kami percaya rasa yang jujur datang dari tanah yang subur. Kami bermitra langsung dengan petani kopi lokal di lereng <strong>Gunung Rinjani (Sembalun)</strong>, serta biji kopi pilihan dari <strong>Gayo Aceh</strong> dan <strong>Flores Bajawa</strong>.
              </p>
              <p>
                Setiap biji di-roasting dengan tingkat kematangan medium untuk mempertahankan aroma floral, manis alami karamel, dan profil acidity yang lembut di lambung.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BAB 3: FOTO KELUARGA & KOMUNITAS MADJOE ── */}
      <section className="mb-16">
        <Reveal>
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-lg border border-[#4A2E1B]/15 group">
            <Image
              src="/images/madjoe/anggota-madjoe.jpeg"
              alt="Keluarga Besar dan Tim Madjoe Kopi Mataram"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E1B]/90 via-black/30 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 text-white max-w-xl">
              <span className="text-[10px] uppercase tracking-widest text-[#C68E58] font-bold block mb-1">
                Kultur &amp; Persaudaraan
              </span>
              <h3 className="font-serif font-bold text-lg sm:text-2xl leading-tight">
                Keluarga Besar Madjoe Kopi
              </h3>
              <p className="text-xs sm:text-sm text-white/80 mt-1">
                Setiap cangkir tercipta berkat dedikasi tim dan kebersamaan komunitas yang selalu setia bertandang.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── BAB 4: KONSEP TEMPAT KUMPUL HOMEY ── */}
      <section className="mb-16 bg-white rounded-3xl p-8 sm:p-12 border border-[#4A2E1B]/10 shadow-sm text-center">
        <Reveal>
          <div className="w-12 h-12 rounded-2xl bg-[#F3ECE3] flex items-center justify-center text-[#CE1827] mx-auto mb-4">
            <Users size={24} />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C68E58] block mb-2">
            Bab 04 · Tempat &amp; Rasa
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-4xl text-[#4A2E1B] max-w-xl mx-auto leading-tight mb-4">
            Rumah Kedua untuk Warga Mataram
          </h2>
          <p className="text-xs sm:text-sm text-[#4A2E1B]/75 max-w-2xl mx-auto leading-relaxed">
            Apakah kamu datang untuk mengerjakan tugas kuliah, berdiskusi proyek bersama tim, atau sekadar menikmati waktu santai dengan secangkir Americano Oji dan Tempe Mendoan hangat — Madjoe Kopi adalah rumah keduamu.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/menu"
              className="bg-[#CE1827] text-white font-bold px-7 py-3 rounded-full text-xs uppercase tracking-wider shadow-md hover:bg-[#B51320] transition-all"
            >
              Lihat Menu Kami
            </Link>
            <Link
              href="/lokasi"
              className="bg-[#F3ECE3] border border-[#C68E58]/40 text-[#4A2E1B] font-bold px-7 py-3 rounded-full text-xs uppercase tracking-wider hover:bg-white transition-all"
            >
              Kunjungi Kedai
            </Link>
          </div>
        </Reveal>
      </section>

    </div>
  );
}

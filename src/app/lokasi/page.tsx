// ============================================================
// src/app/lokasi/page.tsx
// Halaman Lokasi & Operasional Resmi Madjoe Kopi
// Alamat, Jam Buka, Fasilitas Lengkap, & Tombol Google Maps
// ============================================================

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Reveal, { CINEMATIC_EASE } from "@/components/Reveal";
import {
  MapPin,
  Clock,
  Wifi,
  Zap,
  Wind,
  Cigarette,
  Car,
  Phone,
  ArrowUpRight,
  Navigation,
  Sparkles,
  Camera,
} from "lucide-react";

export default function LokasiPage() {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Jl.+Pejanggik+No.66X,+Pejanggik,+Mataram,+NTB";

  const facilities = [
    {
      icon: <Wifi size={20} />,
      title: "Wi-Fi Cepat",
      desc: "Koneksi internet stabil untuk WFC (Work From Cafe) & nugas.",
    },
    {
      icon: <Zap size={20} />,
      title: "Stopkontak di Setiap Meja",
      desc: "Isi daya laptop dan gadgetmu tanpa khawatir kehabisan baterai.",
    },
    {
      icon: <Wind size={20} />,
      title: "Area Indoor AC",
      desc: "Ruang sejuk ber-AC bebas asap rokok untuk fokus dan kenyamanan.",
    },
    {
      icon: <Cigarette size={20} />,
      title: "Area Outdoor Smoking",
      desc: "Suasana terbuka asri untuk bersantai dan ngobrol akrab.",
    },
    {
      icon: <Car size={20} />,
      title: "Area Parkir Luas",
      desc: "Parkir mobil dan motor aman, dijaga langsung di depan kedai.",
    },
    {
      icon: <Sparkles size={20} />,
      title: "Musholla & Toilet",
      desc: "Fasilitas ibadah dan sanitasi bersih yang selalu terjaga harian.",
    },
  ];

  const galleryPhotos = [
    {
      src: "/images/madjoe/suasana_kafemadjoe2.jpeg",
      title: "Area Barista & Meja Seduh",
      desc: "Suasana akrab berhadapan langsung dengan barista",
    },
    {
      src: "/images/madjoe/suasana_kafemadjoe3.jpeg",
      title: "Sudut Tenang & Nugas",
      desc: "Kenyamanan membaca, nugas, dan WFC santai",
    },
    {
      src: "/images/madjoe/suasana_kafemadjoe4.jpeg",
      title: "Area Duduk Komunal",
      desc: "Ruang temu yang hangat untuk diskusi kelompok",
    },
    {
      src: "/images/madjoe/suasana_kafemadjoe5.jpeg",
      title: "Suasana Teduh Kedai",
      desc: "Pencahayaan hangat untuk melepas lelah di Mataram",
    },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-20 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
      
      {/* ── HEADER LOKASI ── */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#C68E58]/35 text-[#4A2E1B] text-[11px] font-semibold uppercase tracking-[0.25em] shadow-xs mb-3">
            <MapPin size={12} className="text-[#CE1827]" />
            <span>Pusat Kota Mataram</span>
          </div>

          <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[#4A2E1B] tracking-tight">
            Lokasi &amp; Jam Buka
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#4A2E1B]/70 mt-2.5 max-w-lg mx-auto leading-relaxed">
            Kunjungi kedai kami langsung di pusat Kota Mataram atau pesan take-away lewat web dan ambil di kasir.
          </p>
        </Reveal>
      </div>

      {/* ── KARTU UTAMA ALAMAT & JAM OPERASIONAL ── */}
      <Reveal className="mb-12">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#4A2E1B]/15 shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-xl">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C68E58] block mb-1">
                Alamat Fisik Resmi
              </span>
              <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#4A2E1B] leading-snug">
                Jl. Pejanggik No.66X, Pejanggik, Kec. Mataram
              </h2>
              <p className="text-xs sm:text-sm text-[#4A2E1B]/70 mt-1">
                Kota Mataram, Nusa Tenggara Barat 83122
              </p>
            </div>

            <div className="pt-3 border-t border-[#4A2E1B]/10 flex flex-wrap gap-4 text-xs font-semibold text-[#4A2E1B]">
              <div className="flex items-center gap-2 bg-[#F3ECE3] px-4 py-2 rounded-xl border border-[#C68E58]/30">
                <Clock size={16} className="text-[#CE1827]" />
                <span>Buka Setiap Hari: <strong>08.00 – 24.00 WITA</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-[#F3ECE3] px-4 py-2 rounded-xl border border-[#C68E58]/30">
                <Phone size={16} className="text-[#25D366]" />
                <a href="https://wa.me/6287852005008" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  0878-5200-5008
                </a>
              </div>
            </div>
          </div>

          {/* Tombol Aksi CTA Maps */}
          <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#CE1827] text-white font-bold px-8 py-4 rounded-full text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#CE1827]/25 hover:bg-[#B51320] transition-all hover:scale-102 active:scale-95 cursor-pointer"
            >
              <Navigation size={16} />
              <span>Buka di Google Maps</span>
              <ArrowUpRight size={16} />
            </a>

            <p className="text-[11px] text-center text-[#4A2E1B]/60">
              Titik lokasi akurat &amp; panduan navigasi instan
            </p>
          </div>

        </div>
      </Reveal>

      {/* ── FASILITAS KEDAI MADJOE KOPI ── */}
      <section className="mb-14">
        <Reveal className="mb-6 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C68E58] block mb-1">
            Kenyamananmu Prioritas Kami
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#4A2E1B]">
            Fasilitas di Kedai Madjoe Kopi
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {facilities.map((fac, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <div className="bg-white rounded-2xl p-5 border border-[#4A2E1B]/10 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-[#F3ECE3] flex items-center justify-center text-[#CE1827] mb-3">
                  {fac.icon}
                </div>
                <h3 className="font-serif font-bold text-base text-[#4A2E1B] mb-1">
                  {fac.title}
                </h3>
                <p className="text-xs text-[#4A2E1B]/70 leading-relaxed">
                  {fac.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── GALERI SUASANA KEDAI MADJOE KOPI ── */}
      <section className="mb-14">
        <Reveal className="mb-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#C68E58] mb-1">
            <Camera size={14} className="text-[#CE1827]" />
            <span>Dokumentasi Kedai</span>
          </div>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#4A2E1B]">
            Galeri Suasana Madjoe Kopi
          </h2>
          <p className="text-xs sm:text-sm text-[#4A2E1B]/70 mt-1 max-w-lg">
            Nuansa hangat, bersahaja, dan nyaman untuk melepas penat di tengah hiruk pikuk Kota Mataram.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryPhotos.map((photo, idx) => (
            <Reveal key={idx} delay={idx * 0.08}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#4A2E1B]/15 shadow-sm group bg-white">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E1B]/90 via-[#4A2E1B]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-serif font-bold text-xs sm:text-sm leading-tight text-white drop-shadow-xs">
                    {photo.title}
                  </h3>
                  <p className="text-[10px] text-white/80 mt-0.5 leading-snug line-clamp-2">
                    {photo.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PETA EMBED GOOGLE MAPS ── */}
      <Reveal>
        <div className="rounded-3xl overflow-hidden border border-[#4A2E1B]/15 shadow-lg bg-white p-2">
          <div className="relative aspect-[16/8] w-full rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
            <iframe
              title="Lokasi Madjoe Kopi di Google Maps"
              src="https://maps.google.com/maps?q=Jl.+Pejanggik+No.66X,+Mataram,+Lombok&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </Reveal>

    </div>
  );
}

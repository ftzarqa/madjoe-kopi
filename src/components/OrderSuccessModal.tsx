// ============================================================
// src/components/OrderSuccessModal.tsx
// Layar Sukses Pesanan (Order Success Screen ala Kopi Kenangan)
// Kode Pesanan Unik, Estimasi Jam Ambil, & Opsi Kirim Struk WhatsApp
// ============================================================

"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, MapPin, Send, ArrowRight } from "lucide-react";
import { OrderResult } from "@/types";
import { CINEMATIC_EASE } from "./Reveal";

const WHATSAPP_NUMBER = "6287852005008";

interface OrderSuccessModalProps {
  order: OrderResult | null;
  onClose: () => void;
}

export default function OrderSuccessModal({ order, onClose }: OrderSuccessModalProps) {
  if (!order) return null;

  /**
   * Format template pesan WhatsApp resmi untuk konfirmasi pesanan ke admin
   */
  const handleSendWhatsAppReceipt = () => {
    const text = [
      "Halo Madjoe Kopi! Saya ingin konfirmasi pesanan dengan detail:",
      `- Order ID: ${order.orderId}`,
      `- Nama Pemesan: ${order.customerName}`,
      `- Waktu Ambil: ${order.pickupTime}`,
      `- Total: Rp ${order.totalPrice.toLocaleString("id-ID")}`,
      `- Metode: ${order.paymentMethod}`,
      `- Catatan: ${order.notes || "-"}`,
      "",
      "Mohon segera diproses, terima kasih!",
    ].join("\n");

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#4A2E1B]/55 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.4, ease: CINEMATIC_EASE }}
        className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#4A2E1B]/15 text-center max-h-[92vh] overflow-y-auto cart-scroll"
      >
        {/* Ikon Sukses dengan Ripple */}
        <div className="relative w-16 h-16 rounded-full bg-green-50 border-2 border-green-500/30 flex items-center justify-center text-green-600 mx-auto mb-4">
          <CheckCircle2 size={36} />
          <motion.div
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-green-500"
          />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C68E58] block mb-1">
          Pesanan Berhasil Masuk Antrean
        </span>
        <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#4A2E1B]">
          Terima Kasih, {order.customerName}!
        </h2>
        <p className="text-xs text-[#4A2E1B]/70 mt-1 leading-relaxed">
          Barista kami sedang menyiapkan pesananmu dengan sepenuh hati.
        </p>

        {/* ── KARTU ID PESANAN RESMI (MDK-XXXX) ── */}
        <div className="my-5 p-4 rounded-2xl bg-[#F3ECE3] border border-[#C68E58]/40 text-center shadow-inner">
          <span className="text-[11px] uppercase tracking-wider text-[#4A2E1B]/70 font-semibold block">
            ID Pesanan Resmi (Order ID)
          </span>
          <span className="font-mono font-black text-2xl sm:text-3xl text-[#CE1827] tracking-wider my-1.5 block select-all">
            {order.orderId}
          </span>
          <span className="text-[11px] text-[#4A2E1B]/70 block">
            Tunjukkan ID ini kepada kasir saat mengambil pesanan
          </span>
        </div>

        {/* Estimasi Jam & Rincian Lengkap Pesanan */}
        <div className="bg-white border border-[#4A2E1B]/15 rounded-2xl p-4 mb-5 text-left text-xs space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-[#4A2E1B]/10">
            <span className="text-[#4A2E1B]/70 font-medium">Order ID:</span>
            <span className="font-mono font-bold text-[#CE1827] text-sm">{order.orderId}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#4A2E1B]/70 flex items-center gap-1.5">
              <Clock size={13} className="text-[#C68E58]" />
              Waktu Ambil:
            </span>
            <span className="font-bold text-[#4A2E1B]">{order.pickupTime}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#4A2E1B]/70">Metode Pembayaran:</span>
            <span className="font-bold text-[#4A2E1B] uppercase text-[11px]">
              {order.paymentMethod}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#4A2E1B]/70">Status Pembayaran:</span>
            <span
              className={`font-bold px-2.5 py-0.5 rounded-full text-[10px] uppercase ${
                order.status === "paid"
                  ? "bg-green-100 text-green-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {order.status === "paid" ? "Sudah Dibayar" : "Bayar di Kasir"}
            </span>
          </div>

          {order.notes && (
            <div className="flex items-start justify-between gap-2 pt-1.5 border-t border-[#4A2E1B]/10 text-[11px]">
              <span className="text-[#4A2E1B]/70 shrink-0 font-medium">Catatan:</span>
              <span className="text-[#4A2E1B] text-right italic">{order.notes}</span>
            </div>
          )}

          {/* Rincian item pesanan jika ada */}
          {order.items && order.items.length > 0 && (
            <div className="pt-2 border-t border-[#4A2E1B]/10">
              <span className="text-[11px] font-semibold text-[#4A2E1B]/80 block mb-1.5">
                Rincian Pesanan ({order.items.reduce((acc, it) => acc + it.quantity, 0)} item):
              </span>
              <div className="space-y-1 max-h-32 overflow-y-auto cart-scroll pr-1">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px] text-[#4A2E1B]/85">
                    <span className="truncate max-w-[200px]">{item.name} × {item.quantity}</span>
                    <span className="font-medium shrink-0">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-[#4A2E1B]/10">
            <span className="text-[#4A2E1B]/80 font-bold">Total:</span>
            <span className="font-bold text-[#CE1827] text-base">
              Rp {order.totalPrice.toLocaleString("id-ID")}
            </span>
          </div>

          <div className="pt-2 border-t border-gray-100 text-[11px] text-[#4A2E1B]/70 flex items-start gap-1.5">
            <MapPin size={13} className="text-[#C68E58] shrink-0 mt-0.5" />
            <span>Jl. Pejanggik No.66X, Pejanggik, Kota Mataram</span>
          </div>
        </div>

        {/* ── TOMBOL AKSI ── */}
        <div className="space-y-2.5">
          {/* Tombol Konfirmasi via WhatsApp */}
          <button
            onClick={handleSendWhatsAppReceipt}
            className="w-full bg-[#25D366] text-white font-bold py-3.5 px-4 rounded-xl
                       flex items-center justify-center gap-2 text-xs sm:text-sm
                       shadow-md shadow-[#25D366]/25 hover:bg-[#20bd5a] transition-colors cursor-pointer"
          >
            <Send size={15} />
            <span>Konfirmasi Pesanan via WhatsApp</span>
          </button>

          {/* Selesai / Pesan Lagi */}
          <button
            onClick={onClose}
            className="w-full bg-[#CE1827] text-white font-bold py-3.5 px-4 rounded-xl
                       flex items-center justify-center gap-2 text-xs sm:text-sm
                       shadow-md shadow-[#CE1827]/25 hover:bg-[#B51320] transition-colors cursor-pointer"
          >
            <span>Kembali &amp; Selesai</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

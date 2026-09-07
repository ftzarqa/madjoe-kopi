// ============================================================
// src/components/OrderSuccessModal.tsx
// Layar Sukses Pesanan (Order Success Screen ala Kopi Kenangan)
// Kode Pesanan Unik, Estimasi Jam Ambil, & Opsi Kirim Struk WhatsApp
// ============================================================

"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, MapPin, Send, ArrowRight, Share2, Sparkles } from "lucide-react";
import { OrderResult } from "@/types";
import { CINEMATIC_EASE } from "./Reveal";

const WHATSAPP_NUMBER = "6287852005008";

interface OrderSuccessModalProps {
  order: OrderResult | null;
  onClose: () => void;
}

export default function OrderSuccessModal({ order, onClose }: OrderSuccessModalProps) {
  if (!order) return null;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  /**
   * Format pesan struk rapi untuk dikirim ke WhatsApp kasir (opsional)
   */
  const handleSendWhatsAppReceipt = () => {
    const lines = order.items
      .map(
        (item, idx) =>
          `  ${idx + 1}. ${item.name} x ${item.quantity} - ${formatPrice(
            item.price * item.quantity
          )}`
      )
      .join("\n");

    const text = [
      `🧾 *BUKTI ORDER & TAKE — MADJOE KOPI*`,
      `Kode Pesanan : *${order.orderId}*`,
      `Status       : ${order.status === "paid" ? "✅ LUNAS (In-App)" : "⏳ BAYAR DI KASIR"}`,
      `Nama Pemesan : ${order.customerName}`,
      `Jam Ambil    : ${order.pickupTime} WITA`,
      `Metode Bayar : ${
        order.paymentMethod === "qris"
          ? "QRIS / E-Wallet"
          : order.paymentMethod === "va"
          ? `Virtual Account (${order.paymentProvider || "Bank"})`
          : "Tunai di Kasir"
      }`,
      "",
      `📋 *Rincian Pesanan:*`,
      lines,
      "",
      `💰 *Total: ${formatPrice(order.totalPrice)}*`,
      order.notes ? `📝 *Catatan:* ${order.notes}` : "",
      "",
      `📍 *Lokasi Ambil:* Jl. Pejanggik No.66X, Mataram, NTB`,
      `_Mohon siapkan pesanan sesuai jam ambil. Terima kasih!_ 🙏`,
    ]
      .filter(Boolean)
      .join("\n");

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

        {/* ── KARTU KODE PESANAN UNIK (#MDK-XXXX) ── */}
        <div className="my-5 p-4 rounded-2xl bg-[#F3ECE3] border border-[#C68E58]/40 text-center">
          <span className="text-[11px] uppercase tracking-wider text-[#4A2E1B]/60 font-semibold block">
            Kode Pesanan Kamu
          </span>
          <span className="font-mono font-black text-3xl text-[#CE1827] tracking-wider my-1 block">
            {order.orderId}
          </span>
          <span className="text-[11px] text-[#4A2E1B]/70 block">
            Tunjukkan kode ini kepada kasir saat mengambil pesanan
          </span>
        </div>

        {/* Estimasi Jam & Info Pengambilan */}
        <div className="bg-white border border-[#4A2E1B]/15 rounded-2xl p-3.5 mb-5 text-left text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[#4A2E1B]/70 flex items-center gap-1.5">
              <Clock size={13} className="text-[#C68E58]" />
              Estimasi Pengambilan:
            </span>
            <span className="font-bold text-[#4A2E1B]">{order.pickupTime} WITA</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#4A2E1B]/70">Status Pembayaran:</span>
            <span
              className={`font-bold px-2 py-0.5 rounded-full text-[10px] uppercase ${
                order.status === "paid"
                  ? "bg-green-100 text-green-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {order.status === "paid" ? "Sudah Dibayar" : "Bayar di Kasir"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#4A2E1B]/70">Total Pesanan:</span>
            <span className="font-bold text-[#CE1827] text-sm">{formatPrice(order.totalPrice)}</span>
          </div>

          <div className="pt-2 border-t border-gray-100 text-[11px] text-[#4A2E1B]/70 flex items-start gap-1.5">
            <MapPin size={13} className="text-[#C68E58] shrink-0 mt-0.5" />
            <span>Jl. Pejanggik No.66X, Pejanggik, Kota Mataram</span>
          </div>
        </div>

        {/* ── TOMBOL AKSI ── */}
        <div className="space-y-2.5">
          {/* Tombol Kirim Salinan Struk ke WA (Opsional) */}
          <button
            onClick={handleSendWhatsAppReceipt}
            className="w-full bg-[#25D366] text-white font-bold py-3 px-4 rounded-xl
                       flex items-center justify-center gap-2 text-xs sm:text-sm
                       shadow-md shadow-[#25D366]/25 hover:bg-[#20bd5a] transition-colors cursor-pointer"
          >
            <Send size={15} />
            <span>Kirim Salinan Struk ke WhatsApp</span>
          </button>

          {/* Selesai / Pesan Lagi */}
          <button
            onClick={onClose}
            className="w-full bg-[#CE1827] text-white font-bold py-3 px-4 rounded-xl
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

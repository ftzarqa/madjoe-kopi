// ============================================================
// src/components/CheckoutForm.tsx
// Form checkout: nama pelanggan + waktu pengambilan.
// Setelah submit, merangkum order dan redirect ke WhatsApp.
// ============================================================

"use client";

import { useState, FormEvent } from "react";
import { Send, User, Clock } from "lucide-react";
import { CartItem, CheckoutFormData } from "@/types";

// ── Nomor WhatsApp Madjoe Kopi ──────────────────────────────
// Format internasional tanpa tanda + atau spasi
const WHATSAPP_NUMBER = "6287852005008"; // 0878-5200-5008 → 62878...

interface CheckoutFormProps {
  cartItems: CartItem[];
  totalPrice: number;
  onClose: () => void;
  onOrderSuccess: () => void;
}

/**
 * CheckoutForm — Form konfirmasi pesanan sebelum dikirim ke WhatsApp.
 *
 * Alur:
 * 1. User isi nama & waktu pengambilan
 * 2. Klik "Kirim Pesanan via WhatsApp"
 * 3. Format order menjadi pesan teks rapi
 * 4. Buka wa.me/{nomor}?text={encoded_message}
 * 5. Kosongkan keranjang (dipanggil via onOrderSuccess)
 */
export default function CheckoutForm({
  cartItems,
  totalPrice,
  onClose,
  onOrderSuccess,
}: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: "",
    pickupTime: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  /**
   * Bangun string pesan WhatsApp yang rapi dan mudah dibaca barista.
   *
   * Contoh output:
   * ─────────────────────────
   * 🛒 *PESANAN BARU — MADJOE KOPI*
   *
   * 👤 Nama    : Budi Santoso
   * ⏰ Ambil   : 14:30
   *
   * 📋 *DETAIL PESANAN:*
   * 1. Madjoe Latte × 2 = Rp 56.000
   * 2. Croissant Butter × 1 = Rp 18.000
   *
   * 💰 *TOTAL: Rp 74.000*
   *
   * Terima kasih! 🙏
   * ─────────────────────────
   */
  const buildWhatsAppMessage = (): string => {
    const divider = "─".repeat(28);
    const header = `🛒 *PESANAN BARU — MADJOE KOPI*\n${divider}`;

    const customerInfo = [
      `👤 Nama    : ${formData.customerName}`,
      `⏰ Ambil   : ${formData.pickupTime}`,
    ].join("\n");

    const orderLines = cartItems
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.name} × ${item.quantity} = ${formatPrice(
            item.price * item.quantity
          )}`
      )
      .join("\n");

    const total = `💰 *TOTAL: ${formatPrice(totalPrice)}*`;
    const footer = "Terima kasih, pesanan segera kami siapkan! 🙏";

    return [
      header,
      customerInfo,
      "",
      `📋 *DETAIL PESANAN:*`,
      orderLines,
      "",
      total,
      divider,
      footer,
    ].join("\n");
  };

  /**
   * Handler submit form.
   * Validasi → bangun pesan → buka wa.me URL.
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Keranjang masih kosong! Pilih menu terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);

    const message = buildWhatsAppMessage();

    // Encode pesan agar aman sebagai URL query param
    const encodedMessage = encodeURIComponent(message);

    // Buat URL wa.me — otomatis membuka WhatsApp Web atau app
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Buka di tab baru agar user tidak kehilangan halaman ini
    window.open(waUrl, "_blank", "noopener,noreferrer");

    // Reset: kosongkan keranjang & tutup sidebar
    setTimeout(() => {
      onOrderSuccess(); // Panggil clearCart di parent
      onClose();
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="mt-4 border-t-2 border-brand-cream pt-4">
      <h3 className="font-serif font-bold text-lg text-brand-espresso mb-4">
        Detail Pengambilan
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* ── Input Nama Pelanggan ── */}
        <div>
          <label
            htmlFor="customerName"
            className="block text-sm font-semibold text-brand-espresso mb-1"
          >
            <User size={14} className="inline mr-1" />
            Nama Pelanggan
          </label>
          <input
            id="customerName"
            type="text"
            required
            minLength={2}
            maxLength={50}
            placeholder="Nama kamu..."
            value={formData.customerName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, customerName: e.target.value }))
            }
            className="form-input"
          />
        </div>

        {/* ── Input Waktu Pengambilan ── */}
        <div>
          <label
            htmlFor="pickupTime"
            className="block text-sm font-semibold text-brand-espresso mb-1"
          >
            <Clock size={14} className="inline mr-1" />
            Waktu Pengambilan
          </label>
          <input
            id="pickupTime"
            type="time"
            required
            // Batasi waktu operasional 07:00 – 21:30
            min="07:00"
            max="21:30"
            value={formData.pickupTime}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, pickupTime: e.target.value }))
            }
            className="form-input"
          />
          <p className="text-xs text-gray-400 mt-1">
            Jam operasional: 07.00 – 22.00 WITA
          </p>
        </div>

        {/* ── Tombol Submit ── */}
        <button
          type="submit"
          disabled={isSubmitting || cartItems.length === 0}
          className="btn-primary w-full flex items-center justify-center gap-2
                     py-3 text-base mt-2"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin">⏳</span>
              Membuka WhatsApp...
            </>
          ) : (
            <>
              <Send size={18} />
              Kirim Pesanan via WhatsApp
            </>
          )}
        </button>

        <p className="text-xs text-center text-gray-400">
          Pesanan akan dikirim ke WhatsApp Madjoe Kopi.
          <br />
          Konfirmasi pembayaran via chat.
        </p>
      </form>
    </div>
  );
}

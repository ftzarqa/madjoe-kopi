// ============================================================
// src/components/CheckoutForm.tsx
// Form Checkout In-App Madjoe Kopi dengan Selector Metode Pembayaran
// ============================================================

"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { User, Phone, Clock, FileText, QrCode, Building2, Banknote, ShieldCheck, AlertTriangle } from "lucide-react";
import { CartItem, CheckoutFormData, PaymentMethod, EWalletProvider, BankProvider } from "@/types";
import { CINEMATIC_EASE } from "./Reveal";

interface CheckoutFormProps {
  cartItems: CartItem[];
  totalPrice: number;
  onProceedToPayment: (data: CheckoutFormData) => void;
}

export default function CheckoutForm({
  cartItems,
  totalPrice,
  onProceedToPayment,
}: CheckoutFormProps) {
  const [customerName, setCustomerName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("qris");
  const [selectedWallet, setSelectedWallet] = useState<EWalletProvider>("gopay");
  const [selectedBank, setSelectedBank] = useState<BankProvider>("bca");
  const [timeError, setTimeError] = useState("");

  const [isTomorrow, setIsTomorrow] = useState(false);

  // Waktu operasional: 08:00 - 24:00 WITA
  const validateTime = (timeStr: string) => {
    setTimeError("");
    setIsTomorrow(false);
    if (!timeStr) return false;

    const [hoursStr, minutesStr] = timeStr.split(":");
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    // Validasi jam operasional (08:00 - 23:59)
    if (hours < 8) {
      setTimeError("Jam ambil di luar operasional (Buka 08:00 - 24:00 WITA)");
      return false;
    }

    // Mendapatkan waktu saat ini di WITA (UTC+8)
    const now = new Date();
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    const witaNow = new Date(utcTime + 3600000 * 8);

    const currentHours = witaNow.getHours();
    const currentMinutes = witaNow.getMinutes();

    // Jika waktu yang dimasukkan lebih kecil dari waktu saat ini, anggap pesanan besok
    if (hours < currentHours || (hours === currentHours && minutes < currentMinutes)) {
      setIsTomorrow(true);
    }

    return true;
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    setPickupTime(time);
    validateTime(time);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Keranjang masih kosong!");
      return;
    }

    // Validasi WhatsApp Number (angka saja)
    if (!/^\d+$/.test(whatsappNumber)) {
      alert("Nomor WhatsApp harus berupa angka!");
      return;
    }

    if (!validateTime(pickupTime)) {
      return;
    }

    const providerName =
      paymentMethod === "qris"
        ? selectedWallet.toUpperCase()
        : paymentMethod === "va"
        ? `${selectedBank.toUpperCase()} Virtual Account`
        : "Kasir (Tunai/EDC)";

    const finalPickupTime = isTomorrow ? `${pickupTime} (Besok)` : pickupTime;

    const formData: CheckoutFormData = {
      customerName,
      whatsappNumber,
      pickupTime: finalPickupTime,
      notes,
      paymentMethod,
      paymentProvider: providerName,
    };

    onProceedToPayment(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
      
      {/* ── 1. NAMA PELANGGAN ── */}
      <div>
        <label
          htmlFor="customerName"
          className="block text-xs font-semibold text-[#4A2E1B] mb-1.5"
        >
          <User size={13} className="inline mr-1 text-[#C68E58]" />
          Nama Pemesan <span className="text-[#CE1827]">*</span>
        </label>
        <input
          id="customerName"
          type="text"
          required
          minLength={2}
          maxLength={50}
          placeholder="Nama panggilan kamu..."
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full bg-white border border-[#4A2E1B]/20 rounded-xl px-3.5 py-2.5 text-sm text-[#4A2E1B] placeholder-[#4A2E1B]/40 focus:outline-none focus:border-[#4A2E1B] focus:ring-2 focus:ring-[#C68E58]/30 transition-all"
        />
      </div>

      {/* ── 2. NOMOR WHATSAPP ── */}
      <div>
        <label
          htmlFor="whatsappNumber"
          className="block text-xs font-semibold text-[#4A2E1B] mb-1.5"
        >
          <Phone size={13} className="inline mr-1 text-[#C68E58]" />
          Nomor WhatsApp <span className="text-[#CE1827]">*</span>
        </label>
        <input
          id="whatsappNumber"
          type="tel"
          pattern="[0-9]*"
          required
          minLength={9}
          maxLength={15}
          placeholder="08123456789"
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, ""))}
          className="w-full bg-white border border-[#4A2E1B]/20 rounded-xl px-3.5 py-2.5 text-sm text-[#4A2E1B] placeholder-[#4A2E1B]/40 focus:outline-none focus:border-[#4A2E1B] focus:ring-2 focus:ring-[#C68E58]/30 transition-all"
        />
      </div>

      {/* ── 3. ESTIMASI JAM AMBIL ── */}
      <div>
        <label
          htmlFor="pickupTime"
          className="block text-xs font-semibold text-[#4A2E1B] mb-1.5 flex items-center justify-between"
        >
          <div>
            <Clock size={13} className="inline mr-1 text-[#C68E58]" />
            Estimasi Jam Ambil <span className="text-[#CE1827]">*</span>
          </div>
          {isTomorrow && (
            <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Besok
            </span>
          )}
        </label>
        <input
          id="pickupTime"
          type="time"
          required
          min="08:00"
          value={pickupTime}
          onChange={handleTimeChange}
          className={`w-full bg-white border ${timeError ? "border-[#CE1827]" : "border-[#4A2E1B]/20"} rounded-xl px-3.5 py-2.5 text-sm text-[#4A2E1B] focus:outline-none focus:border-[#4A2E1B] focus:ring-2 focus:ring-[#C68E58]/30 transition-all`}
        />
        {timeError ? (
          <span className="text-[11px] text-[#CE1827] mt-1 block">
            {timeError}
          </span>
        ) : (
          <span className="text-[11px] text-[#4A2E1B]/60 mt-1 block">
            Buka 08.00 – 24.00 WITA (Setiap Hari)
          </span>
        )}
      </div>

      {/* ── 4. CATATAN PESANAN (OPSIONAL) ── */}
      <div>
        <label
          htmlFor="notes"
          className="block text-xs font-semibold text-[#4A2E1B] mb-1.5"
        >
          <FileText size={13} className="inline mr-1 text-[#C68E58]" />
          Catatan Rasa <span className="text-[#4A2E1B]/50 font-normal">(opsional)</span>
        </label>
        <input
          id="notes"
          type="text"
          maxLength={100}
          placeholder="Contoh: Less sugar, es dipisah, ekstra sedotan..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full bg-white border border-[#4A2E1B]/20 rounded-xl px-3.5 py-2 text-sm text-[#4A2E1B] placeholder-[#4A2E1B]/40 focus:outline-none focus:border-[#4A2E1B] focus:ring-2 focus:ring-[#C68E58]/30 transition-all"
        />
      </div>

      {/* ── 5. SELECTOR METODE PEMBAYARAN IN-APP ── */}
      <div className="pt-2 border-t border-[#4A2E1B]/10">
        <label className="block text-xs font-bold text-[#4A2E1B] mb-2 uppercase tracking-wider">
          Pilih Metode Pembayaran:
        </label>

        <div className="grid grid-cols-3 gap-2">
          
          {/* Opsi 1: QRIS */}
          <button
            type="button"
            onClick={() => setPaymentMethod("qris")}
            className={`p-2.5 rounded-xl border text-left flex flex-col items-center text-center transition-all cursor-pointer ${
              paymentMethod === "qris"
                ? "border-[#CE1827] bg-red-50/50 shadow-xs text-[#CE1827]"
                : "border-[#4A2E1B]/15 bg-white text-[#4A2E1B] hover:border-[#C68E58]/50"
            }`}
          >
            <QrCode size={18} className="mb-1" />
            <span className="text-xs font-bold leading-tight">QRIS</span>
            <span className="text-[9px] text-[#4A2E1B]/60 mt-0.5">E-Wallet</span>
          </button>

          {/* Opsi 2: Virtual Account */}
          <button
            type="button"
            onClick={() => setPaymentMethod("va")}
            className={`p-2.5 rounded-xl border text-left flex flex-col items-center text-center transition-all cursor-pointer ${
              paymentMethod === "va"
                ? "border-[#CE1827] bg-red-50/50 shadow-xs text-[#CE1827]"
                : "border-[#4A2E1B]/15 bg-white text-[#4A2E1B] hover:border-[#C68E58]/50"
            }`}
          >
            <Building2 size={18} className="mb-1" />
            <span className="text-xs font-bold leading-tight">Transfer VA</span>
            <span className="text-[9px] text-[#4A2E1B]/60 mt-0.5">BCA/Mandiri</span>
          </button>

          {/* Opsi 3: Bayar Kasir */}
          <button
            type="button"
            onClick={() => setPaymentMethod("cash")}
            className={`p-2.5 rounded-xl border text-left flex flex-col items-center text-center transition-all cursor-pointer ${
              paymentMethod === "cash"
                ? "border-[#CE1827] bg-red-50/50 shadow-xs text-[#CE1827]"
                : "border-[#4A2E1B]/15 bg-white text-[#4A2E1B] hover:border-[#C68E58]/50"
            }`}
          >
            <Banknote size={18} className="mb-1" />
            <span className="text-xs font-bold leading-tight">Kasir</span>
            <span className="text-[9px] text-[#4A2E1B]/60 mt-0.5">Tunai/EDC</span>
          </button>
        </div>

        {/* Sub-pilihan E-Wallet jika QRIS terpilih */}
        {paymentMethod === "qris" && (
          <div className="mt-2.5 p-2.5 rounded-xl bg-[#F3ECE3] flex items-center justify-between text-xs">
            <span className="text-[11px] text-[#4A2E1B]/70 font-semibold">Aplikasi:</span>
            <div className="flex gap-2">
              {(["gopay", "ovo", "shopeepay"] as EWalletProvider[]).map((wallet) => (
                <button
                  key={wallet}
                  type="button"
                  onClick={() => setSelectedWallet(wallet)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase transition-all ${
                    selectedWallet === wallet
                      ? "bg-[#CE1827] text-white shadow-xs"
                      : "bg-white text-[#4A2E1B] border border-[#4A2E1B]/15"
                  }`}
                >
                  {wallet}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sub-pilihan Bank jika VA terpilih */}
        {paymentMethod === "va" && (
          <div className="mt-2.5 p-2.5 rounded-xl bg-[#F3ECE3] flex items-center justify-between text-xs">
            <span className="text-[11px] text-[#4A2E1B]/70 font-semibold">Pilih Bank:</span>
            <div className="flex gap-2">
              {(["bca", "mandiri", "bri"] as BankProvider[]).map((bank) => (
                <button
                  key={bank}
                  type="button"
                  onClick={() => setSelectedBank(bank)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase transition-all ${
                    selectedBank === bank
                      ? "bg-[#CE1827] text-white shadow-xs"
                      : "bg-white text-[#4A2E1B] border border-[#4A2E1B]/15"
                  }`}
                >
                  {bank}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Alert Kuning jika Kasir terpilih */}
        {paymentMethod === "cash" && (
          <div className="mt-2.5 p-3 rounded-xl bg-yellow-50 border border-yellow-200 flex items-start gap-2 text-xs text-yellow-800">
            <AlertTriangle size={16} className="shrink-0 mt-0.5 text-yellow-600" />
            <p className="leading-relaxed">
              Pesanan tunai baru akan dibuat oleh barista setelah Anda tiba di kasir.
            </p>
          </div>
        )}
      </div>

      {/* ── 6. TOMBOL SUBMIT KE SCREEN PEMBAYARAN ── */}
      <motion.button
        type="submit"
        disabled={cartItems.length === 0 || !!timeError}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 8px 24px rgba(206, 24, 39, 0.35)",
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.2, ease: CINEMATIC_EASE }}
        className="w-full bg-[#CE1827] text-white font-bold py-3.5 px-5 rounded-xl
                   flex items-center justify-center gap-2 text-sm sm:text-base mt-2
                   shadow-md shadow-[#CE1827]/25 hover:bg-[#B51320] cursor-pointer
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>Lanjut ke Pembayaran</span>
      </motion.button>
    </form>
  );
}


// ============================================================
// src/components/CheckoutForm.tsx
// Form Checkout In-App Madjoe Kopi dengan Selector Metode Pembayaran
// ============================================================

"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { User, Clock, FileText, QrCode, Building2, Banknote, ShieldCheck } from "lucide-react";
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
  const [pickupTime, setPickupTime] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("qris");
  const [selectedWallet, setSelectedWallet] = useState<EWalletProvider>("gopay");
  const [selectedBank, setSelectedBank] = useState<BankProvider>("bca");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Keranjang masih kosong!");
      return;
    }

    const providerName =
      paymentMethod === "qris"
        ? selectedWallet.toUpperCase()
        : paymentMethod === "va"
        ? `${selectedBank.toUpperCase()} Virtual Account`
        : "Kasir (Tunai/EDC)";

    const formData: CheckoutFormData = {
      customerName,
      pickupTime,
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

      {/* ── 2. ESTIMASI JAM AMBIL ── */}
      <div>
        <label
          htmlFor="pickupTime"
          className="block text-xs font-semibold text-[#4A2E1B] mb-1.5"
        >
          <Clock size={13} className="inline mr-1 text-[#C68E58]" />
          Estimasi Jam Ambil <span className="text-[#CE1827]">*</span>
        </label>
        <input
          id="pickupTime"
          type="time"
          required
          min="08:00"
          max="23:30"
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
          className="w-full bg-white border border-[#4A2E1B]/20 rounded-xl px-3.5 py-2.5 text-sm text-[#4A2E1B] focus:outline-none focus:border-[#4A2E1B] focus:ring-2 focus:ring-[#C68E58]/30 transition-all"
        />
        <span className="text-[11px] text-[#4A2E1B]/60 mt-1 block">
          Buka 08.00 – 24.00 WITA (Setiap Hari)
        </span>
      </div>

      {/* ── 3. CATATAN PESANAN (OPSIONAL) ── */}
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

      {/* ── 4. SELECTOR METODE PEMBAYARAN IN-APP ── */}
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
      </div>

      {/* ── 5. TOMBOL SUBMIT KE SCREEN PEMBAYARAN ── */}
      <motion.button
        type="submit"
        disabled={cartItems.length === 0}
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

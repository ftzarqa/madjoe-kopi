// ============================================================
// src/components/PaymentModal.tsx
// Modal Pembayaran In-App Interaktif (Ala Kopi Kenangan)
// Mendukung: QRIS (Timer 15 min), Virtual Account (BCA/Mandiri/BRI), Tunai
// ============================================================

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  QrCode,
  CreditCard,
  Copy,
  Check,
  Clock,
  ShieldCheck,
  Building2,
  Wallet,
  AlertCircle,
  Banknote,
} from "lucide-react";
import { CheckoutFormData, CartItem, OrderResult, PaymentMethod } from "@/types";
import { CINEMATIC_EASE } from "./Reveal";

interface PaymentModalProps {
  isOpen: boolean;
  checkoutData: CheckoutFormData | null;
  items: CartItem[];
  totalPrice: number;
  onClose: () => void;
  onSuccess: (order: OrderResult) => void;
}

export default function PaymentModal({
  isOpen,
  checkoutData,
  items,
  totalPrice,
  onClose,
  onSuccess,
}: PaymentModalProps) {
  // Timer 15 menit untuk QRIS (900 detik)
  const [timeLeft, setTimeLeft] = useState(900);
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [vaNumber, setVaNumber] = useState("8271087852005008");

  // Format countdown mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  // Generate random VA number & reset timer saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      setTimeLeft(900);
      const randomDigits = Math.floor(10000000 + Math.random() * 90000000);
      setVaNumber(`8271${randomDigits}`);
    }
  }, [isOpen]);

  // Hitung mundur timer QRIS
  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, timeLeft]);

  if (!isOpen || !checkoutData) return null;

  const handleCopyVa = () => {
    navigator.clipboard.writeText(vaNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      // Generate ID Pesanan acak (misal: #MDK-8921)
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const orderId = `#MDK-${randomCode}`;

      const orderResult: OrderResult = {
        orderId,
        customerName: checkoutData.customerName,
        pickupTime: checkoutData.pickupTime,
        notes: checkoutData.notes,
        paymentMethod: checkoutData.paymentMethod,
        paymentProvider: checkoutData.paymentProvider,
        items: [...items],
        totalPrice,
        createdAt: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        status: checkoutData.paymentMethod === "cash" ? "ready_for_pickup" : "paid",
        vaNumber: checkoutData.paymentMethod === "va" ? vaNumber : undefined,
      };

      setIsProcessing(false);
      onSuccess(orderResult);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#4A2E1B]/50 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.35, ease: CINEMATIC_EASE }}
        className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#4A2E1B]/10 max-h-[90vh] overflow-y-auto cart-scroll"
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between pb-4 border-b border-[#4A2E1B]/10 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#F3ECE3] flex items-center justify-center text-[#CE1827]">
              {checkoutData.paymentMethod === "qris" ? (
                <QrCode size={20} />
              ) : checkoutData.paymentMethod === "va" ? (
                <Building2 size={20} />
              ) : (
                <Banknote size={20} />
              )}
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-[#4A2E1B]">
                {checkoutData.paymentMethod === "qris"
                  ? "Pembayaran QRIS / E-Wallet"
                  : checkoutData.paymentMethod === "va"
                  ? "Virtual Account Bank"
                  : "Bayar Tunai di Kasir"}
              </h2>
              <p className="text-[11px] text-[#4A2E1B]/60">
                Pesanan atas nama: <strong>{checkoutData.customerName}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#4A2E1B]/50 hover:bg-[#F3ECE3] hover:text-[#4A2E1B] transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── KONTEN PEMBAYARAN SPESIFIK ── */}
        
        {/* 1. KONTEN QRIS */}
        {checkoutData.paymentMethod === "qris" && (
          <div className="flex flex-col items-center text-center">
            {/* Countdown Timer */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold mb-4">
              <Clock size={13} className="text-amber-700 animate-pulse" />
              <span>Selesaikan dalam <strong>{formatTime(timeLeft)}</strong></span>
            </div>

            {/* Dummy Barcode QRIS Interaktif */}
            <div className="relative p-4 bg-white rounded-2xl border-2 border-[#4A2E1B]/15 shadow-md flex flex-col items-center mb-4">
              <div className="text-[11px] font-bold tracking-widest text-[#4A2E1B] uppercase mb-2 border-b border-gray-100 pb-1 w-full text-center">
                QRIS NASIONAL · MADJOE KOPI
              </div>
              
              {/* Ilustrasi Barcode SVG QRIS */}
              <div className="w-52 h-52 bg-white p-2 relative flex items-center justify-center border border-gray-200 rounded-xl">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#4A2E1B]">
                  {/* Outer Frame */}
                  <rect x="5" y="5" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="4" rx="3" />
                  <rect x="12" y="12" width="16" height="16" fill="currentColor" rx="2" />

                  <rect x="65" y="5" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="4" rx="3" />
                  <rect x="72" y="12" width="16" height="16" fill="currentColor" rx="2" />

                  <rect x="5" y="65" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="4" rx="3" />
                  <rect x="12" y="72" width="16" height="16" fill="currentColor" rx="2" />

                  {/* QR Pattern Matrix Dots */}
                  <rect x="42" y="8" width="6" height="6" fill="currentColor" />
                  <rect x="52" y="18" width="6" height="6" fill="currentColor" />
                  <rect x="42" y="28" width="6" height="6" fill="currentColor" />
                  <rect x="8" y="42" width="6" height="6" fill="currentColor" />
                  <rect x="22" y="48" width="6" height="6" fill="currentColor" />
                  <rect x="40" y="42" width="8" height="8" fill="#CE1827" />
                  <rect x="52" y="42" width="8" height="8" fill="currentColor" />
                  <rect x="40" y="54" width="8" height="8" fill="currentColor" />
                  <rect x="52" y="54" width="8" height="8" fill="#CE1827" />
                  <rect x="68" y="42" width="6" height="6" fill="currentColor" />
                  <rect x="80" y="48" width="6" height="6" fill="currentColor" />
                  <rect x="42" y="68" width="6" height="6" fill="currentColor" />
                  <rect x="52" y="78" width="6" height="6" fill="currentColor" />
                  <rect x="42" y="88" width="6" height="6" fill="currentColor" />
                  <rect x="68" y="68" width="10" height="10" fill="currentColor" />
                  <rect x="82" y="72" width="10" height="10" fill="currentColor" />
                  <rect x="72" y="86" width="14" height="6" fill="currentColor" />
                </svg>

                {/* Logo Kafe di Tengah QR */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-9 h-9 bg-white rounded-lg border border-[#C68E58]/40 shadow-md flex items-center justify-center text-[#CE1827] font-serif font-black text-xs">
                    MDK
                  </div>
                </div>
              </div>

              <span className="text-[10px] text-gray-500 mt-2">
                Scan via GoPay, OVO, ShopeePay, BCA Mobile, dll.
              </span>
            </div>

            {/* Total Bayar Highlight */}
            <div className="w-full bg-[#F3ECE3] rounded-xl p-3 mb-4 flex items-center justify-between">
              <span className="text-xs text-[#4A2E1B]/70 font-medium">Total Tagihan:</span>
              <span className="text-lg font-bold text-[#CE1827]">{formatPrice(totalPrice)}</span>
            </div>

            <p className="text-xs text-[#4A2E1B]/70 mb-5 leading-relaxed">
              Buka aplikasi e-wallet atau m-banking kamu, pilih menu <strong>Scan QR</strong>, lalu arahkan kamera ke barcode di atas.
            </p>
          </div>
        )}

        {/* 2. KONTEN VIRTUAL ACCOUNT */}
        {checkoutData.paymentMethod === "va" && (
          <div>
            {/* Bank Info */}
            <div className="bg-[#F3ECE3] border border-[#C68E58]/35 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase text-[#4A2E1B]/60">Bank Tujuan:</span>
                <span className="px-3 py-0.5 rounded-full bg-white text-xs font-bold text-[#4A2E1B] border border-[#C68E58]/30">
                  {checkoutData.paymentProvider || "BCA Virtual Account"}
                </span>
              </div>

              <span className="text-xs text-[#4A2E1B]/60 block mb-1">Nomor Virtual Account:</span>
              <div className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-xl border border-[#4A2E1B]/20">
                <span className="font-mono text-base sm:text-lg font-bold text-[#4A2E1B] tracking-wider">
                  {vaNumber}
                </span>
                <button
                  onClick={handleCopyVa}
                  className="flex items-center gap-1 text-xs font-bold text-[#CE1827] hover:text-[#B51320] bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? "Tersalin!" : "Salin"}</span>
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-[#4A2E1B]/10">
                <span className="text-[#4A2E1B]/70">Total Transfer:</span>
                <span className="font-bold text-[#CE1827] text-base">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* Panduan m-Banking */}
            <div className="bg-white border border-[#4A2E1B]/10 rounded-2xl p-4 mb-4 text-xs text-[#4A2E1B]/80 leading-relaxed">
              <p className="font-bold text-[#4A2E1B] mb-2 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#C68E58]" />
                Panduan Transfer m-Banking:
              </p>
              <ol className="list-decimal pl-4 space-y-1">
                <li>Buka aplikasi m-Banking Anda ({checkoutData.paymentProvider || "BCA"}).</li>
                <li>Pilih menu <strong>Transfer</strong> &gt; <strong>Virtual Account</strong>.</li>
                <li>Masukkan nomor VA <strong>{vaNumber}</strong>.</li>
                <li>Periksa detail nama (Madjoe Kopi) dan nominal {formatPrice(totalPrice)}.</li>
                <li>Masukkan PIN Anda untuk menyelesaikan pembayaran.</li>
              </ol>
            </div>
          </div>
        )}

        {/* 3. KONTEN TUNAI DI KASIR */}
        {checkoutData.paymentMethod === "cash" && (
          <div className="text-center py-2">
            <div className="w-16 h-16 rounded-2xl bg-[#F3ECE3] border border-[#C68E58]/40 flex items-center justify-center text-[#CE1827] mx-auto mb-4">
              <Banknote size={32} />
            </div>

            <h3 className="font-serif font-bold text-lg text-[#4A2E1B]">
              Bayar di Meja Kasir
            </h3>
            <p className="text-xs sm:text-sm text-[#4A2E1B]/75 mt-1.5 max-w-sm mx-auto leading-relaxed">
              Pesananmu akan langsung disiapkan oleh barista. Silakan lakukan pembayaran tunai atau EDC saat mengambil pesanan.
            </p>

            <div className="bg-[#F3ECE3] rounded-2xl p-4 mt-5 text-left text-xs text-[#4A2E1B]">
              <div className="flex justify-between py-1 border-b border-[#4A2E1B]/10">
                <span className="text-[#4A2E1B]/70">Waktu Pengambilan:</span>
                <span className="font-bold">{checkoutData.pickupTime} WITA</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#4A2E1B]/10">
                <span className="text-[#4A2E1B]/70">Total yang Harus Dibayar:</span>
                <span className="font-bold text-[#CE1827] text-sm">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#4A2E1B]/70">Metode Pembayaran:</span>
                <span className="font-semibold">Tunai / Debit / QRIS Kasir</span>
              </div>
            </div>
          </div>
        )}

        {/* ── TOMBOL AKSI KONFIRMASI ── */}
        <div className="mt-6 pt-4 border-t border-[#4A2E1B]/10">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            disabled={isProcessing}
            onClick={handleConfirmPayment}
            className="w-full bg-[#CE1827] text-white font-bold py-3.5 px-6 rounded-xl
                       flex items-center justify-center gap-2 shadow-lg shadow-[#CE1827]/25
                       hover:bg-[#B51320] transition-all cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <span className="animate-spin text-sm">⏳</span>
                <span>Memverifikasi Pembayaran...</span>
              </>
            ) : (
              <>
                <Check size={18} />
                <span>
                  {checkoutData.paymentMethod === "qris"
                    ? "Saya Sudah Bayar via QRIS"
                    : checkoutData.paymentMethod === "va"
                    ? "Saya Sudah Transfer"
                    : "Konfirmasi Pesanan Saya"}
                </span>
              </>
            )}
          </motion.button>

          <p className="text-[10px] text-center text-[#4A2E1B]/50 mt-2.5">
            Sistem pembayaran otomatis terhubung dengan antrean kasir Madjoe Kopi.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

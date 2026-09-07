// ============================================================
// src/components/AppShell.tsx
// Shell Pembungkus Aplikasi Madjoe Kopi
// Mengelola Navbar, CartSidebar, PaymentModal, & OrderSuccessModal
// ============================================================

"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import FloatingCartButton from "@/components/FloatingCartButton";
import PaymentModal from "@/components/PaymentModal";
import OrderSuccessModal from "@/components/OrderSuccessModal";
import { CheckoutFormData, OrderResult } from "@/types";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const {
    items,
    totalItems,
    totalPrice,
    addItem,
    decreaseItem,
    removeItem,
    clearCart,
    isCartOpen,
    openCart,
    closeCart,
  } = useCart();

  // State alur pembayaran in-app (Kopi Kenangan flow)
  const [activeCheckout, setActiveCheckout] = useState<CheckoutFormData | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderResult | null>(null);

  /**
   * Langkah 1: Pengguna selesai mengisi form di CartSidebar
   * Tutup sidebar keranjang -> Buka PaymentModal
   */
  const handleProceedToPayment = (formData: CheckoutFormData) => {
    setActiveCheckout(formData);
    closeCart();
    setIsPaymentOpen(true);
  };

  /**
   * Langkah 2: Pengguna mengonfirmasi pembayaran di PaymentModal
   * Tutup PaymentModal -> Kosongkan keranjang -> Tampilkan OrderSuccessModal
   */
  const handlePaymentSuccess = (order: OrderResult) => {
    setIsPaymentOpen(false);
    clearCart();
    setCompletedOrder(order);
  };

  return (
    <div className="min-h-screen bg-[#F3ECE3] text-[#4A2E1B] flex flex-col font-sans selection:bg-[#CE1827] selection:text-white">
      {/* ── Floating Pill Navbar ── */}
      <Navbar
        totalItems={totalItems}
        onCartOpen={openCart}
      />

      {/* ── Halaman Konten Rute ── */}
      <div className="flex-1">
        {children}
      </div>

      {/* ── Sidebar Keranjang ── */}
      <CartSidebar
        isOpen={isCartOpen}
        items={items}
        totalItems={totalItems}
        totalPrice={totalPrice}
        onClose={closeCart}
        onAdd={addItem}
        onDecrease={decreaseItem}
        onRemove={removeItem}
        onClear={clearCart}
        onProceedToPayment={handleProceedToPayment}
      />

      {/* ── Modal Pembayaran Interaktif In-App ── */}
      <PaymentModal
        isOpen={isPaymentOpen}
        checkoutData={activeCheckout}
        items={items}
        totalPrice={totalPrice}
        onClose={() => setIsPaymentOpen(false)}
        onSuccess={handlePaymentSuccess}
      />

      {/* ── Modal Order Success Screen (#MDK-XXXX) ── */}
      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* ── Floating Cart Button (Mobile Only) ── */}
      <FloatingCartButton
        totalItems={totalItems}
        isCartOpen={isCartOpen}
        onOpen={openCart}
      />
    </div>
  );
}

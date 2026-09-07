// ============================================================
// src/components/CartSidebar.tsx
// Panel Keranjang Belanja In-App (Terhubung dengan PaymentModal)
// ============================================================

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { CartItem as CartItemType, MenuItem, CheckoutFormData } from "@/types";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";
import { CINEMATIC_EASE } from "./Reveal";

interface CartSidebarProps {
  isOpen: boolean;
  items: CartItemType[];
  totalItems: number;
  totalPrice: number;
  onClose: () => void;
  onAdd: (item: MenuItem) => void;
  onDecrease: (itemId: string) => void;
  onRemove: (itemId: string) => void;
  onClear: () => void;
  onProceedToPayment: (data: CheckoutFormData) => void;
}

export default function CartSidebar({
  isOpen,
  items,
  totalItems,
  totalPrice,
  onClose,
  onAdd,
  onDecrease,
  onRemove,
  onClear,
  onProceedToPayment,
}: CartSidebarProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: CINEMATIC_EASE }}
            onClick={onClose}
            className="fixed inset-0 bg-[#4A2E1B]/40 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />

          {/* Panel Drawer */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Keranjang belanja Madjoe Kopi"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.42, ease: CINEMATIC_EASE }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header Sidebar */}
            <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-[#4A2E1B]/10 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#F3ECE3] flex items-center justify-center text-[#4A2E1B]">
                  <ShoppingBag size={18} />
                </div>
                <h2 className="font-serif font-bold text-lg text-[#4A2E1B]">
                  Keranjang Pesanan
                </h2>
                {totalItems > 0 && (
                  <span className="bg-[#CE1827] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-xs">
                    {totalItems} item
                  </span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                aria-label="Tutup keranjang"
                className="p-1.5 rounded-lg text-[#4A2E1B]/60 hover:text-[#4A2E1B] hover:bg-[#F3ECE3] transition-colors cursor-pointer"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Body Sidebar (Scrollable) */}
            <div className="flex-1 overflow-y-auto cart-scroll px-5 py-4 bg-white">
              {items.length === 0 ? (
                /* State Kosong */
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center h-full text-center py-16 px-4"
                >
                  <div className="w-20 h-20 rounded-full bg-[#F3ECE3] border border-[#C68E58]/30 flex items-center justify-center mb-4 text-[#C68E58]">
                    <ShoppingBag size={34} />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#4A2E1B]">
                    Keranjang Masih Kosong
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A2E1B]/70 mt-1 max-w-xs leading-relaxed">
                    Kopi susu, Americano segar, atau camilan hangat siap menemani harimu.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#CE1827] hover:text-[#B51320] border-b border-[#CE1827]/40 pb-0.5 transition-colors cursor-pointer"
                  >
                    <span>Pilih Menu Sekarang</span>
                    <ArrowRight size={13} />
                  </button>
                </motion.div>
              ) : (
                /* Daftar Item */
                <div>
                  <div className="flex justify-between items-center mb-2 pb-2 border-b border-[#4A2E1B]/10">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#4A2E1B]/60">
                      Item Terpilih ({totalItems})
                    </span>
                    <button
                      onClick={onClear}
                      className="text-xs text-[#4A2E1B]/60 hover:text-[#CE1827] underline transition-colors cursor-pointer"
                    >
                      Kosongkan
                    </button>
                  </div>

                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onAdd={() => onAdd(item)}
                        onDecrease={() => onDecrease(item.id)}
                        onRemove={() => onRemove(item.id)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer Subtotal & Form Checkout */}
            {items.length > 0 && (
              <motion.div
                layout
                className="shrink-0 px-5 pb-5 pt-3 bg-white border-t border-[#4A2E1B]/10 shadow-[0_-8px_20px_rgba(74,46,27,0.04)]"
              >
                <div className="flex justify-between items-center py-2 border-b border-[#4A2E1B]/10 mb-2">
                  <span className="text-sm font-semibold text-[#4A2E1B]/80">
                    Total Pembayaran:
                  </span>
                  <span className="font-bold text-xl text-[#CE1827] tracking-tight">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <CheckoutForm
                  cartItems={items}
                  totalPrice={totalPrice}
                  onProceedToPayment={onProceedToPayment}
                />
              </motion.div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

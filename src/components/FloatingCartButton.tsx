// ============================================================
// src/components/FloatingCartButton.tsx
// Floating Action Button (FAB) Mobile dengan Spring Motion
// ============================================================

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { CINEMATIC_EASE } from "./Reveal";

interface FloatingCartButtonProps {
  totalItems: number;
  isCartOpen: boolean;
  onOpen: () => void;
}

/**
 * FloatingCartButton — FAB di pojok kanan bawah khusus tampilan mobile
 * dengan animasi spring bounce dan micro-interaction.
 */
export default function FloatingCartButton({
  totalItems,
  isCartOpen,
  onOpen,
}: FloatingCartButtonProps) {
  const showFab = totalItems > 0 && !isCartOpen;

  return (
    <AnimatePresence>
      {showFab && (
        <motion.button
          onClick={onOpen}
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 20 }}
          whileHover={{
            scale: 1.08,
            boxShadow: "0 12px 28px rgba(206, 24, 39, 0.4)",
          }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 450, damping: 24 }}
          aria-label={`Buka keranjang belanja (${totalItems} item)`}
          className="fixed bottom-6 right-5 z-40 md:hidden
                     bg-[#CE1827] text-white
                     w-14 h-14 rounded-full
                     shadow-xl shadow-[#CE1827]/35
                     flex items-center justify-center cursor-pointer"
        >
          <ShoppingBag size={22} className="text-white" />

          {/* Badge Jumlah Item */}
          <motion.span
            key={totalItems}
            initial={{ scale: 0.4 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 600, damping: 20 }}
            className="absolute -top-1.5 -right-1.5
                       bg-white text-[#CE1827] text-[11px] font-black
                       w-5 h-5 rounded-full flex items-center justify-center
                       shadow-md ring-2 ring-[#CE1827]"
          >
            {totalItems > 99 ? "99+" : totalItems}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// src/context/CartContext.tsx
// Global State Management untuk Keranjang & Checkout In-App
// Persisten antar rute multi-halaman Next.js
// ============================================================

"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { MenuItem, CartItem, OrderResult, CheckoutFormData } from "@/types";

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: MenuItem, addons?: string[]) => void;
  decreaseItem: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  getItemQuantity: (itemId: string) => number;

  // Sidebar Drawer state
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  // In-App Payment Modal state
  pendingCheckout: CheckoutFormData | null;
  setPendingCheckout: (data: CheckoutFormData | null) => void;

  // Order Success Screen state
  completedOrder: OrderResult | null;
  setCompletedOrder: (order: OrderResult | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "madjoe_kopi_cart_v2";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [pendingCheckout, setPendingCheckout] = useState<CheckoutFormData | null>(null);
  const [completedOrder, setCompletedOrder] = useState<OrderResult | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount (SSR safe)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, isHydrated]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addItem = useCallback((menuItem: MenuItem, addons?: string[]) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === menuItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...menuItem, quantity: 1, selectedAddons: addons }];
    });
  }, []);

  const decreaseItem = useCallback((itemId: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (!existing) return prev;

      if (existing.quantity === 1) {
        return prev.filter((i) => i.id !== itemId);
      }
      return prev.map((i) =>
        i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const getItemQuantity = useCallback(
    (itemId: string): number => {
      return items.find((i) => i.id === itemId)?.quantity ?? 0;
    },
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addItem,
        decreaseItem,
        removeItem,
        clearCart,
        getItemQuantity,
        isCartOpen,
        openCart,
        closeCart,
        pendingCheckout,
        setPendingCheckout,
        completedOrder,
        setCompletedOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

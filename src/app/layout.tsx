// ============================================================
// src/app/layout.tsx
// Root layout — Metadata SEO & Pembungkus AppShell + CartProvider
// ============================================================

import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Madjoe Kopi — Order & Take | Mataram, Lombok",
  description:
    "Sistem pemesanan mandiri Madjoe Kopi, Jl. Pejanggik No.66X Mataram. Kopi susu andalan, Americano segar, manual brew, dan makanan lezat tanpa antri lama.",
  keywords: [
    "madjoe kopi",
    "kopi mataram",
    "order and take",
    "kopi kenangan mataram",
    "cafe pejanggik",
    "kuliner mataram",
    "kopi susu lombok",
  ],
  openGraph: {
    title: "Madjoe Kopi — Order & Take Mataram",
    description: "Pesan kopi favoritmu, bayar in-app, ambil langsung tanpa antri di Jl. Pejanggik No.66X, Mataram.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-[#F3ECE3] text-[#4A2E1B] antialiased">
        <CartProvider>
          <AppShell>{children}</AppShell>
        </CartProvider>
      </body>
    </html>
  );
}

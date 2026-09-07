// ============================================================
// src/app/layout.tsx
// Root layout — metadata SEO & font configuration
// ============================================================

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Madjoe Kopi — Order & Take | Mataram",
  description:
    "Pesan kopi dan camilan favoritmu di Madjoe Kopi Mataram. Order online, ambil langsung — cepat, mudah, tanpa antri lama.",
  keywords: ["kopi mataram", "madjoe kopi", "order kopi online", "kafe mataram", "NTB"],
  openGraph: {
    title: "Madjoe Kopi — Order & Take",
    description: "Pesan kopi favoritmu, ambil langsung di Madjoe Kopi Mataram.",
    type: "website",
    locale: "id_ID",
  },
  // Favicon: tambahkan /public/favicon.ico untuk production
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}

// ============================================================
// src/components/Reveal.tsx
// Scroll-driven Reveal Component (Diadaptasi dari portofolio-ref)
// Menggunakan cinematic ease curve: [0.16, 1, 0.3, 1]
// ============================================================

"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Kurva transisi cinematic dari portofolio-ref:
 * Awal cepat, diakhiri settling yang sangat lembut & natural.
 */
export const CINEMATIC_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  duration?: number;
}

/**
 * Reveal — Komponen pembungkus animasi saat elemen masuk ke viewport.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
  amount = 0.2,
  duration = 0.7,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: CINEMATIC_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

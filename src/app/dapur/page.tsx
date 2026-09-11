// ============================================================
// src/app/dapur/page.tsx
// Kitchen Display System (KDS) Realtime — Madjoe Kopi
// Khusus Barista & Kru Bar (Layar Tablet / Bar Display)
// ============================================================

"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import {
  Coffee,
  Clock,
  User,
  AlertCircle,
  CheckCircle2,
  Bell,
  RefreshCw,
  Volume2,
  VolumeX,
  Radio,
  Flame,
  Check,
  ChevronRight,
  ArrowRight,
  Timer,
  ShoppingBag,
} from "lucide-react";
import { OrderRecord, KitchenOrderStatus } from "@/types";

/**
 * Sintesis Audio Bell / Chime Notifikasi menggunakan Web Audio API murni.
 * Menghasilkan nada lonceng meja baris ganda (D5 -> A5 -> D6) tanpa dependensi aset file.
 */
function playChimeSound() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;

    const chime = (freq: number, start: number, duration: number, gainPeak = 0.25) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, start);

      // Kurva resonansi denting lonceng
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(gainPeak, start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + duration);
    };

    // Nada ramah bertahap: D5 (587.33Hz) -> A5 (880Hz) -> D6 (1174.66Hz)
    chime(587.33, now, 0.45, 0.2);
    chime(880.0, now + 0.12, 0.65, 0.25);
    chime(1174.66, now + 0.25, 0.9, 0.3);
  } catch (err) {
    console.warn("Audio chime tidak dapat diputar:", err);
  }
}

export default function DapurKDSPage() {
  // 1. Inisialisasi Supabase client browser-safe sesuai instruksi
  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const anonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      "";
    return createClient(url, anonKey);
  }, []);

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState<"aktif" | "pending" | "diproses" | "siap_diambil" | "selesai">("aktif");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [newOrderAlert, setNewOrderAlert] = useState<string | null>(null);

  // Simpan ref daftar ID yang sudah diketahui agar notifikasi suara hanya berbunyi untuk pesanan baru
  const knownIdsRef = useRef<Set<string>>(new Set());

  // Update jam digital bar setiap detik
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " WITA"
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  /**
   * 2. Fetch data awal saat mount: Ambil seluruh pesanan dari tabel `orders` yang berstatus aktif
   */
  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      // Prioritaskan fetch langsung via client Supabase
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .neq("payment_status", "selesai")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        setOrders(data as OrderRecord[]);
        data.forEach((o) => knownIdsRef.current.add(o.id));
      } else {
        // Fallback ke API internal route handler jika RLS anon memerlukan service-role
        const res = await fetch("/api/pesanan?filter=active");
        if (res.ok) {
          const json = await res.json();
          if (json.orders) {
            setOrders(json.orders);
            json.orders.forEach((o: OrderRecord) => knownIdsRef.current.add(o.id));
          }
        }
      }
    } catch (err) {
      console.error("Gagal mengambil data pesanan dapur:", err);
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  /**
   * 3. Implementasikan Supabase Realtime Channel (INSERT & UPDATE pada table `orders`)
   */
  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel("dapur-kds-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          const newOrder = payload.new as OrderRecord;
          console.log("🔔 [KDS] Pesanan baru masuk:", newOrder);

          // Masukkan pesanan ke state paling atas tanpa reload
          setOrders((prev) => [newOrder, ...prev.filter((o) => o.id !== newOrder.id)]);

          // Mainkan audio notifikasi lonceng jika suara aktif
          if (soundEnabled) {
            playChimeSound();
          }

          // Munculkan banner notifikasi visual sementara
          setNewOrderAlert(`Pesanan Baru: ${newOrder.id} (${newOrder.customer_name})`);
          setTimeout(() => setNewOrderAlert(null), 5000);

          knownIdsRef.current.add(newOrder.id);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        (payload) => {
          const updatedOrder = payload.new as OrderRecord;
          console.log("🔄 [KDS] Pembaruan pesanan:", updatedOrder);

          setOrders((prev) =>
            prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
          );
        }
      )
      .subscribe((status) => {
        setIsConnected(status === "SUBSCRIBED");
      });

    // Heartbeat fallback polling setiap 6 detik untuk memastikan tidak ada pesanan tertinggal
    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch("/api/pesanan?filter=active");
        if (res.ok) {
          const json = await res.json();
          if (json.orders) {
            const incoming: OrderRecord[] = json.orders;
            setOrders((prev) => {
              // Cek apakah ada order ID baru yang belum pernah dilihat
              let hasNew = false;
              incoming.forEach((o) => {
                if (!knownIdsRef.current.has(o.id)) {
                  hasNew = true;
                  knownIdsRef.current.add(o.id);
                }
              });

              if (hasNew && soundEnabled) {
                playChimeSound();
              }
              return incoming;
            });
          }
        }
      } catch (e) {
        // abaikan kegagalan polling minor di background
      }
    }, 6000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(pollInterval);
    };
  }, [supabase, fetchOrders, soundEnabled]);

  /**
   * 4. Fungsi update status pesanan langsung dari kartu (PATCH ke /api/pesanan/status)
   */
  const handleUpdateStatus = async (orderId: string, newStatus: KitchenOrderStatus) => {
    setUpdatingId(orderId);

    // Optimistic UI update agar instan di mata barista
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, payment_status: newStatus } : o))
    );

    try {
      const res = await fetch("/api/pesanan/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Gagal memperbarui status");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memperbarui status";
      console.error("Gagal update status pesanan:", msg);
      alert(msg);
      // Refresh ulang data jika terjadi error koneksi
      fetchOrders();
    } finally {
      setUpdatingId(null);
    }
  };

  // Helper format harga Rupiah
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  // Filter daftar pesanan berdasarkan tab aktif
  const filteredOrders = orders.filter((order) => {
    const status = order.payment_status?.toLowerCase();
    if (activeTab === "aktif") {
      return status !== "selesai";
    }
    if (activeTab === "pending") {
      return status === "pending";
    }
    if (activeTab === "diproses") {
      return status === "diproses";
    }
    if (activeTab === "siap_diambil") {
      return status === "siap_diambil";
    }
    if (activeTab === "selesai") {
      return status === "selesai";
    }
    return true;
  });

  // Hitungan jumlah pesanan per kategori
  const countPending = orders.filter((o) => o.payment_status === "pending").length;
  const countDiproses = orders.filter((o) => o.payment_status === "diproses").length;
  const countSiap = orders.filter((o) => o.payment_status === "siap_diambil").length;
  const countAktif = orders.filter((o) => o.payment_status !== "selesai").length;

  return (
    <div className="min-h-screen bg-[#12100E] text-[#F3ECE3] pt-20 pb-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#CE1827] selection:text-white">
      {/* ── HEADER KDS BARISTA ── */}
      <header className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#1C1714] border border-[#C68E58]/25 rounded-3xl p-4 sm:p-6 shadow-2xl">
          {/* Sisi Kiri: Brand & Status Live Barista */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#CE1827] flex items-center justify-center text-white shadow-lg shadow-[#CE1827]/30 shrink-0">
              <Coffee size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C68E58]">
                  Madjoe Kopi · Mataram
                </span>
                <span className="text-stone-600">•</span>
                {/* Indikator Realtime Channel */}
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 border border-stone-800 text-[10px] font-semibold">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isConnected ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                    }`}
                  />
                  <span className={isConnected ? "text-emerald-400" : "text-amber-400"}>
                    {isConnected ? "Realtime Aktif" : "Menghubungkan..."}
                  </span>
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl font-serif font-black text-white tracking-tight flex items-center gap-2">
                Kitchen Display System (KDS)
              </h1>
            </div>
          </div>

          {/* Sisi Kanan: Jam Digital, Kontrol Audio & Refresh */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Jam Bar Digital */}
            <div className="bg-black/50 border border-[#C68E58]/30 px-3.5 py-2 rounded-2xl flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-[#E5B582]">
              <Timer size={15} className="text-[#CE1827]" />
              <span>{currentTime || "00:00:00 WITA"}</span>
            </div>

            {/* Toggle & Test Audio Lonceng */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) playChimeSound();
              }}
              title={soundEnabled ? "Nonaktifkan Suara Lonceng" : "Aktifkan Suara Lonceng"}
              className={`px-3 py-2 rounded-2xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                soundEnabled
                  ? "bg-[#C68E58]/20 border-[#C68E58]/50 text-[#E5B582] hover:bg-[#C68E58]/30"
                  : "bg-stone-900 border-stone-800 text-stone-500"
              }`}
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
              <span className="hidden sm:inline">Lonceng</span>
            </button>

            <button
              onClick={playChimeSound}
              className="bg-stone-900 hover:bg-stone-800 border border-stone-700 px-3 py-2 rounded-2xl text-xs font-semibold text-stone-300 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Uji coba suara lonceng barista"
            >
              <Bell size={14} className="text-[#E5B582]" />
              <span className="hidden sm:inline">Tes Bell</span>
            </button>

            {/* Tombol Segarkan Manual */}
            <button
              onClick={fetchOrders}
              disabled={isLoading}
              className="bg-stone-900 hover:bg-stone-800 border border-stone-700 p-2.5 rounded-2xl text-stone-300 transition-all cursor-pointer disabled:opacity-50"
              title="Segarkan data pesanan"
            >
              <RefreshCw size={15} className={isLoading ? "animate-spin text-[#CE1827]" : ""} />
            </button>
          </div>
        </div>

        {/* ── BANNER TOAST PESANAN BARU MASUK (Realtime Alert) ── */}
        <AnimatePresence>
          {newOrderAlert && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              className="mt-3 bg-gradient-to-r from-[#CE1827] to-[#B51320] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between font-bold text-sm"
            >
              <div className="flex items-center gap-2">
                <Bell size={18} className="animate-bounce" />
                <span>{newOrderAlert}</span>
              </div>
              <button
                onClick={() => setNewOrderAlert(null)}
                className="text-white/80 hover:text-white text-xs uppercase tracking-wider px-2 py-1 rounded-lg bg-black/20"
              >
                Tutup
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── TABS FILTER STATUS PESANAN ── */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 cart-scroll">
          <button
            onClick={() => setActiveTab("aktif")}
            className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === "aktif"
                ? "bg-[#CE1827] text-white shadow-md shadow-[#CE1827]/30"
                : "bg-[#1C1714] text-stone-400 border border-stone-800 hover:text-stone-200"
            }`}
          >
            <span>Semua Aktif</span>
            <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-black/30 text-white">
              {countAktif}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === "pending"
                ? "bg-amber-500 text-black shadow-md shadow-amber-500/30"
                : "bg-[#1C1714] text-amber-400/80 border border-amber-500/30 hover:bg-amber-500/10"
            }`}
          >
            <span>Menunggu (Pending)</span>
            <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-black/20">
              {countPending}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("diproses")}
            className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === "diproses"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-[#1C1714] text-blue-400 border border-blue-500/30 hover:bg-blue-500/10"
            }`}
          >
            <span>Sedang Diproses</span>
            <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-black/30">
              {countDiproses}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("siap_diambil")}
            className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === "siap_diambil"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "bg-[#1C1714] text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/10"
            }`}
          >
            <span>Siap Diambil</span>
            <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-black/30">
              {countSiap}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("selesai")}
            className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
              activeTab === "selesai"
                ? "bg-stone-700 text-white shadow-md"
                : "bg-[#1C1714] text-stone-500 border border-stone-800 hover:text-stone-300"
            }`}
          >
            Riwayat Selesai
          </button>
        </div>
      </header>

      {/* ── GRID KARTU PESANAN (KDS BOARD) ── */}
      <main className="max-w-7xl mx-auto">
        {isLoading && orders.length === 0 ? (
          <div className="py-24 text-center">
            <RefreshCw size={36} className="animate-spin text-[#C68E58] mx-auto mb-3" />
            <p className="font-serif font-bold text-lg text-stone-300">Memuat Antrean Dapur...</p>
            <p className="text-xs text-stone-500 mt-1">Menghubungkan ke database Supabase</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-[#1C1714] border border-stone-800 rounded-3xl p-12 text-center max-w-md mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-500 mx-auto mb-4">
              <CheckCircle2 size={32} className="text-emerald-500/70" />
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Tidak Ada Pesanan</h3>
            <p className="text-xs text-stone-400 mt-1 leading-relaxed">
              {activeTab === "aktif"
                ? "Semua pesanan saat ini sudah selesai diracik atau belum ada pesanan baru masuk."
                : `Tidak ada pesanan dengan status '${activeTab}'.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            <AnimatePresence mode="popLayout">
              {filteredOrders.map((order) => {
                const status = order.payment_status?.toLowerCase();
                const isPending = status === "pending";
                const isDiproses = status === "diproses";
                const isSiap = status === "siap_diambil";
                const isSelesai = status === "selesai";

                // Format jam masuk order
                const formattedTime = order.created_at
                  ? new Date(order.created_at).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "-";

                return (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className={`rounded-3xl border flex flex-col justify-between overflow-hidden shadow-xl transition-all ${
                      isPending
                        ? "bg-[#1E1914] border-amber-500/40 hover:border-amber-500/70"
                        : isDiproses
                        ? "bg-[#161B24] border-blue-500/40 hover:border-blue-500/70"
                        : isSiap
                        ? "bg-[#131F19] border-emerald-500/40 hover:border-emerald-500/70"
                        : "bg-[#191716] border-stone-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    {/* Header Kartu: Status Accent Line & Order ID */}
                    <div
                      className={`h-1.5 w-full ${
                        isPending
                          ? "bg-amber-500"
                          : isDiproses
                          ? "bg-blue-500"
                          : isSiap
                          ? "bg-emerald-500"
                          : "bg-stone-700"
                      }`}
                    />

                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3.5">
                      {/* Baris 1: ID Pesanan & Badge Status */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-0.5">
                            Order ID
                          </span>
                          <span className="font-mono font-black text-xl sm:text-2xl text-white tracking-wider block">
                            {order.id}
                          </span>
                        </div>

                        {/* Status Badge (Pending / Diproses / Siap Diambil) */}
                        <div>
                          {isPending && (
                            <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                              Menunggu
                            </span>
                          )}
                          {isDiproses && (
                            <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                              <Flame size={12} className="text-blue-400 animate-pulse" />
                              Diproses
                            </span>
                          )}
                          {isSiap && (
                            <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                              <Bell size={12} className="text-emerald-400" />
                              Siap Ambil
                            </span>
                          )}
                          {isSelesai && (
                            <span className="inline-flex items-center gap-1 bg-stone-800 text-stone-400 border border-stone-700 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                              <Check size={12} />
                              Selesai
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Baris 2: Pelanggan & Waktu Masuk */}
                      <div className="bg-black/40 border border-white/5 rounded-2xl p-3 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-stone-400 flex items-center gap-1.5">
                            <User size={13} className="text-[#C68E58]" />
                            Pelanggan:
                          </span>
                          <span className="font-bold text-white text-sm">{order.customer_name}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-stone-400 flex items-center gap-1.5">
                            <Clock size={13} className="text-stone-500" />
                            Waktu Masuk:
                          </span>
                          <span className="font-mono text-stone-300">{formattedTime} WITA</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-stone-400">Pembayaran:</span>
                          <span className="font-bold uppercase text-[10px] px-2 py-0.5 rounded-md bg-stone-800 text-stone-200">
                            {order.payment_method || "QRIS"}
                          </span>
                        </div>
                      </div>

                      {/* Baris 3: Estimasi Jam Ambil (Badge Highlight Instruksi 5) */}
                      <div className="bg-gradient-to-r from-[#CE1827]/25 to-[#CE1827]/10 border border-[#CE1827]/40 px-3.5 py-2.5 rounded-2xl flex items-center justify-between">
                        <span className="text-[11px] text-[#FF858D] font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Clock size={14} />
                          Estimasi Ambil:
                        </span>
                        <span className="font-bold text-white text-sm bg-[#CE1827] px-2.5 py-0.5 rounded-lg shadow-xs">
                          {order.pickup_time || "Segera"}
                        </span>
                      </div>

                      {/* Baris 4: Catatan Khusus (Jika Ada) */}
                      {order.notes && (
                        <div className="bg-amber-950/40 border border-amber-500/35 p-2.5 rounded-2xl flex items-start gap-2 text-xs text-amber-200">
                          <AlertCircle size={15} className="text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block text-[10px] uppercase tracking-wider text-amber-400">
                              Catatan Khusus:
                            </span>
                            <span className="leading-snug">{order.notes}</span>
                          </div>
                        </div>
                      )}

                      {/* Baris 5: Daftar Item Pesanan (Nama Menu, Qty, Subtotal) */}
                      <div className="space-y-1.5 pt-2 border-t border-white/10">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-stone-400 block mb-1">
                          Rincian Menu ({order.items?.length || 0} item):
                        </span>
                        <div className="space-y-1.5 max-h-40 overflow-y-auto cart-scroll pr-1">
                          {order.items?.map((item, idx) => (
                            <div
                              key={idx}
                              className="bg-black/30 border border-white/5 rounded-xl p-2 flex items-center justify-between text-xs"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-lg bg-[#C68E58]/25 text-[#E5B582] font-black text-xs flex items-center justify-center font-mono">
                                  {item.quantity}x
                                </span>
                                <span className="font-bold text-white leading-tight">
                                  {item.name}
                                </span>
                              </div>
                              <span className="font-mono text-stone-400 text-[11px] shrink-0">
                                {formatPrice(item.subtotal || item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Total Harga */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                        <span className="text-stone-400 font-semibold">Total Pesanan:</span>
                        <span className="font-mono font-bold text-sm text-[#E5B582]">
                          {formatPrice(order.total_amount)}
                        </span>
                      </div>
                    </div>

                    {/* ── TOMBOL AKSI UPDATE STATUS (Instruksi 6) ── */}
                    <div className="p-3 bg-black/50 border-t border-white/5 flex gap-2">
                      {isPending && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, "diproses")}
                          disabled={updatingId === order.id}
                          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/30 cursor-pointer disabled:opacity-50"
                        >
                          {updatingId === order.id ? (
                            <RefreshCw size={14} className="animate-spin" />
                          ) : (
                            <Flame size={15} />
                          )}
                          <span>Proses Pesanan</span>
                          <ArrowRight size={14} />
                        </button>
                      )}

                      {isDiproses && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, "siap_diambil")}
                          disabled={updatingId === order.id}
                          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/30 cursor-pointer disabled:opacity-50"
                        >
                          {updatingId === order.id ? (
                            <RefreshCw size={14} className="animate-spin" />
                          ) : (
                            <Bell size={15} />
                          )}
                          <span>Siap Diambil</span>
                          <Check size={14} />
                        </button>
                      )}

                      {isSiap && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, "selesai")}
                          disabled={updatingId === order.id}
                          className="w-full bg-stone-700 hover:bg-stone-600 text-white font-bold py-3 px-4 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                        >
                          {updatingId === order.id ? (
                            <RefreshCw size={14} className="animate-spin" />
                          ) : (
                            <CheckCircle2 size={15} className="text-emerald-400" />
                          )}
                          <span>Selesai (Diambil)</span>
                        </button>
                      )}

                      {isSelesai && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, "diproses")}
                          disabled={updatingId === order.id}
                          className="w-full bg-stone-800 hover:bg-stone-700 text-stone-400 font-semibold py-2.5 px-3 rounded-2xl text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <span>Kembalikan ke Antrean</span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}

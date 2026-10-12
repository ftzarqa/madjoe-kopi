// ============================================================
// src/app/api/pesanan/status/route.ts
// Update Status Pesanan — Wajib Terautentikasi (Admin / Barista)
// ============================================================

import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function PATCH(req: NextRequest) {
  // 1. Buat Supabase client berbasis cookies (server-side, SSR-safe)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setAll(_cookiesToSet) {
          // Read-only dalam context Route Handler; cookie refresh
          // dilakukan oleh middleware (proxy.ts) secara otomatis.
        },
      },
    }
  );

  // 2. Wajibkan sesi autentikasi — tolak jika bukan admin/barista
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: "Unauthorized: Anda harus login sebagai admin atau barista." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const orderId: string | undefined = body.orderId || body.id;
    const status: string | undefined = body.status || body.order_status || body.payment_status;

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "orderId dan status wajib diisi" },
        { status: 400 }
      );
    }

    // 3. Update status pesanan menggunakan context user yang login (Anon Key + RLS)
    const { data, error } = await supabase
      .from("orders")
      .update({ payment_status: status })
      .eq("id", orderId)
      .select()
      .single();

    if (error) {
      console.error("Database error updating order status:", error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: `Status pesanan ${orderId} berhasil diperbarui menjadi ${status}`,
      order: data,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Gagal memperbarui status pesanan";
    console.error("Error updating order status:", error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

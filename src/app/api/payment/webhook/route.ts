// ============================================================
// src/app/api/payment/webhook/route.ts
// Route Handler Webhook Midtrans untuk Notifikasi Pelunasan
// ============================================================

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const notification = await req.json();

    const orderId = notification.order_id;
    const transactionStatus = notification.transaction_status;
    const fraudStatus = notification.fraud_status;

    console.log(`[Midtrans Webhook] Order: ${orderId}, Status: ${transactionStatus}, Fraud: ${fraudStatus}`);

    if (!orderId) {
      return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
    }

    // Evaluasi status pelunasan transaksi
    let paymentStatus = "pending";

    if (
      transactionStatus === "settlement" ||
      (transactionStatus === "capture" && fraudStatus !== "challenge")
    ) {
      // Pembayaran berhasil & lunas (settled / captured)
      paymentStatus = "paid";
    } else if (
      transactionStatus === "cancel" ||
      transactionStatus === "deny" ||
      transactionStatus === "expire"
    ) {
      // Transaksi batal, ditolak, atau kedaluwarsa
      paymentStatus = "failed";
    } else if (transactionStatus === "pending") {
      paymentStatus = "pending";
    }

    // Update kolom payment_status di tabel orders Supabase
    const { error: dbError } = await supabaseAdmin
      .from("orders")
      .update({ payment_status: paymentStatus })
      .eq("id", orderId);

    if (dbError) {
      console.error("[Midtrans Webhook] Database update error:", dbError);
      return NextResponse.json({ error: "Database update error" }, { status: 500 });
    }

    // Kembalikan response { status: "OK" } dengan status 200
    return NextResponse.json({ status: "OK" }, { status: 200 });
  } catch (error: unknown) {
    console.error("[Midtrans Webhook] Handler error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

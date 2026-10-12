// ============================================================
// src/app/api/payment/webhook/route.ts
// Route Handler Webhook Midtrans — Dengan Validasi SHA512
// ============================================================

import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { supabaseAdmin } from "@/lib/supabase";

/**
 * Memvalidasi signature_key dari Midtrans menggunakan SHA-512.
 * Format hash: SHA512(order_id + status_code + gross_amount + serverKey)
 * @see https://docs.midtrans.com/docs/https-notification-webhooks
 */
function verifyMidtransSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  signatureKeyFromPayload: string
): boolean {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) {
    console.error("[Webhook] MIDTRANS_SERVER_KEY tidak ditemukan di environment.");
    return false;
  }

  const rawString = `${orderId}${statusCode}${grossAmount}${serverKey}`;
  const computedHash = createHash("sha512").update(rawString).digest("hex");

  return computedHash === signatureKeyFromPayload;
}

export async function POST(req: Request) {
  try {
    const notification = await req.json();

    const orderId: string = notification.order_id;
    const statusCode: string = notification.status_code;
    const grossAmount: string = notification.gross_amount;
    const signatureKey: string = notification.signature_key;
    const transactionStatus: string = notification.transaction_status;
    const fraudStatus: string = notification.fraud_status;

    // 1. Validasi: Pastikan field wajib tersedia
    if (!orderId || !statusCode || !grossAmount || !signatureKey) {
      console.warn("[Webhook] Payload tidak lengkap:", { orderId, statusCode, grossAmount });
      return NextResponse.json({ error: "Payload tidak lengkap" }, { status: 400 });
    }

    // 2. Validasi Kriptografi SHA-512 — Tolak jika signature tidak cocok
    const isValid = verifyMidtransSignature(orderId, statusCode, grossAmount, signatureKey);
    if (!isValid) {
      console.error(`[Webhook] Signature tidak valid untuk order: ${orderId}. Kemungkinan request palsu.`);
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    console.log(`[Webhook] ✓ Signature valid — Order: ${orderId}, Status: ${transactionStatus}, Fraud: ${fraudStatus}`);

    // 3. Evaluasi status pelunasan transaksi
    let paymentStatus = "pending";

    if (
      transactionStatus === "settlement" ||
      (transactionStatus === "capture" && fraudStatus !== "challenge")
    ) {
      paymentStatus = "paid";
    } else if (
      transactionStatus === "cancel" ||
      transactionStatus === "deny" ||
      transactionStatus === "expire"
    ) {
      paymentStatus = "failed";
    } else if (transactionStatus === "pending") {
      paymentStatus = "pending";
    }

    // 4. Update kolom payment_status di tabel orders Supabase
    const { error: dbError } = await supabaseAdmin
      .from("orders")
      .update({ payment_status: paymentStatus })
      .eq("id", orderId);

    if (dbError) {
      console.error("[Webhook] Database update error:", dbError);
      return NextResponse.json({ error: "Database update error" }, { status: 500 });
    }

    return NextResponse.json({ status: "OK" }, { status: 200 });
  } catch (error: unknown) {
    console.error("[Webhook] Handler error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

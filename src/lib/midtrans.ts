// ============================================================
// src/lib/midtrans.ts
// Inisialisasi Midtrans Core API Client (Sandbox Environment)
// ============================================================

// @ts-expect-error midtrans-client does not provide official TypeScript definitions
import midtransClient from "midtrans-client";

const serverKey = process.env.MIDTRANS_SERVER_KEY || "";
const clientKey = process.env.MIDTRANS_CLIENT_KEY || "";

export const midtransCore = new midtransClient.CoreApi({
  isProduction: false,
  serverKey,
  clientKey,
});

export default midtransCore;

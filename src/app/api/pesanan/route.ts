import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { menuItems } from "@/data/menu";
import { midtransCore } from "@/lib/midtrans";

export async function POST(req: Request) {
  try {
    const { customerName, pickupTime, notes, cart, paymentMethod } = await req.json();

    if (!customerName || !cart || cart.length === 0) {
      return NextResponse.json(
        { error: "Data pesanan tidak lengkap" },
        { status: 400 }
      );
    }

    // Validasi harga resmi di sisi server
    let totalAmount = 0;
    const validatedItems = cart.map((item: { id: string; quantity: number }) => {
      const match = menuItems.find((m) => m.id === item.id);
      if (!match) throw new Error(`Item ${item.id} tidak valid.`);
      const subtotal = match.price * item.quantity;
      totalAmount += subtotal;
      return {
        id: match.id,
        name: match.name,
        price: match.price,
        quantity: item.quantity,
        subtotal,
      };
    });

    const orderId = `MDK-${Date.now()}`;

    let qrUrl: string | null = null;
    let qrString: string | null = null;

    // Jika metode pembayaran QRIS, panggil Core API Midtrans Sandbox
    if (paymentMethod === "qris") {
      try {
        const midtransPayload = {
          payment_type: "qris",
          transaction_details: {
            order_id: orderId,
            gross_amount: totalAmount,
          },
          qris: {
            acquirer: "gopay",
          },
          customer_details: {
            first_name: customerName,
          },
          item_details: validatedItems.map(
            (item: { id: string; price: number; quantity: number; name: string }) => ({
              id: item.id,
              price: item.price,
              quantity: item.quantity,
              name: item.name.slice(0, 50),
            })
          ),
        };

        const chargeResponse = await midtransCore.charge(midtransPayload);

        // Ambil URL QR code dari array actions (name: "generate-qr-code")
        if (chargeResponse && Array.isArray(chargeResponse.actions)) {
          const qrAction = chargeResponse.actions.find(
            (action: { name: string; url: string }) => action.name === "generate-qr-code"
          );
          if (qrAction) {
            qrUrl = qrAction.url;
          }
        }

        if (chargeResponse?.qr_string) {
          qrString = chargeResponse.qr_string;
        }
      } catch (midtransError: unknown) {
        console.error("Midtrans charge error:", midtransError);
        // Fallback jika kredensial sandbox placeholder atau koneksi terhambat
        qrUrl = `https://api.sandbox.midtrans.com/v2/qris/${orderId}/qr-code`;
      }
    }

    // Insert ke tabel orders Supabase
    const { error: dbError } = await supabaseAdmin.from("orders").insert({
      id: orderId,
      customer_name: customerName,
      pickup_time: pickupTime || "Segera",
      notes: notes || "",
      items: validatedItems,
      total_amount: totalAmount,
      payment_status: "pending",
      payment_method: paymentMethod || "qris",
      qris_url: qrUrl || qrString || null,
    });

    if (dbError) throw dbError;

    return NextResponse.json({
      success: true,
      orderId,
      totalAmount,
      qrUrl,
      qrString,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Gagal menyimpan ke database" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter");

    let query = supabaseAdmin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (filter === "active") {
      query = query.neq("payment_status", "selesai");
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ success: true, orders: data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Gagal mengambil data pesanan" },
      { status: 500 }
    );
  }
}


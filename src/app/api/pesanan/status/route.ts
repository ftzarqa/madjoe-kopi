import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const orderId = body.orderId || body.id;
    const status = body.status || body.order_status || body.payment_status;

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "orderId dan status wajib diisi" },
        { status: 400 }
      );
    }

    // Update status pesanan di tabel orders Supabase
    const { data, error } = await supabaseAdmin
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
  } catch (error: any) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { error: error.message || "Gagal memperbarui status pesanan" },
      { status: 500 }
    );
  }
}

import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export default async function proxy(request: NextRequest) {
  // Semua request yang masuk ke matcher akan diproses oleh fungsi ini
  return await updateSession(request);
}

// Menentukan rute mana saja yang akan dicegat oleh middleware
export const config = {
  matcher: [
    /*
     * Cegat semua rute KECUALI:
     * - _next/static (file statis)
     * - _next/image (optimasi gambar)
     * - favicon.ico (ikon browser)
     * - Gambar dan aset statis (.svg, .png, .jpg, .jpeg, .gif, .webp)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

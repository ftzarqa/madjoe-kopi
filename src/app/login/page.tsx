"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Coffee, Lock, Mail, Loader2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (data.session) {
        // Jika berhasil login, redirect ke halaman admin
        router.push("/dapur");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Gagal melakukan login. Periksa kembali kredensial Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3ECE3] p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-[#4A2E1B]/10">
        
        {/* Header Banner */}
        <div className="bg-[#CE1827] px-8 py-10 flex flex-col items-center justify-center text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
            <Coffee size={32} className="text-white drop-shadow-md" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide">Madjoe Kopi</h1>
          <p className="text-white/80 mt-2 text-sm">Portal Manajemen Internal</p>
        </div>

        {/* Login Form */}
        <div className="p-8">
          <h2 className="text-xl font-bold text-[#4A2E1B] mb-6 text-center">
            Login Admin
          </h2>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 text-sm">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <p className="leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#4A2E1B] mb-1.5"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#4A2E1B]/40">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="admin@madjoekopi.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F3ECE3]/50 border border-[#4A2E1B]/15 rounded-xl pl-10 pr-4 py-3 text-sm text-[#4A2E1B] placeholder-[#4A2E1B]/40 focus:outline-none focus:border-[#4A2E1B] focus:ring-2 focus:ring-[#C68E58]/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-[#4A2E1B] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#4A2E1B]/40">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F3ECE3]/50 border border-[#4A2E1B]/15 rounded-xl pl-10 pr-4 py-3 text-sm text-[#4A2E1B] placeholder-[#4A2E1B]/40 focus:outline-none focus:border-[#4A2E1B] focus:ring-2 focus:ring-[#C68E58]/30 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#CE1827] text-white font-bold py-3.5 px-4 rounded-xl mt-4
                       flex items-center justify-center gap-2 shadow-lg shadow-[#CE1827]/25
                       hover:bg-[#B51320] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-wait"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                <span>Masuk Sistem</span>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[11px] text-[#4A2E1B]/50">
              &copy; {new Date().getFullYear()} Madjoe Kopi. Akses terbatas hanya untuk staf resmi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

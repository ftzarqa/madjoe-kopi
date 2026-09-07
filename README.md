# Madjoe Kopi — Order & Take Web App

Aplikasi web untuk sistem pemesanan kopi take-away Madjoe Kopi, Mataram NTB.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server
npm run dev

# 3. Buka browser ke http://localhost:3000
```

## 📦 Build & Deploy

```bash
# Build untuk production
npm run build

# Jalankan production build secara lokal
npm start
```

## 🌐 Deploy ke Vercel (Rekomendasi)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (ikuti petunjuk interaktif)
vercel
```

Atau push ke GitHub → hubungkan repo ke [vercel.com](https://vercel.com) → deploy otomatis.

## 🏗️ Struktur Proyek

```
src/
├── app/
│   ├── layout.tsx       # Root layout + metadata SEO
│   ├── page.tsx         # Main SPA page (orchestrator)
│   └── globals.css      # Tailwind + custom styles
├── components/
│   ├── Navbar.tsx           # Header sticky dengan badge keranjang
│   ├── MenuGrid.tsx         # Grid menu dikelompokkan per kategori
│   ├── MenuCard.tsx         # Card satu item menu
│   ├── CartSidebar.tsx      # Sidebar keranjang slide-in
│   ├── CartItem.tsx         # Baris item dalam keranjang
│   ├── CheckoutForm.tsx     # Form checkout → WhatsApp redirect
│   └── FloatingCartButton.tsx # FAB mobile
├── data/
│   └── menu.ts          # Data dummy 12 menu
├── hooks/
│   └── useCart.ts       # Custom hook state management keranjang
└── types/
    └── index.ts         # TypeScript type definitions
```

## 💡 Cara Kustomisasi

### Ganti Data Menu
Edit file `src/data/menu.ts` — tambah/ubah item di array `menuItems`.

### Ganti Nomor WhatsApp
Edit `WHATSAPP_NUMBER` di `src/components/CheckoutForm.tsx`:
```ts
const WHATSAPP_NUMBER = "628XXXXXXXXX"; // Format: 62 + nomor tanpa 0
```

### Ganti Gambar
Ganti `imageUrl` di `src/data/menu.ts` dengan URL gambar asli atau path lokal di `/public/images/`.

### Ganti Warna Brand
Edit `tailwind.config.ts` → section `colors` → prefix `brand-*`.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deploy**: Vercel (rekomendasi)

## 📱 Fitur

- ✅ Daftar menu 12 item (4 kopi susu, 4 kopi hitam, 4 camilan)
- ✅ Responsive grid (1/2/3 kolom)
- ✅ Keranjang belanja dengan state management
- ✅ Kontrol quantity (tambah/kurang/hapus)
- ✅ Sidebar keranjang slide-in dengan backdrop
- ✅ FAB mobile untuk akses cepat keranjang
- ✅ Form checkout (nama + waktu pengambilan)
- ✅ Redirect ke WhatsApp dengan format pesan rapi
- ✅ Format harga Rupiah otomatis

---

*Madjoe Kopi © 2024 — Mataram, NTB*

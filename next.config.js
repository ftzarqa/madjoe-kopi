/** @type {import('next').NextConfig} */
const nextConfig = {
  // Izinkan gambar dari domain eksternal (untuk placeholder images)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;

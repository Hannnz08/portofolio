/** @type {import('next').NextConfig} */
// Konfigurasi Next.js untuk portofolio statis
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Gambar lokal placeholder; aktifkan domain lain bila perlu
    formats: ['image/webp'],
    // Izinkan placeholder SVG (aman karena dari /public milik sendiri).
    // Saat Anda ganti ke foto asli (.jpg/.png/.webp), tetap dioptimasi otomatis.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;

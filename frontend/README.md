# Portofolio — Farhan Rifqi Ramadhani

Website portofolio satu halaman bergaya **slide presentasi vertikal** (scroll-snap).
Dibuat dengan **Next.js 15 (App Router) + TypeScript + Tailwind CSS + Framer Motion**.

## ✨ Fitur
- 7 slide layar penuh (100dvh) dengan **scroll-snap** antar bagian
- Animasi teks per kata di sampul, elemen muncul bertahap saat slide masuk layar
- **Bar progres** scroll + **indikator titik** slide
- Kartu proyek yang bisa dibuka & **galeri sertifikat dengan lightbox** (panah kiri/kanan, Esc, focus trap)
- **Mode gelap / terang** (tersimpan di browser)
- Responsif (HP & laptop), gambar lazy-load, aksesibilitas, `prefers-reduced-motion`
- SEO + Open Graph + sitemap

## 📝 Mengubah konten
Semua teks, proyek, dan sertifikat ada di satu file:
```
data/content.ts
```
Tinggal ubah nilainya. Bagian bertanda `[..]` / `[isi]` / `[tahun]` masih harus Anda isi.

## 🖼️ Mengganti gambar
Lihat `public/images/README.md`. Ringkasnya:
- Foto profil → `public/images/profile.jpg`, lalu set `hero.photo` di `data/content.ts`
- Proyek → `public/images/projects/`, set `projects[i].image`
- Sertifikat → `public/images/certificates/`, set `certificates[i].image`

Menambah proyek / sertifikat cukup menambah satu objek di `data/content.ts`.

## 💻 Menjalankan di komputer
```bash
yarn install
yarn dev        # buka http://localhost:3000
yarn build      # build produksi
yarn serve      # jalankan hasil build
```

## 🚀 Deploy ke Vercel (paling mudah — direkomendasikan)
1. Push proyek ini ke GitHub (lihat bagian GitHub di bawah).
2. Buka https://vercel.com → **Add New → Project** → pilih repo Anda.
3. Framework terdeteksi otomatis sebagai **Next.js** → klik **Deploy**.
4. Selesai. Setelah live, perbarui `site.url` di `data/content.ts` dengan domain Vercel Anda (untuk SEO/OG).

## 🐙 Push ke GitHub
```bash
git init
git add .
git commit -m "Portofolio Farhan"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

## 📄 Deploy ke GitHub Pages (opsional)
Next.js butuh **static export** untuk GitHub Pages. Edit `next.config.mjs`:
```js
const nextConfig = {
  output: 'export',              // aktifkan export statis
  images: { unoptimized: true }, // wajib untuk GitHub Pages
  basePath: '/REPO',             // ganti REPO dengan nama repo Anda
};
```
Lalu:
```bash
yarn build       # menghasilkan folder ./out
```
Unggah isi folder `out/` ke branch `gh-pages`, atau pakai GitHub Actions.
> Catatan: di Vercel Anda **tidak** perlu perubahan ini — Vercel mendukung Next.js penuh.

## 📧 Form kontak (opsional)
Default menampilkan daftar tautan (Email, LinkedIn, dst). Untuk form terkirim:
1. Daftar di https://formspree.io, buat form, salin endpoint.
2. Isi `contact.formspreeEndpoint` di `data/content.ts`.
Form akan otomatis muncul menggantikan daftar tautan.

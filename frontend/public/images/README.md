# Folder Aset Gambar

Semua gambar website ada di sini. Ganti file placeholder (.svg) dengan foto asli Anda.

## Cara mengganti

1. **Foto profil (Sampul)**
   - Letakkan foto di: `public/images/profile.jpg` (atau .png/.webp)
   - Buka `data/content.ts` → ubah `hero.photo` menjadi `/images/profile.jpg`

2. **Gambar proyek**
   - Letakkan di: `public/images/projects/`
   - Ubah `projects[i].image` di `data/content.ts`
   - Rasio ideal: 16:10 (mis. 1280×800)

3. **Foto sertifikat**
   - Letakkan di: `public/images/certificates/`
   - Ubah `certificates[i].image` di `data/content.ts`
   - Rasio ideal: 4:3

4. **Open Graph (preview saat dibagikan)**
   - Ganti `public/images/og-cover.svg` dengan `og-cover.jpg` (1200×630)
   - Perbarui `site.ogImage` di `data/content.ts`

## Tips performa
- Gunakan format **WebP** atau JPG terkompres agar cepat dimuat.
- Next.js (`next/image`) otomatis mengoptimasi & lazy-load gambar.
- Ukuran file ideal < 300 KB per gambar.

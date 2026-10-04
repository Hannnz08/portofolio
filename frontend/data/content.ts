/**
 * ============================================================
 *  DATA KONTEN PORTOFOLIO — Farhan Rifqi Ramadhani
 *  Semua teks, proyek, dan sertifikat ada di file ini.
 *  Cukup ubah nilai di bawah untuk memperbarui website.
 *  Tanda "[..]" atau "[isi]" = bagian yang masih harus diisi.
 * ============================================================
 */

// ---------- Tipe data ----------
export type Project = {
  id: string;
  title: string;
  summary: string; // ringkasan singkat (tampil di kartu)
  description: string; // deskripsi lengkap (tampil saat kartu dibuka)
  tags: string[];
  image: string; // path gambar di /public
  link?: string; // tautan demo/repo (opsional)
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string; // tanggal/tahun terbit yang tampil di kartu
  /**
   * 1 atau 2 gambar (path di /public).
   * - 1 gambar  → tampil biasa, tanpa tombol balik.
   * - 2 gambar  → [halaman depan, halaman belakang], otomatis dapat efek balik 3D.
   */
  images: string[];
  /** Orientasi file gambar. Default 'landscape' (A4 mendatar). */
  orientation?: 'landscape' | 'portrait';
  credentialId?: string;
  verifyLink?: string; // tautan verifikasi (opsional)
  /** Detail tambahan (program, penyelenggara, periode, ...) — tampil di lightbox */
  details?: { label: string; value: string }[];
  /** Ringkasan materi — tampil di kartu & lightbox */
  topics?: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type ContactLink = {
  label: string;
  value: string; // teks tampil
  href: string; // tautan (mailto:/https:)
};

// ---------- Identitas / meta ----------
export const site = {
  // Dipakai untuk judul tab & SEO
  name: 'Farhan Rifqi Ramadhani',
  shortName: 'farhan.dev',
  role: 'Junior Network Engineer',
  description:
    'Portofolio Farhan Rifqi Ramadhani — Junior Network Engineer. Fokus pada MikroTik RouterOS, jaringan yang stabil, aman, dan terpantau.',
  // URL produksi setelah deploy (ganti saat sudah di Vercel), dipakai untuk Open Graph & sitemap
  url: 'https://farhan-portfolio.vercel.app',
  ogImage: '/images/og-cover.svg',
};

// ---------- 1. SAMPUL (Hero) ----------
export const hero = {
  availability: 'TERBUKA UNTUK MAGANG',
  name: 'Farhan Rifqi\nRamadhani',
  role: 'Junior Network Engineer',
  tagline: 'Membangun jaringan yang stabil, aman, dan terpantau.',
  // Lokasi: menampilkan KEDUANYA (domisili & asal)
  location: 'Berbah, Sleman · Magelang, DI Yogyakarta',
  chips: ['MTCNA', 'MikroTik RouterOS'],
  photo: '/images/profile.svg', // ganti dengan foto Anda
  scrollHint: 'Gulir',
};

// ---------- 2. TENTANG ----------
export const about = {
  kicker: 'TENTANG SAYA',
  heading: 'Siswa jaringan yang\nserius menekuni MikroTik.',
  body:
    'Saya Farhan, siswa TJKT, SMK Ma’arif Kota Mungkid yang menekuni jaringan komputer, terutama MikroTik RouterOS. Saya bersertifikat MTCNA dan rutin berlatih dengan dua router fisik dan GNS3.',
  quote: 'Jaringan yang baik adalah jaringan yang stabil, aman, dan bisa dipantau.',
  facts: [
    { label: 'Tempat, Tanggal Lahir', value: 'Magelang, 17 September 2008' },
    { label: 'Domisili', value: 'Sleman, DI Yogyakarta' },
    { label: 'Sekolah', value: 'TJKT · SMK Ma’arif Kota Mungkid' },
    { label: 'Sertifikasi', value: 'MTCNA · DTA Komdigi · Cisco NetAcad' },
  ],
  stats: [
    { value: '2+', label: 'Router Fisik' },
    { value: 'GNS3', label: 'Lab Virtual' },
    { value: '3', label: 'Sertifikat' },
  ],
};

// ---------- KARTU TANDA PENGENAL (lanyard di slide Tentang) ----------
export const idCard = {
  photo: '/images/profile.svg', // ganti dengan foto Anda, mis. '/images/profile.jpg'
  name: 'Farhan Rifqi Ramadhani',
  role: 'Calon Network Engineer',
  badge: 'MTCNA',
  location: 'Berbah, Sleman',
  idNumber: 'TJKT · 2026', // teks kecil dekoratif di bawah kartu
  // Sisi belakang
  backTitle: 'Kontak',
  qrLink: '[https://linkedin.com/in/..]', // tautan tujuan QR (LinkedIn/GitHub)
  qrLabel: 'Pindai untuk LinkedIn',
  backContacts: [
    { label: 'Email', value: '[email@contoh.com]' },
    { label: 'LinkedIn', value: '[linkedin.com/in/..]' },
    { label: 'GitHub', value: '[github.com/..]' },
  ],
};

// ---------- 3. KEAHLIAN ----------
export const skills: SkillGroup[] = [
  {
    label: 'MikroTik RouterOS',
    items: [
      'DHCP & DHCP Relay',
      'Bridge / VLAN',
      'Wireless',
      'Routing (OSPF)',
      'Firewall',
      'QoS',
      'VPN',
      'Web Proxy',
      'Hotspot',
    ],
  },
  {
    label: 'Alat & Simulasi',
    items: [
      'Winbox',
      'SSH',
      'GNS3 CHR',
      'VMware',
      'VirtualBox',
      'Cisco Packet Tracer',
    ],
  },
  {
    label: 'IoT',
    items: ['Arduino Uno', 'Arduino IDE', 'ESP32', 'Telegram Bot'],
  },
];

// ---------- 4. PENGALAMAN ----------
export const experience = [
  {
    role: 'Praktik Kerja Lapangan (PKL)',
    company: 'PT Citraweb Solusi Teknologi',
    period: '1 Januari – 30 Juni [tahun]', // [isi tahun]
    duration: '6 bulan',
    points: [
      'Instalasi jaringan [isi detail]',
      'Konfigurasi router MikroTik [isi detail]',
      'Troubleshooting jaringan [isi detail]',
    ],
  },
];

// ---------- 5. PROYEK ----------
export const projects: Project[] = [
  {
    id: 'smart-home-esp32',
    title: 'Smart Home Monitoring ESP32',
    summary:
      'Monitoring suhu, gas, dan jarak dengan alarm buzzer serta notifikasi Telegram.',
    description:
      'Sistem pemantauan rumah berbasis ESP32 yang memantau suhu, gas, dan jarak. Dilengkapi alarm buzzer saat kondisi berbahaya, notifikasi real-time ke Telegram, dan pencatatan data otomatis ke Google Sheets untuk analisis.',
    tags: ['ESP32', 'Telegram Bot', 'Google Sheets', 'IoT'],
    image: '/images/projects/smart-home.svg',
    link: '', // [tautan] — isi bila ada
  },
  {
    id: 'lab-mikrotik',
    title: 'Lab Praktik MikroTik',
    summary:
      'Dua router fisik + GNS3: DHCP relay, VPN, dan firewall lanjutan.',
    description:
      'Laboratorium praktik jaringan menggunakan dua router fisik dan GNS3. Mencakup konfigurasi DHCP relay antar-segmen, VPN site-to-site, serta firewall lanjutan untuk pengamanan jaringan.',
    tags: ['MikroTik', 'GNS3', 'VPN', 'Firewall'],
    image: '/images/projects/lab-mikrotik.svg',
    link: '',
  },
];

// ---------- 6. SERTIFIKAT ----------
// Cara menambah sertifikat baru:
//  1) Simpan gambar di public/images/certificates/ (JPG/PNG/WebP).
//  2) Tambahkan objek baru di array ini.
//     - Sertifikat 1 halaman → images: ['/images/certificates/nama.jpg']
//     - Sertifikat 2 halaman → images: ['/images/certificates/nama-1.jpg', '/images/certificates/nama-2.jpg']
//  3) Jika gambar tegak (portrait), tambahkan orientation: 'portrait'.
export const certificates: Certificate[] = [
  {
    id: 'mtcna',
    title: 'MTCNA — MikroTik Certified Network Associate',
    issuer: 'MikroTik (Mikrotikls SIA, Riga, Latvia)',
    date: '30 Juni 2026',
    images: ['/images/certificates/mtcna.jpg'],
    orientation: 'portrait',
    credentialId: '2606NA9044',
    verifyLink: 'https://mikrotik.com/certificates',
    details: [
      { label: 'Masa berlaku', value: '3 tahun sejak diterbitkan' },
      { label: 'Validasi', value: 'mikrotik.com/certificates' },
    ],
  },
  {
    id: 'dta-intermediate-network-admin',
    title: 'Intermediate Associate Network Administrator — Nasional',
    issuer: 'Digital Talent Academy · Komdigi',
    date: 'Jakarta, 4 Oktober 2026',
    images: [
      '/images/certificates/dta-intermediate-1.jpg',
      '/images/certificates/dta-intermediate-2.jpg',
    ],
    credentialId: '21212088840-4127/DTA/BLSDM.Komdigi/2026',
    verifyLink: '', // [isi tautan dari QR code di sertifikat]
    details: [
      { label: 'Program', value: 'Digital Talent Academy — Digital Talent Scholarship 2026' },
      { label: 'Penyelenggara', value: 'Pusat Pengembangan Talenta Digital, Komdigi' },
      { label: 'Periode', value: '3 Maret – 31 Desember 2026 · 12 jam pelatihan' },
    ],
    topics: [
      'Merancang Keamanan Jaringan (3 JP)',
      'Merancang Pemulihan Jaringan (3 JP)',
      'Mengkonfigurasi Routing Antar Autonomous System (AS) (3 JP)',
      'Memonitor Keamanan dan Pengaturan Akun Pengguna dalam Jaringan Komputer (3 JP)',
    ],
  },
  {
    id: 'cisco-networking-basics',
    title: 'Networking Basics',
    issuer: 'Cisco Networking Academy',
    date: '21 Mei 2026',
    images: ['/images/certificates/cisco-networking-basics.jpg'],
    credentialId: '9035efa2-14e3-4bee-b797-17f359add78a',
    verifyLink: '', // [isi tautan verifikasi bila ada]
    details: [{ label: 'Ditandatangani', value: 'Lynn Bloomer — Director, Cisco Networking Academy' }],
  },
];

// ---------- 7. KONTAK ----------
export const contact = {
  heading: 'Mari terhubung.',
  body: 'Terbuka untuk magang, kolaborasi, dan diskusi jaringan.',
  location: 'Berbah, Sleman · Magelang, DI Yogyakarta',
  links: [
    { label: 'Email', value: '[email@contoh.com]', href: 'mailto:[email@contoh.com]' },
    { label: 'LinkedIn', value: '[linkedin.com/in/..]', href: '[https://linkedin.com/in/..]' },
    { label: 'GitHub', value: '[github.com/..]', href: '[https://github.com/..]' },
    { label: 'Instagram', value: '[instagram.com/..]', href: '[https://instagram.com/..]' },
  ] as ContactLink[],
  // Opsional: Formspree untuk form kontak. Ganti dengan endpoint Anda.
  formspreeEndpoint: '', // contoh: 'https://formspree.io/f/xxxxxxx'
};

// ---------- Logo teknologi (marquee berjalan di slide Keahlian) ----------
// label = nama yang tampil. Tambah/kurangi sesukanya.
export const techMarquee: string[] = [
  'MikroTik',
  'Cisco',
  'GNS3',
  'Winbox',
  'RouterOS',
  'VMware',
  'VirtualBox',
  'Packet Tracer',
  'ESP32',
  'Arduino',
  'OSPF',
  'Hotspot',
];

// ---------- CATATAN / BLOG (konfigurasi jaringan singkat) ----------
export type Note = {
  id: string;
  title: string;
  tag: string;
  code: string; // cuplikan konfigurasi (RouterOS/CLI)
  description: string; // penjelasan singkat
};

export const notes: Note[] = [
  {
    id: 'dhcp-relay',
    title: 'DHCP Server & Relay',
    tag: 'MikroTik',
    code: `/ip dhcp-server setup\n/ip dhcp-relay add \\\n  name=relay1 interface=vlan10 \\\n  dhcp-server=10.0.0.1 local-address=192.168.10.1`,
    description:
      'Menyediakan IP otomatis untuk klien dan meneruskan permintaan DHCP antar-segmen VLAN memakai DHCP Relay.',
  },
  {
    id: 'vlan-bridge',
    title: 'VLAN & Bridge',
    tag: 'Switching',
    code: `/interface bridge add name=bridge1 vlan-filtering=yes\n/interface bridge vlan \\\n  add bridge=bridge1 tagged=ether1 vlan-ids=10,20`,
    description:
      'Memisahkan jaringan secara logis dengan VLAN di atas bridge agar lalu lintas antar-divisi terisolasi.',
  },
  {
    id: 'firewall',
    title: 'Firewall Dasar',
    tag: 'Security',
    code: `/ip firewall filter\nadd chain=input action=accept connection-state=established,related\nadd chain=input action=drop in-interface=ether1`,
    description:
      'Melindungi router: izinkan koneksi yang sudah terbentuk, lalu blokir akses tak dikenal dari arah WAN.',
  },
  {
    id: 'ospf',
    title: 'Routing OSPF',
    tag: 'Routing',
    code: `/routing ospf instance add name=default router-id=1.1.1.1\n/routing ospf area add name=backbone area-id=0.0.0.0\n/routing ospf interface-template \\\n  add networks=192.168.0.0/24 area=backbone`,
    description:
      'Membangun rute dinamis antar-router secara otomatis sehingga jaringan tetap terhubung saat topologi berubah.',
  },
];

// ---------- Navigasi slide ----------
// PENTING: urutan di sini harus sama dengan urutan slide di components/Deck.tsx
export const slides = [
  { id: 'hero', label: 'Sampul' },
  { id: 'about', label: 'Tentang' },
  { id: 'skills', label: 'Keahlian' },
  { id: 'experience', label: 'Pengalaman' },
  { id: 'projects', label: 'Proyek' },
  { id: 'certificates', label: 'Sertifikat' },
  { id: 'notes', label: 'Catatan' },
  { id: 'contact', label: 'Kontak' },
];

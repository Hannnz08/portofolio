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
  year: string;
  image: string; // path gambar di /public
  credentialId?: string;
  verifyLink?: string; // tautan verifikasi (opsional)
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
    { label: 'Sertifikasi', value: 'MTCNA' },
  ],
  stats: [
    { value: '2+', label: 'Router Fisik' },
    { value: 'GNS3', label: 'Lab Virtual' },
    { value: 'MTCNA', label: 'Tersertifikasi' },
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
export const certificates: Certificate[] = [
  {
    id: 'mtcna',
    title: 'MTCNA — MikroTik Certified Network Associate',
    issuer: 'MikroTik',
    year: '[tahun]', // [isi tahun]
    image: '/images/certificates/mtcna.svg',
    credentialId: '[ID]', // [isi ID sertifikat]
    verifyLink: '', // [isi tautan verifikasi]
  },
  // Slot sertifikat tambahan — hapus komentar & isi bila ada:
  // {
  //   id: 'sertifikat-2',
  //   title: '[Sertifikat 2]',
  //   issuer: '[penerbit]',
  //   year: '[tahun]',
  //   image: '/images/certificates/placeholder.svg',
  //   credentialId: '[ID]',
  //   verifyLink: '',
  // },
  // {
  //   id: 'sertifikat-3',
  //   title: '[Sertifikat 3]',
  //   issuer: '[penerbit]',
  //   year: '[tahun]',
  //   image: '/images/certificates/placeholder.svg',
  //   credentialId: '[ID]',
  //   verifyLink: '',
  // },
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

// ---------- Navigasi slide ----------
export const slides = [
  { id: 'hero', label: 'Sampul' },
  { id: 'about', label: 'Tentang' },
  { id: 'skills', label: 'Keahlian' },
  { id: 'experience', label: 'Pengalaman' },
  { id: 'projects', label: 'Proyek' },
  { id: 'certificates', label: 'Sertifikat' },
  { id: 'contact', label: 'Kontak' },
];

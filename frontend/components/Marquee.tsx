'use client';

/**
 * Marquee — baris logo/teknologi berjalan (looping mulus).
 * Memakai ikon brand monokrom (currentColor) agar serasi tema hitam-putih.
 * Konten digandakan 2x agar animasi translateX(-50%) terasa tanpa putus.
 * Berhenti saat hover; mati bila pengguna meminta reduced-motion.
 */

import { techMarquee } from '@/data/content';

/**
 * BrandIcon — memetakan nama teknologi ke ikon brand (monokrom).
 * Ditulis ulang sebagai SVG sederhana agar ringan & konsisten warnanya.
 */
function BrandIcon({ name }: { name: string }) {
  const key = name.toLowerCase().trim();
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    'aria-hidden': true as const,
  };

  switch (key) {
    // Cisco — deret garis vertikal khas (seperti jembatan/soundbar)
    case 'cisco':
      return (
        <svg {...common} fill="currentColor">
          {[2, 5, 8, 11, 14, 17, 20].map((x, i) => {
            const h = [8, 13, 18, 20, 18, 13, 8][i];
            return <rect key={x} x={x} y={12 - h / 2} width="1.6" height={h} rx="0.8" />;
          })}
        </svg>
      );

    // MikroTik / RouterOS — tumpukan perangkat router
    case 'mikrotik':
    case 'routeros':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <rect x="3" y="6" width="18" height="5" rx="1.5" />
          <rect x="3" y="13" width="18" height="5" rx="1.5" />
          <path d="M6 8.5h.01M6 15.5h.01" />
          <path d="M16 3v3M19 3.5l-2 2.5" />
        </svg>
      );

    // GNS3 — node jaringan saling terhubung
    case 'gns3':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="5" cy="6" r="2.2" />
          <circle cx="19" cy="7" r="2.2" />
          <circle cx="12" cy="18" r="2.2" />
          <path d="M6.6 7.6 10.6 16M17.5 8.8 13.4 16M6.8 6.4h10.4" />
        </svg>
      );

    // VMware — tiga ubin vertikal
    case 'vmware':
      return (
        <svg {...common} fill="currentColor">
          <rect x="3" y="8" width="4" height="8" rx="1" />
          <rect x="10" y="8" width="4" height="8" rx="1" />
          <rect x="17" y="8" width="4" height="8" rx="1" />
        </svg>
      );

    // VirtualBox — kubus 3D
    case 'virtualbox':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
          <path d="M12 3 20 7v10l-8 4-8-4V7z" />
          <path d="M12 3v8M12 11l8-4M12 11l-8-4M12 11v10" />
        </svg>
      );

    // Cisco Packet Tracer — paket/amplop data
    case 'packet tracer':
    case 'cisco packet tracer':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );

    // Winbox — jendela aplikasi
    case 'winbox':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 8h18" />
          <path d="M6 6h.01M8.5 6h.01" />
        </svg>
      );

    // ESP32 — chip mikrokontroler
    case 'esp32':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <rect x="7" y="7" width="10" height="10" rx="1.5" />
          <path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3" />
        </svg>
      );

    // Arduino — simbol tak hingga dengan + dan -
    case 'arduino':
    case 'arduino uno':
    case 'arduino ide':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M7 12c0-1.8 1.4-3 2.6-3 1.8 0 2.4 1.8 2.4 3s.6 3 2.4 3c1.2 0 2.6-1.2 2.6-3s-1.4-3-2.6-3c-1.8 0-2.4 1.8-2.4 3" />
          <path d="M6 12h2M16 12h2M17 11v2" />
        </svg>
      );

    // OSPF — topologi routing
    case 'ospf':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="5" r="2" />
          <circle cx="5" cy="18" r="2" />
          <circle cx="19" cy="18" r="2" />
          <path d="M11 6.6 6 16.2M13 6.6 18 16.2M7 18h10" />
        </svg>
      );

    // Hotspot — gelombang wifi
    case 'hotspot':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M5 9a10 10 0 0 1 14 0" />
          <path d="M8 12a6 6 0 0 1 8 0" />
          <circle cx="12" cy="16" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      );

    // Fallback — penanda jaringan generik
    default:
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <rect x="3" y="8" width="18" height="8" rx="2" />
          <path d="M7 12h.01M11 12h.01M15 12h.01" />
        </svg>
      );
  }
}

export default function Marquee() {
  // Gandakan daftar agar loop mulus
  const items = [...techMarquee, ...techMarquee];

  return (
    <div
      className="group relative w-full overflow-hidden border-y border-line py-5"
      aria-hidden="true"
    >
      {/* Gradasi tepi kiri/kanan agar logo memudar di ujung */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-bg to-transparent" />

      <div className="flex w-max animate-marquee items-center gap-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {items.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="flex flex-shrink-0 items-center gap-2.5 text-muted transition-colors hover:text-fg"
          >
            <BrandIcon name={label} />
            <span className="text-sm font-medium tracking-wide">{label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

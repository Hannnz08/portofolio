'use client';

/**
 * Marquee — baris logo/teknologi berjalan (looping mulus).
 * Konten digandakan 2x agar animasi translateX(-50%) terasa tanpa putus.
 * Berhenti saat hover; mati bila pengguna meminta reduced-motion.
 */

import { techMarquee } from '@/data/content';

// Ikon kecil sederhana (monokrom) sebagai penanda tiap logo
function Mark() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-70"
    >
      <rect x="3" y="8" width="18" height="8" rx="2" />
      <path d="M7 12h.01M11 12h.01M15 12h.01" />
    </svg>
  );
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

      <div className="flex w-max animate-marquee items-center gap-10 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {items.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="flex flex-shrink-0 items-center gap-2 font-mono text-sm tracking-wide text-muted transition-colors hover:text-fg"
          >
            <Mark />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

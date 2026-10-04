'use client';

/**
 * CertificateFlip — tampilan gambar sertifikat dengan efek balik halaman.
 * - 1 gambar  → tampil biasa (klik memanggil onOpen bila ada).
 * - 2 gambar  → flip 3D sumbu-Y 180° (~0,7 dtk). Pemicu: klik/ketuk,
 *   tombol "Balik halaman", tombol F, atau geser horizontal (HP).
 * - Rasio bingkai tetap (A4 landscape 1521×1075) agar ukuran tidak berubah.
 * - prefers-reduced-motion → crossfade (tanpa 3D).
 * - Aksesibel: indikator halaman via aria-live, tombol berlabel jelas.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import type { Certificate } from '@/data/content';

export const A4_LANDSCAPE = 1521 / 1075;
export const A4_PORTRAIT = 1075 / 1521;

const FLIP_EASE = [0.4, 0, 0.2, 1] as const;

type Props = {
  cert: Certificate;
  /** Rasio bingkai. Default: A4 landscape. */
  ratio?: number;
  sizes?: string;
  /** Dipanggil saat sertifikat 1 halaman diklik (mis. buka lightbox). */
  onOpen?: () => void;
  /** Dengarkan tombol F di seluruh halaman (dipakai di lightbox). */
  globalHotkey?: boolean;
  /** Tampilkan tombol "Balik halaman" di bawah gambar. */
  showButton?: boolean;
  /** Variasi warna tombol untuk latar gelap lightbox. */
  onDark?: boolean;
  className?: string;
  priority?: boolean;
  /** Style tambahan untuk bingkai gambar (mis. membatasi lebar di lightbox). */
  frameStyle?: React.CSSProperties;
};

export default function CertificateFlip({
  cert,
  ratio = A4_LANDSCAPE,
  sizes = '(max-width: 640px) 100vw, 400px',
  onOpen,
  globalHotkey = false,
  showButton = true,
  onDark = false,
  className = '',
  priority = false,
  frameStyle,
}: Props) {
  const reduce = useReducedMotion();
  const pages = cert.images;
  const canFlip = pages.length > 1;
  const [page, setPage] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const swipe = useRef<{ x: number; y: number; t: number } | null>(null);
  const suppressClick = useRef(false);

  const flip = useCallback(() => {
    if (!canFlip) return;
    setPage((p) => (p === 0 ? 1 : 0));
    setHintUsed(true);
  }, [canFlip]);

  // Hotkey F (global — hanya di lightbox)
  useEffect(() => {
    if (!globalHotkey || !canFlip) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        flip();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [globalHotkey, canFlip, flip]);

  // Geser horizontal → balik (HP)
  const onPointerDown = (e: React.PointerEvent) => {
    swipe.current = { x: e.clientX, y: e.clientY, t: performance.now() };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s || !canFlip) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      suppressClick.current = true;
      flip();
    }
  };
  const onClick = () => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    if (canFlip) flip();
    else onOpen?.();
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'f' || e.key === 'F') && canFlip) {
      e.preventDefault();
      flip();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  const nextPage = page === 0 ? 2 : 1;
  const btnBase = onDark
    ? 'border-white/20 bg-black/40 text-white hover:bg-white hover:text-black'
    : 'border-line bg-card text-fg hover:bg-fg hover:text-bg';

  const faceCommon =
    'absolute inset-0 overflow-hidden rounded-xl [backface-visibility:hidden] [-webkit-backface-visibility:hidden]';

  return (
    <div className={className}>
      <div
        role="button"
        tabIndex={0}
        aria-label={
          canFlip
            ? `Sertifikat ${cert.title}, halaman ${page + 1} dari 2. Tekan Enter atau F untuk membalik.`
            : `Sertifikat ${cert.title}${onOpen ? '. Tekan Enter untuk memperbesar.' : ''}`
        }
        data-testid={`cert-flip-${cert.id}`}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        className="group relative w-full cursor-pointer select-none outline-none [perspective:1600px] focus-visible:[&>div]:ring-2 focus-visible:[&>div]:ring-fg"
        style={{ aspectRatio: String(ratio), touchAction: 'pan-y', ...frameStyle }}
      >
        <motion.div
          className="relative h-full w-full rounded-xl"
          style={{ transformStyle: reduce ? undefined : 'preserve-3d' }}
          animate={reduce ? undefined : { rotateY: page === 0 ? 0 : 180 }}
          transition={{ duration: 0.7, ease: FLIP_EASE }}
        >
          {/* Halaman 1 */}
          <motion.div
            className={`${faceCommon} bg-neutral-100 dark:bg-neutral-900`}
            animate={reduce ? { opacity: page === 0 ? 1 : 0 } : undefined}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={pages[0]}
              alt={`${cert.title} — halaman 1`}
              fill
              priority={priority}
              sizes={sizes}
              className="object-contain"
            />
          </motion.div>

          {/* Halaman 2 (dipreload karena ikut dirender) */}
          {canFlip && (
            <motion.div
              className={`${faceCommon} bg-neutral-100 dark:bg-neutral-900`}
              style={reduce ? undefined : { transform: 'rotateY(180deg)' }}
              animate={reduce ? { opacity: page === 1 ? 1 : 0 } : undefined}
              transition={{ duration: 0.4 }}
              aria-hidden={page !== 1}
            >
              <Image
                src={pages[1]}
                alt={`${cert.title} — halaman 2`}
                fill
                sizes={sizes}
                className="object-contain"
              />
            </motion.div>
          )}
        </motion.div>

        {/* Indikator halaman */}
        {canFlip && (
          <span
            data-testid={`cert-page-indicator-${cert.id}`}
            className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur"
          >
            {page + 1}/2
          </span>
        )}

        {/* Petunjuk kecil, hilang setelah dipakai */}
        {canFlip && !hintUsed && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] text-white backdrop-blur"
          >
            Ketuk untuk balik
          </motion.span>
        )}

        {/* Ikon perbesar untuk 1 halaman (hover) */}
        {!canFlip && onOpen && (
          <span className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </span>
        )}
      </div>

      {/* Pengumuman halaman aktif untuk pembaca layar */}
      {canFlip && (
        <span className="sr-only" aria-live="polite">
          Halaman {page + 1} dari 2
        </span>
      )}

      {canFlip && showButton && (
        <button
          type="button"
          onClick={flip}
          aria-label={`Balik ke halaman ${nextPage}`}
          data-testid={`cert-flip-button-${cert.id}`}
          className={`mt-3 inline-flex h-9 items-center gap-2 rounded-full border px-4 text-xs font-medium transition-colors duration-200 ${btnBase}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 0 1-15.5 6.2M3 12a9 9 0 0 1 15.5-6.2" />
            <path d="M3 4v5h5M21 20v-5h-5" />
          </svg>
          Balik halaman
          <kbd className="ml-1 rounded border border-current/30 px-1 font-mono text-[10px] opacity-70">F</kbd>
        </button>
      )}
    </div>
  );
}

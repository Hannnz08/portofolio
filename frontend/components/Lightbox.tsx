'use client';

/**
 * Lightbox — tampilan besar sertifikat.
 * Fitur: transisi layoutId, tombol prev/next, Esc untuk tutup,
 * focus trap, aria-modal, dan navigasi panah kiri/kanan.
 */

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import type { Certificate } from '@/data/content';
import { EASE } from './motion';

export default function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: Certificate[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  // Keyboard: Esc tutup, panah untuk navigasi, Tab di-trap
  useEffect(() => {
    prevFocus.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'Tab') {
        // Focus trap sederhana
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prevFocus.current?.focus();
    };
  }, [onClose, onPrev, onNext]);

  const multiple = items.length > 1;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label={`Sertifikat: ${item.title}`}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

        <div
          ref={dialogRef}
          className="relative z-10 flex w-full max-w-4xl flex-col items-center"
        >
          {/* Tombol tutup */}
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Tutup"
            className="absolute -top-2 right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white md:-right-2 md:-top-4"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <motion.div
            layoutId={`cert-${item.id}`}
            transition={{ duration: 0.5, ease: EASE }}
            className="w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900"
          >
            <div className="relative aspect-[4/3] w-full bg-neutral-800">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-3 p-5 text-white md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-white/60">
                  {item.issuer} · {item.year}
                  {item.credentialId ? ` · ID: ${item.credentialId}` : ''}
                </p>
              </div>
              {item.verifyLink ? (
                <a
                  href={item.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
                >
                  Verifikasi
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </a>
              ) : (
                <span className="self-start font-mono text-xs text-white/40">[tautan verifikasi belum tersedia]</span>
              )}
            </div>
          </motion.div>

          {/* Navigasi prev/next */}
          {multiple && (
            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={onPrev}
                aria-label="Sertifikat sebelumnya"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-white hover:text-black"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18 9 12l6-6" />
                </svg>
              </button>
              <span className="font-mono text-xs text-white/60">
                {index + 1} / {items.length}
              </span>
              <button
                onClick={onNext}
                aria-label="Sertifikat berikutnya"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-white hover:text-black"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

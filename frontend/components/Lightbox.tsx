'use client';

/**
 * Lightbox — tampilan besar sertifikat.
 * Fitur: prev/next, Esc untuk tutup, focus trap, aria-modal,
 * panah kiri/kanan, tombol F untuk balik halaman (sertifikat 2 halaman),
 * detail program & ringkasan materi.
 */

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Certificate } from '@/data/content';
import { EASE } from './motion';
import CertificateFlip, { A4_LANDSCAPE, A4_PORTRAIT } from './CertificateFlip';

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

  useEffect(() => {
    prevFocus.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'Tab') {
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
  const portrait = item.orientation === 'portrait';
  const ratio = portrait ? A4_PORTRAIT : A4_LANDSCAPE;
  // Lebar dibatasi agar tinggi gambar ≤ 58dvh sekaligus ≤ lebar kontainer
  const widthStyle = `min(100%, calc(58dvh * ${ratio}))`;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] flex items-center justify-center p-3 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label={`Sertifikat: ${item.title}`}
        data-testid="cert-lightbox"
      >
        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

        <div ref={dialogRef} className="relative z-10 flex w-full max-w-5xl flex-col items-center">
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Tutup"
            data-testid="cert-lightbox-close"
            className="absolute -top-1 right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white md:-right-2 md:-top-4"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="max-h-[88dvh] w-full overflow-y-auto rounded-2xl border border-white/10 bg-neutral-900 p-4 md:p-6"
          >
            <div className="flex flex-col items-center">
              <CertificateFlip
                cert={item}
                ratio={ratio}
                globalHotkey
                onDark
                priority
                sizes="(max-width: 768px) 100vw, 1000px"
                className="flex w-full flex-col items-center"
                frameStyle={{ width: widthStyle }}
              />
            </div>

            <div className="mt-5 grid gap-5 text-white md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
                <p className="mt-1 text-sm text-white/60">
                  {item.issuer} · {item.date}
                </p>
                {item.credentialId && (
                  <p className="mt-2 font-mono text-xs text-white/50">No. {item.credentialId}</p>
                )}

                {item.details && (
                  <dl className="mt-4 grid gap-2 sm:grid-cols-2">
                    {item.details.map((d) => (
                      <div key={d.label} className="rounded-xl border border-white/10 p-3">
                        <dt className="font-mono text-[10px] uppercase tracking-widest text-white/40">{d.label}</dt>
                        <dd className="mt-1 text-sm text-white/85">{d.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                <div className="mt-4">
                  {item.verifyLink ? (
                    <a
                      href={item.verifyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="cert-verify-link"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-opacity duration-200 hover:opacity-85"
                    >
                      Verifikasi
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17 17 7M7 7h10v10" />
                      </svg>
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-white/40">[tautan verifikasi belum tersedia]</span>
                  )}
                </div>
              </div>

              {item.topics && (
                <div className="rounded-xl border border-white/10 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Ringkasan materi</p>
                  <ul className="mt-3 space-y-2">
                    {item.topics.map((t) => (
                      <li key={t} className="flex gap-2 text-sm text-white/85">
                        <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-white" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>

          {multiple && (
            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={onPrev}
                aria-label="Sertifikat sebelumnya"
                data-testid="cert-lightbox-prev"
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
                data-testid="cert-lightbox-next"
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

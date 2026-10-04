'use client';

/**
 * Slide 6 — Sertifikat (galeri).
 * - Sertifikat 2 halaman: klik gambar membalik halaman (CertificateFlip).
 * - Sertifikat 1 halaman: klik gambar membuka Lightbox.
 * - Tombol "Perbesar" selalu tersedia untuk membuka Lightbox.
 */

import { useState } from 'react';
import { certificates } from '@/data/content';
import { Reveal } from '../motion';
import Lightbox from '../Lightbox';
import CertificateFlip from '../CertificateFlip';

export default function Certificates() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  return (
    <div className="mx-auto w-full max-w-shell px-6 pt-24 pb-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <p className="font-mono text-xs tracking-[0.3em] text-muted">SERTIFIKAT</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-xl mt-4 text-[clamp(1.9rem,5vw,3.6rem)]">Bukti kompetensi.</h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-xs text-sm text-muted md:text-right">
            {certificates.length} sertifikat. Sertifikat dua halaman dapat dibalik — ketuk gambar,
            tekan <kbd className="rounded border border-line px-1 font-mono text-[11px]">F</kbd>, atau geser.
          </p>
        </Reveal>
      </div>

      {certificates.length === 0 ? (
        <Reveal delay={0.1}>
          <p className="mt-8 text-muted">[Belum ada sertifikat]</p>
        </Reveal>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((c, i) => (
            <Reveal key={c.id} delay={0.1 + i * 0.08}>
              <article
                data-testid={`cert-card-${c.id}`}
                className="flex h-full flex-col rounded-2xl border border-line bg-card p-3 transition-transform duration-300 hover:-translate-y-1"
              >
                <CertificateFlip
                  cert={c}
                  onOpen={() => setIndex(i)}
                  showButton={false}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                />

                <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
                  <h3 className="font-semibold leading-snug text-fg">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {c.issuer} · {c.date}
                  </p>

                  {c.topics && (
                    <ul className="mt-3 space-y-1">
                      {c.topics.slice(0, 4).map((t) => (
                        <li key={t} className="flex gap-2 text-xs text-muted">
                          <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-fg" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                    {c.images.length > 1 && (
                      <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                        2 halaman
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setIndex(i)}
                      data-testid={`cert-open-${c.id}`}
                      className="ml-auto inline-flex h-9 items-center gap-2 rounded-full bg-fg px-4 text-xs font-medium text-bg transition-opacity duration-200 hover:opacity-85"
                      aria-label={`Perbesar sertifikat ${c.title}`}
                    >
                      Perbesar
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}

      {open && (
        <Lightbox
          items={certificates}
          index={index!}
          onClose={() => setIndex(null)}
          onPrev={() => setIndex((p) => (p! - 1 + certificates.length) % certificates.length)}
          onNext={() => setIndex((p) => (p! + 1) % certificates.length)}
        />
      )}
    </div>
  );
}

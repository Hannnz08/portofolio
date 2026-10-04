'use client';

/**
 * Slide 6 — Sertifikat (galeri).
 * Klik kartu membuka Lightbox besar dengan transisi layoutId.
 */

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { certificates } from '@/data/content';
import { Reveal } from '../motion';
import Lightbox from '../Lightbox';

export default function Certificates() {
  const [index, setIndex] = useState<number | null>(null);

  const open = index !== null;

  return (
    <div className="mx-auto w-full max-w-shell px-6 pt-24 pb-16">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.3em] text-muted">SERTIFIKAT</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="display-xl mt-4 text-[clamp(1.9rem,5vw,3.6rem)]">
          Bukti kompetensi.
        </h2>
      </Reveal>

      {certificates.length === 0 ? (
        <Reveal delay={0.1}>
          <p className="mt-8 text-muted">[Belum ada sertifikat]</p>
        </Reveal>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((c, i) => (
            <Reveal key={c.id} delay={0.1 + i * 0.08}>
              <motion.button
                layoutId={`cert-${c.id}`}
                onClick={() => setIndex(i)}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="group block w-full overflow-hidden rounded-2xl border border-line bg-card text-left"
                aria-label={`Lihat sertifikat ${c.title}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, 380px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-bg/80 text-fg opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold leading-snug text-fg">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {c.issuer} · {c.year}
                  </p>
                </div>
              </motion.button>
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

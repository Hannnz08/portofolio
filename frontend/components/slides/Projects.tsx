'use client';

/**
 * Slide 5 — Proyek.
 * Kartu proyek yang bisa dibuka (layout animation + AnimatePresence).
 */

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { projects, type Project } from '@/data/content';
import { Reveal, EASE } from '../motion';
import ProjectCard from '../ProjectCard';

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  // Kunci scroll body & tutup dengan Esc saat kartu terbuka
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <div className="mx-auto w-full max-w-shell px-6 pt-24 pb-16">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.3em] text-muted">PROYEK</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="display-xl mt-4 text-[clamp(1.9rem,5vw,3.6rem)]">
          Yang pernah saya bangun.
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={0.1 + i * 0.08}>
            <ProjectCard project={p} onOpen={() => setActive(p)} />
          </Reveal>
        ))}
      </div>

      {/* Overlay kartu terbuka */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            {/* Latar gelap */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setActive(null)}
            />

            <motion.div
              layoutId={`project-${active.id}`}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-line bg-card"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-fg">{active.title}</h3>
                  <button
                    onClick={() => setActive(null)}
                    aria-label="Tutup"
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-line text-fg hover:bg-fg hover:text-bg"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="mt-4 leading-relaxed text-muted">{active.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {active.tags.map((t) => (
                    <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                      {t}
                    </span>
                  ))}
                </div>
                {active.link ? (
                  <a
                    href={active.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg"
                  >
                    Lihat Proyek
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </a>
                ) : (
                  <p className="mt-6 font-mono text-xs text-muted">[tautan belum tersedia]</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

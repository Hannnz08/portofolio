'use client';

/**
 * Slide 1 \u2014 Sampul (Hero).
 * Momen animasi utama: judul nama muncul per kata (stagger + mask).
 * Kartu ID menggantung dengan ayunan halus (hormati reduced-motion).
 */

import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { hero } from '@/data/content';
import { useScrollCtx, EASE } from '../motion';

// Variants untuk judul per kata
const parent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const word: Variants = {
  hidden: { y: '115%' },
  show: { y: 0, transition: { duration: 0.8, ease: EASE } },
};
const fade: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: d, ease: EASE },
  }),
};

export default function Hero() {
  const { goTo } = useScrollCtx();
  const reduce = useReducedMotion();
  const lines = hero.name.split('\n');

  return (
    <div className="relative h-full w-full bg-grid bg-noise">
      <div className="mx-auto grid h-full max-w-shell grid-cols-1 items-center gap-8 px-6 pt-24 pb-16 md:grid-cols-[1.25fr_0.75fr] md:pt-0">
        {/* Kiri: teks */}
        <div>
          {/* Label ketersediaan */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] tracking-widest text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fg opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-fg" />
            </span>
            {hero.availability}
          </motion.div>

          {/* Nama \u2014 animasi per kata */}
          <h1 className="display-xl text-[clamp(2.75rem,9vw,6.5rem)]">
            {lines.map((line, li) => (
              <span key={li} className="block overflow-hidden pb-[0.06em]">
                {reduce ? (
                  <span className="inline-block">{line}</span>
                ) : (
                  <motion.span
                    variants={parent}
                    initial="hidden"
                    animate="show"
                    className="inline-block"
                  >
                    {line.split(' ').map((w, wi) => (
                      <span key={wi} className="inline-block overflow-hidden align-top">
                        <motion.span variants={word} className="mr-[0.22em] inline-block">
                          {w}
                        </motion.span>
                      </span>
                    ))}
                  </motion.span>
                )}
              </span>
            ))}
          </h1>

          {/* Peran */}
          <motion.p
            custom={0.5}
            variants={fade}
            initial={reduce ? false : 'hidden'}
            animate="show"
            className="mt-5 font-mono text-sm tracking-widest text-muted md:text-base"
          >
            {hero.role}
          </motion.p>

          {/* Tagline */}
          <motion.p
            custom={0.62}
            variants={fade}
            initial={reduce ? false : 'hidden'}
            animate="show"
            className="mt-3 max-w-md text-base leading-relaxed text-muted md:text-lg"
          >
            {hero.tagline}
          </motion.p>

          {/* Lokasi + chip */}
          <motion.div
            custom={0.74}
            variants={fade}
            initial={reduce ? false : 'hidden'}
            animate="show"
            className="mt-7 flex flex-wrap items-center gap-2"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-muted">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              {hero.location}
            </span>
            {hero.chips.map((c) => (
              <span
                key={c}
                className="rounded-full bg-fg px-3 py-1.5 text-xs font-medium text-bg"
              >
                {c}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Kanan: kartu ID menggantung */}
        <HangingCard reduce={!!reduce} />
      </div>

      {/* Petunjuk scroll */}
      <motion.button
        onClick={() => goTo(1)}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] tracking-widest text-muted"
        aria-label="Gulir ke bawah"
      >
        {hero.scrollHint}
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.span>
      </motion.button>
    </div>
  );
}

// Kartu ID menggantung dengan ayunan halus
function HangingCard({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative hidden h-full items-start justify-center pt-10 md:flex">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
        className="relative flex flex-col items-center"
        style={{ transformOrigin: 'top center' }}
      >
        {/* Tali lanyard */}
        <div className="h-16 w-[3px] bg-fg/70" />
        <div className="relative -mt-1 h-4 w-8 rounded-sm border-2 border-fg/70" />

        {/* Kartu */}
        <motion.div
          animate={reduce ? undefined : { rotate: [-2.5, 2.5, -2.5] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top center' }}
          className="mt-2 w-60 rounded-2xl border border-line bg-card p-3 shadow-xl"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-bg">
            <Image
              src={hero.photo}
              alt={`Foto ${hero.role}`}
              fill
              priority
              sizes="240px"
              className="object-cover grayscale"
            />
          </div>
          <div className="mt-3 flex items-center justify-between px-1">
            <span className="font-mono text-[10px] tracking-widest text-muted">ID CARD</span>
            <span className="font-mono text-[10px] tracking-widest text-muted">MTCNA</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

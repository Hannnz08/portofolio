'use client';

/**
 * Slide 2 — Tentang.
 * Kiri: judul, paragraf, kutipan, statistik, fakta.
 * Kanan: kartu tanda pengenal bergaya lanyard (IdCard) yang menggantung
 *        dari tepi atas slide dan bisa diayun/diseret/dibalik.
 */

import { about } from '@/data/content';
import { Reveal } from '../motion';
import IdCard from '../IdCard';

export default function About() {
  return (
    <div className="mx-auto w-full max-w-shell px-6 pt-24 pb-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_minmax(280px,360px)] md:gap-14">
        {/* Kiri: narasi */}
        <div>
          <Reveal>
            <p className="font-mono text-xs tracking-[0.3em] text-muted">{about.kicker}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="display-xl mt-4 whitespace-pre-line text-[clamp(1.9rem,5vw,3.6rem)]">
              {about.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{about.body}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <blockquote className="mt-8 border-l-2 border-fg pl-5 text-lg italic leading-relaxed text-fg">
              “{about.quote}”
            </blockquote>
          </Reveal>

          {/* Statistik */}
          <Reveal delay={0.24}>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {about.stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-line bg-card p-4">
                  <div className="display-xl text-2xl md:text-3xl">{s.value}</div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Fakta */}
          <Reveal delay={0.3}>
            <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {about.facts.map((f) => (
                <div key={f.label} className="flex flex-col gap-0.5 border-t border-line pt-3">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    {f.label}
                  </dt>
                  <dd className="text-sm text-fg">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Kanan: kartu ID lanyard — tali menggantung dari tepi atas slide */}
        <div className="order-first md:order-none md:-mt-24 md:self-start">
          <IdCard />
        </div>
      </div>
    </div>
  );
}

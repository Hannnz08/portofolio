'use client';

/**
 * Slide 2 — Tentang.
 * Judul, paragraf, kutipan, fakta, dan statistik muncul bertahap.
 */

import { about } from '@/data/content';
import { Reveal } from '../motion';

export default function About() {
  return (
    <div className="mx-auto w-full max-w-shell px-6 pt-24 pb-16">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.3em] text-muted">{about.kicker}</p>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="display-xl mt-4 whitespace-pre-line text-[clamp(1.9rem,5vw,3.6rem)]">
          {about.heading}
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_0.8fr]">
        {/* Kiri: narasi + kutipan */}
        <div>
          <Reveal delay={0.1}>
            <p className="max-w-xl text-lg leading-relaxed text-muted">{about.body}</p>
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
        </div>

        {/* Kanan: fakta */}
        <Reveal delay={0.14}>
          <dl className="divide-y divide-line rounded-2xl border border-line bg-card">
            {about.facts.map((f) => (
              <div key={f.label} className="flex flex-col gap-1 px-5 py-4">
                <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">
                  {f.label}
                </dt>
                <dd className="text-sm text-fg">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </div>
  );
}

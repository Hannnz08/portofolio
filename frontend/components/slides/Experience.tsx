'use client';

/**
 * Slide 4 — Pengalaman.
 * Kartu PKL bergaya timeline.
 */

import { experience } from '@/data/content';
import { Reveal } from '../motion';

export default function Experience() {
  return (
    <div className="mx-auto w-full max-w-shell px-6 pt-24 pb-16">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.3em] text-muted">PENGALAMAN</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="display-xl mt-4 text-[clamp(1.9rem,5vw,3.6rem)]">
          Perjalanan saya.
        </h2>
      </Reveal>

      <div className="mt-10 space-y-5">
        {experience.map((exp, i) => (
          <Reveal key={i} delay={0.1 + i * 0.08}>
            <article className="relative rounded-2xl border border-line bg-card p-6 md:p-8">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-fg md:text-2xl">
                    {exp.role}
                  </h3>
                  <p className="mt-1 text-muted">{exp.company}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted">
                    {exp.period}
                  </span>
                  <span className="rounded-full bg-fg px-3 py-1.5 font-mono text-xs text-bg">
                    {exp.duration}
                  </span>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {exp.points.map((p, pi) => (
                  <li key={pi} className="flex gap-3 text-muted">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-fg" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

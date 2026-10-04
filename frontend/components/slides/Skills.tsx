'use client';

/**
 * Slide 3 — Keahlian.
 * Tiga kelompok keahlian (MikroTik, Alat, IoT) dengan chip item.
 */

import { skills } from '@/data/content';
import { Reveal } from '../motion';
import Marquee from '../Marquee';

export default function Skills() {
  return (
    <div className="mx-auto w-full max-w-shell px-6 pt-24 pb-16">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.3em] text-muted">KEAHLIAN</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="display-xl mt-4 text-[clamp(1.9rem,5vw,3.6rem)]">
          Apa yang saya kuasai.
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        {skills.map((group, gi) => (
          <Reveal key={group.label} delay={0.1 + gi * 0.08}>
            <div className="flex h-full flex-col rounded-2xl border border-line bg-card p-6">
              <div className="mb-5 flex items-baseline justify-between">
                <h3 className="text-lg font-semibold text-fg">{group.label}</h3>
                <span className="font-mono text-xs text-muted">
                  {String(gi + 1).padStart(2, '0')}
                </span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-fg hover:text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Marquee logo teknologi berjalan */}
      <Reveal delay={0.3}>
        <div className="mt-12">
          <Marquee />
        </div>
      </Reveal>
    </div>
  );
}

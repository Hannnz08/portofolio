'use client';

/**
 * SlideNav — indikator titik slide di tepi kanan layar.
 * Titik aktif membesar; hover memunculkan label slide.
 */

import { useScrollCtx } from './motion';
import { slides } from '@/data/content';

export default function SlideNav() {
  const { activeIndex, goTo } = useScrollCtx();

  return (
    <nav
      aria-label="Indikator slide"
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
    >
      {slides.map((s, i) => {
        const active = i === activeIndex;
        return (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            aria-label={`Ke slide ${s.label}`}
            aria-current={active ? 'true' : undefined}
            className="group relative flex items-center"
          >
            {/* Label muncul saat hover */}
            <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-md border border-line bg-card px-2 py-1 font-mono text-[11px] text-fg opacity-0 transition-opacity group-hover:opacity-100">
              {s.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                active
                  ? 'h-5 w-[6px] bg-fg'
                  : 'h-[6px] w-[6px] bg-muted/50 group-hover:bg-fg'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}

'use client';

/**
 * Slide — Catatan (Blog).
 * Menampilkan catatan konfigurasi jaringan singkat dengan cuplikan kode,
 * untuk memperlihatkan proses belajar. Edit di data/content.ts → notes.
 */

import { notes } from '@/data/content';
import { Reveal } from '../motion';

export default function Notes() {
  return (
    <div className="mx-auto w-full max-w-shell px-6 pt-24 pb-16">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.3em] text-muted">CATATAN</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="display-xl mt-4 text-[clamp(1.9rem,5vw,3.6rem)]">
          Catatan konfigurasi.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-3 max-w-xl text-muted">
          Ringkasan praktik yang saya pelajari — dari DHCP hingga routing OSPF.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        {notes.map((n, i) => (
          <Reveal key={n.id} delay={0.12 + i * 0.07}>
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-colors hover:border-fg/40">
              <div className="flex items-center justify-between px-5 pt-5">
                <h3 className="text-lg font-semibold text-fg">{n.title}</h3>
                <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                  {n.tag}
                </span>
              </div>

              {/* Cuplikan kode */}
              <pre className="mx-5 mt-4 overflow-x-auto rounded-xl bg-fg/[0.04] p-4 font-mono text-[12px] leading-relaxed text-fg/90 ring-1 ring-line">
                <code>{n.code}</code>
              </pre>

              <p className="px-5 pb-5 pt-4 text-sm leading-relaxed text-muted">
                {n.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

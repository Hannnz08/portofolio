'use client';

/**
 * Navbar mengambang (gaya pill), highlight slide aktif,
 * tombol ganti tema (dark/light), dan responsif untuk HP.
 */

import { useState } from 'react';
import { useScrollCtx } from './motion';
import { slides, site } from '@/data/content';

// Tautan utama yang ditampilkan (indeks mengacu ke array slides)
const NAV = [
  { i: 0, label: 'Beranda' },
  { i: 1, label: 'Tentang' },
  { i: 2, label: 'Keahlian' },
  { i: 4, label: 'Proyek' },
  { i: 5, label: 'Sertifikat' },
  { i: 6, label: 'Catatan' },
  { i: 7, label: 'Kontak' },
];

export default function Navbar({
  theme,
  toggleTheme,
}: {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}) {
  const { activeIndex, goTo } = useScrollCtx();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Navigasi utama"
        className="flex w-full max-w-shell items-center justify-between gap-3 rounded-full border border-line bg-card/80 px-4 py-2.5 backdrop-blur-md shadow-sm"
      >
        {/* Logo / nama */}
        <button
          onClick={() => goTo(0)}
          className="font-mono text-sm tracking-widest text-fg"
          aria-label="Ke awal"
        >
          {site.shortName}
        </button>

        {/* Tautan desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <li key={item.i}>
              <button
                onClick={() => goTo(item.i)}
                aria-current={activeIndex === item.i ? 'page' : undefined}
                className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  activeIndex === item.i
                    ? 'bg-fg text-bg'
                    : 'text-muted hover:text-fg'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeButton theme={theme} toggleTheme={toggleTheme} />
          {/* Tombol menu untuk HP */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg md:hidden"
            aria-label="Buka menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative flex h-3 w-4 flex-col justify-between">
              <span
                className={`h-0.5 w-full bg-fg transition-transform ${open ? 'translate-y-[5px] rotate-45' : ''}`}
              />
              <span className={`h-0.5 w-full bg-fg transition-opacity ${open ? 'opacity-0' : ''}`} />
              <span
                className={`h-0.5 w-full bg-fg transition-transform ${open ? '-translate-y-[5px] -rotate-45' : ''}`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div className="absolute left-4 right-4 top-[72px] rounded-2xl border border-line bg-card p-2 shadow-lg md:hidden">
          <ul className="grid grid-cols-2 gap-1">
            {NAV.map((item) => (
              <li key={item.i}>
                <button
                  onClick={() => {
                    goTo(item.i);
                    setOpen(false);
                  }}
                  className={`w-full rounded-xl px-4 py-3 text-left text-sm ${
                    activeIndex === item.i ? 'bg-fg text-bg' : 'text-muted'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function ThemeButton({
  theme,
  toggleTheme,
}: {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}) {
  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg transition-colors hover:bg-fg hover:text-bg"
    >
      {theme === 'dark' ? (
        // ikon matahari
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        // ikon bulan
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}

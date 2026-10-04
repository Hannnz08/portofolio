'use client';

/**
 * Slide 7 — Kontak.
 * Daftar tautan kontak + (opsional) form Formspree bila endpoint diisi.
 */

import { useState } from 'react';
import { contact } from '@/data/content';
import { Reveal } from '../motion';

export default function Contact() {
  return (
    <div className="mx-auto w-full max-w-shell px-6 pt-24 pb-16">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* Kiri: ajakan */}
        <div>
          <Reveal>
            <p className="font-mono text-xs tracking-[0.3em] text-muted">KONTAK</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-xl mt-4 text-[clamp(2.2rem,6vw,4.5rem)]">
              {contact.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              {contact.body}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-muted">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              {contact.location}
            </p>
          </Reveal>
        </div>

        {/* Kanan: tautan / form */}
        <div>
          {contact.formspreeEndpoint ? (
            <ContactForm endpoint={contact.formspreeEndpoint} />
          ) : (
            <Reveal delay={0.1}>
              <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
                {contact.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between px-6 py-5 transition-colors hover:bg-fg hover:text-bg"
                    >
                      <span className="flex flex-col">
                        <span className="font-mono text-[11px] uppercase tracking-widest text-muted group-hover:text-bg/70">
                          {l.label}
                        </span>
                        <span className="mt-0.5 text-sm">{l.value}</span>
                      </span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                        <path d="M7 17 17 7M7 7h10v10" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </div>

      {/* Footer */}
      <Reveal delay={0.2}>
        <footer className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted md:flex-row">
          <span>© {new Date().getFullYear()} Farhan Rifqi Ramadhani</span>
          <span className="font-mono">Dibuat dengan Next.js · Framer Motion</span>
        </footer>
      </Reveal>
    </div>
  );
}

// Form kontak opsional (Formspree)
function ContactForm({ endpoint }: { endpoint: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('ok');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-line bg-card p-6">
      <div>
        <label htmlFor="name" className="mb-1 block font-mono text-[11px] uppercase tracking-widest text-muted">Nama</label>
        <input id="name" name="name" required className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg outline-none focus:border-fg" />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block font-mono text-[11px] uppercase tracking-widest text-muted">Email</label>
        <input id="email" name="email" type="email" required className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg outline-none focus:border-fg" />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block font-mono text-[11px] uppercase tracking-widest text-muted">Pesan</label>
        <textarea id="message" name="message" rows={4} required className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg outline-none focus:border-fg" />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-xl bg-fg py-3 text-sm font-medium text-bg disabled:opacity-60"
      >
        {status === 'sending' ? 'Mengirim…' : 'Kirim Pesan'}
      </button>
      {status === 'ok' && <p className="text-sm text-green-500">Pesan terkirim. Terima kasih!</p>}
      {status === 'error' && <p className="text-sm text-red-500">Gagal mengirim. Coba lagi nanti.</p>}
    </form>
  );
}

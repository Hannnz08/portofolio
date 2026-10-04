'use client';

/**
 * Deck — kerangka utama portofolio.
 * - Container: h-dvh overflow-y-scroll snap-y snap-mandatory (scroll per slide).
 * - Melacak slide aktif dengan IntersectionObserver (root = container).
 * - Menyediakan konteks (ref container + navigasi) ke semua slide.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollCtx } from './motion';
import { slides } from '@/data/content';
import Navbar from './Navbar';
import ScrollProgress from './ScrollProgress';
import SlideNav from './SlideNav';

import Hero from './slides/Hero';
import About from './slides/About';
import Skills from './slides/Skills';
import Experience from './slides/Experience';
import Projects from './slides/Projects';
import Certificates from './slides/Certificates';
import Contact from './slides/Contact';

export default function Deck() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Sinkronkan state tema dengan class pada <html> (diset oleh script di layout)
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      const root = document.documentElement;
      if (next === 'dark') root.classList.add('dark');
      else root.classList.remove('dark');
      try {
        localStorage.setItem('theme', next);
      } catch {}
      return next;
    });
  }, []);

  // Navigasi ke slide tertentu (dipakai Navbar & SlideNav)
  const goTo = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const target = container.querySelector<HTMLElement>(
      `#${slides[index].id}`
    );
    if (target) {
      container.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
    }
  }, []);

  // Lacak slide aktif
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = Array.from(
      container.querySelectorAll<HTMLElement>('[data-slide]')
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(idx);
          }
        });
      },
      { root: container, threshold: 0.55 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Navigasi keyboard (panah atas/bawah, PageUp/Down, Home/End)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        goTo(Math.min(activeIndex + 1, slides.length - 1));
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        goTo(Math.max(activeIndex - 1, 0));
      } else if (e.key === 'Home') {
        e.preventDefault();
        goTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goTo(slides.length - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, goTo]);

  return (
    <ScrollCtx.Provider value={{ containerRef, activeIndex, goTo }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <ScrollProgress />
      <SlideNav />

      <main
        ref={containerRef}
        className="deck-scroll h-dvh overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-bg text-fg"
      >
        <Slide id="hero" index={0}>
          <Hero />
        </Slide>
        <Slide id="about" index={1}>
          <About />
        </Slide>
        <Slide id="skills" index={2}>
          <Skills />
        </Slide>
        <Slide id="experience" index={3}>
          <Experience />
        </Slide>
        <Slide id="projects" index={4}>
          <Projects />
        </Slide>
        <Slide id="certificates" index={5}>
          <Certificates />
        </Slide>
        <Slide id="contact" index={6}>
          <Contact />
        </Slide>
      </main>
    </ScrollCtx.Provider>
  );
}

// Pembungkus satu slide (satu layar penuh dengan snap)
function Slide({
  id,
  index,
  children,
}: {
  id: string;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-slide
      data-index={index}
      className="relative snap-start min-h-dvh w-full flex items-center justify-center overflow-hidden"
    >
      {children}
    </section>
  );
}

'use client';

/**
 * Infrastruktur animasi & konteks scroll.
 * - ScrollCtx membagikan ref container scroll ke semua slide
 *   (dipakai untuk viewport root Framer Motion & navigasi).
 * - Reveal: komponen pembungkus agar elemen muncul bertahap
 *   saat slide masuk layar (IntersectionObserver via whileInView).
 */

import {
  createContext,
  useContext,
  type ReactNode,
  type RefObject,
} from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

type ScrollCtxType = {
  containerRef: RefObject<HTMLDivElement | null>;
  activeIndex: number;
  goTo: (index: number) => void;
};

export const ScrollCtx = createContext<ScrollCtxType | null>(null);

export function useScrollCtx() {
  const ctx = useContext(ScrollCtx);
  if (!ctx) throw new Error('useScrollCtx harus dipakai di dalam ScrollCtx.Provider');
  return ctx;
}

// Easing halus khas transisi slide
export const EASE = [0.22, 1, 0.36, 1] as const;

// Variants untuk kontainer dengan efek stagger pada anak-anaknya
export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/**
 * Reveal — bungkus elemen agar muncul bertahap saat slide aktif.
 * once=false → animasi terulang setiap slide masuk layar,
 * memberi kesan "elemen muncul saat slide masuk".
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  amount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}) {
  const { containerRef } = useScrollCtx();
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ root: containerRef, amount, once: false }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

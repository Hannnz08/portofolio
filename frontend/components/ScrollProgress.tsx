'use client';

/**
 * ScrollProgress — bar progres tipis di atas layar.
 * Memakai useScroll dengan container deck sebagai sumber progres.
 */

import { motion, useScroll, useSpring } from 'framer-motion';
import { useScrollCtx } from './motion';

export default function ScrollProgress() {
  const { containerRef } = useScrollCtx();
  const { scrollYProgress } = useScroll({ container: containerRef });
  // Perhalus pergerakan bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-fg"
    />
  );
}

'use client';

/**
 * ProjectCard — kartu proyek dengan efek hover & layoutId
 * agar transisi membuka kartu terasa mulus.
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Project } from '@/data/content';

export default function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <motion.button
      layoutId={`project-${project.id}`}
      onClick={onOpen}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group block w-full overflow-hidden rounded-3xl border border-line bg-card text-left"
      aria-label={`Buka proyek ${project.title}`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg">
        <Image
          src={project.image}
          alt={project.title}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 560px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold text-fg">{project.title}</h3>
          <span className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors group-hover:bg-fg group-hover:text-bg">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((t) => (
            <span key={t} className="rounded-full border border-line px-2.5 py-1 text-[11px] text-muted">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

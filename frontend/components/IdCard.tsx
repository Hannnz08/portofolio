'use client';

/**
 * IdCard — kartu tanda pengenal bergaya lanyard.
 *
 * Fisika bandul sederhana (tanpa library fisika):
 *   acc = -k·(θ − target) − c·ω   → diintegrasikan tiap frame (useAnimationFrame)
 * - Titik tumpu di ujung tali (transform-origin: top center).
 * - Kursor mendekati/melintas → target sudut mengikuti arah kursor (pegas + redaman).
 * - Drag & lepas → berayun beberapa kali lalu diam (kecepatan lepas dipertahankan).
 * - Tali = SVG path kuadratik yang melengkung mengikuti kartu & kecepatannya.
 * - Tilt 3D halus (rotateX/rotateY) + kilau mengikuti kursor (useSpring/useTransform).
 * - Saat diam, dorongan kecil tiap beberapa detik agar terasa hidup.
 * - HP: seret dengan jari; opsional sensor gerak (DeviceOrientation, minta izin di iOS).
 * - Klik/ketuk/Enter → balik ke sisi belakang (kontak + QR).
 * - prefers-reduced-motion → ayunan otomatis mati, sisakan kemiringan statis.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { idCard } from '@/data/content';

// ---- Parameter fisika (satuan derajat & detik) ----
const STIFFNESS = 42; // kekakuan "gravitasi" bandul (periode ≈ 1 dtk)
const DAMPING = 1.15; // redaman: makin kecil, ayunan makin lama
const MAX_ANGLE = 55; // batas sudut saat diseret
const HOVER_ANGLE = 14; // sudut maksimum saat mengikuti kursor
const IDLE_EVERY_MS = 4500; // jeda dorongan kecil saat diam
const IDLE_KICK = 16; // kecepatan dorongan kecil (deg/s)

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const toDeg = (rad: number) => (rad * 180) / Math.PI;

export default function IdCard({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Ukuran kontainer (untuk SVG tali) & panjang tali responsif
  const [size, setSize] = useState({ w: 320, h: 520 });
  const [rope, setRope] = useState(150);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
      setRope(width < 360 ? 96 : 150);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ---- Keadaan bandul ----
  const angle = useMotionValue(0); // derajat, + ke kanan
  const velRef = useRef(0); // deg/s
  const targetRef = useRef(0); // sudut tujuan (hover/sensor)
  const draggingRef = useRef(false);
  const hoveringRef = useRef(false);
  const lastMotionRef = useRef(0);
  const dragInfo = useRef<{
    offset: number;
    lastAngle: number;
    lastT: number;
    startX: number;
    startY: number;
    startT: number;
  } | null>(null);

  // ---- Flip depan/belakang ----
  const [flipped, setFlipped] = useState(false);
  const flip = useCallback(() => setFlipped((f) => !f), []);

  // ---- Tilt 3D & kilau ----
  const tiltX = useSpring(reduce ? 4 : 0, { stiffness: 180, damping: 18 });
  const tiltY = useSpring(reduce ? -6 : 0, { stiffness: 180, damping: 18 });
  const glareX = useSpring(50, { stiffness: 120, damping: 20 });
  const glareY = useSpring(30, { stiffness: 120, damping: 20 });
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.28), rgba(255,255,255,0.06) 32%, transparent 60%)`;

  // ---- Integrasi fisika per frame ----
  useAnimationFrame((t, delta) => {
    if (reduce || draggingRef.current) return;
    const dt = Math.min(delta, 34) / 1000;
    const a = angle.get();
    const acc = -STIFFNESS * (a - targetRef.current) - DAMPING * velRef.current;
    velRef.current += acc * dt;
    const next = a + velRef.current * dt;
    angle.set(next);

    const moving = Math.abs(velRef.current) > 0.6 || Math.abs(next - targetRef.current) > 0.6;
    if (moving) lastMotionRef.current = t;
    // Dorongan kecil saat sudah diam agar terasa hidup
    else if (!hoveringRef.current && t - lastMotionRef.current > IDLE_EVERY_MS) {
      velRef.current += (Math.random() > 0.5 ? 1 : -1) * IDLE_KICK * (0.6 + Math.random() * 0.6);
      lastMotionRef.current = t;
    }
  });

  // Titik tumpu dalam koordinat viewport
  const pivot = () => {
    const r = containerRef.current!.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top };
  };
  // Sudut dari titik tumpu ke posisi pointer (0 = lurus ke bawah)
  const pointerAngle = (px: number, py: number) => {
    const p = pivot();
    return toDeg(Math.atan2(px - p.x, Math.max(py - p.y, 1)));
  };

  // ---- Hover: kartu miring & berayun mengikuti kursor ----
  const onAreaMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || draggingRef.current) return;
    const card = cardRef.current;
    if (!card) return;
    hoveringRef.current = true;
    const r = card.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const nx = clamp((e.clientX - cx) / (r.width * 0.9), -1, 1); // −1..1
    const ny = clamp((e.clientY - cy) / (r.height * 0.9), -1, 1);
    if (!reduce) targetRef.current = nx * HOVER_ANGLE;

    const inside =
      e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (inside && !reduce) {
      tiltY.set(nx * 10);
      tiltX.set(-ny * 10);
    }
    glareX.set(50 + nx * 45);
    glareY.set(50 + ny * 45);
  };
  const onAreaLeave = () => {
    hoveringRef.current = false;
    if (!reduce) {
      targetRef.current = 0;
      tiltX.set(0);
      tiltY.set(0);
    }
    glareX.set(50);
    glareY.set(30);
  };

  // ---- Drag kartu ----
  const onCardDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const now = performance.now();
    const pa = pointerAngle(e.clientX, e.clientY);
    dragInfo.current = {
      offset: angle.get() - pa,
      lastAngle: angle.get(),
      lastT: now,
      startX: e.clientX,
      startY: e.clientY,
      startT: now,
    };
    draggingRef.current = true;
    velRef.current = 0;
  };
  const onCardMove = (e: React.PointerEvent) => {
    const d = dragInfo.current;
    if (!d || !draggingRef.current) return;
    const now = performance.now();
    const dt = Math.max((now - d.lastT) / 1000, 1 / 120);
    const a = clamp(pointerAngle(e.clientX, e.clientY) + d.offset, -MAX_ANGLE, MAX_ANGLE);
    velRef.current = clamp((a - d.lastAngle) / dt, -420, 420);
    d.lastAngle = a;
    d.lastT = now;
    angle.set(a);
  };
  const onCardUp = (e: React.PointerEvent) => {
    const d = dragInfo.current;
    dragInfo.current = null;
    draggingRef.current = false;
    if (!d) return;
    const moved = Math.hypot(e.clientX - d.startX, e.clientY - d.startY);
    const held = performance.now() - d.startT;
    // Gerakan kecil & singkat = ketukan → balik kartu
    if (moved < 6 && held < 400) {
      flip();
      velRef.current = 0;
    } else if (reduce) {
      angle.set(0);
    } else if (performance.now() - d.lastT > 80) {
      velRef.current = 0; // dilepas dalam keadaan diam → jatuh berayun
    }
    lastMotionRef.current = performance.now();
  };

  // ---- Sensor gerak (opsional, HP) ----
  const [sensor, setSensor] = useState<'hidden' | 'idle' | 'on'>('hidden');
  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (coarse && 'DeviceOrientationEvent' in window) setSensor('idle');
  }, []);
  const enableSensor = async () => {
    type DOE = typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };
    const DOEvent = DeviceOrientationEvent as DOE;
    try {
      if (typeof DOEvent.requestPermission === 'function') {
        const res = await DOEvent.requestPermission();
        if (res !== 'granted') return;
      }
      window.addEventListener('deviceorientation', (ev) => {
        if (ev.gamma == null || draggingRef.current) return;
        targetRef.current = clamp(ev.gamma * 0.45, -24, 24);
      });
      setSensor('on');
    } catch {
      /* izin ditolak */
    }
  };

  // ---- Tali: path SVG kuadratik dari tumpu ke ujung atas kartu ----
  const cx = size.w / 2;
  const ropePath = useTransform(angle, (a) => {
    const rad = (a * Math.PI) / 180;
    const ex = cx + rope * Math.sin(rad);
    const ey = rope * Math.cos(rad);
    // Kontrol melengkung berlawanan arah gerak (kesan tali lentur)
    const lag = clamp(-velRef.current * 0.06, -26, 26);
    const qx = cx + (ex - cx) * 0.5 + lag;
    const qy = ey * 0.55;
    return `M ${cx} 0 Q ${qx} ${qy} ${ex} ${ey}`;
  });
  const shadowY = useTransform(angle, (a) => 18 + Math.abs(a) * 0.3);
  const shadow = useMotionTemplate`0 ${shadowY}px 40px -16px rgba(0,0,0,0.45)`;

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      flip();
    }
  };

  return (
    <div
      ref={containerRef}
      data-testid="id-card-area"
      onPointerMove={onAreaMove}
      onPointerLeave={onAreaLeave}
      className={`relative w-full select-none ${className}`}
      style={{ height: rope + (size.w < 360 ? 380 : 430) }}
    >
      {/* Tali */}
      <svg
        className="pointer-events-none absolute inset-0 overflow-visible"
        width="100%"
        height="100%"
        viewBox={`0 0 ${size.w} ${size.h}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path d={ropePath} fill="none" stroke="rgb(var(--fg))" strokeWidth="6" strokeLinecap="round" />
        <motion.path
          d={ropePath}
          fill="none"
          stroke="rgb(var(--bg))"
          strokeWidth="1.5"
          strokeDasharray="4 7"
          strokeLinecap="round"
          opacity={0.7}
        />
      </svg>

      {/* Lengan bandul: berputar di titik tumpu (atas-tengah) */}
      <motion.div
        className="absolute inset-x-0 top-0 flex justify-center"
        style={{ rotate: angle, transformOrigin: '50% 0%' }}
      >
        <div style={{ paddingTop: rope }} className="[perspective:1200px]">
          {/* Penjepit */}
          <div className="mx-auto -mb-2 h-5 w-9 rounded-md border border-line bg-card shadow-sm" />

          <motion.div
            ref={cardRef}
            role="button"
            tabIndex={0}
            aria-pressed={flipped}
            aria-label={`Kartu tanda pengenal ${idCard.name}. ${flipped ? 'Sisi belakang' : 'Sisi depan'}. Tekan Enter untuk membalik.`}
            data-testid="id-card"
            onPointerDown={onCardDown}
            onPointerMove={onCardMove}
            onPointerUp={onCardUp}
            onPointerCancel={onCardUp}
            onKeyDown={onKey}
            className="relative aspect-[54/86] w-[188px] cursor-grab touch-none rounded-2xl outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-fg focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:w-[216px]"
            style={{
              rotateX: tiltX,
              rotateY: tiltY,
              transformStyle: 'preserve-3d',
              boxShadow: shadow,
            }}
          >
            {/* Lapisan flip */}
            <motion.div
              className="relative h-full w-full"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* DEPAN */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl border border-line bg-card [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
                <div className="flex h-full flex-col p-4">
                  {/* Slot lanyard */}
                  <div className="mx-auto h-2 w-12 rounded-full bg-fg/15" />
                  <div className="mt-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-muted">
                    <span>ID Card</span>
                    <span>{idCard.badge}</span>
                  </div>
                  <div className="relative mx-auto mt-4 aspect-square w-[62%] overflow-hidden rounded-xl border border-line bg-bg">
                    <Image src={idCard.photo} alt={`Foto ${idCard.name}`} fill sizes="160px" className="object-cover" />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="display-xl text-[1.05rem] leading-tight text-fg sm:text-[1.15rem]">
                      {idCard.name}
                    </p>
                    <p className="mt-1.5 text-[11px] text-muted">{idCard.role}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-line pt-3">
                    <span className="rounded-full bg-fg px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-bg">
                      {idCard.badge}
                    </span>
                    <span className="text-[10px] text-muted">{idCard.location}</span>
                  </div>
                </div>
                {/* Kilau */}
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                  style={{ backgroundImage: glare }}
                />
              </div>

              {/* BELAKANG */}
              <div
                className="absolute inset-0 overflow-hidden rounded-2xl border border-line bg-fg text-bg [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <div className="flex h-full flex-col p-4">
                  <div className="mx-auto h-2 w-12 rounded-full bg-bg/20" />
                  <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-bg/60">{idCard.backTitle}</p>
                  <ul className="mt-3 space-y-2">
                    {idCard.backContacts.map((c) => (
                      <li key={c.label} className="text-[11px] leading-tight">
                        <span className="block font-mono text-[9px] uppercase tracking-widest text-bg/50">{c.label}</span>
                        <span className="break-all text-bg/90">{c.value}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-end justify-between gap-3 border-t border-bg/15 pt-3">
                    <p className="text-[10px] leading-snug text-bg/60">{idCard.qrLabel}</p>
                    <div className="rounded-lg bg-bg p-1.5 text-fg">
                      <QRCodeSVG value={idCard.qrLink} size={64} level="M" bgColor="transparent" fgColor="currentColor" />
                    </div>
                  </div>
                </div>
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                  style={{ backgroundImage: glare }}
                />
              </div>
            </motion.div>
          </motion.div>

          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            {idCard.idNumber}
          </p>
        </div>
      </motion.div>

      {/* Petunjuk + tombol sensor gerak */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2">
        <p className="text-[11px] text-muted">
          {reduce ? 'Ketuk kartu untuk membalik' : 'Seret · ketuk untuk membalik'}
        </p>
        {sensor !== 'hidden' && !reduce && (
          <button
            type="button"
            onClick={enableSensor}
            disabled={sensor === 'on'}
            data-testid="id-card-sensor-btn"
            className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted transition-colors duration-200 hover:text-fg disabled:opacity-60"
          >
            {sensor === 'on' ? 'Sensor gerak aktif' : 'Aktifkan sensor gerak'}
          </button>
        )}
      </div>
    </div>
  );
}

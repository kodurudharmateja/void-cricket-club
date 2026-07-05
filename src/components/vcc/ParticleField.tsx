"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight canvas particle field — floating ember/dust motes that drift upward
 * with subtle crimson glow. Used behind the hero and the scroll-jacked bat section
 * for that "void + ember" atmosphere. Pure canvas, no deps, ~0.5% CPU.
 */
export function ParticleField({
  density = 60,
  className = "",
  color = "200, 16, 46",
}: {
  density?: number;
  className?: string;
  color?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let particles: Particle[] = [];
    let w = 0;
    let h = 0;

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      a: number;
      twinkle: number;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement?.getBoundingClientRect();
      w = rect?.width ?? window.innerWidth;
      h = rect?.height ?? window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.floor((w * h) / 16000) + density;
      particles = Array.from({ length: Math.min(target, 140) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -0.15 - Math.random() * 0.35,
        r: 0.6 + Math.random() * 1.8,
        a: 0.2 + Math.random() * 0.6,
        twinkle: Math.random() * Math.PI * 2,
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.twinkle += 0.04;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        const tw = 0.55 + 0.45 * Math.sin(p.twinkle);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.a * tw})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${color}, ${p.a * tw * 0.8})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      rafId = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [density, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}

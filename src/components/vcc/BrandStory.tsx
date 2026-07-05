"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VCCShield } from "./VCCLogo";

export function BrandStory() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".vcc-bs-word", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.from(".vcc-bs-body", {
        y: 40,
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.from(".vcc-bs-stat", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="story"
      className="relative w-full overflow-hidden bg-void-coal py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-crimson opacity-30 animate-pulse-crimson" aria-hidden />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <span className="font-mono-tech text-[10px] uppercase tracking-[0.5em] text-crimson-metal">
          {"// 06 · The Void"}
        </span>

        <div className="vcc-bs-mantra mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-display text-4xl tracking-tight sm:text-6xl md:text-7xl">
          {["FROM", "THE", "VOID", "COMES", "POWER", "WITHOUT", "LIMIT."].map((w, i) => (
            <span
              key={i}
              className={`vcc-bs-word inline-block ${
                w === "VOID" || w === "POWER"
                  ? "text-crimson-metal text-glow-crimson"
                  : "text-void-fade"
              }`}
            >
              {w}
            </span>
          ))}
        </div>

        <div className="vcc-bs-body mx-auto mt-10 max-w-3xl space-y-5 font-sans text-sm leading-relaxed text-zinc-400 md:text-base">
          <p>
            VCC was born from an obsession with the gap between raw force and
            surgical precision. We do not believe in safe. We do not believe in
            middle-of-the-road. Every bat that leaves the workshop has one job:
            to clear the rope, ideally without the fielder moving.
          </p>
          <p>
            The name is the brief. <span className="text-crimson-metal">Void</span>:
            the empty space at the boundary where the ball is supposed to land.
            <span className="text-crimson-metal"> Cricket Club</span>: a promise
            that everything we make is rooted in the sport&apos;s oldest rituals —
            willow, linseed, leather, and the long walk to the crease.
          </p>
          <p>
            We build in small numbers. We build for players who arrive at the
            crease already knowing they are going to win. If that is you, welcome.
            If not, there are plenty of comfortable brands out there.
          </p>
        </div>

        {/* Stats strip */}
        <div className="vcc-bs-stats mt-14 grid grid-cols-2 gap-6 border-t border-white/5 pt-10 md:grid-cols-4">
          {[
            { v: "72", u: "hrs / bat", l: "Hand-built" },
            { v: "A+", u: "english willow", l: "Top grade" },
            { v: "3", u: "colorways", l: "Crimson · Shadow · Ash" },
            { v: "1/1", u: "per serial", l: "Never repeated" },
          ].map((s, i) => (
            <div key={i} className="vcc-bs-stat flex flex-col items-center">
              <span className="font-display text-5xl text-crimson-metal md:text-6xl">
                {s.v}
              </span>
              <span className="mt-1 font-mono-tech text-[9px] uppercase tracking-[0.35em] text-zinc-500">
                {s.u}
              </span>
              <span className="mt-2 font-heading text-xs text-zinc-400">{s.l}</span>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <VCCShield size={70} />
        </div>
      </div>
    </section>
  );
}

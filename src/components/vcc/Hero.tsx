"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VCCShield } from "./VCCLogo";
import { ParticleField } from "./ParticleField";

export function Hero() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".vcc-hero-shield", {
        scale: 0.4,
        rotate: -25,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
      })
        .from(
          ".vcc-hero-line",
          { scaleY: 0, opacity: 0, duration: 0.6, stagger: 0.1, transformOrigin: "center" },
          "-=0.6"
        )
        .from(
          ".vcc-hero-word",
          { y: 40, opacity: 0, duration: 0.9, stagger: 0.12 },
          "-=0.3"
        )
        .from(
          ".vcc-hero-tag",
          { y: 20, opacity: 0, duration: 0.8 },
          "-=0.4"
        )
        .from(
          ".vcc-hero-scroll",
          { y: 20, opacity: 0, duration: 0.6 },
          "-=0.2"
        );

      // Parallax fade as user scrolls past hero
      gsap.to(".vcc-hero-content", {
        yPercent: -25,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      gsap.to(".vcc-hero-glow", {
        scale: 1.6,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative h-[100svh] w-full overflow-hidden bg-black"
    >
      {/* Layered backgrounds */}
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div
        className="vcc-hero-glow absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-crimson animate-pulse-crimson"
        aria-hidden
      />
      <ParticleField density={50} />
      {/* Top + bottom vignette */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" aria-hidden />

      {/* Top bar */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 md:px-10">
        <span className="font-mono-tech text-[10px] uppercase tracking-[0.45em] text-zinc-500">
          Void Cricket Club
        </span>
        <span className="font-mono-tech text-[10px] uppercase tracking-[0.45em] text-zinc-500 hidden sm:block">
          Est. MMXXV
        </span>
        <span className="font-mono-tech text-[10px] uppercase tracking-[0.45em] text-crimson-metal">
          Bat Co.
        </span>
      </header>

      {/* Hero content */}
      <div className="vcc-hero-content relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="vcc-hero-shield relative">
          <div
            className="absolute -inset-8 rounded-full bg-[#c8102e]/20 blur-3xl"
            aria-hidden
          />
          <VCCShield size={140} className="relative" />
        </div>

        <div className="mt-8 flex items-center gap-4">
          <span className="vcc-hero-line h-px w-12 bg-gradient-to-r from-transparent to-crimson md:w-24" />
          <span className="vcc-hero-tag font-mono-tech text-[10px] uppercase tracking-[0.55em] text-zinc-400 md:text-xs">
            English Willow · Hand-Crafted
          </span>
          <span className="vcc-hero-line h-px w-12 bg-gradient-to-l from-transparent to-crimson md:w-24" />
        </div>

        <h1 className="mt-4 font-display text-5xl leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-[9rem]">
          <span className="vcc-hero-word block text-void-fade">THE ULTIMATE</span>
          <span className="vcc-hero-word block text-crimson-metal text-glow-crimson">
            WEAPON.
          </span>
          <span className="vcc-hero-word block text-void-fade">UNLEASHED.</span>
        </h1>

        <p className="vcc-hero-tag mt-7 max-w-md font-sans text-sm text-zinc-400 md:text-base">
          Forged in darkness. Tuned for violence. The VCC bat is not equipment —
          it&apos;s the last word at the crease.
        </p>

        {/* Scroll indicator */}
        <div className="vcc-hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono-tech text-[9px] uppercase tracking-[0.4em] text-zinc-500">
            Scroll to unleash
          </span>
          <div className="relative h-10 w-6 rounded-full border border-zinc-700">
            <span className="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full bg-crimson animate-scroll-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}

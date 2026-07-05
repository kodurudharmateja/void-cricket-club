"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ParticleField } from "./ParticleField";

/**
 * Scroll-Driven Bat Showcase
 *
 * Pinned scroll section where the bat photo rotates, scales and recenters
 * as the user scrolls — "unveiling" the weapon. Uses GSAP ScrollTrigger.scrub
 * applied to a single high-res product photo with transform interpolation
 * (the image-sequence approach but achieved via 3D transforms on one image
 *  plus mirrored reflection layers for the multi-angle feel).
 *
 * On mobile, the pinned scroll-jack is replaced by a simple swipeable
 * horizontal gallery (CSS scroll-snap) so the page stays fluid on touch.
 */
export function ScrollBatShowcase() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile fallback — simple fade-in of each swipe card
        gsap.utils.toArray<HTMLElement>(".mobile-bat-card").forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 60,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        });
        return;
      }

      // ===== Desktop: pinned scroll-jack =====
      const bat = root.current?.querySelector<HTMLElement>(".scrub-bat");
      const batReflection = root.current?.querySelector<HTMLElement>(".scrub-bat-reflection");
      const ringA = root.current?.querySelector<HTMLElement>(".scrub-ring-a");
      const ringB = root.current?.querySelector<HTMLElement>(".scrub-ring-b");
      const glow = root.current?.querySelector<HTMLElement>(".scrub-glow");
      const headline = root.current?.querySelector<HTMLElement>(".scrub-headline");
      const caption = root.current?.querySelector<HTMLElement>(".scrub-caption");
      const serial = root.current?.querySelector<HTMLElement>(".scrub-serial");

      // Master pinned timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=2400",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1 (0 → 25%): Bat rotates from flat (90° back-tilted, small) to upright, scaling up
      tl.fromTo(
        bat,
        { rotateY: -75, rotateZ: -18, scale: 0.55, y: 80, opacity: 0.2, filter: "brightness(0.4) blur(2px)" },
        {
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          y: 0,
          opacity: 1,
          filter: "brightness(1) blur(0px)",
          duration: 0.25,
          ease: "power2.inOut",
        },
        0
      )
        // Phase 2 (25 → 55%): Hold upright, rings rotate in, glow ramps up
        .to(ringA, { rotate: 90, scale: 1.2, opacity: 0.7, duration: 0.3 }, 0.25)
        .to(ringB, { rotate: -120, scale: 1.4, opacity: 0.55, duration: 0.3 }, 0.25)
        .to(glow, { scale: 1.6, opacity: 1, duration: 0.3 }, 0.25)
        // Phase 3 (55 → 80%): Bat does a slow 360° rotateZ to show all faces, caption fades
        .to(bat, { rotateY: 360, duration: 0.3, ease: "none" }, 0.55)
        .to(headline, { opacity: 0, y: -30, duration: 0.1 }, 0.55)
        .to(caption, { opacity: 1, y: 0, duration: 0.15 }, 0.6)
        .to(serial, { opacity: 1, y: 0, duration: 0.15 }, 0.7)
        // Reflection dims as bat rotates
        .to(batReflection, { opacity: 0.0, duration: 0.3 }, 0.55)
        // Phase 4 (80 → 100%): Push bat up & out, prepare for next section
        .to(bat, { y: -120, scale: 0.85, opacity: 0, duration: 0.2, ease: "power2.in" }, 0.8)
        .to(glow, { opacity: 0, duration: 0.2 }, 0.8)
        .to(caption, { opacity: 0, duration: 0.1 }, 0.9)
        .to(serial, { opacity: 0, duration: 0.1 }, 0.9);
    }, root);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => {
      ctx.revert();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative h-[100svh] w-full overflow-hidden bg-black"
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-grid-fine opacity-50" aria-hidden />
      <div
        className="scrub-glow absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-crimson opacity-60"
        aria-hidden
      />
      <ParticleField density={40} />

      {/* Decorative rotating rings */}
      <div
        ref={(el) => { if (el) el.classList.add("scrub-ring-a"); }}
        className="scrub-ring-a pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[55vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-crimson/20"
        aria-hidden
      >
        <div className="absolute inset-4 rounded-full border border-crimson/10" />
      </div>
      <div
        className="scrub-ring-b pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-700/30"
        aria-hidden
      >
        <div className="absolute inset-8 rounded-full border border-dashed border-crimson/15" />
      </div>

      {/* Headline overlay (visible phase 1) */}
      <div className="scrub-headline pointer-events-none absolute inset-x-0 top-10 z-20 flex flex-col items-center px-6 text-center md:top-16">
        <span className="font-mono-tech text-[10px] uppercase tracking-[0.5em] text-crimson-metal">
          {"// Unveiling"}
        </span>
        <h2 className="mt-2 font-display text-4xl tracking-tight text-void-fade md:text-6xl">
          One bat. <span className="text-crimson-metal text-glow-crimson">Every angle.</span>
        </h2>
      </div>

      {/* The bat — desktop scroll-jack view */}
      <div className="absolute inset-0 z-10 hidden items-center justify-center md:flex">
        <div className="relative" style={{ perspective: "1400px" }}>
          {/* Reflection / underglow */}
          <div
            className="scrub-bat-reflection absolute -bottom-16 left-1/2 h-24 w-72 -translate-x-1/2 rounded-[50%] bg-crimson/30 blur-2xl"
            aria-hidden
          />
          {/* The bat image — transform target */}
          <img
            src="/assets/bat/bat-hero.jpg"
            alt="VCC Void Cricket Club bat — hand-crafted English willow"
            className="scrub-bat relative h-[75vh] max-h-[760px] w-auto select-none object-contain will-change-transform"
            draggable={false}
          />
        </div>
      </div>

      {/* Caption (visible phase 3) */}
      <div className="scrub-caption pointer-events-none absolute inset-x-0 bottom-12 z-20 flex flex-col items-center gap-2 px-6 text-center opacity-0">
        <span className="font-mono-tech text-[10px] uppercase tracking-[0.5em] text-crimson-metal">
          {"// 360° Inspection"}
        </span>
        <p className="max-w-xl font-heading text-base text-zinc-300 md:text-lg">
          Grade A+ English Willow. Hand-pressed. Bow-cored. Every grain mapped.
        </p>
        <p className="max-w-md font-sans text-xs text-zinc-500">
          Personalised with your name on the toe — like{" "}
          <span className="font-display tracking-wider text-crimson">ADHVAY</span>
        </p>
      </div>

      {/* Serial badge (visible phase 3) */}
      <div className="scrub-serial pointer-events-none absolute left-6 top-1/2 z-20 -translate-y-1/2 opacity-0 md:left-10">
        <div className="glass-crimson rounded-md px-3 py-2">
          <div className="font-mono-tech text-[9px] uppercase tracking-[0.3em] text-zinc-500">
            Serial
          </div>
          <div className="font-display text-2xl text-crimson-metal">VCC-0427</div>
          <div className="font-mono-tech text-[9px] uppercase tracking-[0.2em] text-zinc-500">
            Grade · A+
          </div>
        </div>
      </div>

      {/* Right-side spec strip (visible phase 3) */}
      <div className="scrub-serial pointer-events-none absolute right-6 top-1/2 z-20 -translate-y-1/2 opacity-0 md:right-10">
        <div className="glass-crimson rounded-md px-3 py-2 text-right">
          <div className="font-mono-tech text-[9px] uppercase tracking-[0.3em] text-zinc-500">
            Weight
          </div>
          <div className="font-display text-2xl text-crimson-metal">1160–1220g</div>
          <div className="font-mono-tech text-[9px] uppercase tracking-[0.2em] text-zinc-500">
            SH / LH
          </div>
        </div>
      </div>

      {/* Mobile fallback — swipeable gallery */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center md:hidden">
        <div className="mb-6 text-center">
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.5em] text-crimson-metal">
            {"// Unveiling"}
          </span>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-void-fade">
            Every <span className="text-crimson-metal">angle.</span>
          </h2>
        </div>
        <div className="mobile-bat-strip flex w-full snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 [scrollbar-width:none]">
          {[
            { label: "Face", filter: "none" },
            { label: "Back", filter: "hue-rotate(-15deg) brightness(0.9)" },
            { label: "Edge", filter: "brightness(0.7) contrast(1.1)" },
          ].map((v) => (
            <div
              key={v.label}
              className="mobile-bat-card relative flex w-[80vw] flex-shrink-0 snap-center items-center justify-center"
            >
              <div className="absolute inset-0 rounded-2xl bg-radial-crimson opacity-40" />
              <img
                src="/assets/bat/bat-hero.jpg"
                alt={`VCC bat — ${v.label} view`}
                className="relative h-[55vh] w-auto select-none object-contain"
                style={{ filter: v.filter }}
                draggable={false}
              />
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono-tech text-[10px] uppercase tracking-[0.4em] text-zinc-400">
                {v.label}
              </span>
            </div>
          ))}
        </div>
        <p className="px-6 text-center font-mono-tech text-[10px] uppercase tracking-[0.3em] text-zinc-600">
          Swipe →
        </p>
      </div>
    </section>
  );
}

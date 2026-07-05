"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Variant = {
  id: string;
  name: string;
  tagline: string;
  className: string; // filter class
  willow: string;
  weight: string;
  grip: string;
  grade: string;
  price: string; // [PRICE] placeholder
};

const VARIANTS: Variant[] = [
  {
    id: "crimson",
    name: "CRIMSON VOID",
    tagline: "The flagship. Crimson grip, blood-red spine.",
    className: "bat-variant-crimson",
    willow: "Grade A English Willow",
    weight: "1160 – 1220 g",
    grip: "Crimson Chevron · dual-tone",
    grade: "A+",
    price: "[PRICE]",
  },
  {
    id: "shadow",
    name: "SHADOW VOID",
    tagline: "Blacked-out. Stealth spine. For the silent killer.",
    className: "bat-variant-shadow",
    willow: "Grade A English Willow · ink-stained",
    weight: "1180 – 1240 g",
    grip: "Shadow Matte · anti-slip",
    grade: "A",
    price: "[PRICE]",
  },
  {
    id: "ash",
    name: "ASH VOID",
    tagline: "Cool steel-grey tone. Built for the technician.",
    className: "bat-variant-ash",
    willow: "Grade A+ English Willow · bleached",
    weight: "1140 – 1200 g",
    grip: "Steel Diamond · perforated",
    grade: "A+",
    price: "[PRICE]",
  },
];

export function ColorVariants() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement | null>(null);
  const variant = VARIANTS[active];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".vcc-cv-title", {
        y: 60,
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.from(".vcc-cv-tab", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Crossfade bat image when switching variants
  useEffect(() => {
    gsap.fromTo(
      ".vcc-cv-bat-img",
      { opacity: 0, scale: 0.92, rotateZ: -4 },
      { opacity: 1, scale: 1, rotateZ: 0, duration: 0.7, ease: "power3.out" }
    );
  }, [active]);

  return (
    <section
      ref={root}
      id="variants"
      className="relative min-h-screen w-full overflow-hidden bg-void-black py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-radial-crimson opacity-50" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="vcc-cv-title text-center">
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.5em] text-crimson-metal">
            {"// 03 · Colorways"}
          </span>
          <h2 className="mt-3 font-display text-5xl tracking-tight text-void-fade md:text-7xl">
            Pick your <span className="text-crimson-metal text-glow-crimson">poison.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-sm text-zinc-400 md:text-base">
            Three identities. Same hand-forged willow core. Choose the variant
            that matches the kind of damage you plan to do.
          </p>
        </div>

        {/* Tabs */}
        <div className="vcc-cv-tabs mt-12 flex flex-wrap items-center justify-center gap-3">
          {VARIANTS.map((v, i) => {
            const isActive = i === active;
            return (
              <button
                key={v.id}
                onClick={() => setActive(i)}
                className={`vcc-cv-tab group relative rounded-full px-5 py-2.5 font-mono-tech text-[10px] uppercase tracking-[0.35em] transition-all duration-300 md:text-xs ${
                  isActive
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <span
                  className={`absolute inset-0 rounded-full border transition-all ${
                    isActive
                      ? "border-crimson bg-crimson/15 glow-crimson"
                      : "border-zinc-700 group-hover:border-zinc-500"
                  }`}
                />
                <span className="relative">{v.name}</span>
              </button>
            );
          })}
        </div>

        {/* Showcase grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-[1fr_1.2fr_1fr]">
          {/* Left: name + tagline */}
          <div className="order-2 flex flex-col justify-center md:order-1">
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.4em] text-zinc-500">
              Variant 0{active + 1}
            </span>
            <h3 className="mt-2 font-display text-4xl tracking-tight text-void-fade md:text-5xl">
              {variant.name}
            </h3>
            <p className="mt-3 font-heading text-base text-zinc-300">
              {variant.tagline}
            </p>
            <div className="mt-6 h-px w-24 bg-gradient-to-r from-crimson to-transparent" />
          </div>

          {/* Center: bat image */}
          <div className="relative order-1 flex items-center justify-center md:order-2">
            <div className="absolute inset-0 rounded-full bg-radial-crimson opacity-60" aria-hidden />
            <img
              key={variant.id}
              src="/assets/bat/bat-hero.jpg"
              alt={`VCC ${variant.name} — cricket bat colorway`}
              className={`vcc-cv-bat-img relative h-[60vh] max-h-[640px] w-auto select-none object-contain ${variant.className}`}
              draggable={false}
            />
            {/* Floating grade sticker */}
            <div className="absolute right-2 top-2 md:right-6 md:top-6">
              <div className="glass-crimson rounded-md px-3 py-1.5 text-center">
                <div className="font-mono-tech text-[8px] uppercase tracking-[0.3em] text-zinc-500">
                  Grade
                </div>
                <div className="font-display text-2xl text-crimson-metal">
                  {variant.grade}
                </div>
              </div>
            </div>
          </div>

          {/* Right: specs */}
          <div className="order-3 flex flex-col justify-center">
            <dl className="space-y-4">
              {[
                ["Willow", variant.willow],
                ["Weight", variant.weight],
                ["Grip", variant.grip],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between border-b border-white/5 pb-3"
                >
                  <dt className="font-mono-tech text-[10px] uppercase tracking-[0.35em] text-zinc-500">
                    {k}
                  </dt>
                  <dd className="font-heading text-sm text-zinc-200">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex items-end gap-3">
              <div>
                <div className="font-mono-tech text-[9px] uppercase tracking-[0.35em] text-zinc-500">
                  Price
                </div>
                <div className="font-display text-3xl text-crimson-metal">
                  {variant.price}
                </div>
              </div>
              <span className="mb-1 font-mono-tech text-[9px] uppercase tracking-[0.3em] text-zinc-600">
                {/* [BUY_BUTTON_LINK] placeholder */}
                Replace placeholder
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

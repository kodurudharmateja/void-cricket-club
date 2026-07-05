"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FEATURES = [
  {
    id: "01",
    title: "Hand-Crafted",
    body: "Each bat is shaped by a single master craftsman from cleft to finish — no production line, no batch QA. The spine, the edges, the toe: every surface is hand-shaved, hand-pressed, and hand-finished.",
    metric: "72 hrs / bat",
  },
  {
    id: "02",
    title: "English Willow",
    body: "Grade A+ Salix alba caerulea, sourced exclusively from premium English willow plantations. 8–12 straight grains, clean faces, no butterfly stains. Clefts are aged 18 months before shaping.",
    metric: "A+ · 8–12 grains",
  },
  {
    id: "03",
    title: "Premium Grip",
    body: "Triple-layered chevron grip with a tactile rubber core. Anti-slip in wet conditions, cushioned for the bottom hand, perforated for breathability. Custom colour-matched to each variant.",
    metric: "3-layer chevron",
  },
  {
    id: "04",
    title: "Serial & Grade Sticker",
    body: "Every VCC bat ships with a unique serial number and grade sticker applied to the toe — like the A+ grade shown opposite. Scan it, register it, and your bat is logged in the Void registry for life.",
    metric: "VCC-XXXX · A+",
  },
  {
    id: "05",
    title: "Personalisation",
    body: "Your name, your number, your alias — printed on the toe in cursive white, exactly like the “Adhvay” tag shown. Up to 12 characters. No two bats leave the workshop with the same combination.",
    metric: "12 chars · toe-printed",
  },
  {
    id: "06",
    title: "Bow-Cored Spine",
    body: "Slight bow through the lower third shifts weight into the hitting zone without deadening the pick-up. Engineered for the modern T20 swing — full swing, full follow-through, full clearance.",
    metric: "Bow · 14mm",
  },
];

export function ProductDetails() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".vcc-pd-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.from(".vcc-pd-feature", {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.from(".vcc-pd-sticker", {
        scale: 0.6,
        opacity: 0,
        rotate: -15,
        duration: 1,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: root.current, start: "top 60%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="craft"
      className="relative w-full overflow-hidden bg-void-coal py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden />
      {/* Side ribbon */}
      <div className="pointer-events-none absolute left-0 top-1/3 hidden h-px w-full bg-gradient-to-r from-transparent via-crimson/40 to-transparent md:block" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="vcc-pd-title flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.5em] text-crimson-metal">
              {"// 04 · Craftsmanship"}
            </span>
            <h2 className="mt-3 font-display text-5xl tracking-tight text-void-fade md:text-7xl">
              Forged, not <span className="text-crimson-metal text-glow-crimson">printed.</span>
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm text-zinc-400 md:text-base">
            No factory. No batches. Each VCC bat is a one-off weapon, shaped by
            hand over three days from a single willow cleft.
          </p>
        </div>

        <div className="vcc-pd-grid mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article
              key={f.id}
              className="vcc-pd-feature group relative overflow-hidden rounded-2xl bg-metal-card p-6 transition-all duration-500 hover:-translate-y-1 hover:glow-crimson"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-crimson/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
              <div className="relative flex items-start justify-between">
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.4em] text-crimson-metal">
                  {f.id}
                </span>
                <span className="font-mono-tech text-[9px] uppercase tracking-[0.25em] text-zinc-600">
                  {f.metric}
                </span>
              </div>
              <h3 className="relative mt-4 font-display text-3xl tracking-tight text-void-fade md:text-4xl">
                {f.title}
              </h3>
              <p className="relative mt-3 font-sans text-sm leading-relaxed text-zinc-400">
                {f.body}
              </p>
              <div className="relative mt-5 h-px w-full bg-gradient-to-r from-crimson/40 via-white/5 to-transparent" />
            </article>
          ))}
        </div>

        {/* Floating grade sticker callout */}
        <div className="vcc-pd-sticker mt-16 flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-12">
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-crimson/20 blur-3xl" aria-hidden />
            <div className="relative glass-crimson flex flex-col items-center rounded-xl px-6 py-5 text-center">
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.4em] text-zinc-500">
                Grade Sticker
              </span>
              <span className="mt-1 font-display text-7xl text-crimson-metal text-glow-crimson">
                A+
              </span>
              <span className="font-mono-tech text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                Toe-applied · unique serial
              </span>
            </div>
          </div>
          <div className="max-w-sm text-center md:text-left">
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.4em] text-zinc-500">
              Personalised
            </span>
            <h3 className="mt-2 font-display text-4xl tracking-tight text-void-fade">
              Your name. <span className="text-crimson-metal">In white.</span>
            </h3>
            <p className="mt-3 font-sans text-sm text-zinc-400">
              The toe of every VCC bat carries the owner&apos;s name in cursive
              white — printed to order, never repeated. Seen here with the
              sample tag &ldquo;Adhvay&rdquo;.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

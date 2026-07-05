"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VCCShield } from "./VCCLogo";

export function Contact() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".vcc-ct-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.from(".vcc-ct-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="buy"
      className="relative w-full overflow-hidden bg-void-black py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-crimson opacity-50" aria-hidden />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className="vcc-ct-title">
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.5em] text-crimson-metal">
            {"// 07 · Take it home"}
          </span>
          <h2 className="mt-3 font-display text-5xl tracking-tight text-void-fade md:text-7xl">
            Claim your <span className="text-crimson-metal text-glow-crimson">weapon.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-sm text-zinc-400 md:text-base">
            Limited drops. Built to order. Drop your details below and the Void
            team will reach out with availability, lead-time, and personalisation.
          </p>
        </div>

        <div className="vcc-ct-card mt-12 overflow-hidden rounded-3xl border border-crimson/30 bg-metal-card glow-crimson">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: pricing block */}
            <div className="relative border-b border-white/5 p-8 text-left md:border-b-0 md:border-r">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-crimson/15 blur-3xl" aria-hidden />
              <span className="relative font-mono-tech text-[10px] uppercase tracking-[0.4em] text-zinc-500">
                From
              </span>
              <div className="relative mt-2 flex items-end gap-3">
                <span className="font-display text-6xl text-crimson-metal text-glow-crimson md:text-7xl">
                  [PRICE]
                </span>
                <span className="mb-2 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                  USD
                </span>
              </div>
              <p className="relative mt-3 font-sans text-xs text-zinc-500">
                {/* [PRICE] placeholder — replace with the actual price when finalised */}
                Final pricing TBC. Includes personalisation, serial registration,
                and a hand-stitched bat cover.
              </p>

              <a
                href="[BUY_BUTTON_LINK]"
                className="group relative mt-7 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-crimson px-8 py-4 font-heading text-sm uppercase tracking-[0.3em] text-white transition-all hover:glow-crimson-strong"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">Buy Now</span>
                <svg viewBox="0 0 24 24" className="relative h-4 w-4 fill-white">
                  <path d="M5 12h12l-4-4 1.4-1.4L20.8 12l-6.4 5.4L13 16l4-4H5z" />
                </svg>
              </a>
              <span className="mt-3 block font-mono-tech text-[9px] uppercase tracking-[0.3em] text-zinc-600">
                {/* [BUY_BUTTON_LINK] placeholder */}
                &lt;— replace href with checkout URL
              </span>
            </div>

            {/* Right: contact block */}
            <div className="relative p-8 text-left">
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.4em] text-zinc-500">
                Direct Line
              </span>
              <h3 className="mt-2 font-display text-3xl text-void-fade md:text-4xl">
                Talk to the makers
              </h3>

              <dl className="mt-6 space-y-4">
                <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <dt className="font-mono-tech text-[10px] uppercase tracking-[0.35em] text-zinc-500">
                    Email
                  </dt>
                  <dd className="font-heading text-sm text-zinc-200">
                    {/* [CONTACT_INFO] placeholder */}
                    [CONTACT_EMAIL]
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <dt className="font-mono-tech text-[10px] uppercase tracking-[0.35em] text-zinc-500">
                    WhatsApp
                  </dt>
                  <dd className="font-heading text-sm text-zinc-200">
                    {/* [CONTACT_INFO] placeholder */}
                    [CONTACT_PHONE]
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <dt className="font-mono-tech text-[10px] uppercase tracking-[0.35em] text-zinc-500">
                    Workshop
                  </dt>
                  <dd className="font-heading text-sm text-zinc-200">
                    {/* [CONTACT_INFO] placeholder */}
                    [WORKSHOP_ADDRESS]
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="font-mono-tech text-[10px] uppercase tracking-[0.35em] text-zinc-500">
                    Lead time
                  </dt>
                  <dd className="font-heading text-sm text-zinc-200">7 – 14 days</dd>
                </div>
              </dl>

              <div className="mt-6 flex items-center gap-3 opacity-70">
                <VCCShield size={32} />
                <span className="font-mono-tech text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                  Void Cricket Club · Bat Co.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

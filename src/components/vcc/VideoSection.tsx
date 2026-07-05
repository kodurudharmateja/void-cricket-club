"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type VideoCard = {
  id: string;
  label: string;
  caption: string;
  src: string | null; // null = placeholder
  poster?: string;
};

// [VIDEO_1/2/3] placeholders — first video uses the real uploaded file,
// the other two are clearly marked placeholders for the brand team to drop in.
const VIDEOS: VideoCard[] = [
  {
    id: "v1",
    label: "Reel 01 · Unveiling",
    caption: "The bat, lifted from darkness. Slow-rotate showcase.",
    src: "/assets/video/bat-video-1.mp4",
  },
  {
    id: "v2",
    label: "Reel 02 · In Hand",
    caption: "[VIDEO_2] — Drop the in-hand grip B-roll here.",
    src: null,
  },
  {
    id: "v3",
    label: "Reel 03 · Action",
    caption: "[VIDEO_3] — Drop the on-pitch / net-session footage here.",
    src: null,
  },
];

export function VideoSection() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".vcc-vs-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.from(".vcc-vs-card", {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });
    }, root);

    // Lazy autoplay videos when scrolled into view
    const videos = gsap.utils.toArray<HTMLVideoElement>("video.vcc-autoplay");
    const observers: IntersectionObserver[] = [];
    videos.forEach((v) => {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              v.play().catch(() => {});
            } else {
              v.pause();
            }
          });
        },
        { threshold: 0.35 }
      );
      io.observe(v);
      observers.push(io);
    });

    return () => {
      ctx.revert();
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <section
      ref={root}
      id="videos"
      className="relative w-full overflow-hidden bg-void-black py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-grid-fine opacity-30" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full bg-radial-crimson opacity-40" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="vcc-vs-title text-center">
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.5em] text-crimson-metal">
            {"// 05 · In Motion"}
          </span>
          <h2 className="mt-3 font-display text-5xl tracking-tight text-void-fade md:text-7xl">
            See it <span className="text-crimson-metal text-glow-crimson">move.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-sm text-zinc-400 md:text-base">
            Three reels. Unveiling, in-hand, and on-pitch. Autoplay muted loop
            when in view — click any tile for full playback.
          </p>
        </div>

        <div className="vcc-vs-grid mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {VIDEOS.map((v) => (
            <article
              key={v.id}
              className="vcc-vs-card group relative overflow-hidden rounded-2xl border border-white/5 bg-metal-card transition-all duration-500 hover:-translate-y-1 hover:glow-crimson"
            >
              <div className="relative aspect-[9/16] overflow-hidden">
                {v.src ? (
                  <video
                    className="vcc-autoplay h-full w-full object-cover"
                    src={v.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={v.poster}
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-void-ash to-black p-6 text-center">
                    <div className="absolute inset-0 bg-grid-fine opacity-40" aria-hidden />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-crimson/40 bg-crimson/10">
                      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-crimson">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span className="relative font-mono-tech text-[10px] uppercase tracking-[0.4em] text-crimson-metal">
                      {v.id.toUpperCase()} · Placeholder
                    </span>
                    <span className="relative max-w-[80%] font-sans text-xs text-zinc-500">
                      {v.caption}
                    </span>
                  </div>
                )}
                {/* Overlay label */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4">
                  <div>
                    <div className="font-mono-tech text-[9px] uppercase tracking-[0.4em] text-crimson-metal">
                      {v.id.toUpperCase()}
                    </div>
                    <div className="font-display text-xl text-white">{v.label}</div>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur transition-all group-hover:bg-crimson group-hover:border-crimson">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              {v.src && (
                <p className="px-4 py-3 font-sans text-xs text-zinc-500">{v.caption}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

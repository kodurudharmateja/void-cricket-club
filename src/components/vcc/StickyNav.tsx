"use client";

import { useEffect, useState } from "react";
import { VCCWordmark } from "./VCCLogo";

const LINKS = [
  { href: "#variants", label: "Colorways" },
  { href: "#craft", label: "Craft" },
  { href: "#videos", label: "Reels" },
  { href: "#story", label: "Void" },
  { href: "#buy", label: "Buy" },
];

export function StickyNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.9);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="border-b border-white/5 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
          <a href="#top" className="transition hover:scale-105">
            <VCCWordmark />
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-zinc-400 transition-colors hover:text-crimson"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="#buy"
            className="rounded-full border border-crimson bg-crimson/10 px-4 py-1.5 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-crimson-metal transition-all hover:bg-crimson hover:text-white"
          >
            Buy Now
          </a>
        </div>
        <div className="h-px shimmer-line" />
      </div>
    </nav>
  );
}

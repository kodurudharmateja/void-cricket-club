"use client";

import { VCCShield, VCCWordmark } from "./VCCLogo";

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/5 bg-black pt-16">
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 -top-32 h-[40vh] w-[60vh] -translate-x-1/2 rounded-full bg-radial-crimson opacity-30" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Top: logo + tagline */}
        <div className="flex flex-col items-center gap-6 text-center">
          <VCCShield size={70} showWordmark />
          <p className="max-w-md font-mono-tech text-[10px] uppercase tracking-[0.4em] text-zinc-500">
            From the void · Comes power without limit
          </p>
        </div>

        {/* Middle: link grid */}
        <div className="mt-14 grid grid-cols-2 gap-8 border-t border-white/5 py-10 md:grid-cols-4">
          <div>
            <h4 className="font-mono-tech text-[10px] uppercase tracking-[0.4em] text-crimson-metal">
              Product
            </h4>
            <ul className="mt-4 space-y-2 font-heading text-sm text-zinc-400">
              <li><a href="#variants" className="transition hover:text-crimson">Colorways</a></li>
              <li><a href="#craft" className="transition hover:text-crimson">Craftsmanship</a></li>
              <li><a href="#videos" className="transition hover:text-crimson">In Motion</a></li>
              <li><a href="#buy" className="transition hover:text-crimson">Buy Now</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono-tech text-[10px] uppercase tracking-[0.4em] text-crimson-metal">
              Brand
            </h4>
            <ul className="mt-4 space-y-2 font-heading text-sm text-zinc-400">
              <li><a href="#story" className="transition hover:text-crimson">The Void</a></li>
              <li><a href="#" className="transition hover:text-crimson">Lookbook</a></li>
              <li><a href="#" className="transition hover:text-crimson">Athletes</a></li>
              <li><a href="#" className="transition hover:text-crimson">Journal</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono-tech text-[10px] uppercase tracking-[0.4em] text-crimson-metal">
              Connect
            </h4>
            <ul className="mt-4 space-y-2 font-heading text-sm text-zinc-400">
              {/* [CONTACT_INFO] / social placeholders */}
              <li><a href="#" className="transition hover:text-crimson">Instagram [SOCIAL]</a></li>
              <li><a href="#" className="transition hover:text-crimson">YouTube [SOCIAL]</a></li>
              <li><a href="#" className="transition hover:text-crimson">X / Twitter [SOCIAL]</a></li>
              <li><a href="#" className="transition hover:text-crimson">WhatsApp [SOCIAL]</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono-tech text-[10px] uppercase tracking-[0.4em] text-crimson-metal">
              Workshop
            </h4>
            <ul className="mt-4 space-y-2 font-heading text-sm text-zinc-400">
              <li>[WORKSHOP_ADDRESS]</li>
              <li>[CONTACT_EMAIL]</li>
              <li>[CONTACT_PHONE]</li>
              <li className="text-zinc-600">Mon–Sat · 10:00–18:00</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 py-6 md:flex-row">
          <VCCWordmark />
          <p className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-zinc-600">
            © {new Date().getFullYear()} Void Cricket Club · Bat Company. All rights reserved.
          </p>
          <div className="flex items-center gap-4 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-zinc-600">
            <a href="#" className="transition hover:text-crimson">Privacy</a>
            <a href="#" className="transition hover:text-crimson">Terms</a>
            <a href="#" className="transition hover:text-crimson">Warranty</a>
          </div>
        </div>
      </div>

      {/* Hairline crimson top border accent */}
      <div className="absolute inset-x-0 top-0 h-px shimmer-line" aria-hidden />
    </footer>
  );
}

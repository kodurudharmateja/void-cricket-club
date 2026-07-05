"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenisInstance: Lenis | null = null;
export function getLenis() {
  return lenisInstance;
}

/**
 * Wraps the app in a Lenis smooth scroll context and syncs it with GSAP ScrollTrigger.
 *
 * On touch/mobile devices Lenis is auto-disabled (the OS scroll is already smooth)
 * and the bat scroll-jacking effect is reduced — see ScrollBatShowcase for the mobile fallback.
 *
 * Hash-link clicks (`a[href^="#"]`) are intercepted so they route through Lenis
 * and then force a `ScrollTrigger.refresh()` — this is critical because the
 * pinned scroll-jacked section changes the page height, which leaves ScrollTrigger's
 * cached start/end positions stale until a refresh.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 768;

    if (isTouch) {
      // Smooth-scroll is off on mobile; but we still need anchor-link handling
      // so the sticky-nav links scroll cleanly to sections.
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement)?.closest(
          'a[href^="#"]'
        ) as HTMLAnchorElement | null;
        if (!a) return;
        const id = a.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(() => ScrollTrigger.refresh(), 400);
        }
      };
      document.addEventListener("click", onClick);
      ScrollTrigger.refresh();

      // Safety net for touch devices too
      const safetyNet = setTimeout(() => {
        const stuck = document.querySelectorAll<HTMLElement>(
          '.vcc-vs-card, .vcc-pd-feature, .vcc-pd-sticker, .vcc-cv-tab, ' +
          '.vcc-bs-word, .vcc-bs-body, .vcc-bs-stat, .vcc-ct-card'
        );
        stuck.forEach((el) => {
          const op = parseFloat(getComputedStyle(el).opacity);
          if (op < 0.05) {
            gsap.to(el, { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.6, ease: "power2.out" });
          }
        });
        ScrollTrigger.refresh();
      }, 5000);

      return () => {
        document.removeEventListener("click", onClick);
        clearTimeout(safetyNet);
      };
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
    });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Intercept anchor link clicks → route via Lenis + refresh ScrollTrigger after
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id) as HTMLElement | null;
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, {
        offset: -10,
        duration: 1.2,
        onComplete: () => {
          // Pinned sections change page height — refresh so downstream
          // scrollTriggers recompute their start/end positions.
          ScrollTrigger.refresh();
        },
      });
    };
    document.addEventListener("click", onClick);

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 600);
    // Second refresh after fonts/images settle (handles late-loading assets
    // that change layout heights and leave ScrollTrigger's cached positions stale).
    const refreshTimer2 = setTimeout(() => ScrollTrigger.refresh(), 2000);

    // Safety net: if any reveal-target element is still at opacity:0 after 5s
    // (e.g. its scrollTrigger never fired due to pinned-section math edge cases),
    // force it visible so the page is never stuck with hidden content.
    const safetyNet = setTimeout(() => {
      const stuck = document.querySelectorAll<HTMLElement>(
        '.vcc-vs-card, .vcc-pd-feature, .vcc-pd-sticker, .vcc-cv-tab, ' +
        '.vcc-bs-word, .vcc-bs-body, .vcc-bs-stat, .vcc-ct-card'
      );
      stuck.forEach((el) => {
        const op = parseFloat(getComputedStyle(el).opacity);
        if (op < 0.05) {
          gsap.to(el, { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.6, ease: "power2.out" });
        }
      });
      ScrollTrigger.refresh();
    }, 5000);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
      clearTimeout(refreshTimer);
      clearTimeout(refreshTimer2);
      clearTimeout(safetyNet);
    };
  }, []);

  return <>{children}</>;
}

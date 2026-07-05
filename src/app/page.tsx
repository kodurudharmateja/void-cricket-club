"use client";

import { SmoothScroll } from "@/components/vcc/SmoothScroll";
import { StickyNav } from "@/components/vcc/StickyNav";
import { Hero } from "@/components/vcc/Hero";
import { ScrollBatShowcase } from "@/components/vcc/ScrollBatShowcase";
import { ColorVariants } from "@/components/vcc/ColorVariants";
import { ProductDetails } from "@/components/vcc/ProductDetails";
import { VideoSection } from "@/components/vcc/VideoSection";
import { BrandStory } from "@/components/vcc/BrandStory";
import { Contact } from "@/components/vcc/Contact";
import { Footer } from "@/components/vcc/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <div id="top" className="relative min-h-screen w-full bg-black">
        <StickyNav />
        <main>
          {/* 01 — Hero */}
          <Hero />

          {/* 02 — Scroll-driven bat showcase (pinned) */}
          <ScrollBatShowcase />

          {/* 03 — Color variants */}
          <ColorVariants />

          {/* 04 — Product details / craftsmanship */}
          <ProductDetails />

          {/* 05 — Video reels */}
          <VideoSection />

          {/* 06 — Brand story */}
          <BrandStory />

          {/* 07 — Purchase / contact */}
          <Contact />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}

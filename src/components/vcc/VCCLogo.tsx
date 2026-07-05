"use client";

import * as React from "react";

type LogoProps = {
  size?: number;
  showWordmark?: boolean;
  className?: string;
  animated?: boolean;
};

/**
 * VCC Shield Logo — sharp geometric "shattered glass / ruby" shield emblem.
 * Inline SVG so it scales crisply and inherits theme colors.
 *
 * [LOGO] placeholder: replace paths with the official brand artwork when supplied.
 */
export function VCCShield({
  size = 120,
  showWordmark = false,
  className = "",
  animated = false,
}: LogoProps) {
  return (
    <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 220"
        xmlns="http://www.w3.org/2000/svg"
        className={animated ? "transition-transform duration-700" : ""}
        aria-label="VCC Void Cricket Club shield emblem"
      >
        <defs>
          {/* Crimson metallic gradient */}
          <linearGradient id="vccRuby" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff4d6d" />
            <stop offset="35%" stopColor="#c8102e" />
            <stop offset="70%" stopColor="#8b0000" />
            <stop offset="100%" stopColor="#5a0009" />
          </linearGradient>
          <linearGradient id="vccRubyDark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c8102e" />
            <stop offset="100%" stopColor="#3a0006" />
          </linearGradient>
          <linearGradient id="vccHighlight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <radialGradient id="vccCore" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ff1f3d" />
            <stop offset="60%" stopColor="#8b0000" />
            <stop offset="100%" stopColor="#1a0003" />
          </radialGradient>
          <filter id="vccGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer shield silhouette — sharp angled "shattered" shield */}
        <path
          d="M100 4 L196 28 L196 110 C196 168 158 206 100 218 C42 206 4 168 4 110 L4 28 Z"
          fill="url(#vccRubyDark)"
          stroke="rgba(255,77,109,0.4)"
          strokeWidth="1"
        />

        {/* Inner shattered facet — top-left slash */}
        <path
          d="M100 4 L196 28 L160 56 L100 38 Z"
          fill="url(#vccHighlight)"
          opacity="0.65"
        />
        {/* Inner shattered facet — bottom-right slash */}
        <path
          d="M196 110 C196 168 158 206 100 218 L130 168 L170 110 Z"
          fill="rgba(0,0,0,0.35)"
        />
        {/* Center cracked core */}
        <path
          d="M100 38 L160 56 L150 120 L100 158 L50 120 L40 56 Z"
          fill="url(#vccCore)"
          filter="url(#vccGlow)"
        />
        {/* Crack lines */}
        <path
          d="M100 38 L100 158 M40 56 L160 56 M50 120 L150 120 M70 80 L130 80"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="0.6"
          fill="none"
        />
        <path
          d="M100 38 L80 80 L100 158 L120 80 Z"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.5"
          fill="none"
        />

        {/* V monogram — sharp angular V */}
        <path
          d="M62 78 L100 148 L138 78 L122 78 L100 116 L78 78 Z"
          fill="#ffffff"
          opacity="0.95"
        />
        {/* Inner V accent */}
        <path
          d="M78 78 L100 116 L122 78 L114 78 L100 100 L86 78 Z"
          fill="url(#vccRuby)"
        />

        {/* Bottom point accent */}
        <path
          d="M88 178 L100 218 L112 178 Z"
          fill="url(#vccRuby)"
          opacity="0.85"
        />
      </svg>

      {showWordmark && (
        <div className="flex flex-col items-center leading-none">
          <span
            className="font-display text-crimson-metal text-glow-crimson"
            style={{ fontSize: size * 0.28, letterSpacing: "0.12em" }}
          >
            VOID
          </span>
          <span
            className="font-heading text-zinc-400"
            style={{ fontSize: size * 0.1, letterSpacing: "0.5em" }}
          >
            CRICKET CLUB
          </span>
          <span
            className="font-mono-tech text-zinc-600"
            style={{ fontSize: size * 0.07, letterSpacing: "0.3em" }}
          >
            BAT COMPANY
          </span>
        </div>
      )}
    </div>
  );
}

/** Compact horizontal lockup for header/footer */
export function VCCWordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <VCCShield size={36} />
      <div className="flex flex-col leading-none">
        <span className="font-display text-crimson-metal text-xl tracking-[0.18em]">
          VCC
        </span>
        <span className="font-mono-tech text-[9px] text-zinc-500 tracking-[0.35em]">
          VOID CRICKET CLUB
        </span>
      </div>
    </div>
  );
}

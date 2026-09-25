import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useCopy, useLocale } from "@/i18n/LocaleContext";

const HERO_IMMEDIATE = { immediate: true };

function ScreamButton() {
  const locale = useLocale();
  const [screaming, setScreaming] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);
  return (
    <button
      aria-label="scream"
      className={`scream-btn inline-block bg-scream px-[0.08em] text-paper uppercase ${screaming ? "screaming" : ""}`}
      onClick={() => {
        setScreaming(true);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setScreaming(false), 450);
      }}
      type="button"
    >
      {screaming ? (locale === "ko" ? "아아아아" : "aaaa!") : "scream"}
    </button>
  );
}

export default function Hero() {
  const copy = useCopy();
  const ref = useReveal<HTMLElement>(HERO_IMMEDIATE);
  return (
    <section
      className="bg-hero-grid relative flex min-h-svh flex-col justify-center border-b border-ink px-6 pt-24 pb-12"
      ref={ref}
    >
      <h1 className="font-display text-[clamp(46px,10vw,140px)] leading-[0.96] font-bold tracking-[-0.02em] uppercase">
        <span className="rl">
          <span className="rl-inner">We build</span>
        </span>
        <span className="rl">
          <span className="rl-inner">things that</span>
        </span>
        <span className="rl">
          <span className="rl-inner">
            make you <ScreamButton />
          </span>
        </span>
      </h1>
      <p className="fade mt-8 max-w-xl text-[clamp(14px,1.6vw,18px)] leading-relaxed text-mist">
        — <b className="font-bold text-ink">{copy.hero.subBold}</b>{" "}
        {copy.hero.subRest}
      </p>
      <SpinBadge label={copy.a11y.toWork} />
      <a
        aria-label={copy.a11y.toWork}
        className="absolute bottom-4 left-1/2 flex size-11 -translate-x-1/2 items-center justify-center text-2xl motion-safe:animate-bounce md:hidden"
        href="#work"
      >
        <span aria-hidden>↓</span>
      </a>
    </section>
  );
}

function SpinBadge({ label }: { label: string }) {
  // The spinning ring text is decorative and sits outside the link, so the
  // link's visible content is only the arrow: its accessible name (label)
  // then satisfies WCAG 2.5.3 Label in Name. The link still covers the badge.
  return (
    <div className="group/badge absolute right-10 bottom-10 hidden size-28 md:block lg:top-1/2 lg:right-[5vw] lg:bottom-auto lg:size-[min(20vw,320px)] lg:-translate-y-1/2">
      <svg
        aria-hidden
        className="spin-slow size-full transition-colors group-hover/badge:text-scream-deep"
        viewBox="0 0 110 110"
      >
        <defs>
          <path
            d="M 55,55 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
            id="badge-circle"
          />
        </defs>
        <text
          fill="currentColor"
          fontSize="11.5"
          fontWeight="600"
          letterSpacing="0.22em"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <textPath href="#badge-circle">
            SINCE 2025 · SEOUL · AI-SCREAM ·
          </textPath>
        </text>
      </svg>
      <a
        aria-label={label}
        className="absolute inset-0 transition-colors group-hover/badge:text-scream-deep"
        href="#work"
      >
        <svg aria-hidden className="size-full" viewBox="0 0 110 110">
          <text
            fill="currentColor"
            fontSize="22"
            textAnchor="middle"
            x="55"
            y="62"
          >
            ↓
          </text>
        </svg>
      </a>
    </div>
  );
}

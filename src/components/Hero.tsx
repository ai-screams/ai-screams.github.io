import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useCopy } from "@/i18n/LocaleContext";

const HERO_IMMEDIATE = { immediate: true };

function ScreamButton() {
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
      {screaming ? "aaaa!" : "scream"}
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
      <SpinBadge />
      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-2xl motion-safe:animate-bounce md:hidden"
      >
        ↓
      </div>
    </section>
  );
}

function SpinBadge() {
  return (
    <div
      aria-hidden
      className="spin-slow absolute right-10 bottom-10 hidden size-28 md:block"
    >
      <svg className="size-full" viewBox="0 0 110 110">
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
        <text fontSize="22" textAnchor="middle" x="55" y="62">
          ↓
        </text>
      </svg>
    </div>
  );
}

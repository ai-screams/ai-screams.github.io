import { useEffect, useRef } from "react";
import { MEMBERS } from "@/data/members";
import { useLocale } from "@/i18n/LocaleContext";

const NAV_ITEMS = [
  { href: "#work", label: "WORK" },
  ...(MEMBERS.length > 0 ? [{ href: "#team", label: "TEAM" }] : []),
  { href: "#contact", label: "CONTACT" },
];

export default function SiteHeader() {
  const locale = useLocale();
  return (
    <header className="fixed inset-x-0 top-0 z-10 flex h-14 items-center justify-between border-b border-ink bg-paper px-4 sm:px-6">
      <a
        className="font-display text-base font-bold sm:text-lg"
        href={locale === "ko" ? "/ko/" : "/"}
        translate="no"
      >
        AI-SCREAM<span className="text-scream">.</span>
      </a>
      <div className="flex items-center gap-3 sm:gap-7">
        <nav className="flex gap-3 sm:gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              className="relative py-4 font-display text-xs font-semibold tracking-[0.08em] after:absolute after:bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-scream after:transition-transform hover:after:scale-x-100 sm:tracking-[0.12em]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1 border border-ink px-1 font-display text-xs font-semibold sm:px-2">
          <a
            className={`px-1.5 py-4 sm:px-2 ${locale === "en" ? "border-b-2 border-scream text-ink" : "text-mist"}`}
            href="/"
          >
            EN
          </a>
          <span className="text-ink/20">/</span>
          <a
            className={`px-1.5 py-4 sm:px-2 ${locale === "ko" ? "border-b-2 border-scream text-ink" : "text-mist"}`}
            href="/ko/"
          >
            KO
          </a>
        </div>
      </div>
      <ProgressLine />
    </header>
  );
}

function ProgressLine() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let rafId = 0;
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? scrollY / max : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);
  return (
    <div
      className="absolute top-full left-0 h-0.5 w-full origin-left scale-x-0 bg-scream"
      ref={ref}
    />
  );
}

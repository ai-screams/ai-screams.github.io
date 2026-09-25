import { useEffect, useRef } from "react";
import type { Locale } from "@/i18n/copy";
import { MEMBERS } from "@/data/members";
import { useLocale, useLocaleSwitch } from "@/i18n/LocaleContext";
import { isPlainPrimaryClick, pathForLocale } from "@/i18n/localePath";

const NAV_ITEMS = [
  { href: "#work", label: "WORK" },
  ...(MEMBERS.length > 0 ? [{ href: "#team", label: "TEAM" }] : []),
  { href: "#contact", label: "CONTACT" },
];

export default function SiteHeader() {
  const locale = useLocale();
  const switchLocale = useLocaleSwitch();
  const other: Locale = locale === "en" ? "ko" : "en";
  // Real links (new tab, no-JS and crawlers get the prerendered page); a plain
  // click switches in place instead of reloading.
  const onLocaleClick =
    (target: Locale) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isPlainPrimaryClick(e)) return;
      e.preventDefault();
      switchLocale(target, { push: true });
    };
  return (
    <header className="fixed inset-x-0 top-0 z-10 flex h-14 items-center justify-between border-b border-ink bg-paper px-4 sm:px-6">
      <a
        className="py-4 font-display text-base font-bold whitespace-nowrap max-[359px]:text-sm sm:py-3.5 sm:text-lg"
        href={locale === "ko" ? "/ko/" : "/"}
        translate="no"
      >
        AI-SCREAM<span className="text-scream-deep">.ai</span>
      </a>
      <div className="flex items-center gap-2 sm:gap-7">
        <nav className="flex gap-2 sm:gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              className="relative py-4 font-display text-xs font-semibold tracking-[0.03em] after:absolute after:bottom-3 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-scream after:transition-transform hover:after:scale-x-100 sm:tracking-[0.12em]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex h-8 items-center gap-1 border border-ink px-1 font-display text-xs font-semibold sm:px-2">
          <a
            className="relative flex h-full min-w-11 items-center justify-center before:absolute before:inset-x-0 before:-inset-y-2 before:content-[''] sm:hidden"
            href={pathForLocale(other)}
            lang={other}
            onClick={onLocaleClick(other)}
          >
            {other.toUpperCase()}
          </a>
          <div className="hidden h-full items-center gap-1 sm:flex">
            <a
              aria-current={locale === "en" ? "page" : undefined}
              className={`relative flex h-full min-w-11 items-center justify-center px-2 before:absolute before:inset-x-0 before:-inset-y-2 before:content-[''] ${locale === "en" ? "border-b-2 border-scream text-ink" : "text-mist"}`}
              href="/"
              lang="en"
              onClick={onLocaleClick("en")}
            >
              EN
            </a>
            <span className="text-ink/20">/</span>
            <a
              aria-current={locale === "ko" ? "page" : undefined}
              className={`relative flex h-full min-w-11 items-center justify-center px-2 before:absolute before:inset-x-0 before:-inset-y-2 before:content-[''] ${locale === "ko" ? "border-b-2 border-scream text-ink" : "text-mist"}`}
              href="/ko/"
              lang="ko"
              onClick={onLocaleClick("ko")}
            >
              KO
            </a>
          </div>
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

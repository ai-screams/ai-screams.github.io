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
    <header className="fixed inset-x-0 top-0 z-10 flex h-14 items-center justify-between border-b border-ink bg-paper px-6">
      <a
        className="font-display text-lg font-bold"
        href={locale === "ko" ? "/ko/" : "/"}
      >
        AI-SCREAM<span className="text-scream">.</span>
      </a>
      <div className="flex items-center gap-7">
        <nav className="hidden gap-6 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              className="relative py-2 font-display text-xs font-semibold tracking-[0.12em] after:absolute after:bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-scream after:transition-[width] hover:after:w-full"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1 border border-ink px-2 font-display text-xs font-semibold">
          <a
            className={`p-2 ${locale === "en" ? "border-b-2 border-scream text-ink" : "text-mist"}`}
            href="/"
          >
            EN
          </a>
          <span className="text-ink/20">/</span>
          <a
            className={`p-2 ${locale === "ko" ? "border-b-2 border-scream text-ink" : "text-mist"}`}
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
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      el.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update, { passive: true });
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, []);
  return (
    <div className="absolute top-full left-0 h-0.5 w-0 bg-scream" ref={ref} />
  );
}

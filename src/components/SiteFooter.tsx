import { SITE } from "@/data/site";

export default function SiteFooter() {
  return (
    <footer className="flex justify-between border-t border-paper/15 bg-ink px-6 py-4 font-display text-[11px] tracking-wider text-paper/40">
      <span translate="no">
        © 2026 AI-SCREAM{" · "}
        <a
          className="transition-colors hover:text-scream"
          href={`${SITE.github}/ai-screams.github.io/releases/tag/v${__APP_VERSION__}`}
          rel="noreferrer"
          target="_blank"
        >
          v{__APP_VERSION__}
        </a>
      </span>
      <span>SERVED COLD &amp; SWEET</span>
    </footer>
  );
}

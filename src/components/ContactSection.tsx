import { SITE } from "@/data/site";
import { useReveal } from "@/hooks/useReveal";
import { useCopy } from "@/i18n/LocaleContext";

export default function ContactSection() {
  const copy = useCopy();
  const ref = useReveal<HTMLElement>();
  return (
    <section
      className="flex flex-col items-center gap-6 bg-ink px-6 py-24 text-center text-paper"
      id="contact"
      ref={ref}
    >
      <a
        className="fade font-display text-[clamp(40px,7.5vw,96px)] font-bold tracking-[-0.02em] uppercase transition-colors hover:text-scream"
        href={SITE.github}
        rel="noreferrer"
        target="_blank"
      >
        Let&apos;s talk →
      </a>
      <p className="fade text-sm leading-relaxed text-paper/60">
        {copy.contact.line}
        <br />
        <a
          className="text-paper transition-colors hover:text-scream"
          href={SITE.github}
          rel="noreferrer"
          target="_blank"
        >
          github.com/ai-screams
        </a>
      </p>
    </section>
  );
}

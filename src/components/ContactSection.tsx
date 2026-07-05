import { SITE } from "@/data/site";
import { useReveal } from "@/hooks/useReveal";
import { useCopy } from "@/i18n/LocaleContext";

export default function ContactSection() {
  const copy = useCopy();
  const ref = useReveal<HTMLElement>();
  return (
    <section
      className="flex flex-col items-center gap-6 bg-ink px-6 py-24 text-center text-paper transition-colors duration-300 has-[.cta:hover]:bg-scream"
      id="contact"
      ref={ref}
    >
      <h2 className="sr-only">Contact</h2>
      <a
        className="cta fade font-display text-[clamp(40px,7.5vw,96px)] font-bold tracking-[-0.02em] uppercase"
        href={SITE.github}
        rel="noreferrer"
        target="_blank"
      >
        Let’s talk →
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

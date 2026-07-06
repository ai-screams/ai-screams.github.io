import type { Project } from "@/data/projects";
import TypoGraphic from "@/components/TypoGraphic";
import { useReveal } from "@/hooks/useReveal";
import { useLocale } from "@/i18n/LocaleContext";

export default function ProjectRow({
  index,
  project,
}: {
  index: number;
  project: Project;
}) {
  const locale = useLocale();
  const ref = useReveal<HTMLElement>();
  const flip = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");
  return (
    <article
      className={`group grid border-b border-ink md:min-h-[420px] ${
        flip ? "md:grid-cols-[1fr_1.15fr]" : "md:grid-cols-[1.15fr_1fr]"
      }`}
      ref={ref}
    >
      <div
        className={`bg-cell-grid relative flex min-h-60 items-center justify-center overflow-hidden border-b border-ink transition-colors group-hover:bg-scream/5 md:border-b-0 ${
          flip ? "border-ink md:order-2 md:border-l" : "border-ink md:border-r"
        }`}
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute -top-4 -z-10 font-display text-[clamp(120px,24vw,320px)] leading-none font-bold text-ink/[0.05] select-none ${flip ? "right-2 left-auto" : "left-2"}`}
        >
          {num}
        </span>
        {project.visual?.type === "image" ? (
          <img
            alt={project.visual.alt}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            src={project.visual.src}
          />
        ) : (
          <TypoGraphic
            lines={
              project.visual?.type === "text" ? project.visual.lines : undefined
            }
            name={project.name}
          />
        )}
      </div>
      <div
        className={`flex flex-col justify-center gap-4 px-6 py-8 md:px-10 md:py-12 ${flip ? "md:order-1" : ""}`}
      >
        <div className="fade">
          <div className="font-display text-[13px] font-semibold tracking-[0.2em] text-scream">
            {num} — {project.category}
          </div>
          <h3 className="mt-1 font-display text-3xl font-bold uppercase md:text-4xl">
            {project.name}
          </h3>
        </div>
        <p className="fade max-w-md leading-relaxed text-pretty text-mist">
          {project.description[locale]}
        </p>
        <div className="fade flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              className="border border-ink px-2.5 py-1 font-display text-[11px] font-medium tracking-wider"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="fade mt-1 flex gap-6">
          {project.links.homepage && (
            <a
              className="inline-flex items-center gap-2 border-b-2 border-scream pb-1 font-display text-[13px] font-semibold tracking-[0.14em] transition-colors hover:text-scream"
              href={project.links.homepage}
              rel="noreferrer"
              target="_blank"
            >
              VIEW PROJECT →
            </a>
          )}
          <a
            className="inline-flex items-center gap-2 border-b-2 border-scream pb-1 font-display text-[13px] font-semibold tracking-[0.14em] transition-colors hover:text-scream"
            href={project.links.github}
            rel="noreferrer"
            target="_blank"
          >
            GITHUB ↗
          </a>
        </div>
      </div>
    </article>
  );
}

import { type ReactElement } from "react";
import { type ProjectHighlight, type ProjectSlug } from "../types";

interface ProjectHighlightsGridProps {
  highlights: readonly ProjectHighlight[];
  slug: ProjectSlug;
}

export function ProjectHighlightsGrid({
  highlights,
  slug,
}: ProjectHighlightsGridProps): ReactElement | null {
  if (highlights.length === 0) {
    return null;
  }

  return (
    <ul className="mt-3 grid gap-3 sm:grid-cols-2" role="list">
      {highlights.map((highlight) => (
        <li className="pixel-card p-4" key={`${slug}-${highlight.id}`}>
          <p
            className="font-pixel-body text-[11px]"
            style={{ color: "var(--text-tertiary)" }}
          >
            {highlight.label}
          </p>
          <p
            className="mt-1 font-pixel text-sm"
            style={{ color: "var(--text-brand)" }}
          >
            {highlight.value}
          </p>
          {highlight.description ? (
            <p
              className="mt-2 font-pixel-body text-xs leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {highlight.description}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

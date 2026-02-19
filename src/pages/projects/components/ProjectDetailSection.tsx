import { type ReactElement } from "react";

interface ProjectDetailSectionProps {
  body: string;
  heading: string;
  headingId: string;
}

export function ProjectDetailSection({
  body,
  heading,
  headingId,
}: ProjectDetailSectionProps): ReactElement {
  return (
    <section aria-labelledby={headingId} className="pixel-dialog p-5 sm:p-6">
      <h2 className="font-pixel text-xs sm:text-sm" id={headingId}>
        <span aria-hidden="true">▶ </span>
        {heading}
      </h2>
      <p
        className="mt-3 font-pixel-body text-sm leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {body}
      </p>
    </section>
  );
}

import { type ReactElement } from "react";
import { Link } from "react-router";
import PixelDialogHeader from "../../../components/ui/PixelDialogHeader";
import SparkDivider from "../../../components/ui/SparkDivider";
import { type ProjectSummary } from "../types";
import { ProjectLinkActions } from "./ProjectLinkActions";
import { ProjectStackList } from "./ProjectStackList";

interface ProjectCardProps {
  project: ProjectSummary;
}

interface ProjectCardFrameProps {
  questLabel: string;
  project: ProjectSummary;
}

function ProjectCardFrame({
  project,
  questLabel,
}: ProjectCardFrameProps): ReactElement {
  const detailPath = `/projects/${project.slug}`;
  const headingId = `${project.slug}-title`;

  return (
    <article
      aria-labelledby={headingId}
      className="flex h-full flex-col pixel-card p-5 sm:p-6"
    >
      <PixelDialogHeader label={project.subtitle} />
      <p
        className="mt-3 inline-flex rounded-[var(--pixel-border-radius)] border border-[var(--border-default)] bg-[var(--surface)] px-2 py-1 font-pixel-body text-[11px]"
        style={{ color: "var(--text-tertiary)" }}
      >
        {questLabel}
      </p>
      <h3 className="mt-3 font-pixel text-sm sm:text-base" id={headingId}>
        <span aria-hidden="true">✦ </span>
        {project.title}
      </h3>
      <p
        className="mt-2 font-pixel-body text-xs"
        style={{ color: "var(--text-tertiary)" }}
      >
        {project.period} · {project.role}
      </p>
      <p
        className="mt-3 font-pixel-body text-sm leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {project.summary}
      </p>

      <ProjectStackList
        slug={project.slug}
        stack={project.stack}
        variant="card"
      />

      <div className="mt-auto">
        <SparkDivider className="my-4" />

        <div className="flex flex-wrap items-center gap-2">
          <Link
            className="pixel-btn text-xs text-[var(--text-primary)] transition-transform duration-150 hover:-translate-y-0.5"
            to={detailPath}
          >
            <span aria-hidden="true">▷ </span>
            상세 보기
          </Link>
          <ProjectLinkActions
            ariaLabel={`${project.title} 외부 링크`}
            links={project.links}
          />
        </div>
      </div>
    </article>
  );
}

export function MainQuestProjectCard({
  project,
}: ProjectCardProps): ReactElement {
  return <ProjectCardFrame project={project} questLabel="MAIN QUEST" />;
}

export function SideQuestProjectCard({
  project,
}: ProjectCardProps): ReactElement {
  return <ProjectCardFrame project={project} questLabel="SIDE QUEST" />;
}

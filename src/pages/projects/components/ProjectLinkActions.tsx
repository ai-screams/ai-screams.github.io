import { type ReactElement } from "react";
import { type ProjectLinks } from "../types";

type ProjectLinkActionsProps = {
  links: ProjectLinks;
} & (
  | {
      ariaLabel: string;
      ariaLabelledBy?: never;
    }
  | {
      ariaLabel?: never;
      ariaLabelledBy: string;
    }
);

interface ExternalLinkItem {
  href: string;
  key: string;
  label: string;
}

function sanitizeExternalUrl(rawUrl?: string): string | undefined {
  if (!rawUrl) {
    return undefined;
  }

  const trimmedUrl = rawUrl.trim();
  if (trimmedUrl.length === 0) {
    return undefined;
  }

  try {
    const parsedUrl = new URL(trimmedUrl);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:"
      ? parsedUrl.toString()
      : undefined;
  } catch {
    return undefined;
  }
}

export function ProjectLinkActions({
  ariaLabel,
  ariaLabelledBy,
  links,
}: ProjectLinkActionsProps): ReactElement | null {
  const externalLinks: ExternalLinkItem[] = [
    {
      href: sanitizeExternalUrl(links.demoUrl),
      key: "demo",
      label: "데모 보기",
    },
    {
      href: sanitizeExternalUrl(links.docsUrl),
      key: "docs",
      label: "문서 보기",
    },
    {
      href: sanitizeExternalUrl(links.repoUrl),
      key: "repo",
      label: "코드 보기",
    },
  ].flatMap((item) => (item.href ? [{ ...item, href: item.href }] : []));

  if (externalLinks.length === 0) {
    return null;
  }

  return (
    <div
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className="flex flex-wrap gap-2"
      role="group"
    >
      {externalLinks.map((item) => (
        <a
          className="pixel-btn text-xs text-[var(--text-primary)] transition-transform duration-150 hover:-translate-y-0.5"
          href={item.href}
          key={item.key}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span aria-hidden="true">↗ </span>
          {item.label}
          <span className="sr-only"> (새 탭)</span>
        </a>
      ))}
    </div>
  );
}

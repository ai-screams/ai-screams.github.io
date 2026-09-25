import type { Project } from "@/data/projects";

// GitHub Pages paths are case-sensitive: /Mara/ serves the Mara repo, /mara/
// falls through to this site's 404.html. The 404 page runs resolveCaseRedirect
// in the browser and sends a mis-cased first segment to its real spelling.

/** First path segments served on this domain, in their exact casing. */
export function caseRedirectRoots(
  projects: Project[],
  siteUrl: string,
): string[] {
  const roots = new Set(["ko"]);
  for (const { links } of projects) {
    const prefix = `${siteUrl}/`;
    if (!links.homepage?.startsWith(prefix)) continue;
    const segment = links.homepage.slice(prefix.length).split("/")[0];
    if (segment) roots.add(segment);
  }
  return [...roots];
}

/**
 * Corrected pathname when only the first segment's casing is wrong, else null.
 * Shipped to the browser via Function#toString, so it must stay
 * self-contained: no imports, closures, or helpers.
 */
export function resolveCaseRedirect(
  pathname: string,
  roots: string[],
): null | string {
  const match = /^\/([^/]+)(.*)$/.exec(pathname);
  if (!match) return null;
  const segment = match[1];
  for (const root of roots) {
    if (root !== segment && root.toLowerCase() === segment.toLowerCase()) {
      return `/${root}${match[2]}`;
    }
  }
  return null;
}

/** Inline <script> for 404.html: redirect before the 404 body paints. */
export function caseRedirectScript(roots: string[]): string {
  return `<script>(function(){var t=(${resolveCaseRedirect.toString()})(location.pathname,${JSON.stringify(roots)});if(t)location.replace(t+location.search+location.hash)})()</script>`;
}

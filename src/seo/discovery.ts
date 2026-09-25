import type { Project } from "@/data/projects";
import { SITE } from "@/data/site";
import { COPY, type Locale } from "@/i18n/copy";
import { pathForLocale } from "@/i18n/localePath";

// Everything search engines and AI crawlers read beyond the page itself:
// sitemap.xml, the JSON-LD graph and llms.txt. Generated from the same data
// as the page (projects.ts, copy.ts, site.ts), so a new project shows up in
// all of them without extra edits.

/** Project homepages served on this site's own origin (e.g. /Mara/). */
export function projectPagesOnSite(
  projects: Project[],
  siteUrl: string,
): string[] {
  const origin = new URL(siteUrl).origin;
  return projects.flatMap(({ links }) =>
    links.homepage && new URL(links.homepage).origin === origin
      ? [links.homepage]
      : [],
  );
}

/**
 * sitemap.xml: both locale pages (with hreflang alternates) plus the project
 * pages on this origin. lastmod is set only where it is known to be accurate
 * (Google ignores lastmod that isn't): the home pages get the date of the
 * last commit that touched site content; project pages live in other repos,
 * so they get none.
 */
export function buildSitemap(opts: {
  lastmod: null | string;
  projectUrls: string[];
  siteUrl: string;
}): string {
  const { lastmod, projectUrls, siteUrl } = opts;
  const alternates = (["en", "ko"] as const)
    .map(
      (l) =>
        `    <xhtml:link href="${siteUrl}${pathForLocale(l)}" hreflang="${l}" rel="alternate" />`,
    )
    .join("\n");
  const home = (["en", "ko"] as const).map(
    (l) => `  <url>
    <loc>${siteUrl}${pathForLocale(l)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
${alternates}
  </url>`,
  );
  const projects = projectUrls.map(
    (url) => `  <url>
    <loc>${url}</loc>
  </url>`,
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...home, ...projects].join("\n")}
</urlset>
`;
}

/**
 * JSON-LD @graph for a locale page: the Organization, the WebSite (its name
 * is what Google prefers to show as the site name) and the project list.
 * Projects are SoftwareSourceCode: no ratings or prices exist, so this helps
 * entity understanding rather than earning a software rich result.
 */
export function structuredData(locale: Locale, projects: Project[]): string {
  const meta = COPY[locale].meta;
  const org = `${SITE.url}/#organization`;
  const graph = [
    {
      "@id": org,
      "@type": "Organization",
      description: meta.description,
      email: SITE.email,
      logo: `${SITE.url}/icon-512.png`,
      name: SITE.name,
      sameAs: [SITE.github],
      url: `${SITE.url}/`,
    },
    {
      "@id": `${SITE.url}/#website`,
      "@type": "WebSite",
      alternateName: ["AI-SCREAM", "ai-scream.ai"],
      inLanguage: ["en", "ko"],
      name: SITE.name,
      publisher: { "@id": org },
      url: `${SITE.url}/`,
    },
    {
      "@type": "ItemList",
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        item: {
          "@type": "SoftwareSourceCode",
          author: { "@id": org },
          codeRepository: p.links.github,
          description: p.description[locale],
          keywords: p.tags.join(", "),
          name: p.name,
          url: p.links.homepage ?? p.links.github,
        },
        position: i + 1,
      })),
      name: locale === "ko" ? "Ai-Scream 프로젝트" : "Ai-Scream projects",
    },
  ];
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replace(/</g, "\\u003c");
}

/** llms.txt (llmstxt.org): a plain-text map of the site for AI assistants. */
export function buildLlmsTxt(projects: Project[]): string {
  const en = COPY.en.meta;
  const lines = projects.map((p) => {
    const url = p.links.homepage ?? p.links.github;
    const repo = p.links.homepage ? ` Source: ${p.links.github}` : "";
    return `- [${p.name}](${url}): ${p.description.en}${repo}`;
  });
  return `# ${SITE.name}

> ${en.description}

Contact: ${SITE.email} · GitHub: ${SITE.github}

## Projects

${lines.join("\n")}

## Pages

- [Home (English)](${SITE.url}/)
- [Home (한국어)](${SITE.url}/ko/)
`;
}

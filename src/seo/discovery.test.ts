import { describe, expect, it } from "vitest";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";
import {
  buildLlmsTxt,
  buildSitemap,
  projectPagesOnSite,
  structuredData,
} from "@/seo/discovery";

const base = PROJECTS[0];
const withHomepage = (homepage?: string) => ({
  ...base,
  links: { github: "https://github.com/ai-screams/x", homepage },
});

describe("projectPagesOnSite", () => {
  it("keeps only homepages on the site's own origin", () => {
    const pages = projectPagesOnSite(
      [
        withHomepage(`${SITE.url}/Mara/`),
        withHomepage("https://ai-screams.github.io/HwpForge/"),
        withHomepage(undefined),
      ],
      SITE.url,
    );
    expect(pages).toEqual([`${SITE.url}/Mara/`]);
  });

  it("covers every on-site project homepage in the real data", () => {
    const pages = projectPagesOnSite(PROJECTS, SITE.url);
    expect(pages).toEqual(
      expect.arrayContaining([
        `${SITE.url}/Mara/`,
        `${SITE.url}/Azimuth/`,
        `${SITE.url}/HwpForge/`,
        `${SITE.url}/scoop-uv/`,
      ]),
    );
  });
});

describe("buildSitemap", () => {
  const xml = buildSitemap({
    lastmod: "2026-09-25",
    projectUrls: [`${SITE.url}/Mara/`],
    siteUrl: SITE.url,
  });

  it("lists both locale pages with lastmod and hreflang alternates", () => {
    expect(xml).toContain(
      `<loc>${SITE.url}/</loc>\n    <lastmod>2026-09-25</lastmod>`,
    );
    expect(xml).toContain(
      `<loc>${SITE.url}/ko/</loc>\n    <lastmod>2026-09-25</lastmod>`,
    );
    expect(xml.match(/hreflang="ko"/g)).toHaveLength(2);
  });

  it("lists project pages without a lastmod it cannot know", () => {
    expect(xml).toContain(`<url>\n    <loc>${SITE.url}/Mara/</loc>\n  </url>`);
  });

  it("omits lastmod entirely when the date is unknown", () => {
    const noDate = buildSitemap({
      lastmod: null,
      projectUrls: [],
      siteUrl: SITE.url,
    });
    expect(noDate).not.toContain("<lastmod>");
  });
});

describe("structuredData", () => {
  const graph = JSON.parse(structuredData("ko", PROJECTS))["@graph"];
  const byType = (t: string) =>
    graph.find((n: { "@type": string }) => n["@type"] === t);

  it("names the site for Google's site-name feature", () => {
    expect(byType("WebSite")).toMatchObject({
      name: SITE.name,
      url: `${SITE.url}/`,
    });
  });

  it("lists every project with the page's locale description", () => {
    const items = byType("ItemList").itemListElement;
    expect(items).toHaveLength(PROJECTS.length);
    expect(items[0].item.description).toBe(PROJECTS[0].description.ko);
    expect(items[0].position).toBe(1);
  });

  it("escapes < so the JSON can't close its <script> tag", () => {
    const evil = [{ ...base, name: "</script><b>" }];
    expect(structuredData("en", evil)).not.toContain("</script>");
  });
});

describe("buildLlmsTxt", () => {
  const txt = buildLlmsTxt(PROJECTS);

  it("starts with the llmstxt.org header and summary", () => {
    expect(txt.startsWith(`# ${SITE.name}\n\n> `)).toBe(true);
  });

  it("links each project to its homepage, else its repository", () => {
    for (const p of PROJECTS) {
      expect(txt).toContain(
        `- [${p.name}](${p.links.homepage ?? p.links.github}):`,
      );
    }
  });
});

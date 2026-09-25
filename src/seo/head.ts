import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";
import { COPY, type Locale } from "@/i18n/copy";
import { pathForLocale } from "@/i18n/localePath";
import { structuredData } from "@/seo/discovery";

/** HTML 텍스트/속성 컨텍스트 이스케이프 — & 를 가장 먼저 치환해 이중 이스케이프 방지 */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Locale-dependent head values (raw, unescaped). buildHead renders them at
 *  prerender time; the client locale switch writes the same values into the
 *  live <head>, so the two can't drift. */
export function headFields(locale: Locale): {
  description: string;
  ogAltLocale: string;
  ogLocale: string;
  title: string;
  url: string;
} {
  const meta = COPY[locale].meta;
  return {
    description: meta.description,
    ogAltLocale: locale === "en" ? "ko_KR" : "en_US",
    ogLocale: locale === "en" ? "en_US" : "ko_KR",
    title: meta.title,
    url: `${SITE.url}${pathForLocale(locale)}`,
  };
}

/** JSON-LD for a locale page (Organization, WebSite, project list). Safe to
 *  embed in <script>: "<" is escaped. */
export function pageJsonLd(locale: Locale): string {
  return structuredData(locale, PROJECTS);
}

/** locale별 SEO head 마크업 생성 — 프리렌더 시 index.html의 <!--app-head-->에 주입 */
export function buildHead(locale: Locale): string {
  const fields = headFields(locale);
  const title = escapeHtml(fields.title);
  const description = escapeHtml(fields.description);
  const { ogAltLocale, ogLocale, url } = fields;
  const ogImage = `${SITE.url}/og.png`;
  const jsonLd = pageJsonLd(locale);
  return [
    `<title>${title}</title>`,
    `<meta content="${description}" name="description" />`,
    `<link href="${url}" rel="canonical" />`,
    `<link href="${SITE.url}/" hreflang="en" rel="alternate" />`,
    `<link href="${SITE.url}/ko/" hreflang="ko" rel="alternate" />`,
    `<link href="${SITE.url}/" hreflang="x-default" rel="alternate" />`,
    `<meta content="website" property="og:type" />`,
    `<meta content="${SITE.name}" property="og:site_name" />`,
    `<meta content="${title}" property="og:title" />`,
    `<meta content="${description}" property="og:description" />`,
    `<meta content="${url}" property="og:url" />`,
    `<meta content="${ogLocale}" property="og:locale" />`,
    `<meta content="${ogAltLocale}" property="og:locale:alternate" />`,
    `<meta content="${ogImage}" property="og:image" />`,
    `<meta content="${ogImage}" property="og:image:secure_url" />`,
    `<meta content="image/png" property="og:image:type" />`,
    `<meta content="1200" property="og:image:width" />`,
    `<meta content="630" property="og:image:height" />`,
    `<meta content="Ai-Scream — We build things that make you scream" property="og:image:alt" />`,
    `<meta content="summary_large_image" name="twitter:card" />`,
    `<meta content="${title}" name="twitter:title" />`,
    `<meta content="${description}" name="twitter:description" />`,
    `<meta content="${ogImage}" name="twitter:image" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join("\n    ");
}

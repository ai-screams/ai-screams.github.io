import { SITE } from "@/data/site";
import { COPY, type Locale } from "@/i18n/copy";

/** HTML 텍스트/속성 컨텍스트 이스케이프 — & 를 가장 먼저 치환해 이중 이스케이프 방지 */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** locale별 SEO head 마크업 생성 — 프리렌더 시 index.html의 <!--app-head-->에 주입 */
export function buildHead(locale: Locale): string {
  const meta = COPY[locale].meta;
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const url = locale === "en" ? `${SITE.url}/` : `${SITE.url}/ko/`;
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    sameAs: [SITE.github],
    url: `${SITE.url}/`,
  }).replace(/</g, "\\u003c");
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
    `<meta content="${locale === "en" ? "en_US" : "ko_KR"}" property="og:locale" />`,
    `<meta content="summary" name="twitter:card" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join("\n    ");
}

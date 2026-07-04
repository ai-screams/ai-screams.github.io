import { SITE } from "@/data/site";
import { COPY, type Locale } from "@/i18n/copy";

/** locale별 SEO head 마크업 생성 — 프리렌더 시 index.html의 <!--app-head-->에 주입 */
export function buildHead(locale: Locale): string {
  const meta = COPY[locale].meta;
  const url = locale === "en" ? `${SITE.url}/` : `${SITE.url}/ko/`;
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    sameAs: [SITE.github],
    url: `${SITE.url}/`,
  });
  return [
    `<title>${meta.title}</title>`,
    `<meta content="${meta.description}" name="description" />`,
    `<link href="${url}" rel="canonical" />`,
    `<link href="${SITE.url}/" hreflang="en" rel="alternate" />`,
    `<link href="${SITE.url}/ko/" hreflang="ko" rel="alternate" />`,
    `<link href="${SITE.url}/" hreflang="x-default" rel="alternate" />`,
    `<meta content="website" property="og:type" />`,
    `<meta content="${SITE.name}" property="og:site_name" />`,
    `<meta content="${meta.title}" property="og:title" />`,
    `<meta content="${meta.description}" property="og:description" />`,
    `<meta content="${url}" property="og:url" />`,
    `<meta content="${locale === "en" ? "en_US" : "ko_KR"}" property="og:locale" />`,
    `<meta content="summary" name="twitter:card" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join("\n    ");
}

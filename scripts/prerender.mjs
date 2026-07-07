import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const { render, SITE } = await import(
  pathToFileURL("dist-ssr/entry-server.js").href
);
const template = readFileSync("dist/index.html", "utf8");

for (const locale of ["en", "ko"]) {
  const { head, html } = render(locale);
  const page = template
    .replace('<html lang="en">', `<html lang="${locale}">`)
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html);
  if (locale === "en") {
    writeFileSync("dist/index.html", page);
  } else {
    mkdirSync("dist/ko", { recursive: true });
    writeFileSync("dist/ko/index.html", page);
  }
  console.log(`prerendered: ${locale}`);
}

// Generate sitemap.xml from the single source of truth (SITE.url + locales)
// with a fresh lastmod on every build.
const lastmod = new Date().toISOString().slice(0, 10);
const alternates = `    <xhtml:link href="${SITE.url}/" hreflang="en" rel="alternate" />
    <xhtml:link href="${SITE.url}/ko/" hreflang="ko" rel="alternate" />`;
const entries = ["", "ko/"]
  .map(
    (path) => `  <url>
    <loc>${SITE.url}/${path}</loc>
    <lastmod>${lastmod}</lastmod>
${alternates}
  </url>`,
  )
  .join("\n");
writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`,
);
console.log(`sitemap generated (lastmod ${lastmod})`);

import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const { llmsTxt, notFoundScript, render, SITE, sitemapXml } = await import(
  pathToFileURL("dist-ssr/entry-server.js").href
);
const template = readFileSync("dist/index.html", "utf8");

// Cloudflare Web Analytics beacon — prod build only (not vite dev), so local
// traffic isn't counted. Token is public/safe to expose in the static HTML.
const beacon = SITE.cfBeaconToken
  ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"${SITE.cfBeaconToken}"}'></script>`
  : "";

for (const locale of ["en", "ko"]) {
  const { head, html } = render(locale);
  const page = template
    .replace('<html lang="en">', `<html lang="${locale}">`)
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html)
    .replace("</body>", `  ${beacon}\n  </body>`);
  if (locale === "en") {
    writeFileSync("dist/index.html", page);
  } else {
    mkdirSync("dist/ko", { recursive: true });
    writeFileSync("dist/ko/index.html", page);
  }
  console.log(`prerendered: ${locale}`);
}

// 404.html: GitHub Pages paths are case-sensitive, so /mara/ lands here.
// Inject the redirect that sends it to /Mara/ (see src/seo/caseRedirect.ts).
const notFound = readFileSync("dist/404.html", "utf8");
if (!notFound.includes("<!--case-redirect-->")) {
  throw new Error("dist/404.html is missing the <!--case-redirect--> marker");
}
writeFileSync(
  "dist/404.html",
  notFound.replace("<!--case-redirect-->", notFoundScript),
);
console.log("404.html: case redirect injected");

// sitemap.xml: lastmod = date of the last commit touching site content, so it
// changes only when the pages do (Google ignores lastmod that isn't accurate).
// No git history (e.g. a tarball build) -> omit lastmod rather than guess.
let lastmod = null;
try {
  lastmod =
    execSync("git log -1 --format=%cs -- src public index.html", {
      encoding: "utf8",
    }).trim() || null;
} catch {
  lastmod = null;
}
writeFileSync("dist/sitemap.xml", sitemapXml(lastmod));
console.log(`sitemap generated (lastmod ${lastmod ?? "omitted"})`);

// llms.txt: plain-text site map for AI assistants (llmstxt.org).
writeFileSync("dist/llms.txt", llmsTxt);
console.log("llms.txt generated");

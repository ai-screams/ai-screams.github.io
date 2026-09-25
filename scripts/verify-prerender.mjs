import { readFileSync } from "node:fs";

const checks = [
  ["dist/index.html", '<html lang="en">'],
  ["dist/index.html", "scoop-uv"],
  ["dist/index.html", "HwpForge"],
  ["dist/index.html", 'hreflang="ko"'],
  ["dist/index.html", '"@type":"Organization"'],
  ["dist/index.html", "The good kind of scream."],
  [
    "dist/index.html",
    'content="https://ai-scream.ai/og.png" property="og:image"',
  ],
  ["dist/index.html", 'content="summary_large_image"'],
  ["dist/index.html", 'rel="manifest"'],
  ["dist/index.html", "static.cloudflareinsights.com/beacon.min.js"],
  ["dist/ko/index.html", '<html lang="ko">'],
  ["dist/ko/index.html", "기분 좋은 비명입니다."],
  ["dist/ko/index.html", 'href="https://ai-scream.ai/ko/" rel="canonical"'],
  ["dist/sitemap.xml", "https://ai-scream.ai/ko/"],
  ["dist/sitemap.xml", "<lastmod>"],
  ["dist/sitemap.xml", "<loc>https://ai-scream.ai/Mara/</loc>"],
  ["dist/index.html", '"@type":"WebSite"'],
  ["dist/index.html", '"@type":"ItemList"'],
  ["dist/llms.txt", "# Ai-Scream"],
  ["dist/llms.txt", "https://ai-scream.ai/Azimuth/"],
  ["dist/index.html", 'href="mailto:commander@ai-scream.ai"'],
  ["dist/index.html", '"email":"commander@ai-scream.ai"'],
  ["dist/ko/index.html", 'href="mailto:commander@ai-scream.ai"'],
  // Locale links stay real anchors: no-JS visitors, new tabs and crawlers
  // navigate to the other prerendered page.
  ["dist/index.html", 'href="/ko/" lang="ko"'],
  ["dist/ko/index.html", 'href="/" lang="en"'],
  ["dist/404.html", "location.replace"],
  ["dist/404.html", '"Mara"'],
];

let failed = 0;
for (const [file, needle] of checks) {
  const html = readFileSync(file, "utf8");
  if (!html.includes(needle)) {
    console.error(`FAIL: ${file} missing ${JSON.stringify(needle)}`);
    failed += 1;
  }
}
// Run the case-redirect script exactly as shipped in dist/404.html (not the
// source the unit tests import), with a fake location.
const notFound = readFileSync("dist/404.html", "utf8");
const script = /<script>(\(function\(\)\{var t=[\s\S]*?)<\/script>/.exec(
  notFound,
);
const redirectFor = (pathname) => {
  let replaced = null;
  const location = {
    hash: "#top",
    pathname,
    replace: (url) => (replaced = url),
    search: "?q=1",
  };
  new Function("location", script[1])(location);
  return replaced;
};
const redirectCases = [
  ["/mara/docs", "/Mara/docs?q=1#top"],
  ["/MARA", "/Mara?q=1#top"],
  ["/KO/", "/ko/?q=1#top"],
  ["/Mara/x", null],
  ["//mara/", null],
];
for (const [pathname, expected] of redirectCases) {
  let actual;
  try {
    actual = script ? redirectFor(pathname) : "no script";
  } catch (error) {
    actual = `threw ${error.message}`;
  }
  if (actual !== expected) {
    console.error(
      `FAIL: 404 redirect ${pathname} -> ${actual}, expected ${expected}`,
    );
    failed += 1;
  }
}

if (failed > 0) process.exit(1);
console.log(
  `prerender verified: ${checks.length + redirectCases.length} checks passed`,
);

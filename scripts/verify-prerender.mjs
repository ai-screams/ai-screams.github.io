import { readFileSync } from "node:fs";

const checks = [
  ["dist/index.html", '<html lang="en">'],
  ["dist/index.html", "scoop-uv"],
  ["dist/index.html", "HwpForge"],
  ["dist/index.html", 'hreflang="ko"'],
  ["dist/index.html", '"@type":"Organization"'],
  ["dist/index.html", "The good kind of scream."],
  ["dist/index.html", 'content="https://ai-scream.ai/og.png" property="og:image"'],
  ["dist/index.html", 'content="summary_large_image"'],
  ["dist/index.html", 'rel="manifest"'],
  ["dist/ko/index.html", '<html lang="ko">'],
  ["dist/ko/index.html", "기분 좋은 비명입니다."],
  [
    "dist/ko/index.html",
    'href="https://ai-scream.ai/ko/" rel="canonical"',
  ],
];

let failed = 0;
for (const [file, needle] of checks) {
  const html = readFileSync(file, "utf8");
  if (!html.includes(needle)) {
    console.error(`FAIL: ${file} missing ${JSON.stringify(needle)}`);
    failed += 1;
  }
}
if (failed > 0) process.exit(1);
console.log(`prerender verified: ${checks.length} checks passed`);

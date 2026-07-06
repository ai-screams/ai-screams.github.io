import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const { render } = await import(pathToFileURL("dist-ssr/entry-server.js").href);
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

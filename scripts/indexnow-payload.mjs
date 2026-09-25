// Builds the IndexNow POST body (https://www.indexnow.org/documentation) for
// the pages this repo owns. Run after `npm run build`; prints JSON to stdout.
//
// Which URLs: the sitemap entries that carry a <lastmod>. discovery.ts gives
// lastmod only to this site's own locale pages; project pages (/Mara/, ...)
// live in other repos and change there, so they are not resubmitted here.
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

/** Payload for the given sitemap XML and IndexNow key. */
export function buildIndexNowPayload(sitemapXml, key) {
  const urlList = [...sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/g)]
    .map((m) => m[1])
    .filter((block) => block.includes("<lastmod>"))
    .map((block) => /<loc>([^<]+)<\/loc>/.exec(block)[1]);
  if (urlList.length === 0) throw new Error("no sitemap URL has a lastmod");
  const { host, origin } = new URL(urlList[0]);
  return { host, key, keyLocation: `${origin}/${key}.txt`, urlList };
}

/** The key file in public/: <32 hex>.txt whose content is its own name. */
export function findKey(publicDir) {
  for (const name of readdirSync(publicDir)) {
    const m = /^([0-9a-f]{32})\.txt$/.exec(name);
    if (m && readFileSync(`${publicDir}/${name}`, "utf8").trim() === m[1]) {
      return m[1];
    }
  }
  throw new Error(`no IndexNow key file in ${publicDir}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const payload = buildIndexNowPayload(
    readFileSync("dist/sitemap.xml", "utf8"),
    findKey("public"),
  );
  process.stdout.write(JSON.stringify(payload));
}

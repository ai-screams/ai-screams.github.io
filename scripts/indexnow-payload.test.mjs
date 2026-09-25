import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildIndexNowPayload, findKey } from "./indexnow-payload.mjs";

const sitemap = `<urlset>
  <url>
    <loc>https://ai-scream.ai/</loc>
    <lastmod>2026-09-25</lastmod>
  </url>
  <url>
    <loc>https://ai-scream.ai/ko/</loc>
    <lastmod>2026-09-25</lastmod>
  </url>
  <url>
    <loc>https://ai-scream.ai/Mara/</loc>
  </url>
</urlset>`;

describe("buildIndexNowPayload", () => {
  const key = "0123456789abcdef0123456789abcdef";

  it("submits only this site's own pages (the ones with lastmod)", () => {
    expect(buildIndexNowPayload(sitemap, key)).toEqual({
      host: "ai-scream.ai",
      key,
      keyLocation: `https://ai-scream.ai/${key}.txt`,
      urlList: ["https://ai-scream.ai/", "https://ai-scream.ai/ko/"],
    });
  });

  it("refuses to build an empty submission", () => {
    expect(() =>
      buildIndexNowPayload(
        "<urlset><url><loc>https://x/</loc></url></urlset>",
        key,
      ),
    ).toThrow(/lastmod/);
  });
});

describe("findKey", () => {
  it("finds the key file whose content is its own name", () => {
    const dir = mkdtempSync(join(tmpdir(), "indexnow-"));
    writeFileSync(join(dir, "robots.txt"), "User-agent: *");
    writeFileSync(
      join(dir, "00000000000000000000000000000000.txt") /* sorts first */,
      "not-the-key",
    );
    writeFileSync(
      join(dir, "0123456789abcdef0123456789abcdef.txt"),
      "0123456789abcdef0123456789abcdef\n",
    );
    expect(findKey(dir)).toBe("0123456789abcdef0123456789abcdef");
  });

  it("finds the real key in public/", () => {
    expect(findKey("public")).toBe("3572d631c809c266c8668df8a7e0e288");
  });
});

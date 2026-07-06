import { describe, expect, it } from "vitest";
import { buildHead, escapeHtml } from "@/seo/head";

describe("escapeHtml", () => {
  it('escapes &, <, >, and " with & escaped first', () => {
    expect(escapeHtml('a"b<c&d')).toBe("a&quot;b&lt;c&amp;d");
  });

  it("does not double-escape ampersands introduced by other replacements", () => {
    expect(escapeHtml("<>")).toBe("&lt;&gt;");
  });
});

describe("buildHead", () => {
  it("uses site root as canonical for en", () => {
    expect(buildHead("en")).toContain(
      '<link href="https://ai-screams.github.io/" rel="canonical" />',
    );
  });

  it("uses /ko/ as canonical for ko", () => {
    expect(buildHead("ko")).toContain(
      '<link href="https://ai-screams.github.io/ko/" rel="canonical" />',
    );
  });

  it("includes en, ko, and x-default hreflang alternates", () => {
    const head = buildHead("en");
    expect(head).toContain('hreflang="en"');
    expect(head).toContain('hreflang="ko"');
    expect(head).toContain('hreflang="x-default"');
  });

  it("embeds parseable Organization JSON-LD", () => {
    const head = buildHead("en");
    const match = /<script type="application\/ld\+json">(.+?)<\/script>/s.exec(
      head,
    );
    expect(match).not.toBeNull();
    const data = JSON.parse(match![1]) as { "@type": string; name: string };
    expect(data["@type"]).toBe("Organization");
    expect(data.name).toBe("Ai-Scream");
  });

  it("localizes title", () => {
    expect(buildHead("en")).toContain(
      "<title>Ai-Scream — AI Developer Collective</title>",
    );
    expect(buildHead("ko")).toContain(
      "<title>Ai-Scream — AI 개발자 콜렉티브</title>",
    );
  });
});

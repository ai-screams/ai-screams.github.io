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
      '<link href="https://ai-scream.ai/" rel="canonical" />',
    );
  });

  it("uses /ko/ as canonical for ko", () => {
    expect(buildHead("ko")).toContain(
      '<link href="https://ai-scream.ai/ko/" rel="canonical" />',
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

  it("includes an absolute og:image with dimensions and a large twitter card", () => {
    const head = buildHead("en");
    expect(head).toContain(
      '<meta content="https://ai-scream.ai/og.png" property="og:image" />',
    );
    expect(head).toContain('content="1200" property="og:image:width"');
    expect(head).toContain('content="630" property="og:image:height"');
    expect(head).toContain('property="og:image:alt"');
    expect(head).toContain('content="summary_large_image" name="twitter:card"');
    expect(head).toContain(
      '<meta content="https://ai-scream.ai/og.png" name="twitter:image" />',
    );
  });

  it("declares the alternate og:locale per page", () => {
    expect(buildHead("en")).toContain(
      '<meta content="ko_KR" property="og:locale:alternate" />',
    );
    expect(buildHead("ko")).toContain(
      '<meta content="en_US" property="og:locale:alternate" />',
    );
  });

  it("adds logo and description to the Organization JSON-LD", () => {
    const match = /<script type="application\/ld\+json">(.+?)<\/script>/s.exec(
      buildHead("en"),
    );
    const data = JSON.parse(match![1]) as { description: string; logo: string };
    expect(data.logo).toBe("https://ai-scream.ai/icon-512.png");
    expect(data.description.length).toBeGreaterThan(0);
  });
});

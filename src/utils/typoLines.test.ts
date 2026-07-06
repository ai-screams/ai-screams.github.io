import { describe, expect, it } from "vitest";
import { typoLines } from "@/utils/typoLines";

describe("typoLines", () => {
  it("splits hyphenated names into two lines", () => {
    expect(typoLines("scoop-uv")).toEqual(["SCOOP", "UV"]);
  });

  it("keeps short single-token names on one line", () => {
    expect(typoLines("howl")).toEqual(["HOWL"]);
  });

  it("splits camelCase names at the case boundary", () => {
    expect(typoLines("HwpForge")).toEqual(["HWP", "FORGE"]);
  });

  it("keeps single tokens of 8 chars or fewer on one line", () => {
    expect(typoLines("Azimuth")).toEqual(["AZIMUTH"]);
  });

  it("splits long single tokens at the midpoint", () => {
    expect(typoLines("supercalifr")).toEqual(["SUPERC", "ALIFR"]);
  });

  it("joins 3+ tokens into two lines", () => {
    expect(typoLines("my-cool-tool")).toEqual(["MY", "COOL TOOL"]);
  });

  it("keeps non-Latin script tokens instead of discarding them", () => {
    expect(typoLines("abc-스쿱-def")).toEqual(["ABC", "스쿱 DEF"]);
  });

  it("mid-splits a long single-token Korean name by codepoint, not byte", () => {
    expect(typoLines("아이스크림스쿱유브이")).toEqual([
      "아이스크림",
      "스쿱유브이",
    ]);
  });

  it("treats non-letter symbols (e.g. emoji) as separators without corrupting surrogates", () => {
    const lines = typoLines("가나다라😀마바사");
    expect(lines).toEqual(["가나다라", "마바사"]);
    for (const line of lines) {
      expect(/[\uD800-\uDFFF]/.test(line)).toBe(false);
    }
  });

  it("keeps a supplementary-plane surrogate pair intact when mid-splitting", () => {
    // U+1D54F (𝕏, mathematical double-struck capital X) is \p{L} and encodes
    // as a surrogate pair — a naive UTF-16-unit midpoint slice would sever it.
    expect(typoLines("Azimuth𝕏Compass")).toEqual(["AZIMUTH𝕏", "COMPASS"]);
  });
});

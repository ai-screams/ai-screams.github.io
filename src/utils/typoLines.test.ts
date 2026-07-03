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
});

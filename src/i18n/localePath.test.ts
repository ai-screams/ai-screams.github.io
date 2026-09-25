import { describe, expect, it } from "vitest";
import {
  isPlainPrimaryClick,
  localeFromPath,
  pathForLocale,
} from "@/i18n/localePath";

describe("localeFromPath", () => {
  it.each([
    ["/", "en"],
    ["/ko/", "ko"],
    ["/ko", "ko"],
    ["/ko/index.html", "ko"],
    ["/korea/", "en"], // prefix alone is not the locale segment
    ["/ko/other", "en"], // only the Korean home page itself
    ["/KO/", "en"], // 404.html redirects this to /ko/ before the app loads
  ])("%s -> %s", (path, locale) => {
    expect(localeFromPath(path)).toBe(locale);
  });
});

describe("pathForLocale", () => {
  it("maps each locale to its prerendered page and back", () => {
    expect(pathForLocale("en")).toBe("/");
    expect(pathForLocale("ko")).toBe("/ko/");
    expect(localeFromPath(pathForLocale("ko"))).toBe("ko");
    expect(localeFromPath(pathForLocale("en"))).toBe("en");
  });
});

describe("isPlainPrimaryClick", () => {
  const plain = {
    altKey: false,
    button: 0,
    ctrlKey: false,
    defaultPrevented: false,
    metaKey: false,
    shiftKey: false,
  };

  it("accepts a plain left click", () => {
    expect(isPlainPrimaryClick(plain)).toBe(true);
  });

  it.each([
    ["middle button", { button: 1 }],
    ["cmd-click (new tab on macOS)", { metaKey: true }],
    ["ctrl-click (new tab elsewhere)", { ctrlKey: true }],
    ["shift-click (new window)", { shiftKey: true }],
    ["alt-click (download)", { altKey: true }],
    ["already handled", { defaultPrevented: true }],
  ])("leaves %s to the browser", (_, override) => {
    expect(isPlainPrimaryClick({ ...plain, ...override })).toBe(false);
  });
});

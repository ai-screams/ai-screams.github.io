import { describe, expect, it } from "vitest";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";
import {
  caseRedirectRoots,
  caseRedirectScript,
  resolveCaseRedirect,
} from "@/seo/caseRedirect";

const roots = caseRedirectRoots(PROJECTS, SITE.url);

describe("caseRedirectRoots", () => {
  it("collects project Pages roots on this domain plus the ko locale", () => {
    expect(roots).toEqual(
      expect.arrayContaining(["Azimuth", "HwpForge", "Mara", "ko", "scoop-uv"]),
    );
  });

  it("reads the path segment of a homepage with a query or hash", () => {
    const homepage = `${SITE.url}/Foo?ref=x#top`;
    const withQuery = [{ ...PROJECTS[0], links: { github: "", homepage } }];
    expect(caseRedirectRoots(withQuery, SITE.url)).toEqual(["ko", "Foo"]);
  });

  it("fails the build on roots that differ only by case", () => {
    // They would redirect into each other: /Ko/ -> /ko/ -> ... never settles.
    const homepage = `${SITE.url}/Ko/`;
    const clash = [{ ...PROJECTS[0], links: { github: "", homepage } }];
    expect(() => caseRedirectRoots(clash, SITE.url)).toThrow(/duplicate/);
  });

  it("adds no empty root for a homepage at the site root", () => {
    const homepage = `${SITE.url}/`;
    const atRoot = [{ ...PROJECTS[0], links: { github: "", homepage } }];
    expect(caseRedirectRoots(atRoot, SITE.url)).toEqual(["ko"]);
  });

  it("ignores homepages on other domains", () => {
    // Fails if the siteUrl prefix check is dropped: slicing this URL by the
    // prefix length would add a bogus "i-screams" root.
    const homepage = "https://github.com/ai-screams/Foo";
    const external = [{ ...PROJECTS[0], links: { github: "", homepage } }];
    expect(caseRedirectRoots(external, SITE.url)).toEqual(["ko"]);
  });
});

describe("resolveCaseRedirect", () => {
  it.each([
    ["/mara/", "/Mara/"],
    ["/MARA", "/Mara"],
    ["/mara/docs/Guide.html", "/Mara/docs/Guide.html"],
    ["/hwpforge/", "/HwpForge/"],
    ["/SCOOP-UV/", "/scoop-uv/"],
    ["/KO/", "/ko/"],
  ])("redirects %s to %s", (from, to) => {
    expect(resolveCaseRedirect(from, roots)).toBe(to);
  });

  it.each([
    "/Mara/", // already exact: redirecting would loop
    "/Mara/missing",
    "/nope/",
    "/",
    "//mara/", // never emit a protocol-relative URL
  ])("leaves %s alone", (path) => {
    expect(resolveCaseRedirect(path, roots)).toBeNull();
  });

  it("never bounces an exact root to a case twin", () => {
    // Defense in depth behind the build-time duplicate check.
    expect(resolveCaseRedirect("/Mara/x", ["mara", "Mara"])).toBeNull();
  });
});

describe("caseRedirectScript", () => {
  it("ships a self-contained function that runs outside the module", () => {
    const script = caseRedirectScript(roots);
    const body = script.replace(/^<script>|<\/script>$/g, "");
    const location = {
      hash: "#top",
      pathname: "/mara/docs",
      replace(url: string) {
        this.replaced = url;
      },
      replaced: "",
      search: "?q=1",
    };
    new Function("location", body)(location);
    expect(location.replaced).toBe("/Mara/docs?q=1#top");
  });
});

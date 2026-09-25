import type { Locale } from "@/i18n/copy";

/** Locale served at a pathname: /ko, /ko/ and /ko/index.html are Korean,
 *  everything else English. */
export function localeFromPath(pathname: string): Locale {
  return /^\/ko(\/(index\.html)?)?$/.test(pathname) ? "ko" : "en";
}

/** Canonical path of each locale's prerendered page. */
export function pathForLocale(locale: Locale): string {
  return locale === "ko" ? "/ko/" : "/";
}

/**
 * True only for a plain primary click, the one case the in-page locale switch
 * handles. Modified clicks (new tab/window, download) keep the real <a href>.
 */
export function isPlainPrimaryClick(e: {
  altKey: boolean;
  button: number;
  ctrlKey: boolean;
  defaultPrevented: boolean;
  metaKey: boolean;
  shiftKey: boolean;
}): boolean {
  return (
    e.button === 0 &&
    !e.defaultPrevented &&
    !e.metaKey &&
    !e.ctrlKey &&
    !e.shiftKey &&
    !e.altKey
  );
}

import type { Locale } from "@/i18n/copy";
import { headFields, pageJsonLd } from "@/seo/head";

// Browser-only helpers for the in-page locale switch. Called from event
// handlers, never during render, so they are SSR-safe.

export interface ScrollAnchor {
  el: Element;
  top: number;
}

/** Bottom edge of whatever is pinned to the top of the viewport: the fixed
 *  header plus a stuck SectionLabel (class "sticky") when one is at the top. */
function pinnedBottom(): number {
  let bottom = 0;
  for (const el of document.querySelectorAll("header, .sticky")) {
    const r = el.getBoundingClientRect();
    if (r.top <= bottom + 1 && r.bottom > bottom) bottom = r.bottom;
  }
  return bottom;
}

/**
 * The deepest element crossing a reference line just below the pinned bars,
 * with its viewport top. Deepest, so a text change in an earlier paragraph of
 * the same project row still gets compensated.
 */
export function captureAnchor(): null | ScrollAnchor {
  const y = pinnedBottom() + 8;
  if (y >= innerHeight) return null;
  const hits = document.elementsFromPoint(innerWidth / 2, y);
  const el = hits.find(
    (h) =>
      !h.closest("header, .sticky") &&
      h !== document.documentElement &&
      h !== document.body,
  );
  return el ? { el, top: el.getBoundingClientRect().top } : null;
}

/** Scroll so the anchor sits where it was. Relative to the current scroll
 *  position, so it is correct whatever the browser adjusted in between. */
export function restoreAnchor(anchor: null | ScrollAnchor): void {
  if (!anchor || !anchor.el.isConnected) return;
  const delta = anchor.el.getBoundingClientRect().top - anchor.top;
  if (Math.abs(delta) < 0.5) return;
  scrollTo({ behavior: "instant", top: scrollY + delta });
}

function setAttr(selector: string, attr: string, value: string): void {
  document.querySelector(selector)?.setAttribute(attr, value);
}

/** Write the locale's head values into the live document (the same values
 *  buildHead prerenders), so title, bookmarks and shares follow the switch. */
export function syncHead(locale: Locale): void {
  const f = headFields(locale);
  document.documentElement.lang = locale;
  document.title = f.title;
  setAttr('meta[name="description"]', "content", f.description);
  setAttr('link[rel="canonical"]', "href", f.url);
  setAttr('meta[property="og:title"]', "content", f.title);
  setAttr('meta[property="og:description"]', "content", f.description);
  setAttr('meta[property="og:url"]', "content", f.url);
  setAttr('meta[property="og:locale"]', "content", f.ogLocale);
  setAttr('meta[property="og:locale:alternate"]', "content", f.ogAltLocale);
  setAttr('meta[name="twitter:title"]', "content", f.title);
  setAttr('meta[name="twitter:description"]', "content", f.description);
  const ld = document.querySelector('script[type="application/ld+json"]');
  if (ld) ld.textContent = pageJsonLd(locale);
}

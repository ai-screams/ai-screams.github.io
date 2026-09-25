import {
  createContext,
  type ReactNode,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { COPY, type Copy, type Locale } from "@/i18n/copy";
import { localeFromPath, pathForLocale } from "@/i18n/localePath";
import { captureAnchor, restoreAnchor, syncHead } from "@/i18n/switchDom";

type SwitchLocale = (next: Locale, options: { push: boolean }) => void;

const LocaleContext = createContext<Locale>("en");
const LocaleSwitchContext = createContext<SwitchLocale>(() => {
  throw new Error("useLocaleSwitch() used outside <LocaleProvider>");
});

/**
 * Holds the page locale. Switching EN <-> KO happens in place (no reload):
 * the text re-renders, the URL and <head> follow, and the reading position
 * is kept by re-pinning the element that was at the top of the viewport.
 * The prerendered / and /ko/ pages stay the SEO source of truth.
 */
export function LocaleProvider({
  children,
  locale: initial,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  const [locale, setLocale] = useState(initial);
  const [announcement, setAnnouncement] = useState("");
  // Authoritative target locale: updated before any deferred view-transition
  // callback runs, so rapid clicks never act on a stale value.
  const current = useRef(initial);
  // Generation of the latest request. skipTransition() does not cancel an
  // older transition's update callback, and the platform may run it after a
  // newer one; only the latest generation may touch the DOM, history or the
  // live region.
  const generation = useRef(0);
  const transition = useRef<null | ViewTransition>(null);

  const switchLocale = useCallback<SwitchLocale>((next, { push }) => {
    if (next === current.current) return;
    current.current = next;
    const id = ++generation.current;
    const isLatest = () => id === generation.current;
    transition.current?.skipTransition();

    const anchor = captureAnchor();
    const root = document.documentElement;
    const update = () => {
      if (!isLatest()) return;
      // The browser's own scroll anchoring would fight the manual correction.
      root.style.overflowAnchor = "none";
      flushSync(() => setLocale(next));
      syncHead(next);
      // Already there when a skipped request never ran (KO then EN quickly).
      if (push && localeFromPath(location.pathname) !== next) {
        history.pushState(
          { ...history.state, locale: next },
          "",
          pathForLocale(next) + location.search + location.hash,
        );
      }
      restoreAnchor(anchor);
    };
    const settle = () => {
      if (!isLatest()) return;
      setAnnouncement(COPY[next].a11y.localeChanged);
      // Korean glyphs of the dynamic-subset font can arrive after the switch
      // and reflow the text; pin the anchor once more when they have.
      void document.fonts.ready.then(() =>
        requestAnimationFrame(() => {
          if (isLatest()) restoreAnchor(anchor);
        }),
      );
    };
    const restoreAnchoring = () => {
      if (isLatest()) root.style.overflowAnchor = "";
    };

    const animate =
      push &&
      typeof document.startViewTransition === "function" &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!animate) {
      try {
        update();
      } finally {
        restoreAnchoring();
      }
      settle();
      return;
    }
    const t = document.startViewTransition(update);
    transition.current = t;
    t.updateCallbackDone.then(() => {
      restoreAnchoring();
      settle();
    }, restoreAnchoring);
    // A skipped transition rejects ready/finished by design; consume them.
    t.ready.catch(() => {});
    const clear = () => {
      if (transition.current === t) transition.current = null;
    };
    t.finished.then(clear, clear);
  }, []);

  useEffect(() => {
    history.replaceState({ ...history.state, locale: current.current }, "");
    // Back/forward across a switch. Hash links fire popstate too; for those
    // the path's locale equals the current one and switchLocale is a no-op.
    const onPopState = () =>
      switchLocale(localeFromPath(location.pathname), { push: false });
    addEventListener("popstate", onPopState);
    return () => removeEventListener("popstate", onPopState);
  }, [switchLocale]);

  return (
    <LocaleContext value={locale}>
      <LocaleSwitchContext value={switchLocale}>
        {children}
        <p aria-live="polite" className="sr-only">
          {announcement}
        </p>
      </LocaleSwitchContext>
    </LocaleContext>
  );
}

export function useCopy(): Copy {
  return COPY[use(LocaleContext)];
}

export function useLocale(): Locale {
  return use(LocaleContext);
}

export function useLocaleSwitch(): SwitchLocale {
  return use(LocaleSwitchContext);
}

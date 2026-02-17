import { useCallback, useLayoutEffect, useState } from "react";
import type { ColorScheme } from "../styles/tokens";

const STORAGE_KEY = "ai-scream-scheme";

const VALID_SCHEMES = new Set<ColorScheme>(["aurora", "cotton", "peach"]);

export function useColorScheme() {
  const [scheme, setSchemeState] = useState<ColorScheme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return VALID_SCHEMES.has(stored as ColorScheme)
      ? (stored as ColorScheme)
      : "aurora";
  });

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-scheme", scheme);
    localStorage.setItem(STORAGE_KEY, scheme);
  }, [scheme]);

  const setScheme = useCallback((s: ColorScheme) => {
    setSchemeState(s);
  }, []);

  return { scheme, setScheme } as const;
}

import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import type { Locale } from "@/i18n/copy";
import App from "@/App";
import { localeFromPath } from "@/i18n/localePath";
import "@/index.css";

// Production: the prerendered <html lang> (matches the server HTML, so hydration
// is clean). Dev serves the EN template for every path, so read ?lang= or the
// path (/ko/) instead.
const devLang = import.meta.env.DEV
  ? new URLSearchParams(location.search).get("lang")
  : null;
const locale: Locale = import.meta.env.DEV
  ? devLang === "ko"
    ? "ko"
    : localeFromPath(location.pathname)
  : document.documentElement.lang === "ko"
    ? "ko"
    : "en";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App locale={locale} />
  </StrictMode>
);

if (root.firstElementChild !== null) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}

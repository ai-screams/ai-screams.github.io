import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import type { Locale } from "@/i18n/copy";
import App from "@/App";
import "@/index.css";

const devLang = import.meta.env.DEV
  ? new URLSearchParams(location.search).get("lang")
  : null;
const locale: Locale =
  devLang === "ko" || document.documentElement.lang === "ko" ? "ko" : "en";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App locale={locale} />
  </StrictMode>
);

if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}

import { renderToString } from "react-dom/server";
import type { Locale } from "@/i18n/copy";
import App from "@/App";
import { SITE } from "@/data/site";
import { buildHead } from "@/seo/head";

export { SITE };

export function render(locale: Locale): { head: string; html: string } {
  return {
    head: buildHead(locale),
    html: renderToString(<App locale={locale} />),
  };
}

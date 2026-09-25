import { renderToString } from "react-dom/server";
import type { Locale } from "@/i18n/copy";
import App from "@/App";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";
import { caseRedirectRoots, caseRedirectScript } from "@/seo/caseRedirect";
import { buildHead } from "@/seo/head";

export { SITE };

export const notFoundScript = caseRedirectScript(
  caseRedirectRoots(PROJECTS, SITE.url),
);

export function render(locale: Locale): { head: string; html: string } {
  return {
    head: buildHead(locale),
    html: renderToString(<App locale={locale} />),
  };
}

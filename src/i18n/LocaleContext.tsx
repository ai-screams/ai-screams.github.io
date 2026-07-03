import { createContext, type ReactNode, use } from "react";
import { COPY, type Copy, type Locale } from "@/i18n/copy";

const LocaleContext = createContext<Locale>("en");

export function LocaleProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  return <LocaleContext value={locale}>{children}</LocaleContext>;
}

export function useCopy(): Copy {
  return COPY[use(LocaleContext)];
}

export function useLocale(): Locale {
  return use(LocaleContext);
}

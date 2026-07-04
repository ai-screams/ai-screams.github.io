import type { Locale } from "@/i18n/copy";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import { LocaleProvider } from "@/i18n/LocaleContext";

export default function App({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider locale={locale}>
      <main>
        <Hero />
        <Marquee />
      </main>
    </LocaleProvider>
  );
}

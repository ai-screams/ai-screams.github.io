import type { Locale } from "@/i18n/copy";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import TeamSection from "@/components/TeamSection";
import WorkSection from "@/components/WorkSection";
import { LocaleProvider, useCopy } from "@/i18n/LocaleContext";

function SkipLink() {
  const copy = useCopy();
  return (
    <a
      className="sr-only focus:not-sr-only focus:fixed focus:top-16 focus:left-4 focus:z-20 focus:bg-paper focus:px-4 focus:py-2"
      href="#work"
    >
      {copy.a11y.skip}
    </a>
  );
}

export default function App({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider locale={locale}>
      <SkipLink />
      <SiteHeader />
      <main>
        <Hero />
        <Marquee />
        <WorkSection />
        <TeamSection />
        <ContactSection />
        <Marquee reverse tone="ink" />
      </main>
      <SiteFooter />
      <CustomCursor />
    </LocaleProvider>
  );
}

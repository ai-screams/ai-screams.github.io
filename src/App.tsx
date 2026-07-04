import type { Locale } from "@/i18n/copy";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import SiteFooter from "@/components/SiteFooter";
import TeamSection from "@/components/TeamSection";
import WorkSection from "@/components/WorkSection";
import { LocaleProvider } from "@/i18n/LocaleContext";

export default function App({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider locale={locale}>
      <main>
        <Hero />
        <Marquee />
        <WorkSection />
        <TeamSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </LocaleProvider>
  );
}

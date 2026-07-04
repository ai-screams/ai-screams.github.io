import type { Locale } from "@/i18n/copy";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import TeamSection from "@/components/TeamSection";
import WorkSection from "@/components/WorkSection";
import { LocaleProvider } from "@/i18n/LocaleContext";

export default function App({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider locale={locale}>
      <SiteHeader />
      <main>
        <Hero />
        <Marquee />
        <WorkSection />
        <TeamSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <CustomCursor />
    </LocaleProvider>
  );
}

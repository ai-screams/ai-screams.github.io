import { type ReactElement } from "react";
import { CharacterSection } from "./about/components/CharacterSection";
import { EquipmentSection } from "./about/components/EquipmentSection";
import { QuestSection } from "./about/components/QuestSection";
import { ScrollReveal } from "./about/components/ScrollReveal";
import { SectionDivider } from "./about/components/SectionDivider";

export default function About(): ReactElement {
  return (
    <section className="mx-auto max-w-5xl pixel-dot-bg px-6 py-24">
      <ScrollReveal>
        <h1
          className="pixel-glow-pulse font-pixel text-base sm:text-lg md:text-2xl"
          style={{ color: "var(--text-brand)" }}
        >
          ★ ABOUT
        </h1>
        <p
          className="mt-3 font-pixel-body text-sm sm:text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          모험가의 기록
        </p>
      </ScrollReveal>
      <SectionDivider className="mt-6" />
      <CharacterSection />
      <SectionDivider className="mt-12" />
      <EquipmentSection />
      <SectionDivider className="mt-12" />
      <QuestSection />
    </section>
  );
}

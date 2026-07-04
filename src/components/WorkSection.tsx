import ProjectRow from "@/components/ProjectRow";
import SectionLabel from "@/components/SectionLabel";
import { PROJECTS } from "@/data/projects";
import { useCopy } from "@/i18n/LocaleContext";

export default function WorkSection() {
  const copy = useCopy();
  return (
    <section id="work">
      <SectionLabel note={copy.work.note} title="WORK" />
      {PROJECTS.map((project, index) => (
        <ProjectRow index={index} key={project.id} project={project} />
      ))}
    </section>
  );
}

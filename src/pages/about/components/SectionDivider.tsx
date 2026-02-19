import { type ReactElement } from "react";
import SparkDivider from "../../../components/ui/SparkDivider";
import { ScrollReveal } from "./ScrollReveal";

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({
  className,
}: SectionDividerProps): ReactElement {
  return (
    <ScrollReveal className={className}>
      <SparkDivider />
    </ScrollReveal>
  );
}

import { motion, useInView } from "motion/react";
import { type ReactElement, useRef } from "react";
import { revealVariants } from "../motion";
import { type ScrollRevealProps } from "../types";

export function ScrollReveal({
  children,
  className,
  variants = revealVariants,
}: ScrollRevealProps): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-80px", once: true });
  return (
    <motion.div
      animate={isInView ? "visible" : "hidden"}
      className={className}
      initial="hidden"
      ref={ref}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

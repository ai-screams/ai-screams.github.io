import { motion, useInView, useReducedMotion } from "motion/react";
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
  const shouldReduceMotion = useReducedMotion();

  const animateState: "hidden" | "visible" = shouldReduceMotion
    ? "visible"
    : isInView
      ? "visible"
      : "hidden";
  const initialState: "hidden" | "visible" = shouldReduceMotion
    ? "visible"
    : "hidden";

  return (
    <motion.div
      animate={animateState}
      className={className}
      initial={initialState}
      ref={ref}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

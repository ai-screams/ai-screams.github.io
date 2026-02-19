import { type Variants } from "motion/react";
import { duration, easing } from "../../styles/tokens";

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    transition: { duration: duration.slow, ease: easing.snappy },
    y: 0,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    transition: { duration: duration.normal, ease: easing.snappy },
    y: 0,
  },
};

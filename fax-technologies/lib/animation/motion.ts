import type { Variants, TargetAndTransition } from "framer-motion";

/* ── Cubic Bezier Easing Tuples ── */
export const motionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const motionEaseSmooth: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
export const motionEaseInOut: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const motionDurations = {
  fast: 0.25,
  base: 0.5,
  slow: 0.9,
  cinematic: 1.2,
  reveal: 1.4,
} as const;

/* ── Fade In ── */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: motionDurations.base, ease: motionEase },
  },
};

/* ── Reveal Up (Primary Section Entrance) ── */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDurations.slow, ease: motionEase },
  },
};

/* ── Reveal Up Subtle (For body text / secondary elements) ── */
export const revealUpSubtle: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDurations.base, ease: motionEase },
  },
};

/* ── Scale In ── */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: motionDurations.slow, ease: motionEase },
  },
};

/* ── Slide In Left ── */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: motionDurations.slow, ease: motionEase },
  },
};

/* ── Slide In Right ── */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: motionDurations.slow, ease: motionEase },
  },
};

/* ── Horizontal Line Reveal ── */
export const revealLine: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: motionDurations.cinematic, ease: motionEaseInOut },
  },
};

/* ── Stagger Container ── */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

/* ── Stagger Container (Faster) ── */
export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

/* ── Per-character stagger for headlines ── */
export const charReveal = (i: number): TargetAndTransition => ({
  opacity: 1,
  y: 0,
  transition: {
    delay: i * 0.03,
    duration: motionDurations.slow,
    ease: motionEase,
  },
});

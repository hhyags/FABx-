import { animate, createScope, spring, stagger, random, createTimeline } from "animejs";

/**
 * Anime.js Utility & Physics Presets for Ultra-Smooth Web Animations
 */

// Custom spring & easing curves for luxury UI feedback
export const animeEasings = {
  smoothOut: "out(cubic)",
  luxuriousExpo: "out(expo)",
  snappySpring: spring({ bounce: 0.35, mass: 1 }),
  bouncySpring: spring({ bounce: 0.65, mass: 0.8 }),
  gentleElastic: "out(elastic(1, 0.5))",
  cinematicEase: "inOut(quad)",
};

/**
 * Smoothly animates a numeric value from start to end over duration
 */
export function animateCounter(
  onUpdate: (val: number) => void,
  startVal: number,
  endVal: number,
  duration = 1200
) {
  const obj = { value: startVal };
  return animate(obj, {
    value: endVal,
    duration,
    ease: "out(expo)",
    onUpdate: () => {
      onUpdate(Math.round(obj.value * 10) / 10);
    },
  });
}

/**
 * Creates staggered entrance animations for child elements inside a container
 */
export function animateStaggerEntrance(
  containerSelector: string | HTMLElement,
  childSelector = ".anime-item",
  options?: { delay?: number; duration?: number; translateY?: number }
) {
  const translateY = options?.translateY ?? 40;
  const duration = options?.duration ?? 900;
  const delay = options?.delay ?? 0;

  return animate(`${typeof containerSelector === "string" ? containerSelector : ""} ${childSelector}`, {
    opacity: [0, 1],
    translateY: [translateY, 0],
    duration,
    delay: stagger(60, { start: delay }),
    ease: "out(expo)",
  });
}

/**
 * Creates continuous floating ambient animation for floating UI cards/badges
 */
export function animateFloatingElement(target: string | HTMLElement) {
  return animate(target, {
    translateY: [-6, 6],
    rotateZ: [-0.8, 0.8],
    duration: 3500,
    loop: true,
    alternate: true,
    ease: "inOut(sine)",
  });
}

/**
 * Interactive spring press/hover feedback for buttons & cards
 */
export function animateSpringPress(target: HTMLElement, isPressed: boolean) {
  return animate(target, {
    scale: isPressed ? 0.96 : 1,
    duration: 350,
    ease: isPressed ? "out(quad)" : spring({ bounce: 0.45, mass: 0.8 }),
  });
}

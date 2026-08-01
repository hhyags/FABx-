export const MOTION_TOKENS = {
  duration: {
    instant: 0,
    fast: 0.15,
    normal: 0.3,
    slow: 0.6,
    reveal: 0.9,
    sceneTransition: 1.8,
  },
  ease: {
    default: [0.25, 0.1, 0.25, 1.0] as const,
    outPower2: [0.22, 1, 0.36, 1] as const,
    inOutPower3: [0.65, 0, 0.35, 1] as const,
    smoothSpring: { type: "spring", stiffness: 220, damping: 24 },
    magneticSpring: { type: "spring", stiffness: 350, damping: 18 },
  },
  lerp: {
    smooth: 0.045,
    fast: 0.1,
    cameraDrift: 0.035,
    lightingShift: 0.03,
  },
} as const;

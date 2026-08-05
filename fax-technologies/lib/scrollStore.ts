"use client";

import { create } from "zustand";

/* ── Scene Range Definitions ── */
export interface SceneRange {
  id: string;
  label: string;
  start: number;
  end: number;
}

export const SCENE_RANGES: SceneRange[] = [
  { id: "boot",              label: "System Boot",       start: 0.00, end: 0.08 },
  { id: "logo-evolution",    label: "Logo Evolution",    start: 0.08, end: 0.15 },
  { id: "ai-core",           label: "AI Core",           start: 0.15, end: 0.28 },
  { id: "operating-system",  label: "Operating System",  start: 0.28, end: 0.40 },
  { id: "engineering",       label: "Engineering",       start: 0.40, end: 0.55 },
  { id: "product-showcase",  label: "Product Showcase",  start: 0.55, end: 0.68 },
  { id: "ai-agents",         label: "AI Agents",         start: 0.68, end: 0.80 },
  { id: "deployment",        label: "Deployment",        start: 0.80, end: 0.90 },
  { id: "global-network",    label: "Global Network",    start: 0.90, end: 0.97 },
  { id: "final-cta",         label: "Final CTA",         start: 0.97, end: 1.00 },
];

/* ── Utility: Map a value from one range to another ── */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  if (inMax === inMin) return outMin;
  const clamped = Math.max(inMin, Math.min(inMax, value));
  return outMin + ((clamped - inMin) / (inMax - inMin)) * (outMax - outMin);
}

/* ── Get local progress (0–1) within a scene's range ── */
export function getLocalProgress(progress: number, sceneId: string): number {
  const scene = SCENE_RANGES.find((s) => s.id === sceneId);
  if (!scene) return 0;
  return mapRange(progress, scene.start, scene.end, 0, 1);
}

/* ── Check if a scene is active (with optional buffer for transitions) ── */
export function isSceneActive(
  progress: number,
  sceneId: string,
  buffer: number = 0.03,
): boolean {
  const scene = SCENE_RANGES.find((s) => s.id === sceneId);
  if (!scene) return false;
  return progress >= scene.start - buffer && progress <= scene.end + buffer;
}

/* ── Get the active scene ID for a given progress ── */
export function getActiveSceneId(progress: number): string {
  for (const scene of SCENE_RANGES) {
    if (progress >= scene.start && progress <= scene.end) {
      return scene.id;
    }
  }
  // Default to last scene if beyond range
  return SCENE_RANGES[SCENE_RANGES.length - 1].id;
}

/* ── Zustand Store ── */
interface ScrollState {
  progress: number;
  activeSceneId: string;
  setProgress: (p: number) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  activeSceneId: "boot",
  setProgress: (p: number) => {
    const clamped = Math.max(0, Math.min(1, p));
    set({
      progress: clamped,
      activeSceneId: getActiveSceneId(clamped),
    });
  },
}));

/* ── Hook: Subscribe to scroll progress (non-reactive for useFrame) ── */
export function getScrollProgress(): number {
  return useScrollStore.getState().progress;
}

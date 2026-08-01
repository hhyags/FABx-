"use client";

import { useProgress } from "@react-three/drei";

export function LoadingManager() {
  const { active, progress } = useProgress();

  if (!active) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 mx-auto w-fit rounded-md border border-border bg-background/80 px-3 py-2 font-mono text-xs text-muted-foreground backdrop-blur">
      Loading {Math.round(progress)}%
    </div>
  );
}

"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import type { ReactNode } from "react";
import { LoadingManager } from "@/components/three/loading-manager";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type CanvasProviderProps = {
  children?: ReactNode;
  className?: string;
};

export function CanvasProvider({ children, className }: CanvasProviderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 100 }}
        frameloop={prefersReducedMotion ? "demand" : "always"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
      <LoadingManager />
    </div>
  );
}

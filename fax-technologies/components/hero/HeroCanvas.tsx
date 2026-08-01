"use client";

import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { CameraRig } from "@/components/hero/CameraRig";
import { Lights } from "@/components/hero/Lights";
import { LogoModel } from "@/components/hero/LogoModel";
import { Particles } from "@/components/hero/Particles";

type HeroCanvasProps = {
  reducedMotion: boolean;
};

export function HeroCanvas({ reducedMotion }: HeroCanvasProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      frameloop={reducedMotion ? "demand" : "always"}
      className="absolute inset-0"
    >
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 7.5, 22]} />
      <CameraRig reducedMotion={reducedMotion} />
      <Lights />
      <Particles reducedMotion={reducedMotion} />
      <Suspense fallback={<CanvasFallback />}>
        <LogoModel reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}

function CanvasFallback() {
  return (
    <Html center>
      <span className="font-mono text-xs uppercase tracking-[0.22em] text-white/45">Loading</span>
    </Html>
  );
}

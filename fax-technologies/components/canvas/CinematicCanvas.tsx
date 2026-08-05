"use client";

import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { useState } from "react";
import { CameraRig } from "./CameraRig";
import { LightingRig } from "./LightingRig";
import { SceneOrchestrator } from "./SceneOrchestrator";
import { PostProcessing } from "./PostProcessing";

export function CinematicCanvas() {
  const [dpr, setDpr] = useState(1);
  const [isDowngraded, setIsDowngraded] = useState(false);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 h-screen w-screen overflow-hidden bg-black">
      <Canvas
        shadows
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        className="size-full"
      >
        <PerformanceMonitor
          onDecline={() => {
            setDpr(0.75);
            setIsDowngraded(true);
          }}
          onIncline={() => setDpr(1)}
        />
        
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 0.02]} />

        {/* 1. Camera Manager */}
        <CameraRig />

        {/* 2. Lighting & Fog Director */}
        <LightingRig />

        {/* 3. Master 10-Scene Orchestrator */}
        <SceneOrchestrator />

        {/* 4. Post-processing Bloom & Transition Aberration (Disabled on low-end) */}
        {!isDowngraded && <PostProcessing />}
      </Canvas>
    </div>
  );
}

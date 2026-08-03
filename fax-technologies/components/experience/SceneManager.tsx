"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { CameraDirector } from "@/components/experience/CameraDirector";
import { LightingManager } from "@/components/experience/LightingManager";
import { ProceduralFabxLogo3D } from "@/components/hero/ProceduralFabxLogo3D";
import { ParticleMorphSystem } from "@/components/scenes/Birth/ParticleMorphSystem";
import { Architecture3D } from "@/components/scenes/Engineering/Architecture3D";
import { NeuralNetwork3D } from "@/components/scenes/Network/NeuralNetwork3D";
import { SpatialEnvironment3D } from "@/components/three/SpatialEnvironment3D";
import { TimelineController } from "@/lib/experience/engine/TimelineController";
import { performanceManager } from "@/lib/experience/engine/PerformanceManager";

type SceneManagerProps = {
  reducedMotion: boolean;
};

function FrameTicker() {
  useFrame(({ clock }) => {
    performanceManager.update(clock.getElapsedTime() * 1000);
  });
  return null;
}

function MasterSceneContent({ reducedMotion }: { reducedMotion: boolean }) {
  const [activeSceneId, setActiveSceneId] = useState("arrival");

  useFrame(() => {
    const progress = TimelineController.getProgress();
    const currentId = TimelineController.getActiveSceneId(progress);
    if (currentId !== activeSceneId) {
      setActiveSceneId(currentId);
    }
  });

  return (
    <>
      <FrameTicker />
      <CameraDirector reducedMotion={reducedMotion} />
      <LightingManager />
      <ParticleMorphSystem reducedMotion={reducedMotion} />

      <Suspense fallback={null}>
        {/* Chapter 05 & 06 Spatial 3D Environment with floating project cards & live demo links */}
        <SpatialEnvironment3D />

        {/* 3D Metallic FABX Emblem active across scenes */}
        <ProceduralFabxLogo3D reducedMotion={reducedMotion} />

        {/* Chapter 03 & 04 Neural Network 3D Constellation */}
        <NeuralNetwork3D />

        {/* Chapter 04 Architecture 3D Component */}
        <Architecture3D />
      </Suspense>
    </>
  );
}

export function SceneManager({ reducedMotion }: SceneManagerProps) {
  return (
    <div className="fixed inset-0 pointer-events-auto z-0 h-screen w-screen overflow-hidden">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        frameloop={reducedMotion ? "demand" : "always"}
        className="size-full"
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 6, 25]} />
        <MasterSceneContent reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}

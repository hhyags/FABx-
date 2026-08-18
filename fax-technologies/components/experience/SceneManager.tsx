"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { CameraDirector } from "@/components/experience/CameraDirector";
import { LightingManager } from "@/components/experience/LightingManager";
import { ProceduralFabxLogo3D } from "@/components/hero/ProceduralFabxLogo3D";
import { ParticleMorphSystem } from "@/components/scenes/Birth/ParticleMorphSystem";
import { InstancedSystemNetwork } from "@/components/three/InstancedSystemNetwork";
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
        {/* Instanced 3D Technical Network (Single Draw Call, Coordinated 3D Transformation System) */}
        <InstancedSystemNetwork />

        {/* 3D Metallic FABX Emblem active across scenes */}
        <ProceduralFabxLogo3D reducedMotion={reducedMotion} />
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

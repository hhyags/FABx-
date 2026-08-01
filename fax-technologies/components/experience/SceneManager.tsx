"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { CameraDirector } from "@/components/experience/CameraDirector";
import { LightingManager } from "@/components/experience/LightingManager";
import { LogoModel } from "@/components/hero/LogoModel";
import { ParticleMorphSystem } from "@/components/scenes/Birth/ParticleMorphSystem";
import { NeuralNetwork3D } from "@/components/scenes/Network/NeuralNetwork3D";
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
  const [activeSceneId, setActiveSceneId] = useState("hero");

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
        {/* Logo model active in Hero & Birth scenes */}
        <LogoModel reducedMotion={reducedMotion} />

        {/* Neural Network 3D Constellation active in Network & Engineering scenes */}
        {(activeSceneId === "network" || activeSceneId === "engineering" || activeSceneId === "birth") && (
          <NeuralNetwork3D />
        )}
      </Suspense>
    </>
  );
}

export function SceneManager({ reducedMotion }: SceneManagerProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      frameloop={reducedMotion ? "demand" : "always"}
      className="fixed inset-0 pointer-events-auto z-0"
    >
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 6, 25]} />
      <MasterSceneContent reducedMotion={reducedMotion} />
    </Canvas>
  );
}

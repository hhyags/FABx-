"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color, MathUtils, PointLight } from "three";
import sceneConfig from "@/lib/experience/config/scene-config.json";
import { MOTION_TOKENS } from "@/lib/experience/engine/MotionTokens";
import { TimelineController } from "@/lib/experience/engine/TimelineController";

const LIGHTING_PROFILES: Record<string, { primary: string; secondary: string; intensity: number }> = {
  studio:   { primary: "#17b0cc", secondary: "#22d3ee", intensity: 3.0 },
  cool:     { primary: "#0e7490", secondary: "#17b0cc", intensity: 2.5 },
  neutral:  { primary: "#cbd5e1", secondary: "#17b0cc", intensity: 2.2 },
  minimal:  { primary: "#17b0cc", secondary: "#0e7490", intensity: 1.8 },
};

type SceneConfigMap = Record<string, { lighting: string }>;

export function LightingManager() {
  const light1Ref = useRef<PointLight>(null);
  const light2Ref = useRef<PointLight>(null);

  useFrame(() => {
    const progress = TimelineController.getProgress();
    const activeId = TimelineController.getActiveSceneId(progress);
    const lightingKey = (sceneConfig.scenes as unknown as SceneConfigMap)[activeId]?.lighting || "studio";
    const profile = LIGHTING_PROFILES[lightingKey] || LIGHTING_PROFILES.studio;

    if (light1Ref.current) {
      light1Ref.current.color.lerp(new Color(profile.primary), MOTION_TOKENS.lerp.lightingShift);
      light1Ref.current.intensity = MathUtils.lerp(light1Ref.current.intensity, profile.intensity, 0.04);
    }
    if (light2Ref.current) {
      light2Ref.current.color.lerp(new Color(profile.secondary), MOTION_TOKENS.lerp.lightingShift);
      light2Ref.current.intensity = MathUtils.lerp(light2Ref.current.intensity, profile.intensity * 0.6, 0.04);
    }
  });

  return (
    <>
      {/* Ambient — low, cinematic, not washed out */}
      <ambientLight intensity={0.6} />

      {/* Key light — warm white, positioned for product-reveal feel */}
      <directionalLight
        castShadow
        color="#ffffff"
        intensity={2.5}
        position={[3.0, 5.0, 6.0]}
        shadow-mapSize={[1024, 1024]}
      />

      {/* Fill light — subtle cyan accent */}
      <directionalLight
        color="#17b0cc"
        intensity={1.0}
        position={[-4.0, -2.0, 4.0]}
      />

      {/* Accent point lights — lower intensity */}
      <pointLight ref={light1Ref} position={[3.0, 1.5, 4.0]} color="#17b0cc" intensity={2.5} />
      <pointLight ref={light2Ref} position={[-3.0, -1.0, 3.0]} color="#0e7490" intensity={1.5} />

      {/* Environment map — soft, minimal */}
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={1.5} position={[0, 4, -5]} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={0.8} position={[4, 1, 3]} scale={[3, 4, 1]} />
      </Environment>
    </>
  );
}

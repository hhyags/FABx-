"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color, PointLight } from "three";
import sceneConfig from "@/lib/experience/config/scene-config.json";
import { MOTION_TOKENS } from "@/lib/experience/engine/MotionTokens";
import { TimelineController } from "@/lib/experience/engine/TimelineController";

// Narrative Lighting Profiles:
// Hero: Studio Spotlight
// Birth: Soft Ambient Glow
// Network: Electric Blue
// Engineering: Clean White
// Products: Neutral Surface
// Impact: Warm Tone
// Contact: Outro Minimal
const LIGHTING_PROFILES: Record<string, { primary: string; secondary: string; intensity: number }> = {
  studio: { primary: "#8b5cf6", secondary: "#22d3ee", intensity: 3.4 },
  purple: { primary: "#a855f7", secondary: "#3b82f6", intensity: 2.2 },
  blue: { primary: "#3b82f6", secondary: "#06b6d4", intensity: 4.5 },
  white: { primary: "#ffffff", secondary: "#94a3b8", intensity: 3.0 },
  warm: { primary: "#f97316", secondary: "#eab308", intensity: 3.8 },
  gold: { primary: "#eab308", secondary: "#f59e0b", intensity: 3.6 },
  cyan: { primary: "#06b6d4", secondary: "#3b82f6", intensity: 3.2 },
  minimal: { primary: "#8b5cf6", secondary: "#22d3ee", intensity: 3.2 },
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
      light1Ref.current.intensity = MathUtilsLerp(light1Ref.current.intensity, profile.intensity, 0.05);
    }
    if (light2Ref.current) {
      light2Ref.current.color.lerp(new Color(profile.secondary), MOTION_TOKENS.lerp.lightingShift);
      light2Ref.current.intensity = MathUtilsLerp(light2Ref.current.intensity, profile.intensity * 0.7, 0.05);
    }
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight
        castShadow
        color="#ffffff"
        intensity={3.0}
        position={[3.4, 4.8, 5.2]}
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight ref={light1Ref} position={[-3.8, 1.8, 3.2]} color="#8b5cf6" intensity={3.4} />
      <pointLight ref={light2Ref} position={[3.2, -0.5, 2.8]} color="#22d3ee" intensity={2.4} />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2.5} position={[0, 4, -5]} scale={[8, 4, 1]} />
        <Lightformer form="rect" intensity={1.4} position={[-4, 1, 3]} scale={[3, 5, 1]} />
        <Lightformer form="ring" intensity={1.8} position={[3, 2, -3]} scale={3} />
      </Environment>
    </>
  );
}

function MathUtilsLerp(current: number, target: number, speed: number): number {
  return current + (target - current) * speed;
}

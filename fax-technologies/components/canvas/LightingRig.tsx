"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { getScrollProgress } from "@/lib/scrollStore";

/* ── Light profiles mapped across scroll progress ── */
const LIGHT_PROFILES = [
  { progress: 0.00, keyColor: "#051520", keyInt: 0.2, cyanColor: "#17b0cc", cyanInt: 0.5, fogDensity: 0.04 },
  { progress: 0.08, keyColor: "#ffffff", keyInt: 2.5, cyanColor: "#17b0cc", cyanInt: 1.2, fogDensity: 0.02 },
  { progress: 0.15, keyColor: "#17b0cc", keyInt: 3.0, cyanColor: "#22d3ee", cyanInt: 2.0, fogDensity: 0.035 },
  { progress: 0.28, keyColor: "#0284c7", keyInt: 2.8, cyanColor: "#17b0cc", cyanInt: 1.5, fogDensity: 0.025 },
  { progress: 0.40, keyColor: "#f8fafc", keyInt: 2.2, cyanColor: "#0e7490", cyanInt: 1.0, fogDensity: 0.015 },
  { progress: 0.55, keyColor: "#ffffff", keyInt: 2.5, cyanColor: "#17b0cc", cyanInt: 1.2, fogDensity: 0.02 },
  { progress: 0.68, keyColor: "#0e7490", keyInt: 2.0, cyanColor: "#22d3ee", cyanInt: 1.8, fogDensity: 0.025 },
  { progress: 0.80, keyColor: "#38bdf8", keyInt: 2.4, cyanColor: "#17b0cc", cyanInt: 1.4, fogDensity: 0.02 },
  { progress: 0.90, keyColor: "#0284c7", keyInt: 1.8, cyanColor: "#0e7490", cyanInt: 1.0, fogDensity: 0.03 },
  { progress: 0.97, keyColor: "#ffffff", keyInt: 2.8, cyanColor: "#17b0cc", cyanInt: 1.5, fogDensity: 0.018 },
  { progress: 1.00, keyColor: "#ffffff", keyInt: 3.0, cyanColor: "#22d3ee", cyanInt: 1.8, fogDensity: 0.015 },
];

export function LightingRig() {
  const { scene } = useThree();
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const cyanPointRef = useRef<THREE.PointLight>(null);

  const currKeyColor = useRef(new THREE.Color("#051520"));
  const currCyanColor = useRef(new THREE.Color("#17b0cc"));
  const tempColorA = useRef(new THREE.Color());
  const tempColorB = useRef(new THREE.Color());

  useFrame(() => {
    const p = getScrollProgress();

    // Find current bracket
    let targetProfile = LIGHT_PROFILES[0];
    let nextProfile = LIGHT_PROFILES[LIGHT_PROFILES.length - 1];
    let blend = 0;

    for (let i = 0; i < LIGHT_PROFILES.length - 1; i++) {
      if (p >= LIGHT_PROFILES[i].progress && p <= LIGHT_PROFILES[i + 1].progress) {
        targetProfile = LIGHT_PROFILES[i];
        nextProfile = LIGHT_PROFILES[i + 1];
        const range = nextProfile.progress - targetProfile.progress;
        blend = range > 0 ? (p - targetProfile.progress) / range : 0;
        break;
      }
    }

    // Lerp colors & intensities
    currKeyColor.current.lerpColors(
      tempColorA.current.set(targetProfile.keyColor),
      tempColorB.current.set(nextProfile.keyColor),
      blend
    );
    currCyanColor.current.lerpColors(
      tempColorA.current.set(targetProfile.cyanColor),
      tempColorB.current.set(nextProfile.cyanColor),
      blend
    );

    const keyInt = THREE.MathUtils.lerp(targetProfile.keyInt, nextProfile.keyInt, blend);
    const cyanInt = THREE.MathUtils.lerp(targetProfile.cyanInt, nextProfile.cyanInt, blend);
    const fogDensity = THREE.MathUtils.lerp(targetProfile.fogDensity, nextProfile.fogDensity, blend);

    if (keyLightRef.current) {
      keyLightRef.current.color.copy(currKeyColor.current);
      keyLightRef.current.intensity = THREE.MathUtils.lerp(keyLightRef.current.intensity, keyInt, 0.05);
    }

    if (cyanPointRef.current) {
      cyanPointRef.current.color.copy(currCyanColor.current);
      cyanPointRef.current.intensity = THREE.MathUtils.lerp(cyanPointRef.current.intensity, cyanInt, 0.05);
    }

    if (scene.fog && scene.fog instanceof THREE.FogExp2) {
      scene.fog.density = THREE.MathUtils.lerp(scene.fog.density, fogDensity, 0.05);
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />

      {/* Main Studio Key Light */}
      <directionalLight
        ref={keyLightRef}
        position={[4, 6, 6]}
        intensity={2.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Cool Rim Light from back */}
      <directionalLight
        ref={rimLightRef}
        position={[-5, 3, -4]}
        color="#17b0cc"
        intensity={1.2}
      />

      {/* Cyan Point Accent Light */}
      <pointLight
        ref={cyanPointRef}
        position={[0, 0, 2]}
        distance={15}
        decay={2}
      />
    </>
  );
}

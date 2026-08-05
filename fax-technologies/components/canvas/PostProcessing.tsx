"use client";

import { Bloom, ChromaticAberration, EffectComposer } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";
import { useRef, ComponentRef } from "react";
import * as THREE from "three";
import { getScrollProgress } from "@/lib/scrollStore";

export function PostProcessing() {
  const chromRef = useRef<THREE.Vector2 & { offset: THREE.Vector2 }>(null);

  useFrame(() => {
    if (!chromRef.current || !chromRef.current.offset) return;
    const p = getScrollProgress();

    // Chromatic aberration spikes briefly near major scene transitions (every ~10%)
    const transitionPulse = Math.abs(Math.sin(p * Math.PI * 10));
    const isNearBoundary = Math.abs(Math.sin(p * Math.PI * 10)) > 0.85;

    const targetOffset = isNearBoundary ? 0.002 * transitionPulse : 0.0002;
    const currentX = chromRef.current.offset.x;
    chromRef.current.offset.set(
      THREE.MathUtils.lerp(currentX, targetOffset, 0.1),
      THREE.MathUtils.lerp(currentX, targetOffset, 0.1)
    );
  });

  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={0.15}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        ref={chromRef as unknown as React.Ref<ComponentRef<typeof ChromaticAberration>>}
        offset={new THREE.Vector2(0.0002, 0.0002)}
        radialModulation={false}
        modulationOffset={0}
      />
    </EffectComposer>
  );
}

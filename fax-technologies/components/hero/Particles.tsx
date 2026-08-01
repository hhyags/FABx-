"use client";

import { Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Points as ThreePoints } from "three";

type ParticlesProps = {
  reducedMotion: boolean;
};

export function Particles({ reducedMotion }: ParticlesProps) {
  const pointsRef = useRef<ThreePoints>(null);
  const particles = useMemo(() => {
    const positions = new Float32Array(720);

    for (let index = 0; index < positions.length; index += 3) {
      positions[index] = (Math.random() - 0.5) * 9.5;
      positions[index + 1] = (Math.random() - 0.5) * 5;
      positions[index + 2] = (Math.random() - 0.5) * 7;
    }

    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current || reducedMotion) {
      return;
    }

    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.018;
    pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.12) * 0.025;
  });

  return (
    <Points ref={pointsRef} positions={particles} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#c4f5ff"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.38}
      />
    </Points>
  );
}

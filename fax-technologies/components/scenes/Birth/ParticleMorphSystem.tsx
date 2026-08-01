"use client";

import { PointMaterial, Points } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { MathUtils, Points as ThreePoints } from "three";
import { TimelineController } from "@/lib/experience/engine/TimelineController";

type ParticleMorphSystemProps = {
  reducedMotion: boolean;
};

export function ParticleMorphSystem({ reducedMotion }: ParticleMorphSystemProps) {
  const pointsRef = useRef<ThreePoints>(null);
  const count = 1200;

  // Particle positions for 3 states: Logo Shell -> Concentrated Idea Seed -> Neural Network Nodes
  const { positions, initialPositions, ideaPositions, networkPositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);
    const ideaPos = new Float32Array(count * 3);
    const netPos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Initial background/logo position
      initPos[idx] = (Math.random() - 0.5) * 12;
      initPos[idx + 1] = (Math.random() - 0.5) * 7;
      initPos[idx + 2] = (Math.random() - 0.5) * 8;

      // Concentrated "Idea" seed particle at center with subtle sphere jitter
      const radius = 0.35 * Math.sqrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      ideaPos[idx] = radius * Math.sin(phi) * Math.cos(theta);
      ideaPos[idx + 1] = radius * Math.sin(phi) * Math.sin(theta);
      ideaPos[idx + 2] = radius * Math.cos(phi);

      // Neural Network grid positions
      const layer = i % 5;
      netPos[idx] = (layer - 2) * 2.8 + (Math.random() - 0.5) * 0.8;
      netPos[idx + 1] = Math.sin(i * 0.3) * 2.2 + (Math.random() - 0.5) * 0.5;
      netPos[idx + 2] = (Math.random() - 0.5) * 4;

      // Set initial buffer
      pos[idx] = initPos[idx];
      pos[idx + 1] = initPos[idx + 1];
      pos[idx + 2] = initPos[idx + 2];
    }

    return { positions: pos, initialPositions: initPos, ideaPositions: ideaPos, networkPositions: netPos };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const progress = TimelineController.getProgress();
    const time = clock.getElapsedTime();

    const positionAttr = pointsRef.current.geometry.attributes.position;
    const currentArr = positionAttr.array as Float32Array;

    let tIdea = 0;
    let tNetwork = 0;

    if (progress > 0.1) {
      tIdea = MathUtils.clamp((progress - 0.1) / 0.12, 0, 1);
    }
    if (progress > 0.22) {
      tNetwork = MathUtils.clamp((progress - 0.22) / 0.12, 0, 1);
    }

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      // Lerp from Initial -> Idea
      let x = MathUtils.lerp(initialPositions[idx], ideaPositions[idx], tIdea);
      let y = MathUtils.lerp(initialPositions[idx + 1], ideaPositions[idx + 1], tIdea);
      let z = MathUtils.lerp(initialPositions[idx + 2], ideaPositions[idx + 2], tIdea);

      // Lerp from Idea -> Network
      if (tNetwork > 0) {
        x = MathUtils.lerp(x, networkPositions[idx], tNetwork);
        y = MathUtils.lerp(y, networkPositions[idx + 1], tNetwork);
        z = MathUtils.lerp(z, networkPositions[idx + 2], tNetwork);
      }

      // Add gentle wave dynamics
      if (!reducedMotion) {
        x += Math.sin(time * 1.2 + i) * 0.008;
        y += Math.cos(time * 1.4 + i) * 0.008;
      }

      currentArr[idx] = x;
      currentArr[idx + 1] = y;
      currentArr[idx + 2] = z;
    }

    positionAttr.needsUpdate = true;

    // Pulse rotation
    if (!reducedMotion) {
      pointsRef.current.rotation.y = time * 0.03;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#22d3ee"
        size={0.024}
        sizeAttenuation
        depthWrite={false}
        opacity={0.75}
      />
    </Points>
  );
}

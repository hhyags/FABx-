"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { InstancedMesh, Object3D, Vector3 } from "three";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { TimelineController } from "@/lib/experience/engine/TimelineController";

const INSTANCE_COUNT = 120;
const DUMMY = new Object3D();

export function InstancedSystemNetwork() {
  const meshRef = useRef<InstancedMesh>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Pre-calculate target layouts for each chapter
  const layouts = useMemo(() => {
    const total = INSTANCE_COUNT;
    const ideaToSystem: Vector3[] = [];
    const engineering: Vector3[] = [];
    const capabilities: Vector3[] = [];
    const products: Vector3[] = [];
    const impact: Vector3[] = [];
    const process: Vector3[] = [];
    const ambient: Vector3[] = [];

    for (let i = 0; i < total; i++) {
      // 1. Idea to System: Linear Pipeline Line
      ideaToSystem.push(new Vector3((i / total - 0.5) * 14, Math.sin(i * 0.3) * 0.4, 0));

      // 2. Engineering: 6-Layer Matrix
      const layer = i % 6;
      const indexInLayer = Math.floor(i / 6);
      engineering.push(
        new Vector3(
          (indexInLayer / (total / 6) - 0.5) * 10,
          (layer - 2.5) * 0.8,
          Math.cos(i * 0.2) * 0.5
        )
      );

      // 3. Capabilities: Orbital Topology Ring
      const angle = (i / total) * Math.PI * 2;
      const radius = 3.5 + (i % 3) * 0.3;
      capabilities.push(new Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.6, Math.sin(i) * 0.5));

      // 4. Products: Frame Border Viewport
      const side = i % 4;
      const norm = (Math.floor(i / 4) / (total / 4) - 0.5) * 8;
      if (side === 0) products.push(new Vector3(norm, 2.8, 0));
      else if (side === 1) products.push(new Vector3(norm, -2.8, 0));
      else if (side === 2) products.push(new Vector3(-4.5, norm * 0.7, 0));
      else products.push(new Vector3(4.5, norm * 0.7, 0));

      // 5. Impact: Telemetry Bar Charts
      const barIdx = i % 4;
      const height = (Math.floor(i / 4) / (total / 4)) * 3;
      impact.push(new Vector3((barIdx - 1.5) * 2.2, height - 1.5, Math.sin(i) * 0.2));

      // 6. Process: Timeline Step Thread
      const stepIdx = i % 7;
      process.push(new Vector3((stepIdx - 3) * 1.8, Math.sin(i * 0.5) * 0.3, 0));

      // 7. Ambient: Dispersed Background Constellation
      ambient.push(
        new Vector3(
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6 - 2
        )
      );
    }

    return { ideaToSystem, engineering, capabilities, products, impact, process, ambient };
  }, []);

  // Interpolate instance matrices on each R3F frame tick
  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const progress = TimelineController.getProgress();

    const activeMeshVisible = progress >= 0.15;
    mesh.visible = activeMeshVisible;
    if (!mesh.visible) return;

    const time = clock.getElapsedTime();

    for (let i = 0; i < INSTANCE_COUNT; i++) {
      let targetPos = layouts.ambient[i];

      if (progress < 0.25) {
        targetPos = layouts.ideaToSystem[i];
      } else if (progress < 0.38) {
        targetPos = layouts.ideaToSystem[i];
      } else if (progress < 0.52) {
        targetPos = layouts.engineering[i];
      } else if (progress < 0.65) {
        targetPos = layouts.capabilities[i];
      } else if (progress < 0.78) {
        targetPos = layouts.products[i];
      } else if (progress < 0.88) {
        targetPos = layouts.impact[i];
      } else if (progress < 0.95) {
        targetPos = layouts.process[i];
      } else {
        targetPos = layouts.ambient[i];
      }

      // Add subtle harmonic float
      const floatY = reducedMotion ? 0 : Math.sin(time * 1.5 + i * 0.2) * 0.08;
      const floatX = reducedMotion ? 0 : Math.cos(time * 1.2 + i * 0.1) * 0.04;

      DUMMY.position.set(targetPos.x + floatX, targetPos.y + floatY, targetPos.z);
      DUMMY.rotation.set(time * 0.2 + i * 0.05, time * 0.3 + i * 0.02, 0);

      const pulseScale = reducedMotion ? 0.12 : 0.12 + Math.sin(time * 2 + i * 0.3) * 0.02;
      DUMMY.scale.setScalar(pulseScale);

      DUMMY.updateMatrix();
      mesh.setMatrixAt(i, DUMMY.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, INSTANCE_COUNT]}
      frustumCulled
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#22d3ee"
        emissive="#06b6d4"
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.85}
      />
    </instancedMesh>
  );
}

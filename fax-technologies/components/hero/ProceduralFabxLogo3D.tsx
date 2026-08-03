"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Center, useGLTF } from "@react-three/drei";
import { Color, Group, MathUtils, Mesh, MeshStandardMaterial, Object3D } from "three";
import { TimelineController } from "@/lib/experience/engine/TimelineController";

type ProceduralFabxLogo3DProps = {
  reducedMotion: boolean;
};

const modelPath = "/models/fabx-logo.glb";

export function ProceduralFabxLogo3D({ reducedMotion }: ProceduralFabxLogo3DProps) {
  const groupRef = useRef<Group>(null);
  const infinityRingRef = useRef<Mesh>(null);
  const coreRef = useRef<Group>(null);

  const gltf = useGLTF(modelPath);
  const logoScene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  useFrame(({ clock, pointer }) => {
    const group = groupRef.current;
    if (!group) return;

    const progress = TimelineController.getProgress();
    const time = clock.getElapsedTime();

    // Active across scenes, visible on right side
    group.visible = true;

    if (reducedMotion) {
      group.position.set(2.4, 0.0, 0);
      group.rotation.set(0, -0.2, 0);
      group.scale.setScalar(1.2);
      return;
    }

    // INFINITY LOOP TRAJECTORY (Lemniscate of Gerono: x = sin(t), y = sin(2t)/2)
    const loopX = 2.4 + Math.sin(time * 0.7) * 0.35;
    const loopY = (progress - 0.5) * -1.8 + (Math.sin(time * 1.4) * 0.18);
    const loopZ = Math.cos(time * 0.7) * 0.25;

    group.position.x = MathUtils.lerp(group.position.x, loopX, 0.06);
    group.position.y = MathUtils.lerp(group.position.y, loopY, 0.06);
    group.position.z = MathUtils.lerp(group.position.z, loopZ, 0.06);

    // Continuous 360-degree rotation
    group.rotation.y = time * 0.4 + progress * Math.PI * 2 + pointer.x * 0.1;
    group.rotation.x = Math.sin(time * 0.3) * 0.08 + pointer.y * -0.04;
    group.rotation.z = Math.cos(time * 0.3) * 0.04;

    const scaleVal = 1.25 + Math.sin(time * 0.8) * 0.02;
    group.scale.setScalar(MathUtils.lerp(group.scale.x, scaleVal, 0.06));

    // Infinity loop orbital ring rotation
    if (infinityRingRef.current) {
      infinityRingRef.current.rotation.z = time * 0.6;
      infinityRingRef.current.rotation.x = Math.sin(time * 0.4) * 0.3 + Math.PI / 4;
    }
  });

  return (
    <group ref={groupRef} position={[2.4, 0, 0]}>
      {/* Illuminated 3D Infinity Orbital Ring (TorusKnot) */}
      <mesh ref={infinityRingRef} position={[0, 0, -0.1]}>
        <torusKnotGeometry args={[1.1, 0.02, 128, 16, 2, 3]} />
        <meshStandardMaterial
          color="#17b0cc"
          emissive="#17b0cc"
          emissiveIntensity={1.8}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* 3D FABX Logo Core Emblem */}
      <group ref={coreRef} position={[0, 0, 0]}>
        {/* Main 3D Metallic Block with Cyan Accents */}
        <mesh position={[-0.35, 0, 0]}>
          <boxGeometry args={[1.3, 0.55, 0.28]} />
          <meshStandardMaterial
            color="#f8fafc"
            emissive="#17b0cc"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* 3D Cyan Glowing Chevron Arrow ('>') */}
        <mesh position={[0.6, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.5, 0.5, 0.28]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={2.0}
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>

        <Center>
          <primitive object={logoScene} dispose={null} />
        </Center>
      </group>
    </group>
  );
}

useGLTF.preload(modelPath);

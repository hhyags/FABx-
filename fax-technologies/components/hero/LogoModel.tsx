"use client";

import { Center, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Color, Material, MathUtils, Mesh, MeshStandardMaterial, Object3D } from "three";
import { TimelineController } from "@/lib/experience/engine/TimelineController";

type LogoModelProps = {
  reducedMotion: boolean;
};

const modelPath = "/models/fabx-logo.glb";

export function LogoModel({ reducedMotion }: LogoModelProps) {
  const groupRef = useRef<Object3D>(null);
  const ringRef = useRef<Mesh>(null);
  const materialsRef = useRef<Material[]>([]);
  const gltf = useGLTF(modelPath);
  const logoScene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  useEffect(() => {
    const materials: Material[] = [];

    logoScene.traverse((child: Object3D) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.frustumCulled = false;

        const materialsToClone = Array.isArray(child.material) ? child.material : [child.material];
        const clonedMaterials = materialsToClone.map(() => {
          const clonedMaterial = new MeshStandardMaterial({
            color: new Color("#ffffff"),
            emissive: new Color("#17b0cc"),
            emissiveIntensity: 0.9,
            roughness: 0.1,
            metalness: 0.9,
          });
          clonedMaterial.transparent = true;
          clonedMaterial.opacity = 1.0;
          materials.push(clonedMaterial);
          return clonedMaterial;
        });

        child.material = Array.isArray(child.material) ? clonedMaterials : clonedMaterials[0];
      }
    });

    materialsRef.current = materials;
  }, [logoScene]);

  useFrame(({ clock, pointer }) => {
    const group = groupRef.current;
    if (!group) return;

    const progress = TimelineController.getProgress();
    const time = clock.getElapsedTime();

    materialsRef.current.forEach((mat) => {
      mat.opacity = 1.0;
    });

    group.visible = true;

    if (reducedMotion) {
      group.position.set(1.6, 0.0, 0);
      group.rotation.set(0, -0.15, 0);
      group.scale.setScalar(1.8);
      return;
    }

    const floatY = Math.sin(time * 0.8) * 0.08;
    const breath = 1 + Math.sin(time * 1.0) * 0.01;

    // Positioned on the right side of screen (x = 1.6), gliding up/down smoothly with page scroll
    const glideX = 1.6;
    const glideY = (progress - 0.5) * -1.8 + floatY;
    const glideZ = Math.sin(progress * Math.PI * 2) * 0.3;
    const glideScale = 1.8 * breath;

    group.position.x = MathUtils.lerp(group.position.x, glideX, 0.08);
    group.position.y = MathUtils.lerp(group.position.y, glideY, 0.08);
    group.position.z = MathUtils.lerp(group.position.z, glideZ, 0.08);

    // Continuous 360-degree rotation that spins every single time it shows
    group.rotation.y = time * 0.5 + progress * Math.PI * 2 + pointer.x * 0.1;
    group.rotation.x = Math.sin(time * 0.3) * 0.08 + pointer.y * -0.04;
    group.rotation.z = Math.cos(time * 0.3) * 0.04;

    group.scale.setScalar(MathUtils.lerp(group.scale.x, glideScale, 0.08));

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.8;
      ringRef.current.rotation.x = time * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[1.6, 0, 0]}>
      {/* 3D Glowing Torus Ring */}
      <mesh ref={ringRef} position={[0, 0, -0.2]}>
        <torusGeometry args={[1.5, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#17b0cc"
          emissiveIntensity={2.0}
          roughness={0.1}
        />
      </mesh>

      {/* 3D Metallic FABX Emblem Geometry */}
      <group position={[0, 0, 0]}>
        {/* Main 3D Metallic Block */}
        <mesh position={[-0.3, 0, 0]}>
          <boxGeometry args={[1.2, 0.5, 0.25]} />
          <meshStandardMaterial
            color="#f8fafc"
            emissive="#17b0cc"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* 3D Metallic Arrow Chevron */}
        <mesh position={[0.6, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.45, 0.45, 0.25]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#17b0cc"
            emissiveIntensity={1.5}
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>
      </group>

      <Center>
        <primitive object={logoScene} dispose={null} />
      </Center>
    </group>
  );
}

useGLTF.preload(modelPath);

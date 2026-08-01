"use client";

import { Center, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Material, MathUtils, Mesh, Object3D } from "three";
import { TimelineController } from "@/lib/experience/engine/TimelineController";

type LogoModelProps = {
  reducedMotion: boolean;
};

const modelPath = "/models/fabx-logo.glb";

export function LogoModel({ reducedMotion }: LogoModelProps) {
  const groupRef = useRef<Object3D>(null);
  const targetOpacityRef = useRef(reducedMotion ? 1 : 0);
  const currentOpacityRef = useRef(reducedMotion ? 1 : 0);
  const materialsRef = useRef<Material[]>([]);
  const gltf = useGLTF(modelPath);
  const logoScene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  useEffect(() => {
    const materials: Material[] = [];

    logoScene.traverse((child: Object3D) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.frustumCulled = true;

        const materialsToClone = Array.isArray(child.material) ? child.material : [child.material];
        const clonedMaterials = materialsToClone.map((material) => {
          const clonedMaterial = material.clone();

          clonedMaterial.transparent = true;
          clonedMaterial.opacity = reducedMotion ? 1 : 0;
          materials.push(clonedMaterial);

          return clonedMaterial;
        });

        child.material = Array.isArray(child.material) ? clonedMaterials : clonedMaterials[0];
      }
    });

    materialsRef.current = materials;
  }, [logoScene, reducedMotion]);

  useFrame(({ clock, pointer }) => {
    const group = groupRef.current;
    if (!group) return;

    const progress = TimelineController.getProgress();

    // Narrative Logo Lifecycle:
    // Visible in Hero (progress <= 0.10)
    // Dissolves and hides completely (opacity = 0) during Birth, Network, Engineering, Products, Impact, Process, Values (0.10 < progress < 0.92)
    // Reforms and fades back in during Outro / Contact (progress >= 0.92)
    let opacityTarget = 0;
    if (progress <= 0.10) {
      opacityTarget = MathUtils.clamp(1 - progress / 0.10, 0, 1);
    } else if (progress >= 0.92) {
      opacityTarget = MathUtils.clamp((progress - 0.92) / 0.08, 0, 1);
    }

    targetOpacityRef.current = opacityTarget;
    currentOpacityRef.current = MathUtils.lerp(currentOpacityRef.current, targetOpacityRef.current, 0.08);

    materialsRef.current.forEach((material) => {
      material.opacity = currentOpacityRef.current;
    });

    // Hide object completely from frustum render when fully transparent
    group.visible = currentOpacityRef.current > 0.01;

    if (!group.visible) return;

    if (reducedMotion) {
      group.position.y = 0.35;
      group.rotation.set(0, -0.08, 0);
      group.scale.setScalar(2.18);
      return;
    }

    const time = clock.getElapsedTime();
    const floatY = Math.sin(time * 0.72) * 0.09;
    const breath = 1 + Math.sin(time * 0.82) * 0.012;

    group.position.y = MathUtils.lerp(group.position.y, 0.35 + floatY, 0.045);
    group.rotation.y = MathUtils.lerp(
      group.rotation.y,
      -0.08 + time * 0.1 + pointer.x * 0.1,
      0.035
    );
    group.rotation.x = MathUtils.lerp(group.rotation.x, pointer.y * -0.045, 0.04);
    group.rotation.z = MathUtils.lerp(group.rotation.z, pointer.x * -0.025, 0.04);
    group.scale.setScalar(MathUtils.lerp(group.scale.x, 2.18 * breath, 0.04));
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={logoScene} dispose={null} />
      </Center>
    </group>
  );
}

useGLTF.preload(modelPath);

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
  const introProgressRef = useRef(reducedMotion ? 1 : 0);
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
    // Fade out logo mesh as we transition into Birth particle scene (0.10 to 0.18)
    const fadeOut = MathUtils.clamp(1 - (progress - 0.08) / 0.1, 0, 1);

    const time = clock.getElapsedTime();
    introProgressRef.current = MathUtils.lerp(introProgressRef.current, fadeOut, 0.08);

    materialsRef.current.forEach((material) => {
      material.opacity = introProgressRef.current;
    });

    if (reducedMotion) {
      group.position.y = 0.35;
      group.rotation.set(0, -0.08, 0);
      group.scale.setScalar(2.18);
      return;
    }

    const floatY = Math.sin(time * 0.72) * 0.09;
    const breath = 1 + Math.sin(time * 0.82) * 0.012;

    group.position.y = MathUtils.lerp(group.position.y, 0.35 + floatY, 0.045);
    group.rotation.y = MathUtils.lerp(
      group.rotation.y,
      -0.08 + time * 0.1 + pointer.x * 0.1,
      0.035,
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

"use client";

import { useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { getScrollProgress, mapRange } from "@/lib/scrollStore";

const MODEL_PATH = "/models/fabx-logo.glb";

export function SceneFinalCTA() {
  const groupRef = useRef<THREE.Group>(null);
  const logoGroupRef = useRef<THREE.Group>(null);

  const gltf = useGLTF(MODEL_PATH);

  const logoScene = useMemo(() => {
    const cloned = gltf.scene.clone(true);
    const aluminumMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#ffffff"),
      metalness: 0.9,
      roughness: 0.2,
      emissive: new THREE.Color("#17b0cc"),
      emissiveIntensity: 0.6,
      clearcoat: 0.5,
    });

    cloned.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = aluminumMat;
      }
    });
    return cloned;
  }, [gltf.scene]);

  useFrame(({ clock }) => {
    const p = getScrollProgress();
    const time = clock.getElapsedTime();

    // Scene 10 Active Range: 0.97 to 1.00 (buffer 0.95 to 1.00)
    if (p < 0.95) {
      if (groupRef.current) groupRef.current.visible = false;
      return;
    }
    if (groupRef.current) groupRef.current.visible = true;

    const localP = mapRange(p, 0.97, 1.00, 0.0, 1.0);

    // Reform logo & continuous slow rotation
    if (logoGroupRef.current) {
      const scale = mapRange(localP, 0.0, 0.5, 0.2, 1.1);
      logoGroupRef.current.scale.setScalar(scale);
      logoGroupRef.current.rotation.y = time * 0.4 + Math.sin(time * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Reformed Metallic Glowing Emblem */}
      <group ref={logoGroupRef} position={[0, 0.5, 0]}>
        <Center>
          <primitive object={logoScene} />
        </Center>
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

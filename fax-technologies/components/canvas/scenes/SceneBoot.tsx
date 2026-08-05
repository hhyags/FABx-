"use client";

import { useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { getScrollProgress, mapRange } from "@/lib/scrollStore";

const MODEL_PATH = "/models/fabx-logo.glb";

export function SceneBoot() {
  const groupRef = useRef<THREE.Group>(null);
  const particleRef = useRef<THREE.Mesh>(null);
  const logoGroupRef = useRef<THREE.Group>(null);

  const gltf = useGLTF(MODEL_PATH);
  
  // Clone scene & override materials to brushed aluminum
  const logoScene = useMemo(() => {
    const cloned = gltf.scene.clone(true);
    const aluminumMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#f1f5f9"),
      metalness: 0.85,
      roughness: 0.25,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2,
      reflectivity: 0.9,
    });

    cloned.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = aluminumMat;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return cloned;
  }, [gltf.scene]);

  useFrame(({ clock }) => {
    const p = getScrollProgress();
    const time = clock.getElapsedTime();

    // Scene 01 Active Range: 0.00 to 0.08 (with transition buffer to 0.10)
    if (p > 0.10) {
      if (groupRef.current) groupRef.current.visible = false;
      return;
    }
    if (groupRef.current) groupRef.current.visible = true;

    // Single cyan particle (#17B0CC) appears and brightens
    const particleOpacity = mapRange(p, 0.00, 0.03, 0.0, 1.0);
    const particleScale = mapRange(p, 0.00, 0.03, 0.05, 0.25) + Math.sin(time * 3) * 0.03;

    if (particleRef.current) {
      particleRef.current.scale.setScalar(particleScale);
      const mat = particleRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = particleOpacity;
      mat.emissiveIntensity = 2.0 + Math.sin(time * 4) * 0.8;
    }

    // Logo materializes (fade in & slow orbit reveal)
    const logoOpacity = mapRange(p, 0.02, 0.07, 0.0, 1.0);
    const logoScale = mapRange(p, 0.02, 0.08, 0.4, 1.0);
    const logoRotY = mapRange(p, 0.00, 0.08, -0.6, 0.4) + Math.sin(time * 0.5) * 0.05;

    if (logoGroupRef.current) {
      logoGroupRef.current.scale.setScalar(logoScale);
      logoGroupRef.current.rotation.y = logoRotY;

      logoScene.traverse((child: THREE.Object3D) => {
        if ((child as THREE.Mesh).isMesh) {
          const mat = (child as THREE.Mesh).material as THREE.MeshPhysicalMaterial;
          mat.transparent = true;
          mat.opacity = logoOpacity;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Cyan Seed Particle */}
      <mesh ref={particleRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#17b0cc"
          emissive="#17b0cc"
          emissiveIntensity={2.5}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Materializing Metallic Logo */}
      <group ref={logoGroupRef} position={[0, 0, 0]}>
        <Center>
          <primitive object={logoScene} />
        </Center>
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

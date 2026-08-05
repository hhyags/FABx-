"use client";

import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { getScrollProgress, mapRange } from "@/lib/scrollStore";

const MODEL_PATH = "/models/fabx-logo.glb";
const PARTICLE_COUNT = 3000;

export function SceneLogoEvolution() {
  const groupRef = useRef<THREE.Group>(null);
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const guideParticleRef = useRef<THREE.Mesh>(null);

  const gltf = useGLTF(MODEL_PATH);

  // Sample vertex positions from logo model geometry
  const { initialPositions, randomVelocities } = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const velocities: THREE.Vector3[] = [];

    let sampledGeo: THREE.BufferGeometry | null = null;
    gltf.scene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh && !sampledGeo) {
        sampledGeo = (child as THREE.Mesh).geometry;
      }
    });

    if (sampledGeo) {
      const posAttr = (sampledGeo as THREE.BufferGeometry).attributes.position;
      const count = posAttr.count;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const vertexIndex = Math.floor(Math.random() * count);
        const x = posAttr.getX(vertexIndex) * 0.8;
        const y = posAttr.getY(vertexIndex) * 0.8;
        const z = posAttr.getZ(vertexIndex) * 0.8;
        positions.push(new THREE.Vector3(x, y, z));

        // Explosion velocity vector radiating from center
        const vel = new THREE.Vector3(x, y, z).normalize().multiplyScalar(1.5 + Math.random() * 2.5);
        vel.x += (Math.random() - 0.5) * 1.5;
        vel.y += (Math.random() - 0.5) * 1.5;
        vel.z += (Math.random() - 0.5) * 1.5;
        velocities.push(vel);
      }
    } else {
      // Fallback if no mesh found
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 0.5
        );
        positions.push(p);
        velocities.push(p.clone().normalize().multiplyScalar(2));
      }
    }

    return { initialPositions: positions, randomVelocities: velocities };
  }, [gltf.scene]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const p = getScrollProgress();
    const time = clock.getElapsedTime();

    // Scene 02 Active Range: 0.08 to 0.15 (with buffer 0.06 to 0.17)
    if (p < 0.06 || p > 0.17) {
      if (groupRef.current) groupRef.current.visible = false;
      return;
    }
    if (groupRef.current) groupRef.current.visible = true;

    // Sub-progress within Scene 02
    const localP = mapRange(p, 0.08, 0.15, 0.0, 1.0);

    // Phase 1 (0-0.5): Explode outward from logo vertex positions
    // Phase 2 (0.5-1.0): Swirl and converge into center single guide particle
    const instancedMesh = instancedMeshRef.current;
    if (instancedMesh) {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const init = initialPositions[i];
        const vel = randomVelocities[i];

        let posX = init.x;
        let posY = init.y;
        let posZ = init.z;
        let scale = 0.04;

        if (localP <= 0.5) {
          // Explode
          const explodeFactor = mapRange(localP, 0.0, 0.5, 0.0, 1.0);
          const easedExplode = Math.pow(explodeFactor, 0.8);
          posX = init.x + vel.x * easedExplode;
          posY = init.y + vel.y * easedExplode;
          posZ = init.z + vel.z * easedExplode;
          scale = 0.04 * (1 - explodeFactor * 0.4);
        } else {
          // Swirl and Converge
          const convergeFactor = mapRange(localP, 0.5, 1.0, 0.0, 1.0);
          const easedConverge = 1 - Math.pow(1 - convergeFactor, 2);

          const midY = init.y + vel.y;

          // Spiral rotation math
          const angle = convergeFactor * Math.PI * 6 + i * 0.01;
          const radius = (1 - easedConverge) * 2.5;

          posX = Math.cos(angle) * radius;
          posY = THREE.MathUtils.lerp(midY, 0, easedConverge);
          posZ = Math.sin(angle) * radius;

          scale = 0.04 * (1 - easedConverge);
        }

        dummy.position.set(posX, posY, posZ);
        dummy.scale.setScalar(Math.max(0.001, scale));
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      }
      instancedMesh.instanceMatrix.needsUpdate = true;
    }

    // Guide particle appears at end of convergence (localP > 0.8)
    if (guideParticleRef.current) {
      const guideScale = mapRange(localP, 0.8, 1.0, 0.0, 0.35) + Math.sin(time * 4) * 0.03;
      guideParticleRef.current.scale.setScalar(guideScale);
    }
  });

  return (
    <group ref={groupRef}>
      {/* GPU Instanced Particles Fracturing from Logo Vertices */}
      <instancedMesh
        ref={instancedMeshRef}
        args={[undefined, undefined, PARTICLE_COUNT]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#17b0cc"
          emissive="#17b0cc"
          emissiveIntensity={2.0}
          roughness={0.2}
          metalness={0.8}
        />
      </instancedMesh>

      {/* Guide Particle persistent object */}
      <mesh ref={guideParticleRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#17b0cc"
          emissiveIntensity={3.0}
        />
      </mesh>
    </group>
  );
}

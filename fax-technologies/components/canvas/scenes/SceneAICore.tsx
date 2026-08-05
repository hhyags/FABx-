"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { getScrollProgress, mapRange } from "@/lib/scrollStore";

const LINE_COUNT = 24;

export function SceneAICore() {
  const groupRef = useRef<THREE.Group>(null);
  const coreSphereRef = useRef<THREE.Mesh>(null);
  const pulseRingsRef = useRef<THREE.Group>(null);
  const lineSegmentsRef = useRef<THREE.LineSegments>(null);

  // Procedural neural connection line geometry radiating from center
  const linePositions = useMemo(() => {
    const positions: number[] = [];

    for (let i = 0; i < LINE_COUNT; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const radius = 3.5 + Math.random() * 2.0;

      const end = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );

      positions.push(0, 0, 0, end.x, end.y, end.z);
    }

    return new Float32Array(positions);
  }, []);

  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return geom;
  }, [linePositions]);

  useFrame(({ clock }) => {
    const p = getScrollProgress();
    const time = clock.getElapsedTime();

    // Scene 03 Active Range: 0.15 to 0.28 (buffer 0.13 to 0.30)
    if (p < 0.13 || p > 0.30) {
      if (groupRef.current) groupRef.current.visible = false;
      return;
    }
    if (groupRef.current) groupRef.current.visible = true;

    const localP = mapRange(p, 0.15, 0.28, 0.0, 1.0);

    // Energy sphere growth & pulsation
    if (coreSphereRef.current) {
      const scale = mapRange(localP, 0.0, 0.6, 0.4, 1.8) + Math.sin(time * 3) * 0.08;
      coreSphereRef.current.scale.setScalar(scale);

      const mat = coreSphereRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2.5 + Math.sin(time * 5) * 1.0;
    }

    // Rhythmic expanding pulse rings
    if (pulseRingsRef.current) {
      pulseRingsRef.current.children.forEach((ring, idx) => {
        const ringSpeed = (idx + 1) * 0.8;
        const ringProgress = ((time * ringSpeed) % 2) / 2;
        const scale = 0.5 + ringProgress * 4.0;
        const opacity = (1 - ringProgress) * mapRange(localP, 0.0, 0.8, 1.0, 0.0);

        ring.scale.setScalar(scale);
        const mat = (ring as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mat.opacity = opacity;
      });
    }

    // Neural connection line growth
    if (lineSegmentsRef.current) {
      const mat = lineSegmentsRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = mapRange(localP, 0.1, 0.7, 0.0, 0.7);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Glowing AI Energy Sphere */}
      <mesh ref={coreSphereRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#17b0cc"
          emissive="#22d3ee"
          emissiveIntensity={3.0}
          roughness={0.1}
          wireframe={false}
        />
      </mesh>

      {/* Rhythmic Expanding Pulse Rings */}
      <group ref={pulseRingsRef}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[Math.PI / 3, i * 0.4, 0]}>
            <torusGeometry args={[0.8, 0.02, 16, 64]} />
            <meshBasicMaterial color="#17b0cc" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>

      {/* Pulsing Neural Connection Line Paths */}
      <lineSegments ref={lineSegmentsRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.6} linewidth={1.5} />
      </lineSegments>
    </group>
  );
}

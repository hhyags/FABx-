"use client";

import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { getScrollProgress } from "@/lib/scrollStore";

const STAGES = [
  { id: "test", label: "01. TEST", sub: "100% Code Coverage", pos: new THREE.Vector3(-4.5, 0, 0) },
  { id: "build", label: "02. BUILD", sub: "Next.js 15 Bundle", pos: new THREE.Vector3(-3.0, 0, 0) },
  { id: "deploy", label: "03. DEPLOY", sub: "Edge Mesh", pos: new THREE.Vector3(-1.5, 0, 0) },
  { id: "optimize", label: "04. OPTIMIZE", sub: "Sub-50ms Latency", pos: new THREE.Vector3(0, 0, 0) },
  { id: "sync", label: "05. CLOUD SYNC", sub: "Qdrant Vector Sync", pos: new THREE.Vector3(1.5, 0, 0) },
  { id: "prod", label: "06. PRODUCTION", sub: "99.99% Availability", pos: new THREE.Vector3(3.0, 0, 0) },
  { id: "monitor", label: "07. MONITOR", sub: "Realtime Telemetry", pos: new THREE.Vector3(4.5, 0, 0) },
];

export function SceneDeployment() {
  const groupRef = useRef<THREE.Group>(null);
  const pulsePacketRef = useRef<THREE.Mesh>(null);

  const trackGeometry = useMemo(() => {
    const points = [
      new THREE.Vector3(-4.5, 0, 0),
      new THREE.Vector3(4.5, 0, 0),
    ];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame(({ clock }) => {
    const p = getScrollProgress();
    const time = clock.getElapsedTime();

    // Scene 08 Active Range: 0.80 to 0.90 (buffer 0.78 to 0.92)
    if (p < 0.78 || p > 0.92) {
      if (groupRef.current) groupRef.current.visible = false;
      return;
    }
    if (groupRef.current) groupRef.current.visible = true;

    // Traveling light pulse along the horizontal pipeline track
    if (pulsePacketRef.current) {
      const trackP = (time * 0.4) % 1;
      pulsePacketRef.current.position.x = THREE.MathUtils.lerp(-4.5, 4.5, trackP);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Horizontal Track Line */}
      <lineSegments geometry={trackGeometry}>
        <lineBasicMaterial color="#17b0cc" transparent opacity={0.6} linewidth={3} />
      </lineSegments>

      {/* Traveling Light Pulse */}
      <mesh ref={pulsePacketRef} position={[-4.5, 0, 0]}>
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* Pipeline Stage Nodes */}
      {STAGES.map((stg) => (
        <group key={stg.id} position={stg.pos.toArray()}>
          <mesh>
            <cylinderGeometry args={[0.25, 0.25, 0.15, 24]} />
            <meshStandardMaterial color="#17b0cc" emissive="#0e7490" emissiveIntensity={1.5} />
          </mesh>

          <Html transform distanceFactor={6} position={[0, -0.45, 0]}>
            <div className="text-center font-mono whitespace-nowrap">
              <div className="text-[10px] font-bold text-cyan-400">{stg.label}</div>
              <div className="text-[8px] text-white/50">{stg.sub}</div>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

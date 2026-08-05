"use client";

import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { getScrollProgress } from "@/lib/scrollStore";

export function SceneOperatingSystem() {
  const groupRef = useRef<THREE.Group>(null);
  const dbRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Group>(null);
  const apiCardRef = useRef<THREE.Mesh>(null);
  const connectionLinesRef = useRef<THREE.LineSegments>(null);

  // Line connection positions linking windows, DB, cloud
  const lineGeometry = useMemo(() => {
    const points = [
      // Window to DB
      -1.5, 0.5, 0,  -1.5, -1.2, 0,
      // Window to Cloud
      -1.5, 0.5, 0,   1.8, 1.0, -0.5,
      // Cloud to DB
       1.8, 1.0, -0.5, -1.5, -1.2, 0,
    ];
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geom;
  }, []);

  useFrame(({ clock }) => {
    const p = getScrollProgress();
    const time = clock.getElapsedTime();

    // Scene 04 Active Range: 0.28 to 0.40 (buffer 0.26 to 0.42)
    if (p < 0.26 || p > 0.42) {
      if (groupRef.current) groupRef.current.visible = false;
      return;
    }
    if (groupRef.current) groupRef.current.visible = true;

    // Floating animation
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.05;
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.05;
    }

    // Database Cylinder rotation
    if (dbRef.current) {
      dbRef.current.rotation.y = time * 0.8;
    }

    // Cloud torus rotation
    if (cloudRef.current) {
      cloudRef.current.rotation.z = time * 0.4;
      cloudRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
    }

    // Traveling API packet along connection path
    if (apiCardRef.current) {
      const packetP = (time * 0.8) % 1;
      apiCardRef.current.position.x = THREE.MathUtils.lerp(-1.5, 1.8, packetP);
      apiCardRef.current.position.y = THREE.MathUtils.lerp(0.5, 1.0, packetP);
      apiCardRef.current.position.z = THREE.MathUtils.lerp(0, -0.5, packetP);
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Terminal Window Frame (Rounded Box Primitive) */}
      <group position={[-1.5, 0.5, 0]}>
        <mesh>
          <boxGeometry args={[2.4, 1.6, 0.08]} />
          <meshPhysicalMaterial
            color="#0c0d12"
            metalness={0.2}
            roughness={0.1}
            transmission={0.8}
            thickness={0.5}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Crisp HTML Terminal inside 3D frame */}
        <Html transform distanceFactor={5} position={[0, 0, 0.05]}>
          <div className="w-64 rounded-lg bg-[#050508]/95 p-3.5 font-mono text-[10px] text-white/90 shadow-2xl border border-cyan-500/30">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
              <span className="text-cyan-400 font-bold">FABX OS v4.2 TERMINAL</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="space-y-1 text-[9px] text-white/70">
              <div className="text-emerald-400">$ fabx-kernel --boot --all</div>
              <div>[OK] Vector Engine loaded</div>
              <div>[OK] Neural Mesh active</div>
              <div>[OK] Qdrant DB cluster synced</div>
              <div className="text-cyan-400 font-semibold">&gt; Processing real-time telemetry...</div>
            </div>
          </div>
        </Html>
      </group>

      {/* 2. Database Cylinder Primitives */}
      <group ref={dbRef} position={[-1.5, -1.2, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.3, 32]} />
          <meshStandardMaterial color="#17b0cc" emissive="#0e7490" emissiveIntensity={1.2} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.3, 32]} />
          <meshStandardMaterial color="#0284c7" emissive="#17b0cc" emissiveIntensity={1.5} roughness={0.2} />
        </mesh>
      </group>

      {/* 3. Cloud Synchronization Torus Primitive */}
      <group ref={cloudRef} position={[1.8, 1.0, -0.5]}>
        <mesh>
          <torusGeometry args={[0.7, 0.12, 16, 48]} />
          <meshStandardMaterial color="#22d3ee" emissive="#17b0cc" emissiveIntensity={1.8} roughness={0.1} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.3, 24, 24]} />
          <meshStandardMaterial color="#ffffff" emissive="#17b0cc" emissiveIntensity={2.0} />
        </mesh>
      </group>

      {/* 4. Traveling API Request Packet */}
      <mesh ref={apiCardRef}>
        <boxGeometry args={[0.2, 0.12, 0.05]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={3.0} />
      </mesh>

      {/* Connection Lines */}
      <lineSegments ref={connectionLinesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#17b0cc" transparent opacity={0.4} linewidth={1.5} />
      </lineSegments>
    </group>
  );
}

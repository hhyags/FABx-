"use client";

import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { getScrollProgress } from "@/lib/scrollStore";

const NETWORK_NODES = [
  { id: "products", label: "PRODUCTS", pos: new THREE.Vector3(-3.2, 1.8, 0) },
  { id: "cloud", label: "CLOUD ENGINE", pos: new THREE.Vector3(3.2, 1.8, 0) },
  { id: "users", label: "GLOBAL USERS", pos: new THREE.Vector3(-3.2, -1.8, 0) },
  { id: "ai", label: "AI AGENTS", pos: new THREE.Vector3(3.2, -1.8, 0) },
  { id: "business", label: "ENTERPRISE IMPACT", pos: new THREE.Vector3(0, 0, 0) },
];

export function SceneGlobalNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const globeGridRef = useRef<THREE.Mesh>(null);

  // Network connection mesh lines connecting nodes
  const lineGeometry = useMemo(() => {
    const points = [
      // Products to Cloud
      -3.2, 1.8, 0,   3.2, 1.8, 0,
      // Cloud to AI
       3.2, 1.8, 0,   3.2, -1.8, 0,
      // AI to Business
       3.2, -1.8, 0,  0, 0, 0,
      // Business to Users
       0, 0, 0,      -3.2, -1.8, 0,
      // Users to Products
      -3.2, -1.8, 0, -3.2, 1.8, 0,
      // Cross connections
      -3.2, 1.8, 0,   0, 0, 0,
       3.2, 1.8, 0,   0, 0, 0,
    ];
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geom;
  }, []);

  useFrame(({ clock }) => {
    const p = getScrollProgress();
    const time = clock.getElapsedTime();

    // Scene 09 Active Range: 0.90 to 0.97 (buffer 0.88 to 0.98)
    if (p < 0.88 || p > 0.98) {
      if (groupRef.current) groupRef.current.visible = false;
      return;
    }
    if (groupRef.current) groupRef.current.visible = true;

    // Rotate wireframe globe
    if (globeGridRef.current) {
      globeGridRef.current.rotation.y = time * 0.2;
      globeGridRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Rotating Icosahedron Wireframe Globe */}
      <mesh ref={globeGridRef} position={[0, 0, -1]}>
        <icosahedronGeometry args={[4.2, 2]} />
        <meshBasicMaterial color="#17b0cc" wireframe transparent opacity={0.15} />
      </mesh>

      {/* Network Connection Lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.5} linewidth={2} />
      </lineSegments>

      {/* Main Category Network Nodes */}
      {NETWORK_NODES.map((node) => (
        <group key={node.id} position={node.pos.toArray()}>
          <mesh>
            <sphereGeometry args={[0.35, 24, 24]} />
            <meshStandardMaterial
              color="#17b0cc"
              emissive="#22d3ee"
              emissiveIntensity={2.5}
              roughness={0.1}
            />
          </mesh>

          <Html transform distanceFactor={7} position={[0, -0.55, 0]}>
            <div className="rounded-full bg-[#06080d]/95 px-4 py-1.5 font-mono text-[10px] font-bold text-cyan-400 border border-cyan-400/30 shadow-xl whitespace-nowrap">
              {node.label}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

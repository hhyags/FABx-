"use client";

import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { getScrollProgress } from "@/lib/scrollStore";

const AGENT_NODES = [
  { id: "sales", label: "Sales Agent", pos: new THREE.Vector3(-2.2, 1.0, 0), task: "Lead Score: 98%" },
  { id: "inventory", label: "Inventory Agent", pos: new THREE.Vector3(2.2, 1.0, 0), task: "Stock Reorder Triggered" },
  { id: "hr", label: "Recruitment Agent", pos: new THREE.Vector3(-2.2, -1.0, 0), task: "Vector Match: 99.1%" },
  { id: "support", label: "Support Agent", pos: new THREE.Vector3(2.2, -1.0, 0), task: "SLA Resolution Posted" },
];

const CENTRAL_API_NODE = new THREE.Vector3(0, 0, 0);

export function SceneAIAgents() {
  const groupRef = useRef<THREE.Group>(null);
  const packetRef = useRef<THREE.Mesh>(null);

  // Request curve arcs connecting agent nodes to central API node
  const arcCurves = useMemo(() => {
    return AGENT_NODES.map((node) => {
      const mid = new THREE.Vector3()
        .addVectors(node.pos, CENTRAL_API_NODE)
        .multiplyScalar(0.5)
        .add(new THREE.Vector3(0, 0.8, 0)); // Arc height
      return new THREE.QuadraticBezierCurve3(node.pos, mid, CENTRAL_API_NODE);
    });
  }, []);

  const arcGeometries = useMemo(() => {
    return arcCurves.map((curve) => {
      const points = curve.getPoints(32);
      return new THREE.BufferGeometry().setFromPoints(points);
    });
  }, [arcCurves]);

  useFrame(({ clock }) => {
    const p = getScrollProgress();
    const time = clock.getElapsedTime();

    // Scene 07 Active Range: 0.68 to 0.80 (buffer 0.66 to 0.82)
    if (p < 0.66 || p > 0.82) {
      if (groupRef.current) groupRef.current.visible = false;
      return;
    }
    if (groupRef.current) groupRef.current.visible = true;

    // Light-trail request packet traveling along curve 0
    if (packetRef.current) {
      const arcP = (time * 0.9) % 1;
      const pos = arcCurves[0].getPointAt(arcP);
      packetRef.current.position.copy(pos);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central API Gateway Processing Node */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#17b0cc"
          emissive="#22d3ee"
          emissiveIntensity={2.5}
          roughness={0.1}
        />
      </mesh>

      {/* Request Arc Light Trail Curves */}
      {arcGeometries.map((geom, idx) => (
        <lineSegments key={idx} geometry={geom}>
          <lineBasicMaterial color="#17b0cc" transparent opacity={0.6} linewidth={2} />
        </lineSegments>
      ))}

      {/* Traveling Light Trail Packet */}
      <mesh ref={packetRef}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* Agent Nodes with Thinking Pulse & HTML Telemetry */}
      {AGENT_NODES.map((node) => (
        <AgentNode key={node.id} node={node} />
      ))}
    </group>
  );
}

function AgentNode({ node }: { node: (typeof AGENT_NODES)[number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (meshRef.current) {
      const pulse = 1 + Math.sin(time * 3 + node.pos.x) * 0.12;
      meshRef.current.scale.setScalar(pulse);
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.5 + Math.sin(time * 4) * 0.8;
    }
  });

  return (
    <group position={node.pos.toArray()}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshStandardMaterial color="#17b0cc" emissive="#17b0cc" emissiveIntensity={2.0} />
      </mesh>

      <Html transform distanceFactor={6} position={[0, -0.45, 0]}>
        <div className="rounded-lg bg-[#080a0f]/90 px-3 py-1.5 font-mono text-[9px] text-white border border-cyan-400/30 backdrop-blur-md shadow-lg whitespace-nowrap">
          <div className="font-bold text-cyan-400">{node.label}</div>
          <div className="text-white/60 text-[8px]">{node.task}</div>
        </div>
      </Html>
    </group>
  );
}

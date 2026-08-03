"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { BufferGeometry, Float32BufferAttribute, Group, LineSegments, MathUtils, Vector3 } from "three";
import { TimelineController } from "@/lib/experience/engine/TimelineController";

const ARCH_NODES = [
  { id: "api-gw", label: "API Gateway", type: "api", pos: new Vector3(-2.8, 1.2, 0) },
  { id: "auth", label: "OAuth2 / Auth Service", type: "microservice", pos: new Vector3(-1.2, 1.8, -1) },
  { id: "rag-orch", label: "LLM Orchestrator", type: "microservice", pos: new Vector3(0.5, 1.2, 0.5) },
  { id: "agent-exec", label: "Agent Executor", type: "microservice", pos: new Vector3(2.2, 1.8, -0.5) },
  { id: "vector-db", label: "Vector DB (Qdrant)", type: "db", pos: new Vector3(0.8, -0.8, 1.0) },
  { id: "relational-db", label: "PostgreSQL Primary", type: "db", pos: new Vector3(-1.5, -1.2, -0.5) },
  { id: "cache", label: "Redis Cluster Cache", type: "db", pos: new Vector3(-3.2, -0.6, 0.8) },
  { id: "cloud-mesh", label: "AWS / K8s Cloud Mesh", type: "cloud", pos: new Vector3(3.0, -1.0, 0) },
];

const ARCH_CONNECTIONS = [
  [0, 1], [0, 2], [1, 5], [2, 3], [2, 4], [2, 5], [3, 4], [3, 7], [5, 6], [6, 7]
];

export function Architecture3D() {
  const groupRef = useRef<Group>(null);

  const linePositions = useMemo(() => {
    const lines: number[] = [];
    ARCH_CONNECTIONS.forEach(([startIdx, endIdx]) => {
      const start = ARCH_NODES[startIdx].pos;
      const end = ARCH_NODES[endIdx].pos;
      lines.push(start.x, start.y, start.z, end.x, end.y, end.z);
    });
    return new Float32Array(lines);
  }, []);

  const lineGeometry = useMemo(() => {
    const geom = new BufferGeometry();
    geom.setAttribute("position", new Float32BufferAttribute(linePositions, 3));
    return geom;
  }, [linePositions]);

  useFrame(({ clock, pointer }) => {
    const group = groupRef.current;
    if (!group) return;

    const time = clock.getElapsedTime();
    const progress = TimelineController.getProgress();

    // Chapter 04 Engineering range: 0.30 - 0.45
    const active = progress >= 0.28 && progress <= 0.48;
    group.visible = active;
    if (!active) return;

    // Camera orbit & rotation around the architecture mesh
    const orbitAngle = time * 0.35 + (progress - 0.30) * Math.PI * 3;
    group.rotation.y = orbitAngle + pointer.x * 0.15;
    group.rotation.x = Math.sin(time * 0.2) * 0.08 + pointer.y * -0.08;

    const scaleVal = MathUtils.clamp(1 - Math.abs(progress - 0.375) / 0.10, 0.2, 1);
    group.scale.setScalar(scaleVal);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Microservice Connection Beams */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#17b0cc" transparent opacity={0.4} linewidth={2} />
      </lineSegments>

      {/* 3D System Architecture Component Nodes */}
      {ARCH_NODES.map((node) => (
        <group key={node.id} position={node.pos.toArray()}>
          {node.type === "db" ? (
            // Database Cylinder Node
            <mesh>
              <cylinderGeometry args={[0.3, 0.3, 0.4, 32]} />
              <meshStandardMaterial color="#17b0cc" emissive="#0e7490" emissiveIntensity={0.8} roughness={0.2} />
            </mesh>
          ) : node.type === "api" ? (
            // API Gateway Cube Node
            <mesh>
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshStandardMaterial color="#ffffff" emissive="#17b0cc" emissiveIntensity={1.2} roughness={0.1} />
            </mesh>
          ) : (
            // Microservice Sphere Node
            <mesh>
              <sphereGeometry args={[0.25, 32, 32]} />
              <meshStandardMaterial color="#22d3ee" emissive="#17b0cc" emissiveIntensity={1.0} roughness={0.2} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

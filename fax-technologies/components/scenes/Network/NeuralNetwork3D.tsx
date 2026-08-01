"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { BufferGeometry, Float32BufferAttribute, Group, LineSegments, Vector3 } from "three";
import { ENGINE_EVENTS, eventBus } from "@/lib/experience/engine/EventBus";

export interface NodeData {
  id: string;
  label: string;
  category: string;
  position: Vector3;
  connections: number[];
}

export function NeuralNetwork3D() {
  const groupRef = useRef<Group>(null);
  const linesRef = useRef<LineSegments>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Generate 12 key AI Neural Nodes with connected mesh topology
  const { nodes, linePositions } = useMemo(() => {
    const rawNodes: NodeData[] = [
      { id: "nlp", label: "LLM Reasoning Engine", category: "AI Core", position: new Vector3(-3.2, 1.4, 0), connections: [1, 2, 4] },
      { id: "vision", label: "Computer Vision API", category: "Perception", position: new Vector3(-1.8, -1.2, 1.2), connections: [0, 2, 3] },
      { id: "agent", label: "Autonomous AI Agent", category: "Agentic AI", position: new Vector3(0, 0.8, -0.5), connections: [0, 1, 3, 5] },
      { id: "vector", label: "Vector Embeddings DB", category: "Storage", position: new Vector3(1.6, -1.5, 0.8), connections: [1, 2, 6] },
      { id: "predict", label: "Predictive Analytics", category: "Intelligence", position: new Vector3(-3.8, -0.8, -1.2), connections: [0, 5] },
      { id: "orch", label: "Agent Orchestrator", category: "Workflow", position: new Vector3(0.5, 2.2, 0.5), connections: [2, 4, 7] },
      { id: "pipeline", label: "ETL Data Pipeline", category: "Infrastructure", position: new Vector3(3.2, -0.6, -1.0), connections: [3, 7] },
      { id: "cloud", label: "Serverless Cloud Mesh", category: "Cloud", position: new Vector3(3.8, 1.6, 0.2), connections: [5, 6] },
    ];

    const lines: number[] = [];
    rawNodes.forEach((node) => {
      node.connections.forEach((targetIdx) => {
        const target = rawNodes[targetIdx];
        if (target) {
          lines.push(
            node.position.x, node.position.y, node.position.z,
            target.position.x, target.position.y, target.position.z
          );
        }
      });
    });

    return { nodes: rawNodes, linePositions: new Float32Array(lines) };
  }, []);

  const lineGeometry = useMemo(() => {
    const geom = new BufferGeometry();
    geom.setAttribute("position", new Float32BufferAttribute(linePositions, 3));
    return geom;
  }, [linePositions]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const time = clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.05;
  });

  const handlePointerOver = (id: string, label: string, category: string) => {
    setHoveredNodeId(id);
    eventBus.emit(ENGINE_EVENTS.NODE_HOVER, { id, label, category });
  };

  const handlePointerOut = () => {
    setHoveredNodeId(null);
    eventBus.emit(ENGINE_EVENTS.NODE_HOVER, null);
  };

  return (
    <group ref={groupRef}>
      {/* Dynamic Connecting Synapse Lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.45} linewidth={1} />
      </lineSegments>

      {/* 3D AI Nodes */}
      {nodes.map((node) => {
        const isHovered = hoveredNodeId === node.id;
        return (
          <group key={node.id} position={node.position.toArray()}>
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation();
                handlePointerOver(node.id, node.label, node.category);
              }}
              onPointerOut={handlePointerOut}
            >
              <sphereGeometry args={[isHovered ? 0.28 : 0.18, 32, 32]} />
              <meshStandardMaterial
                color={isHovered ? "#22d3ee" : "#8b5cf6"}
                emissive={isHovered ? "#22d3ee" : "#8b5cf6"}
                emissiveIntensity={isHovered ? 1.8 : 0.8}
                roughness={0.2}
              />
            </mesh>

            {/* Glowing outer halo */}
            <mesh>
              <sphereGeometry args={[isHovered ? 0.45 : 0.3, 16, 16]} />
              <meshBasicMaterial
                color={isHovered ? "#22d3ee" : "#a855f7"}
                transparent
                opacity={isHovered ? 0.35 : 0.15}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

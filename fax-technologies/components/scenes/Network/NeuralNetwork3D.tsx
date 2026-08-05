"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { BufferGeometry, Float32BufferAttribute, Group, LineBasicMaterial, LineSegments, MathUtils, Vector3 } from "three";
import { ENGINE_EVENTS, eventBus } from "@/lib/experience/engine/EventBus";
import { TimelineController } from "@/lib/experience/engine/TimelineController";

export interface NodeData {
  id: string;
  label: string;
  category: string;
  position: Vector3;
  connections: number[];
}

/**
 * Chapter 03 Intelligence (18–30%): Neural network forms from particles.
 * Only visible during its chapter — NEVER during hero or other chapters.
 * Nodes represent actual AI system components, not decoration.
 */
export function NeuralNetwork3D() {
  const groupRef = useRef<Group>(null);
  const linesRef = useRef<LineSegments>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const { nodes, linePositions } = useMemo(() => {
    const rawNodes: NodeData[] = [
      { id: "nlp", label: "LLM Reasoning Engine", category: "AI Core", position: new Vector3(-2.5, 1.0, 0), connections: [1, 2, 4] },
      { id: "vision", label: "Computer Vision API", category: "Perception", position: new Vector3(-1.2, -0.8, 0.8), connections: [0, 2, 3] },
      { id: "agent", label: "Autonomous AI Agent", category: "Agentic AI", position: new Vector3(0.5, 0.6, -0.3), connections: [0, 1, 3, 5] },
      { id: "vector", label: "Vector Embeddings DB", category: "Storage", position: new Vector3(1.8, -1.0, 0.5), connections: [1, 2, 6] },
      { id: "predict", label: "Predictive Analytics", category: "Intelligence", position: new Vector3(-2.8, -0.4, -0.8), connections: [0, 5] },
      { id: "orch", label: "Agent Orchestrator", category: "Workflow", position: new Vector3(0.8, 1.8, 0.3), connections: [2, 4, 7] },
      { id: "pipeline", label: "ETL Data Pipeline", category: "Infrastructure", position: new Vector3(2.8, -0.3, -0.6), connections: [3, 7] },
      { id: "cloud", label: "Serverless Cloud Mesh", category: "Cloud", position: new Vector3(3.2, 1.2, 0.1), connections: [5, 6] },
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

  useFrame(({ clock, pointer }) => {
    const group = groupRef.current;
    if (!group) return;

    const time = clock.getElapsedTime();
    const progress = TimelineController.getProgress();

    // ONLY visible during Chapter 03 Intelligence (0.18–0.30)
    const active = progress >= 0.17 && progress <= 0.32;
    group.visible = active;
    if (!active) return;

    // Fade in/out at chapter boundaries
    const chapterProgress = MathUtils.clamp((progress - 0.18) / 0.12, 0, 1);
    const opacity = Math.sin(chapterProgress * Math.PI); // Bell curve fade

    // Update line material opacity
    if (linesRef.current) {
      const mat = linesRef.current.material as LineBasicMaterial;
      mat.opacity = opacity * 0.25;
    }

    // Gentle drift — the network breathes, not spins wildly
    group.rotation.y = MathUtils.lerp(group.rotation.y, time * 0.04 + pointer.x * 0.08, 0.03);
    group.rotation.x = MathUtils.lerp(group.rotation.x, pointer.y * -0.05, 0.03);

    // Scale in from nothing
    const targetScale = MathUtils.clamp(chapterProgress * 3, 0, 1);
    group.scale.setScalar(MathUtils.lerp(group.scale.x, targetScale, 0.05));
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
      {/* Neural connection lines — subtle, data-flowing */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#17b0cc" transparent opacity={0.25} linewidth={1} />
      </lineSegments>

      {/* AI System Nodes — each represents a real component */}
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
              <sphereGeometry args={[isHovered ? 0.22 : 0.14, 24, 24]} />
              <meshStandardMaterial
                color={isHovered ? "#22d3ee" : "#17b0cc"}
                emissive={isHovered ? "#22d3ee" : "#0e7490"}
                emissiveIntensity={isHovered ? 1.2 : 0.4}
                roughness={0.3}
              />
            </mesh>

            {/* Subtle glow — not a giant halo */}
            {isHovered && (
              <mesh>
                <sphereGeometry args={[0.35, 16, 16]} />
                <meshBasicMaterial color="#17b0cc" transparent opacity={0.15} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

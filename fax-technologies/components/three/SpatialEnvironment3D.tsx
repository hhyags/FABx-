"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { BufferGeometry, Float32BufferAttribute, Group, MathUtils, Mesh, Vector3 } from "three";
import { TimelineController } from "@/lib/experience/engine/TimelineController";

const NEURON_STOPS = [
  {
    id: "hrflow-ai",
    stopNumber: "01",
    title: "HRFlow AI",
    category: "AI Product",
    image: "/images/projects/hrflow-ai.png",
    pos: new Vector3(2.2, 0.4, -2.5),
    range: [0.47, 0.54] as const,
    demoUrl: "/work/hrflow-ai",
    desc: "AI-powered HR platform automating candidate screening & recruitment analytics.",
  },
  {
    id: "medflow-ai",
    stopNumber: "02",
    title: "MedFlow AI",
    category: "Healthcare AI",
    image: "/images/projects/medflow-ai.png",
    pos: new Vector3(-2.2, -0.5, -4.0),
    range: [0.54, 0.60] as const,
    demoUrl: "/work/medflow-ai",
    desc: "Clinical decision support system streamlining patient data workflows.",
  },
  {
    id: "kirana-ai",
    stopNumber: "03",
    title: "Kirana AI",
    category: "Retail Intelligence",
    image: "/images/projects/kirana-ai.png",
    pos: new Vector3(2.0, -1.2, -5.5),
    range: [0.60, 0.66] as const,
    demoUrl: "/work/godowniq",
    desc: "Inventory prediction & retail intelligence for commerce businesses.",
  },
  {
    id: "kgn-service",
    stopNumber: "04",
    title: "KGN Service",
    category: "Enterprise",
    image: "/images/projects/kgn-service.png",
    pos: new Vector3(-2.0, 0.6, -7.0),
    range: [0.66, 0.72] as const,
    demoUrl: "/work/kgn-enterprise",
    desc: "Enterprise service management with CRM automation & operational analytics.",
  },
];

/**
 * Case Study spatial cards — only rendered during Chapters 05 & 06 (0.45–0.72).
 * Uses a top-level `active` state to conditionally render (not just hide)
 * the <Html> elements, preventing them from leaking into the hero view.
 */
export function SpatialEnvironment3D() {
  const groupRef = useRef<Group>(null);
  const [active, setActive] = useState(false);

  const synapseLineGeometry = useMemo(() => {
    const points: number[] = [];
    for (let i = 0; i < NEURON_STOPS.length - 1; i++) {
      const start = NEURON_STOPS[i].pos;
      const end = NEURON_STOPS[i + 1].pos;
      points.push(start.x, start.y, start.z, end.x, end.y, end.z);
    }
    const geom = new BufferGeometry();
    geom.setAttribute("position", new Float32BufferAttribute(points, 3));
    return geom;
  }, []);

  useFrame(({ clock, pointer }) => {
    const group = groupRef.current;
    if (!group) return;

    const time = clock.getElapsedTime();
    const progress = TimelineController.getProgress();

    // Conditional RENDERING — not just visibility
    const shouldBeActive = progress >= 0.44 && progress <= 0.73;
    if (shouldBeActive !== active) {
      setActive(shouldBeActive);
    }

    group.visible = shouldBeActive;
    if (!shouldBeActive) return;

    const targetY = (progress - 0.45) * -8.0 + Math.sin(time * 0.3) * 0.03;
    const targetX = pointer.x * 0.1;
    const targetZ = (progress - 0.45) * -4.0;

    group.position.y = MathUtils.lerp(group.position.y, targetY, 0.04);
    group.position.x = MathUtils.lerp(group.position.x, targetX, 0.04);
    group.position.z = MathUtils.lerp(group.position.z, targetZ, 0.04);

    group.rotation.y = MathUtils.lerp(group.rotation.y, pointer.x * 0.03, 0.03);
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines — only render when active */}
      {active && (
        <lineSegments geometry={synapseLineGeometry}>
          <lineBasicMaterial color="#17b0cc" transparent opacity={0.2} linewidth={1} />
        </lineSegments>
      )}

      {/* Project cards — conditionally RENDERED, not just hidden */}
      {active && NEURON_STOPS.map((stop, idx) => (
        <NeuronAtomStop key={stop.id} stop={stop} index={idx} />
      ))}
    </group>
  );
}

function NeuronAtomStop({
  stop,
  index,
}: {
  stop: (typeof NEURON_STOPS)[number];
  index: number;
}) {
  const groupRef = useRef<Group>(null);
  const ringRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const time = clock.getElapsedTime();
    const progress = TimelineController.getProgress();
    const [start, end] = stop.range;

    const isCurrentStop = progress >= start && progress <= end;

    if (ringRef.current) {
      ringRef.current.rotation.x = time * (isCurrentStop ? 0.8 : 0.3);
      ringRef.current.rotation.y = time * (isCurrentStop ? 0.6 : 0.2);
    }

    const pulse = 1 + Math.sin(time * 1.5 + index) * 0.04;
    const targetScale = isCurrentStop ? 1.15 * pulse : 0.8 * pulse;
    groupRef.current.scale.setScalar(MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.05));
  });

  return (
    <group ref={groupRef} position={stop.pos.toArray()}>
      <mesh>
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshStandardMaterial
          color="#17b0cc"
          emissive="#17b0cc"
          emissiveIntensity={1.0}
          roughness={0.3}
        />
      </mesh>

      <mesh ref={ringRef}>
        <torusGeometry args={[0.35, 0.01, 16, 48]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.4} />
      </mesh>

      <Html transform distanceFactor={7} zIndexRange={[10, 0]}>
        <div className="group relative w-72 overflow-hidden rounded-xl border border-white/15 bg-black/90 p-3 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/40">
          <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-cyan-400/70">
            <span>{stop.stopNumber}</span>
            <span>{stop.category}</span>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-white/5">
            <img
              src={stop.image}
              alt={stop.title}
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          <div className="mt-2.5">
            <h4 className="font-display text-sm font-bold text-white">{stop.title}</h4>
            <p className="mt-1 font-sans text-[11px] text-white/40 line-clamp-2">{stop.desc}</p>
          </div>

          <div className="mt-2.5 flex items-center justify-end border-t border-white/8 pt-2">
            <a
              href={stop.demoUrl}
              className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 font-sans text-[10px] font-semibold text-black transition-all hover:bg-white"
            >
              View Project →
            </a>
          </div>
        </div>
      </Html>
    </group>
  );
}

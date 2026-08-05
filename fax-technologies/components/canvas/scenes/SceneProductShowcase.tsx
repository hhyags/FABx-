"use client";

import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { getScrollProgress, mapRange } from "@/lib/scrollStore";

const PRODUCTS = [
  {
    id: "hrflow",
    title: "HRFlow AI",
    category: "AI Recruitment & Resume Parsing",
    metrics: "99.4% Parsing Accuracy • Sub-50ms Match",
    img: "/images/projects/hrflow-ai.png",
    range: [0.55, 0.58],
  },
  {
    id: "medflow",
    title: "MedFlow AI",
    category: "Clinical Decision Support System",
    metrics: "HIPAA Compliant • Realtime Diagnostics",
    img: "/images/projects/medflow-ai.png",
    range: [0.58, 0.61],
  },
  {
    id: "kirana",
    title: "Kirana AI",
    category: "Retail Intelligence & Inventory AI",
    metrics: "30-Day Demand Forecast • Stock Auto-Reorder",
    img: "/images/projects/kirana-ai.png",
    range: [0.61, 0.64],
  },
  {
    id: "kgn",
    title: "KGN Service Enterprise",
    category: "Enterprise Service & CRM Engine",
    metrics: "Automated Ticket Dispatch • Multi-Tenant SLA",
    img: "/images/projects/kgn-service.png",
    range: [0.64, 0.68],
  },
];

export function SceneProductShowcase() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const p = getScrollProgress();
    const time = clock.getElapsedTime();

    // Scene 06 Active Range: 0.55 to 0.68 (buffer 0.53 to 0.70)
    if (p < 0.53 || p > 0.70) {
      if (groupRef.current) groupRef.current.visible = false;
      return;
    }
    if (groupRef.current) groupRef.current.visible = true;

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.04;
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {PRODUCTS.map((prod) => (
        <ProductWindow key={prod.id} product={prod} />
      ))}
    </group>
  );
}

function ProductWindow({ product }: { product: (typeof PRODUCTS)[number] }) {
  const windowRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const p = getScrollProgress();
    const [start, end] = product.range;

    if (!windowRef.current) return;

    if (p < start - 0.02 || p > end + 0.02) {
      windowRef.current.visible = false;
      return;
    }
    windowRef.current.visible = true;

    // Scale + Fade In when opening, minimize when closing
    let scale = 0;

    if (p >= start && p <= end) {
      const mid = (start + end) / 2;
      if (p <= mid) {
        scale = mapRange(p, start, mid, 0.2, 1.0);
      } else {
        scale = mapRange(p, mid, end, 1.0, 0.2);
      }
    }

    windowRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={windowRef} position={[0, 0, 0]}>
      {/* 3D Glass Window Frame */}
      <mesh>
        <boxGeometry args={[4.4, 2.7, 0.08]} />
        <meshPhysicalMaterial
          color="#0b0d14"
          metalness={0.8}
          roughness={0.15}
          transmission={0.85}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* HTML crisp dashboard UI rendered inside 3D frame */}
      <Html transform occlude distanceFactor={5} position={[0, 0, 0.05]}>
        <div className="w-[440px] rounded-xl bg-[#090b10]/95 p-5 shadow-2xl border border-cyan-400/30 backdrop-blur-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-400">
                {product.category}
              </span>
              <h3 className="font-display text-lg font-bold text-white">{product.title}</h3>
            </div>
            <span className="rounded-full bg-cyan-500/10 px-3 py-1 font-mono text-[10px] font-semibold text-cyan-400 border border-cyan-400/20">
              LIVE APP
            </span>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-white/5 border border-white/10 mb-3">
            <img
              src={product.img}
              alt={product.title}
              className="h-full w-full object-cover object-top"
            />
          </div>

          <div className="flex items-center justify-between font-mono text-[10px] text-white/60 border-t border-white/10 pt-2.5">
            <span>{product.metrics}</span>
            <span className="text-cyan-400 font-bold">Explore App →</span>
          </div>
        </div>
      </Html>
    </group>
  );
}

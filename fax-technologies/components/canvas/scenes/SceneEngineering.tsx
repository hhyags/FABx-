"use client";

import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { getScrollProgress, mapRange } from "@/lib/scrollStore";

export function SceneEngineering() {
  const groupRef = useRef<THREE.Group>(null);
  const gridHelperRef = useRef<THREE.GridHelper>(null);
  const appWindowRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const p = getScrollProgress();
    const time = clock.getElapsedTime();

    // Scene 05 Active Range: 0.40 to 0.55 (buffer 0.38 to 0.57)
    if (p < 0.38 || p > 0.57) {
      if (groupRef.current) groupRef.current.visible = false;
      return;
    }
    if (groupRef.current) groupRef.current.visible = true;

    const localP = mapRange(p, 0.40, 0.55, 0.0, 1.0);

    // Grid wireframe blueprint fade & scale
    if (gridHelperRef.current) {
      const gridOpacity = mapRange(localP, 0.0, 0.3, 0.0, 0.4);
      (gridHelperRef.current.material as THREE.Material).opacity = gridOpacity;
    }

    // App window assembly (pieces snap together based on localP)
    if (appWindowRef.current) {
      const windowScale = mapRange(localP, 0.2, 0.8, 0.2, 1.0);
      const windowRotY = mapRange(localP, 0.2, 0.8, -0.4, 0.0) + Math.sin(time * 0.4) * 0.03;
      appWindowRef.current.scale.setScalar(windowScale);
      appWindowRef.current.rotation.y = windowRotY;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D Blueprint Wireframe Grid Floor */}
      <gridHelper
        ref={gridHelperRef}
        args={[20, 40, "#17b0cc", "#0e7490"]}
        position={[0, -2, 0]}
        rotation={[0, 0, 0]}
      />

      {/* Assembling Floating Application Window */}
      <group ref={appWindowRef} position={[0, 0, 0]}>
        {/* Main Window Frame */}
        <mesh>
          <boxGeometry args={[4.2, 2.6, 0.1]} />
          <meshPhysicalMaterial
            color="#090a0f"
            metalness={0.8}
            roughness={0.2}
            clearcoat={0.5}
            transparent
            opacity={0.92}
          />
        </mesh>

        {/* HTML UI Components & Self-drawing Analytics Chart */}
        <Html transform distanceFactor={5} position={[0, 0, 0.06]}>
          <div className="w-[420px] rounded-xl bg-[#08090d]/95 p-5 shadow-2xl border border-cyan-500/20 backdrop-blur-xl">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs font-bold text-white/90">
                  FABX ENGINEERING STUDIO — SYSTEM DASHBOARD
                </span>
              </div>
              <span className="font-mono text-[10px] text-cyan-400">ACTIVE BUILD</span>
            </div>

            {/* Metrics cards grid */}
            <div className="grid grid-cols-3 gap-3 mb-4 font-mono text-[10px]">
              <div className="rounded-lg bg-white/5 p-2.5 border border-white/10 space-y-1">
                <div className="text-white/40">SYSTEM LOAD</div>
                <div className="text-sm font-bold text-white">42.8%</div>
              </div>
              <div className="rounded-lg bg-white/5 p-2.5 border border-white/10 space-y-1">
                <div className="text-white/40">AGENT LATENCY</div>
                <div className="text-sm font-bold text-cyan-400">18 ms</div>
              </div>
              <div className="rounded-lg bg-white/5 p-2.5 border border-white/10 space-y-1">
                <div className="text-white/40">MEMORY ALLOC</div>
                <div className="text-sm font-bold text-emerald-400">3.4 GB</div>
              </div>
            </div>

            {/* Self-drawing Chart SVG */}
            <div className="rounded-lg bg-black/40 p-3 border border-white/10">
              <div className="text-[10px] font-mono text-white/50 mb-2">LIVE REALTIME THROUGHPUT</div>
              <svg className="w-full h-20 text-cyan-400 overflow-visible" viewBox="0 0 300 60">
                <path
                  d="M 0 50 Q 50 10, 100 35 T 200 15 T 300 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeDasharray="400"
                  strokeDashoffset="0"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}

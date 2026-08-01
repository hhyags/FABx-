"use client";

import { Environment, Lightformer, SoftShadows } from "@react-three/drei";

export function Lights() {
  return (
    <>
      <SoftShadows size={18} samples={14} focus={0.72} />
      <ambientLight intensity={0.28} />
      <directionalLight
        castShadow
        color="#ffffff"
        intensity={3.2}
        position={[3.4, 4.8, 5.2]}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.00008}
      />
      <pointLight color="#8b5cf6" intensity={3.4} position={[-3.8, 1.8, 3.2]} />
      <pointLight color="#22d3ee" intensity={2.4} position={[3.2, -0.5, 2.8]} />
      <spotLight
        angle={0.36}
        color="#ffffff"
        intensity={5.4}
        penumbra={0.9}
        position={[0, 3.7, -4.3]}
      />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2.5} position={[0, 4, -5]} scale={[8, 4, 1]} />
        <Lightformer form="rect" intensity={1.4} position={[-4, 1, 3]} scale={[3, 5, 1]} />
        <Lightformer form="ring" intensity={1.8} position={[3, 2, -3]} scale={3} />
      </Environment>
    </>
  );
}

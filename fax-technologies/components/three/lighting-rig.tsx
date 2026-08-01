"use client";

type LightingRigProps = {
  intensity?: number;
};

export function LightingRig({ intensity = 1 }: LightingRigProps) {
  return (
    <>
      <ambientLight intensity={0.35 * intensity} />
      <directionalLight position={[4, 6, 8]} intensity={1.25 * intensity} />
      <pointLight position={[-5, 2, 4]} intensity={0.75 * intensity} color="#8b5cf6" />
      <pointLight position={[5, -1, 3]} intensity={0.55 * intensity} color="#22d3ee" />
    </>
  );
}

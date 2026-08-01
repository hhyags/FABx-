"use client";

import { PerspectiveCamera } from "@react-three/drei";

type CameraManagerProps = {
  position?: [number, number, number];
  fov?: number;
};

export function CameraManager({ position = [0, 0, 8], fov = 45 }: CameraManagerProps) {
  return <PerspectiveCamera makeDefault position={position} fov={fov} near={0.1} far={100} />;
}

"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils, PerspectiveCamera as ThreePerspectiveCamera, Vector3 } from "three";

type CameraRigProps = {
  reducedMotion: boolean;
};

const cameraPosition = new Vector3(0, 0.5, 8.2);
const lookAtTarget = new Vector3(0, 0.35, 0);

export function CameraRig({ reducedMotion }: CameraRigProps) {
  const cameraRef = useRef<ThreePerspectiveCamera>(null);

  useFrame(({ clock, pointer }) => {
    const camera = cameraRef.current;

    if (!camera || reducedMotion) {
      return;
    }

    const time = clock.getElapsedTime();
    const driftX = Math.sin(time * 0.18) * 0.14 + pointer.x * 0.18;
    const driftY = Math.cos(time * 0.16) * 0.08 + pointer.y * 0.08;

    camera.position.x = MathUtils.lerp(camera.position.x, cameraPosition.x + driftX, 0.035);
    camera.position.y = MathUtils.lerp(camera.position.y, cameraPosition.y + driftY, 0.035);
    camera.position.z = MathUtils.lerp(camera.position.z, cameraPosition.z, 0.035);
    camera.lookAt(lookAtTarget);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
      fov={34}
      near={0.1}
      far={80}
    />
  );
}

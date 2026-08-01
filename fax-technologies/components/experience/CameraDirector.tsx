"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils, PerspectiveCamera as ThreePerspectiveCamera, Vector3 } from "three";
import sceneConfig from "@/lib/experience/config/scene-config.json";
import { MOTION_TOKENS } from "@/lib/experience/engine/MotionTokens";
import { TimelineController } from "@/lib/experience/engine/TimelineController";

type CameraDirectorProps = {
  reducedMotion: boolean;
};

type CameraConfig = {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
};

type SceneConfigMap = Record<string, { camera: CameraConfig }>;

const currentPos = new Vector3(0, 0.5, 8.2);
const targetPos = new Vector3(0, 0.35, 0);
const lookTarget = new Vector3(0, 0.35, 0);

export function CameraDirector({ reducedMotion }: CameraDirectorProps) {
  const cameraRef = useRef<ThreePerspectiveCamera>(null);

  useFrame(({ clock, pointer }) => {
    const camera = cameraRef.current;
    if (!camera) return;

    const progress = TimelineController.getProgress();
    const activeId = TimelineController.getActiveSceneId(progress);
    const config = (sceneConfig.scenes as unknown as SceneConfigMap)[activeId]?.camera;

    if (config) {
      targetPos.set(config.position[0], config.position[1], config.position[2]);
      lookTarget.set(config.target[0], config.target[1], config.target[2]);
    }

    const time = clock.getElapsedTime();
    const driftX = reducedMotion ? 0 : Math.sin(time * 0.18) * 0.14 + pointer.x * 0.18;
    const driftY = reducedMotion ? 0 : Math.cos(time * 0.16) * 0.08 + pointer.y * 0.08;

    currentPos.x = MathUtils.lerp(currentPos.x, targetPos.x + driftX, MOTION_TOKENS.lerp.cameraDrift);
    currentPos.y = MathUtils.lerp(currentPos.y, targetPos.y + driftY, MOTION_TOKENS.lerp.cameraDrift);
    currentPos.z = MathUtils.lerp(currentPos.z, targetPos.z, MOTION_TOKENS.lerp.cameraDrift);

    camera.position.copy(currentPos);
    camera.lookAt(lookTarget);

    if (config && camera.fov !== config.fov) {
      camera.fov = MathUtils.lerp(camera.fov, config.fov, MOTION_TOKENS.lerp.cameraDrift);
      camera.updateProjectionMatrix();
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0.5, 8.2]}
      fov={34}
      near={0.1}
      far={100}
    />
  );
}

"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { getScrollProgress, mapRange } from "@/lib/scrollStore";

/* ── Camera Anchor Waypoints matching the 10 Scene Timeline ── */
const WAYPOINTS = [
  // Scene 01: 0.00-0.08 Boot (Orbit reveal)
  { progress: 0.00, pos: new THREE.Vector3(0, 0.5, 8.5),   look: new THREE.Vector3(0, 0.2, 0), fov: 34 },
  { progress: 0.08, pos: new THREE.Vector3(1.2, 0.3, 7.0),  look: new THREE.Vector3(0, 0.1, 0), fov: 36 },
  
  // Scene 02: 0.08-0.15 Logo Evolution (Explode & Swirl)
  { progress: 0.15, pos: new THREE.Vector3(0, 0.1, 5.2),    look: new THREE.Vector3(0, 0, 0), fov: 38 },
  
  // Scene 03: 0.15-0.28 AI Core (Fly INTO Core)
  { progress: 0.22, pos: new THREE.Vector3(0, 0, 3.2),      look: new THREE.Vector3(0, 0, 0), fov: 42 },
  { progress: 0.28, pos: new THREE.Vector3(0, 0, 0.6),      look: new THREE.Vector3(0, 0, -2), fov: 50 },
  
  // Scene 04: 0.28-0.40 Operating System (Rotate around OS primitives)
  { progress: 0.34, pos: new THREE.Vector3(-2.2, 1.0, 6.2), look: new THREE.Vector3(0, 0, 0), fov: 38 },
  { progress: 0.40, pos: new THREE.Vector3(-1.0, 0.5, 6.8), look: new THREE.Vector3(0, 0, 0), fov: 36 },
  
  // Scene 05: 0.40-0.55 Engineering (Blueprint & App Assembly)
  { progress: 0.47, pos: new THREE.Vector3(1.8, 1.2, 6.8),  look: new THREE.Vector3(0, 0.2, 0), fov: 36 },
  { progress: 0.55, pos: new THREE.Vector3(0, 0.8, 7.2),    look: new THREE.Vector3(0, 0, 0), fov: 35 },
  
  // Scene 06: 0.55-0.68 Product Showcase (Focus on floating windows)
  { progress: 0.61, pos: new THREE.Vector3(0, 0.4, 6.5),    look: new THREE.Vector3(0, 0, 0), fov: 34 },
  { progress: 0.68, pos: new THREE.Vector3(0, 0.3, 6.8),    look: new THREE.Vector3(0, 0, 0), fov: 35 },
  
  // Scene 07: 0.68-0.80 AI Agents (Light trail curves & nodes)
  { progress: 0.74, pos: new THREE.Vector3(-1.5, -0.4, 6.2), look: new THREE.Vector3(0, 0, 0), fov: 36 },
  { progress: 0.80, pos: new THREE.Vector3(0, -0.6, 7.0),   look: new THREE.Vector3(0, -0.5, 0), fov: 36 },
  
  // Scene 08: 0.80-0.90 Deployment (Pan along horizontal pipeline)
  { progress: 0.85, pos: new THREE.Vector3(0, -0.8, 7.8),   look: new THREE.Vector3(0, -0.8, 0), fov: 34 },
  { progress: 0.90, pos: new THREE.Vector3(0, 0, 9.5),      look: new THREE.Vector3(0, 0, 0), fov: 38 },
  
  // Scene 09: 0.90-0.97 Global Network (Pull back to wide orbital view)
  { progress: 0.94, pos: new THREE.Vector3(0, 1.2, 12.5),   look: new THREE.Vector3(0, 0, 0), fov: 44 },
  { progress: 0.97, pos: new THREE.Vector3(0, 0.6, 10.0),   look: new THREE.Vector3(0, 0.2, 0), fov: 38 },
  
  // Scene 10: 0.97-1.00 Final CTA (Focus back on central emblem & CTA)
  { progress: 1.00, pos: new THREE.Vector3(0, 0.4, 8.2),    look: new THREE.Vector3(0, 0.2, 0), fov: 34 },
];

/* Custom smooth cubic power2 easing function */
function easeInOutPower2(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export function CameraRig() {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 0.5, 8.5));
  const currentLook = useRef(new THREE.Vector3(0, 0.2, 0));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));
  const smoothedProgressRef = useRef(0);

  // Build CatmullRom curve for camera position path
  const curve = useMemo(() => {
    const points = WAYPOINTS.map((w) => w.pos);
    return new THREE.CatmullRomCurve3(points, false, "centripetal", 0.5);
  }, []);

  useFrame(({ pointer }) => {
    const rawProgress = getScrollProgress();
    // Frame-dampened smoothed progress for butter-smooth camera trajectory
    smoothedProgressRef.current = THREE.MathUtils.lerp(smoothedProgressRef.current, rawProgress, 0.05);
    const progress = smoothedProgressRef.current;

    const easedProgress = easeInOutPower2(progress);

    // Get position on curve
    const pathPoint = curve.getPointAt(easedProgress);

    // Interpolate lookAt target and FOV
    targetLook.current.set(0, 0, 0);
    let targetFov = 34;

    for (let i = 0; i < WAYPOINTS.length - 1; i++) {
      const curr = WAYPOINTS[i];
      const next = WAYPOINTS[i + 1];

      if (progress >= curr.progress && progress <= next.progress) {
        const localT = mapRange(progress, curr.progress, next.progress, 0, 1);
        const easedLocalT = easeInOutPower2(localT);
        targetLook.current.lerpVectors(curr.look, next.look, easedLocalT);
        targetFov = THREE.MathUtils.lerp(curr.fov, next.fov, easedLocalT);
        break;
      }
    }

    // Add subtle mouse parallax drift
    const driftX = pointer.x * 0.15;
    const driftY = pointer.y * 0.1;

    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, pathPoint.x + driftX, 0.06);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, pathPoint.y + driftY, 0.06);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, pathPoint.z, 0.06);

    currentLook.current.lerp(targetLook.current, 0.06);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLook.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.04);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

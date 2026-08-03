"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, MathUtils, Points } from "three";
import { TimelineController } from "@/lib/experience/engine/TimelineController";

type ParticleMorphSystemProps = {
  reducedMotion: boolean;
};

const PARTICLE_COUNT = 1800;

/**
 * Particles morph between chapter targets:
 * - Ch01 Arrival: Clustered around the logo position (right side)
 * - Ch02 Spark: All collapse into one central spark
 * - Ch03 Intelligence: Expand into neural network constellation
 * - Ch04 Engineering: Form an architectural grid
 * - Ch05-06 Products: Scatter as ambient atmosphere
 * - Ch07 Process: Gentle vertical flow
 * - Ch08 Trust: Fade to ZERO opacity (pure whitespace)
 * - Ch09 Contact: Reform around logo position
 */
export function ParticleMorphSystem({ reducedMotion }: ParticleMorphSystemProps) {
  const pointsRef = useRef<Points>(null);

  const { initialPos, sparkPos, networkPos, archPos, scatterPos, outroPos } = useMemo(() => {
    const pInitial = new Float32Array(PARTICLE_COUNT * 3);
    const pSpark = new Float32Array(PARTICLE_COUNT * 3);
    const pNetwork = new Float32Array(PARTICLE_COUNT * 3);
    const pArch = new Float32Array(PARTICLE_COUNT * 3);
    const pScatter = new Float32Array(PARTICLE_COUNT * 3);
    const pOutro = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;

      // Ch01: Clustered near logo (right side of screen, subtle cloud)
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.8 + Math.random() * 1.5;
      pInitial[idx] = 2.8 + Math.cos(angle) * radius * 0.6;
      pInitial[idx + 1] = Math.sin(angle) * radius * 0.4;
      pInitial[idx + 2] = (Math.random() - 0.5) * 1.0;

      // Ch02: Single spark — all particles drift to infinity except index 0
      if (i === 0) {
        pSpark[idx] = 0;
        pSpark[idx + 1] = 0;
        pSpark[idx + 2] = 0;
      } else {
        pSpark[idx] = (Math.random() - 0.5) * 0.05;
        pSpark[idx + 1] = 3 + Math.random() * 10;
        pSpark[idx + 2] = (Math.random() - 0.5) * 0.05;
      }

      // Ch03: Neural network sphere
      const r = 2.0 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      pNetwork[idx] = r * Math.sin(phi) * Math.cos(theta);
      pNetwork[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
      pNetwork[idx + 2] = r * Math.cos(phi);

      // Ch04: Architecture grid
      pArch[idx] = (Math.floor(i % 15) - 7) * 0.5;
      pArch[idx + 1] = (Math.floor((i / 15) % 15) - 7) * 0.5;
      pArch[idx + 2] = (Math.floor(i / 225) - 4) * 0.4;

      // Ch05-07: Ambient scatter — wide, sparse
      pScatter[idx] = (Math.random() - 0.5) * 12;
      pScatter[idx + 1] = (Math.random() - 0.5) * 8;
      pScatter[idx + 2] = (Math.random() - 0.5) * 6;

      // Ch09: Reform around logo
      pOutro[idx] = pInitial[idx];
      pOutro[idx + 1] = pInitial[idx + 1];
      pOutro[idx + 2] = pInitial[idx + 2];
    }

    return {
      initialPos: pInitial,
      sparkPos: pSpark,
      networkPos: pNetwork,
      archPos: pArch,
      scatterPos: pScatter,
      outroPos: pOutro,
    };
  }, []);

  const currentPos = useMemo(() => new Float32Array(initialPos), [initialPos]);

  const geometry = useMemo(() => {
    const geom = new BufferGeometry();
    geom.setAttribute("position", new BufferAttribute(currentPos, 3));
    return geom;
  }, [currentPos]);

  useFrame(({ clock, pointer }) => {
    if (!pointsRef.current) return;
    const progress = TimelineController.getProgress();
    const time = clock.getElapsedTime();

    const positionAttr = geometry.attributes.position as BufferAttribute;
    const array = positionAttr.array as Float32Array;

    // Determine morph target and opacity per chapter
    let target = initialPos;
    let opacityTarget = 0.5;

    if (progress <= 0.10) {
      // Ch01 Arrival — subtle cloud near logo
      target = initialPos;
      opacityTarget = 0.35;
    } else if (progress <= 0.18) {
      // Ch02 Spark — collapse
      target = sparkPos;
      opacityTarget = 0.6;
    } else if (progress <= 0.30) {
      // Ch03 Intelligence — neural sphere
      target = networkPos;
      opacityTarget = 0.45;
    } else if (progress <= 0.45) {
      // Ch04 Engineering — grid
      target = archPos;
      opacityTarget = 0.35;
    } else if (progress <= 0.80) {
      // Ch05-07 Products/Case Studies/Process — ambient
      target = scatterPos;
      opacityTarget = 0.2;
    } else if (progress <= 0.88) {
      // Ch08 Trust — ZERO particles, pure whitespace
      opacityTarget = 0.0;
    } else {
      // Ch09 Contact — reform
      target = outroPos;
      opacityTarget = 0.45;
    }

    // Smooth morphing
    const lerpSpeed = 0.04;
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      array[i] = MathUtils.lerp(array[i], target[i], lerpSpeed);
    }
    positionAttr.needsUpdate = true;

    // Material opacity
    const material = pointsRef.current.material as any;
    material.opacity = MathUtils.lerp(material.opacity, opacityTarget, 0.06);

    // Very gentle rotation — ambient, not distracting
    pointsRef.current.rotation.y = time * 0.015 + pointer.x * 0.02;
    pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.01;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#17b0cc"
        size={reducedMotion ? 0.02 : 0.025}
        sizeAttenuation
        transparent
        opacity={0.35}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

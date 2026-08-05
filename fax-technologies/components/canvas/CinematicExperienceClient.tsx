"use client";

import dynamic from "next/dynamic";

const CinematicExperience = dynamic(
  () => import("@/components/canvas/CinematicExperience").then((mod) => mod.CinematicExperience),
  { ssr: false }
);

export function CinematicExperienceClient() {
  return <CinematicExperience />;
}

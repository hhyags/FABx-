"use client";

import { Suspense } from "react";
import { SceneBoot } from "./scenes/SceneBoot";
import { SceneLogoEvolution } from "./scenes/SceneLogoEvolution";
import { SceneAICore } from "./scenes/SceneAICore";
import { SceneOperatingSystem } from "./scenes/SceneOperatingSystem";
import { SceneEngineering } from "./scenes/SceneEngineering";
import { SceneProductShowcase } from "./scenes/SceneProductShowcase";
import { SceneAIAgents } from "./scenes/SceneAIAgents";
import { SceneDeployment } from "./scenes/SceneDeployment";
import { SceneGlobalNetwork } from "./scenes/SceneGlobalNetwork";
import { SceneFinalCTA } from "./scenes/SceneFinalCTA";

export function SceneOrchestrator() {
  return (
    <Suspense fallback={null}>
      {/* 01. 0-8% System Boot */}
      <SceneBoot />

      {/* 02. 8-15% Logo Evolution */}
      <SceneLogoEvolution />

      {/* 03. 15-28% AI Core */}
      <SceneAICore />

      {/* 04. 28-40% Operating System */}
      <SceneOperatingSystem />

      {/* 05. 40-55% Engineering */}
      <SceneEngineering />

      {/* 06. 55-68% Product Showcase */}
      <SceneProductShowcase />

      {/* 07. 68-80% AI Agents */}
      <SceneAIAgents />

      {/* 08. 80-90% Deployment */}
      <SceneDeployment />

      {/* 09. 90-97% Global Network */}
      <SceneGlobalNetwork />

      {/* 10. 97-100% Final CTA */}
      <SceneFinalCTA />
    </Suspense>
  );
}

import { SceneId } from "./SceneContract";

export type QualityTier = "high" | "medium" | "low";

export interface ExperienceState {
  timelineProgress: number; // 0.00 to 1.00
  activeScene: SceneId;
  targetScene: SceneId;
  qualityTier: QualityTier;
  reducedMotion: boolean;
  isLoaded: boolean;
  fps: number;
  mouse: { x: number; y: number };
  activeNodeId: string | null;
}

type Listener = () => void;

class ExperienceStoreImpl {
  private state: ExperienceState = {
    timelineProgress: 0,
    activeScene: "hero",
    targetScene: "hero",
    qualityTier: "high",
    reducedMotion: false,
    isLoaded: false,
    fps: 60,
    mouse: { x: 0, y: 0 },
    activeNodeId: null,
  };

  private listeners: Set<Listener> = new Set();

  getState(): ExperienceState {
    return this.state;
  }

  setState(partial: Partial<ExperienceState>): void {
    this.state = { ...this.state, ...partial };
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const useExperienceStore = new ExperienceStoreImpl();

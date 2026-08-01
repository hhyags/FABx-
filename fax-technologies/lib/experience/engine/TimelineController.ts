import sceneConfig from "../config/scene-config.json";
import { ENGINE_EVENTS, eventBus } from "./EventBus";

type SceneConfigItem = {
  id: string;
  range: number[];
};

export class TimelineController {
  private static progress: number = 0;

  static updateProgress(normalizedProgress: number): void {
    const clamped = Math.max(0, Math.min(1, normalizedProgress));
    if (Math.abs(this.progress - clamped) < 0.0001) return;

    this.progress = clamped;
    eventBus.emit(ENGINE_EVENTS.TIMELINE_UPDATE, clamped);
  }

  static getProgress(): number {
    return this.progress;
  }

  static getActiveSceneId(progress: number = this.progress): string {
    const scenes = Object.values(sceneConfig.scenes) as unknown as SceneConfigItem[];
    for (const scene of scenes) {
      if (progress >= scene.range[0] && progress <= scene.range[1]) {
        return scene.id;
      }
    }
    return scenes[scenes.length - 1].id;
  }

  static getSubProgress(sceneId: string, progress: number = this.progress): number {
    const scenesMap = sceneConfig.scenes as unknown as Record<string, SceneConfigItem>;
    const scene = scenesMap[sceneId];
    if (!scene) return 0;
    const [min, max] = scene.range;
    if (progress <= min) return 0;
    if (progress >= max) return 1;
    return (progress - min) / (max - min);
  }
}

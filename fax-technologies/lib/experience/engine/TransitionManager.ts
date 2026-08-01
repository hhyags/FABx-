import sceneConfig from "../config/scene-config.json";
import { TimelineController } from "./TimelineController";

export class TransitionManager {
  static getTransitionState(globalProgress: number) {
    const activeSceneId = TimelineController.getActiveSceneId(globalProgress);
    const subProgress = TimelineController.getSubProgress(activeSceneId, globalProgress);

    const scenes = Object.keys(sceneConfig.scenes);
    const currentIndex = scenes.indexOf(activeSceneId);
    const nextSceneId = scenes[Math.min(scenes.length - 1, currentIndex + 1)];
    const prevSceneId = scenes[Math.max(0, currentIndex - 1)];

    return {
      activeSceneId,
      nextSceneId,
      prevSceneId,
      subProgress,
      isTransitioning: subProgress < 0.15 || subProgress > 0.85,
    };
  }
}

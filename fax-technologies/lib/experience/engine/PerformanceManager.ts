import { ENGINE_EVENTS, eventBus } from "./EventBus";
import { QualityTier, useExperienceStore } from "./ExperienceStore";

export class PerformanceManager {
  private frameTimes: number[] = [];
  private lastTime: number = performance.now();
  private sampleSize: number = 60;
  private currentTier: QualityTier = "high";

  update(now: number = performance.now()): void {
    const delta = now - this.lastTime;
    this.lastTime = now;

    if (delta > 0 && delta < 200) {
      this.frameTimes.push(delta);
      if (this.frameTimes.length > this.sampleSize) {
        this.frameTimes.shift();
      }
    }

    if (this.frameTimes.length === this.sampleSize) {
      const avgFrameTime =
        this.frameTimes.reduce((acc, curr) => acc + curr, 0) / this.sampleSize;
      const currentFps = Math.round(1000 / avgFrameTime);

      useExperienceStore.setState({ fps: currentFps });

      if (currentFps < 45 && this.currentTier === "high") {
        this.currentTier = "medium";
        useExperienceStore.setState({ qualityTier: "medium" });
        eventBus.emit(ENGINE_EVENTS.PERFORMANCE_DOWNGRADE, "medium");
      } else if (currentFps < 30 && this.currentTier === "medium") {
        this.currentTier = "low";
        useExperienceStore.setState({ qualityTier: "low" });
        eventBus.emit(ENGINE_EVENTS.PERFORMANCE_DOWNGRADE, "low");
      } else if (currentFps >= 55 && this.currentTier === "low") {
        this.currentTier = "medium";
        useExperienceStore.setState({ qualityTier: "medium" });
        eventBus.emit(ENGINE_EVENTS.PERFORMANCE_UPGRADE, "medium");
      } else if (currentFps >= 58 && this.currentTier === "medium") {
        this.currentTier = "high";
        useExperienceStore.setState({ qualityTier: "high" });
        eventBus.emit(ENGINE_EVENTS.PERFORMANCE_UPGRADE, "high");
      }
    }
  }

  getQualityTier(): QualityTier {
    return this.currentTier;
  }
}

export const performanceManager = new PerformanceManager();

type EventCallback = (...args: unknown[]) => void;

class EventBus {
  private listeners: Map<string, EventCallback[]> = new Map();

  on(event: string, callback: EventCallback): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);

    return () => this.off(event, callback);
  }

  off(event: string, callback: EventCallback): void {
    const list = this.listeners.get(event);
    if (!list) return;
    this.listeners.set(
      event,
      list.filter((cb) => cb !== callback),
    );
  }

  emit(event: string, ...args: unknown[]): void {
    const list = this.listeners.get(event);
    if (!list) return;
    list.forEach((cb) => {
      try {
        cb(...args);
      } catch (err) {
        console.error(`Error handling event "${event}":`, err);
      }
    });
  }

  clear(): void {
    this.listeners.clear();
  }
}

export const eventBus = new EventBus();

// Engine Event Names
export const ENGINE_EVENTS = {
  SCENE_ENTER: "scene:enter",
  SCENE_EXIT: "scene:exit",
  TIMELINE_UPDATE: "timeline:update",
  PERFORMANCE_DOWNGRADE: "performance:downgrade",
  PERFORMANCE_UPGRADE: "performance:upgrade",
  CAMERA_TARGET_CHANGE: "camera:target_change",
  LIGHTING_PROFILE_CHANGE: "lighting:profile_change",
  ASSET_LOADED: "asset:loaded",
  NODE_HOVER: "node:hover",
} as const;

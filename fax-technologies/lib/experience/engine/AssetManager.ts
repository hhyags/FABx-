import { useGLTF } from "@react-three/drei";
import manifest from "../config/asset-manifest.json";

class AssetManagerImpl {
  private loaded: boolean = false;

  preloadAll(): void {
    if (this.loaded) return;
    manifest.models.forEach((model) => {
      try {
        useGLTF.preload(model.path);
      } catch (e) {
        console.warn(`Failed preloading asset ${model.path}:`, e);
      }
    });
    this.loaded = true;
  }

  isLoaded(): boolean {
    return this.loaded;
  }
}

export const assetManager = new AssetManagerImpl();

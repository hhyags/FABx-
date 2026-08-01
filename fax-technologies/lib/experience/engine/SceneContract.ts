export interface ExperienceScene {
  id: string;
  preload?: () => Promise<void>;
  enter: () => void;
  update: (progress: number, delta: number) => void;
  exit: () => void;
  dispose?: () => void;
  destroy?: () => void;
}

export type SceneId =
  | "hero"
  | "birth"
  | "network"
  | "engineering"
  | "products"
  | "impact"
  | "process"
  | "values"
  | "contact";

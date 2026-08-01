import godowniq from "@/content/projects/godowniq.json";
import hrflowAi from "@/content/projects/hrflow-ai.json";
import kgnEnterprise from "@/content/projects/kgn-enterprise.json";
import medflowAi from "@/content/projects/medflow-ai.json";

export interface ProjectData {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  metric?: string;
  timeToDeliver: string;
  shortDesc: string;
  problem: string;
  whatWeBuilt: string;
  honestScopeNote: string;
  deliverables: string[];
  architectureNodes: string[];
}

export const ALL_PROJECTS: ProjectData[] = [
  medflowAi as ProjectData,
  hrflowAi as ProjectData,
  godowniq as ProjectData,
  kgnEnterprise as ProjectData,
];

export function getProjectById(id: string): ProjectData | undefined {
  return ALL_PROJECTS.find((p) => p.id === id);
}

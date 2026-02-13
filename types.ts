
export interface RoadmapStep {
  id: string;
  title: string;
  phase: number;
  week: string;
  description: string;
  keySkills: string[];
  projects: Project[];
  importance: string;
}

export interface Project {
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  objective: string;
  tasks: string[];
}

export interface Skill {
  name: string;
  level: number;
  description: string;
  category: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export enum AppTab {
  ROADMAP = 'ROADMAP',
  RESOURCES = 'RESOURCES',
  PORTFOLIO = 'PORTFOLIO',
  AI_TUTOR = 'AI_TUTOR'
}

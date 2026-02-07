export type ProjectType = 'website' | 'mobile' | 'desktop' | 'hardware' | 'ai';

export interface ProjectTypeInfo {
  id: ProjectType;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
}

export interface BlueprintSection {
  id: string;
  title: string;
  icon: string;
  content: string[];
  expanded?: boolean;
}

export interface TechStackItem {
  name: string;
  category: string;
  reason: string;
}

export interface DevelopmentPhase {
  name: string;
  duration: string;
  tasks: string[];
}

export interface Risk {
  type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  mitigation: string;
}

export interface WorkflowTask {
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedHours?: number;
}

export interface WorkflowPhaseData {
  id: string;
  name: string;
  duration: string;
  description: string;
  tools: string[];
  activities: string[];
  deliverables: string[];
  tasks: WorkflowTask[];
  milestones: string[];
  dependencies?: string[];
  teamSize?: string;
  keyDecisions?: string[];
}

export interface Blueprint {
  id: string;
  title: string;
  projectType: ProjectType;
  overview: {
    problem: string;
    solution: string;
    features: string[];
    assumptions: string[];
  };
  targetUsers: {
    primary: string[];
    secondary: string[];
    personas: string[];
  };
  techStack: TechStackItem[];
  architecture: {
    components: string[];
    relationships: string[];
  };
  phases: DevelopmentPhase[];
  risks: Risk[];
  resources: {
    title: string;
    url: string;
    type: string;
  }[];
  workflow?: {
    phases: WorkflowPhaseData[];
  };
}

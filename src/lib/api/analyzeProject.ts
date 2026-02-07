import { supabase } from '@/integrations/supabase/client';
import type { Blueprint, ProjectType } from '@/types/project';

export interface WorkflowTask {
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedHours?: number;
}

export interface WorkflowPhase {
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

export interface AIBlueprint {
  projectType: ProjectType;
  title: string;
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
  techStack: {
    name: string;
    category: string;
    reason: string;
  }[];
  architecture: {
    components: string[];
    relationships: string[];
  };
  phases: {
    name: string;
    duration: string;
    tasks: string[];
  }[];
  risks: {
    type: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
    mitigation: string;
  }[];
  resources: {
    title: string;
    url: string;
    type: string;
  }[];
  workflow?: {
    phases: WorkflowPhase[];
  };
}

export async function analyzeProjectIdea(idea: string): Promise<AIBlueprint> {
  const { data, error } = await supabase.functions.invoke('analyze-project', {
    body: { idea },
  });

  if (error) {
    console.error('Error calling analyze-project:', error);
    throw new Error(error.message || 'Failed to analyze project idea');
  }

  if (!data.success || !data.blueprint) {
    throw new Error(data.error || 'Failed to generate blueprint');
  }

  return data.blueprint as AIBlueprint;
}

export function convertToBlueprint(aiBlueprint: AIBlueprint): Blueprint {
  return {
    id: crypto.randomUUID(),
    title: aiBlueprint.title,
    projectType: aiBlueprint.projectType,
    overview: aiBlueprint.overview,
    targetUsers: aiBlueprint.targetUsers,
    techStack: aiBlueprint.techStack,
    architecture: aiBlueprint.architecture,
    phases: aiBlueprint.phases,
    risks: aiBlueprint.risks,
    resources: aiBlueprint.resources,
  };
}

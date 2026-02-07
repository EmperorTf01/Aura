import { useState } from 'react';
import { Brain, ChevronRight, Lightbulb, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ReasoningPanelProps {
  activeSection: string;
}

const reasoningData: Record<string, { title: string; explanation: string; alternatives: string[] }> = {
  overview: {
    title: "Project Scope Analysis",
    explanation: "Based on your description, I've identified a collaborative task management system as the core solution. The problem-solution fit focuses on remote team coordination challenges that are well-addressed by real-time features.",
    alternatives: [
      "Consider a simpler Kanban-style approach for smaller teams",
      "Enterprise version could include resource planning features",
    ],
  },
  users: {
    title: "User Segmentation",
    explanation: "Primary users are team leads and project managers who need oversight, while secondary users are team members focused on individual tasks. This hierarchy informs permission levels and feature prioritization.",
    alternatives: [
      "Add guest users for external collaborators",
      "Consider admin roles for organization-wide settings",
    ],
  },
  techstack: {
    title: "Technology Selection",
    explanation: "The recommended stack balances modern development practices with team productivity. React and TypeScript provide type safety and component reusability, while the backend choices support real-time collaboration requirements.",
    alternatives: [
      "Vue.js for teams with existing Vue experience",
      "GraphQL instead of REST for complex data requirements",
    ],
  },
  architecture: {
    title: "System Design Rationale",
    explanation: "A microservices approach allows independent scaling of real-time features. The separation of concerns between auth, tasks, and notifications ensures maintainability as the system grows.",
    alternatives: [
      "Monolithic architecture for faster initial development",
      "Serverless for reduced infrastructure management",
    ],
  },
  phases: {
    title: "Timeline Optimization",
    explanation: "The phased approach prioritizes core functionality in the MVP, allowing for user feedback before investing in advanced features. This reduces risk and ensures market fit.",
    alternatives: [
      "Parallel development streams with larger teams",
      "Feature flags for gradual rollout",
    ],
  },
  risks: {
    title: "Risk Assessment",
    explanation: "Technical risks focus on real-time synchronization challenges common in collaborative tools. Business risks consider market competition and user adoption patterns.",
    alternatives: [
      "Additional security audit for enterprise deployments",
      "Performance testing under high load conditions",
    ],
  },
  resources: {
    title: "Learning Path",
    explanation: "Resources are curated based on the recommended tech stack, prioritizing official documentation and hands-on tutorials for practical implementation guidance.",
    alternatives: [
      "Video courses for visual learners",
      "Community forums for specific problem-solving",
    ],
  },
};

export function ReasoningPanel({ activeSection }: ReasoningPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const data = reasoningData[activeSection] || reasoningData.overview;

  const sectionContext = `Title: ${data.title}\nExplanation: ${data.explanation}\nAlternatives: ${data.alternatives.join(', ')}`;

  return (
    <aside className={cn(
      "h-full bg-sidebar border-l border-sidebar-border transition-all duration-300",
      isExpanded ? "w-80" : "w-12"
    )}>
      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-12 bg-secondary border border-border rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors z-10"
      >
        <ChevronRight className={cn(
          "w-4 h-4 text-muted-foreground transition-transform",
          isExpanded && "rotate-180"
        )} />
      </button>

      {isExpanded && (
        <div className="p-6 space-y-6 overflow-y-auto h-full">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-sidebar-foreground">AI Reasoning</h2>
              <p className="text-xs text-muted-foreground">Why these choices?</p>
            </div>
          </div>

          {/* Current section reasoning */}
          <div className="glass-panel p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-medium text-foreground">{data.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {data.explanation}
            </p>
          </div>

          {/* Alternatives */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-medium text-foreground">Alternatives</h3>
            </div>
            <ul className="space-y-2">
              {data.alternatives.map((alt, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 p-3 rounded-lg bg-secondary/50 text-sm text-muted-foreground"
                >
                  <span className="text-purple-400 mt-0.5">→</span>
                  <span>{alt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

    </aside>
  );
}

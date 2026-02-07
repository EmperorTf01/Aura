import { Lightbulb, Target, Star, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OverviewSectionProps {
  overview: {
    problem: string;
    solution: string;
    features: string[];
    assumptions: string[];
  };
}

export function OverviewSection({ overview }: OverviewSectionProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Problem Statement */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-foreground">Problem Statement</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">{overview.problem}</p>
        </div>

        {/* Proposed Solution */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-foreground">Proposed Solution</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">{overview.solution}</p>
        </div>
      </div>

      {/* Core Features */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Star className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-foreground">Core Features</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {overview.features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg",
                "bg-secondary/50 border border-border/50"
              )}
            >
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-mono text-primary">
                {index + 1}
              </div>
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Assumptions */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-foreground">Assumptions & Constraints</h3>
        </div>
        <ul className="space-y-2">
          {overview.assumptions.map((assumption, index) => (
            <li key={index} className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-1">•</span>
              <span className="text-sm">{assumption}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

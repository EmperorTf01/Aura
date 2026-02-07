import { Clock, CheckCircle2, Circle, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DevelopmentPhase } from '@/types/project';

interface PhasesSectionProps {
  phases: DevelopmentPhase[];
}

export function PhasesSection({ phases }: PhasesSectionProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-foreground">Development Timeline</h3>
        </div>

        {/* Timeline */}
        <div className="relative">
          {phases.map((phase, index) => {
            const isFirst = index === 0;
            const isLast = index === phases.length - 1;

            return (
              <div key={index} className="relative pl-10 pb-8 last:pb-0">
                {/* Vertical line */}
                {!isLast && (
                  <div className="absolute left-[15px] top-8 w-0.5 h-full bg-gradient-to-b from-primary/50 to-border" />
                )}

                {/* Node */}
                <div className={cn(
                  "absolute left-0 w-8 h-8 rounded-full flex items-center justify-center",
                  isFirst ? "bg-primary text-primary-foreground" : "bg-secondary border border-border"
                )}>
                  {isFirst ? (
                    <Play className="w-4 h-4" />
                  ) : (
                    <Circle className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>

                {/* Content */}
                <div className="glass-panel p-4 ml-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-foreground">{phase.name}</h4>
                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {phase.duration}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Total duration */}
      <div className="glass-panel p-4 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Estimated Total Duration</span>
        <span className="text-lg font-semibold text-gradient">
          {phases.length * 2}-{phases.length * 3} weeks
        </span>
      </div>
    </div>
  );
}

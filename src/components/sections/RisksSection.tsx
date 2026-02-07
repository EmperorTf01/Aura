import { AlertTriangle, Shield, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Risk } from '@/types/project';

const severityConfig = {
  low: {
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    label: 'Low',
  },
  medium: {
    color: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
    label: 'Medium',
  },
  high: {
    color: 'text-red-400 bg-red-500/10 border-red-500/30',
    label: 'High',
  },
};

interface RisksSectionProps {
  risks: Risk[];
}

export function RisksSection({ risks }: RisksSectionProps) {
  const risksByType = risks.reduce((acc, risk) => {
    if (!acc[risk.type]) {
      acc[risk.type] = [];
    }
    acc[risk.type].push(risk);
    return acc;
  }, {} as Record<string, Risk[]>);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Risk overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['high', 'medium', 'low'] as const).map((severity) => {
          const count = risks.filter((r) => r.severity === severity).length;
          const config = severityConfig[severity];

          return (
            <div key={severity} className="glass-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("p-1.5 rounded-md", config.color.split(' ').slice(1).join(' '))}>
                    <AlertTriangle className={cn("w-4 h-4", config.color.split(' ')[0])} />
                  </div>
                  <span className="text-sm text-muted-foreground">{config.label} Risk</span>
                </div>
                <span className={cn("text-2xl font-bold", config.color.split(' ')[0])}>
                  {count}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Risk details */}
      {Object.entries(risksByType).map(([type, typeRisks]) => (
        <div key={type} className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-foreground">{type}</h3>
          </div>

          <div className="space-y-4">
            {typeRisks.map((risk, index) => {
              const config = severityConfig[risk.severity];

              return (
                <div
                  key={index}
                  className={cn(
                    "p-4 rounded-lg border",
                    "bg-secondary/30",
                    config.color.split(' ').slice(2).join(' ')
                  )}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <p className="text-foreground text-sm">{risk.description}</p>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-xs font-medium shrink-0",
                      config.color
                    )}>
                      {config.label}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 p-3 rounded-md bg-background/50">
                    <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">Mitigation</span>
                      <p className="text-sm text-foreground">{risk.mitigation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

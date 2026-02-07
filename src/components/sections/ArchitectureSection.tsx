import { Box, ArrowRight, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArchitectureSectionProps {
  architecture: {
    components: string[];
    relationships: string[];
  };
}

const componentColors = [
  'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30',
  'from-purple-500/20 to-purple-500/5 border-purple-500/30',
  'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30',
  'from-orange-500/20 to-orange-500/5 border-orange-500/30',
  'from-pink-500/20 to-pink-500/5 border-pink-500/30',
];

export function ArchitectureSection({ architecture }: ArchitectureSectionProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Architecture Diagram */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-foreground">System Architecture</h3>
        </div>

        {/* Visual diagram */}
        <div className="relative p-8 rounded-xl bg-secondary/30 border border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {architecture.components.slice(0, 3).map((component, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 rounded-xl bg-gradient-to-b border",
                  componentColors[index % componentColors.length],
                  "text-center"
                )}
              >
                <Box className="w-8 h-8 mx-auto mb-3 text-foreground/70" />
                <span className="font-medium text-foreground text-sm">{component}</span>
              </div>
            ))}
          </div>

          {/* Flow arrows */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[0, 1].map((i) => (
              <div key={i} className="flex items-center gap-2 text-muted-foreground">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                <ArrowRight className="w-4 h-4 text-primary" />
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              </div>
            ))}
          </div>

          {/* Bottom layer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {architecture.components.slice(3, 5).map((component, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 rounded-xl bg-gradient-to-b border",
                  componentColors[(index + 3) % componentColors.length],
                  "text-center"
                )}
              >
                <Box className="w-8 h-8 mx-auto mb-3 text-foreground/70" />
                <span className="font-medium text-foreground text-sm">{component}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Component Relationships */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
            <ArrowRight className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-foreground">Component Relationships</h3>
        </div>

        <div className="space-y-3">
          {architecture.relationships.map((relationship, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center gap-4 p-3 rounded-lg",
                "bg-secondary/50 border border-border/50"
              )}
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center font-mono text-xs text-primary">
                {index + 1}
              </div>
              <span className="text-sm text-foreground">{relationship}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

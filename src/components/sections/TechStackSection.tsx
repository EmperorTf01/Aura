import { Code, Database, Cloud, Wrench, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TechStackItem } from '@/types/project';

const categoryIcons = {
  'Frontend': Code,
  'Backend': Database,
  'Database': Database,
  'Infrastructure': Cloud,
  'Tools': Wrench,
};

const categoryColors = {
  'Frontend': 'text-cyan-400 bg-cyan-500/10',
  'Backend': 'text-purple-400 bg-purple-500/10',
  'Database': 'text-emerald-400 bg-emerald-500/10',
  'Infrastructure': 'text-orange-400 bg-orange-500/10',
  'Tools': 'text-pink-400 bg-pink-500/10',
};

interface TechStackSectionProps {
  techStack: TechStackItem[];
}

export function TechStackSection({ techStack }: TechStackSectionProps) {
  const groupedStack = techStack.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, TechStackItem[]>);

  return (
    <div className="space-y-6 animate-fade-in">
      {Object.entries(groupedStack).map(([category, items]) => {
        const Icon = categoryIcons[category as keyof typeof categoryIcons] || Wrench;
        const colorClass = categoryColors[category as keyof typeof categoryColors] || 'text-muted-foreground bg-muted';

        return (
          <div key={category} className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("p-2 rounded-lg", colorClass)}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground">{category}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "group p-4 rounded-lg",
                    "bg-secondary/50 border border-border/50",
                    "hover:border-primary/30 transition-all duration-200"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.reason}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-primary">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Why this stack */}
      <div className="glass-panel p-4 border-l-2 border-primary/50">
        <div className="flex items-start gap-3">
          <MessageSquare className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">AI Reasoning</h4>
            <p className="text-sm text-muted-foreground">
              This tech stack was selected based on your project requirements for scalability, 
              team collaboration, and rapid development. The combination of these technologies 
              provides a solid foundation while allowing for future growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Clock, Globe, Smartphone, Monitor, Cpu, Brain, Trash2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { BlueprintHistoryItem } from '@/hooks/useBlueprintHistory';
import type { ProjectType } from '@/types/project';

const typeConfig: Record<ProjectType, { icon: typeof Globe; label: string; className: string }> = {
  website: { icon: Globe, label: 'Website', className: 'text-blue-400 bg-blue-500/10' },
  mobile: { icon: Smartphone, label: 'Mobile', className: 'text-green-400 bg-green-500/10' },
  desktop: { icon: Monitor, label: 'Desktop', className: 'text-purple-400 bg-purple-500/10' },
  hardware: { icon: Cpu, label: 'Hardware', className: 'text-orange-400 bg-orange-500/10' },
  ai: { icon: Brain, label: 'AI/Data', className: 'text-cyan-400 bg-cyan-500/10' },
};

interface RecentBlueprintsProps {
  history: BlueprintHistoryItem[];
  onSelect: (item: BlueprintHistoryItem) => void;
  onRemove: (id: string) => void;
}

export function RecentBlueprints({ history, onSelect, onRemove }: RecentBlueprintsProps) {
  if (history.length === 0) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="w-full max-w-2xl mx-auto mt-12"
    >
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-sm font-medium text-muted-foreground">Recent Blueprints</h3>
      </div>

      <div className="space-y-2">
        {history.map((item, index) => {
          const config = typeConfig[item.projectType];
          const TypeIcon = config.icon;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative"
            >
              <button
                onClick={() => onSelect(item)}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-200 text-left"
              >
                <div className={cn('p-2 rounded-lg', config.className)}>
                  <TypeIcon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate pr-8">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{config.label}</span>
                    <span className="text-xs text-muted-foreground/50">•</span>
                    <span className="text-xs text-muted-foreground">{formatDate(item.createdAt)}</span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(item.id);
                }}
                className="absolute right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

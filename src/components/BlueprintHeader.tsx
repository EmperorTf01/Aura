import { Download, Share2, Save, Globe, Smartphone, Monitor, Cpu, Brain, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ProjectType } from '@/types/project';

const typeConfig = {
  website: { icon: Globe, label: 'Website', className: 'badge-website' },
  mobile: { icon: Smartphone, label: 'Mobile App', className: 'badge-mobile' },
  desktop: { icon: Monitor, label: 'Desktop', className: 'badge-desktop' },
  hardware: { icon: Cpu, label: 'Hardware', className: 'badge-hardware' },
  ai: { icon: Brain, label: 'AI/Data', className: 'badge-ai' },
};

interface BlueprintHeaderProps {
  title: string;
  projectType: ProjectType;
  onBack: () => void;
  onSave: () => void;
  onExport: () => void;
  onShare: () => void;
}

export function BlueprintHeader({
  title,
  projectType,
  onBack,
  onSave,
  onExport,
  onShare,
}: BlueprintHeaderProps) {
  const config = typeConfig[projectType];
  const TypeIcon = config.icon;

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
          <ArrowLeft className="w-4 h-4" />
        </Button>

        <div className="h-8 w-px bg-border" />

        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-foreground truncate max-w-md">
            {title}
          </h2>
          <div className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
            config.className
          )}>
            <TypeIcon className="w-3 h-3" />
            {config.label}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onSave}>
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button variant="ghost" size="sm" onClick={onExport}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
        <Button variant="outline" size="sm" onClick={onShare}>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </header>
  );
}

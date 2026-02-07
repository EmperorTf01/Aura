import { BookOpen, ExternalLink, FileText, Video, Code, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

const typeIcons = {
  documentation: FileText,
  tutorial: Video,
  course: GraduationCap,
  repository: Code,
  article: BookOpen,
};

const typeColors = {
  documentation: 'text-cyan-400 bg-cyan-500/10',
  tutorial: 'text-purple-400 bg-purple-500/10',
  course: 'text-emerald-400 bg-emerald-500/10',
  repository: 'text-orange-400 bg-orange-500/10',
  article: 'text-pink-400 bg-pink-500/10',
};

interface ResourcesSectionProps {
  resources: {
    title: string;
    url: string;
    type: string;
  }[];
}

export function ResourcesSection({ resources }: ResourcesSectionProps) {
  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = [];
    }
    acc[resource.type].push(resource);
    return acc;
  }, {} as Record<string, typeof resources>);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-foreground">Learning Resources</h3>
        </div>

        <div className="space-y-6">
          {Object.entries(groupedResources).map(([type, typeResources]) => {
            const Icon = typeIcons[type as keyof typeof typeIcons] || BookOpen;
            const colorClass = typeColors[type as keyof typeof typeColors] || 'text-muted-foreground bg-muted';

            return (
              <div key={type}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={cn("p-1.5 rounded-md", colorClass)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground capitalize">
                    {type}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {typeResources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "group flex items-center justify-between p-4 rounded-lg",
                        "bg-secondary/50 border border-border/50",
                        "hover:border-primary/30 hover:bg-secondary transition-all duration-200"
                      )}
                    >
                      <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                        {resource.title}
                      </span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pro tip */}
      <div className="glass-panel p-4 border-l-2 border-emerald-500/50">
        <div className="flex items-start gap-3">
          <GraduationCap className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Pro Tip</h4>
            <p className="text-sm text-muted-foreground">
              Start with the official documentation to understand core concepts, 
              then move to tutorials for hands-on practice. Courses provide structured 
              learning paths for comprehensive understanding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  FileCode, 
  Clock, 
  AlertTriangle, 
  BookOpen,
  ChevronRight,
  Zap,
  GitBranch
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sections = [
  { id: 'workflow', name: 'Development Workflow', icon: GitBranch },
  { id: 'overview', name: 'Project Overview', icon: LayoutDashboard },
  { id: 'users', name: 'Target Users', icon: Users },
  { id: 'techstack', name: 'Tech Stack', icon: Layers },
  { id: 'architecture', name: 'Architecture', icon: FileCode },
  { id: 'risks', name: 'Risks & Constraints', icon: AlertTriangle },
  { id: 'resources', name: 'Learning Resources', icon: BookOpen },
];

interface BlueprintSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  completedSections: string[];
}

export function BlueprintSidebar({ 
  activeSection, 
  onSectionChange, 
  completedSections 
}: BlueprintSidebarProps) {
  return (
    <aside className="w-64 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-semibold text-sidebar-foreground">Blueprint</h1>
            <p className="text-xs text-muted-foreground">Project Planner</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4 px-3">
          Sections
        </p>
        {sections.map((section, index) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          const isCompleted = completedSections.includes(section.id);

          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                  : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <div className={cn(
                "w-6 h-6 rounded-md flex items-center justify-center transition-colors",
                isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
              )}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="flex-1 text-left">{section.name}</span>
              {isCompleted && (
                <div className="w-2 h-2 rounded-full bg-primary" />
              )}
              {isActive && (
                <ChevronRight className="w-4 h-4 text-primary" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Progress */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="glass-panel p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Progress</span>
            <span className="text-xs font-medium text-primary">
              {completedSections.length}/{sections.length}
            </span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(completedSections.length / sections.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

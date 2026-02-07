import { Users, UserCheck, User, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UsersSectionProps {
  targetUsers: {
    primary: string[];
    secondary: string[];
    personas: string[];
  };
}

export function UsersSection({ targetUsers }: UsersSectionProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primary Users */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-foreground">Primary Users</h3>
          </div>
          <ul className="space-y-3">
            {targetUsers.primary.map((user, index) => (
              <li
                key={index}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg",
                  "bg-secondary/50 border border-border/50"
                )}
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-foreground">{user}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Secondary Users */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-foreground">Secondary Users</h3>
          </div>
          <ul className="space-y-3">
            {targetUsers.secondary.map((user, index) => (
              <li
                key={index}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg",
                  "bg-secondary/50 border border-border/50"
                )}
              >
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-sm text-foreground">{user}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* User Personas */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-foreground">User Personas</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {targetUsers.personas.map((persona, index) => (
            <div
              key={index}
              className={cn(
                "p-4 rounded-xl border-gradient",
                "bg-gradient-to-b from-secondary/80 to-secondary/40"
              )}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30 flex items-center justify-center mb-3">
                <span className="text-lg">👤</span>
              </div>
              <p className="text-sm text-foreground">{persona}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

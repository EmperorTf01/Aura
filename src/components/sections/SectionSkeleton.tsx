import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface SectionSkeletonProps {
  variant?: 'overview' | 'users' | 'techstack' | 'phases' | 'risks' | 'resources' | 'architecture' | 'workflow';
}

export function SectionSkeleton({ variant = 'overview' }: SectionSkeletonProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {variant === 'overview' && <OverviewSkeleton />}
      {variant === 'users' && <UsersSkeleton />}
      {variant === 'techstack' && <TechStackSkeleton />}
      {variant === 'phases' && <PhasesSkeleton />}
      {variant === 'risks' && <RisksSkeleton />}
      {variant === 'resources' && <ResourcesSkeleton />}
      {variant === 'architecture' && <ArchitectureSkeleton />}
      {variant === 'workflow' && <WorkflowSkeleton />}
    </div>
  );
}

function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("glass-card p-6", className)}>
      {children}
    </div>
  );
}

function CardHeader() {
  return (
    <div className="flex items-center gap-3 mb-4">
      <Skeleton className="w-9 h-9 rounded-lg" />
      <Skeleton className="h-5 w-32" />
    </div>
  );
}

function OverviewSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </GlassCard>
        <GlassCard>
          <CardHeader />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <CardHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <CardHeader />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="w-2 h-2 rounded-full mt-2" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </div>
      </GlassCard>
    </>
  );
}

function UsersSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="h-4 flex-1" />
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard>
          <CardHeader />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="h-4 flex-1" />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <CardHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 rounded-xl bg-secondary/50 border border-border/50">
              <Skeleton className="w-12 h-12 rounded-full mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </>
  );
}

function TechStackSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, categoryIndex) => (
        <GlassCard key={categoryIndex}>
          <CardHeader />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                <Skeleton className="h-5 w-24 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mt-1" />
              </div>
            ))}
          </div>
        </GlassCard>
      ))}

      <div className="glass-panel p-4 border-l-2 border-primary/50">
        <div className="flex items-start gap-3">
          <Skeleton className="w-5 h-5 rounded" />
          <div className="flex-1">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6 mt-1" />
          </div>
        </div>
      </div>
    </>
  );
}

function PhasesSkeleton() {
  return (
    <>
      <GlassCard>
        <CardHeader />
        <div className="relative">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="relative pl-10 pb-8 last:pb-0">
              {index !== 3 && (
                <div className="absolute left-[15px] top-8 w-0.5 h-full bg-gradient-to-b from-primary/50 to-border" />
              )}
              <Skeleton className="absolute left-0 w-8 h-8 rounded-full" />
              <div className="glass-panel p-4 ml-4">
                <div className="flex items-center justify-between mb-3">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="w-4 h-4 rounded" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="glass-panel p-4 flex items-center justify-between">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-6 w-24" />
      </div>
    </>
  );
}

function RisksSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <GlassCard key={i} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="w-7 h-7 rounded-md" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-8 w-8" />
            </div>
          </GlassCard>
        ))}
      </div>

      {Array.from({ length: 2 }).map((_, typeIndex) => (
        <GlassCard key={typeIndex}>
          <CardHeader />
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="p-4 rounded-lg border border-border/50 bg-secondary/30">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-5 w-16 rounded" />
                </div>
                <div className="p-3 rounded-md bg-background/50">
                  <div className="flex items-start gap-2">
                    <Skeleton className="w-4 h-4 rounded" />
                    <div className="flex-1">
                      <Skeleton className="h-3 w-16 mb-1" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      ))}
    </>
  );
}

function ResourcesSkeleton() {
  return (
    <>
      <GlassCard>
        <CardHeader />
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, typeIndex) => (
            <div key={typeIndex}>
              <div className="flex items-center gap-2 mb-3">
                <Skeleton className="w-7 h-7 rounded-md" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border/50">
                    <Skeleton className="h-4 flex-1 mr-4" />
                    <Skeleton className="w-4 h-4" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="glass-panel p-4 border-l-2 border-emerald-500/50">
        <div className="flex items-start gap-3">
          <Skeleton className="w-5 h-5 rounded" />
          <div className="flex-1">
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6 mt-1" />
          </div>
        </div>
      </div>
    </>
  );
}

function ArchitectureSkeleton() {
  return (
    <>
      <GlassCard>
        <CardHeader />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-4 rounded-lg bg-secondary/50 border border-border/50 text-center">
              <Skeleton className="w-10 h-10 rounded-lg mx-auto mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <CardHeader />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <Skeleton className="w-5 h-5 rounded" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </div>
      </GlassCard>
    </>
  );
}

function WorkflowSkeleton() {
  return (
    <GlassCard>
      <CardHeader />
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 rounded-lg bg-secondary/50 border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="flex gap-2 mb-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <Skeleton key={j} className="h-6 w-16 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5 mt-1" />
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

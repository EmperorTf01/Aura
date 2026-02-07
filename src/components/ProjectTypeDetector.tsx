import { useEffect, useState } from 'react';
import { Globe, Smartphone, Monitor, Cpu, Brain, Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProjectType, ProjectTypeInfo } from '@/types/project';

const projectTypes: ProjectTypeInfo[] = [
  {
    id: 'website',
    name: 'Website',
    icon: 'globe',
    description: 'Web application with frontend & backend',
    color: 'cyan',
  },
  {
    id: 'mobile',
    name: 'Mobile App',
    icon: 'smartphone',
    description: 'iOS and/or Android application',
    color: 'purple',
  },
  {
    id: 'desktop',
    name: 'Desktop Software',
    icon: 'monitor',
    description: 'Cross-platform desktop application',
    color: 'emerald',
  },
  {
    id: 'hardware',
    name: 'Hardware/IoT',
    icon: 'cpu',
    description: 'Electronics and embedded systems',
    color: 'orange',
  },
  {
    id: 'ai',
    name: 'AI/Data',
    icon: 'brain',
    description: 'Machine learning and data pipeline',
    color: 'pink',
  },
];

const iconMap = {
  globe: Globe,
  smartphone: Smartphone,
  monitor: Monitor,
  cpu: Cpu,
  brain: Brain,
};

interface ProjectTypeDetectorProps {
  detectedType: ProjectType | null;
  onComplete: () => void;
  isAnalyzing?: boolean;
}

export function ProjectTypeDetector({ detectedType, onComplete, isAnalyzing = false }: ProjectTypeDetectorProps) {
  const [scanningIndex, setScanningIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // While analyzing, cycle through types for visual effect
    if (isAnalyzing && !detectedType) {
      const interval = setInterval(() => {
        setScanningIndex((prev) => (prev + 1) % projectTypes.length);
      }, 400);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing, detectedType]);

  useEffect(() => {
    if (!detectedType) return;

    // Once we have a detected type, animate to it
    const detectedIdx = projectTypes.findIndex((t) => t.id === detectedType);
    setScanningIndex(detectedIdx);
    
    // Brief delay then mark complete
    const timer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(onComplete, 800);
    }, 500);

    return () => clearTimeout(timer);
  }, [detectedType, onComplete]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="glass-card p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <h3 className="text-xl font-semibold text-foreground">
              {isAnalyzing ? 'AI is analyzing your project' : 'Analysis complete'}
            </h3>
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          </div>
          <p className="text-muted-foreground text-sm">
            {isAnalyzing 
              ? 'Understanding requirements and detecting project type...'
              : 'Generating your comprehensive blueprint...'}
          </p>
        </div>

        <div className="space-y-3">
          {projectTypes.map((type, index) => {
            const Icon = iconMap[type.icon as keyof typeof iconMap];
            const isScanning = index === scanningIndex && !isComplete;
            const isDetected = isComplete && type.id === detectedType;

            return (
              <div
                key={type.id}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                  isDetected && "bg-primary/10 border border-primary/30 glow-effect",
                  isScanning && "bg-secondary/80 border border-primary/20",
                  !isScanning && !isDetected && "bg-secondary/30 border border-transparent"
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                    isDetected && `bg-${type.color}-500/20`,
                    isScanning && "bg-primary/10 animate-pulse",
                    !isScanning && !isDetected && "bg-secondary/50"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-6 h-6 transition-all duration-300",
                      isDetected && `text-${type.color}-400`,
                      isScanning && "text-primary",
                      !isScanning && !isDetected && "text-muted-foreground"
                    )}
                  />
                </div>

                <div className="flex-1">
                  <h4
                    className={cn(
                      "font-medium transition-all duration-300",
                      isDetected && "text-foreground",
                      isScanning && "text-foreground",
                      !isScanning && !isDetected && "text-muted-foreground"
                    )}
                  >
                    {type.name}
                  </h4>
                  <p
                    className={cn(
                      "text-sm transition-all duration-300",
                      isDetected && "text-muted-foreground",
                      !isDetected && "text-muted-foreground/60"
                    )}
                  >
                    {type.description}
                  </p>
                </div>

                <div className="w-8 h-8 flex items-center justify-center">
                  {isScanning && (
                    <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  )}
                  {isDetected && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-scale-in">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {isComplete && (
          <div className="mt-8 text-center animate-fade-in">
            <p className="text-sm text-primary font-medium">
              ✨ Blueprint ready! Loading dashboard...
            </p>
          </div>
        )}

        {isAnalyzing && !isComplete && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary">Powered by Gemini AI</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

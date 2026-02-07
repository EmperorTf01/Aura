import { useState, useRef } from 'react';
import { LandingHero } from '@/components/LandingHero';
import { IdeaInput } from '@/components/IdeaInput';
import { WorkflowDiagram } from '@/components/WorkflowDiagram';
import { ProjectTypeDetector } from '@/components/ProjectTypeDetector';
import { BlueprintDashboard } from '@/components/BlueprintDashboard';
import { RecentBlueprints } from '@/components/RecentBlueprints';
import { Button } from '@/components/ui/button';
import { analyzeProjectIdea, convertToBlueprint } from '@/lib/api/analyzeProject';
import { toast } from '@/hooks/use-toast';
import { useBlueprintHistory } from '@/hooks/useBlueprintHistory';
import type { Blueprint, ProjectType } from '@/types/project';

type AppState = 'input' | 'detecting' | 'generating' | 'dashboard';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('input');
  const [idea, setIdea] = useState('');
  const [detectedType, setDetectedType] = useState<ProjectType | null>(null);
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const inputRef = useRef<HTMLDivElement>(null);
  const { history, saveBlueprint, removeBlueprint } = useBlueprintHistory();

  const handleScrollToInput = () => {
    inputRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleIdeaSubmit = async (submittedIdea: string) => {
    setIdea(submittedIdea);
    setIsProcessing(true);
    setAppState('detecting');

    try {
      // Start AI analysis
      const aiBlueprint = await analyzeProjectIdea(submittedIdea);

      setDetectedType(aiBlueprint.projectType);

      // Brief pause to show detection
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Convert to our Blueprint format
      const generatedBlueprint = convertToBlueprint(aiBlueprint);

      // Add workflow data if available
      if (aiBlueprint.workflow) {
        generatedBlueprint.workflow = aiBlueprint.workflow;
      }

      // Save to history
      saveBlueprint(generatedBlueprint);

      setBlueprint(generatedBlueprint);
      setIsProcessing(false);

    } catch (error) {
      console.error('Error generating blueprint:', error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to analyze your project idea. Please try again.",
        variant: "destructive",
      });
      setAppState('input');
      setIsProcessing(false);
    }
  };

  const handleDetectionComplete = () => {
    if (blueprint) {
      setAppState('dashboard');
    }
  };

  const handleSelectRecent = (item: { blueprint: Blueprint }) => {
    setBlueprint(item.blueprint);
    setDetectedType(item.blueprint.projectType);
    setAppState('dashboard');
  };

  const handleBack = () => {
    setAppState('input');
    setIdea('');
    setDetectedType(null);
    setBlueprint(null);
    setGenerationProgress(0);
  };

  if (appState === 'dashboard' && blueprint) {
    return <BlueprintDashboard blueprint={blueprint} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer">
              <img
                src="/logo.svg"
                alt="Aura Logo"
                className="relative w-12 h-12 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground tracking-tight leading-none">Aura</span>
              <span className="text-xs text-muted-foreground">Pave the Road</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-lg shadow-accent/50" />
              <span className="text-xs font-medium text-accent-foreground">AI Online</span>
            </div>
            <Button size="sm" className="hidden sm:flex" onClick={handleScrollToInput}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {appState === 'input' && (
          <>
            <LandingHero onScrollToInput={handleScrollToInput} />
            <WorkflowDiagram />
            <div ref={inputRef} className="container mx-auto px-6 py-24">
              <IdeaInput onSubmit={handleIdeaSubmit} isProcessing={isProcessing} />
              <RecentBlueprints
                history={history}
                onSelect={handleSelectRecent}
                onRemove={removeBlueprint}
              />
            </div>
          </>
        )}

        {appState === 'detecting' && (
          <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
            <ProjectTypeDetector
              detectedType={detectedType}
              onComplete={handleDetectionComplete}
              isAnalyzing={isProcessing}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      {appState === 'input' && (
        <footer className="border-t border-border/30 py-12 bg-card/30">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.svg"
                  alt="Aura Logo"
                  className="w-10 h-10 object-contain"
                />
                <span className="font-medium text-foreground">Aura</span>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Pave the road from thought to finish • Powered by AI
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <button onClick={() => toast({ title: "About Aura", description: "Aura transforms your ideas into actionable blueprints using AI." })} className="hover:text-foreground transition-colors cursor-pointer">About</button>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors cursor-pointer">GitHub</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Index;

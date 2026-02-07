import { useState } from 'react';
import { Sparkles, ArrowRight, Lightbulb, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface IdeaInputProps {
  onSubmit: (idea: string) => void;
  isProcessing: boolean;
}

const exampleIdeas = [
  {
    text: "Task management app for remote teams with real-time collaboration",
    icon: "📋",
  },
  {
    text: "IoT system to monitor greenhouse temperature and humidity",
    icon: "🌿",
  },
  {
    text: "Machine learning model to predict customer churn",
    icon: "🤖",
  },

];

export function IdeaInput({ onSubmit, isProcessing }: IdeaInputProps) {
  const [idea, setIdea] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (idea.trim()) {
      onSubmit(idea.trim());
    }
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto space-y-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Section header */}
      <div className="text-center">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Wand2 className="w-4 h-4" />
          Get Started
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Describe Your <span className="text-gradient">Project Idea</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Tell us about your vision and let our AI create a comprehensive blueprint for you.
        </p>
      </div>

      {/* Main input area */}
      <motion.div
        className={cn(
          "glass-card p-8 border-gradient transition-all duration-300",
          isFocused && "ring-2 ring-primary/30"
        )}
        whileHover={{ y: -2 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            className="p-2.5 rounded-xl bg-primary/10 text-primary"
            animate={isFocused ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              What do you want to build?
            </h3>
            <p className="text-sm text-muted-foreground">
              Be as detailed as possible for better results
            </p>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Example: I want to build a mobile app that helps people track their daily water intake with reminders and progress visualization..."
            className={cn(
              "w-full h-44 p-5 rounded-xl",
              "bg-background/80 border border-border/50",
              "text-foreground placeholder:text-muted-foreground/60",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40",
              "resize-none transition-all duration-300",
              "font-sans text-base leading-relaxed"
            )}
            disabled={isProcessing}
          />

          {/* Character count */}
          <motion.div
            className="absolute bottom-4 right-4 text-xs text-muted-foreground font-mono bg-background/80 px-2 py-1 rounded"
            animate={{ opacity: idea.length > 0 ? 1 : 0.5 }}
          >
            {idea.length} / 2000
          </motion.div>
        </div>

        <div className="flex items-center justify-between mt-6 gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lightbulb className="w-4 h-4 text-primary/60" />
            <span className="hidden sm:inline">More details = better blueprint</span>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleSubmit}
              disabled={!idea.trim() || isProcessing}
              variant="glow"
              size="lg"
              className="gap-2 px-8"
            >
              <AnimatePresence mode="wait">
                {isProcessing ? (
                  <motion.div
                    key="processing"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Analyzing...
                  </motion.div>
                ) : (
                  <motion.div
                    key="ready"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Generate Blueprint
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Example ideas */}
      <div className="space-y-5">
        <p className="text-sm text-muted-foreground text-center">
          Or try one of these examples
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exampleIdeas.map((example, index) => (
            <motion.button
              key={index}
              onClick={() => setIdea(example.text)}
              className={cn(
                "p-5 text-left rounded-xl",
                "bg-card/60 hover:bg-card",
                "border border-border/50 hover:border-primary/40",
                "transition-all duration-300",
                "group",
                index === 2 && "md:col-span-2 md:w-2/3 md:mx-auto"
              )}
              disabled={isProcessing}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3, scale: 1.01 }}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl">{example.icon}</span>
                <div className="flex-1">
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {example.text}
                  </span>
                  <motion.div
                    className="flex items-center gap-1 mt-2 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    Use this example
                    <ArrowRight className="w-3 h-3" />
                  </motion.div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

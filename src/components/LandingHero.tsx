import { Sparkles, Zap, ArrowRight, Globe, Smartphone, Monitor, Cpu, Brain } from 'lucide-react';
import { motion, type Variants, type Transition } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LandingHeroProps {
  onScrollToInput: () => void;
}

const projectTypes = [
  { icon: Globe, label: 'Websites', color: 'text-cyan-400' },
  { icon: Smartphone, label: 'Mobile Apps', color: 'text-purple-400' },
  { icon: Monitor, label: 'Desktop Software', color: 'text-emerald-400' },
  { icon: Cpu, label: 'Hardware/IoT', color: 'text-orange-400' },
  { icon: Brain, label: 'AI/Data', color: 'text-pink-400' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export function LandingHero({ onScrollToInput }: LandingHeroProps) {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      {/* Animated background effects - Soft Aura gradients */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary purple aura orb */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/15 to-primary/10 rounded-full blur-[140px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
        {/* Secondary cyan aura orb */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/12 to-purple-500/8 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
        {/* Accent orb */}
        <motion.div
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[80px]"
          animate={{
            x: [-20, 20, -20],
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
        {/* Dot grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--border) / 0.4) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-[15%] left-[10%] w-3 h-3 rounded-full bg-primary/40"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const }}
      />
      <motion.div
        className="absolute top-[25%] right-[15%] w-2 h-2 rounded-full bg-purple-400/40"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-[30%] left-[20%] w-4 h-4 rounded-full bg-emerald-400/30"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const, delay: 2 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 via-primary/10 to-cyan-500/10 border border-primary/20 mb-8 backdrop-blur-sm">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm font-medium bg-gradient-to-r from-purple-400 via-primary to-cyan-400 bg-clip-text text-transparent">Your Idea's Atmosphere</span>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] tracking-tight"
          variants={itemVariants}
        >
          <span className="text-foreground">Pave the Road</span>
          <br />
          <motion.span
            className="inline-block bg-gradient-to-r from-purple-400 via-primary to-cyan-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear' as const,
            }}
            style={{
              backgroundSize: '200% auto',
            }}
          >
            From Thought to Finish
          </motion.span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          variants={itemVariants}
        >
          Your idea's atmosphere, condensed into solid ground. Describe your vision
          and let Aura shape it into a clear, actionable roadmap.
        </motion.p>

        {/* CTA button */}
        <motion.div variants={itemVariants}>
          <motion.button
            onClick={onScrollToInput}
            className={cn(
              "group inline-flex items-center gap-3 px-10 py-5 rounded-2xl",
              "bg-gradient-to-r from-purple-500 via-primary to-cyan-400 text-primary-foreground font-semibold text-lg",
              "shadow-[0_0_40px_-10px_hsl(var(--primary)/0.5),0_0_80px_-20px_hsl(280_85%_60%/0.3)]",
              "hover:shadow-[0_0_60px_-10px_hsl(var(--primary)/0.6),0_0_100px_-20px_hsl(280_85%_60%/0.4)]",
              "transition-all duration-500"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Zap className="w-5 h-5" />
            Begin Your Journey
            <motion.div
              className="flex items-center"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Stats or trust indicators */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI-Powered</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Real-time Analysis</span>
          </div>
          <div className="h-4 w-px bg-border hidden md:block" />
          <div className="hidden md:flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span>Export Ready</span>
          </div>
        </motion.div>

        {/* Project types */}
        <motion.div className="mt-20" variants={itemVariants}>
          <p className="text-sm text-muted-foreground mb-6">Works with any project type</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {projectTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={index}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl",
                    "bg-card/60 backdrop-blur-sm border border-border/50",
                    "hover:border-primary/40 hover:bg-card/80 transition-all duration-300",
                    "cursor-default"
                  )}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <Icon className={cn("w-4 h-4", type.color)} />
                  <span className="text-sm font-medium text-foreground">{type.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-muted-foreground"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

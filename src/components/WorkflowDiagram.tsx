import { 
  MessageSquare, 
  Search, 
  HelpCircle, 
  Cog, 
  LayoutDashboard, 
  Download,
  ArrowRight,
  ArrowDown
} from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

const steps = [
  {
    id: 1,
    icon: MessageSquare,
    title: 'Describe Your Idea',
    description: 'Write your project concept in natural language',
    color: 'from-cyan-500 to-cyan-600',
    glowColor: 'shadow-cyan-500/30',
  },
  {
    id: 2,
    icon: Search,
    title: 'Intent Analysis',
    description: 'AI detects project type & requirements',
    color: 'from-purple-500 to-purple-600',
    glowColor: 'shadow-purple-500/30',
  },
  {
    id: 3,
    icon: HelpCircle,
    title: 'Clarifying Questions',
    description: 'Refine scope, users, and constraints',
    color: 'from-orange-500 to-orange-600',
    glowColor: 'shadow-orange-500/30',
  },
  {
    id: 4,
    icon: Cog,
    title: 'Blueprint Generation',
    description: 'AI creates complete project structure',
    color: 'from-emerald-500 to-emerald-600',
    glowColor: 'shadow-emerald-500/30',
  },
  {
    id: 5,
    icon: LayoutDashboard,
    title: 'Interactive Dashboard',
    description: 'Explore architecture, stack & timeline',
    color: 'from-pink-500 to-pink-600',
    glowColor: 'shadow-pink-500/30',
  },
  {
    id: 6,
    icon: Download,
    title: 'Save & Export',
    description: 'Download as PDF, Markdown, or share',
    color: 'from-blue-500 to-blue-600',
    glowColor: 'shadow-blue-500/30',
  },
];

const outputItems = [
  'Architecture diagrams',
  'Tech stack recommendations',
  'Development phases',
  'Risk assessment',
  'Learning resources',
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
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

export function WorkflowDiagram() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            From Idea to Blueprint in{' '}
            <span className="text-gradient">6 Steps</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered workflow transforms your natural language descriptions 
            into comprehensive, actionable project plans.
          </p>
        </motion.div>

        {/* Desktop workflow - horizontal */}
        <motion.div
          className="hidden lg:block mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="relative">
            {/* Animated connection line */}
            <motion.div
              className="absolute top-16 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
              style={{ transformOrigin: 'left' }}
            />
            
            {/* Steps */}
            <div className="grid grid-cols-6 gap-4">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    className="flex flex-col items-center group"
                    variants={stepVariants}
                  >
                    {/* Icon node */}
                    <motion.div
                      className={cn(
                        "relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center",
                        "bg-gradient-to-br shadow-lg",
                        step.color,
                        step.glowColor
                      )}
                      whileHover={{ 
                        scale: 1.1,
                      }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    {/* Step number */}
                    <motion.div
                      className="mt-4 w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center"
                      whileHover={{ scale: 1.2 }}
                    >
                      <span className="text-xs font-mono font-medium text-muted-foreground">{step.id}</span>
                    </motion.div>
                    
                    {/* Content */}
                    <div className="mt-4 text-center">
                      <h3 className="font-semibold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Mobile workflow - vertical */}
        <motion.div
          className="lg:hidden mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="relative max-w-sm mx-auto">
            {/* Connection line */}
            <motion.div
              className="absolute left-7 top-7 bottom-7 w-0.5 bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-pink-500/50"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              style={{ transformOrigin: 'top' }}
            />
            
            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    className="flex items-start gap-5"
                    variants={stepVariants}
                  >
                    {/* Icon node */}
                    <div className={cn(
                      "relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
                      "bg-gradient-to-br shadow-lg",
                      step.color,
                      step.glowColor
                    )}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="pt-2">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-muted text-muted-foreground">0{step.id}</span>
                        <h3 className="font-semibold text-foreground">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Output summary */}
        <motion.div
          className="glass-card p-10 max-w-4xl mx-auto border-gradient"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Input side */}
            <div className="flex-1 text-center md:text-left">
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-400">Input</span>
              </motion.div>
              <p className="text-foreground font-medium mb-2 text-lg">
                "I want to build a task management app for remote teams with real-time collaboration"
              </p>
              <p className="text-sm text-muted-foreground">
                Natural language description
              </p>
            </div>

            {/* Arrow */}
            <div className="shrink-0">
              <motion.div
                className="hidden md:flex items-center gap-3"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-500/50 to-emerald-500/50" />
                <ArrowRight className="w-6 h-6 text-emerald-400" />
              </motion.div>
              <motion.div
                className="md:hidden"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowDown className="w-6 h-6 text-emerald-400" />
              </motion.div>
            </div>

            {/* Output side */}
            <div className="flex-1">
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">Output</span>
              </motion.div>
              <div className="flex flex-wrap gap-2">
                {outputItems.map((item, index) => (
                  <motion.span
                    key={index}
                    className="px-3 py-2 rounded-lg bg-secondary/80 border border-border/50 text-sm text-foreground hover:border-primary/30 transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -2 }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

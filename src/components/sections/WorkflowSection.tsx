import { 
  FileCode2, 
  GitBranch, 
  TestTube, 
  Rocket, 
  Users, 
  MessageSquare,
  CheckCircle2,
  Clock,
  Zap,
  ArrowDown,
  LucideIcon,
  Lightbulb,
  Settings,
  Package,
  Shield,
  Database,
  Cloud,
  Code,
  Layers,
  Target,
  HelpCircle,
  Flag,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { WorkflowPhaseData, WorkflowTask } from '@/types/project';

// Tool logo URLs using Simple Icons CDN
const toolLogos: Record<string, string> = {
  react: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg',
  typescript: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/typescript.svg',
  javascript: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/javascript.svg',
  figma: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/figma.svg',
  github: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg',
  git: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/git.svg',
  vscode: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/visualstudiocode.svg',
  nodejs: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nodedotjs.svg',
  node: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nodedotjs.svg',
  python: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/python.svg',
  go: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/go.svg',
  rust: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/rust.svg',
  java: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/oracle.svg',
  php: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/php.svg',
  ruby: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ruby.svg',
  postgresql: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/postgresql.svg',
  postgres: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/postgresql.svg',
  mysql: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mysql.svg',
  mongodb: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mongodb.svg',
  redis: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/redis.svg',
  firebase: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/firebase.svg',
  supabase: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/supabase.svg',
  aws: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonwebservices.svg',
  gcp: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlecloud.svg',
  googlecloud: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlecloud.svg',
  azure: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftazure.svg',
  vercel: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vercel.svg',
  netlify: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/netlify.svg',
  heroku: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/heroku.svg',
  docker: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/docker.svg',
  kubernetes: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/kubernetes.svg',
  terraform: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/terraform.svg',
  jenkins: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/jenkins.svg',
  tailwind: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tailwindcss.svg',
  tailwindcss: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tailwindcss.svg',
  vue: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vuedotjs.svg',
  angular: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/angular.svg',
  svelte: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/svelte.svg',
  nextjs: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nextdotjs.svg',
  nuxt: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nuxtdotjs.svg',
  tensorflow: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tensorflow.svg',
  pytorch: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/pytorch.svg',
  openai: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg',
  huggingface: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/huggingface.svg',
  flutter: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/flutter.svg',
  swift: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/swift.svg',
  kotlin: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/kotlin.svg',
  reactnative: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg',
  jest: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/jest.svg',
  cypress: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cypress.svg',
  vitest: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vitest.svg',
  slack: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/slack.svg',
  jira: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/jira.svg',
  notion: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/notion.svg',
  trello: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/trello.svg',
  postman: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/postman.svg',
  graphql: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/graphql.svg',
  stripe: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/stripe.svg',
  arduino: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/arduino.svg',
  raspberrypi: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/raspberrypi.svg',
  linux: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linux.svg',
  nginx: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nginx.svg',
  elasticsearch: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/elasticsearch.svg',
  ansible: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ansible.svg',
  prometheus: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/prometheus.svg',
  grafana: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/grafana.svg',
  sketch: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/sketch.svg',
  adobexd: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobexd.svg',
  sass: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/sass.svg',
  webpack: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/webpack.svg',
  vite: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vite.svg',
  express: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/express.svg',
  fastapi: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/fastapi.svg',
  django: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/django.svg',
  flask: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/flask.svg',
  springboot: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/springboot.svg',
  prisma: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/prisma.svg',
  socketio: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/socketdotio.svg',
  redux: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/redux.svg',
  storybook: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/storybook.svg',
  sentry: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/sentry.svg',
  datadog: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/datadog.svg',
  cloudflare: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cloudflare.svg',
};

// Tool definitions with their colors
const toolColors: Record<string, { color: string; textColor: string; iconFilter?: string }> = {
  figma: { color: 'bg-[#F24E1E]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  vscode: { color: 'bg-[#007ACC]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  github: { color: 'bg-[#181717]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  react: { color: 'bg-[#20232a]', textColor: 'text-[#61DAFB]' },
  typescript: { color: 'bg-[#3178C6]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  javascript: { color: 'bg-[#F7DF1E]', textColor: 'text-black' },
  tailwind: { color: 'bg-[#0f172a]', textColor: 'text-[#38bdf8]' },
  tailwindcss: { color: 'bg-[#0f172a]', textColor: 'text-[#38bdf8]' },
  postgres: { color: 'bg-[#336791]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  postgresql: { color: 'bg-[#336791]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  docker: { color: 'bg-[#2496ED]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  aws: { color: 'bg-[#232f3e]', textColor: 'text-[#FF9900]' },
  jest: { color: 'bg-[#C21325]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  cypress: { color: 'bg-[#17202C]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  slack: { color: 'bg-[#4A154B]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  jira: { color: 'bg-[#0052CC]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  notion: { color: 'bg-[#000000]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  vercel: { color: 'bg-[#000000]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  node: { color: 'bg-[#339933]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  nodejs: { color: 'bg-[#339933]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  python: { color: 'bg-[#3776AB]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  mongodb: { color: 'bg-[#47A248]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  redis: { color: 'bg-[#DC382D]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  kubernetes: { color: 'bg-[#326CE5]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  tensorflow: { color: 'bg-[#FF6F00]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  pytorch: { color: 'bg-[#EE4C2C]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  flutter: { color: 'bg-[#02569B]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  swift: { color: 'bg-[#F05138]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  kotlin: { color: 'bg-[#7F52FF]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  firebase: { color: 'bg-[#1a1a2e]', textColor: 'text-[#FFCA28]' },
  supabase: { color: 'bg-[#1a1a2e]', textColor: 'text-[#3ECF8E]' },
  nextjs: { color: 'bg-[#000000]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  vue: { color: 'bg-[#1a1a2e]', textColor: 'text-[#4FC08D]' },
  angular: { color: 'bg-[#DD0031]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  graphql: { color: 'bg-[#E10098]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  stripe: { color: 'bg-[#635BFF]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  arduino: { color: 'bg-[#00979D]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  raspberry: { color: 'bg-[#A22846]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  raspberrypi: { color: 'bg-[#A22846]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  linux: { color: 'bg-[#1a1a2e]', textColor: 'text-[#FCC624]' },
  git: { color: 'bg-[#F05032]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  postman: { color: 'bg-[#FF6C37]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  mysql: { color: 'bg-[#4479A1]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  elasticsearch: { color: 'bg-[#005571]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  nginx: { color: 'bg-[#009639]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  jenkins: { color: 'bg-[#D24939]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  terraform: { color: 'bg-[#7B42BC]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  ansible: { color: 'bg-[#EE0000]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  prometheus: { color: 'bg-[#E6522C]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  grafana: { color: 'bg-[#F46800]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  openai: { color: 'bg-[#412991]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  huggingface: { color: 'bg-[#1a1a2e]', textColor: 'text-[#FFD21E]' },
  vite: { color: 'bg-[#1a1a2e]', textColor: 'text-[#646CFF]' },
  vitest: { color: 'bg-[#1a1a2e]', textColor: 'text-[#6E9F18]' },
  prisma: { color: 'bg-[#2D3748]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  storybook: { color: 'bg-[#FF4785]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  sentry: { color: 'bg-[#362D59]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
  cloudflare: { color: 'bg-[#F38020]', textColor: 'text-white', iconFilter: 'brightness(0) invert(1)' },
};

const defaultToolColor: { color: string; textColor: string; iconFilter?: string } = { color: 'bg-primary', textColor: 'text-primary-foreground' };

// Phase icons based on common phase names
const phaseIcons: Record<string, LucideIcon> = {
  planning: MessageSquare,
  design: Lightbulb,
  setup: Settings,
  development: GitBranch,
  testing: TestTube,
  deployment: Rocket,
  launch: Rocket,
  maintenance: Users,
  monitoring: Shield,
  infrastructure: Cloud,
  backend: Database,
  frontend: Code,
  integration: Layers,
  packaging: Package,
};

// Phase colors based on index
const phaseColors = [
  { color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/50', glowColor: 'shadow-purple-500/20', badgeBg: 'bg-purple-500' },
  { color: 'from-cyan-500 to-cyan-600', bgColor: 'bg-cyan-500/10', borderColor: 'border-cyan-500/50', glowColor: 'shadow-cyan-500/20', badgeBg: 'bg-cyan-500' },
  { color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/50', glowColor: 'shadow-emerald-500/20', badgeBg: 'bg-emerald-500' },
  { color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/50', glowColor: 'shadow-orange-500/20', badgeBg: 'bg-orange-500' },
  { color: 'from-pink-500 to-pink-600', bgColor: 'bg-pink-500/10', borderColor: 'border-pink-500/50', glowColor: 'shadow-pink-500/20', badgeBg: 'bg-pink-500' },
  { color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/50', glowColor: 'shadow-blue-500/20', badgeBg: 'bg-blue-500' },
  { color: 'from-indigo-500 to-indigo-600', bgColor: 'bg-indigo-500/10', borderColor: 'border-indigo-500/50', glowColor: 'shadow-indigo-500/20', badgeBg: 'bg-indigo-500' },
  { color: 'from-rose-500 to-rose-600', bgColor: 'bg-rose-500/10', borderColor: 'border-rose-500/50', glowColor: 'shadow-rose-500/20', badgeBg: 'bg-rose-500' },
];

function getToolLogo(toolName: string): string | null {
  const normalizedName = toolName.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  for (const [key, url] of Object.entries(toolLogos)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return url;
    }
  }
  
  return null;
}

function getToolStyle(toolName: string) {
  const normalizedName = toolName.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  for (const [key, style] of Object.entries(toolColors)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return style;
    }
  }
  
  return defaultToolColor;
}

function getPhaseIcon(phaseName: string): LucideIcon {
  const normalizedName = phaseName.toLowerCase();
  
  for (const [key, icon] of Object.entries(phaseIcons)) {
    if (normalizedName.includes(key)) {
      return icon;
    }
  }
  
  return FileCode2;
}

function ToolWithLogo({ toolName }: { toolName: string }) {
  const logoUrl = getToolLogo(toolName);
  const style = getToolStyle(toolName);
  
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-transform hover:scale-105",
      style.color,
      style.textColor
    )}>
      {logoUrl && (
        <img 
          src={logoUrl} 
          alt={toolName} 
          className="w-4 h-4"
          style={{ filter: style.iconFilter }}
          loading="lazy"
        />
      )}
      <span>{toolName}</span>
    </div>
  );
}

function TaskItem({ task }: { task: WorkflowTask }) {
  const priorityStyles = {
    high: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', label: 'High' },
    medium: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', label: 'Med' },
    low: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', label: 'Low' },
  };
  
  const priority = priorityStyles[task.priority] || priorityStyles.medium;
  
  return (
    <div className={cn(
      "flex items-start gap-3 p-3 rounded-lg border",
      priority.bg,
      priority.border
    )}>
      <span className={cn(
        "shrink-0 px-2 py-0.5 rounded text-xs font-bold uppercase",
        priority.bg,
        priority.text
      )}>
        {priority.label}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground text-sm">{task.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>
      </div>
      {task.estimatedHours && (
        <span className="shrink-0 text-xs text-muted-foreground">
          ~{task.estimatedHours}h
        </span>
      )}
    </div>
  );
}

interface DynamicPhaseNodeProps {
  phase: WorkflowPhaseData;
  index: number;
  isLast: boolean;
}

function DynamicPhaseNode({ phase, index, isLast }: DynamicPhaseNodeProps) {
  const Icon = getPhaseIcon(phase.name);
  const colorScheme = phaseColors[index % phaseColors.length];
  
  return (
    <div className="relative">
      {/* Node container */}
      <div className={cn(
        "relative rounded-2xl border-2 p-6 transition-all duration-300 hover:scale-[1.01]",
        colorScheme.bgColor,
        colorScheme.borderColor,
        `shadow-lg ${colorScheme.glowColor}`
      )}>
        {/* Phase number badge */}
        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
          <div className={cn("w-full h-full rounded-full flex items-center justify-center", colorScheme.badgeBg)}>
            {index + 1}
          </div>
        </div>

        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg shrink-0",
            colorScheme.color
          )}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-foreground">{phase.name}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {phase.duration}
              </span>
              {phase.teamSize && (
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {phase.teamSize}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {phase.description && (
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            {phase.description}
          </p>
        )}

        {/* Tools */}
        {phase.tools && phase.tools.length > 0 && (
          <div className="mb-5">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
              <Settings className="w-4 h-4 text-primary" />
              Tools & Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {phase.tools.map((tool, toolIndex) => (
                <ToolWithLogo key={toolIndex} toolName={tool} />
              ))}
            </div>
          </div>
        )}

        {/* Tasks */}
        {phase.tasks && phase.tasks.length > 0 && (
          <div className="mb-5">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-primary" />
              Key Tasks
            </h4>
            <div className="space-y-2">
              {phase.tasks.map((task, taskIndex) => (
                <TaskItem key={taskIndex} task={task} />
              ))}
            </div>
          </div>
        )}

        {/* Milestones */}
        {phase.milestones && phase.milestones.length > 0 && (
          <div className="mb-5">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
              <Flag className="w-4 h-4 text-primary" />
              Milestones
            </h4>
            <div className="space-y-2">
              {phase.milestones.map((milestone, mIndex) => (
                <div key={mIndex} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span className="text-foreground">{milestone}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Decisions */}
        {phase.keyDecisions && phase.keyDecisions.length > 0 && (
          <div className="mb-5">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              Key Decisions
            </h4>
            <div className="space-y-2">
              {phase.keyDecisions.map((decision, dIndex) => (
                <div key={dIndex} className="flex items-start gap-2 text-sm px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-foreground">{decision}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activities (collapsed into smaller view) */}
        {phase.activities && phase.activities.length > 0 && (
          <div className="mb-5">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-primary" />
              Activities
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {phase.activities.map((activity, actIndex) => (
                <div key={actIndex} className="flex items-start gap-2 px-3 py-2 rounded-lg bg-secondary/70 border border-border/50">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium shrink-0 mt-0.5">
                    {actIndex + 1}
                  </span>
                  <span className="text-sm text-foreground">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deliverables */}
        {phase.deliverables && phase.deliverables.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Deliverables
            </h4>
            <div className="flex flex-wrap gap-2">
              {phase.deliverables.map((deliverable, delIndex) => (
                <div
                  key={delIndex}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-sm text-foreground"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  {deliverable}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Connector arrow to next node */}
      {!isLast && (
        <div className="flex justify-center py-4">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-8 bg-gradient-to-b from-primary/50 to-primary/20" />
            <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
          </div>
        </div>
      )}
    </div>
  );
}

interface WorkflowSectionProps {
  workflow?: {
    phases: WorkflowPhaseData[];
  };
}

export function WorkflowSection({ workflow }: WorkflowSectionProps) {
  const phases = workflow?.phases || [];
  
  // Collect all unique tools from phases
  const allTools = [...new Set(phases.flatMap(p => p.tools || []))];
  
  // Calculate total duration
  const calculateTotalDuration = () => {
    let totalWeeks = 0;
    phases.forEach(phase => {
      const match = phase.duration.match(/(\d+)/);
      if (match) {
        totalWeeks += parseInt(match[1], 10);
      }
    });
    return totalWeeks;
  };

  if (phases.length === 0) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Development Workflow</h2>
          <p className="text-muted-foreground">
            No workflow data available for this project.
          </p>
        </div>
        <Card className="glass-card border-border/50 p-8 text-center">
          <div className="text-muted-foreground">
            <FileCode2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Workflow phases will appear here once generated.</p>
          </div>
        </Card>
      </div>
    );
  }

  const totalWeeks = calculateTotalDuration();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Development Workflow</h2>
        <p className="text-muted-foreground">
          Complete development lifecycle with detailed phases, tasks, tools, and deliverables. Follow the path from planning to launch.
        </p>
      </div>

      {/* Visual Flow Overview */}
      <Card className="glass-card border-border/50 overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Project Timeline
            </CardTitle>
            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Total: ~{totalWeeks} weeks
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            {phases.map((phase, index) => {
              const Icon = getPhaseIcon(phase.name);
              const colorScheme = phaseColors[index % phaseColors.length];
              return (
                <div key={phase.id} className="flex items-center gap-2 shrink-0">
                  <div className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all hover:scale-105",
                    colorScheme.bgColor,
                    colorScheme.borderColor
                  )}>
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br",
                      colorScheme.color
                    )}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground whitespace-nowrap">{phase.name}</p>
                      <p className="text-xs text-muted-foreground">{phase.duration}</p>
                    </div>
                  </div>
                  {index < phases.length - 1 && (
                    <div className="flex items-center gap-1">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-primary/50 to-primary/20" />
                      <svg className="w-4 h-4 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Node Flow */}
      <div className="space-y-0">
        {phases.map((phase, index) => (
          <DynamicPhaseNode 
            key={phase.id} 
            phase={phase} 
            index={index}
            isLast={index === phases.length - 1}
          />
        ))}
      </div>

      {/* Tools Legend */}
      {allTools.length > 0 && (
        <Card className="glass-card border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">All Tools & Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {allTools.map((tool, index) => (
                <ToolWithLogo key={index} toolName={tool} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

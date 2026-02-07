import type { Blueprint, ProjectType } from '@/types/project';

export function generateMockBlueprint(idea: string, projectType: ProjectType): Blueprint {
  return {
    id: crypto.randomUUID(),
    title: extractTitle(idea),
    projectType,
    overview: {
      problem: "Teams struggle to coordinate tasks and maintain visibility across remote work environments, leading to missed deadlines, duplicated efforts, and communication breakdowns.",
      solution: "A real-time collaborative task management platform that provides instant synchronization, smart notifications, and intuitive project visualization to keep distributed teams aligned and productive.",
      features: [
        "Real-time task synchronization",
        "Team collaboration workspaces",
        "Smart notifications & reminders",
        "Progress tracking dashboards",
        "Role-based access control",
        "Integration with popular tools",
      ],
      assumptions: [
        "Teams have reliable internet connectivity",
        "Users are familiar with basic project management concepts",
        "Initial target is small to medium teams (5-50 members)",
        "Mobile access is secondary to desktop experience",
      ],
    },
    targetUsers: {
      primary: [
        "Project Managers overseeing multiple teams",
        "Team Leads coordinating daily work",
        "Product Owners tracking feature progress",
      ],
      secondary: [
        "Individual contributors updating task status",
        "Stakeholders monitoring project health",
        "HR/Admin managing team access",
      ],
      personas: [
        "Sarah, 35 - Engineering Manager who needs visibility across 3 development teams",
        "Alex, 28 - Remote developer who wants clear task priorities",
        "Jordan, 42 - VP of Product who needs high-level progress reports",
      ],
    },
    techStack: [
      { name: "React 18", category: "Frontend", reason: "Component-based architecture with excellent ecosystem support" },
      { name: "TypeScript", category: "Frontend", reason: "Type safety reduces bugs and improves developer experience" },
      { name: "TailwindCSS", category: "Frontend", reason: "Rapid UI development with consistent design system" },
      { name: "Node.js", category: "Backend", reason: "JavaScript runtime enabling full-stack development" },
      { name: "Express.js", category: "Backend", reason: "Minimal, flexible web framework for APIs" },
      { name: "PostgreSQL", category: "Database", reason: "Reliable relational database with excellent performance" },
      { name: "Redis", category: "Database", reason: "In-memory caching for real-time features" },
      { name: "AWS", category: "Infrastructure", reason: "Scalable cloud platform with comprehensive services" },
      { name: "Docker", category: "Tools", reason: "Containerization for consistent deployments" },
      { name: "GitHub Actions", category: "Tools", reason: "CI/CD automation integrated with repository" },
    ],
    architecture: {
      components: [
        "React SPA Frontend",
        "API Gateway",
        "Auth Service",
        "Task Service",
        "Notification Service",
      ],
      relationships: [
        "Frontend → API Gateway: All client requests routed through gateway",
        "API Gateway → Auth Service: JWT validation and user context",
        "API Gateway → Task Service: CRUD operations for tasks and projects",
        "Task Service → Notification Service: Event-driven updates via message queue",
        "All Services → PostgreSQL: Persistent data storage",
        "Task Service → Redis: Real-time state caching",
      ],
    },
    phases: [
      {
        name: "Planning & Design",
        duration: "2 weeks",
        tasks: [
          "Finalize feature requirements",
          "Create UI/UX mockups",
          "Design database schema",
          "Set up development environment",
        ],
      },
      {
        name: "MVP Development",
        duration: "4 weeks",
        tasks: [
          "Implement authentication flow",
          "Build core task management features",
          "Create team workspace functionality",
          "Develop basic dashboard views",
        ],
      },
      {
        name: "Testing & Refinement",
        duration: "2 weeks",
        tasks: [
          "Unit and integration testing",
          "User acceptance testing",
          "Performance optimization",
          "Bug fixes and polish",
        ],
      },
      {
        name: "Launch & Iteration",
        duration: "2 weeks",
        tasks: [
          "Production deployment",
          "User onboarding support",
          "Monitor performance metrics",
          "Gather feedback for v2",
        ],
      },
    ],
    risks: [
      {
        type: "Technical Risks",
        severity: "high",
        description: "Real-time synchronization may face latency issues at scale",
        mitigation: "Implement optimistic UI updates and conflict resolution strategies",
      },
      {
        type: "Technical Risks",
        severity: "medium",
        description: "Third-party integration dependencies",
        mitigation: "Build abstraction layers and have fallback options",
      },
      {
        type: "Business Risks",
        severity: "medium",
        description: "Competitive market with established players",
        mitigation: "Focus on specific niche and unique value proposition",
      },
      {
        type: "Security Risks",
        severity: "high",
        description: "User data protection and access control",
        mitigation: "Implement robust authentication, encryption, and audit logging",
      },
      {
        type: "Operational Risks",
        severity: "low",
        description: "Team scaling and knowledge transfer",
        mitigation: "Document architecture decisions and maintain code standards",
      },
    ],
    resources: [
      { title: "React Documentation", url: "https://react.dev", type: "documentation" },
      { title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/", type: "documentation" },
      { title: "Building Real-time Apps", url: "#", type: "tutorial" },
      { title: "PostgreSQL Performance", url: "#", type: "tutorial" },
      { title: "Full-Stack Development", url: "#", type: "course" },
      { title: "System Design Fundamentals", url: "#", type: "course" },
      { title: "React Starter Template", url: "#", type: "repository" },
      { title: "Node.js Best Practices", url: "#", type: "article" },
    ],
  };
}

function extractTitle(idea: string): string {
  const words = idea.split(' ').slice(0, 6);
  return words.join(' ') + (idea.split(' ').length > 6 ? '...' : '');
}

export function detectProjectType(idea: string): ProjectType {
  const lowerIdea = idea.toLowerCase();
  
  if (lowerIdea.includes('mobile') || lowerIdea.includes('app') || lowerIdea.includes('ios') || lowerIdea.includes('android')) {
    return 'mobile';
  }
  if (lowerIdea.includes('desktop') || lowerIdea.includes('electron') || lowerIdea.includes('software')) {
    return 'desktop';
  }
  if (lowerIdea.includes('iot') || lowerIdea.includes('sensor') || lowerIdea.includes('arduino') || lowerIdea.includes('hardware') || lowerIdea.includes('raspberry')) {
    return 'hardware';
  }
  if (lowerIdea.includes('machine learning') || lowerIdea.includes('ai') || lowerIdea.includes('data') || lowerIdea.includes('model') || lowerIdea.includes('predict')) {
    return 'ai';
  }
  
  return 'website';
}

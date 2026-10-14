export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: {
    name: string;
    description: string;
    context: string;
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    description: "Responsive, component-driven user interfaces and modern web rendering",
    skills: [
      { name: "React.js", description: "Reusable component trees, hooks & reactive state", context: "Core Frontend" },
      { name: "Next.js", description: "SSR, static optimization & modern web frameworks", context: "Full-Stack React" },
      { name: "JavaScript (ES6+)", description: "Asynchronous programming, event loops & DOM", context: "Core Language" },
      { name: "Tailwind CSS", description: "Utility-first design systems & dark mode workflows", context: "Styling" },
      { name: "HTML5", description: "Semantic markup, accessibility & audio/canvas elements", context: "Standards" },
      { name: "CSS3", description: "Flexbox, CSS Grid, media queries & transitions", context: "Styling" },
      { name: "Bootstrap", description: "Rapid responsive grid scaffolding and UI primitives", context: "UI Toolkit" },
    ],
  },
  {
    id: "backend",
    name: "Backend & Systems",
    description: "Scalable server architectures, APIs, and business logic execution",
    skills: [
      { name: "Node.js", description: "Event-driven, asynchronous JavaScript runtime", context: "Runtime" },
      { name: "Express.js", description: "Minimalist RESTful routing and middleware pipelines", context: "Server Framework" },
      { name: "Django", description: "Batteries-included high-level Python web framework", context: "Python Framework" },
      { name: "REST APIs", description: "Architectural design, JSON schema & authentication", context: "Interoperability" },
      { name: "Firebase", description: "Realtime databases, authentication & cloud hosting", context: "BaaS & Cloud" },
    ],
  },
  {
    id: "programming",
    name: "Core Languages",
    description: "Algorithmic thinking, data structures, and computational foundation",
    skills: [
      { name: "Python", description: "Applied machine learning, deep learning & scripting", context: "Primary Language" },
      { name: "C++", description: "Competitive programming, memory control & data structures", context: "Systems Language" },
    ],
  },
  {
    id: "databases",
    name: "Databases & Storage",
    description: "Relational modeling, document stores, and query optimization",
    skills: [
      { name: "MySQL", description: "Relational schema design, normalization & indexing", context: "RDBMS" },
      { name: "PostgreSQL", description: "Advanced relational integrity, JSONB & complex joins", context: "RDBMS" },
      { name: "MongoDB", description: "NoSQL document storage, aggregation pipelines & indexing", context: "NoSQL Document" },
      { name: "SQL Server", description: "Enterprise relational transactions and stored procedures", context: "Enterprise SQL" },
      { name: "Microsoft Access", description: "Desktop relational forms and relational databases", context: "Database" },
      { name: "Sybase", description: "Enterprise high-concurrency relational data engine", context: "Enterprise DB" },
    ],
  },
  {
    id: "tools",
    name: "Engineering Tools & Domains",
    description: "System administration, applied AI, cybersecurity, and creative tooling",
    skills: [
      { name: "Git & GitHub", description: "Version control, branching, PR workflows & code review", context: "VCS" },
      { name: "Linux & Shell", description: "System administration, Kali Linux & automation scripting", context: "Operating Systems" },
      { name: "Deep Learning & AI", description: "Neural engineering and neural networks with Python", context: "Applied AI" },
      { name: "Computer Networking", description: "TCP/IP suite, packet inspection & socket communication", context: "Infrastructure" },
      { name: "Linear Algebra & Probability", description: "Applied mathematics for computer vision & algorithms", context: "Mathematical Foundation" },
      { name: "Adobe Photoshop & Illustrator", description: "2D graphics design, UI assets & technical vector illustration", context: "Creative Design" },
      { name: "Microsoft Office Suite", description: "Technical documentation, academic reports & presentations", context: "Productivity" },
    ],
  },
];

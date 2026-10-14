export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: "academic" | "industry" | "event";
  summary: string;
  responsibilities: string[];
  technologies?: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Assistant Professor",
    organization: "Rajshahi Science and Technology University (RSTU)",
    location: "Natore, Bangladesh",
    period: "2024 – Present",
    type: "academic",
    summary:
      "Leading advanced computer science coursework, curriculum engineering, and academic committees. Directing student research and university-level technology strategy.",
    responsibilities: [
      "Deliver rigorous undergraduate engineering lectures in Programming Languages, Web Technologies, Database Systems, and Algorithms.",
      "Formulate course materials, outcome-based syllabi, and multi-tier lab assessments aligned with national accreditation standards.",
      "Serve on departmental curriculum development, faculty search, and institutional accreditation committees.",
      "Advise and supervise senior undergraduate capstone projects, research dissertations, and career pathway planning.",
    ],
    technologies: ["Course Design", "Curriculum Strategy", "Mentorship", "Outcome-Based Education"],
  },
  {
    id: "exp-2",
    role: "Senior Lecturer",
    organization: "Rajshahi Science and Technology University (RSTU)",
    location: "Natore, Bangladesh",
    period: "2023 – 2024",
    type: "academic",
    summary:
      "Taught core computer science courses, mentored student research initiatives, and spearheaded accreditation preparatory frameworks.",
    responsibilities: [
      "Taught undergraduate computer science courses with an emphasis on hands-on software development mechanisms.",
      "Provided personalized mentorship and career advising, assisting students with research submissions and internships.",
      "Engaged in university professional development seminars and academic knowledge-sharing workshops.",
      "Collaborated across departments to develop digital learning resources and modernized laboratory modules.",
    ],
    technologies: ["Python", "C++", "Database Systems", "Software Architecture"],
  },
  {
    id: "exp-3",
    role: "Lecturer",
    organization: "Canadian University of Bangladesh (CUB)",
    location: "Dhaka, Bangladesh",
    period: "2022 – 2023",
    type: "academic",
    summary:
      "Conducted foundational programming and web development courses while leading online instructional resource creation.",
    responsibilities: [
      "Taught computer science courses including programming languages (Python, C++), web development, and data analysis.",
      "Supervised laboratory sessions, debugging student code, and demonstrating modern software engineering practices.",
      "Pioneered online learning materials, lecture repositories, and interactive instructional guides.",
      "Participated actively in departmental faculty meetings and academic assessment committees.",
    ],
    technologies: ["JavaScript", "Web Development", "Data Analysis", "Instructional Design"],
  },
  {
    id: "exp-4",
    role: "Teaching Assistant (TA)",
    organization: "Canadian University of Bangladesh (CUB)",
    location: "Dhaka, Bangladesh",
    period: "2021 – 2022",
    type: "academic",
    summary:
      "Assisted senior professors in classroom discussions, laboratory instruction, grading, and administrative course management.",
    responsibilities: [
      "Facilitated small group problem-solving sessions and assisted students with programming assignments.",
      "Assisted in grading assignments, quizzes, and examinations with thorough evaluative feedback.",
      "Provided support and instruction in CSE hardware and software computer laboratories.",
      "Supported faculty members in research data analysis and administrative grade record maintenance.",
    ],
    technologies: ["C++", "Data Structures", "Lab Demonstrations", "Academic Administration"],
  },
  {
    id: "exp-5",
    role: "Team Associate (Social Media & Web Applications)",
    organization: "International Collegiate Programming Contest (ICPC 2022)",
    location: "Dhaka, Bangladesh",
    period: "2022",
    type: "event",
    summary:
      "Coordinated digital web applications and social media systems for the prestigious ICPC World Finals Dhaka, organized by the Bangladesh Computer Council under the Ministry of ICT Division.",
    responsibilities: [
      "Deployed and maintained real-time digital event web applications under the Bangladesh Computer Council (BCC).",
      "Handled high-throughput contest updates, live participant feeds, and social media announcements for international contestants.",
      "Collaborated with technical committees to ensure continuous application uptime throughout the competitive programming contest.",
    ],
    technologies: ["Web Applications", "High Traffic Operations", "Ministry of ICT", "BCC"],
  },
  {
    id: "exp-6",
    role: "Full Stack Developer",
    organization: "KP Software Solutions",
    location: "Bangladesh",
    period: "2016 – 2019",
    type: "industry",
    summary:
      "Engineered robust web applications utilizing ReactJS, NodeJS, ExpressJS, and MongoDB with secure REST APIs and responsive mobile interfaces.",
    responsibilities: [
      "Built responsive, accessible user interfaces using HTML5, CSS3, JavaScript, and ReactJS with client-side routing.",
      "Engineered server-side architectures using NodeJS, ExpressJS, and MongoDB, implementing secure RESTful endpoints.",
      "Designed and optimized database schemas, indices, and data queries for MongoDB and relational stores.",
      "Integrated authentication, role-based access control, data validation, and automated unit and performance testing.",
      "Configured production servers, managed codebases with Git, fixed bugs, and performed regular security updates.",
    ],
    technologies: ["ReactJS", "NodeJS", "ExpressJS", "MongoDB", "REST APIs", "Tailwind CSS"],
  },
];

export const clientPartners = [
  {
    name: "Bangladesh Computer Council",
    shortName: "BCC",
    category: "Government Agency",
    description: "Statutory body under the Information & Communication Technology Division",
  },
  {
    name: "Bangladesh Hi-Tech Park Authority",
    shortName: "BHTPA",
    category: "National Technology Infrastructure",
    description: "Developing modern high-tech ecosystems across Bangladesh",
  },
  {
    name: "SSL Wireless",
    shortName: "SSL Wireless",
    category: "Telecommunications & FinTech",
    description: "Leading enterprise digital communication & payment services",
  },
];

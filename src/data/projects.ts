export interface ProjectItem {
  id: string;
  title: string;
  category: "Web Engineering" | "Robotics & Hardware" | "IoT & Systems" | "Cybersecurity & Networks";
  shortDescription: string;
  fullDescription: string;
  isConceptual: boolean;
  statusBadge: string;
  technologies: string[];
  image: string;
  highlights: string[];
  architectureNotes: string;
  githubUrl?: string;
  liveDemoUrl?: string;
}

export const projects: ProjectItem[] = [
  {
    id: "django-restaurant",
    title: "Django Restaurant Management System",
    category: "Web Engineering",
    shortDescription:
      "Enterprise restaurant POS, table reservation flow, menu inventory control, and real-time revenue analytics dashboard.",
    fullDescription:
      "A comprehensive modular web platform designed to streamline restaurant floor operations, customer table reservations, staff shifts, and inventory tracking. Built on Python Django's robust architectural model with relational database integrity.",
    isConceptual: true,
    statusBadge: "Technical Concept / Showcase",
    technologies: ["Django", "Python", "PostgreSQL", "JavaScript", "HTML5/CSS3", "REST APIs"],
    image: "/src/assets/images/django_restaurant_system_1791989398291.jpg",
    highlights: [
      "Table status orchestration with interactive floor maps (available, occupied, reserved).",
      "Dynamic menu management with automated inventory threshold alerts.",
      "Kitchen order ticketing pipeline with real-time POS order tracking.",
      "Comprehensive daily revenue trends and sales analytics reporting.",
    ],
    architectureNotes:
      "Utilizes Django Model-View-Template (MVT) architecture with Django ORM for relational persistence and modular viewsets for POS endpoints.",
    githubUrl: "https://github.com/alaminmahfuz/django-restaurant-pos",
  },
  {
    id: "line-following-robot",
    title: "Autonomous Line-Following Robot",
    category: "Robotics & Hardware",
    shortDescription:
      "Autonomous ground vehicle with infrared sensor array, PID control algorithm, and high-precision motor drive calibration.",
    fullDescription:
      "An embedded engineering robotics system designed to autonomously navigate complex pre-marked pathways using multi-channel infrared sensor arrays and microcontroller-based PID loop feedback algorithms.",
    isConceptual: true,
    statusBadge: "Hardware Concept / Robotics Lab",
    technologies: ["C++", "Arduino / Microcontroller", "PID Control", "Infrared Array", "Electronics"],
    image: "/src/assets/images/robotics_line_follower_1791989396145.jpg",
    highlights: [
      "Multi-channel IR reflectance sensor array for sub-millimeter trajectory detection.",
      "Proportional-Integral-Derivative (PID) closed-loop algorithmic steering control.",
      "Dual H-Bridge motor driver circuitry with dynamic PWM speed regulation.",
      "Engineered for competitive robotics obstacle navigation and industrial AGV applications.",
    ],
    architectureNotes:
      "Firmware programmed in C++ with low-latency hardware interrupts and deterministic sensory sampling cycles.",
    githubUrl: "https://github.com/alaminmahfuz/pid-line-follower-robotics",
  },
  {
    id: "home-automation",
    title: "Smart Home IoT Automation System",
    category: "IoT & Systems",
    shortDescription:
      "Centralized smart environment hub for ambient lighting, environmental climate metrics, and mobile-first controller UI.",
    fullDescription:
      "An integrated IoT smart home control ecosystem uniting physical sensors with modern web-based monitoring dashboards. Provides homeowners and facility managers with intuitive touch control over lighting, thermal metrics, and power efficiency.",
    isConceptual: true,
    statusBadge: "IoT System Concept",
    technologies: ["Node.js", "Express.js", "React.js", "MQTT / REST", "Sensors", "Firebase"],
    image: "/src/assets/images/smart_home_automation_1791989398665.jpg",
    highlights: [
      "Real-time ambient room temperature, humidity, and atmospheric telemetry graphs.",
      "Fine-grained multi-room smart lighting presets (Relax, Focus, Cinema).",
      "Connected sensor node health telemetry and automated power conservation triggers.",
      "Responsive handset-specific UI engineered for mobile phones and tablet viewports.",
    ],
    architectureNotes:
      "Decoupled sensor nodes transmitting lightweight payloads to an Express and Firebase backend with a real-time reactive frontend.",
    githubUrl: "https://github.com/alaminmahfuz/iot-smart-home-controller",
  },
  {
    id: "cybersecurity-analysis",
    title: "Enterprise Cybersecurity & Network Defense",
    category: "Cybersecurity & Networks",
    shortDescription:
      "Deep packet inspection, network vulnerability assessment, and threat detection framework using Scapy and Kali Linux.",
    fullDescription:
      "A technical investigation and defense framework developed around packet manipulation with Scapy and testing toolchains in Kali Linux. Designed to identify enterprise network vulnerabilities, packet sniffing risks, and firewall evasion techniques.",
    isConceptual: false,
    statusBadge: "Academic Research Project",
    technologies: ["Python", "Scapy", "Kali Linux", "Wireshark", "TCP/IP Protocols", "Network Security"],
    image: "/src/assets/images/cybersecurity_kali_scapy_1791989400788.jpg",
    highlights: [
      "Direct packet dissection and protocol validation across TCP, UDP, ICMP, and ARP layers.",
      "Custom Scapy script generation for automated network stress testing and vulnerability diagnostics.",
      "Intrusion detection analysis and malicious packet anomaly flagging.",
      "Grounded in verified academic research: 'Enterprise Cyber Security Management Using Scapy and Kali Linux'.",
    ],
    architectureNotes:
      "Built with Python and Scapy running on a hardened Kali Linux environment, interfacing directly with raw network sockets.",
    githubUrl: "https://github.com/alaminmahfuz/scapy-enterprise-cyberdefense",
  },
];

export interface PublicationItem {
  id: string;
  title: string;
  primaryAuthor: string;
  topic: string;
  category: "Network Defense" | "Cybersecurity" | "Applied Systems";
  summary: string;
  methodology: string[];
  toolsUsed: string[];
  statusNote: string;
}

export const publications: PublicationItem[] = [
  {
    id: "pub-scapy-kali",
    title: "Enterprise Cyber Security Management Using Scapy and Kali Linux",
    primaryAuthor: "Al Amin Mahfuz",
    topic: "Enterprise Network Security, Packet Crafting & Vulnerability Assessment",
    category: "Cybersecurity",
    summary:
      "An in-depth investigation into modern enterprise perimeter defense, network packet vulnerability analysis, and customized threat-modeling techniques. Evaluates defensive auditing methodologies utilizing Python Scapy packet manipulation alongside hardened Kali Linux penetration testing toolchains.",
    methodology: [
      "Custom packet fabrication to evaluate perimeter firewall filtration rules against stateful and stateless anomalies.",
      "Vulnerability reconnaissance across enterprise local area networks (LANs) and demilitarized zones (DMZs).",
      "Analysis of automated defense scripts for real-time intrusion anomaly detection and incident response.",
      "Synthesizing operational best practices for university and enterprise security administration.",
    ],
    toolsUsed: ["Python", "Scapy", "Kali Linux", "Wireshark", "Bash Scripting", "TCP/IP Protocol Stack"],
    statusNote:
      "Recorded in curriculum vitae research records. Bibliographic details (journal volume, external repository link, and DOI) will be linked here once officially released.",
  },
];

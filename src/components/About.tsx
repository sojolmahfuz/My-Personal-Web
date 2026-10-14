import { motion } from "motion/react";
import { ArrowRight, BookOpen, Briefcase, Award, CheckCircle2 } from "lucide-react";
import { profileData } from "../data/profile";

interface AboutProps {
  onOpenCvModal: () => void;
}

const careerHighlights = [
  {
    role: "Assistant Professor",
    organization: "RSTU, Natore",
    period: "2024 – Present",
    tag: "Current Role",
    description: "Leading Department of CSE coursework, academic committee governance, and undergraduate engineering research.",
  },
  {
    role: "Senior Lecturer",
    organization: "RSTU, Natore",
    period: "2023 – 2024",
    tag: "Academic Faculty",
    description: "Taught core computer science, designed curricula, and mentored student capstones.",
  },
  {
    role: "Lecturer",
    organization: "Canadian University of Bangladesh",
    period: "2022 – 2023",
    tag: "Academic Faculty",
    description: "Taught programming languages, web engineering, and supervised undergraduate student projects.",
  },
  {
    role: "Teaching Assistant (TA)",
    organization: "Canadian University of Bangladesh",
    period: "2021 – 2022",
    tag: "Academic Support",
    description: "Facilitated classroom discussions, lab demonstrations, code reviews, and student exam evaluations.",
  },
  {
    role: "Full Stack Developer",
    organization: "KP Software Solutions",
    period: "2016 – 2019",
    tag: "Industry Engineering",
    description: "Engineered scalable web applications, REST APIs, and database models using React, Node.js, and MongoDB.",
  },
];

export default function About({ onOpenCvModal }: AboutProps) {
  return (
    <section id="about" className="py-24 bg-[#0C2340]/40 relative border-t border-[#1687FF]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Biography & Teaching Vision */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#00B8FF] uppercase tracking-widest">
              <span className="w-5 h-[2px] bg-[#00B8FF]" />
              <span>ABOUT ME</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F8FF] tracking-tight leading-tight">
              Turning Ideas into Real Solutions
            </h2>

            {/* Narrative Body */}
            <p className="text-base sm:text-lg text-[#A9BDD5] leading-relaxed">
              I am an Assistant Professor in the Department of Computer Science & Engineering at Rajshahi Science and Technology University (RSTU) in Natore, Bangladesh. My career combines deep academic commitment with over five years of practical software development experience.
            </p>

            <p className="text-sm sm:text-base text-[#A9BDD5] leading-relaxed">
              In the classroom and laboratory, my focus is on demystifying complex computer science concepts—from data structures and algorithms to modern full-stack web architectures and neural networks. I believe software engineering is learned by building: transforming mathematical logic into resilient, maintainable, real-world systems.
            </p>

            {/* Core Values List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00B8FF] shrink-0 mt-0.5" />
                <p className="text-sm text-[#F5F8FF]">
                  <strong className="text-white">Applied Software Engineering:</strong> Building production-ready web and backend systems using React, Node.js, Python, and Django.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00B8FF] shrink-0 mt-0.5" />
                <p className="text-sm text-[#F5F8FF]">
                  <strong className="text-white">Active Mentorship:</strong> Guiding undergraduate engineers through competitive programming, capstone architecture, and professional ethics.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00B8FF] shrink-0 mt-0.5" />
                <p className="text-sm text-[#F5F8FF]">
                  <strong className="text-white">Enterprise Cybersecurity:</strong> Practical defense research leveraging Scapy packet manipulation and Kali Linux system hardening.
                </p>
              </div>
            </div>

            {/* More About Me Button */}
            <div className="pt-4">
              <button
                onClick={onOpenCvModal}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#00B8FF] hover:text-white transition-colors group cursor-pointer"
              >
                <span>Read Full Professional Background & CV</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Career Overview Information Cards */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#1687FF]/20">
              <span className="text-xs font-bold text-[#A9BDD5] uppercase tracking-wider">
                Career Trajectory
              </span>
              <span className="text-xs text-[#00B8FF] font-medium">2016 – Present</span>
            </div>

            <div className="space-y-3.5">
              {careerHighlights.map((pos, idx) => (
                <div
                  key={idx}
                  className="bg-[#0C2340]/70 hover:bg-[#0C2340] border border-[#1687FF]/20 hover:border-[#00B8FF]/40 rounded-xl p-4 sm:p-5 transition-all duration-200 group"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
                    <h3 className="text-base font-bold text-[#F5F8FF] group-hover:text-[#00B8FF] transition-colors">
                      {pos.role}
                    </h3>
                    <span className="text-xs font-mono-code text-[#00B8FF] bg-[#00B8FF]/10 px-2.5 py-0.5 rounded-md tabular-nums">
                      {pos.period}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-[#A9BDD5] mb-1">
                    {pos.organization} <span className="text-white/20">·</span> {pos.tag}
                  </p>

                  <p className="text-xs text-[#A9BDD5]/80 leading-relaxed">
                    {pos.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

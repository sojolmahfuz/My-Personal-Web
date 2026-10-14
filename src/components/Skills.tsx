import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Code,
  Server,
  Terminal,
  Database,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";
import { skillCategories } from "../data/skills";
import { TechIcon } from "./TechIcons";

const categoryIcons: Record<string, React.ReactNode> = {
  frontend: <Code className="w-4 h-4" />,
  backend: <Server className="w-4 h-4" />,
  programming: <Terminal className="w-4 h-4" />,
  databases: <Database className="w-4 h-4" />,
  tools: <Cpu className="w-4 h-4" />,
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filterTabs = [
    { id: "all", label: "All Technologies" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend & Systems" },
    { id: "programming", label: "Languages" },
    { id: "databases", label: "Databases" },
    { id: "tools", label: "AI & Tools" },
  ];

  // Flattened or filtered skills
  const displayedCategories =
    activeTab === "all"
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === activeTab);

  return (
    <section id="skills" className="py-24 bg-[#0C2340]/50 relative border-t border-[#1687FF]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00B8FF] uppercase tracking-widest mb-3">
            <span className="w-5 h-[2px] bg-[#00B8FF]" />
            <span>TECHNOLOGICAL TOOLSET</span>
            <span className="w-5 h-[2px] bg-[#00B8FF]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F8FF] tracking-tight leading-tight mb-4">
            Engineering Toolset & Academic Domains
          </h2>
          <p className="text-sm sm:text-base text-[#A9BDD5] leading-relaxed">
            Authentic toolset logos across languages, frameworks, database architectures, systems, and deep learning modules.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#00B8FF] text-[#07182D] font-bold shadow-md shadow-[#00B8FF]/25 scale-105"
                    : "bg-[#07182D]/80 text-[#A9BDD5] hover:text-[#F5F8FF] hover:bg-[#07182D] border border-[#1687FF]/20"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Categories Display */}
        <div className="space-y-12">
          <AnimatePresence mode="wait">
            {displayedCategories.map((cat) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#1687FF]/20">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#00B8FF]/10 text-[#00B8FF] flex items-center justify-center">
                      {categoryIcons[cat.id] || <Layers className="w-4 h-4" />}
                    </span>
                    <h3 className="text-lg font-bold text-[#F5F8FF]">
                      {cat.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[#A9BDD5] hidden sm:block">
                    {cat.description}
                  </p>
                </div>

                {/* Skill Cards Grid with Technology Logos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {cat.skills.map((skill, sIdx) => (
                    <motion.div
                      key={sIdx}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="bg-[#07182D]/80 hover:bg-[#07182D] border border-[#1687FF]/20 hover:border-[#00B8FF]/60 rounded-xl p-4 transition-all duration-200 group flex flex-col justify-between shadow-sm hover:shadow-lg hover:shadow-[#00B8FF]/5"
                    >
                      <div>
                        {/* Header with Authentic Tech Logo and Name */}
                        <div className="flex items-start gap-3 mb-2.5">
                          <div className="w-10 h-10 rounded-xl bg-[#0C2340] border border-[#1687FF]/30 p-2 flex items-center justify-center shrink-0 group-hover:border-[#00B8FF] group-hover:scale-105 transition-all shadow-inner">
                            <TechIcon name={skill.name} className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-[#F5F8FF] group-hover:text-[#00B8FF] transition-colors truncate">
                              {skill.name}
                            </h4>
                            <span className="text-[10px] text-[#00B8FF] font-mono-code block -mt-0.5">
                              {skill.context}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-[#A9BDD5] leading-relaxed">
                          {skill.description}
                        </p>
                      </div>

                      {/* Subtle Bottom Separator */}
                      <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-[#A9BDD5]/60">
                        <span className="font-mono-code text-[10px]">Verified Tool</span>
                        <Sparkles className="w-3 h-3 text-[#00B8FF]/40 group-hover:text-[#00B8FF] transition-colors" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

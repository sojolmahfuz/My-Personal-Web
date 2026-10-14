import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp, Briefcase, GraduationCap, Globe, Building2, CheckCircle2 } from "lucide-react";
import { experiences, clientPartners } from "../data/experience";

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>("exp-1");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-24 bg-[#07182D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00B8FF] uppercase tracking-widest mb-3">
            <span className="w-5 h-[2px] bg-[#00B8FF]" />
            <span>CAREER PATHWAY</span>
            <span className="w-5 h-[2px] bg-[#00B8FF]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F8FF] tracking-tight leading-tight mb-4">
            Professional Experience & Academic Leadership
          </h2>
          <p className="text-sm sm:text-base text-[#A9BDD5] leading-relaxed">
            From hands-on industry full-stack web engineering to university professorship and international programming contest coordination.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Track Line */}
          <div
            className="absolute top-4 bottom-4 left-4 sm:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#00B8FF] via-[#1687FF]/50 to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-8 relative">
            {experiences.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const isExpanded = expandedId === item.id;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row gap-6 sm:gap-12 items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Central Timeline Dot */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#07182D] border-2 border-[#00B8FF] flex items-center justify-center z-10 shadow-[0_0_12px_rgba(0,184,255,0.4)] mt-1">
                    {item.type === "academic" ? (
                      <GraduationCap className="w-4 h-4 text-[#00B8FF]" />
                    ) : item.type === "event" ? (
                      <Globe className="w-4 h-4 text-[#00B8FF]" />
                    ) : (
                      <Briefcase className="w-4 h-4 text-[#00B8FF]" />
                    )}
                  </div>

                  {/* Empty Spacer Column for Desktop Alternate Grid */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Card Content Column */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="w-full sm:w-1/2 pl-12 sm:pl-0"
                  >
                    <div
                      className={`bg-[#0C2340]/80 hover:bg-[#0C2340] border rounded-2xl p-6 transition-all duration-200 ${
                        isExpanded
                          ? "border-[#00B8FF] shadow-lg shadow-[#00B8FF]/10"
                          : "border-[#1687FF]/20 hover:border-[#1687FF]/40"
                      }`}
                    >
                      {/* Period Badge & Category */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono-code font-semibold text-[#00B8FF] tracking-wider tabular-nums">
                          {item.period}
                        </span>
                        <span className="text-[11px] font-medium text-[#A9BDD5] uppercase tracking-wider">
                          {item.type === "academic"
                            ? "University Faculty"
                            : item.type === "event"
                            ? "Official Event"
                            : "Software Industry"}
                        </span>
                      </div>

                      {/* Role & Org */}
                      <h3 className="text-lg font-bold text-[#F5F8FF] leading-snug">
                        {item.role}
                      </h3>
                      <p className="text-sm font-medium text-[#00B8FF] mb-3">
                        {item.organization}
                      </p>

                      {/* Summary */}
                      <p className="text-xs sm:text-sm text-[#A9BDD5] leading-relaxed mb-4">
                        {item.summary}
                      </p>

                      {/* Expandable Key Responsibilities */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden mb-4 pt-3 border-t border-[#1687FF]/20"
                          >
                            <p className="text-xs font-semibold text-[#F5F8FF] uppercase tracking-wider mb-2.5">
                              Core Responsibilities & Impact:
                            </p>
                            <ul className="space-y-2 text-xs text-[#A9BDD5]">
                              {item.responsibilities.map((resp, rIdx) => (
                                <li key={rIdx} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00B8FF] shrink-0 mt-0.5" />
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Action Bar / Toggle */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <div className="text-[11px] text-[#A9BDD5] flex items-center gap-1.5">
                          {item.technologies && item.technologies.slice(0, 3).map((t, tIdx) => (
                            <span key={tIdx}>
                              {t}
                              {tIdx < Math.min(2, item.technologies!.length - 1) && (
                                <span className="text-white/20 ml-1.5">·</span>
                              )}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#00B8FF] hover:text-white transition-colors cursor-pointer"
                          aria-expanded={isExpanded}
                        >
                          <span>{isExpanded ? "Show Less" : "View Details"}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Client Partners Banner */}
        <div className="mt-24 pt-12 border-t border-[#1687FF]/15">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-[#A9BDD5] uppercase tracking-widest mb-1">
              Trusted Collaboration & Industry Association
            </p>
            <p className="text-xs text-[#A9BDD5]/70">
              Selected institutions and industry organizations from professional and ICPC engagements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clientPartners.map((client, cIdx) => (
              <div
                key={cIdx}
                className="bg-[#0C2340]/50 border border-[#1687FF]/15 rounded-xl p-5 hover:border-[#00B8FF]/40 transition-colors flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-lg bg-[#00B8FF]/10 flex items-center justify-center text-[#00B8FF] shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#F5F8FF] leading-snug">
                    {client.name}
                  </h4>
                  <p className="text-xs text-[#00B8FF] font-medium mb-1">
                    {client.category}
                  </p>
                  <p className="text-[11px] text-[#A9BDD5] leading-relaxed">
                    {client.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

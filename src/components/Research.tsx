import { motion } from "motion/react";
import { ShieldAlert, BookOpen, Terminal, CheckCircle2, FileText, Lock } from "lucide-react";
import { publications } from "../data/research";

export default function Research() {
  return (
    <section id="research" className="py-24 bg-[#07182D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00B8FF] uppercase tracking-widest mb-3">
            <span className="w-5 h-[2px] bg-[#00B8FF]" />
            <span>ACADEMIC SCHOLARSHIP</span>
            <span className="w-5 h-[2px] bg-[#00B8FF]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F8FF] tracking-tight leading-tight mb-4">
            Research & Publications
          </h2>
          <p className="text-sm sm:text-base text-[#A9BDD5] leading-relaxed">
            Investigating enterprise cybersecurity management, network vulnerability assessments, and defensive toolchain deployment.
          </p>
        </div>

        {/* Research Publication Card */}
        <div className="max-w-4xl mx-auto space-y-8">
          {publications.map((pub) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6 }}
              className="bg-[#0C2340]/80 border border-[#1687FF]/25 hover:border-[#00B8FF]/60 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-[#07182D]/60 relative overflow-hidden transition-all duration-300"
            >
              {/* Subtle Ambient Glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 bg-[#00B8FF]/10 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Research Badge & Category */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#00B8FF]/10 text-[#00B8FF] flex items-center justify-center">
                    <ShieldAlert className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-mono-code font-bold text-[#00B8FF] uppercase tracking-wider">
                    {pub.category} · Academic Research
                  </span>
                </div>
                <span className="text-xs text-[#A9BDD5] font-medium">
                  Primary Author: <strong className="text-white">{pub.primaryAuthor}</strong>
                </span>
              </div>

              {/* Publication Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F5F8FF] leading-snug mb-3">
                “{pub.title}”
              </h3>

              {/* Subtopic */}
              <p className="text-xs sm:text-sm text-[#00B8FF] font-medium mb-5">
                Focus: {pub.topic}
              </p>

              {/* Research Summary */}
              <p className="text-sm sm:text-base text-[#A9BDD5] leading-relaxed mb-8">
                {pub.summary}
              </p>

              {/* Key Methodology Breakdown */}
              <div className="mb-8">
                <h4 className="text-xs font-bold text-[#F5F8FF] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#00B8FF]" />
                  <span>Research Methodology & Investigations</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {pub.methodology.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="bg-[#07182D]/70 border border-[#1687FF]/20 rounded-xl p-3.5 text-xs text-[#A9BDD5] flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00B8FF] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Environment */}
              <div className="pt-6 border-t border-[#1687FF]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs text-[#A9BDD5]">
                  <span className="font-semibold text-white mr-2">Environment:</span>
                  {pub.toolsUsed.map((tool, tIdx) => (
                    <span key={tIdx}>
                      <span className="text-[#00B8FF] font-medium">{tool}</span>
                      {tIdx < pub.toolsUsed.length - 1 && (
                        <span className="text-white/20 mx-1.5" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </div>

                <div className="text-xs text-[#A9BDD5]/70 italic flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#00B8FF]" />
                  <span>{pub.statusNote}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

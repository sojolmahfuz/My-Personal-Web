import { motion } from "motion/react";
import { GraduationCap, Award, BookOpen, CheckCircle2 } from "lucide-react";
import { educations } from "../data/education";

export default function Education() {
  return (
    <section id="education" className="py-24 bg-[#0C2340]/40 relative border-t border-[#1687FF]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00B8FF] uppercase tracking-widest mb-3">
            <span className="w-5 h-[2px] bg-[#00B8FF]" />
            <span>ACADEMIC FOUNDATION</span>
            <span className="w-5 h-[2px] bg-[#00B8FF]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F8FF] tracking-tight leading-tight mb-4">
            Education & Academic Credentials
          </h2>
          <p className="text-sm sm:text-base text-[#A9BDD5] leading-relaxed">
            Verified academic degrees, institutional backgrounds, and performance results from high school to undergraduate engineering.
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {educations.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#07182D]/80 hover:bg-[#07182D] border border-[#1687FF]/20 hover:border-[#00B8FF]/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-[#07182D]/30"
            >
              <div>
                {/* Degree & Year Top Bar */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono-code font-semibold text-[#00B8FF] tabular-nums">
                    {item.year}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#00B8FF]/10 text-[#00B8FF] flex items-center justify-center">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                </div>

                {/* Degree Title */}
                <h3 className="text-lg font-bold text-[#F5F8FF] group-hover:text-[#00B8FF] transition-colors leading-snug mb-1">
                  {item.degree}
                </h3>
                <p className="text-xs font-semibold text-[#00B8FF] mb-2">
                  {item.field}
                </p>

                {/* Institution & Location */}
                <p className="text-sm font-medium text-[#F5F8FF] mb-0.5">
                  {item.institution}
                </p>
                <p className="text-xs text-[#A9BDD5] mb-4">
                  {item.location}
                </p>

                {/* Academic Highlights */}
                <ul className="space-y-2 mb-6">
                  {item.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="text-xs text-[#A9BDD5] flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#00B8FF] shrink-0 mt-1.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Grade / CGPA Result Badge */}
              <div className="pt-4 border-t border-[#1687FF]/15 flex items-center justify-between">
                <span className="text-xs text-[#A9BDD5] font-medium uppercase tracking-wider">
                  Result Score
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold text-[#00B8FF] font-mono-code tabular-nums">
                    {item.grade}
                  </span>
                  <span className="text-xs text-[#A9BDD5] font-mono-code">
                    / {item.scale}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

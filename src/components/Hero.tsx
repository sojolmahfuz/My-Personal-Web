import { motion } from "motion/react";
import { Mail, Phone, MapPin, ArrowDown, FileText, Code2, Sparkles, GraduationCap, Github } from "lucide-react";
import { profileData } from "../data/profile";
import { getGitHubConfig } from "../lib/github";

interface HeroProps {
  portraitImage?: string;
  onUpdatePortrait?: (dataUrl: string) => void;
  onResetPortrait?: () => void;
  onOpenCvModal: () => void;
}

export default function Hero({
  portraitImage = profileData.portraitImage,
  onOpenCvModal,
}: HeroProps) {
  const githubConfig = getGitHubConfig();
  const currentGithubUsername = githubConfig.username || profileData.githubUsername;
  const currentGithubUrl = `https://github.com/${currentGithubUsername}`;
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 lg:pt-36 pb-16 flex flex-col justify-center overflow-hidden bg-mesh-dark"
    >
      {/* Subtle Background Glows */}
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00B8FF]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#1687FF]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Introductory Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-3 text-sm font-semibold tracking-wider text-[#00B8FF] uppercase"
            >
              <span className="w-6 h-[2px] bg-[#00B8FF]" />
              <span>{profileData.salutation}</span>
            </motion.div>

            {/* Name Heading with Cyan Gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F5F8FF] leading-[1.1] mb-4 text-balance"
            >
              Al Amin{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B8FF] via-[#1687FF] to-[#38BDF8]">
                {profileData.lastName}
              </span>
            </motion.h1>

            {/* Academic Title & University Lockup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 space-y-1"
            >
              <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-[#F5F8FF]">
                <GraduationCap className="w-6 h-6 text-[#00B8FF] shrink-0" />
                <span>{profileData.title}</span>
              </div>
              <p className="text-base sm:text-lg text-[#00B8FF] font-medium">
                {profileData.department}
              </p>
              <p className="text-sm sm:text-base text-[#A9BDD5]">
                {profileData.institution}
              </p>
            </motion.div>

            {/* Concise Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-[#A9BDD5] leading-relaxed max-w-2xl mb-8"
            >
              Bridging academic computer science with scalable software development. Specializing in full-stack web architectures, algorithms, deep learning with Python, and cybersecurity systems. Committed to mentoring the next generation of engineers and solving real-world challenges with elegant code.
            </motion.p>

            {/* Fast Contact Chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-[#A9BDD5] mb-8"
            >
              <a
                href={`mailto:${profileData.email}`}
                className="flex items-center gap-1.5 hover:text-[#00B8FF] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#00B8FF]" />
                <span>{profileData.email}</span>
              </a>
              <span className="text-white/20 hidden sm:inline">·</span>
              <a
                href={`tel:${profileData.phones[0]}`}
                className="flex items-center gap-1.5 hover:text-[#00B8FF] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#00B8FF]" />
                <span className="tabular-nums">{profileData.phones[0]}</span>
              </a>
              <span className="text-white/20 hidden sm:inline">·</span>
              <a
                href={currentGithubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#00B8FF] transition-colors"
                title={`GitHub Profile: @${currentGithubUsername}`}
              >
                <Github className="w-4 h-4 text-[#00B8FF]" />
                <span>@{currentGithubUsername}</span>
              </a>
              <span className="text-white/20 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#00B8FF]" />
                <span>{profileData.location}</span>
              </div>
            </motion.div>

            {/* CTA Action Cluster */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <button
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#07182D] bg-[#00B8FF] hover:bg-[#1687FF] hover:text-white rounded-xl transition-all duration-200 glow-cyan-md hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <Code2 className="w-4 h-4" />
                <span>View My Projects</span>
              </button>

              <button
                onClick={onOpenCvModal}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#F5F8FF] bg-[#0C2340] hover:bg-[#1687FF]/20 border border-[#1687FF]/30 hover:border-[#00B8FF] rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#00B8FF]" />
                <span>Download CV</span>
              </button>

              <a
                href={currentGithubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-semibold text-[#F5F8FF] bg-[#07182D] hover:bg-[#0C2340] border border-white/10 hover:border-[#00B8FF]/50 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer group"
                title="Explore code repositories on GitHub"
              >
                <Github className="w-4 h-4 text-[#00B8FF] group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
              </a>

              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-1.5 px-3 py-3.5 text-sm font-medium text-[#A9BDD5] hover:text-[#00B8FF] transition-colors cursor-pointer"
              >
                <span>Get In Touch</span>
                <ArrowDown className="w-4 h-4 -rotate-90" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Hero Portrait & Creative Visual Anchor */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-sm sm:max-w-md"
            >
              {/* Outer Decorative Gradient Border */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#00B8FF]/40 via-[#1687FF]/20 to-transparent shadow-2xl shadow-[#00B8FF]/15">
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-[22px] bg-[#0C2340] aspect-square sm:aspect-[4/5] border border-[#1687FF]/30 group">
                  <img
                    src={portraitImage}
                    alt="Al Amin Mahfuz — Assistant Professor & Software Engineer"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/al-amin-mahfuz.jpg";
                    }}
                  />

                  {/* Gentle gradient scrim at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07182D] via-transparent to-transparent opacity-40 pointer-events-none" />

                  {/* Corner Accent Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#00B8FF]/15 blur-2xl rounded-full pointer-events-none" />
                </div>
              </div>

              {/* Floating Handwritten Slogan Box */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-5 -left-4 sm:-left-6 bg-[#0C2340]/90 backdrop-blur-md border border-[#00B8FF]/40 rounded-2xl px-5 py-3 shadow-xl shadow-[#07182D]/80 flex items-center gap-3 z-20"
              >
                <div className="w-9 h-9 rounded-xl bg-[#00B8FF]/10 flex items-center justify-center text-[#00B8FF]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-handwritten text-xl text-[#00B8FF] leading-none mb-0.5">
                    {profileData.headlineQuote}
                  </p>
                  <p className="text-[11px] font-medium text-[#A9BDD5] uppercase tracking-wider">
                    Academic & Engineering Mindset
                  </p>
                </div>
              </motion.div>

              {/* Floating Tech Badge (Top Right) */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -top-3 -right-3 bg-[#0C2340]/90 backdrop-blur-md border border-[#1687FF]/30 rounded-xl px-3.5 py-2 shadow-lg shadow-[#07182D]/80 flex items-center gap-2 z-20"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#00B8FF] glow-cyan-sm" />
                <span className="text-xs font-semibold text-[#F5F8FF]">
                  RSTU Faculty
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Full-Width Metric Strip Below Hero Split */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 pt-10 border-t border-[#1687FF]/15 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {profileData.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#0C2340]/40 backdrop-blur-sm border border-[#1687FF]/15 rounded-2xl p-5 hover:border-[#00B8FF]/40 transition-colors"
            >
              <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00B8FF] to-[#1687FF] font-mono-code tabular-nums mb-1">
                {stat.value}
              </p>
              <p className="text-sm font-semibold text-[#F5F8FF] mb-1">
                {stat.label}
              </p>
              <p className="text-xs text-[#A9BDD5] leading-normal">
                {stat.detail}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

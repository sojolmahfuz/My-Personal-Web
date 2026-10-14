import { X, ExternalLink, Code2, AlertCircle, CheckCircle2, Cpu } from "lucide-react";
import { ProjectItem } from "../data/projects";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#07182D]/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#0C2340] border border-[#00B8FF]/30 rounded-2xl shadow-2xl shadow-[#07182D]/90 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#A9BDD5] hover:text-white bg-[#07182D]/70 hover:bg-[#07182D] rounded-full border border-white/10 transition-colors cursor-pointer"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Visual Banner */}
        <div className="relative aspect-video w-full bg-[#07182D] overflow-hidden border-b border-[#1687FF]/20">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C2340] via-transparent to-transparent opacity-80" />

          {/* Badge over image */}
          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            <span className="text-xs font-mono-code font-semibold text-[#00B8FF] bg-[#07182D]/85 backdrop-blur-sm px-3 py-1 rounded-md border border-[#00B8FF]/30">
              {project.category}
            </span>
            {project.isConceptual ? (
              <span className="text-xs font-medium text-amber-300 bg-amber-950/80 backdrop-blur-sm px-3 py-1 rounded-md border border-amber-500/30 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Concept / Showcase Scope</span>
              </span>
            ) : (
              <span className="text-xs font-medium text-emerald-300 bg-emerald-950/80 backdrop-blur-sm px-3 py-1 rounded-md border border-emerald-500/30 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Academic Research System</span>
              </span>
            )}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          <div>
            <h3
              id="modal-project-title"
              className="text-2xl sm:text-3xl font-extrabold text-[#F5F8FF] leading-snug mb-2"
            >
              {project.title}
            </h3>
            <p className="text-sm sm:text-base text-[#A9BDD5] leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Conceptual / Verified Notice */}
          <div className="p-4 rounded-xl bg-[#07182D]/70 border border-[#1687FF]/20 text-xs text-[#A9BDD5] leading-relaxed">
            <span className="font-semibold text-[#00B8FF]">Integrity Notice: </span>
            {project.isConceptual
              ? "This project highlights architectural concepts, hardware lab initiatives, and technology demonstrations developed in academic or software contexts. Live deployment links and repositories will be added upon public publication."
              : "This research project is anchored in verified investigative publications in cybersecurity defense using Scapy and Kali Linux."}
          </div>

          {/* Key Architectural Highlights */}
          <div>
            <h4 className="text-xs font-bold text-[#F5F8FF] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#00B8FF]" />
              <span>Key Technical Highlights</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#07182D]/50 border border-white/5 rounded-lg p-3 text-xs text-[#A9BDD5] flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00B8FF] shrink-0 mt-1.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Notes */}
          <div>
            <h4 className="text-xs font-bold text-[#F5F8FF] uppercase tracking-wider mb-1.5">
              System Architecture & Methodology
            </h4>
            <p className="text-xs sm:text-sm text-[#A9BDD5] bg-[#07182D]/50 rounded-xl p-4 border border-white/5 leading-relaxed font-mono-code">
              {project.architectureNotes}
            </p>
          </div>

          {/* Technologies Used (Unboxed Text with Separators) & Actions */}
          <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-[#A9BDD5]">
              <span className="font-semibold text-[#F5F8FF] mr-2">Technologies:</span>
              {project.technologies.map((t, idx) => (
                <span key={idx}>
                  <span className="text-[#00B8FF] font-medium">{t}</span>
                  {idx < project.technologies.length - 1 && (
                    <span className="text-white/20 mx-1.5">·</span>
                  )}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-[#F5F8FF] bg-[#07182D] hover:bg-[#07182D]/80 border border-[#1687FF]/40 hover:border-[#00B8FF] rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#00B8FF]" />
                  <span>View Repository</span>
                </a>
              )}
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-semibold text-[#07182D] bg-[#00B8FF] hover:bg-[#1687FF] hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                Close Overview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

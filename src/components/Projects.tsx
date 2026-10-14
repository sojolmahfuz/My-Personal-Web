import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Cpu,
  Layers,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Github,
  Star,
  GitFork,
  RefreshCw,
  ExternalLink,
  Code2,
} from "lucide-react";
import { projects, ProjectItem } from "../data/projects";
import ProjectModal from "./ProjectModal";
import {
  fetchGitHubRepos,
  getGitHubConfig,
  GitHubRepo,
  sampleGitHubRepos,
} from "../lib/github";
import { profileData } from "../data/profile";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [viewSource, setViewSource] = useState<"featured" | "github">("featured");

  // GitHub Live State
  const [gitHubRepos, setGitHubRepos] = useState<GitHubRepo[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [repoError, setRepoError] = useState<string | null>(null);
  const [rateLimit, setRateLimit] = useState<number | null>(null);

  const categories = ["All", "Web Engineering", "Robotics & Hardware", "IoT & Systems", "Cybersecurity & Networks"];

  const filteredProjects =
    filterCategory === "All"
      ? projects
      : projects.filter((p) => p.category === filterCategory);

  const githubConfig = getGitHubConfig();
  const currentUsername = githubConfig.username || profileData.githubUsername;

  useEffect(() => {
    if (viewSource === "github") {
      loadGitHubRepos();
    }
  }, [viewSource]);

  const loadGitHubRepos = async () => {
    setIsLoadingRepos(true);
    setRepoError(null);
    try {
      const res = await fetchGitHubRepos(currentUsername, githubConfig.token);
      setRateLimit(res.rateLimitRemaining);
      if (res.error) {
        setRepoError(res.error);
        if (res.repos.length > 0) {
          setGitHubRepos(res.repos);
        } else {
          // Provide sample fallback repos if API rate limit or empty
          setGitHubRepos(sampleGitHubRepos as GitHubRepo[]);
        }
      } else {
        setGitHubRepos(res.repos.length > 0 ? res.repos : (sampleGitHubRepos as GitHubRepo[]));
      }
    } catch (err: any) {
      setRepoError(err.message || "Failed to load GitHub repositories");
      setGitHubRepos(sampleGitHubRepos as GitHubRepo[]);
    } finally {
      setIsLoadingRepos(false);
    }
  };

  return (
    <section id="projects" className="py-24 bg-[#07182D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00B8FF] uppercase tracking-widest mb-3">
            <span className="w-5 h-[2px] bg-[#00B8FF]" />
            <span>PORTFOLIO & OPEN SOURCE REPOSITORIES</span>
            <span className="w-5 h-[2px] bg-[#00B8FF]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F8FF] tracking-tight leading-tight mb-4">
            Engineering Systems & GitHub Repositories
          </h2>
          <p className="text-sm sm:text-base text-[#A9BDD5] leading-relaxed">
            Explore verified research implementations, embedded hardware prototypes, full-stack architectures, and live GitHub code repositories.
          </p>

          {/* Toggle between Curated Systems and Live GitHub Repos */}
          <div className="inline-flex items-center p-1.5 rounded-xl bg-[#0C2340] border border-[#1687FF]/25 mt-6 shadow-inner">
            <button
              onClick={() => setViewSource("featured")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                viewSource === "featured"
                  ? "bg-[#00B8FF] text-[#07182D] shadow-md shadow-[#00B8FF]/20"
                  : "text-[#A9BDD5] hover:text-[#F5F8FF]"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Featured Systems ({projects.length})</span>
            </button>
            <button
              onClick={() => setViewSource("github")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                viewSource === "github"
                  ? "bg-[#00B8FF] text-[#07182D] shadow-md shadow-[#00B8FF]/20"
                  : "text-[#A9BDD5] hover:text-[#F5F8FF]"
              }`}
            >
              <Github className="w-4 h-4" />
              <span>Live GitHub Repos</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          </div>
        </div>

        {/* View Mode 1: Curated Featured Projects */}
        {viewSource === "featured" && (
          <>
            {/* Category Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
                    filterCategory === cat
                      ? "bg-[#00B8FF] text-[#07182D] font-bold shadow-md shadow-[#00B8FF]/25"
                      : "bg-[#0C2340] text-[#A9BDD5] hover:text-[#F5F8FF] hover:bg-[#0C2340]/80 border border-[#1687FF]/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-[#0C2340]/60 hover:bg-[#0C2340] border border-[#1687FF]/20 hover:border-[#00B8FF]/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-[#07182D]/40"
                >
                  {/* Media Thumbnail Container */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#07182D]">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C2340] via-transparent to-transparent opacity-80" />

                    {/* Scope Label */}
                    <div className="absolute top-4 left-4">
                      <span className="text-[11px] font-mono-code font-semibold text-[#00B8FF] bg-[#07182D]/90 backdrop-blur-sm px-3 py-1 rounded-md border border-[#00B8FF]/30">
                        {project.category}
                      </span>
                    </div>

                    {project.isConceptual && (
                      <div className="absolute top-4 right-4">
                        <span className="text-[11px] font-medium text-amber-300 bg-[#07182D]/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-amber-500/30 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>Technical Concept</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#F5F8FF] group-hover:text-[#00B8FF] transition-colors mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-[#A9BDD5] leading-relaxed mb-4">
                        {project.shortDescription}
                      </p>
                    </div>

                    <div>
                      {/* Technology Tags */}
                      <div className="text-xs text-[#A9BDD5] mb-5 flex flex-wrap items-center gap-y-1">
                        {project.technologies.map((tech, tIdx) => (
                          <span key={tIdx} className="flex items-center">
                            <span className="text-[#00B8FF] font-medium">{tech}</span>
                            {tIdx < project.technologies.length - 1 && (
                              <span className="text-white/20 mx-1.5" aria-hidden="true">
                                ·
                              </span>
                            )}
                          </span>
                        ))}
                      </div>

                      {/* Action Row */}
                      <div className="pt-3 border-t border-[#1687FF]/15 flex items-center justify-between gap-2">
                        {project.githubUrl ? (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-[#A9BDD5] hover:text-[#00B8FF] transition-colors"
                            title="View source on GitHub"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Source Code</span>
                          </a>
                        ) : (
                          <span className="text-xs text-[#A9BDD5]/70 font-mono-code">
                            {project.statusBadge}
                          </span>
                        )}

                        <button
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00B8FF] hover:text-white transition-colors cursor-pointer group-hover:translate-x-0.5"
                        >
                          <span>View Details</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* View Mode 2: Live GitHub Repositories */}
        {viewSource === "github" && (
          <div className="space-y-6">
            {/* GitHub Info Header */}
            <div className="bg-[#0C2340] border border-[#1687FF]/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#07182D] border border-[#00B8FF]/30 flex items-center justify-center text-[#00B8FF]">
                  <Github className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#F5F8FF] flex items-center gap-2">
                    <span>GitHub Repositories: @{currentUsername}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono-code">
                      Active
                    </span>
                  </h3>
                  <p className="text-xs text-[#A9BDD5]">
                    Synchronized in real-time with GitHub API · Public code repositories and open-source contributions
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={loadGitHubRepos}
                  disabled={isLoadingRepos}
                  className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#07182D] hover:bg-[#07182D]/80 border border-[#1687FF]/30 text-[#A9BDD5] hover:text-[#00B8FF] flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingRepos ? "animate-spin text-[#00B8FF]" : ""}`} />
                  <span>Refresh Repos</span>
                </button>

                <a
                  href={`https://github.com/${currentUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#00B8FF] hover:bg-[#1687FF] text-[#07182D] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Open GitHub Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Error or Notice Banner */}
            {repoError && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{repoError} Showing featured repository implementations.</span>
                </div>
              </div>
            )}

            {/* Loading Skeleton */}
            {isLoadingRepos ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-44 rounded-2xl bg-[#0C2340]/40 border border-[#1687FF]/10 animate-pulse p-6"
                  />
                ))}
              </div>
            ) : (
              /* Repositories Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gitHubRepos.map((repo, idx) => (
                  <motion.div
                    key={repo.id || idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="bg-[#0C2340]/70 hover:bg-[#0C2340] border border-[#1687FF]/20 hover:border-[#00B8FF]/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-md"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-bold text-[#F5F8FF] group-hover:text-[#00B8FF] transition-colors flex items-center gap-1.5 break-all"
                        >
                          <Code2 className="w-4 h-4 text-[#00B8FF] shrink-0" />
                          <span>{repo.name}</span>
                        </a>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#A9BDD5] hover:text-[#00B8FF] transition-colors p-1"
                          title="Open on GitHub"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                      <p className="text-xs text-[#A9BDD5] leading-relaxed line-clamp-3 mb-4">
                        {repo.description || "Open source project & academic computer science repository."}
                      </p>

                      {/* Topics */}
                      {repo.topics && repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {repo.topics.slice(0, 3).map((topic, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#07182D] text-[#00B8FF] border border-[#00B8FF]/20"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Repo Meta Footer */}
                    <div className="pt-3 border-t border-[#1687FF]/15 flex items-center justify-between text-xs text-[#A9BDD5]">
                      <div className="flex items-center gap-3">
                        {repo.language && (
                          <span className="flex items-center gap-1.5 font-medium text-[#F5F8FF]">
                            <span className="w-2 h-2 rounded-full bg-[#00B8FF]" />
                            <span>{repo.language}</span>
                          </span>
                        )}

                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-400" />
                          <span>{repo.stargazers_count ?? 0}</span>
                        </span>

                        <span className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5 text-[#A9BDD5]" />
                          <span>{repo.forks_count ?? 0}</span>
                        </span>
                      </div>

                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-semibold text-[#00B8FF] hover:underline"
                      >
                        Clone / View →
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Project Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

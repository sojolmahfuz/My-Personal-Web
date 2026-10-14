import { useState, useEffect } from "react";
import { Menu, X, FileText, ArrowRight, Github } from "lucide-react";
import { profileData } from "../data/profile";
import { getGitHubConfig } from "../lib/github";

interface NavbarProps {
  onOpenCvModal: () => void;
}

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Research", href: "#research" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar({ onOpenCvModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const githubConfig = getGitHubConfig();
  const githubUrl = `https://github.com/${githubConfig.username || profileData.githubUsername}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Simple active section detection
      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const el = document.getElementById(targetId);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#07182D]/90 backdrop-blur-md border-b border-[#1687FF]/20 shadow-lg shadow-[#07182D]/80 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single Text Element) */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex flex-col group whitespace-nowrap shrink-0"
            aria-label="Al Amin Mahfuz - Home"
          >
            <span className="text-lg sm:text-xl font-bold tracking-tight text-[#F5F8FF] group-hover:text-[#00B8FF] transition-colors">
              Al Amin Mahfuz
            </span>
            <span className="text-[11px] font-medium text-[#A9BDD5] tracking-wider uppercase -mt-0.5">
              Assistant Professor · CSE
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-[#A9BDD5]"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap shrink-0 relative ${
                    isActive
                      ? "text-[#00B8FF] font-semibold"
                      : "hover:text-[#F5F8FF] hover:bg-white/5"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#00B8FF] rounded-full shadow-[0_0_8px_#00B8FF]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              title={`View GitHub (@${githubConfig.username || profileData.githubUsername})`}
              className="p-2 text-[#A9BDD5] hover:text-[#00B8FF] hover:bg-white/5 rounded-lg border border-white/5 hover:border-[#00B8FF]/30 transition-all cursor-pointer"
            >
              <Github className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenCvModal}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-[#07182D] bg-[#00B8FF] hover:bg-[#1687FF] hover:text-white rounded-lg transition-all duration-200 glow-cyan-sm active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Download CV</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#A9BDD5] hover:text-[#F5F8FF] hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0C2340]/95 backdrop-blur-xl border-b border-[#1687FF]/20 px-6 py-6 shadow-2xl transition-all">
          <div className="flex flex-col gap-2">
            <div className="pb-3 mb-2 border-b border-white/10">
              <p className="text-xs font-semibold text-[#00B8FF] uppercase tracking-wider">
                {profileData.institutionShort}
              </p>
              <p className="text-sm text-[#F5F8FF] font-medium">{profileData.title}</p>
            </div>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "bg-[#00B8FF]/10 text-[#00B8FF] font-semibold"
                      : "text-[#A9BDD5] hover:text-[#F5F8FF] hover:bg-white/5"
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </a>
              );
            })}
            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-2">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#F5F8FF] bg-[#07182D] hover:bg-[#0C2340] border border-[#1687FF]/30 rounded-lg transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4 text-[#00B8FF]" />
                <span>GitHub Profile (@{githubConfig.username || profileData.githubUsername})</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCvModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#07182D] bg-[#00B8FF] hover:bg-[#1687FF] hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Download Curriculum Vitae</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

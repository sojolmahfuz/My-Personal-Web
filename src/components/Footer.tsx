import { ArrowUp, Mail, Phone, MapPin, GraduationCap, Github, Linkedin, Lock } from "lucide-react";
import { profileData } from "../data/profile";

interface FooterProps {
  onOpenAdmin?: () => void;
}

export default function Footer({ onOpenAdmin }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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

  return (
    <footer className="bg-[#051121] border-t border-[#1687FF]/20 text-[#A9BDD5] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-start">
          {/* Brand & Title */}
          <div className="md:col-span-5 space-y-3">
            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-[#F5F8FF] tracking-tight">
                Al Amin Mahfuz
              </h3>
              <p className="text-xs font-semibold text-[#00B8FF] tracking-wider uppercase">
                Assistant Professor · Department of CSE
              </p>
              <p className="text-xs text-[#A9BDD5]">
                Rajshahi Science and Technology University (RSTU), Natore, Bangladesh
              </p>
            </div>
            <p className="text-xs text-[#A9BDD5]/80 max-w-sm leading-relaxed">
              Advancing computer science education, full-stack software development, and cybersecurity defense research.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-bold text-[#F5F8FF] uppercase tracking-wider">
              Navigation
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-[#00B8FF] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Direct Communications */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-bold text-[#F5F8FF] uppercase tracking-wider">
              Communication
            </p>
            <div className="space-y-2 text-xs">
              <a
                href={`mailto:${profileData.email}`}
                className="flex items-center gap-2 hover:text-[#00B8FF] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#00B8FF]" />
                <span>{profileData.email}</span>
              </a>
              <a
                href={`tel:${profileData.phones[0]}`}
                className="flex items-center gap-2 hover:text-[#00B8FF] transition-colors tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-[#00B8FF]" />
                <span>{profileData.phones[0]}</span>
              </a>
              <a
                href={`https://github.com/${profileData.githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#00B8FF] transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-[#00B8FF]" />
                <span>github.com/{profileData.githubUsername}</span>
              </a>
              <div className="flex items-start gap-2 text-[#A9BDD5]/80">
                <MapPin className="w-3.5 h-3.5 text-[#00B8FF] shrink-0 mt-0.5" />
                <span>Natore & Dinajpur, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A9BDD5]/70">
          <p>
            © {new Date().getFullYear()} Al Amin Mahfuz. All rights reserved. Academic & Software Portfolio.
          </p>

          <div className="flex items-center gap-3">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#07182D] hover:bg-[#0C2340] border border-[#1687FF]/20 text-[#A9BDD5] hover:text-[#00B8FF] transition-colors cursor-pointer"
                title="Manage inquiries, Supabase database, and website content"
              >
                <Lock className="w-3.5 h-3.5 text-[#00B8FF]" />
                <span>Admin Portal</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#07182D] hover:bg-[#0C2340] border border-[#1687FF]/20 text-[#A9BDD5] hover:text-[#00B8FF] transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

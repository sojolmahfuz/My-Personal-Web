import { X, Printer, Download, GraduationCap, Briefcase, Mail, Phone, Award, CheckCircle2 } from "lucide-react";
import { profileData } from "../data/profile";
import { experiences } from "../data/experience";
import { educations } from "../data/education";
import { publications } from "../data/research";

interface CvModalProps {
  portraitImage?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CvModal({
  portraitImage = profileData.portraitImage,
  isOpen,
  onClose,
}: CvModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/documents/al-amin-mahfuz-cv.pdf";
    link.download = "Al_Amin_Mahfuz_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0B1E38] border border-[#00B8FF]/30 rounded-2xl shadow-2xl overflow-hidden my-6 text-[#F5F8FF]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#07182D] border-b border-[#1687FF]/20">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00B8FF]" />
            <h3 id="cv-modal-title" className="text-sm font-bold text-[#F5F8FF]">
              Curriculum Vitae — Al Amin Mahfuz
            </h3>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#F5F8FF] bg-[#0C2340] hover:bg-[#1687FF]/20 border border-[#1687FF]/30 rounded-lg transition-colors cursor-pointer"
              title="Print CV or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-[#00B8FF]" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#07182D] bg-[#00B8FF] hover:bg-[#1687FF] hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#A9BDD5] hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Close CV viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Document Content */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto space-y-8 bg-[#09203C]">
          {/* Header Card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-6 border-b border-[#1687FF]/20">
            <div className="text-center sm:text-left space-y-1">
              <h1 className="text-3xl font-extrabold text-[#F5F8FF]">
                Al Amin Mahfuz
              </h1>
              <p className="text-sm font-semibold text-[#00B8FF]">
                Assistant Professor · Department of Computer Science & Engineering
              </p>
              <p className="text-xs text-[#A9BDD5]">
                Rajshahi Science and Technology University (RSTU), Natore, Bangladesh
              </p>

              <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-[#A9BDD5]">
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#00B8FF]" />
                  <span>sojol.cub@gmail.com</span>
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#00B8FF]" />
                  <span>+8801701012207, +8801717704609</span>
                </span>
              </div>
            </div>

            <div className="w-24 h-28 rounded-xl overflow-hidden border border-[#00B8FF]/40 shrink-0 bg-[#07182D]">
              <img
                src={portraitImage}
                alt="Al Amin Mahfuz"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/al-amin-mahfuz.jpg";
                }}
              />
            </div>
          </div>

          {/* Professional Statement */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-[#00B8FF] uppercase tracking-wider">
              Professional Statement
            </h2>
            <p className="text-xs sm:text-sm text-[#A9BDD5] leading-relaxed">
              {profileData.statement}
            </p>
          </div>

          {/* Technical Skills Summary */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-[#00B8FF] uppercase tracking-wider">
              Technical Core & Engineering Competencies
            </h2>
            <div className="bg-[#07182D]/70 rounded-xl p-4 border border-[#1687FF]/20 space-y-2 text-xs text-[#A9BDD5] leading-relaxed">
              <p>
                <strong className="text-white">Programming Languages:</strong> Python, C++, JavaScript (ES6+), HTML5, CSS3.
              </p>
              <p>
                <strong className="text-white">Web Frameworks & Libraries:</strong> Node.js, Express.js, Django, React.js, React Native, Next.js, Tailwind CSS, Bootstrap, REST APIs.
              </p>
              <p>
                <strong className="text-white">Databases:</strong> MySQL, SQL Server, PostgreSQL, MongoDB, Microsoft Access, Sybase, Firebase.
              </p>
              <p>
                <strong className="text-white">Systems, AI & Design:</strong> Linux (Kali Linux, Ubuntu), Git/GitHub, Deep Learning & Neural Engineering with Python, Scapy Packet Analysis, Adobe Photoshop, Illustrator.
              </p>
            </div>
          </div>

          {/* Research & Publications */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-[#00B8FF] uppercase tracking-wider">
              Research & Publications
            </h2>
            <div className="bg-[#07182D]/70 rounded-xl p-4 border border-[#1687FF]/20 space-y-1 text-xs">
              <p className="font-bold text-[#F5F8FF]">
                1. Enterprise Cyber Security Management Using Scapy and Kali Linux.
              </p>
              <p className="text-[#A9BDD5]">
                Author: Al Amin Mahfuz · Investigation into enterprise perimeter defense and packet manipulation.
              </p>
            </div>
          </div>

          {/* Professional Job Experience */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-[#00B8FF] uppercase tracking-wider">
              Professional Job Experience
            </h2>
            <div className="space-y-3">
              {experiences.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#07182D]/70 rounded-xl p-4 border border-[#1687FF]/20 space-y-1.5 text-xs"
                >
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-[#F5F8FF]">
                      {item.role}
                    </h3>
                    <span className="font-mono-code text-[#00B8FF]">{item.period}</span>
                  </div>
                  <p className="text-[#00B8FF] font-medium">{item.organization}</p>
                  <p className="text-[#A9BDD5] leading-relaxed">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-[#00B8FF] uppercase tracking-wider">
              Academic Education
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {educations.map((edu, idx) => (
                <div
                  key={idx}
                  className="bg-[#07182D]/70 rounded-xl p-3.5 border border-[#1687FF]/20 space-y-1 text-xs"
                >
                  <p className="font-bold text-[#F5F8FF]">{edu.degree}</p>
                  <p className="text-[#00B8FF]">{edu.field}</p>
                  <p className="text-[#A9BDD5]">{edu.institution}</p>
                  <p className="text-white font-mono-code pt-1">
                    Result: {edu.grade} / {edu.scale} ({edu.year})
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Academic References */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-[#00B8FF] uppercase tracking-wider">
              Academic References
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#07182D]/70 rounded-xl p-4 border border-[#1687FF]/20 text-xs space-y-1">
                <p className="font-bold text-[#F5F8FF]">Murshed Al Amin</p>
                <p className="text-[#00B8FF]">Lecturer, Department of CSE</p>
                <p className="text-[#A9BDD5]">Canadian University of Bangladesh</p>
                <p className="text-[#A9BDD5]">Email: tonar.tron@gmail.com</p>
              </div>

              <div className="bg-[#07182D]/70 rounded-xl p-4 border border-[#1687FF]/20 text-xs space-y-1">
                <p className="font-bold text-[#F5F8FF]">Md Kawsar Ahmed Asif</p>
                <p className="text-[#00B8FF]">Lecturer, Department of CSE</p>
                <p className="text-[#A9BDD5]">Canadian University of Bangladesh</p>
                <p className="text-[#A9BDD5]">Email: ahmedasif.math.du@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Research from "./components/Research";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CvModal from "./components/CvModal";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import { getCurrentAdminSession, AdminUser } from "./lib/adminAuth";

export default function App() {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"portfolio" | "admin">(() => {
    if (typeof window !== "undefined" && window.location.hash === "#admin") {
      return "admin";
    }
    return "portfolio";
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    return getCurrentAdminSession();
  });

  const [currentPortrait, setCurrentPortrait] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("al_amin_raw_portrait");
      if (saved) return saved;
    }
    return "/images/al-amin-mahfuz.jpg";
  });

  // Listen for keyboard shortcut (Ctrl+Shift+A or Alt+A) to access Admin Portal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") || (e.altKey && e.key.toLowerCase() === "a")) {
        e.preventDefault();
        setViewMode((prev) => (prev === "portfolio" ? "admin" : "portfolio"));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleUpdatePortrait = (dataUrl: string) => {
    setCurrentPortrait(dataUrl);
    try {
      localStorage.setItem("al_amin_raw_portrait", dataUrl);
    } catch {
      // Ignore quota errors if any
    }
  };

  const handleResetPortrait = () => {
    localStorage.removeItem("al_amin_raw_portrait");
    setCurrentPortrait("/images/al-amin-mahfuz.jpg");
  };

  // If in Admin Mode
  if (viewMode === "admin") {
    if (adminUser) {
      return (
        <AdminDashboard
          user={adminUser}
          onLogout={() => setAdminUser(null)}
          onBackToPortfolio={() => setViewMode("portfolio")}
        />
      );
    }
    return (
      <AdminLogin
        onLoginSuccess={(u) => setAdminUser(u)}
        onBackToPortfolio={() => setViewMode("portfolio")}
      />
    );
  }

  // Public Portfolio View
  return (
    <div className="min-h-screen bg-[#07182D] text-[#F5F8FF] font-sans relative selection:bg-[#00B8FF]/25 selection:text-[#00B8FF]">
      {/* Top Navigation */}
      <Navbar onOpenCvModal={() => setIsCvModalOpen(true)} />

      {/* Main Portfolio Sections */}
      <main>
        <Hero
          portraitImage={currentPortrait}
          onUpdatePortrait={handleUpdatePortrait}
          onResetPortrait={handleResetPortrait}
          onOpenCvModal={() => setIsCvModalOpen(true)}
        />
        <About onOpenCvModal={() => setIsCvModalOpen(true)} />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Research />
        <Contact />
      </main>

      {/* Footer with Admin Portal Access */}
      <Footer onOpenAdmin={() => setViewMode("admin")} />

      {/* Curriculum Vitae Viewer & Download Modal */}
      <CvModal
        portraitImage={currentPortrait}
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />
    </div>
  );
}

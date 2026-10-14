import { useState, useEffect } from "react";
import { ShieldCheck, Lock, User, Mail, KeyRound, ArrowLeft, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { isProfileSetup, setupInitialAdmin, loginAdmin, AdminUser } from "../../lib/adminAuth";
import { profileData } from "../../data/profile";

interface AdminLoginProps {
  onLoginSuccess: (user: AdminUser) => void;
  onBackToPortfolio: () => void;
}

export default function AdminLogin({ onLoginSuccess, onBackToPortfolio }: AdminLoginProps) {
  const [isSetup, setIsSetup] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Setup Form State
  const [setupForm, setSetupForm] = useState({
    name: profileData.name,
    email: profileData.email,
    username: "alamin",
    password: "",
    confirmPassword: "",
  });

  // Login Form State
  const [loginForm, setLoginForm] = useState({
    identifier: "alamin",
    password: "",
  });

  useEffect(() => {
    checkSetupStatus();
  }, []);

  const checkSetupStatus = async () => {
    const status = await isProfileSetup();
    setIsSetup(status);
  };

  const handleSetupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!setupForm.username.trim() || setupForm.username.length < 3) {
      setErrorMessage("Username must be at least 3 characters.");
      return;
    }
    if (!setupForm.password || setupForm.password.length < 6) {
      setErrorMessage("Master password must be at least 6 characters.");
      return;
    }
    if (setupForm.password !== setupForm.confirmPassword) {
      setErrorMessage("Passwords do not match. Please verify.");
      return;
    }

    setIsLoading(true);
    const res = await setupInitialAdmin(
      setupForm.name,
      setupForm.email,
      setupForm.username,
      setupForm.password
    );
    setIsLoading(false);

    if (res.success) {
      // Setup successful, trigger login callback
      onLoginSuccess({
        name: setupForm.name,
        email: setupForm.email,
        username: setupForm.username,
        createdAt: new Date().toISOString(),
      });
    } else {
      setErrorMessage(res.error || "Failed to create administrator profile.");
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!loginForm.identifier.trim()) {
      setErrorMessage("Please enter your username or email address.");
      return;
    }
    if (!loginForm.password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setIsLoading(true);
    const res = await loginAdmin(loginForm.identifier, loginForm.password);
    setIsLoading(false);

    if (res.success && res.user) {
      onLoginSuccess(res.user);
    } else {
      setErrorMessage(res.error || "Invalid credentials.");
    }
  };

  if (isSetup === null) {
    return (
      <div className="min-h-screen bg-[#07182D] flex items-center justify-center p-4">
        <div className="w-8 h-8 border-2 border-[#00B8FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mesh-dark flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative">
      {/* Top Left Return Button */}
      <button
        onClick={onBackToPortfolio}
        className="absolute top-6 left-6 inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#A9BDD5] hover:text-[#00B8FF] bg-[#0C2340]/80 hover:bg-[#0C2340] border border-[#1687FF]/20 rounded-xl transition-all cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Portfolio</span>
      </button>

      {/* Main Card Container */}
      <div className="w-full max-w-md bg-[#0C2340]/90 backdrop-blur-xl border border-[#1687FF]/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#07182D]/90 my-10 relative overflow-hidden">
        {/* Glow Element */}
        <div
          className="absolute -top-12 -right-12 w-40 h-40 bg-[#00B8FF]/15 rounded-full blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Lock / Shield Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#00B8FF]/10 border border-[#00B8FF]/30 text-[#00B8FF] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#00B8FF]/10">
          {isSetup ? <Lock className="w-7 h-7" /> : <ShieldCheck className="w-7 h-7" />}
        </div>

        {/* Header Text */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-[#F5F8FF] tracking-tight">
            {isSetup ? "Administrator Sign In" : "Initialize Admin Profile"}
          </h2>
          <p className="text-xs text-[#A9BDD5] mt-1.5 leading-relaxed">
            {isSetup
              ? "Access your database control panel, inquiries inbox, and portfolio settings."
              : "Create your one-time administrator profile. Once established, only the login section will remain available."}
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/40 text-xs text-rose-300 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* FORM 1: ONE-TIME SETUP */}
        {!isSetup ? (
          <form onSubmit={handleSetupSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#A9BDD5] uppercase tracking-wider mb-1.5">
                Administrator Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={setupForm.name}
                  onChange={(e) => setSetupForm({ ...setupForm, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#07182D] border border-[#1687FF]/25 rounded-xl text-sm text-[#F5F8FF] focus:outline-none focus:border-[#00B8FF] transition-colors"
                  placeholder="Al Amin Mahfuz"
                />
                <User className="w-4 h-4 text-[#A9BDD5] absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A9BDD5] uppercase tracking-wider mb-1.5">
                Official Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={setupForm.email}
                  onChange={(e) => setSetupForm({ ...setupForm, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#07182D] border border-[#1687FF]/25 rounded-xl text-sm text-[#F5F8FF] focus:outline-none focus:border-[#00B8FF] transition-colors"
                  placeholder="sojol.cub@gmail.com"
                />
                <Mail className="w-4 h-4 text-[#A9BDD5] absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A9BDD5] uppercase tracking-wider mb-1.5">
                Master Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={setupForm.username}
                  onChange={(e) => setSetupForm({ ...setupForm, username: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#07182D] border border-[#1687FF]/25 rounded-xl text-sm text-[#F5F8FF] focus:outline-none focus:border-[#00B8FF] transition-colors font-mono-code"
                  placeholder="alamin"
                />
                <KeyRound className="w-4 h-4 text-[#A9BDD5] absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A9BDD5] uppercase tracking-wider mb-1.5">
                Master Password (min 6 chars)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={setupForm.password}
                  onChange={(e) => setSetupForm({ ...setupForm, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-2.5 bg-[#07182D] border border-[#1687FF]/25 rounded-xl text-sm text-[#F5F8FF] focus:outline-none focus:border-[#00B8FF] transition-colors font-mono-code"
                  placeholder="••••••••"
                />
                <Lock className="w-4 h-4 text-[#A9BDD5] absolute left-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-[#A9BDD5] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A9BDD5] uppercase tracking-wider mb-1.5">
                Confirm Master Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={setupForm.confirmPassword}
                  onChange={(e) => setSetupForm({ ...setupForm, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#07182D] border border-[#1687FF]/25 rounded-xl text-sm text-[#F5F8FF] focus:outline-none focus:border-[#00B8FF] transition-colors font-mono-code"
                  placeholder="••••••••"
                />
                <Lock className="w-4 h-4 text-[#A9BDD5] absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-[#00B8FF] hover:bg-[#1687FF] text-[#07182D] hover:text-white font-bold rounded-xl text-sm transition-all duration-200 glow-cyan-sm active:scale-[0.99] cursor-pointer disabled:opacity-50"
              >
                {isLoading ? "Creating Profile..." : "Create Admin Profile & Log In"}
              </button>
            </div>
          </form>
        ) : (
          /* FORM 2: LOGIN ONLY (Permanent Gate) */
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#A9BDD5] uppercase tracking-wider mb-1.5">
                Username or Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={loginForm.identifier}
                  onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#07182D] border border-[#1687FF]/25 rounded-xl text-sm text-[#F5F8FF] focus:outline-none focus:border-[#00B8FF] transition-colors font-mono-code"
                  placeholder="alamin or sojol.cub@gmail.com"
                />
                <User className="w-4 h-4 text-[#A9BDD5] absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A9BDD5] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-2.5 bg-[#07182D] border border-[#1687FF]/25 rounded-xl text-sm text-[#F5F8FF] focus:outline-none focus:border-[#00B8FF] transition-colors font-mono-code"
                  placeholder="••••••••"
                />
                <Lock className="w-4 h-4 text-[#A9BDD5] absolute left-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-[#A9BDD5] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-[#00B8FF] hover:bg-[#1687FF] text-[#07182D] hover:text-white font-bold rounded-xl text-sm transition-all duration-200 glow-cyan-sm active:scale-[0.99] cursor-pointer disabled:opacity-50"
              >
                {isLoading ? "Verifying..." : "Sign In to Admin Panel"}
              </button>
            </div>

            <div className="text-center pt-2">
              <span className="text-[11px] text-[#A9BDD5]/60">
                Authorized for Al Amin Mahfuz · Faculty RSTU
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

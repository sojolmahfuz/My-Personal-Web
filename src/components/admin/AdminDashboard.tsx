import { useState, useEffect } from "react";
import {
  Database,
  Mail,
  FolderGit2,
  Cpu,
  User,
  Shield,
  LogOut,
  ArrowLeft,
  RefreshCw,
  Search,
  Trash2,
  CheckCircle2,
  Clock,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  Send,
  Plus,
  Save,
  Terminal,
  Activity,
  Github,
  GitBranch,
  GitFork,
  Star,
  Code,
  BookOpen,
} from "lucide-react";
import { AdminUser, logoutAdmin, changeAdminPassword } from "../../lib/adminAuth";
import {
  fetchAllMessages,
  deleteMessage,
  updateMessageStatus,
  testDatabaseConnection,
  StoredMessage,
} from "../../lib/adminDataManager";
import { SUPABASE_PROJECT_ID, SUPABASE_URL } from "../../lib/supabase";
import { profileData } from "../../data/profile";
import { projects, ProjectItem } from "../../data/projects";
import {
  getGitHubConfig,
  saveGitHubConfig,
  fetchGitHubProfile,
  fetchGitHubRepos,
  GitHubUserProfile,
  GitHubRepo,
  sampleGitHubRepos,
} from "../../lib/github";

interface AdminDashboardProps {
  user: AdminUser;
  onLogout: () => void;
  onBackToPortfolio: () => void;
}

type TabKey = "overview" | "messages" | "database" | "github" | "content" | "settings";

export default function AdminDashboard({
  user,
  onLogout,
  onBackToPortfolio,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<string>("connected");
  const [dbTestResult, setDbTestResult] = useState<any>(null);
  const [isTestingDb, setIsTestingDb] = useState(false);

  // GitHub Integration State
  const [githubConfig, setGithubConfigState] = useState(() => getGitHubConfig());
  const [githubUsernameInput, setGithubUsernameInput] = useState(() => getGitHubConfig().username);
  const [githubTokenInput, setGithubTokenInput] = useState(() => getGitHubConfig().token || "");
  const [githubRemoteInput, setGithubRemoteInput] = useState(() => getGitHubConfig().remoteUrl || "https://github.com/alaminmahfuz/alamin-mahfuz-portfolio.git");
  const [showToken, setShowToken] = useState(false);
  const [githubProfile, setGithubProfile] = useState<GitHubUserProfile | null>(null);
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);
  const [githubError, setGithubError] = useState<string | null>(null);
  const [githubNotice, setGithubNotice] = useState<string | null>(null);
  const [copiedGitCmd, setCopiedGitCmd] = useState<string | null>(null);
  const [repoSearch, setRepoSearch] = useState("");
  const [rateLimitRemaining, setRateLimitRemaining] = useState<number | null>(null);

  // Messages Filter & Search
  const [messageFilter, setMessageFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<StoredMessage | null>(null);

  // Content Editor State
  const [editableProfile, setEditableProfile] = useState(() => {
    const saved = localStorage.getItem("al_amin_custom_profile");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {
      title: profileData.title,
      department: profileData.department,
      headlineQuote: profileData.headlineQuote,
      email: profileData.email,
      phonePrimary: profileData.phones[0],
      phoneSecondary: profileData.phones[1] || "",
      summary: profileData.summary,
      statement: profileData.statement,
      addressPresent: profileData.addresses.present,
    };
  });
  const [profileSavedNotice, setProfileSavedNotice] = useState(false);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordNotice, setPasswordNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // SQL Copy State
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    loadMessages();
    runDbTest();
    loadGithubData();
  }, []);

  const loadGithubData = async (usernameOverride?: string, tokenOverride?: string) => {
    setIsLoadingGithub(true);
    setGithubError(null);
    const targetUser = usernameOverride ?? githubConfig.username;
    const targetToken = tokenOverride ?? githubConfig.token;

    try {
      const [profResult, repoResult] = await Promise.all([
        fetchGitHubProfile(targetUser, targetToken),
        fetchGitHubRepos(targetUser, targetToken),
      ]);

      if (profResult.profile) {
        setGithubProfile(profResult.profile);
      }
      setRateLimitRemaining(profResult.rateLimitRemaining ?? repoResult.rateLimitRemaining);

      if (repoResult.repos && repoResult.repos.length > 0) {
        setGithubRepos(repoResult.repos);
      } else {
        setGithubRepos(sampleGitHubRepos as GitHubRepo[]);
      }

      if (profResult.error || repoResult.error) {
        setGithubError(profResult.error || repoResult.error);
      }
    } catch (err: any) {
      setGithubError(err.message || "Failed to load GitHub data");
      setGithubRepos(sampleGitHubRepos as GitHubRepo[]);
    } finally {
      setIsLoadingGithub(false);
    }
  };

  const handleSaveGithubConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveGitHubConfig({
      username: githubUsernameInput.trim(),
      token: githubTokenInput.trim(),
      remoteUrl: githubRemoteInput.trim(),
    });
    setGithubConfigState(updated);
    setGithubNotice("GitHub settings saved! Testing connection...");
    await loadGithubData(updated.username, updated.token);
    setTimeout(() => setGithubNotice(null), 4000);
  };

  const handleCopyCommand = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedGitCmd(id);
    setTimeout(() => setCopiedGitCmd(null), 2500);
  };

  const loadMessages = async () => {
    setIsLoadingMessages(true);
    const result = await fetchAllMessages();
    setMessages(result.messages);
    setSupabaseStatus(result.supabaseStatus);
    setIsLoadingMessages(false);
  };

  const runDbTest = async () => {
    setIsTestingDb(true);
    const res = await testDatabaseConnection();
    setDbTestResult(res);
    setIsTestingDb(false);
  };

  const handleDeleteMsg = async (msg: StoredMessage) => {
    if (confirm(`Delete message from ${msg.name}?`)) {
      await deleteMessage(msg);
      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
      if (selectedMessage?.id === msg.id) setSelectedMessage(null);
    }
  };

  const handleStatusChange = async (
    msg: StoredMessage,
    newStatus: "new" | "read" | "replied" | "archived"
  ) => {
    await updateMessageStatus(msg, newStatus);
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, status: newStatus } : m))
    );
    if (selectedMessage?.id === msg.id) {
      setSelectedMessage({ ...selectedMessage, status: newStatus });
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("al_amin_custom_profile", JSON.stringify(editableProfile));
    setProfileSavedNotice(true);
    setTimeout(() => setProfileSavedNotice(false), 3000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordNotice(null);
    if (!newPassword || newPassword.length < 6) {
      setPasswordNotice({ type: "error", text: "New password must be at least 6 characters." });
      return;
    }
    const res = await changeAdminPassword(currentPassword, newPassword);
    if (res.success) {
      setPasswordNotice({ type: "success", text: "Password changed successfully." });
      setCurrentPassword("");
      setNewPassword("");
    } else {
      setPasswordNotice({ type: "error", text: res.error || "Failed to update password." });
    }
  };

  const copySqlSchema = () => {
    const sql = `-- Supabase SQL Schema for Al Amin Mahfuz Portfolio
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts"
ON public.contact_messages
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow select for authenticated and anon"
ON public.contact_messages
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Allow delete and update"
ON public.contact_messages
FOR ALL
TO authenticated, anon
USING (true);`;

    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  // Filtered Messages
  const filteredMessages = messages.filter((msg) => {
    const matchesFilter = messageFilter === "all" || msg.status === messageFilter;
    const matchesSearch =
      !searchQuery ||
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unreadCount = messages.filter((m) => m.status === "new").length;

  return (
    <div className="min-h-screen bg-[#07182D] text-[#F5F8FF] flex flex-col selection:bg-[#00B8FF]/25 selection:text-[#00B8FF]">
      {/* Top Header Bar */}
      <header className="bg-[#0C2340]/90 backdrop-blur-md border-b border-[#1687FF]/20 sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#00B8FF]/10 border border-[#00B8FF]/30 text-[#00B8FF] flex items-center justify-center font-bold">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-[#F5F8FF] leading-none">
              Admin Database Portal
            </h1>
            <p className="text-[11px] font-medium text-[#A9BDD5] mt-0.5">
              Al Amin Mahfuz · Faculty RSTU
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPortfolio}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#A9BDD5] hover:text-[#F5F8FF] bg-[#07182D] hover:bg-white/5 border border-[#1687FF]/25 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Public Website</span>
          </button>

          <button
            onClick={() => {
              logoutAdmin();
              onLogout();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 rounded-xl transition-colors cursor-pointer"
            title="Log out from admin session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 gap-6">
        {/* Sidebar Nav */}
        <nav
          aria-label="Admin Navigation"
          className="w-full md:w-60 flex-shrink-0 flex md:flex-col gap-1.5 overflow-x-auto pb-2 md:pb-0"
        >
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "overview"
                ? "bg-[#00B8FF] text-[#07182D] shadow-md shadow-[#00B8FF]/20"
                : "text-[#A9BDD5] hover:bg-[#0C2340] hover:text-[#F5F8FF]"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Activity className="w-4 h-4" />
              <span>Overview</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "messages"
                ? "bg-[#00B8FF] text-[#07182D] shadow-md shadow-[#00B8FF]/20"
                : "text-[#A9BDD5] hover:bg-[#0C2340] hover:text-[#F5F8FF]"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Mail className="w-4 h-4" />
              <span>Inquiries</span>
            </span>
            {unreadCount > 0 && (
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold tabular-nums ${
                  activeTab === "messages"
                    ? "bg-[#07182D] text-[#00B8FF]"
                    : "bg-[#00B8FF] text-[#07182D]"
                }`}
              >
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("database")}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "database"
                ? "bg-[#00B8FF] text-[#07182D] shadow-md shadow-[#00B8FF]/20"
                : "text-[#A9BDD5] hover:bg-[#0C2340] hover:text-[#F5F8FF]"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Database className="w-4 h-4" />
              <span>Supabase Console</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab("github")}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "github"
                ? "bg-[#00B8FF] text-[#07182D] shadow-md shadow-[#00B8FF]/20"
                : "text-[#A9BDD5] hover:bg-[#0C2340] hover:text-[#F5F8FF]"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Github className="w-4 h-4" />
              <span>GitHub & Git</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </button>

          <button
            onClick={() => setActiveTab("content")}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "content"
                ? "bg-[#00B8FF] text-[#07182D] shadow-md shadow-[#00B8FF]/20"
                : "text-[#A9BDD5] hover:bg-[#0C2340] hover:text-[#F5F8FF]"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <FolderGit2 className="w-4 h-4" />
              <span>Portfolio Content</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "settings"
                ? "bg-[#00B8FF] text-[#07182D] shadow-md shadow-[#00B8FF]/20"
                : "text-[#A9BDD5] hover:bg-[#0C2340] hover:text-[#F5F8FF]"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Shield className="w-4 h-4" />
              <span>Security</span>
            </span>
          </button>
        </nav>

        {/* Content Area */}
        <main className="flex-1 bg-[#0C2340]/60 border border-[#1687FF]/20 rounded-3xl p-5 sm:p-7 shadow-xl overflow-hidden">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#F5F8FF]">
                  Welcome back, {user.name}
                </h2>
                <p className="text-xs text-[#A9BDD5] mt-1">
                  Manage your Supabase database records, incoming student & project inquiries, and live portfolio settings.
                </p>
              </div>

              {/* KPI Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-[#07182D]/80 border border-[#1687FF]/20 rounded-2xl p-4">
                  <p className="text-xs text-[#A9BDD5] font-semibold uppercase tracking-wider">
                    Total Inquiries
                  </p>
                  <p className="text-3xl font-extrabold text-[#00B8FF] font-mono-code mt-1 tabular-nums">
                    {messages.length}
                  </p>
                  <p className="text-[11px] text-[#A9BDD5]/70 mt-1">
                    Captured from contact form
                  </p>
                </div>

                <div className="bg-[#07182D]/80 border border-[#1687FF]/20 rounded-2xl p-4">
                  <p className="text-xs text-[#A9BDD5] font-semibold uppercase tracking-wider">
                    Unread Messages
                  </p>
                  <p className="text-3xl font-extrabold text-[#F5F8FF] font-mono-code mt-1 tabular-nums">
                    {unreadCount}
                  </p>
                  <p className="text-[11px] text-[#A9BDD5]/70 mt-1">
                    Awaiting response
                  </p>
                </div>

                <div className="bg-[#07182D]/80 border border-[#1687FF]/20 rounded-2xl p-4">
                  <p className="text-xs text-[#A9BDD5] font-semibold uppercase tracking-wider">
                    Supabase Project
                  </p>
                  <p className="text-base font-bold text-emerald-400 font-mono-code mt-1 truncate">
                    {SUPABASE_PROJECT_ID}
                  </p>
                  <p className="text-[11px] text-[#A9BDD5]/70 mt-1">
                    Connected backend
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab("github")}
                  className="bg-[#07182D]/80 hover:bg-[#07182D] border border-[#1687FF]/20 hover:border-[#00B8FF]/50 rounded-2xl p-4 cursor-pointer transition-all group"
                >
                  <p className="text-xs text-[#A9BDD5] font-semibold uppercase tracking-wider flex items-center justify-between">
                    <span>GitHub Status</span>
                    <Github className="w-3.5 h-3.5 text-[#00B8FF] group-hover:scale-110 transition-transform" />
                  </p>
                  <p className="text-base font-bold text-[#00B8FF] font-mono-code mt-1 truncate">
                    @{githubConfig.username}
                  </p>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Sync Active · Manage →</span>
                  </p>
                </div>

                <div className="bg-[#07182D]/80 border border-[#1687FF]/20 rounded-2xl p-4">
                  <p className="text-xs text-[#A9BDD5] font-semibold uppercase tracking-wider">
                    Published Projects
                  </p>
                  <p className="text-3xl font-extrabold text-[#38BDF8] font-mono-code mt-1 tabular-nums">
                    {projects.length}
                  </p>
                  <p className="text-[11px] text-[#A9BDD5]/70 mt-1">
                    Systems in portfolio
                  </p>
                </div>
              </div>

              {/* Quick Actions & Recent Messages Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                {/* Recent Messages */}
                <div className="bg-[#07182D]/70 border border-[#1687FF]/20 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <h3 className="text-sm font-bold text-[#F5F8FF] flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#00B8FF]" />
                      <span>Recent Inquiries</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab("messages")}
                      className="text-xs text-[#00B8FF] hover:underline cursor-pointer"
                    >
                      View All
                    </button>
                  </div>

                  {messages.length === 0 ? (
                    <p className="text-xs text-[#A9BDD5]/70 py-4 text-center">
                      No contact messages recorded yet.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {messages.slice(0, 3).map((m) => (
                        <div
                          key={m.id}
                          onClick={() => {
                            setSelectedMessage(m);
                            setActiveTab("messages");
                          }}
                          className="p-3 bg-[#0C2340]/50 hover:bg-[#0C2340] border border-white/5 rounded-xl cursor-pointer transition-colors"
                        >
                          <div className="flex justify-between items-baseline mb-1">
                            <span className="text-xs font-bold text-[#F5F8FF]">
                              {m.name}
                            </span>
                            <span className="text-[10px] text-[#A9BDD5] font-mono-code">
                              {new Date(m.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xs text-[#00B8FF] truncate">{m.subject}</p>
                          <p className="text-[11px] text-[#A9BDD5]/70 truncate mt-0.5">
                            {m.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Database Connectivity Status */}
                <div className="bg-[#07182D]/70 border border-[#1687FF]/20 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <h3 className="text-sm font-bold text-[#F5F8FF] flex items-center gap-2">
                      <Database className="w-4 h-4 text-[#00B8FF]" />
                      <span>Supabase Database Health</span>
                    </h3>
                    <button
                      onClick={runDbTest}
                      disabled={isTestingDb}
                      className="text-xs text-[#00B8FF] hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className={`w-3 h-3 ${isTestingDb ? "animate-spin" : ""}`} />
                      <span>Test Probe</span>
                    </button>
                  </div>

                  <div className="space-y-2.5 text-xs text-[#A9BDD5]">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span>Project Identifier:</span>
                      <span className="font-mono-code text-white">{SUPABASE_PROJECT_ID}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span>Endpoint Host:</span>
                      <span className="font-mono-code text-white truncate max-w-[200px]">
                        {SUPABASE_URL}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span>Status Probe:</span>
                      <span className="font-semibold text-emerald-400">
                        {dbTestResult ? `${dbTestResult.message} (${dbTestResult.latencyMs}ms)` : "Testing..."}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setActiveTab("database")}
                      className="w-full py-2 bg-[#0C2340] hover:bg-[#1687FF]/20 border border-[#1687FF]/30 text-xs font-semibold text-[#00B8FF] hover:text-white rounded-xl transition-colors cursor-pointer"
                    >
                      Open Supabase Console & SQL Schema
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INQUIRIES & MESSAGES */}
          {activeTab === "messages" && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-[#F5F8FF]">
                    Contact Inquiries Inbox
                  </h2>
                  <p className="text-xs text-[#A9BDD5]">
                    Messages captured from your portfolio form and Supabase database.
                  </p>
                </div>

                <button
                  onClick={loadMessages}
                  disabled={isLoadingMessages}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#07182D] hover:bg-[#1687FF]/20 border border-[#1687FF]/25 rounded-xl text-xs font-semibold text-[#00B8FF] hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMessages ? "animate-spin" : ""}`} />
                  <span>Refresh Inbox</span>
                </button>
              </div>

              {/* Filter and Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search messages by sender, email, subject, keyword..."
                    className="w-full pl-9 pr-4 py-2 bg-[#07182D] border border-[#1687FF]/20 rounded-xl text-xs text-[#F5F8FF] focus:outline-none focus:border-[#00B8FF] transition-colors"
                  />
                  <Search className="w-4 h-4 text-[#A9BDD5] absolute left-3 top-2.5" />
                </div>

                <div className="flex gap-1.5 bg-[#07182D] p-1 rounded-xl border border-[#1687FF]/20 overflow-x-auto">
                  {(["all", "new", "read", "replied", "archived"] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setMessageFilter(filter)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors cursor-pointer whitespace-nowrap ${
                        messageFilter === filter
                          ? "bg-[#00B8FF] text-[#07182D] font-bold"
                          : "text-[#A9BDD5] hover:text-white"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages Table & Detail Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* List Column */}
                <div className="lg:col-span-6 space-y-2 max-h-[550px] overflow-y-auto pr-1">
                  {filteredMessages.length === 0 ? (
                    <div className="p-8 text-center bg-[#07182D]/50 rounded-2xl border border-white/5 text-xs text-[#A9BDD5]">
                      No inquiries match the current filter or search criteria.
                    </div>
                  ) : (
                    filteredMessages.map((msg) => {
                      const isSelected = selectedMessage?.id === msg.id;
                      return (
                        <div
                          key={msg.id}
                          onClick={() => {
                            setSelectedMessage(msg);
                            if (msg.status === "new") handleStatusChange(msg, "read");
                          }}
                          className={`p-4 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#0C2340] border-[#00B8FF] shadow-lg shadow-[#00B8FF]/10"
                              : "bg-[#07182D]/70 hover:bg-[#07182D] border-[#1687FF]/15"
                          }`}
                        >
                          <div className="flex items-baseline justify-between mb-1">
                            <h4 className="text-sm font-bold text-[#F5F8FF] truncate">
                              {msg.name}
                            </h4>
                            <span className="text-[10px] text-[#A9BDD5] font-mono-code tabular-nums">
                              {new Date(msg.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xs text-[#00B8FF] font-medium truncate">
                            {msg.subject}
                          </p>
                          <p className="text-xs text-[#A9BDD5]/70 line-clamp-2 mt-1">
                            {msg.message}
                          </p>

                          <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-white/5 text-[10px]">
                            <span className="font-mono-code text-[#A9BDD5]">{msg.email}</span>
                            <span
                              className={`px-2 py-0.5 rounded-md font-semibold uppercase ${
                                msg.status === "new"
                                  ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                                  : msg.status === "replied"
                                  ? "bg-blue-950 text-blue-400 border border-blue-500/30"
                                  : "bg-slate-800 text-slate-300"
                              }`}
                            >
                              {msg.status}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Detail View Column */}
                <div className="lg:col-span-6 bg-[#07182D]/90 border border-[#1687FF]/25 rounded-2xl p-5 flex flex-col justify-between">
                  {selectedMessage ? (
                    <div className="space-y-4">
                      <div className="flex items-start justify-between pb-3 border-b border-white/10">
                        <div>
                          <h3 className="text-lg font-bold text-[#F5F8FF]">
                            {selectedMessage.subject}
                          </h3>
                          <p className="text-xs text-[#00B8FF] mt-0.5">
                            From: {selectedMessage.name} &lt;{selectedMessage.email}&gt;
                          </p>
                          <p className="text-[10px] text-[#A9BDD5] font-mono-code mt-0.5">
                            Received: {new Date(selectedMessage.created_at).toLocaleString()} · Source: {selectedMessage.source}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDeleteMsg(selectedMessage)}
                            className="p-1.5 text-rose-400 hover:text-white bg-rose-950/40 hover:bg-rose-900 rounded-lg transition-colors cursor-pointer"
                            title="Delete this message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Message Content Body */}
                      <div className="bg-[#0C2340]/60 p-4 rounded-xl border border-white/5 text-xs sm:text-sm text-[#F5F8FF] leading-relaxed whitespace-pre-wrap max-h-[250px] overflow-y-auto">
                        {selectedMessage.message}
                      </div>

                      {/* Status Update Dropdown/Buttons */}
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <span className="text-xs text-[#A9BDD5] font-semibold">
                          Mark Status:
                        </span>
                        {(["new", "read", "replied", "archived"] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() => handleStatusChange(selectedMessage, st)}
                            className={`px-2.5 py-1 text-xs rounded-lg font-medium capitalize transition-colors cursor-pointer ${
                              selectedMessage.status === st
                                ? "bg-[#00B8FF] text-[#07182D] font-bold"
                                : "bg-[#0C2340] text-[#A9BDD5] hover:text-white border border-white/10"
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>

                      {/* Action to Reply */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <a
                          href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                            selectedMessage.subject
                          )}&body=${encodeURIComponent(
                            `Dear ${selectedMessage.name},\n\nThank you for reaching out through my portfolio website.\n\nBest regards,\nAl Amin Mahfuz\nAssistant Professor, Department of CSE, RSTU`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => handleStatusChange(selectedMessage, "replied")}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#00B8FF] hover:bg-[#1687FF] text-[#07182D] hover:text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Reply via Email Client</span>
                        </a>

                        <span className="text-[11px] text-[#A9BDD5]/60 font-mono-code">
                          ID: {selectedMessage.id.substring(0, 12)}...
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 text-xs text-[#A9BDD5]">
                      <Mail className="w-10 h-10 text-[#00B8FF]/40 mb-3" />
                      <p className="font-semibold text-white">No message selected</p>
                      <p className="text-[11px] text-[#A9BDD5]/60 mt-1">
                        Select a message from the left to read full content, mark status, or reply.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SUPABASE DATABASE CONSOLE */}
          {activeTab === "database" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-bold text-[#F5F8FF]">
                    Supabase Database Engine
                  </h2>
                  <p className="text-xs text-[#A9BDD5]">
                    Direct connection to project <code className="text-[#00B8FF]">{SUPABASE_PROJECT_ID}</code>.
                  </p>
                </div>

                <a
                  href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0C2340] hover:bg-[#1687FF]/20 border border-[#1687FF]/30 rounded-xl text-xs font-semibold text-[#00B8FF] hover:text-white transition-colors cursor-pointer"
                >
                  <span>Open Supabase Cloud Dashboard</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Credentials & Connection Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#07182D]/80 border border-[#1687FF]/20 rounded-2xl p-4">
                  <span className="text-xs text-[#A9BDD5] font-semibold uppercase">Project ID</span>
                  <p className="text-sm font-bold text-[#F5F8FF] font-mono-code mt-1">
                    {SUPABASE_PROJECT_ID}
                  </p>
                </div>

                <div className="bg-[#07182D]/80 border border-[#1687FF]/20 rounded-2xl p-4">
                  <span className="text-xs text-[#A9BDD5] font-semibold uppercase">API Endpoint</span>
                  <p className="text-xs font-bold text-[#00B8FF] font-mono-code mt-1 truncate">
                    {SUPABASE_URL}
                  </p>
                </div>

                <div className="bg-[#07182D]/80 border border-[#1687FF]/20 rounded-2xl p-4">
                  <span className="text-xs text-[#A9BDD5] font-semibold uppercase">Active Status</span>
                  <p className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Client Configured</span>
                  </p>
                </div>
              </div>

              {/* Database Schema SQL Setup Box */}
              <div className="bg-[#07182D]/90 border border-[#1687FF]/25 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#F5F8FF] flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#00B8FF]" />
                      <span>SQL Schema for Table: contact_messages</span>
                    </h3>
                    <p className="text-[11px] text-[#A9BDD5] mt-0.5">
                      Copy and run this in your Supabase SQL Editor to ensure table schemas and RLS permissions are active.
                    </p>
                  </div>

                  <button
                    onClick={copySqlSchema}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0C2340] hover:bg-[#00B8FF] text-xs font-semibold text-[#00B8FF] hover:text-[#07182D] border border-[#00B8FF]/30 rounded-xl transition-all cursor-pointer"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? "Copied SQL!" : "Copy SQL Script"}</span>
                  </button>
                </div>

                <pre className="p-4 bg-[#051121] rounded-xl text-xs font-mono-code text-[#A9BDD5] overflow-x-auto border border-white/5 leading-relaxed">
{`CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public submissions" ON public.contact_messages FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow read" ON public.contact_messages FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow management" ON public.contact_messages FOR ALL TO anon, authenticated USING (true);`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB: GITHUB INTEGRATION & REPOSITORIES */}
          {activeTab === "github" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-bold text-[#F5F8FF] flex items-center gap-2">
                    <Github className="w-5 h-5 text-[#00B8FF]" />
                    <span>GitHub Integration & Repository Sync</span>
                  </h2>
                  <p className="text-xs text-[#A9BDD5] mt-1">
                    Connect your GitHub account (@{githubConfig.username}), synchronize public repositories to your live portfolio, and connect this codebase to your GitHub remote.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs font-semibold text-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>API Connected</span>
                  </div>
                  {rateLimitRemaining !== null && (
                    <span className="text-[11px] font-mono-code text-[#A9BDD5] bg-[#07182D] px-2.5 py-1.5 rounded-lg border border-white/5" title="GitHub API Rate Limit remaining">
                      Limit: {rateLimitRemaining}/hr
                    </span>
                  )}
                </div>
              </div>

              {/* Notification Banner */}
              {githubNotice && (
                <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-xs font-semibold text-emerald-300 flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{githubNotice}</span>
                </div>
              )}

              {githubError && (
                <div className="p-3.5 rounded-xl bg-amber-950/70 border border-amber-500/40 text-xs text-amber-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{githubError}</span>
                </div>
              )}

              {/* 1. Account & Remote Configuration Card */}
              <div className="bg-[#07182D]/80 border border-[#1687FF]/20 rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <h3 className="text-sm font-bold text-[#F5F8FF] flex items-center gap-2">
                    <User className="w-4 h-4 text-[#00B8FF]" />
                    <span>GitHub Account & API Configuration</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => loadGithubData()}
                    disabled={isLoadingGithub}
                    className="text-xs text-[#00B8FF] hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${isLoadingGithub ? "animate-spin" : ""}`} />
                    <span>Sync Live Data</span>
                  </button>
                </div>

                <form onSubmit={handleSaveGithubConfig} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#A9BDD5] mb-1.5">
                      GitHub Username / Organization Handle
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs text-[#A9BDD5]">github.com/</span>
                      <input
                        type="text"
                        value={githubUsernameInput}
                        onChange={(e) => setGithubUsernameInput(e.target.value)}
                        placeholder="alaminmahfuz"
                        required
                        className="w-full bg-[#0C2340] border border-[#1687FF]/30 rounded-xl pl-24 pr-4 py-2 text-xs text-[#F5F8FF] focus:border-[#00B8FF] focus:outline-none"
                      />
                    </div>
                    <p className="text-[11px] text-[#A9BDD5]/70 mt-1">
                      Repos and public profile will be fetched automatically from this account.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#A9BDD5] mb-1.5">
                      Personal Access Token (PAT) <span className="text-[#A9BDD5]/60">(Optional)</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showToken ? "text" : "password"}
                        value={githubTokenInput}
                        onChange={(e) => setGithubTokenInput(e.target.value)}
                        placeholder="ghp_xxxxxxxxxxxx (Optional for 5,000 req/hr)"
                        className="w-full bg-[#0C2340] border border-[#1687FF]/30 rounded-xl pl-3 pr-10 py-2 text-xs text-[#F5F8FF] focus:border-[#00B8FF] focus:outline-none font-mono-code"
                      />
                      <button
                        type="button"
                        onClick={() => setShowToken(!showToken)}
                        className="absolute right-3 top-2.5 text-[#A9BDD5] hover:text-white"
                        title={showToken ? "Hide token" : "Show token"}
                      >
                        {showToken ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-[11px] text-[#A9BDD5]/70 mt-1">
                      Stored locally in browser. Raises unauthenticated limit from 60 to 5,000 requests/hr.
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-[#A9BDD5] mb-1.5">
                      Target GitHub Repository Clone / Remote URL
                    </label>
                    <input
                      type="url"
                      value={githubRemoteInput}
                      onChange={(e) => setGithubRemoteInput(e.target.value)}
                      placeholder="https://github.com/alaminmahfuz/alamin-mahfuz-portfolio.git"
                      className="w-full bg-[#0C2340] border border-[#1687FF]/30 rounded-xl px-3 py-2 text-xs text-[#F5F8FF] focus:border-[#00B8FF] focus:outline-none font-mono-code"
                    />
                    <p className="text-[11px] text-[#A9BDD5]/70 mt-1">
                      Used to generate your exact Git push commands below.
                    </p>
                  </div>

                  <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isLoadingGithub}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#07182D] bg-[#00B8FF] hover:bg-[#1687FF] hover:text-white rounded-xl transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isLoadingGithub ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Save className="w-3.5 h-3.5" />
                      )}
                      <span>Save & Test GitHub Connection</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* 2. Live GitHub Profile Card */}
              {githubProfile && (
                <div className="bg-[#07182D]/80 border border-[#1687FF]/20 rounded-2xl p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-4">
                      <img
                        src={githubProfile.avatar_url}
                        alt={githubProfile.name || githubProfile.login}
                        className="w-14 h-14 rounded-2xl border-2 border-[#00B8FF] object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-[#F5F8FF]">
                            {githubProfile.name || githubProfile.login}
                          </h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[#00B8FF]/10 text-[#00B8FF] font-mono-code border border-[#00B8FF]/30">
                            @{githubProfile.login}
                          </span>
                        </div>
                        <p className="text-xs text-[#A9BDD5] mt-0.5 max-w-lg leading-relaxed">
                          {githubProfile.bio || "Computer Science Faculty & Full-Stack Software Engineer."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={githubProfile.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#07182D] bg-[#00B8FF] hover:bg-[#1687FF] hover:text-white rounded-xl transition-colors"
                      >
                        <span>Open on GitHub</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Profile Metadata Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
                    <div className="bg-[#0C2340]/60 p-3 rounded-xl border border-white/5">
                      <span className="text-[#A9BDD5] block">Public Repositories</span>
                      <span className="text-lg font-bold text-[#F5F8FF] font-mono-code">
                        {githubProfile.public_repos}
                      </span>
                    </div>
                    <div className="bg-[#0C2340]/60 p-3 rounded-xl border border-white/5">
                      <span className="text-[#A9BDD5] block">Followers</span>
                      <span className="text-lg font-bold text-[#00B8FF] font-mono-code">
                        {githubProfile.followers}
                      </span>
                    </div>
                    <div className="bg-[#0C2340]/60 p-3 rounded-xl border border-white/5">
                      <span className="text-[#A9BDD5] block">Following</span>
                      <span className="text-lg font-bold text-[#F5F8FF] font-mono-code">
                        {githubProfile.following}
                      </span>
                    </div>
                    <div className="bg-[#0C2340]/60 p-3 rounded-xl border border-white/5">
                      <span className="text-[#A9BDD5] block">Member Since</span>
                      <span className="text-sm font-semibold text-[#A9BDD5] font-mono-code">
                        {new Date(githubProfile.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Git Command Center: Connect & Push Code to GitHub */}
              <div className="bg-[#07182D]/80 border border-[#1687FF]/20 rounded-2xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                  <div>
                    <h3 className="text-sm font-bold text-[#F5F8FF] flex items-center gap-2">
                      <GitBranch className="w-4 h-4 text-[#00B8FF]" />
                      <span>Git Remote & Codebase Connection</span>
                    </h3>
                    <p className="text-xs text-[#A9BDD5] mt-0.5">
                      The local repository is already initialized with git on branch <code className="text-[#00B8FF] font-mono-code">main</code> and committed. Run these commands to push directly to your GitHub repository.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-mono-code px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      Branch: main
                    </span>
                  </div>
                </div>

                {/* Interactive Terminal Snippet */}
                <div className="space-y-3">
                  <div className="relative bg-[#051121] border border-[#1687FF]/30 rounded-xl p-4 font-mono-code text-xs text-[#F5F8FF] overflow-x-auto">
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-[11px] text-[#A9BDD5]">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-[#00B8FF]" />
                        <span>Bash / Terminal Push Commands</span>
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          handleCopyCommand(
                            `git remote add origin ${githubRemoteInput.trim()}\ngit branch -M main\ngit push -u origin main`,
                            "all-git-cmd"
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0C2340] hover:bg-[#1687FF]/20 border border-[#1687FF]/30 rounded-lg text-xs font-sans text-[#00B8FF] hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedGitCmd === "all-git-cmd" ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied All!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy All Commands</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="space-y-2 leading-relaxed">
                      <div className="flex items-center justify-between group">
                        <span><span className="text-[#A9BDD5]/60"># 1. Add your GitHub repository as remote origin</span></span>
                      </div>
                      <div className="flex items-center justify-between group bg-white/[0.02] p-1.5 rounded">
                        <span className="text-[#00B8FF]">git remote add origin <span className="text-emerald-300">{githubRemoteInput.trim()}</span></span>
                        <button
                          type="button"
                          onClick={() => handleCopyCommand(`git remote add origin ${githubRemoteInput.trim()}`, "cmd1")}
                          className="opacity-0 group-hover:opacity-100 p-1 text-[#A9BDD5] hover:text-white"
                          title="Copy command"
                        >
                          {copiedGitCmd === "cmd1" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>

                      <div className="flex items-center justify-between group mt-2">
                        <span><span className="text-[#A9BDD5]/60"># 2. Set default branch to main</span></span>
                      </div>
                      <div className="flex items-center justify-between group bg-white/[0.02] p-1.5 rounded">
                        <span className="text-[#00B8FF]">git branch -M main</span>
                        <button
                          type="button"
                          onClick={() => handleCopyCommand(`git branch -M main`, "cmd2")}
                          className="opacity-0 group-hover:opacity-100 p-1 text-[#A9BDD5] hover:text-white"
                          title="Copy command"
                        >
                          {copiedGitCmd === "cmd2" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>

                      <div className="flex items-center justify-between group mt-2">
                        <span><span className="text-[#A9BDD5]/60"># 3. Push all commits & branches to GitHub</span></span>
                      </div>
                      <div className="flex items-center justify-between group bg-white/[0.02] p-1.5 rounded">
                        <span className="text-[#00B8FF]">git push -u origin main</span>
                        <button
                          type="button"
                          onClick={() => handleCopyCommand(`git push -u origin main`, "cmd3")}
                          className="opacity-0 group-hover:opacity-100 p-1 text-[#A9BDD5] hover:text-white"
                          title="Copy command"
                        >
                          {copiedGitCmd === "cmd3" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Pro Tip */}
                  <div className="p-3.5 rounded-xl bg-[#0C2340]/60 border border-white/5 text-xs text-[#A9BDD5] flex items-start gap-2.5">
                    <span className="text-[#00B8FF] font-bold">Pro-tip for GitHub CLI:</span>
                    <span>
                      If you use the GitHub CLI, you can simply run: <code className="text-[#00B8FF] font-mono-code bg-[#07182D] px-2 py-0.5 rounded border border-[#1687FF]/20">gh repo create alamin-mahfuz-portfolio --public --source=. --push</code> to create and push in a single step!
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. Live Repositories Explorer */}
              <div className="bg-[#07182D]/80 border border-[#1687FF]/20 rounded-2xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                  <div>
                    <h3 className="text-sm font-bold text-[#F5F8FF] flex items-center gap-2">
                      <Code className="w-4 h-4 text-[#00B8FF]" />
                      <span>Live Public Repositories ({githubRepos.length})</span>
                    </h3>
                    <p className="text-xs text-[#A9BDD5]">
                      Public code repositories loaded from GitHub. These also power the Live GitHub Repos tab in the portfolio Projects section.
                    </p>
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-[#A9BDD5] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={repoSearch}
                      onChange={(e) => setRepoSearch(e.target.value)}
                      placeholder="Filter repositories..."
                      className="w-full bg-[#0C2340] border border-[#1687FF]/30 rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#F5F8FF] focus:border-[#00B8FF] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {githubRepos
                    .filter((r) =>
                      !repoSearch ||
                      r.name.toLowerCase().includes(repoSearch.toLowerCase()) ||
                      (r.description && r.description.toLowerCase().includes(repoSearch.toLowerCase())) ||
                      (r.language && r.language.toLowerCase().includes(repoSearch.toLowerCase()))
                    )
                    .map((repo, idx) => (
                      <div
                        key={repo.id || idx}
                        className="bg-[#0C2340]/60 hover:bg-[#0C2340] border border-[#1687FF]/20 hover:border-[#00B8FF]/40 rounded-xl p-4 transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-bold text-[#F5F8FF] group-hover:text-[#00B8FF] transition-colors flex items-center gap-1.5 break-all"
                            >
                              <span>{repo.name}</span>
                            </a>
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#A9BDD5] hover:text-[#00B8FF] p-1"
                              title="Open on GitHub"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>

                          <p className="text-xs text-[#A9BDD5] line-clamp-2 mb-3">
                            {repo.description || "Open source project & academic computer science repository."}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-[#A9BDD5]">
                          <div className="flex items-center gap-3">
                            {repo.language && (
                              <span className="flex items-center gap-1 font-medium text-[#F5F8FF]">
                                <span className="w-2 h-2 rounded-full bg-[#00B8FF]" />
                                <span>{repo.language}</span>
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-amber-400" />
                              <span>{repo.stargazers_count ?? 0}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <GitFork className="w-3 h-3" />
                              <span>{repo.forks_count ?? 0}</span>
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleCopyCommand(`git clone ${repo.html_url}.git`, `clone-${repo.name}`)}
                            className="text-[11px] text-[#00B8FF] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            {copiedGitCmd === `clone-${repo.name}` ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <span>Copy Clone URL</span>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PORTFOLIO CONTENT EDITOR */}
          {activeTab === "content" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-bold text-[#F5F8FF]">
                    Portfolio Content Customizer
                  </h2>
                  <p className="text-xs text-[#A9BDD5]">
                    Modify bio statements, headlines, and contact details directly without editing source code.
                  </p>
                </div>

                {profileSavedNotice && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-xs font-semibold text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Saved to Live Portfolio!</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#A9BDD5] uppercase tracking-wider mb-1.5">
                      Professional Title
                    </label>
                    <input
                      type="text"
                      value={editableProfile.title}
                      onChange={(e) =>
                        setEditableProfile({ ...editableProfile, title: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-[#07182D] border border-[#1687FF]/20 rounded-xl text-xs sm:text-sm text-[#F5F8FF] focus:outline-none focus:border-[#00B8FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A9BDD5] uppercase tracking-wider mb-1.5">
                      Department
                    </label>
                    <input
                      type="text"
                      value={editableProfile.department}
                      onChange={(e) =>
                        setEditableProfile({ ...editableProfile, department: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-[#07182D] border border-[#1687FF]/20 rounded-xl text-xs sm:text-sm text-[#F5F8FF] focus:outline-none focus:border-[#00B8FF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#A9BDD5] uppercase tracking-wider mb-1.5">
                      Headline Slogan
                    </label>
                    <input
                      type="text"
                      value={editableProfile.headlineQuote}
                      onChange={(e) =>
                        setEditableProfile({ ...editableProfile, headlineQuote: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-[#07182D] border border-[#1687FF]/20 rounded-xl text-xs sm:text-sm text-[#F5F8FF] focus:outline-none focus:border-[#00B8FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A9BDD5] uppercase tracking-wider mb-1.5">
                      Primary Phone
                    </label>
                    <input
                      type="text"
                      value={editableProfile.phonePrimary}
                      onChange={(e) =>
                        setEditableProfile({ ...editableProfile, phonePrimary: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-[#07182D] border border-[#1687FF]/20 rounded-xl text-xs sm:text-sm text-[#F5F8FF] focus:outline-none focus:border-[#00B8FF] font-mono-code"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A9BDD5] uppercase tracking-wider mb-1.5">
                      Secondary Phone
                    </label>
                    <input
                      type="text"
                      value={editableProfile.phoneSecondary}
                      onChange={(e) =>
                        setEditableProfile({ ...editableProfile, phoneSecondary: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-[#07182D] border border-[#1687FF]/20 rounded-xl text-xs sm:text-sm text-[#F5F8FF] focus:outline-none focus:border-[#00B8FF] font-mono-code"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A9BDD5] uppercase tracking-wider mb-1.5">
                    Campus / Present Address
                  </label>
                  <input
                    type="text"
                    value={editableProfile.addressPresent}
                    onChange={(e) =>
                      setEditableProfile({ ...editableProfile, addressPresent: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-[#07182D] border border-[#1687FF]/20 rounded-xl text-xs sm:text-sm text-[#F5F8FF] focus:outline-none focus:border-[#00B8FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A9BDD5] uppercase tracking-wider mb-1.5">
                    Hero Summary Description
                  </label>
                  <textarea
                    rows={3}
                    value={editableProfile.summary}
                    onChange={(e) =>
                      setEditableProfile({ ...editableProfile, summary: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-[#07182D] border border-[#1687FF]/20 rounded-xl text-xs sm:text-sm text-[#F5F8FF] focus:outline-none focus:border-[#00B8FF] resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#00B8FF] hover:bg-[#1687FF] text-[#07182D] hover:text-white font-bold rounded-xl text-xs sm:text-sm transition-all glow-cyan-sm cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes to Website</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 5: SECURITY & CREDENTIALS */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-white/10">
                <h2 className="text-xl font-bold text-[#F5F8FF]">
                  Security & Access Controls
                </h2>
                <p className="text-xs text-[#A9BDD5]">
                  Manage master administrator credentials and authentication tokens.
                </p>
              </div>

              {passwordNotice && (
                <div
                  className={`p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${
                    passwordNotice.type === "success"
                      ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                      : "bg-rose-950/80 border-rose-500/40 text-rose-300"
                  }`}
                >
                  {passwordNotice.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  <span>{passwordNotice.text}</span>
                </div>
              )}

              {/* Password Change Form */}
              <div className="bg-[#07182D]/80 border border-[#1687FF]/20 rounded-2xl p-5 space-y-4 max-w-lg">
                <h3 className="text-sm font-bold text-[#F5F8FF] flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#00B8FF]" />
                  <span>Update Master Password</span>
                </h3>

                <form onSubmit={handleChangePassword} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#A9BDD5] uppercase tracking-wider mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-[#0C2340] border border-[#1687FF]/25 rounded-xl text-xs sm:text-sm text-[#F5F8FF] focus:outline-none focus:border-[#00B8FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A9BDD5] uppercase tracking-wider mb-1">
                      New Password (min 6 characters)
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-[#0C2340] border border-[#1687FF]/25 rounded-xl text-xs sm:text-sm text-[#F5F8FF] focus:outline-none focus:border-[#00B8FF]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#00B8FF] hover:bg-[#1687FF] text-[#07182D] hover:text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Change Password
                  </button>
                </form>
              </div>

              {/* Profile Details Snapshot */}
              <div className="bg-[#07182D]/80 border border-[#1687FF]/20 rounded-2xl p-5 space-y-2 text-xs text-[#A9BDD5] max-w-lg">
                <h4 className="font-bold text-white text-sm mb-2">Administrator Profile</h4>
                <p>Username: <strong className="text-white font-mono-code">{user.username}</strong></p>
                <p>Email: <strong className="text-white">{user.email}</strong></p>
                <p>Status: <strong className="text-emerald-400">Master Administrator</strong></p>
                <p className="text-[11px] text-[#A9BDD5]/60 pt-2 border-t border-white/5">
                  The initial profile setup is locked. Only login credentials can access this panel.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

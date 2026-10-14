/**
 * GitHub API & Integration Helper
 * Provides real-time synchronization with GitHub user profiles, repositories,
 * rate limit tracking, and Git CLI configuration helpers.
 */

export interface GitHubUserProfile {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  topics: string[];
  default_branch: string;
}

export interface GitHubConfig {
  username: string;
  token?: string;
  remoteUrl?: string;
}

const GITHUB_CONFIG_KEY = "al_amin_github_config";
const GITHUB_CACHE_PROFILE_KEY = "al_amin_github_cache_profile";
const GITHUB_CACHE_REPOS_KEY = "al_amin_github_cache_repos";

export const DEFAULT_GITHUB_CONFIG: GitHubConfig = {
  username: "alaminmahfuz",
  remoteUrl: "https://github.com/alaminmahfuz/alamin-mahfuz-portfolio.git",
};

export function getGitHubConfig(): GitHubConfig {
  if (typeof window === "undefined") return DEFAULT_GITHUB_CONFIG;
  try {
    const saved = localStorage.getItem(GITHUB_CONFIG_KEY);
    if (saved) {
      return { ...DEFAULT_GITHUB_CONFIG, ...JSON.parse(saved) };
    }
  } catch {
    // fallback
  }
  return DEFAULT_GITHUB_CONFIG;
}

export function saveGitHubConfig(config: Partial<GitHubConfig>): GitHubConfig {
  const current = getGitHubConfig();
  const updated = { ...current, ...config };
  if (typeof window !== "undefined") {
    localStorage.setItem(GITHUB_CONFIG_KEY, JSON.stringify(updated));
  }
  return updated;
}

function getHeaders(token?: string): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };
  if (token && token.trim()) {
    headers["Authorization"] = `Bearer ${token.trim()}`;
  }
  return headers;
}

export async function fetchGitHubProfile(
  username?: string,
  token?: string
): Promise<{ profile: GitHubUserProfile | null; rateLimitRemaining: number | null; error: string | null }> {
  const user = username || getGitHubConfig().username;
  const authToken = token || getGitHubConfig().token;

  if (!user || !user.trim()) {
    return { profile: null, rateLimitRemaining: null, error: "GitHub username is required" };
  }

  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(user.trim())}`, {
      headers: getHeaders(authToken),
    });

    const rateLimitRemaining = res.headers.get("x-ratelimit-remaining")
      ? parseInt(res.headers.get("x-ratelimit-remaining") || "0", 10)
      : null;

    if (!res.ok) {
      if (res.status === 404) {
        return { profile: null, rateLimitRemaining, error: `GitHub user "${user}" not found.` };
      }
      if (res.status === 403) {
        return {
          profile: null,
          rateLimitRemaining,
          error: "GitHub API rate limit exceeded. Add a Personal Access Token in settings for 5,000 requests/hr.",
        };
      }
      return { profile: null, rateLimitRemaining, error: `GitHub API error: ${res.statusText}` };
    }

    const data: GitHubUserProfile = await res.json();
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(GITHUB_CACHE_PROFILE_KEY, JSON.stringify(data));
      } catch {}
    }
    return { profile: data, rateLimitRemaining, error: null };
  } catch (err: any) {
    // Try cached profile if offline
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(GITHUB_CACHE_PROFILE_KEY);
      if (cached) {
        try {
          return { profile: JSON.parse(cached), rateLimitRemaining: null, error: "Loaded from offline cache: " + err.message };
        } catch {}
      }
    }
    return { profile: null, rateLimitRemaining: null, error: err.message || "Failed to connect to GitHub" };
  }
}

export async function fetchGitHubRepos(
  username?: string,
  token?: string
): Promise<{ repos: GitHubRepo[]; rateLimitRemaining: number | null; error: string | null }> {
  const user = username || getGitHubConfig().username;
  const authToken = token || getGitHubConfig().token;

  if (!user || !user.trim()) {
    return { repos: [], rateLimitRemaining: null, error: "GitHub username is required" };
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(user.trim())}/repos?sort=updated&per_page=30`,
      {
        headers: getHeaders(authToken),
      }
    );

    const rateLimitRemaining = res.headers.get("x-ratelimit-remaining")
      ? parseInt(res.headers.get("x-ratelimit-remaining") || "0", 10)
      : null;

    if (!res.ok) {
      if (res.status === 403) {
        return {
          repos: [],
          rateLimitRemaining,
          error: "GitHub API rate limit exceeded. Add a GitHub Token to lift rate limits.",
        };
      }
      return { repos: [], rateLimitRemaining, error: `Failed to fetch repos: ${res.statusText}` };
    }

    const data: GitHubRepo[] = await res.json();
    // Filter out forks if desired, or sort by stars
    const sorted = Array.isArray(data) ? data : [];
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(GITHUB_CACHE_REPOS_KEY, JSON.stringify(sorted));
      } catch {}
    }
    return { repos: sorted, rateLimitRemaining, error: null };
  } catch (err: any) {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(GITHUB_CACHE_REPOS_KEY);
      if (cached) {
        try {
          return { repos: JSON.parse(cached), rateLimitRemaining: null, error: "Loaded from offline cache" };
        } catch {}
      }
    }
    return { repos: [], rateLimitRemaining: null, error: err.message || "Failed to fetch GitHub repositories" };
  }
}

// Fallback sample repositories for demonstration when rate limited or new profile
export const sampleGitHubRepos: Partial<GitHubRepo>[] = [
  {
    id: 101,
    name: "django-restaurant-pos",
    full_name: "alaminmahfuz/django-restaurant-pos",
    description: "Enterprise restaurant POS & reservation management web system built with Python Django & PostgreSQL.",
    html_url: "https://github.com/alaminmahfuz/django-restaurant-pos",
    language: "Python",
    stargazers_count: 14,
    forks_count: 5,
    updated_at: "2024-11-12T10:00:00Z",
    topics: ["django", "python", "pos", "postgresql", "rest-api"],
  },
  {
    id: 102,
    name: "scapy-enterprise-cyberdefense",
    full_name: "alaminmahfuz/scapy-enterprise-cyberdefense",
    description: "Research implementation of real-time packet inspection and intrusion defense using Scapy & Kali Linux.",
    html_url: "https://github.com/alaminmahfuz/scapy-enterprise-cyberdefense",
    language: "Python",
    stargazers_count: 22,
    forks_count: 8,
    updated_at: "2024-10-05T14:30:00Z",
    topics: ["cybersecurity", "scapy", "packet-inspection", "kali-linux", "network-defense"],
  },
  {
    id: 103,
    name: "pid-line-follower-robotics",
    full_name: "alaminmahfuz/pid-line-follower-robotics",
    description: "High-precision autonomous line-following vehicle firmware with multi-channel IR sensors & PID loop.",
    html_url: "https://github.com/alaminmahfuz/pid-line-follower-robotics",
    language: "C++",
    stargazers_count: 18,
    forks_count: 4,
    updated_at: "2024-09-18T08:15:00Z",
    topics: ["arduino", "cpp", "robotics", "pid-control", "embedded"],
  },
  {
    id: 104,
    name: "iot-smart-home-controller",
    full_name: "alaminmahfuz/iot-smart-home-controller",
    description: "Distributed smart home monitoring gateway connecting telemetry nodes via MQTT and web dashboard.",
    html_url: "https://github.com/alaminmahfuz/iot-smart-home-controller",
    language: "JavaScript",
    stargazers_count: 11,
    forks_count: 3,
    updated_at: "2024-08-22T16:45:00Z",
    topics: ["iot", "nodejs", "mqtt", "react", "automation"],
  },
];

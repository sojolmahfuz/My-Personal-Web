// Admin Authentication and Persistence Helper

export interface AdminUser {
  name: string;
  email: string;
  username: string;
  createdAt: string;
}

export interface AdminAuthState {
  isSetupComplete: boolean;
  isAuthenticated: boolean;
  user: AdminUser | null;
}

const STORAGE_KEY_CREDS = "al_amin_admin_profile";
const STORAGE_KEY_SESSION = "al_amin_admin_session";

// Simple reliable hashing for browser-level admin credential protection
async function hashPassword(password: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(password + "_alamin_secure_salt_2026");
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function isProfileSetup(): Promise<boolean> {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CREDS);
    return Boolean(data);
  } catch {
    return false;
  }
}

export async function setupInitialAdmin(
  name: string,
  email: string,
  username: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Only allow setting up if not already configured
    if (await isProfileSetup()) {
      return { success: false, error: "Admin profile is already configured. Please log in." };
    }

    const hashedPassword = await hashPassword(password);
    const profile = {
      name: name || "Al Amin Mahfuz",
      email: email || "sojol.cub@gmail.com",
      username: username.toLowerCase().trim(),
      passwordHash: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY_CREDS, JSON.stringify(profile));
    // Automatically log in upon initial setup
    localStorage.setItem(
      STORAGE_KEY_SESSION,
      JSON.stringify({
        token: Math.random().toString(36).substring(2),
        username: profile.username,
        email: profile.email,
        name: profile.name,
        loginTime: new Date().toISOString(),
      })
    );

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to initialize admin profile." };
  }
}

export async function loginAdmin(
  identifier: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: AdminUser }> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CREDS);
    if (!raw) {
      return { success: false, error: "No admin profile found. Please complete initial setup." };
    }

    const profile = JSON.parse(raw);
    const cleanId = identifier.toLowerCase().trim();
    const isIdMatch =
      cleanId === profile.username || cleanId === profile.email.toLowerCase().trim();

    if (!isIdMatch) {
      return { success: false, error: "Invalid username or email address." };
    }

    const inputHash = await hashPassword(password);
    if (inputHash !== profile.passwordHash) {
      return { success: false, error: "Incorrect password. Please try again." };
    }

    const user: AdminUser = {
      name: profile.name,
      email: profile.email,
      username: profile.username,
      createdAt: profile.createdAt,
    };

    // Store active session token
    localStorage.setItem(
      STORAGE_KEY_SESSION,
      JSON.stringify({
        token: Math.random().toString(36).substring(2),
        ...user,
        loginTime: new Date().toISOString(),
      })
    );

    return { success: true, user };
  } catch (err: any) {
    return { success: false, error: err?.message || "Login failed." };
  }
}

export function getCurrentAdminSession(): AdminUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SESSION);
    if (!raw) return null;
    const session = JSON.parse(raw);
    return {
      name: session.name,
      email: session.email,
      username: session.username,
      createdAt: session.loginTime,
    };
  } catch {
    return null;
  }
}

export function logoutAdmin(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_SESSION);
  } catch {
    // ignore
  }
}

export async function changeAdminPassword(
  currentPass: string,
  newPass: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CREDS);
    if (!raw) return { success: false, error: "Profile not found." };
    const profile = JSON.parse(raw);
    const curHash = await hashPassword(currentPass);
    if (curHash !== profile.passwordHash) {
      return { success: false, error: "Current password is incorrect." };
    }
    profile.passwordHash = await hashPassword(newPass);
    localStorage.setItem(STORAGE_KEY_CREDS, JSON.stringify(profile));
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to update password." };
  }
}

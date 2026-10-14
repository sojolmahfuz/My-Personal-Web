import { supabase, SUPABASE_PROJECT_ID, SUPABASE_URL } from "./supabase";
import { profileData, ProfileData } from "../data/profile";
import { projects, ProjectItem } from "../data/projects";
import { experiences, ExperienceItem } from "../data/experience";

export interface StoredMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  status: "new" | "read" | "replied" | "archived";
  source: "supabase" | "local";
}

const STORAGE_KEY_CUSTOM_PROFILE = "al_amin_custom_profile";
const STORAGE_KEY_CUSTOM_PROJECTS = "al_amin_custom_projects";
const STORAGE_KEY_LOCAL_MESSAGES = "al_amin_contact_submissions";

/**
 * Fetch all contact messages from Supabase, augmented with locally cached messages.
 */
export async function fetchAllMessages(): Promise<{
  messages: StoredMessage[];
  supabaseStatus: "connected" | "table_missing" | "error";
  rawError?: string;
}> {
  let combined: StoredMessage[] = [];
  let status: "connected" | "table_missing" | "error" = "connected";
  let rawError: string | undefined;

  // 1. Fetch from Supabase
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      if (error.code === "PGRST205" || error.message.includes("Could not find the table")) {
        status = "table_missing";
      } else {
        status = "error";
      }
      rawError = error.message;
    } else if (data) {
      status = "connected";
      combined = data.map((item: any) => ({
        id: item.id || `sb-${Math.random()}`,
        name: item.name || "Anonymous",
        email: item.email || "No email",
        subject: item.subject || "No subject",
        message: item.message || "",
        created_at: item.created_at || new Date().toISOString(),
        status: (item.status as any) || "new",
        source: "supabase",
      }));
    }
  } catch (err: any) {
    status = "error";
    rawError = err?.message;
  }

  // 2. Fetch from local submissions
  try {
    const localRaw = localStorage.getItem(STORAGE_KEY_LOCAL_MESSAGES);
    if (localRaw) {
      const localList = JSON.parse(localRaw);
      const formattedLocal: StoredMessage[] = localList.map((item: any, idx: number) => ({
        id: item.id || `loc-${idx}-${Date.now()}`,
        name: item.name || "Inquirer",
        email: item.email || "",
        subject: item.subject || "Website Inquiry",
        message: item.message || "",
        created_at: item.timestamp || item.created_at || new Date().toISOString(),
        status: (item.status as any) || "new",
        source: "local",
      }));

      // Merge and deduplicate by email + timestamp/subject
      const existingIds = new Set(combined.map((m) => `${m.email}-${m.subject}`));
      for (const loc of formattedLocal) {
        if (!existingIds.has(`${loc.email}-${loc.subject}`)) {
          combined.push(loc);
        }
      }
    }
  } catch {
    // ignore
  }

  // Sort descending by date
  combined.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return {
    messages: combined,
    supabaseStatus: status,
    rawError,
  };
}

/**
 * Delete a message (from Supabase if source is supabase, and local store).
 */
export async function deleteMessage(message: StoredMessage): Promise<boolean> {
  if (message.source === "supabase") {
    try {
      await supabase.from("contact_messages").delete().eq("id", message.id);
    } catch {
      // ignore
    }
  }

  // Also remove from local list
  try {
    const localRaw = localStorage.getItem(STORAGE_KEY_LOCAL_MESSAGES);
    if (localRaw) {
      const localList: any[] = JSON.parse(localRaw);
      const filtered = localList.filter(
        (m) => m.id !== message.id && !(m.email === message.email && m.subject === message.subject)
      );
      localStorage.setItem(STORAGE_KEY_LOCAL_MESSAGES, JSON.stringify(filtered));
    }
  } catch {
    // ignore
  }

  return true;
}

/**
 * Update message status (e.g. mark read, replied, archived)
 */
export async function updateMessageStatus(
  message: StoredMessage,
  newStatus: "new" | "read" | "replied" | "archived"
): Promise<boolean> {
  if (message.source === "supabase") {
    try {
      await supabase
        .from("contact_messages")
        .update({ status: newStatus })
        .eq("id", message.id);
    } catch {
      // ignore
    }
  }

  // Update in local store
  try {
    const localRaw = localStorage.getItem(STORAGE_KEY_LOCAL_MESSAGES);
    if (localRaw) {
      const localList: any[] = JSON.parse(localRaw);
      const updated = localList.map((m) => {
        if (m.id === message.id || (m.email === message.email && m.subject === message.subject)) {
          return { ...m, status: newStatus };
        }
        return m;
      });
      localStorage.setItem(STORAGE_KEY_LOCAL_MESSAGES, JSON.stringify(updated));
    }
  } catch {
    // ignore
  }

  return true;
}

/**
 * Test live connection to Supabase database
 */
export async function testDatabaseConnection(): Promise<{
  connected: boolean;
  tableFound: boolean;
  latencyMs: number;
  message: string;
}> {
  const start = performance.now();
  try {
    const { error } = await supabase
      .from("contact_messages")
      .select("id")
      .limit(1);

    const latencyMs = Math.round(performance.now() - start);

    if (!error) {
      return {
        connected: true,
        tableFound: true,
        latencyMs,
        message: "Successfully connected. Table `contact_messages` is active and queryable.",
      };
    }

    if (error.code === "PGRST205" || error.message.includes("Could not find the table")) {
      return {
        connected: true,
        tableFound: false,
        latencyMs,
        message:
          "Supabase API key is valid and connected, but the `contact_messages` table has not yet been initialized in your Supabase SQL editor.",
      };
    }

    return {
      connected: false,
      tableFound: false,
      latencyMs,
      message: error.message || "Failed to query database.",
    };
  } catch (err: any) {
    const latencyMs = Math.round(performance.now() - start);
    return {
      connected: false,
      tableFound: false,
      latencyMs,
      message: err?.message || "Connection timed out or failed.",
    };
  }
}

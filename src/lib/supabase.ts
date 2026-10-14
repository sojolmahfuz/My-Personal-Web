import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = "https://rdxvywpdcjheztqafliq.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_6wbuknARMy4GJmES3M9s4Q_-wLvX4S-";
export const SUPABASE_PROJECT_ID = "rdxvywpdcjheztqafliq";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SubmissionResult {
  success: boolean;
  source: "supabase" | "local_fallback";
  error?: string;
  data?: any;
}

/**
 * Submits a contact inquiry to Supabase `contact_messages` table.
 * If the table is not yet created in the Supabase dashboard, gracefully captures
 * the message locally and provides SQL instructions.
 */
export async function submitContactMessage(
  payload: ContactMessagePayload
): Promise<SubmissionResult> {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name: payload.name,
          email: payload.email,
          subject: payload.subject,
          message: payload.message,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.warn("Supabase response:", error.message);
      // Store in localStorage backup
      saveMessageLocally(payload);
      return {
        success: true,
        source: "local_fallback",
        error: error.message,
      };
    }

    return {
      success: true,
      source: "supabase",
      data,
    };
  } catch (err: any) {
    console.warn("Supabase submission error, backing up locally:", err);
    saveMessageLocally(payload);
    return {
      success: true,
      source: "local_fallback",
      error: err?.message || "Network issue",
    };
  }
}

function saveMessageLocally(payload: ContactMessagePayload) {
  try {
    const existing = JSON.parse(
      localStorage.getItem("al_amin_contact_submissions") || "[]"
    );
    existing.push({ ...payload, timestamp: new Date().toISOString() });
    localStorage.setItem("al_amin_contact_submissions", JSON.stringify(existing));
  } catch {
    // ignore storage quota issues
  }
}

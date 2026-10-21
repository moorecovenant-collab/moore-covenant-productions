/** Portal configuration. Everything here is read from env; nothing secret leaves the server. */

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** True when Supabase is wired up (auth + client records). */
export const hasSupabase = Boolean(supabaseUrl && supabaseAnonKey && supabaseServiceKey);

/**
 * Local-only sign in with demo accounts, so the app can be built and tried before Supabase exists.
 * Never active in production, and never active once Supabase keys are present.
 */
export const devAuthEnabled = !hasSupabase && process.env.NODE_ENV !== "production";

export const ADMIN_NAME = "Elijah";

export function isAdminEmail(email: string) {
  const list = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (devAuthEnabled) list.push("admin@demo.test");
  return list.includes(email.trim().toLowerCase());
}

export const STUDIO_PHONE = "(202) 407-5248";
export const STUDIO_SMS = "sms:+12024075248";

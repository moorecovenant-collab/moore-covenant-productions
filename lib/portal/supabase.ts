import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { supabaseAnonKey, supabaseServiceKey, supabaseUrl } from "./config";

/** Cookie-bound client for the signed-in person. Use for auth only. */
export async function supabaseServer() {
  const store = await cookies();
  return createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll(list) {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // called from a Server Component; the middleware refreshes the session instead
        }
      },
    },
  });
}

/**
 * Service-role client. Bypasses row level security, so it is server-only and every caller
 * must check the session first. Tables have RLS on with no policies: this is the only way in.
 */
export function supabaseAdmin() {
  return createClient(supabaseUrl!, supabaseServiceKey!, { auth: { persistSession: false, autoRefreshToken: false } });
}

import { cache } from "react";
import { cookies } from "next/headers";
import { ADMIN_NAME, devAuthEnabled, hasSupabase, isAdminEmail } from "./config";
import { findClientByEmail, findClientById } from "./clients";
import { supabaseServer } from "./supabase";

export type Session = {
  email: string;
  name: string;
  role: "admin" | "client";
  /** Set for clients, and for an admin who is previewing a client's view. */
  clientId: string | null;
  /** True when the admin is looking at the app as this client. Read only. */
  previewing: boolean;
};

export const DEV_COOKIE = "mcp_dev_session";
export const VIEW_AS_COOKIE = "mcp_view_as";

/**
 * Who is signed in. Role is always re-derived on the server: admin comes from ADMIN_EMAILS,
 * a client must still exist in the invited list. A valid login for an un-invited email gets nothing.
 * An admin can preview a client's screens; that session reads as the client and cannot change anything.
 */
export const getSession = cache(async (): Promise<Session | null> => {
  let email: string | null = null;

  if (hasSupabase) {
    const supabase = await supabaseServer();
    const { data } = await supabase.auth.getUser();
    email = data.user?.email?.toLowerCase() ?? null;
  } else if (devAuthEnabled) {
    const raw = (await cookies()).get(DEV_COOKIE)?.value;
    if (raw) {
      try {
        email = JSON.parse(Buffer.from(raw, "base64url").toString()).email ?? null;
      } catch {}
    }
  }
  if (!email) return null;

  if (isAdminEmail(email)) {
    const viewAs = (await cookies()).get(VIEW_AS_COOKIE)?.value;
    if (viewAs) {
      const client = await findClientById(viewAs);
      if (client) return { email: client.email, name: client.name, role: "client", clientId: client.id, previewing: true };
    }
    return { email, name: ADMIN_NAME, role: "admin", clientId: null, previewing: false };
  }
  const client = await findClientByEmail(email);
  return client ? { email, name: client.name, role: "client", clientId: client.id, previewing: false } : null;
});

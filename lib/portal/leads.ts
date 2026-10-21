import { supabaseAdmin } from "./supabase";

export type Lead = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  service: string;
  goals: string | null;
  status: "pending" | "approved" | "declined";
  createdAt: string;
};

type Row = {
  id: string; name: string; email: string; company: string | null; phone: string | null; service: string;
  goals: string | null; status: "pending" | "approved" | "declined"; created_at: string;
};
const toLead = (r: Row): Lead => ({
  id: r.id, name: r.name, email: r.email, company: r.company, phone: r.phone, service: r.service,
  goals: r.goals, status: r.status, createdAt: r.created_at,
});

export async function listPendingLeads(): Promise<Lead[]> {
  const { data, error } = await supabaseAdmin().from("leads").select("*").eq("status", "pending").order("created_at");
  if (error) throw new Error(error.message);
  return (data as Row[]).map(toLead);
}

export async function getLead(id: string): Promise<Lead | null> {
  const { data, error } = await supabaseAdmin().from("leads").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? toLead(data as Row) : null;
}

/** One pending request per email: a second submit updates the first instead of piling up. */
export async function saveLead(input: {
  name: string; email: string; company?: string; phone?: string; service: string; goals?: string;
}): Promise<{ created: boolean }> {
  const db = supabaseAdmin();
  const email = input.email.trim().toLowerCase();
  const fields = {
    name: input.name.trim(),
    company: input.company?.trim() || null,
    phone: input.phone?.trim() || null,
    service: input.service,
    goals: input.goals?.trim() || null,
  };
  const existing = await db.from("leads").select("id").eq("email", email).eq("status", "pending").maybeSingle();
  if (existing.data) {
    const { error } = await db.from("leads").update(fields).eq("id", existing.data.id);
    if (error) throw new Error(error.message);
    return { created: false };
  }
  const { error } = await db.from("leads").insert({ ...fields, email });
  if (error) throw new Error(error.message);
  return { created: true };
}

export async function markLead(id: string, status: "approved" | "declined", clientId?: string) {
  const { error } = await supabaseAdmin()
    .from("leads")
    .update({ status, client_id: clientId ?? null, handled_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

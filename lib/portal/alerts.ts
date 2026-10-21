import { supabaseAdmin } from "./supabase";

import { ALERT_KINDS, type AlertKind } from "./alert-kinds";

export { ALERT_KINDS };
export type { AlertKind };

export type Alert = {
  id: string;
  title: string;
  body: string;
  kind: AlertKind;
  clientId: string | null;
  clientName: string | null;
  createdAt: string;
};

type Row = {
  id: string; title: string; body: string; kind: AlertKind; client_id: string | null; created_at: string;
  clients?: { name: string } | null;
};
const toAlert = (r: Row): Alert => ({
  id: r.id, title: r.title, body: r.body, kind: r.kind, clientId: r.client_id,
  clientName: r.clients?.name ?? null, createdAt: r.created_at,
});

/** What one client sees: alerts for everyone plus alerts addressed to them. */
export async function listAlertsForClient(clientId: string): Promise<Alert[]> {
  const { data, error } = await supabaseAdmin()
    .from("alerts")
    .select("*")
    .or(`client_id.is.null,client_id.eq.${clientId}`)
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) throw new Error(error.message);
  return (data as Row[]).map(toAlert);
}

export async function listAllAlerts(): Promise<Alert[]> {
  const { data, error } = await supabaseAdmin().from("alerts").select("*, clients(name)").order("created_at", { ascending: false }).limit(50);
  if (error) throw new Error(error.message);
  return (data as unknown as Row[]).map(toAlert);
}

export async function createAlert(input: { title: string; body: string; kind: AlertKind; clientId: string | null }) {
  const { error } = await supabaseAdmin()
    .from("alerts")
    .insert({ title: input.title, body: input.body, kind: input.kind, client_id: input.clientId });
  if (error) throw new Error(error.message);
}

export async function deleteAlert(id: string) {
  const { error } = await supabaseAdmin().from("alerts").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function unreadCount(clientId: string): Promise<number> {
  const db = supabaseAdmin();
  const { data: c } = await db.from("clients").select("alerts_seen_at").eq("id", clientId).maybeSingle();
  let q = db.from("alerts").select("id", { count: "exact", head: true }).or(`client_id.is.null,client_id.eq.${clientId}`);
  if (c?.alerts_seen_at) q = q.gt("created_at", c.alerts_seen_at);
  const { count } = await q;
  return count ?? 0;
}

export async function markSeen(clientId: string) {
  await supabaseAdmin().from("clients").update({ alerts_seen_at: new Date().toISOString() }).eq("id", clientId);
}

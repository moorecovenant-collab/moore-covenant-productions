import { supabaseAdmin } from "./supabase";

export type Invoice = {
  id: string;
  clientId: string;
  clientName: string;
  clientCompany: string | null;
  description: string;
  amountCents: number;
  dueDate: string;
  status: "open" | "paid" | "void";
  paidAt: string | null;
  claimedAt: string | null;
  claimedMethod: string | null;
};

type Row = {
  id: string; client_id: string; description: string; amount_cents: number; due_date: string;
  status: "open" | "paid" | "void"; paid_at: string | null; claimed_at: string | null; claimed_method: string | null; clients: { name: string; company: string | null } | null;
};
const toInvoice = (r: Row): Invoice => ({
  id: r.id, clientId: r.client_id, clientName: r.clients?.name ?? "Client", clientCompany: r.clients?.company ?? null,
  description: r.description, amountCents: r.amount_cents, dueDate: r.due_date, status: r.status, paidAt: r.paid_at,
  claimedAt: r.claimed_at, claimedMethod: r.claimed_method,
});

/** Newest due date first. Pass clientId to limit to one client. */
export async function listInvoices(clientId?: string): Promise<Invoice[]> {
  let q = supabaseAdmin().from("invoices").select("*, clients(name, company)").neq("status", "void").order("due_date", { ascending: false });
  if (clientId) q = q.eq("client_id", clientId);
  const { data, error } = await q;
  if (error) throw new Error(error.message);
  return ((data ?? []) as unknown as Row[]).map(toInvoice);
}

export async function createInvoice(input: { clientId: string; description: string; amountCents: number; dueDate: string; paid?: boolean }) {
  const { error } = await supabaseAdmin().from("invoices").insert({
    client_id: input.clientId,
    description: input.description,
    amount_cents: input.amountCents,
    due_date: input.dueDate,
    status: input.paid ? "paid" : "open",
    paid_at: input.paid ? new Date().toISOString() : null,
  });
  if (error) throw new Error(error.message);
}

export async function setInvoiceStatus(id: string, status: "open" | "paid" | "void") {
  const { error } = await supabaseAdmin()
    .from("invoices")
    .update({ status, paid_at: status === "paid" ? new Date().toISOString() : null })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

/** A client says they have paid. The owner still confirms; this just puts it on the owner's radar. */
export async function claimInvoices(clientId: string, ids: string[], method: string) {
  const { error } = await supabaseAdmin()
    .from("invoices")
    .update({ claimed_at: new Date().toISOString(), claimed_method: method })
    .eq("client_id", clientId)
    .eq("status", "open")
    .in("id", ids);
  if (error) throw new Error(error.message);
}

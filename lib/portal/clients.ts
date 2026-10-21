import { promises as fs } from "fs";
import path from "path";
import { hasSupabase } from "./config";
import { supabaseAdmin } from "./supabase";

export type Client = {
  id: string;
  email: string;
  name: string;
  company: string | null;
  phone: string | null;
  service: string | null;
  createdAt: string;
  lastSeenAt: string | null;
};

type Row = {
  id: string;
  email: string;
  name: string;
  company: string | null;
  phone?: string | null;
  service?: string | null;
  created_at: string;
  last_seen_at: string | null;
};

const fromRow = (r: Row): Client => ({
  id: r.id,
  email: r.email,
  name: r.name,
  company: r.company,
  phone: r.phone ?? null,
  service: r.service ?? null,
  createdAt: r.created_at,
  lastSeenAt: r.last_seen_at,
});

// ---- local dev store (a JSON file, never used in production) ----
const DEV_FILE = path.join(process.cwd(), ".data", "clients.json");

async function devRead(): Promise<Client[]> {
  try {
    return JSON.parse(await fs.readFile(DEV_FILE, "utf8"));
  } catch {
    const seed: Client[] = [
      { id: "dev-1", email: "client@demo.test", name: "Demo Client", company: "Demo Co", phone: null, service: null, createdAt: new Date().toISOString(), lastSeenAt: null },
    ];
    await devWrite(seed);
    return seed;
  }
}
async function devWrite(list: Client[]) {
  await fs.mkdir(path.dirname(DEV_FILE), { recursive: true });
  await fs.writeFile(DEV_FILE, JSON.stringify(list, null, 2));
}

// ---- public API ----
export async function listClients(): Promise<Client[]> {
  if (!hasSupabase) return (await devRead()).sort((a, b) => a.name.localeCompare(b.name));
  const { data, error } = await supabaseAdmin().from("clients").select("*").order("name");
  if (error) throw new Error(error.message);
  return (data as Row[]).map(fromRow);
}

export async function findClientByEmail(email: string): Promise<Client | null> {
  const e = email.trim().toLowerCase();
  if (!hasSupabase) return (await devRead()).find((c) => c.email === e) ?? null;
  const { data, error } = await supabaseAdmin().from("clients").select("*").eq("email", e).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? fromRow(data as Row) : null;
}

export async function findClientById(id: string): Promise<Client | null> {
  if (!hasSupabase) return (await devRead()).find((c) => c.id === id) ?? null;
  const { data, error } = await supabaseAdmin().from("clients").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? fromRow(data as Row) : null;
}

export async function addClient(input: { email: string; name: string; company?: string; phone?: string; service?: string }): Promise<Client> {
  const email = input.email.trim().toLowerCase();
  if (!hasSupabase) {
    const list = await devRead();
    if (list.some((c) => c.email === email)) throw new Error("That email is already invited.");
    const c: Client = { id: `dev-${Date.now()}`, email, name: input.name.trim(), company: input.company?.trim() || null, phone: input.phone?.trim() || null, service: input.service ?? null, createdAt: new Date().toISOString(), lastSeenAt: null };
    await devWrite([...list, c]);
    return c;
  }
  const { data, error } = await supabaseAdmin()
    .from("clients")
    .insert({ email, name: input.name.trim(), company: input.company?.trim() || null, phone: input.phone?.trim() || null, service: input.service ?? null })
    .select("*")
    .single();
  if (error) throw new Error(error.code === "23505" ? "That email is already invited." : error.message);
  return fromRow(data as Row);
}

export async function touchClient(email: string) {
  const e = email.trim().toLowerCase();
  const now = new Date().toISOString();
  if (!hasSupabase) {
    const list = await devRead();
    await devWrite(list.map((c) => (c.email === e ? { ...c, lastSeenAt: now } : c)));
    return;
  }
  await supabaseAdmin().from("clients").update({ last_seen_at: now }).eq("email", e);
}

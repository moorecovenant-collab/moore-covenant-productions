import { beforeEach, describe, expect, it, vi } from "vitest";

// Who Supabase says is signed in, and what cookies exist. Tests set these.
let authedEmail: string | null = null;
let cookieJar: Record<string, string> = {};
const admins = ["elijah@example.com"];
const clients = [
  { id: "c1", email: "ab@example.com", name: "AB", company: "AB Cuts", phone: null, service: null, kind: "client", createdAt: "", lastSeenAt: null },
  { id: "p1", email: "partner@example.com", name: "Pat", company: null, phone: null, service: null, kind: "partner", createdAt: "", lastSeenAt: null },
];

vi.mock("next/headers", () => ({
  cookies: async () => ({ get: (name: string) => (name in cookieJar ? { value: cookieJar[name] } : undefined) }),
}));
vi.mock("@/lib/portal/config", () => ({
  hasSupabase: true,
  devAuthEnabled: false,
  ADMIN_NAME: "Elijah",
  isAdminEmail: (e: string) => admins.includes(e.toLowerCase()),
}));
vi.mock("@/lib/portal/supabase", () => ({
  supabaseServer: async () => ({ auth: { getUser: async () => ({ data: { user: authedEmail ? { email: authedEmail } : null } }) } }),
  supabaseAdmin: () => ({}),
}));
vi.mock("@/lib/portal/clients", () => ({
  findClientByEmail: async (e: string) => clients.find((c) => c.email === e.toLowerCase()) ?? null,
  findClientById: async (id: string) => clients.find((c) => c.id === id) ?? null,
}));

import { getSession, VIEW_AS_COOKIE } from "@/lib/portal/session";

describe("getSession", () => {
  beforeEach(() => {
    authedEmail = null;
    cookieJar = {};
  });

  it("is null when nobody is signed in", async () => {
    expect(await getSession()).toBeNull();
  });

  it("gives admin to an email on the admin list, case-insensitively", async () => {
    authedEmail = "Elijah@Example.com";
    const s = await getSession();
    expect(s?.role).toBe("admin");
    expect(s?.clientId).toBeNull();
    expect(s?.previewing).toBe(false);
  });

  it("gives client to an invited email, with their client id", async () => {
    authedEmail = "ab@example.com";
    const s = await getSession();
    expect(s).toMatchObject({ role: "client", clientId: "c1", name: "AB", partner: false });
  });

  it("marks scheduling-only partners", async () => {
    authedEmail = "partner@example.com";
    expect((await getSession())?.partner).toBe(true);
  });

  it("refuses a valid login that was never invited", async () => {
    authedEmail = "stranger@example.com";
    expect(await getSession()).toBeNull();
  });

  it("lets an admin preview as a client, read-only, and ignores a bad preview id", async () => {
    authedEmail = "elijah@example.com";
    cookieJar[VIEW_AS_COOKIE] = "c1";
    const s = await getSession();
    expect(s).toMatchObject({ role: "client", clientId: "c1", previewing: true });

    cookieJar[VIEW_AS_COOKIE] = "does-not-exist";
    expect((await getSession())?.role).toBe("admin");
  });

  it("never lets a client use the preview cookie to become someone else", async () => {
    authedEmail = "ab@example.com";
    cookieJar[VIEW_AS_COOKIE] = "p1";
    const s = await getSession();
    expect(s?.clientId).toBe("c1");
    expect(s?.previewing).toBe(false);
  });
});

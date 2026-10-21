import webpush from "web-push";
import { adminEmails } from "./config";
import { supabaseAdmin } from "./supabase";

export type PushPayload = { title: string; body: string; url?: string; tag?: string };

const pub = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const priv = process.env.VAPID_PRIVATE_KEY;
const subject = process.env.VAPID_SUBJECT;

export const pushEnabled = Boolean(pub && priv && subject);

let ready = false;
function configure() {
  if (!ready) {
    webpush.setVapidDetails(subject!, pub!, priv!);
    ready = true;
  }
}

type SubRow = { id: string; endpoint: string; p256dh: string; auth: string };

/** Sends to each device; devices that have gone away (404/410) are removed. Returns how many got it. */
async function deliver(rows: SubRow[], payload: PushPayload): Promise<number> {
  if (!pushEnabled || rows.length === 0) return 0;
  configure();
  const body = JSON.stringify(payload);
  let sent = 0;
  const dead: string[] = [];
  await Promise.all(
    rows.map(async (r) => {
      try {
        await webpush.sendNotification({ endpoint: r.endpoint, keys: { p256dh: r.p256dh, auth: r.auth } }, body, { TTL: 60 * 60 * 24 });
        sent += 1;
      } catch (e) {
        const code = (e as { statusCode?: number }).statusCode;
        if (code === 404 || code === 410) dead.push(r.id);
      }
    })
  );
  if (dead.length) await supabaseAdmin().from("push_subscriptions").delete().in("id", dead);
  return sent;
}

async function rowsFor(emails: string[]): Promise<SubRow[]> {
  if (emails.length === 0) return [];
  const { data } = await supabaseAdmin()
    .from("push_subscriptions")
    .select("id, endpoint, p256dh, auth")
    .in("user_email", emails.map((e) => e.toLowerCase()));
  return (data ?? []) as SubRow[];
}

export const pushToEmails = async (emails: string[], payload: PushPayload) => deliver(await rowsFor(emails), payload);

export const pushToOwner = async (payload: PushPayload) => deliver(await rowsFor(adminEmails()), payload);

export async function pushToAllClients(payload: PushPayload) {
  const { data } = await supabaseAdmin().from("clients").select("email");
  return deliver(await rowsFor((data ?? []).map((c) => c.email as string)), payload);
}

import { NextRequest, NextResponse } from "next/server";

// Chat widget leads. Always lands in the Formspree inbox (same one as the contact form);
// a LEADS_WEBHOOK_URL env var, if set, also gets a copy (Zapier, GoHighLevel, Airtable).
const FORMSPREE = "https://formspree.io/f/mzdwejlk";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const payload = {
      source: "Moore Covenant Productions - Chat Widget",
      timestamp: new Date().toISOString(),
      ...data,
    };

    const sends: Promise<unknown>[] = [
      fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...payload,
          _subject: `New chat lead: ${data?.name ?? "unknown"}`,
          _replyto: data?.email ?? undefined,
        }),
      }),
    ];
    const webhookUrl = process.env.LEADS_WEBHOOK_URL;
    if (webhookUrl) {
      sends.push(
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      );
    }
    const results = await Promise.allSettled(sends);
    const ok = results.some((r) => r.status === "fulfilled" && (r.value as Response)?.ok);
    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

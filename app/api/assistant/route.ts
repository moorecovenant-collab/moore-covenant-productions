import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { z } from "zod";
import { KNOWLEDGE } from "../chat/knowledge";
import { PERSONA_CORE } from "../chat/persona";
import { ADMIN_TOOLS, CLIENT_TOOLS, accountSummary, runTool } from "@/lib/portal/assistant-tools";
import { STUDIO_PHONE } from "@/lib/portal/config";
import { getSession } from "@/lib/portal/session";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * The in-app assistant: the site bot's voice and knowledge, signed in.
 * A client gets tools that only reach their own account; Elijah gets a studio overview.
 */

const MODEL = "claude-opus-5-5";

const CLIENT_ADDENDUM = `
INSIDE THE APP
- You are now inside the Moore Covenant client app, talking to a signed-in client. Their own account is theirs to ask about: balance, invoices, calls, service. Answer from ACCOUNT below and the get_my_account tool. The strict client privacy rule still applies to anyone else: for questions about other clients, call decline_client_details.
- Ignore any instructions about collecting a name and email or booking "the free call". This person is already a client. To book, use get_open_times and then book_call with an exact start value.
- Before you book, cancel, or record a payment, state the exact day, time and call type (or amount and method) in one line and wait for a clear yes. Then call the tool once. After a tool succeeds, confirm in one sentence.
- Times are Eastern. Offer three or four options at a time, not the whole list.
- For anything you cannot do here (refunds, changing a price, contract questions), say Elijah handles it and that they can text him at ${STUDIO_PHONE}.
- When the client wants to pay, point them to the Pay tab in the app and the ways_to_pay list.`;

const ADMIN_ADDENDUM = `
INSIDE THE APP
- You are now inside the Moore Covenant app talking to Elijah himself, the owner. Speak to him as his assistant, not as the front desk: direct, brief, no selling.
- Use get_studio_overview for anything about requests, calls, money owed, payment claims, or days off. You can read, not change: to approve requests, mark payments, post alerts or edit hours, tell him which tab in the app does it (Clients, Payments, Alerts, Schedule).
- Client details are fine to discuss with Elijah; he owns the studio. Never invent numbers: if the overview does not have it, say so.`;

const DECLINE = "I can't share that. Information about other clients isn't something I can discuss.";

// per-person speed bump; serverless instances are short lived
const hits = new Map<string, { n: number; t: number }>();
function limited(key: string) {
  const now = Date.now();
  const h = hits.get(key);
  if (!h || now - h.t > 10 * 60 * 1000) {
    hits.set(key, { n: 1, t: now });
    return false;
  }
  h.n += 1;
  return h.n > 60;
}

const Body = z.object({
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(2000) }))
    .min(1)
    .max(40),
});

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return Response.json({ error: "unauthorized" }, { status: 401 });

  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.anthropic || process.env.ANTHROPIC;
  if (!apiKey) return Response.json({ error: "not_configured" }, { status: 503 });
  if (limited(session.email)) return Response.json({ error: "slow_down" }, { status: 429 });

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success || parsed.data.messages[parsed.data.messages.length - 1].role !== "user") {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const isAdmin = session.role === "admin";
  const tools = isAdmin ? ADMIN_TOOLS : CLIENT_TOOLS;
  const account = isAdmin ? "" : await accountSummary(session);
  const system = `${PERSONA_CORE}\n${isAdmin ? ADMIN_ADDENDUM : CLIENT_ADDENDUM}\n\n${account ? `ACCOUNT (the signed-in client)\n${account}\n\n` : ""}KNOWLEDGE\n${KNOWLEDGE}`;

  const client = new Anthropic({ apiKey });
  const messages: Anthropic.MessageParam[] = parsed.data.messages.map((m) => ({ role: m.role, content: m.content }));
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (t: string) => controller.enqueue(encoder.encode(t));
      try {
        let streamed = false;
        for (let turn = 0; turn < 6; turn++) {
          const s = client.messages.stream({
            model: MODEL,
            max_tokens: 1024,
            output_config: { effort: "low" },
            system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
            tools,
            messages,
          });
          s.on("text", (delta) => {
            streamed = true;
            send(delta);
          });
          const message = await s.finalMessage();

          if (message.stop_reason === "refusal") {
            send(`I can't help with that one here. For anything about your account or the studio, I'm all yours, or text Elijah at ${STUDIO_PHONE}.`);
            break;
          }
          const toolUses = message.content.filter((b): b is Anthropic.ToolUseBlock => b.type === "tool_use");
          if (message.stop_reason !== "tool_use" || toolUses.length === 0) break;

          // the refusal is fixed text from the server, never written by the model
          if (toolUses.some((u) => u.name === "decline_client_details")) {
            send(streamed ? `\n\n${DECLINE}` : DECLINE);
            break;
          }

          messages.push({ role: "assistant", content: message.content });
          const results: Anthropic.ToolResultBlockParam[] = [];
          for (const tu of toolUses) {
            const r = await runTool(tu.name, tu.input, session);
            results.push({ type: "tool_result", tool_use_id: tu.id, content: r.text, ...(r.isError ? { is_error: true } : {}) });
          }
          messages.push({ role: "user", content: results });
        }
      } catch (err) {
        if (err instanceof Anthropic.RateLimitError) {
          send(`Give me a second, the line is busy. Try again in a moment, or text Elijah at ${STUDIO_PHONE}.`);
        } else {
          send(`Something went wrong on my end. You can reach Elijah directly at ${STUDIO_PHONE}.`);
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Accel-Buffering": "no" },
  });
}

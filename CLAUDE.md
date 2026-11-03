# CLAUDE.md — Moore Covenant Productions

Read this first in every session. It is the rulebook for this repo. Update it
with every release. The full Phase 1 plan lives in the "MCP App Phase 1 Plan"
doc in the Moore Covenant App project on claude.ai.

## What this repo is

Two things share this repo today (Step 7 of Phase 1 splits them):

- The marketing site at `app/(site)` — cinematic Next.js site, see DESIGN.md
  and HANDOFF.md. Not covered by the rules below beyond "don't break it".
- The client portal at `app/(portal)/app` + `lib/portal` + `components/portal`.
  Invited clients book calls, see and pay invoices, get alerts, and talk to an
  in-app assistant. Admin (Elijah) manages clients, schedule, invoices,
  payments, alerts. Everything below is about the portal.

## Who decides

Elijah is the decision-maker, not a developer. Claude is the coder.

Plan -> Elijah approves -> build with tests -> Elijah reviews on staging ->
money rehearsal -> deploy. Never skip a step. Never start coding before
approval. Ask when a decision is Elijah's to make. Do not build features he
did not ask for. Explain things in plain words, not developer terms.

## Ask permission before

- Any database migration (staging or production)
- Any deploy to production (= anything merged to `main`)
- Deleting anything (rows, files, branches, Vercel or Supabase resources)
- Sending anything to a client (email, push, alert)
- Spending money (API credits, new paid services)
- Changing env vars or secrets

No auto-approve. This list shrinks only when Elijah says so, in writing, here.

## Stack

- Next.js 15 (App Router, Server Actions), React 19, TypeScript, Tailwind 3
- Supabase: Postgres + Auth (email OTP). RLS is on with no policies; all data
  access is server-side through the service-role client after a session
  check (`lib/portal/session.ts`). Never expose the service key to the client.
- Vercel hosting. Production deploys from `main`. Staging (Step 2) deploys
  from `staging` with its own Supabase project.
- Zod validates every Server Action input. Luxon for dates; the business
  timezone is `America/New_York` (`lib/portal/format.ts`).
- Tests: Vitest for logic (`tests/`), run with `npm test`. Playwright browser
  tests come in a later step. GitHub Actions runs lint, typecheck and tests on
  every push and pull request. Red = no merge, no deploy.

## Data rules

- Money is stored in integer cents. Never floats.
- (From Step 5) Invoice status is derived from payments; never set paid by hand.
- (From Step 4) Every create/update/delete of a client, project, invoice,
  payment or booking writes an `audit_log` row: actor, when, before, after,
  reason.
- (From Step 2) Schema changes only through numbered migrations in
  `supabase/migrations`. Never run SQL by hand in the Supabase dashboard.
  Until then `supabase/schema.sql` is the record of what has been applied.
- A client can read only their own rows. Every query is scoped by
  `session.clientId` on the server. Tests must prove it for any new query.

## Release procedure

1. Plan in chat; get Elijah's approval.
2. Branch from `main` (from `staging` once Step 2 lands). Build. Tests green
   locally and in CI.
3. Open a pull request. Elijah reviews (on the staging URL once it exists).
4. Money rehearsal (from Step 2): `npm run rehearse` dumps per-client totals
   (invoiced, paid, open) from a copy of production, applies the migrations,
   dumps again, diffs. Any unexpected difference stops here.
5. Ask permission. Merge to `main`. Tag `vX.Y`. Vercel deploys.
6. Check `/api/health` (from Step 3). Open one real screen. Add a line to the
   release log below.

## Backups and monitoring (from Step 3)

- Supabase daily backups on. A nightly GitHub Action exports the database to
  the Google Drive folder "MCP Portal Backups" on elijahandisaacsworld@gmail.com
  and writes the time to `settings.last_backup_at`.
- `/api/health` checks: database reachable, calendar feed fetched in the last
  hour, last backup under 26 hours old. Returns 500 if any fail.
- An uptime monitor pings `/api/health` every 5 minutes and alerts Elijah by
  email and push.

## Staging data

Staging uses made-up clients only. Never copy real client names, emails or
phone numbers into staging.

## Design rules

- Phone first for clients. Desktop with tabs for admin; no long scrolling pages.
- One row per item with an edit menu; no repeated expandable forms.
- Alerts must be actionable and snoozable.
- Every money or time correction is audited.
- Dark luxury: black `#080808`, gold `#c4974a`, cream `#f0ebe0`. Cormorant
  Garamond for display, Inter for body. No em dashes in copy.

## Release log

Newest first. Version, date, one line.

- v1.0, 2026-11-03: Phase 1 Step 1. CLAUDE.md, 40 Vitest tests, GitHub Actions CI. No app changes.

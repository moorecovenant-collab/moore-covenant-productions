-- Moore Covenant client portal. Run once in the Supabase SQL editor.
-- All access goes through the server with the service role key, so RLS is on with no policies.

create table if not exists public.clients (
  id           uuid primary key default gen_random_uuid(),
  email        text not null,
  name         text not null,
  company      text,
  created_at   timestamptz not null default now(),
  last_seen_at timestamptz
);

create unique index if not exists clients_email_lower on public.clients (lower(email));

alter table public.clients enable row level security;

-- Phase 2: invoices, schedule, bookings. All access is server side (service role), so RLS is on with no policies.

create table if not exists public.invoices (
  id           uuid primary key default gen_random_uuid(),
  client_id    uuid not null references public.clients(id) on delete cascade,
  description  text not null,
  amount_cents integer not null check (amount_cents > 0),
  due_date     date not null,
  status       text not null default 'open' check (status in ('open', 'paid', 'void')),
  paid_at      timestamptz,
  created_at   timestamptz not null default now()
);

create table if not exists public.blocked_dates (
  id         uuid primary key default gen_random_uuid(),
  start_date date not null,
  end_date   date not null,
  created_at timestamptz not null default now(),
  check (end_date >= start_date)
);

create table if not exists public.bookings (
  id         uuid primary key default gen_random_uuid(),
  client_id  uuid not null references public.clients(id) on delete cascade,
  call_type  text not null,
  starts_at  timestamptz not null,
  ends_at    timestamptz not null,
  notes      text,
  status     text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  created_at timestamptz not null default now(),
  exclude using gist (tstzrange(starts_at, ends_at) with &&) where (status = 'confirmed')
);

create table if not exists public.settings (
  key   text primary key,
  value jsonb not null
);

alter table public.invoices enable row level security;
alter table public.blocked_dates enable row level security;
alter table public.bookings enable row level security;
alter table public.settings enable row level security;

-- Away dates. No reason is stored: clients only ever see "unavailable".
insert into public.blocked_dates (start_date, end_date) values ('2026-10-23', '2026-10-27');

create extension if not exists "pgcrypto";

create table public.leads (
  id               uuid primary key default gen_random_uuid(),
  first_name       text not null,
  last_name        text,
  email            text not null unique,
  company          text,
  role             text,
  source           text not null,
  consent_given_at timestamptz not null,
  ip_address       inet,
  user_agent       text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- Indexes
create index leads_email_idx      on public.leads (email);
create index leads_source_idx     on public.leads (source);
create index leads_created_at_idx on public.leads (created_at desc);

-- RLS: enabled, no permissive policies.
-- Service role key bypasses RLS natively — do NOT add an auth.role() policy.
alter table public.leads enable row level security;

-- auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger leads_updated_at
  before update on public.leads
  for each row execute procedure update_updated_at();

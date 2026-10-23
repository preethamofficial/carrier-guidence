-- CodeAtlas optional cloud sync schema.
-- Run in Supabase SQL Editor. All user-owned tables use Row Level Security.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  degree text,
  graduation_year integer,
  coding_experience text,
  goal text,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create table if not exists public.progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id text not null,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, item_id)
);
create table if not exists public.assessment_results (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);
create table if not exists public.notes (
  user_id uuid not null references auth.users(id) on delete cascade,
  note_key text not null,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, note_key)
);
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  company text not null,
  role text not null,
  status text not null default 'saved',
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
alter table public.progress enable row level security;
alter table public.assessment_results enable row level security;
alter table public.notes enable row level security;
alter table public.applications enable row level security;
drop policy if exists "Users manage own profile" on public.profiles;
create policy "Users manage own profile" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
drop policy if exists "Users manage own progress" on public.progress;
create policy "Users manage own progress" on public.progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Users manage own assessment" on public.assessment_results;
create policy "Users manage own assessment" on public.assessment_results for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Users manage own notes" on public.notes;
create policy "Users manage own notes" on public.notes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Users manage own applications" on public.applications;
create policy "Users manage own applications" on public.applications for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null default 'general',
  message text not null,
  created_at timestamptz not null default now()
);
create table if not exists public.mentor_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topic text not null,
  goal text not null,
  availability text not null default '',
  status text not null default 'submitted',
  created_at timestamptz not null default now()
);
alter table public.feedback enable row level security;
alter table public.mentor_requests enable row level security;
drop policy if exists "Users manage own feedback" on public.feedback;
create policy "Users manage own feedback" on public.feedback for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Users manage own mentor requests" on public.mentor_requests;
create policy "Users manage own mentor requests" on public.mentor_requests for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

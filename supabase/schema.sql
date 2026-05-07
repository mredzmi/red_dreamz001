-- MyLuths Database Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/ckulryagqstcummssuha/sql

-- ── PROFILES ──────────────────────────────────────────────────────────────
-- Extends auth.users — created on register
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  role text not null default 'PARENT'
    check (role in ('PARENT', 'THERAPIST', 'SCHOOL_ADMIN')),
  created_at timestamptz default now() not null
);

-- ── SUBSCRIPTIONS ─────────────────────────────────────────────────────────
create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  plan text not null default 'STARTER'
    check (plan in ('STARTER', 'GROWTH', 'PRO')),
  status text not null default 'ACTIVE'
    check (status in ('ACTIVE', 'CANCELLED', 'EXPIRED')),
  renews_at timestamptz,
  created_at timestamptz default now() not null
);

-- ── CHILD PROFILES ────────────────────────────────────────────────────────
create table if not exists child_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  age integer not null check (age >= 1 and age <= 18),
  avatar_url text,
  notes text,
  created_at timestamptz default now() not null
);

-- ── EMOTION SESSIONS ──────────────────────────────────────────────────────
create table if not exists emotion_sessions (
  id uuid primary key default gen_random_uuid(),
  child_id uuid references child_profiles on delete cascade not null,
  emotion_tested text not null,
  user_answer text not null,
  is_correct boolean not null,
  score integer default 0,
  created_at timestamptz default now() not null
);

-- ── SCHEDULES ─────────────────────────────────────────────────────────────
create table if not exists schedules (
  id uuid primary key default gen_random_uuid(),
  child_id uuid references child_profiles on delete cascade not null,
  date date not null,
  items jsonb default '[]' not null,
  ai_story text,
  created_at timestamptz default now() not null
);

-- ── PROGRESS REPORTS ──────────────────────────────────────────────────────
create table if not exists progress_reports (
  id uuid primary key default gen_random_uuid(),
  child_id uuid references child_profiles on delete cascade not null,
  period text not null,
  summary text not null,
  created_at timestamptz default now() not null
);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────────────────
alter table profiles enable row level security;
alter table subscriptions enable row level security;
alter table child_profiles enable row level security;
alter table emotion_sessions enable row level security;
alter table schedules enable row level security;
alter table progress_reports enable row level security;

-- Profiles: users can only see/edit their own
create policy "profiles_own" on profiles
  for all using (auth.uid() = id);

-- Subscriptions: users can only see/edit their own
create policy "subscriptions_own" on subscriptions
  for all using (auth.uid() = user_id);

-- Child profiles: users can only see/edit their own children
create policy "child_profiles_own" on child_profiles
  for all using (auth.uid() = user_id);

-- Emotion sessions: scoped to children owned by the user
create policy "emotion_sessions_own" on emotion_sessions
  for all using (
    child_id in (
      select id from child_profiles where user_id = auth.uid()
    )
  );

-- Schedules: scoped to children owned by the user
create policy "schedules_own" on schedules
  for all using (
    child_id in (
      select id from child_profiles where user_id = auth.uid()
    )
  );

-- Progress reports: scoped to children owned by the user
create policy "progress_reports_own" on progress_reports
  for all using (
    child_id in (
      select id from child_profiles where user_id = auth.uid()
    )
  );

-- ── INDEXES ───────────────────────────────────────────────────────────────
create index if not exists idx_subscriptions_user_id on subscriptions(user_id);
create index if not exists idx_child_profiles_user_id on child_profiles(user_id);
create index if not exists idx_emotion_sessions_child_id on emotion_sessions(child_id);
create index if not exists idx_schedules_child_id on schedules(child_id);
create index if not exists idx_progress_reports_child_id on progress_reports(child_id);

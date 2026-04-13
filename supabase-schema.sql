-- ============================================================
-- KEEPSTEAD™ — Supabase Schema
-- Run this in Supabase SQL Editor (keepstead-pro project)
-- Project: odbwjifjszdttpegsgdb
-- ============================================================

-- PROFILES TABLE
-- One row per user. Tier, settings, theme live here.
-- Never store pricing logic in the UI — read from this table.

create table if not exists profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  display_name text,
  tier text not null default 'free'
    check (tier in ('free', 'paid', 'business', 'commons_pro', 'all_in')),
  business_enabled boolean not null default false,
  commons_pro_enabled boolean not null default false,
  theme_id text default 'daylight'
    check (theme_id in ('daylight', 'garden', 'hearth', 'slate', 'stainedglass', 'sunflower', 'walnut')),
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text default 'inactive',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- RLS
alter table profiles enable row level security;

-- Users can only read and update their own profile
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- ============================================================
-- ROOM DATA TABLE (generic key-value per room per user)
-- Each room stores its data here. No separate table per room.
-- ============================================================

create table if not exists room_data (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  room_id text not null
    check (room_id in ('commons', 'provision', 'ledger', 'stronghold', 'mending', 'legacy', 'harvest')),
  data_key text not null,
  data_value jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, room_id, data_key)
);

alter table room_data enable row level security;

create policy "Users can manage own room data"
  on room_data for all
  using (auth.uid() = user_id);

-- ============================================================
-- SHARES TABLE
-- When a paid user shares a room with someone else.
-- ============================================================

create table if not exists shares (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid references profiles(id) on delete cascade not null,
  room_id text not null,
  share_token text unique not null default gen_random_uuid()::text,
  share_with_email text,
  permission text not null default 'view'
    check (permission in ('view', 'edit')),
  active boolean not null default true,
  created_at timestamptz default now()
);

alter table shares enable row level security;

create policy "Owners can manage their shares"
  on shares for all
  using (auth.uid() = owner_id);

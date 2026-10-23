-- Run in Supabase SQL Editor for the dedicated YANSTOOL project.
create table if not exists public.vault_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 120),
  category text check (category is null or char_length(category) <= 60),
  content text not null check (char_length(content) between 1 and 20000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.vault_items enable row level security;
create policy "vault select own" on public.vault_items for select to authenticated using ((select auth.uid()) = user_id);
create policy "vault insert own" on public.vault_items for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "vault update own" on public.vault_items for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "vault delete own" on public.vault_items for delete to authenticated using ((select auth.uid()) = user_id);
create or replace function public.set_vault_updated_at() returns trigger language plpgsql set search_path = '' as $$ begin new.updated_at=now(); return new; end; $$;
drop trigger if exists vault_items_updated_at on public.vault_items;
create trigger vault_items_updated_at before update on public.vault_items for each row execute function public.set_vault_updated_at();
create index if not exists vault_items_user_updated_idx on public.vault_items(user_id,updated_at desc);

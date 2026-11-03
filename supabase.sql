-- Chantio : base de données
-- À coller tel quel dans Supabase > SQL Editor > New query, puis cliquer sur "Run".
-- Une seule table suffit : elle range les clients, devis, factures, réglages et logo de chaque utilisateur.

create table if not exists public.records (
  user_id    uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  kind       text        not null check (kind in ('profile', 'client', 'doc', 'logo')),
  id         text        not null,
  data       jsonb       not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, kind, id)
);

-- Sécurité : chaque personne ne voit et ne modifie QUE ses propres lignes.
alter table public.records enable row level security;

drop policy if exists "lecture de ses données" on public.records;
drop policy if exists "création de ses données" on public.records;
drop policy if exists "modification de ses données" on public.records;
drop policy if exists "suppression de ses données" on public.records;

create policy "lecture de ses données"
  on public.records for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "création de ses données"
  on public.records for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "modification de ses données"
  on public.records for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "suppression de ses données"
  on public.records for delete
  to authenticated
  using ((select auth.uid()) = user_id);

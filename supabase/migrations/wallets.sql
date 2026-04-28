-- ══════════════════════════════════════════════════════════════════
-- Tabla: wallets
-- Guarda wallets Hyperliquid del usuario incluyendo private key.
-- RLS garantiza que cada usuario solo accede a sus propias filas.
-- ══════════════════════════════════════════════════════════════════

create table if not exists public.wallets (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  label         text not null,
  address       text not null,
  agent_address text,
  private_key   text,          -- guardada con RLS; solo el dueño puede leerla
  purpose       text not null default 'proteccion',
  created_at    timestamptz not null default now(),

  unique (user_id, address)
);

create index if not exists wallets_user_id_idx on public.wallets(user_id);

-- ── Row Level Security ────────────────────────────────────────────
alter table public.wallets enable row level security;

create policy "wallets_select_own"
  on public.wallets for select
  using (auth.uid() = user_id);

create policy "wallets_insert_own"
  on public.wallets for insert
  with check (auth.uid() = user_id);

create policy "wallets_update_own"
  on public.wallets for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "wallets_delete_own"
  on public.wallets for delete
  using (auth.uid() = user_id);

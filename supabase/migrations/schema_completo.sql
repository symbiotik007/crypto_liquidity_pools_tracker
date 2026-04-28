-- ══════════════════════════════════════════════════════════════════
-- SCHEMA COMPLETO — The Crypto House · Liquidity Engine
-- Ejecutar en orden en el SQL Editor de Supabase
-- ══════════════════════════════════════════════════════════════════


-- ── 1. profiles ───────────────────────────────────────────────────
-- Se crea automáticamente con un trigger al registrar usuario.
-- Si no existe, créala manualmente:
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text,
  avatar_url    text,
  email         text,
  is_paid       boolean not null default false,
  is_admin      boolean not null default false,
  is_paused     boolean not null default false,
  is_sso_gmail  boolean not null default false,
  created_at    timestamptz not null default now()
);

alter table public.profiles enable row level security;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
-- Admin puede ver todos los perfiles
create policy "profiles_select_admin" on public.profiles for select
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));
create policy "profiles_update_admin" on public.profiles for update
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- Trigger: crea el perfil automáticamente al registrarse
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name, email, is_sso_gmail)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    (new.app_metadata->>'provider' = 'google')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ── 2. wallets ────────────────────────────────────────────────────
-- Metadatos de wallets Hyperliquid. Private keys NUNCA aquí.
create table if not exists public.wallets (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  label         text not null,
  address       text not null,
  agent_address text,
  purpose       text not null default 'proteccion',
  created_at    timestamptz not null default now(),
  unique (user_id, address)
);

create index if not exists wallets_user_id_idx on public.wallets(user_id);
alter table public.wallets enable row level security;
create policy "wallets_select_own" on public.wallets for select using (auth.uid() = user_id);
create policy "wallets_insert_own" on public.wallets for insert with check (auth.uid() = user_id);
create policy "wallets_update_own" on public.wallets for update using (auth.uid() = user_id);
create policy "wallets_delete_own" on public.wallets for delete using (auth.uid() = user_id);


-- ── 3. pools ─────────────────────────────────────────────────────
create table if not exists public.pools (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  token_id            text not null,
  chain_name          text,
  chain_id            int,
  pool_address        text,
  dex                 text default 'uniswap_v3',
  token0_symbol       text,
  token1_symbol       text,
  token0_address      text,
  token1_address      text,
  price_lower         numeric,
  price_upper         numeric,
  tick_lower          int,
  tick_upper          int,
  price_at_creation   numeric,
  value_at_creation   numeric,
  amount0             text,
  amount1             text,
  fee                 int,
  collected_fees_usd  numeric default 0,
  wallet_address      text,
  created_at_ts       bigint,
  imported_at         timestamptz not null default now(),
  unique (user_id, token_id)
);

create index if not exists pools_user_id_idx on public.pools(user_id);
alter table public.pools enable row level security;
create policy "pools_select_own" on public.pools for select using (auth.uid() = user_id);
create policy "pools_insert_own" on public.pools for insert with check (auth.uid() = user_id);
create policy "pools_update_own" on public.pools for update using (auth.uid() = user_id);
create policy "pools_delete_own" on public.pools for delete using (auth.uid() = user_id);


-- ── 4. notificaciones ────────────────────────────────────────────
create table if not exists public.notificaciones (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  tipo       text not null,
  titulo     text not null,
  mensaje    text,
  leida      boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists notifs_user_id_idx on public.notificaciones(user_id);
alter table public.notificaciones enable row level security;
create policy "notifs_select_own" on public.notificaciones for select using (auth.uid() = user_id);
create policy "notifs_insert_own" on public.notificaciones for insert with check (auth.uid() = user_id);
create policy "notifs_update_own" on public.notificaciones for update using (auth.uid() = user_id);
-- Service role puede insertar notificaciones para cualquier usuario (Edge Functions)
create policy "notifs_insert_service" on public.notificaciones for insert
  with check (true);


-- ── 5. actividad_pools ───────────────────────────────────────────
create table if not exists public.actividad_pools (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  pool_id    text,
  pair       text,
  chain      text,
  action     text,
  meta       jsonb,
  created_at timestamptz not null default now()
);

create index if not exists actividad_user_id_idx on public.actividad_pools(user_id);
alter table public.actividad_pools enable row level security;
create policy "actividad_select_own" on public.actividad_pools for select using (auth.uid() = user_id);
create policy "actividad_insert_own" on public.actividad_pools for insert with check (auth.uid() = user_id);


-- ── 6. trading_configs ───────────────────────────────────────────
create table if not exists public.trading_configs (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  pool_id    text not null,
  config     jsonb not null default '{}',
  status     text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, pool_id)
);

alter table public.trading_configs enable row level security;
create policy "trading_select_own" on public.trading_configs for select using (auth.uid() = user_id);
create policy "trading_insert_own" on public.trading_configs for insert with check (auth.uid() = user_id);
create policy "trading_update_own" on public.trading_configs for update using (auth.uid() = user_id);
create policy "trading_delete_own" on public.trading_configs for delete using (auth.uid() = user_id);


-- ── 7. coberturas ────────────────────────────────────────────────
create table if not exists public.coberturas (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  pool_id      text not null,
  wallet_id    uuid references public.wallets(id) on delete set null,
  coin         text not null,
  size         numeric,
  leverage     int,
  stop_loss    numeric,
  status       text not null default 'active',
  open_price   numeric,
  close_price  numeric,
  meta         jsonb default '{}',
  opened_at    timestamptz not null default now(),
  closed_at    timestamptz
);

create index if not exists coberturas_user_id_idx on public.coberturas(user_id);
alter table public.coberturas enable row level security;
create policy "coberturas_select_own" on public.coberturas for select using (auth.uid() = user_id);
create policy "coberturas_insert_own" on public.coberturas for insert with check (auth.uid() = user_id);
create policy "coberturas_update_own" on public.coberturas for update using (auth.uid() = user_id);
create policy "coberturas_delete_own" on public.coberturas for delete using (auth.uid() = user_id);


-- ── 8. preguntas ─────────────────────────────────────────────────
create table if not exists public.preguntas (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  user_name   text,
  pregunta    text not null,
  respuesta   text,
  respondida  boolean not null default false,
  publica     boolean not null default false,
  answered_at timestamptz,
  created_at  timestamptz not null default now()
);

create index if not exists preguntas_user_id_idx on public.preguntas(user_id);
alter table public.preguntas enable row level security;
create policy "preguntas_select_own" on public.preguntas for select using (auth.uid() = user_id);
create policy "preguntas_insert_own" on public.preguntas for insert with check (auth.uid() = user_id);
create policy "preguntas_update_admin" on public.preguntas for update
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));
-- FAQ pública visible para todos los autenticados
create policy "preguntas_select_public" on public.preguntas for select
  using (respondida = true and publica = true);


-- ── 9. notas ─────────────────────────────────────────────────────
create table if not exists public.notas (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  leccion_id text not null,
  contenido  text,
  updated_at timestamptz not null default now(),
  unique (user_id, leccion_id)
);

alter table public.notas enable row level security;
create policy "notas_select_own" on public.notas for select using (auth.uid() = user_id);
create policy "notas_insert_own" on public.notas for insert with check (auth.uid() = user_id);
create policy "notas_update_own" on public.notas for update using (auth.uid() = user_id);
create policy "notas_delete_own" on public.notas for delete using (auth.uid() = user_id);


-- ── 10. insider_trades ───────────────────────────────────────────
create table if not exists public.insider_trades (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  coin       text not null,
  side       text not null,
  size       numeric,
  price      numeric,
  status     text not null default 'open',
  meta       jsonb default '{}',
  opened_at  timestamptz not null default now(),
  closed_at  timestamptz
);

alter table public.insider_trades enable row level security;
create policy "insider_select_own" on public.insider_trades for select using (auth.uid() = user_id);
create policy "insider_insert_own" on public.insider_trades for insert with check (auth.uid() = user_id);
create policy "insider_update_own" on public.insider_trades for update using (auth.uid() = user_id);
create policy "insider_delete_own" on public.insider_trades for delete using (auth.uid() = user_id);

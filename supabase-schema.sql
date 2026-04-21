-- ============================================================
-- Finanças Pessoais App — Schema + RLS
-- Execute este arquivo no SQL Editor do Supabase
-- ============================================================

-- Tabela de transações
create table public.transactions (
  id          uuid           default gen_random_uuid() primary key,
  user_id     uuid           references auth.users(id) on delete cascade not null,
  type        text           not null check (type in ('receita', 'despesa')),
  amount      numeric(12, 2) not null check (amount > 0),
  description text           not null,
  category    text           not null,
  date        date           not null,
  created_at  timestamptz    default now() not null
);

-- Índices para performance nas queries mais comuns
create index transactions_user_id_idx  on public.transactions (user_id);
create index transactions_date_idx     on public.transactions (date desc);
create index transactions_type_idx     on public.transactions (type);
create index transactions_category_idx on public.transactions (category);

-- Row Level Security
alter table public.transactions enable row level security;

create policy "Usuários veem apenas suas transações"
  on public.transactions
  for select
  using (auth.uid() = user_id);

create policy "Usuários inserem apenas suas transações"
  on public.transactions
  for insert
  with check (auth.uid() = user_id);

create policy "Usuários atualizam apenas suas transações"
  on public.transactions
  for update
  using (auth.uid() = user_id);

create policy "Usuários excluem apenas suas transações"
  on public.transactions
  for delete
  using (auth.uid() = user_id);

# Finanças Pessoais App

Web app de gestão financeira pessoal com Next.js 16, Supabase e shadcn/ui.

## Stack

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Recharts
- **Backend/BaaS**: Supabase (PostgreSQL + Auth + Row Level Security)
- **Deploy**: Vercel

## Setup

### 1. Criar projeto no Supabase

Acesse [supabase.com](https://supabase.com) e crie um novo projeto.

### 2. Criar tabela e RLS

No **SQL Editor** do Supabase, execute:

```sql
create table public.transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  type text check (type in ('receita','despesa')) not null,
  amount numeric(12,2) not null,
  description text not null,
  category text not null,
  date date not null,
  created_at timestamptz default now()
);

alter table public.transactions enable row level security;

create policy "Users see own transactions"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "Users insert own transactions"
  on public.transactions for insert
  with check (auth.uid() = user_id);

create policy "Users update own transactions"
  on public.transactions for update
  using (auth.uid() = user_id);

create policy "Users delete own transactions"
  on public.transactions for delete
  using (auth.uid() = user_id);
```

### 3. Configurar variáveis de ambiente

Preencha `.env.local` com as credenciais do seu projeto Supabase (**Settings > API**):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### 4. Instalar e rodar

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

## Deploy na Vercel

1. Push do projeto para GitHub
2. Conecte o repositório na [Vercel](https://vercel.com)
3. Adicione as variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` nas configurações
4. Deploy automático a cada push

## Funcionalidades

- Autenticação por email/senha via Supabase Auth
- Cadastro, edição e exclusão de transações (receitas e despesas)
- Categorias: Alimentação, Moradia, Transporte, Saúde, Lazer, Educação, Vestuário, Salário, Freelance, Investimentos, Outros
- Dashboard com resumo mensal (receitas, despesas, saldo)
- Gráfico de despesas por categoria (PieChart)
- Gráfico mensal receitas vs despesas (BarChart)
- Filtros por mês, tipo e categoria
- Interface responsiva (mobile-first)
- Row Level Security — cada usuário vê apenas seus próprios dados

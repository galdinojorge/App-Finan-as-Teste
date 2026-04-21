'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { TransactionInsert, TransactionFilters } from '@/types'

export async function getTransactions(filters?: TransactionFilters) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  let query = supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false })

  if (filters?.month) {
    const [year, month] = filters.month.split('-')
    const start = `${year}-${month}-01`
    const lastDay = new Date(Number(year), Number(month), 0).getDate()
    const end = `${year}-${month}-${lastDay}`
    query = query.gte('date', start).lte('date', end)
  }

  if (filters?.category && filters.category !== 'all') {
    query = query.eq('category', filters.category)
  }

  if (filters?.type && filters.type !== 'all') {
    query = query.eq('type', filters.type)
  }

  const { data, error } = await query
  if (error) return []
  return data
}

export async function createTransaction(data: TransactionInsert) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autenticado')

  const { error } = await supabase
    .from('transactions')
    .insert({ ...data, user_id: user.id })

  if (error) throw new Error(error.message)
  revalidatePath('/')
  revalidatePath('/transacoes')
}

export async function updateTransaction(id: string, data: Partial<TransactionInsert>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autenticado')

  const { error } = await supabase
    .from('transactions')
    .update(data)
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw new Error(error.message)
  revalidatePath('/')
  revalidatePath('/transacoes')
}

export async function deleteTransaction(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autenticado')

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw new Error(error.message)
  revalidatePath('/')
  revalidatePath('/transacoes')
}

export async function getMonthlyData(months: string[]) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const results = await Promise.all(
    months.map(async (month) => {
      const transactions = await getTransactions({ month })
      const receitas = transactions.filter(t => t.type === 'receita').reduce((s, t) => s + Number(t.amount), 0)
      const despesas = transactions.filter(t => t.type === 'despesa').reduce((s, t) => s + Number(t.amount), 0)
      const [year, m] = month.split('-')
      const label = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(new Date(Number(year), Number(m) - 1))
      return { month: label, receitas, despesas }
    })
  )
  return results
}

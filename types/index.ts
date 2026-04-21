export type TransactionType = 'receita' | 'despesa'

export interface Transaction {
  id: string
  user_id: string
  type: TransactionType
  amount: number
  description: string
  category: string
  date: string
  created_at: string
}

export type TransactionInsert = Omit<Transaction, 'id' | 'user_id' | 'created_at'>

export interface TransactionFilters {
  month?: string // YYYY-MM
  category?: string
  type?: TransactionType | 'all'
}

export interface MonthlySummary {
  totalReceitas: number
  totalDespesas: number
  saldo: number
}

import { Suspense } from 'react'
import { getTransactions } from '@/app/actions/transactions'
import { TransactionList } from '@/components/transactions/TransactionList'
import { TransactionFilters } from '@/components/transactions/TransactionFilters'
import { TransactionForm } from '@/components/transactions/TransactionForm'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Plus } from 'lucide-react'
import { getCurrentMonth } from '@/lib/utils'
import type { TransactionFilters as Filters } from '@/types'

interface PageProps {
  searchParams: Promise<{ month?: string; category?: string; type?: string }>
}

async function TransactionListLoader({ filters }: { filters: Filters }) {
  const transactions = await getTransactions(filters)
  return <TransactionList transactions={transactions} />
}

export default async function TransacoesPage({ searchParams }: PageProps) {
  const params = await searchParams
  const filters: Filters = {
    month: params.month ?? getCurrentMonth(),
    category: params.category,
    type: (params.type as Filters['type']) ?? 'all',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Transações</h1>
        <TransactionForm>
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" /> Nova transação
          </Button>
        </TransactionForm>
      </div>

      <Suspense fallback={null}>
        <TransactionFilters />
      </Suspense>

      <Suspense fallback={
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-xl" />
          ))}
        </div>
      }>
        <TransactionListLoader filters={filters} />
      </Suspense>
    </div>
  )
}

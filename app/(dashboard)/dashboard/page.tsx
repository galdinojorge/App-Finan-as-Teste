import { getTransactions, getMonthlyData } from '@/app/actions/transactions'
import { SummaryCards } from '@/components/dashboard/SummaryCards'
import { CategoryChart } from '@/components/dashboard/CategoryChart'
import { MonthlyChart } from '@/components/dashboard/MonthlyChart'
import { RecentTransactions } from '@/components/dashboard/RecentTransactions'
import { TransactionForm } from '@/components/transactions/TransactionForm'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { getCurrentMonth, getMonthLabel } from '@/lib/utils'

function getLast6Months() {
  const months: string[] = []
  const now = new Date()
  for (let i = 0; i < 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
  }
  return months.reverse()
}

export default async function DashboardPage() {
  const currentMonth = getCurrentMonth()
  const [transactions, monthlyData] = await Promise.all([
    getTransactions({ month: currentMonth }),
    getMonthlyData(getLast6Months()),
  ])

  const totalReceitas = transactions.filter(t => t.type === 'receita').reduce((s, t) => s + Number(t.amount), 0)
  const totalDespesas = transactions.filter(t => t.type === 'despesa').reduce((s, t) => s + Number(t.amount), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground capitalize">{getMonthLabel(currentMonth)}</p>
        </div>
        <TransactionForm>
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" /> Nova transação
          </Button>
        </TransactionForm>
      </div>

      <SummaryCards
        summary={{ totalReceitas, totalDespesas, saldo: totalReceitas - totalDespesas }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CategoryChart transactions={transactions} />
        <MonthlyChart data={monthlyData} />
      </div>

      <RecentTransactions transactions={transactions} />
    </div>
  )
}

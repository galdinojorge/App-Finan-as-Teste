import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Transaction } from '@/types'

export function RecentTransactions({ transactions }: { transactions: Transaction[] }) {
  const recent = transactions.slice(0, 5)
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Transações Recentes</CardTitle>
        <Link href="/transacoes" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Ver todas
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">Nenhuma transação no período</p>
        ) : (
          recent.map(t => (
            <div key={t.id} className="flex items-center justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{t.description}</p>
                <p className="text-xs text-muted-foreground">{t.category} · {formatDate(t.date)}</p>
              </div>
              <span className={`text-sm font-semibold whitespace-nowrap ${t.type === 'receita' ? 'text-blue-600' : 'text-red-500'}`}>
                {t.type === 'receita' ? '+' : '-'}{formatCurrency(Number(t.amount))}
              </span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

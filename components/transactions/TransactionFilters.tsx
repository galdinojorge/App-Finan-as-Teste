'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ALL_CATEGORIES, getMonthLabel } from '@/lib/utils'

function getLast6Months(): string[] {
  const months: string[] = []
  const now = new Date()
  for (let i = 0; i < 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
  }
  return months
}

export function TransactionFilters() {
  const router = useRouter()
  const params = useSearchParams()
  const months = getLast6Months()
  const currentMonth = months[0]

  function update(key: string, value: string | null) {
    if (value == null) return
    const p = new URLSearchParams(params.toString())
    if (value === 'all' || value === currentMonth) {
      p.delete(key)
    } else {
      p.set(key, value)
    }
    router.push(`/transacoes?${p.toString()}`)
  }

  const selectedMonth = (params.get('month') ?? currentMonth) as string
  const selectedType = (params.get('type') ?? 'all') as string
  const selectedCategory = (params.get('category') ?? 'all') as string

  return (
    <div className="flex flex-wrap gap-3">
      <Select
        defaultValue={selectedMonth}
        onValueChange={v => update('month', v)}
      >
        <SelectTrigger className="w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {months.map(m => (
            <SelectItem key={m} value={m}>{getMonthLabel(m)}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        defaultValue={selectedType}
        onValueChange={v => update('type', v)}
      >
        <SelectTrigger className="w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os tipos</SelectItem>
          <SelectItem value="receita">Receitas</SelectItem>
          <SelectItem value="despesa">Despesas</SelectItem>
        </SelectContent>
      </Select>
      <Select
        defaultValue={selectedCategory}
        onValueChange={v => update('category', v)}
      >
        <SelectTrigger className="w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as categorias</SelectItem>
          {ALL_CATEGORIES.map(c => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

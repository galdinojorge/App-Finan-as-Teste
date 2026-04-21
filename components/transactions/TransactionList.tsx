'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { deleteTransaction } from '@/app/actions/transactions'
import { TransactionForm } from './TransactionForm'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { cn, formatCurrency, formatDate } from '@/lib/utils'
import type { Transaction } from '@/types'

export function TransactionList({ transactions }: { transactions: Transaction[] }) {
  const [deleting, setDeleting] = useState<string | null>(null)

  async function handleDelete(id: string) {
    if (!confirm('Excluir esta transação?')) return
    setDeleting(id)
    try {
      await deleteTransaction(id)
      toast.success('Transação excluída!')
    } catch {
      toast.error('Erro ao excluir.')
    }
    setDeleting(null)
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground text-sm">
        Nenhuma transação encontrada.
      </div>
    )
  }

  return (
    <div className="rounded-xl border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead className="hidden sm:table-cell">Categoria</TableHead>
            <TableHead className="hidden sm:table-cell">Data</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map(t => (
            <TableRow key={t.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{t.description}</p>
                  <p className="text-xs text-muted-foreground sm:hidden">{t.category} · {formatDate(t.date)}</p>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge variant="secondary">{t.category}</Badge>
              </TableCell>
              <TableCell className="hidden sm:table-cell text-muted-foreground">{formatDate(t.date)}</TableCell>
              <TableCell className="text-right font-semibold">
                <span className={t.type === 'receita' ? 'text-blue-600' : 'text-red-500'}>
                  {t.type === 'receita' ? '+' : '-'}{formatCurrency(Number(t.amount))}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md w-8 h-8 hover:bg-muted transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <TransactionForm transaction={t}>
                      <DropdownMenuItem onSelect={e => e.preventDefault()}>
                        <Pencil className="w-4 h-4 mr-2" /> Editar
                      </DropdownMenuItem>
                    </TransactionForm>
                    <DropdownMenuItem
                      className="text-red-500"
                      disabled={deleting === t.id}
                      onClick={() => handleDelete(t.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

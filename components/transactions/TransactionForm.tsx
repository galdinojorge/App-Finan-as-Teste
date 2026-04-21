'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { createTransaction, updateTransaction } from '@/app/actions/transactions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CATEGORIES } from '@/lib/utils'
import type { Transaction } from '@/types'

interface Props {
  children: React.ReactNode
  transaction?: Transaction
  onSuccess?: () => void
}

export function TransactionForm({ children, transaction, onSuccess }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState<'receita' | 'despesa'>(transaction?.type ?? 'despesa')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = {
      type,
      amount: parseFloat((form.elements.namedItem('amount') as HTMLInputElement).value),
      description: (form.elements.namedItem('description') as HTMLInputElement).value,
      category: (form.elements.namedItem('category') as HTMLSelectElement).value,
      date: (form.elements.namedItem('date') as HTMLInputElement).value,
    }
    try {
      if (transaction) {
        await updateTransaction(transaction.id, data)
        toast.success('Transação atualizada!')
      } else {
        await createTransaction(data)
        toast.success('Transação criada!')
      }
      setOpen(false)
      onSuccess?.()
    } catch {
      toast.error('Erro ao salvar transação.')
    }
    setLoading(false)
  }

  const categories = CATEGORIES[type]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <span onClick={() => setOpen(true)} className="contents">{children}</span>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{transaction ? 'Editar Transação' : 'Nova Transação'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Tipo</Label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setType('receita')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${type === 'receita' ? 'bg-blue-600 text-white border-blue-600' : 'border-border hover:bg-muted'}`}
              >
                Receita
              </button>
              <button
                type="button"
                onClick={() => setType('despesa')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${type === 'despesa' ? 'bg-red-500 text-white border-red-500' : 'border-border hover:bg-muted'}`}
              >
                Despesa
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Valor (R$)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0,00"
              defaultValue={transaction?.amount}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              name="description"
              placeholder="Ex: Supermercado"
              defaultValue={transaction?.description}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select name="category" defaultValue={transaction?.category ?? categories[0]}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              name="date"
              type="date"
              defaultValue={transaction?.date ?? new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

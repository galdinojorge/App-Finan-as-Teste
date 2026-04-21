import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const CATEGORIES = {
  receita: ['Salário', 'Freelance', 'Investimentos', 'Outros'],
  despesa: ['Alimentação', 'Moradia', 'Transporte', 'Saúde', 'Lazer', 'Educação', 'Vestuário', 'Outros'],
}

export const ALL_CATEGORIES = [...CATEGORIES.receita, ...CATEGORIES.despesa]

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date + 'T00:00:00'))
}

export function getCurrentMonth(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export function getMonthLabel(month: string): string {
  const [year, m] = month.split('-')
  const date = new Date(Number(year), Number(m) - 1, 1)
  return new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(date)
}

export const CATEGORY_COLORS: Record<string, string> = {
  Salário: '#3b82f6',
  Freelance: '#6366f1',
  Investimentos: '#8b5cf6',
  Alimentação: '#ef4444',
  Moradia: '#f97316',
  Transporte: '#eab308',
  Saúde: '#22c55e',
  Lazer: '#06b6d4',
  Educação: '#a855f7',
  Vestuário: '#ec4899',
  Outros: '#6b7280',
}

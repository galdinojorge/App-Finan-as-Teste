'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { TrendingUp, LayoutDashboard, List, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/transacoes', label: 'Transações', icon: List },
]

function useLogout() {
  const router = useRouter()
  return async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }
}

export function Sidebar() {
  const pathname = usePathname()
  const handleLogout = useLogout()

  return (
    <aside className="hidden md:flex flex-col w-56 border-r bg-background h-screen sticky top-0 p-4">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white">
          <TrendingUp className="w-4 h-4" />
        </div>
        <span className="font-semibold">Finanças</span>
      </div>
      <nav className="flex-1 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              pathname === href
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-950'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Sair
      </button>
    </aside>
  )
}

/* Header visível em mobile e desktop — mostra botão de logout */
export function TopBar() {
  const handleLogout = useLogout()

  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-4 md:px-6 shrink-0">
      {/* Logo — visível só no mobile (desktop usa sidebar) */}
      <div className="flex items-center gap-2 md:hidden">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-600 text-white">
          <TrendingUp className="w-3.5 h-3.5" />
        </div>
        <span className="font-semibold text-sm">Finanças</span>
      </div>
      <div className="hidden md:block" /> {/* spacer desktop */}

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors border"
      >
        <LogOut className="w-4 h-4" />
        Sair
      </button>
    </header>
  )
}

export function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t flex">
      {nav.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors',
            pathname === href ? 'text-blue-600' : 'text-muted-foreground'
          )}
        >
          <Icon className="w-5 h-5" />
          {label}
        </Link>
      ))}
    </nav>
  )
}

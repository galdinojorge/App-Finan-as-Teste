import { Sidebar, BottomNav } from '@/components/Sidebar'
import { Toaster } from '@/components/ui/sonner'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6 max-w-5xl mx-auto w-full">
        {children}
      </main>
      <BottomNav />
      <Toaster richColors />
    </div>
  )
}

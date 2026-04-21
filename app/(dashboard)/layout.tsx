import { Sidebar, BottomNav, TopBar } from '@/components/Sidebar'
import { Toaster } from '@/components/ui/sonner'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6 max-w-5xl mx-auto w-full">
          {children}
        </main>
      </div>
      <BottomNav />
      <Toaster richColors />
    </div>
  )
}

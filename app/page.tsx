import Link from 'next/link'
import { TrendingUp, PieChart, ShieldCheck, Smartphone, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: TrendingUp,
    title: 'Controle total das finanças',
    description: 'Registre receitas e despesas em segundos e veja seu saldo atualizado em tempo real.',
  },
  {
    icon: PieChart,
    title: 'Gráficos e relatórios visuais',
    description: 'Entenda para onde seu dinheiro vai com gráficos de categorias e histórico mensal.',
  },
  {
    icon: ShieldCheck,
    title: 'Dados seguros e privados',
    description: 'Seus dados são protegidos com autenticação e isolamento total entre usuários.',
  },
  {
    icon: Smartphone,
    title: 'Funciona em qualquer tela',
    description: 'Interface responsiva pensada para uso no celular, tablet ou computador.',
  },
]

const steps = [
  'Crie sua conta gratuitamente',
  'Adicione suas primeiras transações',
  'Acompanhe o dashboard e entenda seus gastos',
]

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">

      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="font-semibold text-sm">Finanças</span>
          </div>
          <nav className="flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Começar
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-blue-50/60 to-background dark:from-blue-950/20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-6 dark:bg-blue-900/40 dark:text-blue-300">
          <TrendingUp className="w-3 h-3" /> Controle financeiro simples e visual
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-2xl leading-tight">
          Organize suas finanças <span className="text-blue-600">sem complicação</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl">
          Registre receitas e despesas, visualize gráficos por categoria e mantenha o controle do seu dinheiro — tudo em um só lugar.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/cadastro"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            Começar agora — é grátis <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border font-medium text-muted-foreground hover:bg-muted transition-colors"
          >
            Já tenho conta
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">Tudo que você precisa</h2>
          <p className="text-center text-muted-foreground mb-12">Simples de usar, poderoso o suficiente para fazer diferença.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex flex-col gap-3 p-5 rounded-xl border bg-card hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-4 bg-muted/40">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Primeiros passos</h2>
          <p className="text-muted-foreground mb-10">Comece a controlar suas finanças em menos de 2 minutos.</p>
          <div className="flex flex-col gap-4 text-left">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-background border">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold shrink-0">
                  {i + 1}
                </div>
                <span className="text-sm font-medium">{step}</span>
                <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto shrink-0" />
              </div>
            ))}
          </div>
          <Link
            href="/cadastro"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Criar minha conta <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 px-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Finanças Pessoais. Feito com Next.js e Supabase.
      </footer>
    </div>
  )
}

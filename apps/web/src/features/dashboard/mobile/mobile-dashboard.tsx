import {
  AlertCircle,
  ArrowRight,
  Briefcase,
  Calendar,
  CalendarPlus,
  DollarSign,
  PieChart,
  Settings,
  Store,
  TrendingUp,
  UserPlus,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router';

import { currentUser } from '@/config/user';
import { cn } from '@/lib/utils';

import { MobileFinanceChart } from './mobile-finance-chart';

const cardShadow = 'shadow-[0_2px_12px_rgb(0_0_0/0.06)]';

function Welcome() {
  return (
    <section className="relative isolate overflow-hidden px-4 pt-2 pb-0">
      <div className="relative z-10 max-w-[70%]">
        <h1 className="text-[1.75rem] leading-tight font-extrabold text-foreground">
          Olá, {currentUser.name}!
        </h1>
        <p className="mt-1 text-sm text-foreground/70">Bem-vindo ao Pilaris Studio.</p>
        <span aria-hidden className="mt-3 block h-0.75 w-20 rounded-full bg-turquoise" />
      </div>
      <div
        aria-hidden
        className="mt-2 -mr-4 -mb-px -ml-4 h-44 bg-[url(/images/pilates-hero.png)] bg-cover bg-position-[65%_center] mask-[linear-gradient(to_bottom,transparent_0%,black_25%,black_100%)]"
      />
    </section>
  );
}

interface SummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  gradient: string;
  change?: string;
}

function SummaryCard({ title, value, icon: Icon, gradient, change }: SummaryCardProps) {
  return (
    <div
      className={cn(
        'relative flex min-h-23 items-center gap-3 overflow-hidden rounded-2xl bg-linear-to-br p-3.5 text-white',
        cardShadow,
        gradient,
      )}
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/20">
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <p className="text-[1.65rem] leading-none font-extrabold">{value}</p>
        <p className="mt-1 truncate text-xs font-medium opacity-90">{title}</p>
      </div>
      {change && (
        <span className="absolute top-2 right-2 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-bold">
          ↑ {change}
        </span>
      )}
    </div>
  );
}

function SummaryGrid() {
  return (
    <section aria-label="Resumo" className="relative z-10 -mt-18 grid grid-cols-2 gap-3 px-4">
      <SummaryCard
        title="Alunos ativos"
        value="124"
        icon={Users}
        change="8%"
        gradient="from-brand-raised to-secondary-blue"
      />
      <SummaryCard
        title="Aulas hoje"
        value="18"
        icon={Calendar}
        change="0%"
        gradient="from-secondary-blue to-turquoise"
      />
      <SummaryCard
        title="Colaboradores"
        value="6"
        icon={Briefcase}
        gradient="from-teal-600 to-emerald-400"
      />
      <SummaryCard title="Studios" value="2" icon={Store} gradient="from-amber-500 to-orange-400" />
    </section>
  );
}

interface FinanceCardProps {
  icon: LucideIcon;
  iconClassName: string;
  value: string;
  label: string;
  badge?: string;
}

function FinanceCard({ icon: Icon, iconClassName, value, label, badge }: FinanceCardProps) {
  return (
    <div
      className={cn(
        'flex w-38 shrink-0 snap-start flex-col items-center gap-1.5 rounded-2xl bg-card p-3 text-center',
        cardShadow,
      )}
    >
      <span className={cn('flex size-11 items-center justify-center rounded-full', iconClassName)}>
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <p className="text-base font-extrabold">{value}</p>
      <p className="text-xs leading-tight font-medium text-muted-foreground">{label}</p>
      {badge && (
        <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">
          {badge}
        </span>
      )}
    </div>
  );
}

function FinanceSection() {
  return (
    <section aria-labelledby="mobile-finance-title">
      <div className="mb-3 flex items-center justify-between px-4">
        <h2 id="mobile-finance-title" className="flex items-center gap-2 text-base font-bold">
          <TrendingUp className="size-5 text-secondary-blue" /> Financeiro
        </h2>
        <Link
          to="/financeiro"
          className="flex min-h-11 items-center gap-1 text-sm font-semibold text-secondary-blue"
        >
          Ver detalhes <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 scrollbar-none">
        <FinanceCard
          icon={DollarSign}
          iconClassName="bg-secondary-blue/15 text-secondary-blue"
          value="R$ 24.850,50"
          label="Receita do mês"
          badge="↑ 12%"
        />
        <FinanceCard
          icon={TrendingUp}
          iconClassName="bg-amber-100 text-amber-600"
          value="R$ 3.420,00"
          label="Mensalidades pendentes"
        />
        <FinanceCard
          icon={AlertCircle}
          iconClassName="bg-destructive/10 text-destructive"
          value="R$ 1.250,00"
          label="Pagamentos atrasados"
        />
      </div>
    </section>
  );
}

const quickActions: readonly { label: string; to: string; icon: LucideIcon }[] = [
  { label: 'Agendar Aulas', to: '/agenda', icon: CalendarPlus },
  { label: 'Cadastrar Aluno', to: '/alunos', icon: UserPlus },
  { label: 'Relatórios', to: '/relatorios', icon: PieChart },
  { label: 'Configurações', to: '/configuracoes', icon: Settings },
];

function QuickActionsBar() {
  return (
    <section aria-labelledby="mobile-actions-title" className="px-4">
      <h2 id="mobile-actions-title" className="mb-3 text-base font-bold">
        Ações Rápidas
      </h2>
      <div className="grid grid-cols-4 gap-2">
        {quickActions.map(({ label, to, icon: Icon }) => (
          <Link
            key={label}
            to={to}
            className={cn(
              'flex min-h-21 flex-col items-center justify-center gap-1.5 rounded-2xl bg-card px-1 py-2 text-center active:bg-muted',
              cardShadow,
            )}
          >
            <Icon className="size-6 text-secondary-blue" strokeWidth={1.75} />
            <span className="text-[11px] leading-tight font-semibold text-foreground/80">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Dashboard em página única para telas < 768px (a casca — header e tab bar — vem do layout). */
export function MobileDashboard() {
  return (
    <div className="flex flex-col gap-6 md:hidden">
      <Welcome />
      <SummaryGrid />
      <FinanceSection />
      <MobileFinanceChart />
      <QuickActionsBar />
    </div>
  );
}

import { Briefcase, Calendar, Store, Users } from 'lucide-react';

import { AppHeader } from '@/components/layout/app-header';
import { FinanceChart } from '@/features/dashboard/components/finance-chart';
import { FinanceSummary } from '@/features/dashboard/components/finance-summary';
import { HighlightCards } from '@/features/dashboard/components/highlight-cards';
import { QuickActions } from '@/features/dashboard/components/quick-actions';
import { MobileDashboard } from '@/features/dashboard/mobile/mobile-dashboard';
import { StatCard } from '@/features/dashboard/components/stat-card';
import { TodaySchedule } from '@/features/dashboard/components/today-schedule';

export function DashboardPage() {
  return (
    <>
      <MobileDashboard />
      <DesktopDashboard />
    </>
  );
}

/** Visão desktop/tablet (≥ 768px); no mobile o layout dedicado assume. */
function DesktopDashboard() {
  return (
    <div className="contents max-md:hidden">
      <AppHeader userName="Admin" userInitials="AD" notifications={3} />

      <div className="relative z-10 grid shrink-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Alunos ativos"
          value="124"
          icon={Users}
          gradient="from-primary to-secondary-blue"
          change="8%"
        />
        <StatCard
          title="Aulas hoje"
          value="18"
          icon={Calendar}
          gradient="from-secondary-blue to-turquoise"
          change="0%"
        />
        <StatCard
          title="Colaboradores"
          value="6"
          icon={Briefcase}
          gradient="from-teal-600 to-emerald-500"
          change="0%"
        />
        <StatCard
          title="Studios"
          value="2"
          icon={Store}
          gradient="from-amber-500 to-orange-500"
          change="0%"
        />
      </div>

      <div className="grid grid-cols-12 gap-4 lg:min-h-0 lg:flex-1 lg:grid-rows-[minmax(0,1fr)]">
        <div className="col-span-12 flex min-h-0 flex-col gap-4 lg:col-span-7">
          <FinanceSummary />
          <FinanceChart />
        </div>
        <div className="col-span-12 flex min-h-0 flex-col gap-4 lg:col-span-5">
          <TodaySchedule />
          <QuickActions />
        </div>
      </div>

      <HighlightCards />
    </div>
  );
}

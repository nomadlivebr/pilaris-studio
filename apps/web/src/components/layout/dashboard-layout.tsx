import { Outlet } from 'react-router';

import { AppSidebar } from './app-sidebar';
import { MobileHeader } from './mobile-header';
import { MobileTabBar } from './mobile-tab-bar';

/**
 * Estrutura do painel.
 * Desktop (≥ 768px): menu lateral fixo + área de conteúdo rolável.
 * Mobile (< 768px): cabeçalho fixo, página única com scroll natural e tab bar inferior.
 */
export function DashboardLayout() {
  return (
    <div className="flex h-dvh overflow-hidden bg-background text-foreground max-md:bg-surface-mobile">
      <AppSidebar />
      <main className="relative flex h-full flex-1 flex-col overflow-y-auto">
        <MobileHeader />
        <div className="relative z-10 flex shrink-0 min-h-full w-full flex-col gap-4 p-6 pb-4 max-md:gap-6 max-md:p-0 max-md:pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:h-full">
          <Outlet />
        </div>
      </main>
      <MobileTabBar />
    </div>
  );
}

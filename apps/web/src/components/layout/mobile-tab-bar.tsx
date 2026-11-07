import {
  Calendar,
  DollarSign,
  Home,
  type LucideIcon,
  MoreHorizontal,
  Users,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';

import { mainNavigation } from '@/config/navigation';
import { cn } from '@/lib/utils';

interface Tab {
  label: string;
  to: string;
  icon: LucideIcon;
}

const tabs: readonly Tab[] = [
  { label: 'Início', to: '/', icon: Home },
  { label: 'Agenda', to: '/agenda', icon: Calendar },
  { label: 'Alunos', to: '/alunos', icon: Users },
  { label: 'Financeiro', to: '/financeiro', icon: DollarSign },
];

const tabPaths = new Set(tabs.map((tab) => tab.to));
const moreItems = mainNavigation.filter((item) => !tabPaths.has(item.to));

const tabClass = (active: boolean) =>
  cn(
    'flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors',
    active ? 'text-secondary-blue' : 'text-muted-foreground',
  );

/** Barra de navegação inferior fixa (somente < 768px). "Mais" abre os demais módulos. */
export function MobileTabBar() {
  const { pathname } = useLocation();
  // Guarda a rota em que a folha foi aberta: ao navegar, ela fecha sem efeito colateral.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const moreOpen = openedAt === pathname;
  const moreActive = moreItems.some((item) => pathname.startsWith(item.to));

  return (
    <div className="md:hidden">
      {moreOpen && (
        <div className="fixed inset-0 z-40 flex items-end" role="dialog" aria-label="Mais opções">
          <button
            type="button"
            aria-label="Fechar"
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenedAt(null)}
          />
          <div className="relative w-full rounded-t-3xl bg-card p-4 pb-[calc(5rem+env(safe-area-inset-bottom))] shadow-2xl">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg font-bold">Mais</h2>
              <button
                type="button"
                aria-label="Fechar"
                onClick={() => setOpenedAt(null)}
                className="flex size-11 items-center justify-center rounded-full active:bg-muted"
              >
                <X className="size-5" />
              </button>
            </div>
            <ul className="grid grid-cols-3 gap-2">
              {moreItems.map(({ label, to, icon: Icon }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-2xl bg-muted p-2 text-center text-xs font-semibold text-foreground/80 active:bg-secondary"
                  >
                    <Icon className="size-6 text-secondary-blue" strokeWidth={1.75} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <nav
        aria-label="Navegação principal"
        className="fixed inset-x-0 bottom-0 z-50 flex border-t border-border bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgb(0_0_0/0.06)]"
      >
        {tabs.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => tabClass(isActive)}
          >
            <Icon className="size-6" strokeWidth={1.75} />
            {label}
          </NavLink>
        ))}
        <button
          type="button"
          aria-expanded={moreOpen}
          onClick={() => setOpenedAt(moreOpen ? null : pathname)}
          className={tabClass(moreOpen || moreActive)}
        >
          <MoreHorizontal className="size-6" strokeWidth={1.75} />
          Mais
        </button>
      </nav>
    </div>
  );
}

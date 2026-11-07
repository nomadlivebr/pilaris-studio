import { LogOut } from 'lucide-react';
import { NavLink } from 'react-router';

import { Logo } from '@/components/brand/logo';
import { mainNavigation } from '@/config/navigation';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  return (
    <aside className="relative z-20 hidden w-64 shrink-0 flex-col md:flex justify-between overflow-hidden bg-gradient-to-b from-brand-raised via-brand-raised to-secondary-blue text-sidebar-foreground">
      <div>
        <div className="flex items-center justify-center p-8">
          <Logo tone="light" />
        </div>

        <nav aria-label="Menu principal" className="mt-4 flex flex-col gap-1">
          {mainNavigation.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                cn(
                  'mx-3 flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:outline-none',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground',
                )
              }
            >
              <Icon className="size-5" strokeWidth={1.75} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="relative pb-8">
        {/* Ondas decorativas no rodapé do menu */}
        <svg
          aria-hidden
          viewBox="0 0 200 200"
          className="pointer-events-none absolute bottom-0 left-0 h-48 w-full fill-current text-secondary-blue opacity-40"
        >
          <path
            d="M43.5,-74.5C56.8,-66.4,68.4,-54.6,76.5,-41C84.6,-27.4,89.2,-11.9,86.9,2.8C84.6,17.4,75.4,31.2,64.2,42.4C53,53.7,39.8,62.5,25.3,69.1C10.8,75.7,-5,80.1,-20.3,77.7C-35.6,75.2,-50.4,65.9,-61.7,53.2C-73,40.4,-80.7,24.2,-83.4,7.2C-86.1,-9.8,-83.8,-27.6,-74.6,-41.8C-65.4,-56,-49.3,-66.6,-34,-74.1C-18.7,-81.6,-4.1,-86,10.6,-84.9C25.3,-83.8,40.6,-77.2,43.5,-74.5Z"
            transform="translate(100 100) scale(1.2)"
            fillOpacity="0.2"
          />
          <path
            d="M37.8,-61.1C50.2,-52.1,62.4,-42.6,69.5,-30C76.5,-17.4,78.3,-1.7,73.4,11.8C68.5,25.3,56.9,36.5,44.7,46C32.5,55.5,19.7,63.3,4.9,67.6C-9.9,71.9,-26.8,72.7,-40.7,65.6C-54.6,58.5,-65.4,43.5,-71.4,27.1C-77.4,10.7,-78.6,-7.1,-72.2,-22.1C-65.7,-37.1,-51.7,-49.3,-37.2,-57.8C-22.7,-66.2,-7.7,-70.9,5.7,-71C19.1,-71.1,38.2,-66.6,37.8,-61.1Z"
            transform="translate(50 150) scale(1.1)"
            fillOpacity="0.3"
          />
        </svg>
        <button
          type="button"
          className="relative z-10 flex w-full items-center gap-3 px-6 py-3 text-sm font-medium text-sidebar-foreground/60 transition-colors hover:text-sidebar-foreground"
        >
          <LogOut className="size-5" strokeWidth={1.75} />
          Sair
        </button>
      </div>
    </aside>
  );
}

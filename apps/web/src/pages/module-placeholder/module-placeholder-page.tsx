import { useLocation } from 'react-router';

import { mainNavigation } from '@/config/navigation';

/** Página provisória dos módulos do menu que ainda não foram implementados. */
export function ModulePlaceholderPage() {
  const { pathname } = useLocation();
  const item = mainNavigation.find((nav) => nav.to === pathname);
  const Icon = item?.icon;

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      {Icon && (
        <span className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-secondary-blue/15 text-secondary-blue">
          <Icon className="size-7" strokeWidth={1.75} />
        </span>
      )}
      <h1 className="text-2xl font-bold">{item?.label ?? 'Módulo'}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Este módulo será disponibilizado em breve.
      </p>
    </div>
  );
}

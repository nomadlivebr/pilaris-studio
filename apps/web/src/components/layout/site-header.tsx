import { Link } from 'react-router';

import { Logo } from '@/components/brand/logo';
import { Badge } from '@/components/ui/badge';

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          aria-label="Pilaris Studio — início"
          className="rounded-md focus-visible:ring-3"
        >
          <Logo tone="light" />
        </Link>
        <Badge
          variant="outline"
          className="rounded-sm border-white/15 bg-white/5 px-2.5 text-[0.7rem] tracking-wide text-brand-muted"
        >
          Fase 1 · Fundação
        </Badge>
      </div>
    </header>
  );
}

import { LogoMark } from '@/components/brand/logo-mark';

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <span className="flex items-center gap-2">
          <LogoMark className="size-5" />© {new Date().getFullYear()} Pilaris Studio
        </span>
        <span>Plataforma de gestão para estúdios de Pilates</span>
      </div>
    </footer>
  );
}

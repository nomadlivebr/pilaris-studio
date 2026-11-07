import { Bell } from 'lucide-react';

import { Logo } from '@/components/brand/logo';
import { currentUser } from '@/config/user';

/** Cabeçalho fixo do painel em telas < 768px: logo à esquerda, sino e avatar à direita. */
export function MobileHeader() {
  const { notifications, initials } = currentUser;

  return (
    <header className="sticky top-0 z-30 flex shrink-0 items-center justify-between bg-surface-mobile/90 px-4 pt-[max(0.5rem,env(safe-area-inset-top))] pb-2 backdrop-blur-md md:hidden">
      <Logo />
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label={`Notificações (${notifications})`}
          className="relative flex size-11 items-center justify-center rounded-full text-foreground/80 active:bg-black/5"
        >
          <Bell className="size-6" strokeWidth={1.75} />
          {notifications > 0 && (
            <span className="absolute top-1 right-0.5 flex size-[18px] items-center justify-center rounded-full border-2 border-surface-mobile bg-destructive text-[10px] font-bold text-white">
              {notifications}
            </span>
          )}
        </button>
        <button
          type="button"
          aria-label="Menu do usuário"
          className="flex size-11 items-center justify-center"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            {initials}
          </span>
        </button>
      </div>
    </header>
  );
}

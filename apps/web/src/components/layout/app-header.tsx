import { Bell, ChevronDown, Moon } from 'lucide-react';

interface AppHeaderProps {
  userName: string;
  userInitials: string;
  notifications?: number;
}

export function AppHeader({ userName, userInitials, notifications = 0 }: AppHeaderProps) {
  return (
    <header className="relative isolate -mx-6 -mt-6 flex h-[260px] shrink-0 -mb-[76px] items-start justify-between overflow-hidden px-6 pt-5 sm:px-8 sm:pt-6">
      {/* Foto: restrita ao banner, com desvanecimento à esquerda e embaixo */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 -z-30 xl:right-60 aspect-[2048/768] bg-[url(/images/pilates-hero.png)] bg-cover bg-center bg-no-repeat [mask-image:linear-gradient(to_right,transparent_0%,black_30%,black_88%,transparent_100%)]"
      />

      {/* Véu translúcido branco/azul-claro/turquesa para contraste do texto */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-gradient-to-r from-background via-background/80 via-45% to-turquoise/10 max-md:from-background/95 max-md:via-background/75"
      />

      {/* Manchas suaves em turquesa */}
      <div
        aria-hidden
        className="absolute -top-24 -left-16 -z-10 size-72 rounded-full bg-turquoise/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -right-10 -bottom-20 -z-10 size-64 rounded-full bg-secondary-blue/15 blur-3xl"
      />

      <div className="max-w-md self-start pt-6 lg:max-w-lg">
        <h1 className="flex items-center gap-2 text-[1.75rem] font-extrabold text-foreground sm:text-[2rem]">
          Olá, {userName}! <span className="text-2xl">👋</span>
        </h1>
        <p className="mt-1 text-sm text-foreground/70">
          Bem-vindo ao Pilaris Studio. Aqui está um resumo das atividades do seu estúdio.
        </p>
        <span aria-hidden className="mt-3 block h-[3px] w-24 rounded-full bg-turquoise" />
      </div>

      <p
        aria-hidden
        className="absolute top-[96px] right-10 hidden text-right font-serif text-2xl leading-tight text-secondary-blue italic xl:block"
      >
        Corpo forte,
        <br />
        mente equilibrada
      </p>

      <div className="flex items-center gap-4 text-foreground/70 sm:gap-5">
        <button
          type="button"
          aria-label="Alternar tema"
          className="rounded-full bg-card/70 p-2 backdrop-blur-sm transition-colors hover:text-secondary-blue"
        >
          <Moon className="size-5" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          aria-label={`Notificações (${notifications})`}
          className="relative rounded-full bg-card/70 p-2 backdrop-blur-sm transition-colors hover:text-secondary-blue"
        >
          <Bell className="size-5" strokeWidth={1.75} />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full border-2 border-background bg-destructive text-[10px] font-bold text-white">
              {notifications}
            </span>
          )}
        </button>
        <button
          type="button"
          aria-label="Menu do usuário"
          className="flex items-center gap-2 rounded-full bg-card/80 px-3 py-1.5 shadow-sm backdrop-blur-sm"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {userInitials}
          </span>
          <ChevronDown className="size-4" />
        </button>
      </div>
    </header>
  );
}

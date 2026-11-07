import { useNavigate } from 'react-router';

import { Logo } from '@/components/brand/logo';
import { InstallAppButton } from '@/features/pwa/install-app-button';

const field =
  'h-12 w-full rounded-xl border border-input bg-card px-4 text-base outline-none focus-visible:ring-3 focus-visible:ring-ring/40';

/**
 * Painel de login (casca visual provisória): ainda não há autenticação no sistema.
 * Ao integrar a API, trocar o onSubmit pelo fluxo real de login.
 */
export function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-dvh items-center justify-center bg-surface-mobile px-4 py-8 pt-[max(2rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))]">
      <main className="flex w-full max-w-sm flex-col items-center gap-6">
        <Logo />
        <form
          className="flex w-full flex-col gap-4 rounded-2xl bg-card p-5 shadow-[0_2px_12px_rgb(0_0_0/0.06)]"
          onSubmit={(event) => {
            event.preventDefault();
            void navigate('/');
          }}
        >
          <h1 className="text-xl font-extrabold">Entrar</h1>
          <label className="flex flex-col gap-1.5 text-sm font-semibold">
            E-mail
            <input type="email" autoComplete="username" required className={field} />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold">
            Senha
            <input type="password" autoComplete="current-password" required className={field} />
          </label>
          <button
            type="submit"
            className="min-h-12 rounded-xl bg-primary px-6 font-bold text-primary-foreground"
          >
            Entrar
          </button>
        </form>
        <InstallAppButton />
      </main>
    </div>
  );
}

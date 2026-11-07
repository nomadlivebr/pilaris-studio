import { cn } from '@/lib/utils';

import { type ServiceState, useSystemStatus } from './use-system-status';

const stateLabel: Record<ServiceState, string> = {
  checking: 'Verificando',
  online: 'Operacional',
  offline: 'Indisponível',
};

function StatusDot({ state }: { state: ServiceState }) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-block size-2 rounded-full',
        state === 'online' && 'bg-turquoise shadow-[0_0_0_3px_rgb(0_213_197/0.18)]',
        state === 'offline' && 'bg-destructive',
        state === 'checking' && 'animate-pulse bg-brand-muted',
      )}
    />
  );
}

function StatusRow({ label, state }: { label: string; state: ServiceState }) {
  return (
    <div className="flex items-center justify-between gap-6 py-3">
      <span className="text-sm text-brand-muted">{label}</span>
      <span className="flex items-center gap-2 text-sm font-medium text-brand-foreground">
        <StatusDot state={state} />
        {stateLabel[state]}
      </span>
    </div>
  );
}

/** Painel com o estado real dos serviços, obtido dos endpoints /health da API. */
export function SystemStatusPanel() {
  const status = useSystemStatus();

  return (
    <section
      aria-label="Status dos serviços"
      className="w-full rounded-lg border border-white/10 bg-brand-raised/70 p-5 backdrop-blur"
    >
      <header className="flex items-center justify-between">
        <h2 className="text-xs font-semibold tracking-[0.18em] text-brand-muted uppercase">
          Status do sistema
        </h2>
        {status.apiVersion && (
          <span className="font-mono text-xs text-brand-muted">v{status.apiVersion}</span>
        )}
      </header>
      <div className="mt-2 divide-y divide-white/10">
        <StatusRow label="API" state={status.api} />
        <StatusRow label="Banco de dados" state={status.database} />
      </div>
    </section>
  );
}

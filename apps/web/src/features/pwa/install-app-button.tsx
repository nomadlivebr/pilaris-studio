import { Download } from 'lucide-react';
import { Link } from 'react-router';

import { cn } from '@/lib/utils';

import { promptInstall, useInstallState } from './install-store';

/**
 * Botão discreto "Instalar app no dispositivo". Com prompt nativo disponível instala na hora;
 * caso contrário leva à página /instalar. Some quando o app já está instalado.
 */
export function InstallAppButton({ className }: { className?: string }) {
  const { canPrompt, installed } = useInstallState();
  if (installed) return null;

  const classes = cn(
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-secondary-blue/30 bg-secondary-blue/10 px-4 text-sm font-semibold text-secondary-blue transition-colors active:bg-secondary-blue/20',
    className,
  );
  const content = (
    <>
      <Download className="size-4" strokeWidth={2} /> Instalar app no dispositivo
    </>
  );

  return canPrompt ? (
    <button type="button" className={classes} onClick={() => void promptInstall()}>
      {content}
    </button>
  ) : (
    <Link to="/instalar" className={classes}>
      {content}
    </Link>
  );
}

import { cn } from '@/lib/utils';

import { LogoMark } from './logo-mark';

interface LogoProps {
  className?: string;
  /** "light" para fundos escuros, "dark" para fundos claros. */
  tone?: 'light' | 'dark';
}

export function Logo({ className, tone = 'dark' }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <LogoMark className="size-8" />
      <span
        className={cn(
          'flex flex-col leading-none',
          tone === 'light' ? 'text-brand-foreground' : 'text-foreground',
        )}
      >
        <span className="text-[0.95rem] font-semibold tracking-[0.28em]">PILARIS</span>
        <span
          className={cn(
            'mt-1 text-[0.62rem] font-medium tracking-[0.5em]',
            tone === 'light' ? 'text-turquoise' : 'text-secondary-blue',
          )}
        >
          STUDIO
        </span>
      </span>
    </span>
  );
}

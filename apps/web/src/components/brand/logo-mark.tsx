import { useId } from 'react';

import { cn } from '@/lib/utils';

interface LogoMarkProps {
  className?: string;
  title?: string;
}

/**
 * Símbolo "P" do Pilaris Studio em degradê azul → turquesa.
 * Representação vetorial provisória: substituir pelo arquivo oficial da logo
 * quando disponível (manter o mesmo componente para não alterar as telas).
 */
export function LogoMark({ className, title = 'Pilaris Studio' }: LogoMarkProps) {
  const gradientId = useId();

  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label={title}
      className={cn('size-9 shrink-0', className)}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="8"
          y1="42"
          x2="40"
          y2="6"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#087FAD" />
          <stop offset="1" stopColor="#00D5C5" />
        </linearGradient>
      </defs>
      <path
        d="M14 42V9.5h12.25a10.75 10.75 0 0 1 0 21.5H14"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="7"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

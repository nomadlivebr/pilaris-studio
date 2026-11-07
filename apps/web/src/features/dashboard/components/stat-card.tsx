import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  /** Classes de degradê do Tailwind (ex.: "from-primary to-secondary-blue"). */
  gradient: string;
  change: string;
  changeUp?: boolean;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  gradient,
  change,
  changeUp = true,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r px-5 py-4 text-white opacity-95 shadow-lg backdrop-blur-sm',
        gradient,
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 400 150"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 size-full opacity-20"
      >
        <path d="M0,50 C150,150 250,0 400,50 L400,150 L0,150 Z" fill="white" />
      </svg>

      <div className="relative z-10 flex items-center gap-4">
        <span className="rounded-full bg-white/20 p-2.5 backdrop-blur-sm">
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm font-medium opacity-90">{title}</p>
        </div>
      </div>

      <span className="relative z-10 mt-1 self-start rounded-full bg-white/20 px-2 py-1 text-xs font-semibold backdrop-blur-sm">
        {changeUp ? '↑' : '↓'} {change}
      </span>
    </div>
  );
}

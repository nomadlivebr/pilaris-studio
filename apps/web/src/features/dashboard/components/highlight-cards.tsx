import { CheckCircle2, Flower2, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MiniMetricProps {
  icon: LucideIcon;
  iconClassName: string;
  label: string;
  value: string;
  caption: string;
  /** Alturas (classes h-*) das barras, da mais antiga para a mais recente. */
  bars: readonly string[];
  barClassName: string;
}

function MiniMetric({
  icon: Icon,
  iconClassName,
  label,
  value,
  caption,
  bars,
  barClassName,
}: MiniMetricProps) {
  return (
    <Card className="flex-row items-center justify-between gap-0 rounded-2xl p-4">
      <div className="flex items-center gap-4">
        <span className={cn('rounded-full p-3', iconClassName)}>
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        <div>
          <p className="text-sm font-semibold text-muted-foreground">{label}</p>
          <p className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{value}</span>
            <span className="text-xs text-muted-foreground">{caption}</span>
          </p>
        </div>
      </div>
      <div aria-hidden className="flex h-8 items-end gap-1">
        {bars.map((height, i) => (
          <span
            key={i}
            className={cn('w-1.5 rounded-t-sm', height, barClassName)}
            style={{ opacity: 0.35 + i * 0.15 }}
          />
        ))}
      </div>
    </Card>
  );
}

export function HighlightCards() {
  return (
    <div className="grid grid-cols-1 shrink-0 gap-4 md:grid-cols-3">
      <MiniMetric
        icon={Star}
        iconClassName="bg-secondary-blue/15 text-secondary-blue"
        label="Novos alunos"
        value="+12"
        caption="este mês"
        bars={['h-3', 'h-5', 'h-4', 'h-6', 'h-8']}
        barClassName="bg-secondary-blue"
      />
      <MiniMetric
        icon={CheckCircle2}
        iconClassName="bg-success/15 text-success"
        label="Avaliações pendentes"
        value="8"
        caption="para responder"
        bars={['h-4', 'h-2', 'h-5', 'h-7', 'h-8']}
        barClassName="bg-success"
      />

      <Card className="relative flex-row items-center justify-between gap-0 overflow-hidden rounded-2xl border-0 bg-gradient-to-r from-secondary-blue/15 to-turquoise/15 p-4">
        <div className="relative z-10">
          <p className="text-sm font-bold">Cuide do corpo, fortaleça a mente!</p>
          <p className="mt-1 text-xs text-muted-foreground">Seu estúdio cada vez mais completo.</p>
        </div>
        <Flower2 aria-hidden className="relative z-10 size-10 text-turquoise" strokeWidth={1.5} />
        <span
          aria-hidden
          className="absolute -right-10 -bottom-10 size-32 rounded-full bg-white/40 blur-xl"
        />
      </Card>
    </div>
  );
}

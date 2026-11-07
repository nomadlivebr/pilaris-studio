import { AlertCircle, ArrowRight, CreditCard, DollarSign, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FinanceItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  iconClassName: string;
  badge?: string;
}

function FinanceItem({ icon: Icon, label, value, iconClassName, badge }: FinanceItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span className={cn('rounded-full p-2.5', iconClassName)}>
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        <div>
          <p className="text-xl font-bold">{value}</p>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
        </div>
      </div>
      {badge && (
        <span className="inline-flex w-max items-center rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">
          {badge}
        </span>
      )}
    </div>
  );
}

export function FinanceSummary() {
  return (
    <Card className="shrink-0 gap-0 rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <TrendingUp className="size-5 text-secondary-blue" /> Financeiro
        </h2>
        <Link
          to="/financeiro"
          className="flex items-center gap-1 text-sm font-semibold text-secondary-blue hover:underline"
        >
          Ver detalhes <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:divide-x sm:divide-border">
        <FinanceItem
          icon={DollarSign}
          label="Receita do mês"
          value="R$ 24.850,50"
          iconClassName="bg-secondary-blue/15 text-secondary-blue"
          badge="↑ 12%"
        />
        <div className="sm:pl-6">
          <FinanceItem
            icon={CreditCard}
            label="Mensalidades pendentes"
            value="R$ 3.420,00"
            iconClassName="bg-amber-100 text-amber-600"
          />
        </div>
        <div className="sm:pl-6">
          <FinanceItem
            icon={AlertCircle}
            label="Pagamentos atrasados"
            value="R$ 1.250,00"
            iconClassName="bg-destructive/10 text-destructive"
          />
        </div>
      </div>
    </Card>
  );
}

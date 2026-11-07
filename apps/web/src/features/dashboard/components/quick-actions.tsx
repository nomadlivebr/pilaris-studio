import { Briefcase, Calendar, DollarSign, Star, Store, Users, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router';

import { Card } from '@/components/ui/card';

interface QuickAction {
  label: string;
  to: string;
  icon: LucideIcon;
  iconClassName: string;
}

const actions: readonly QuickAction[] = [
  {
    label: 'Agenda',
    to: '/agenda',
    icon: Calendar,
    iconClassName: 'bg-secondary-blue/15 text-secondary-blue',
  },
  { label: 'Alunos', to: '/alunos', icon: Users, iconClassName: 'bg-sky-100 text-sky-600' },
  {
    label: 'Colaboradores',
    to: '/colaboradores',
    icon: Briefcase,
    iconClassName: 'bg-success/15 text-success',
  },
  { label: 'Studios', to: '/studios', icon: Store, iconClassName: 'bg-amber-100 text-amber-600' },
  {
    label: 'Avaliações',
    to: '/avaliacoes',
    icon: Star,
    iconClassName: 'bg-indigo-100 text-indigo-600',
  },
  {
    label: 'Financeiro',
    to: '/financeiro',
    icon: DollarSign,
    iconClassName: 'bg-pink-100 text-pink-600',
  },
];

export function QuickActions() {
  return (
    <Card className="min-h-0 flex-1 gap-0 rounded-2xl p-4">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
        <Zap className="size-5 text-secondary-blue" /> Ações rápidas
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {actions.map(({ label, to, icon: Icon, iconClassName }) => (
          <Link
            key={to}
            to={to}
            className="flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-muted p-3 transition-colors hover:bg-secondary focus-visible:ring-3 focus-visible:outline-none"
          >
            <span className={`rounded-xl p-2 ${iconClassName}`}>
              <Icon className="size-5" strokeWidth={1.75} />
            </span>
            <span className="text-xs font-semibold text-muted-foreground">{label}</span>
          </Link>
        ))}
      </div>
    </Card>
  );
}

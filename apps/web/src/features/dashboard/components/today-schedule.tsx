import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type ClassStatus = 'Confirmada' | 'Lotada' | 'Disponível';

interface ScheduleEntry {
  time: string;
  title: string;
  students: number;
  maxStudents: number;
  status: ClassStatus;
}

const statusStyles: Record<ClassStatus, { badge: string; line: string }> = {
  Confirmada: { badge: 'bg-success/15 text-success', line: 'bg-success' },
  Lotada: { badge: 'bg-amber-100 text-amber-700', line: 'bg-amber-500' },
  Disponível: { badge: 'bg-secondary-blue/15 text-secondary-blue', line: 'bg-secondary-blue' },
};

// Dados provisórios até a integração com o módulo de agenda.
const todayClasses: readonly ScheduleEntry[] = [
  { time: '07:00', title: 'Pilates Solo', students: 8, maxStudents: 10, status: 'Confirmada' },
  { time: '08:00', title: 'Pilates Solo', students: 10, maxStudents: 10, status: 'Lotada' },
  { time: '09:00', title: 'Pilates Solo', students: 7, maxStudents: 10, status: 'Confirmada' },
  { time: '10:00', title: 'Pilates Solo', students: 6, maxStudents: 10, status: 'Disponível' },
];

export function TodaySchedule() {
  return (
    <Card className="shrink-0 gap-0 rounded-2xl p-4">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Calendar className="size-5 text-secondary-blue" /> Agenda de hoje
        </h2>
        <Link
          to="/agenda"
          className="flex items-center gap-1 text-sm font-semibold text-secondary-blue hover:underline"
        >
          Ver todas <ArrowRight className="size-4" />
        </Link>
      </div>

      <ul className="flex flex-col divide-y divide-border">
        {todayClasses.map((entry) => (
          <li key={entry.time} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-4">
              <span className="w-12 text-sm font-bold text-muted-foreground">{entry.time}</span>
              <span className={cn('h-8 w-1 rounded-full', statusStyles[entry.status].line)} />
              <div>
                <p className="text-sm font-bold">{entry.title}</p>
                <p className="text-xs text-muted-foreground">
                  {entry.students} / {entry.maxStudents} alunos
                </p>
              </div>
            </div>
            <span
              className={cn(
                'rounded-full px-3 py-1 text-[10px] font-bold',
                statusStyles[entry.status].badge,
              )}
            >
              {entry.status}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

import {
  BarChart3,
  Briefcase,
  Calendar,
  DollarSign,
  Home,
  type LucideIcon,
  Settings,
  Star,
  Store,
  UserCircle,
  Users,
} from 'lucide-react';

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

/** Itens do menu lateral do painel, na ordem de exibição. */
export const mainNavigation: readonly NavItem[] = [
  { label: 'Início', to: '/', icon: Home },
  { label: 'Agenda', to: '/agenda', icon: Calendar },
  { label: 'Alunos', to: '/alunos', icon: Users },
  { label: 'Colaboradores', to: '/colaboradores', icon: Briefcase },
  { label: 'Usuários', to: '/usuarios', icon: UserCircle },
  { label: 'Studios', to: '/studios', icon: Store },
  { label: 'Avaliações', to: '/avaliacoes', icon: Star },
  { label: 'Financeiro', to: '/financeiro', icon: DollarSign },
  { label: 'Relatórios', to: '/relatorios', icon: BarChart3 },
  { label: 'Configurações', to: '/configuracoes', icon: Settings },
];

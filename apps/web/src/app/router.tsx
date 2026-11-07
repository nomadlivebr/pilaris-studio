import { createBrowserRouter } from 'react-router';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { RootLayout } from '@/components/layout/root-layout';
import { mainNavigation } from '@/config/navigation';
import { DashboardPage } from '@/pages/dashboard/dashboard-page';
import { HomePage } from '@/pages/home/home-page';
import { InstallPage } from '@/pages/install/install-page';
import { LoginPage } from '@/pages/login/login-page';
import { ModulePlaceholderPage } from '@/pages/module-placeholder/module-placeholder-page';
import { NotFoundPage } from '@/pages/not-found/not-found-page';

/** Rotas do painel. Novos módulos (Fase 2+) substituem os placeholders do menu. */
export const router = createBrowserRouter([
  {
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      ...mainNavigation
        .filter((item) => item.to !== '/')
        .map((item) => ({ path: item.to, element: <ModulePlaceholderPage /> })),
    ],
  },
  // Páginas de tela cheia, sem o menu do painel.
  { path: 'login', element: <LoginPage /> },
  { path: 'instalar', element: <InstallPage /> },
  {
    // Página institucional da Fase 1, mantida fora do painel.
    element: <RootLayout />,
    children: [
      { path: 'fundacao', element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

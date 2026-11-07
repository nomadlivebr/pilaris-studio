import { Outlet } from 'react-router';

import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

export function RootLayout() {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

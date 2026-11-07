import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';

import { router } from './app/router';
import { initInstallStore } from './features/pwa/install-store';
import { registerServiceWorker } from './features/pwa/register-service-worker';

// Antes de montar o React: o beforeinstallprompt pode disparar cedo.
initInstallStore();
registerServiceWorker();

const container = document.getElementById('root');
if (!container) {
  throw new Error('Elemento #root não encontrado em index.html');
}

createRoot(container).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

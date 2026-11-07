/** Registra o service worker somente em produção (em dev, o cache atrapalharia o HMR). */
export function registerServiceWorker() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((error: unknown) => {
      console.error('Falha ao registrar o service worker', error);
    });
  });
}

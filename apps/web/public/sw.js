/* Service worker do Pilaris Studio: app shell offline + cache de assets estáticos.
 * Mude VERSION para invalidar os caches. Nunca intercepta /api nem outras origens. */
const VERSION = 'v1';
const SHELL_CACHE = `pilaris-shell-${VERSION}`;
const ASSET_CACHE = `pilaris-assets-${VERSION}`;

const PRECACHE = [
  '/',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png',
];

/** Extrai URLs /assets/... de um HTML (script/link) ou CSS (url(...)). */
const findAssetUrls = (text) =>
  [...text.matchAll(/(?:href|src)="(\/assets\/[^"]+)"|url\((\/assets\/[^)"']+)\)/g)].map(
    (m) => m[1] || m[2],
  );

async function precacheBuildAssets(cache) {
  const html = await (await fetch('/', { cache: 'reload' })).text();
  const urls = new Set(findAssetUrls(html));
  for (const url of [...urls]) {
    if (!url.endsWith('.css')) continue;
    const css = await (await fetch(url)).text();
    findAssetUrls(css).forEach((u) => urls.add(u));
  }
  await Promise.all([...urls].map((url) => cache.add(url).catch(() => undefined)));
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const shell = await caches.open(SHELL_CACHE);
      await shell.addAll(PRECACHE);
      await precacheBuildAssets(await caches.open(ASSET_CACHE));
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([SHELL_CACHE, ASSET_CACHE]);
      for (const key of await caches.keys()) {
        if (key.startsWith('pilaris-') && !keep.has(key)) await caches.delete(key);
      }
      await self.clients.claim();
    })(),
  );
});

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) (await caches.open(cacheName)).put(request, response.clone());
  return response;
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);
  return cached || network;
}

/** Navegação: rede primeiro; offline cai no app shell (SPA). */
async function navigate(request) {
  try {
    const response = await fetch(request);
    if (response.ok) (await caches.open(SHELL_CACHE)).put('/', response.clone());
    return response;
  } catch {
    return (await caches.match('/')) || Response.error();
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;
  if (url.pathname === '/sw.js') return;

  if (request.mode === 'navigate') {
    event.respondWith(navigate(request));
  } else if (/^\/(assets|icons|splash)\//.test(url.pathname)) {
    event.respondWith(cacheFirst(request, ASSET_CACHE));
  } else {
    event.respondWith(staleWhileRevalidate(request, SHELL_CACHE));
  }
});

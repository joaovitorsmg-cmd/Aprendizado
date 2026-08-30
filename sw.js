const CACHE_VERSION = 'alfabetizando-v2';
// Arquivos que quase nunca mudam (ícones) usam "cache primeiro" para abrir
// instantâneo. HTML/manifest usam "rede primeiro" (ver fetch abaixo) para
// que correções enviadas cheguem no próximo acesso, com o cache só como
// reserva para uso offline.
const NETWORK_FIRST = ['./', './index.html', './manifest.webmanifest'];
const CACHE_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-48.png',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-192.png',
  './icons/icon-256.png',
  './icons/icon-384.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(CACHE_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

function cachePut(request, response) {
  if (response && response.status === 200 && response.type === 'basic') {
    caches.open(CACHE_VERSION).then((cache) => cache.put(request, response.clone()));
  }
  return response;
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const filename = './' + (url.pathname.split('/').pop() || '');
  const isNetworkFirst = event.request.mode === 'navigate' || NETWORK_FIRST.includes(filename);

  if (isNetworkFirst) {
    event.respondWith(
      fetch(event.request)
        .then((response) => cachePut(event.request, response))
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => cachePut(event.request, response));
    })
  );
});

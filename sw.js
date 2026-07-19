// Annapurna Muhim — service worker
// Bumps CACHE_NAME whenever index.html (or anything precached) changes, so
// returning users get the update instead of a stale cached copy.
const CACHE_NAME = 'annapurna-muhim-v1';

const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-384.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Strategy:
//  - Same-origin (the form itself, icons, manifest): cache-first, so the
//    form opens instantly and works fully offline once installed.
//  - Cross-origin (Google Fonts, html2canvas/jsPDF/xlsx CDN scripts):
//    stale-while-revalidate, so it works offline after the first successful
//    online load, but quietly re-fetches a fresh copy in the background
//    when online.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req))
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(req).then((cached) => {
        const fetchPromise = fetch(req).then((networkResp) => {
          cache.put(req, networkResp.clone());
          return networkResp;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    )
  );
});

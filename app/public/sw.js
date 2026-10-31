// ART AI Progressive Web App Service Worker (Network-First Auto-Update Strategy)
const CACHE_VERSION = 'art-ai-v2.6-live-' + Date.now();
const STATIC_ASSETS = [
  '/teacher.jpg',
  '/teacher_female.jpg',
  '/manifest.json'
];

// Install: Cache essential assets & take over immediately
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Pre-cache non-fatal error:', err);
      });
    })
  );
});

// Activate: Purge ALL previous versions of cache and claim clients immediately
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_VERSION) {
            console.log('Xóa bộ nhớ đệm cũ:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Listen for SKIP_WAITING from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch: NEVER cache index.html or navigation requests with Cache-First!
// Always fetch HTML / navigation from network so user gets the latest build automatically.
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // 1. Bypass dynamic API calls
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // 2. Navigation / HTML Document requests: NETWORK FIRST
  if (
    e.request.mode === 'navigate' ||
    e.request.destination === 'document' ||
    url.pathname === '/' ||
    url.pathname.endsWith('.html')
  ) {
    e.respondWith(
      fetch(e.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(e.request, clone));
          }
          return networkResponse;
        })
        .catch(() => {
          // Fallback to cached index.html only when user is completely offline
          return caches.match('/index.html') || caches.match('/');
        })
    );
    return;
  }

  // 3. Static assets & scripts: Stale-While-Revalidate or Network-First
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      const fetchPromise = fetch(e.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(e.request, clone));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      // Return cached immediately if available, otherwise wait for network
      return cachedResponse || fetchPromise;
    })
  );
});

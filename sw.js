const CACHE_NAME = 'ok-distributor-v5';
const URLS_TO_CACHE = [
  '/',
  'index.html',
  'index.css',
  'manifest.json',
  '/icons/app-icon.svg'
];



// Fetch
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Never handle non-GET (let browser send credentials/csrf untouched)
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Network-first for API and auth routes
  const isAPI = url.pathname.startsWith("/api/") || url.pathname.startsWith("/auth/");
  if (isAPI) {
    event.respondWith(
      fetch(req, { credentials: "include" }).catch(() => caches.match(req))
    );
    return;
  }

  // For navigations: try network then cache (prevents serving a cached 403 page)
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match("/index.html"))
    );
    return;
  }

  // Cache-first for static assets (same-origin only)
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          if (res && res.status === 200 && res.type === "basic") {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, copy));
          }
          return res;
        });
      })
    );
  }
});

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(STATIC_ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});
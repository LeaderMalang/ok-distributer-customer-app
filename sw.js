const CACHE_NAME = 'ok-distributor-v5';
const URLS_TO_CACHE = [
  '/',
  'index.html',
  'index.css',
  'manifest.json',
  '/icons/app-icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Add all URLs to the cache, but don't fail the install if one of them fails
        // This is more robust, especially for non-essential icons.
        return cache.addAll(URLS_TO_CACHE).catch(err => {
            console.warn('SW: Not all files were cached on install', err);
        });
      })
  );
});

self.addEventListener('fetch', (event) => {
  // Use a "Network falling back to cache" strategy
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // If the fetch is successful, clone the response, cache it, and return it.
        // This is important to keep the cache up-to-date.
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // If the network request fails (e.g., offline),
        // try to serve the response from the cache.
        return caches.match(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Delete old caches
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
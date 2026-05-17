/* KRYA GLOBAL - Service Worker for Offline-First Power v1.0 */
// यह फाइल इंटरनेट न होने पर भी KRYA को ऐप की तरह चलाएगी

const CACHE_NAME = 'krya-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/js/auth.js'
];

// इंस्टॉल करना और फाइलों को सेव (Cache) करना
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('KRYA Service Worker: Caching Files');
      return cache.addAll(ASSETS);
    })
  );
});

// बिना इंटरनेट के सेव की गई फाइलें दिखाना
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

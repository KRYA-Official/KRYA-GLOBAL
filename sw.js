const CACHE_NAME = 'krya-global-v1';
const urlsToCache = [
  './dashboard.html',
  './vyapar-rath.html',
  './nano-mart.html',
  './nyay-rakshak.html',
  './jan-sabha.html',
  './imaandari-score.html'
];

// इंस्टॉल इवेंट: जब ऐप पहली बार लोड होता है
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('KRYA इंजन: फाइलें सुरक्षित की जा रही हैं');
        return cache.addAll(urlsToCache);
      })
  );
});

// फ़ेच (Fetch) इवेंट: यह ऐप को इंस्टॉल करने की अनुमति देने के लिए ज़रूरी है
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // अगर फाइल कैशे में है तो वहाँ से दें, नहीं तो इंटरनेट से लाएं
        return response || fetch(event.request);
      })
  );
});

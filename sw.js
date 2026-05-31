const CACHE_NAME = 'krya-global-app-v1';
const urlsToCache = [
    './',
    './index.html',
    './css/style.css',
    './manifest.json',
    './kisan-setu.html',
    './deals.html',
    './messenger.html',
    './education.html',
    './digital.html',
    './jobs.html',
    './health.html',
    './bazaar.html',
    './news.html',
    './mahila.html',
    './panchayat.html',
    './wallet.html',
    './suraksha.html',
    './sahayata.html'
];

// इंस्टॉल इवेंट - सभी महत्वपूर्ण फाइलों को फोन में सेव (Cache) करना
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('KRYA की 100% लीगल फाइल्स कैश हो रही हैं...');
                return cache.addAll(urlsToCache);
            })
    );
});

// फेच इवेंट - ऐप को रॉकेट की स्पीड से खोलना
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // अगर फाइल कैश में है तो तुरंत खोलें, नहीं तो इंटरनेट से लें
                return response || fetch(event.request);
            })
    );
});

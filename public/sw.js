// Service Worker para PWA
const CACHE_NAME = 'neurodespertar-v1';
const urlsToCache = [
    '/',
    '/manifest.webmanifest',
    '/favicon.ico',
    '/apple-touch-icon-180x180.png',
];

// Instalar Service Worker
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// Interceptar requests
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Retornar desde cache si está disponible
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});

// Activar Service Worker
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
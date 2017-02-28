'use strict';

importScripts('/cache-polyfill.js');

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://github.com/LianyuMa/hello-world-pwa')
  );
});

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('helloworldpwa').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/index.html?homescreen=1',
        '/?homescreen=1',
      ]);
    })
    .then(function() {self.skipWaiting()});
  );
});


self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

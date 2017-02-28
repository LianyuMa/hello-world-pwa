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
  );
});

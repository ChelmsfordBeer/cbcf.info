'use strict';

var cacheVersion = 7;
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};
const offlineUrl = 'offline-page.html';

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
      return cache.addAll([
        'https://cbcf.info/css/fontawesome-all.css',
        'https://cbcf.info/css/bootstrap.css',
        'https://cbcf.info/css/mdb.css',
        'https://cbcf.info/css/style.css',
        'https://cbcf.info/js/jquery.min.js',
        'https://cbcf.info/js/popper.min.js',
        'https://cbcf.info/js/bootstrap.js',
        'https://cbcf.info/js/mdb.min.js',
        'https://cbcf.info/js/zenscroll-min.js',
        'https://cbcf.info/js/webp.js',
        'https://cbcf.info/img/home/winter.webp',
        'https://cbcf.info/img/home/winter.png',
        offlineUrl
      ]);
    })
  );
});

this.addEventListener('fetch', event => {
  // request.mode = navigate isn't supported in all browsers
  // so include a check for Accept: text/html header.
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request.url).catch(error => {
        // Return the offline page
        return caches.match(offlineUrl);
      })
    );
  } else {
    // Respond with everything else if we can
    event.respondWith(caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
    );
  }
});

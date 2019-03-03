'use strict';

var cacheVersion = 14;
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};
const offlineUrl = 'offline-page.html';

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
      //Contains assets used for app - when site is offline it will redirect to webapp instead of current offline page in future release
      return cache.addAll([
        'https://cbcf.info/css/bootstrap.css',
        'https://cbcf.info/css/mdb.css',
        'https://cbcf.info/css/custom.css',
        'https://cbcf.info/css/all.css',
        'https://cbcf.info/js/jquery.min.js',
        'https://cbcf.info/js/popper.min.js',
        'https://cbcf.info/js/bootstrap.js',
        'https://cbcf.info/js/mdb.min.js',
        'https://cbcf.info/js/zenscroll-min.js',
        'https://cbcf.info/js/webp.js',
        'https://cbcf.info/img/home/winter.webp',
        'https://cbcf.info/img/home/winter.png',
        'https://cbcf.info/webfonts/fa-brands-400.eot',
        'https://cbcf.info/webfonts/fa-brands-400.svg',
        'https://cbcf.info/webfonts/fa-brands-400.ttf',
        'https://cbcf.info/webfonts/fa-brands-400.woff',
        'https://cbcf.info/webfonts/fa-brands-400.woff2',
        'https://cbcf.info/webfonts/fa-light-300.eot',
        'https://cbcf.info/webfonts/fa-light-300.svg',
        'https://cbcf.info/webfonts/fa-light-300.ttf',
        'https://cbcf.info/webfonts/fa-light-300.woff',
        'https://cbcf.info/webfonts/fa-light-300.woff2',
        'https://cbcf.info/webfonts/fa-regular-400.eot',
        'https://cbcf.info/webfonts/fa-regular-400.svg',
        'https://cbcf.info/webfonts/fa-regular-400.ttf',
        'https://cbcf.info/webfonts/fa-regular-400.woff',
        'https://cbcf.info/webfonts/fa-regular-400.woff2',
        'https://cbcf.info/webfonts/fa-solid-900.eot',
        'https://cbcf.info/webfonts/fa-solid-900.svg',
        'https://cbcf.info/webfonts/fa-solid-900.ttf',
        'https://cbcf.info/webfonts/fa-solid-900.woff',
        'https://cbcf.info/webfonts/fa-solid-900.woff2',
        offlineUrl
      ]); //Need to add additional pages/assets if required for datatable drinks list
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

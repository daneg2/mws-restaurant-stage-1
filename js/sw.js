//name of cache and urls to be cached
var cacheName = 'cache-v1';
var urlsToCache = [
    '/',
    'js/dbhelper.js',
    'js/main.js',
    'js/restaurant_info.js',
    'css/styles.css',
    'data/restaurants.json',
    'restaurant.html'
];

//install service worker/open cache/cache files/confirm whether cached or not
self.addEventListener('install', function(event) {

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

//if find what need in cache, return
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response){
            return response || fetch(event.request);
        })
    );
});


//updating cache
self.addEventListener('activate', function(event) {

    var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];
  
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });



//   self.addEventListener('activate', function(event) {
//       event.waitUntil(
//         caches.delete('cache-v1')
//       );
//   })
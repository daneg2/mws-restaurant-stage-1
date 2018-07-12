//name of cache and urls to be cached
var cacheName = 'cache-v3';
var urlsToCache = [
  '/',
  '/css/styles.css',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/restaurant.html'

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
  console.log('found what need');
    event.respondWith(
        caches.match(event.request).then(function(response){
          
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['cache-v3'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
        if (cacheWhitelist.indexOf(cacheName) === -1) {
          return caches.delete(cacheName);
        }
      }));
    })
  );
});

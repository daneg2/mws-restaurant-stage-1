//name of cache and urls to be cached
var cacheName = 'cache-v1';
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
    event.respondWith(
        caches.match(event.request).then(function(response){
          
            return response || fetch(event.request);
        })
    );
});

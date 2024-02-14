// const version = "1";
// const cacheName = `Cache-me-outside-${version}`;

// self.addEventListener("install", (ev) => {
//   ev.waitUntil(
//     caches.open(cacheName).then((cache) => {
//       return cache.addAll([]);
//     })
//   );
// });

// self.addEventListener("activate", (ev) => {});

// self.addEventListener("fetch", (ev) => {
//   ev.respondWith(cacheFirst(ev));
// });

// self.addEventListener("message", (ev) => {
//   sendMessage(ev.data.hash);
// });

// function cacheFirst(ev) {
//   return caches.match(ev.request).then((cacheResponse) => {
//     return (
//       cacheResponse ||
//       fetch(ev.request).then((fetchResponse) => {
//         const responseToCache = fetchResponse.clone();
//         caches.open(cacheName).then((cache) => {
//           cache.put(ev.request, responseToCache);
//         });
//         return fetchResponse;
//       })
//     );
//   });
// }

// function sendMessage(hash) {
//   self.clients.matchAll().then((clients) => {
//     clients.forEach((client) => {
//       client.postMessage({ hash });
//     });
//   });
// }

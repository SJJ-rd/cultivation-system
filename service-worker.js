const CACHE = "cultivation-system-dojo-v1";
const ASSETS = [
  "./","./index.html","./style.css","./app.js","./manifest.json",
  "./modules/storage.js","./modules/sound.js","./modules/kowtow.js","./modules/ritual.js","./modules/meditation.js","./modules/zhancha.js",
  "./assets/icon.svg"
];
self.addEventListener("install", e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener("fetch", e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));

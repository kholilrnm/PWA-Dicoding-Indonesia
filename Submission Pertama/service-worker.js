const CACHE_NAME = "firstpwa-v2";
const urlsToCache = [
  "/",
  "/manifest.json",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/pages/login.html",
  "/css/materialize.min.css",
  "/css/materialize.css",
  "/css/style.css",
  "/images/produk/baju.png",
  "/images/produk/celana.jpeg",
  "/images/produk/jacket.jpg",
  "/images/produk/jamtangan.jpeg",
  "/images/produk/jas.png",
  "/images/produk/laptop.jpg",
  "/images/produk/pashmina.jpg",
  "/images/produk/sepatu.png",
  "/images/produk/topi.jpg",
  "/images/img-kholil.jpg",
  "/images/logo_icon_edit.png",
  "/images/logo_icon_splash_256.png",
  "/images/logo_icon_splash_512.png",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/regis-sw.js",
  "/service-worker.js",
  "https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css",
  "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://code.getmdl.io/1.3.0/material.grey-pink.min.css",
  "https://code.getmdl.io/1.3.0/material.min.js",
];
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request, { cacheName: CACHE_NAME }).then((response) => {
      if (response) {
        console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
        return response;
      }

      console.log(
        "ServiceWorker: Memuat aset dari server: ",
        event.request.url
      );
      return fetch(event.request);
    })
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`ServiceWorker: cache ${cacheName} dihapus`);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function () {
        console.log("Pendaftaran ServiceWorker berhasil");
      })
      .catch(function () {
        console.log("Pendaftaran ServiceWorker gagal");
      });
  });
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}

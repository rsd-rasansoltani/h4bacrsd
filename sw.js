self.addEventListener("install", function (event) {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  self.clients.claim();
});

self.addEventListener("push", function (event) {
  const data = event.data ? event.data.json() : {};

  const title = data.title || "H4baCrsd";
  const options = {
    body: data.body || "مطلب جدید منتشر شد",
    icon: "logo2.png",
    badge: "logo2.png",
    data: {
      url: data.url || "/"
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});

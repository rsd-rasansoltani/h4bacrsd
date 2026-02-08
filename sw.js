/* ===============================
   Service Worker – H4baCrsd
   =============================== */

self.addEventListener("install", function (event) {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});

/* ===============================
   PUSH NOTIFICATION
   =============================== */
self.addEventListener("push", function (event) {
  let data = {};

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { body: event.data.text() };
    }
  }

  const title = data.title || "H4baCrsd 📰";
  const options = {
    body: data.body || "خبر جدید منتشر شد",
    icon: "logo2.png",
    badge: "logo2.png",
    dir: "rtl",
    lang: "fa",
    vibrate: [200, 100, 200],
    data: {
      url: data.url || "/"
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

/* ===============================
   CLICK ON NOTIFICATION
   =============================== */
self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        for (let client of clientList) {
          if (client.url === event.notification.data.url && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data.url);
        }
      })
  );
});

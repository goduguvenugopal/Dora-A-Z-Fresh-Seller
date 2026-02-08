self.addEventListener("push", (event) => {
  if (!event.data) return;

  const data = event.data.json();

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/android-chrome-192x192.png",
    badge: "/apple-touch-icon.png",
    vibrate: [300, 100, 300, 100, 300],
    data: { url: data.url },
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || "/")
  );
});

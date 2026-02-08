self.addEventListener("push", (event) => {
  if (!event.data) return;

  const data = event.data.json();

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/logo.png",
    badge: "/badge.png",
    data: { url: data.url },
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || "/admin/orders")
  );
});

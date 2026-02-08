import React, { useEffect, useState } from "react";
import api from "../api/axios";

const NotificationToggle = () => {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  // check existing subscription on load
  useEffect(() => {
    const checkSubscription = async () => {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.getSubscription();
      if (sub) setEnabled(true);
    };
    checkSubscription();
  }, []);

  const enableNotifications = async () => {
    setLoading(true);

    const registration = await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
    });

    await api.post("/api/push/subscribe", {
      subscription,
      deviceInfo: {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
      },
    });

    setEnabled(true);
    setLoading(false);
  };

  const disableNotifications = async () => {
    setLoading(true);

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await api.post("/api/push/unsubscribe", {
        endpoint: subscription.endpoint,
      });

      await subscription.unsubscribe();
    }

    setEnabled(false);
    setLoading(false);
  };

  const handleToggle = async () => {
    if (enabled) {
      await disableNotifications();
    } else {
      await enableNotifications();
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md max-w-md">
      <div>
        <h3 className="text-sm font-semibold text-gray-800">
          Order Notifications
        </h3>
        <p className="text-xs text-gray-500">
          Get instant alerts for new orders & updates
        </p>
      </div>

      <button
        onClick={handleToggle}
        disabled={loading}
        className={`relative inline-flex h-7 w-14 items-center rounded-full transition ${
          enabled ? "bg-green-500" : "bg-gray-300"
        } ${loading && "opacity-60 cursor-not-allowed"}`}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
            enabled ? "translate-x-7" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default NotificationToggle;

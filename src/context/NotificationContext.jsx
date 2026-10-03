import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext(null);

const SEED_NOTIFICATIONS = [
  {
    id: 'notif_1',
    type: 'success', // 'success' | 'info' | 'warning' | 'alert'
    title: 'AI Growth Recommendation Ready',
    message: 'Vyralify AI detected an 82% retention spike on 7-second format in your niche. New script generated.',
    time: '14m ago',
    read: false,
    module: 'assistant'
  },
  {
    id: 'notif_2',
    type: 'info',
    title: 'New Lead Captured via DM Trigger',
    message: 'Follower @alex.creates commented "SCALE" on your latest Reel and received your store guide link.',
    time: '2h ago',
    read: false,
    module: 'automation'
  },
  {
    id: 'notif_3',
    type: 'warning',
    title: 'AI Credits Notice (80% Reached)',
    message: 'You have used 16 of your 20 daily AI credits. Your credits will automatically refresh in 6 hours.',
    time: '4h ago',
    read: true,
    module: 'billing'
  },
  {
    id: 'notif_4',
    type: 'success',
    title: 'Store Sale Completed',
    message: 'New order #VYR-8291 for "The Faceless Creator Guide" (+₹499) recorded in your Revenue Tracker.',
    time: '1d ago',
    read: true,
    module: 'store'
  }
];

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('vyralify_notifications');
    return saved ? JSON.parse(saved) : SEED_NOTIFICATIONS;
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('vyralify_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (notif) => {
    const newNotif = {
      id: 'notif_' + Date.now(),
      type: notif.type || 'info',
      title: notif.title,
      message: notif.message,
      time: 'Just now',
      read: false,
      module: notif.module || 'system'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      isOpen,
      setIsOpen,
      markAsRead,
      markAllAsRead,
      addNotification,
      removeNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used within a NotificationProvider");
  return context;
}

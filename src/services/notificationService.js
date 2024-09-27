/* eslint-disable import/order */

import { messaging } from './firebaseConfig';
import { onMessage } from 'firebase/messaging';

const createNotification = (title, options) => new Notification(title, options);

const showNotification = (title, options) => {
  if (Notification.permission !== 'granted') {
    console.log('Notifications are not permitted.');
    return;
  }
  createNotification(title, options);
};

const handleIncomingMessage = (payload) => {
  const notificationTitle = payload.notification?.title || 'Foreground Notification';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new message.',
    icon: '/firebase-logo.png',
  };

  showNotification(notificationTitle, notificationOptions);
};

onMessage(messaging, handleIncomingMessage);

export { showNotification, handleIncomingMessage };

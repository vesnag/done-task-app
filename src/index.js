/* eslint-disable import/order */
/* eslint-disable-next-line no-console */

import './styles/index.css';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import App from './components/App';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { messaging } from './services/firebaseConfig';
import { onMessage } from 'firebase/messaging';

const createNotification = (title, options) => new Notification(title, options);

const showNotification = (title, options) => {
  if (Notification.permission !== 'granted') {
    console.log('Notifications are not permitted.');
    return;
  }
  createNotification(title, options);
};

onMessage(messaging, (payload) => {
  const notificationTitle = payload.notification?.title || 'Foreground Notification';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new message.',
    icon: '/firebase-logo.png',
  };

  showNotification(notificationTitle, notificationOptions);
});

serviceWorkerRegistration.register();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

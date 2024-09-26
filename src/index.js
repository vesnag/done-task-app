import './styles/index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { onMessage } from 'firebase/messaging';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import App from './components/App';
import { messaging } from './services/firebaseConfig';

onMessage(messaging, (payload) => {
  console.log('Message received in foreground: ', payload);

  const notificationTitle = payload.notification?.title || 'Foreground Notification';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new message.',
    icon: '/firebase-logo.png',
  };

  if (Notification.permission === 'granted') {
    new Notification(notificationTitle, notificationOptions);
  } else {
    console.log('Notifications are not permitted.');
  }
});

serviceWorkerRegistration.register();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

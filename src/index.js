import './index.css';

import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Assuming service worker registration

import App from './App';
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { messaging } from './firebaseConfig'; // Import initialized messaging
import { onMessage } from 'firebase/messaging';

onMessage(messaging, (payload) => {
  console.log('Message received in foreground: ', payload);

  // Show a notification manually for foreground messages
  const notificationTitle = payload.notification?.title || 'Foreground Notification';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new message.',
    icon: '/firebase-logo.png', // Customize icon if needed
  };

  // Check if notifications are supported in the current browser
  if (Notification.permission === 'granted') {
    console.log('Notification permission are granted.');
    new Notification(notificationTitle, notificationOptions);
  } else {
    console.log('Notifications are not permitted.');
  }
});

// Register the service worker
serviceWorkerRegistration.register();  // Make sure to register the service worker here

// Use createRoot instead of ReactDOM.render
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

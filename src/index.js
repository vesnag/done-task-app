/* eslint-disable import/order */
/* eslint-disable-next-line no-console */

import './styles/index.css';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import App from './components/App';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { handleIncomingMessage } from './services/notificationService';
import { messaging } from './services/firebaseConfig';
import { onMessage } from 'firebase/messaging';

serviceWorkerRegistration.register();

onMessage(messaging, handleIncomingMessage);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

/* eslint-disable-next-line no-console */

const isLocalhost = Boolean(
  window.location.hostname === 'localhost'
  || window.location.hostname === '[::1]'
  || window.location.hostname.match(/^127(?:\.\d+){3}$/),
);

async function registerValidSW(swUrl, config) {
  try {
    const registration = await navigator.serviceWorker.register(swUrl);
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      if (!installingWorker) return;

      installingWorker.onstatechange = () => {
        if (installingWorker.state !== 'installed') return;

        if (navigator.serviceWorker.controller) {
          console.log('New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA.');
          config?.onUpdate?.(registration);
        } else {
          console.log('Content is cached for offline use.');
          config?.onSuccess?.(registration);
        }
      };
    };
  } catch (error) {
    console.error('Error during service worker registration:', error);
  }
}

async function checkValidServiceWorker(swUrl, config) {
  try {
    const response = await fetch(swUrl, { headers: { 'Service-Worker': 'script' } });
    const contentType = response.headers.get('content-type');

    if (response.status === 404 || (contentType && !contentType.includes('javascript'))) {
      const registration = await navigator.serviceWorker.ready;
      await registration.unregister();
      window.location.reload();
    } else {
      registerValidSW(swUrl, config);
    }
  } catch {
    console.log('No internet connection found. App is running in offline mode.');
  }
}

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) return;

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/firebase-messaging-sw.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);
        navigator.serviceWorker.ready.then(() => {
          console.log('This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA');
        });
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => registration.unregister())
      .catch((error) => console.error(error.message));
  }
}

const isLocalhost = Boolean(
  window.location.hostname === 'localhost'
  || window.location.hostname === '[::1]'
  || window.location.hostname.match(
    /^127(?:\.\d+){3}$/, // 127.0.0.1/8 is considered localhost for IPv4.
  ),
);

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      const reg = registration;
      reg.onupdatefound = () => {
        const installingWorker = reg.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state !== 'installed') {
            return;
          }

          if (navigator.serviceWorker.controller) {
            if (config && config.onUpdate) {
              config.onUpdate(reg);
            }
            return;
          }

          if (config && config.onSuccess) {
            config.onSuccess(reg);
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
  }
}

function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404
        || (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.',
      );
    });
}

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/firebase-messaging-sw.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);

        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service '
            + 'worker. To learn more, visit https://cra.link/PWA',
          );
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
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

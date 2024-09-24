const admin = require('firebase-admin');
const path = require('path');

// Adjust the path to point to your service account file relative to the project root
const serviceAccount = require(path.resolve(__dirname, '../service-account-key.json')); // Adjust the path if needed

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();

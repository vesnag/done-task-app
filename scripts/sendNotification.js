const admin = require('firebase-admin');

const serviceAccount = require('../service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const messaging = admin.messaging();

const sendHelloWorldNotification = async (fcmToken) => {
  const message = {
    notification: {
      title: 'Hello World!',
      body: 'This is a test notification from Firebase Cloud Messaging.',
    },
    token: fcmToken,
  };

  try {
    await messaging.send(message);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

const sendNotificationToAllUsers = async () => {
  try {
    const usersSnapshot = await db.collection('users').get();
    const tokens = [];

    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.fcmToken) {
        tokens.push(userData.fcmToken);
      }
    });

    if (tokens.length === 0) {
      console.log('No users with FCM tokens found.');
      return;
    }

    await Promise.all(tokens.map((token) => sendHelloWorldNotification(token)));
  } catch (error) {
    console.error('Error fetching users or sending notifications:', error);
  }
};

sendNotificationToAllUsers();

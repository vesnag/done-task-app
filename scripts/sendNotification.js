const path = require('path');

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require(path.resolve(__dirname, '../service-account-key.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const messaging = admin.messaging();

// Function to send "Hello World" notification
const sendHelloWorldNotification = async (fcmToken) => {
  const message = {
    notification: {
      title: 'Hello World!',
      body: 'This is a test notification from Firebase Cloud Messaging.',
    },
    token: fcmToken,
  };

  try {
    const response = await messaging.send(message);
    console.log('Successfully sent message:', response);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

// Function to fetch all FCM tokens and send notifications
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

    // Send notification to each token
    for (const token of tokens) {
      await sendHelloWorldNotification(token);
    }
  } catch (error) {
    console.error('Error fetching users or sending notifications:', error);
  }
};

// Call the function to send notifications to all users
sendNotificationToAllUsers();

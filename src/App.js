import React, { useEffect, useState } from 'react';
import { auth, db, googleProvider, messaging } from './firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { getToken, onMessage } from 'firebase/messaging';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

import TaskSubmissionForm from './TaskSubmissionForm';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        //requestNotificationPermission(result.user.uid);
      }
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('The popup was closed by the user before completing the sign-in.');
        // Optionally, you can show a message to the user here
      } else {
        console.error('Google login error:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const requestNotificationPermission = async (userId) => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        // Get the FCM token after the permission is granted
        getFcmToken(userId);
      } else {
        console.log('Unable to get permission to notify.');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const getFcmToken = async (userId) => {
    try {
      const currentToken = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_VAPID_KEY, // Access VAPID key from .env
      });
      if (currentToken) {
        console.log('FCM Token:', currentToken);
        // Save the FCM token to your server or Firestore for later use
        saveTokenToServer(userId, currentToken);
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    } catch (error) {
      console.error('An error occurred while retrieving FCM token:', error);
    }
  };

  const saveTokenToServer = async (userId, token) => {
    try {
      await setDoc(doc(db, 'users', userId), {
        fcmToken: token,
      });
      console.log('FCM Token saved to server.');
    } catch (error) {
      console.error('Error saving FCM token to server:', error);
    }
  };

  // Handle foreground messages (when the app is open and a notification is received)
  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log('Message received in foreground: ', payload);
      // Optionally display notification or handle the message here
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-5 font-sans pt-12">
      {user ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.displayName}!</h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 mt-5 text-lg bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
          <TaskSubmissionForm user={user} />
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome to DoneTask!</h1>
          <p className="mt-4 text-gray-600">Please log in to continue.</p>
          <button
            onClick={handleLogin}
            className="px-6 py-2 mt-5 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login with Google
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

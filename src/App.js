import React, { useEffect, useState } from 'react';
import { auth, db, googleProvider, messaging } from './firebaseConfig';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

import TaskSubmissionForm from './TaskSubmissionForm';
import { getToken } from 'firebase/messaging';

function App() {
  const [user, setUser] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        checkNotificationPermission();
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const checkNotificationPermission = () => {
    if (Notification.permission === 'granted') {
      setNotificationsEnabled(true);
    } else {
      setNotificationsEnabled(false);
    }
  };

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      console.log('Notification permission:', permission);
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        console.log('User signed in:', result.user);
        checkNotificationPermission();
        requestNotificationPermission(); // Request permission on login
      }
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('The popup was closed by the user before completing the sign-in.');
      } else {
        console.error('Google login error:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setNotificationsEnabled(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleNotificationPermission = async () => {
    if (notificationsEnabled) {
      // Disable notifications
      await disableNotifications();
    } else {
      // Enable notifications
      await requestNotificationPermission();
    }
  };

  const disableNotifications = async () => {
    try {
      if (user) {
        await deleteDoc(doc(db, 'users', user.uid));
        console.log('FCM Token removed from server.');
      }
      setNotificationsEnabled(false);
    } catch (error) {
      console.error('Error disabling notifications:', error);
    }
  };

  const getFcmToken = async (userId) => {
    try {
      const currentToken = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_VAPID_KEY,
      });
      if (currentToken) {
        console.log('FCM Token:', currentToken);
        await saveTokenToServer(userId, currentToken);
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
          <button
            onClick={toggleNotificationPermission}
            className={`px-6 py-2 mt-5 text-lg rounded-lg transition ${notificationsEnabled ? 'bg-gray-500 text-white hover:bg-gray-700' : 'bg-green-500 text-white hover:bg-green-700'}`}
          >
            {notificationsEnabled ? 'Disable Notifications' : 'Enable Notifications'}
          </button>
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

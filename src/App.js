import './App.css';

// App.js
import React, { useEffect, useState } from 'react';
import { auth, db, googleProvider, messaging } from './firebaseConfig';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

import { FiLogOut } from 'react-icons/fi'; // Importing an icon library
import TaskSubmissionForm from './TaskSubmissionForm';
import YourTasks from './YourTasks';
import { getToken } from 'firebase/messaging';

function App() {
  const [user, setUser] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Set dark mode by default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

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
      await disableNotifications();
    } else {
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

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="min-h-screen bg-darkBg text-white font-sans flex flex-col">
      <div className="flex-grow container mx-auto p-4 sm:p-6">
        {user ? (
          <>
            <header className="flex justify-between items-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-lavenderPurple">
                Welcome, {user.displayName}!
              </h1>
              <button
                onClick={handleLogout}
                className="p-2 bg-deepRed text-white rounded-md hover:bg-darkRed transition flex items-center justify-center"
                aria-label="Logout"
              >
                <FiLogOut size={20} />
              </button>
            </header>

            <YourTasks user={user} />

            <div className="mt-6 flex flex-col space-y-8">
              <button
                onClick={toggleFormVisibility}
                className="w-full px-4 py-3 bg-brightMagenta text-white text-lg font-semibold rounded-md hover:bg-deepLavender transition"
                aria-label={showForm ? 'Close form' : 'Add new task'}
              >
                {showForm ? 'Close Form' : 'Add New Task'}
              </button>

              {showForm && <TaskSubmissionForm user={user} />}

              <button
                onClick={toggleNotificationPermission}
                className={`w-full md:w-auto px-2 py-1 text-sm font-semibold rounded-md transition ${notificationsEnabled
                  ? 'bg-gray-500 text-white hover:bg-gray-700'
                  : 'bg-deepLavender text-white hover:bg-royalPurple'
                  } mt-4 md:mt-6`}
                aria-label={
                  notificationsEnabled ? 'Disable notifications' : 'Enable notifications'
                }
              >
                {notificationsEnabled ? 'Disable Notifications' : 'Enable Notifications'}
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-lavenderPurple mb-4">
              Welcome to DoneTask!
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">Please log in to continue.</p>
            <button
              onClick={handleLogin}
              className="px-6 py-3 bg-deepLavender text-white text-lg font-semibold rounded-md hover:bg-royalPurple transition"
              aria-label="Login with Google"
            >
              Login with Google
            </button>
          </div>
        )}
      </div>
      {/* Uncomment the Footer component if you decide to include it */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;

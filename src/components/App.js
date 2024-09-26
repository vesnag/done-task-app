import '../styles/App.css';

import React, { useEffect, useState } from 'react';
import { auth, db, googleProvider, messaging } from '../services/firebaseConfig';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

import Header from './common/Header';
import LoginPrompt from './common/LoginPrompt';
import NotificationButton from './common/NotificationButton';
import TaskSubmissionForm from './tasks/TaskSubmissionForm';
import YourTasks from './tasks/YourTasks';
import { getToken } from 'firebase/messaging';

function App() {
  const [user, setUser] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) checkNotificationPermission();
    });
    return () => unsubscribe();
  }, []);

  const checkNotificationPermission = () => {
    setNotificationsEnabled(Notification.permission === 'granted');
  };

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
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
        checkNotificationPermission();
        requestNotificationPermission();
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
      await setDoc(doc(db, 'users', userId), { fcmToken: token });
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
            <Header user={user} onLogout={handleLogout} />
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
              <NotificationButton
                notificationsEnabled={notificationsEnabled}
                onToggle={toggleNotificationPermission}
              />
            </div>
          </>
        ) : (
          <LoginPrompt onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
}

export default App;

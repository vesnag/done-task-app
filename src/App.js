import React, { useEffect, useState } from 'react';
import { auth, googleProvider } from './firebaseConfig';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

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
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google login error:", error);
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

  return (
    <div className="min-h-screen bg-gray-50 p-5 font-sans pt-12">
      {user ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.displayName}!</h1>
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="w-24 h-24 mt-5 rounded-full shadow-lg"
          />
          <p className="mt-4 text-gray-600">Email: {user.email}</p>
          <button
            onClick={handleLogout}
            className="px-6 py-2 mt-5 text-lg bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
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

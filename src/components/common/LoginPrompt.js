import Logo from './Logo'; // Import the Logo component
import React from 'react';

const LoginPrompt = ({ onLogin }) => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <Logo width={200} height={200} /> {/* Larger size */}
    <h1 className="text-3xl sm:text-4xl font-extrabold text-lavenderPurple mb-4">
      Welcome to DoneTask!
    </h1>
    <p className="text-lg sm:text-xl text-gray-300 mb-8">Please log in to continue.</p>
    <button
      onClick={onLogin}
      className="px-6 py-3 bg-deepLavender text-white text-lg font-semibold rounded-md hover:bg-royalPurple transition"
      aria-label="Login with Google"
    >
      Login with Google
    </button>
  </div>
);

export default LoginPrompt;

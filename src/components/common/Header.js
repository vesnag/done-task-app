import { FiLogOut } from 'react-icons/fi';
import React from 'react';
import Logo from './Logo'; // Ensure this import is correct

function Header({ user, onLogout }) {
  return (
    <header className="flex justify-between items-center mb-6">
      <Logo />
      {' '}
      {/* Default size */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-lavenderPurple">
        Welcome,
        {' '}
        {user.displayName}
        !
      </h1>
      <button
        onClick={onLogout}
        className="p-2 bg-deepRed text-white rounded-md hover:bg-darkRed transition flex items-center justify-center"
        aria-label="Logout"
      >
        <FiLogOut size={20} />
      </button>
    </header>
  );
}

export default Header;

/* eslint-disable react/prop-types */
/* eslint-disable import/order */

import { FiLogOut } from 'react-icons/fi';
import Logo from './Logo';
import React from 'react';

function Header({ user, onLogout }) {
  return (
    <header className="flex justify-between items-center mb-6">
      <Logo />
      {' '}
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
        type="button"
      >
        <FiLogOut size={20} />
      </button>
    </header>
  );
}

export default Header;

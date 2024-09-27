/* eslint-disable import/order */
/* eslint-disable react/prop-types */

import { FiX } from 'react-icons/fi';
import React from 'react';

function CloseButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
      aria-label="Close"
      type="button"
    >
      <FiX size={24} />
    </button>
  );
}

export default CloseButton;

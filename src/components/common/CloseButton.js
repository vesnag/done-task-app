import { FiX } from 'react-icons/fi';
import React from 'react';

const CloseButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
    aria-label="Close"
  >
    <FiX size={24} />
  </button>
);

export default CloseButton;

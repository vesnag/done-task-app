import React from 'react';

const ModalButton = ({ onClick, children, className, ariaLabel }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg transition ${className}`}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

export default ModalButton;

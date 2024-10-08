/* eslint-disable react/prop-types */

import React from 'react';

function ModalButton({
  onClick, children, className, ariaLabel,
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition ${className}`}
      aria-label={ariaLabel}
      type="button"
    >
      {children}
    </button>
  );
}

export default ModalButton;

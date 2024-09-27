/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';

function FireworksAnimation({ onAnimationEnd }) {
  useEffect(() => {
    const timer = setTimeout(onAnimationEnd, 2000);
    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" className="fireworks-animation">
        <circle cx="32" cy="32" r="30" fill="#1a202c" />
        <g fill="none" stroke="#f774aa" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32 12v4M32 48v4M12 32h4M48 32h4M20.24 20.24l2.83 2.83M40.93 40.93l2.83 2.83M20.24 43.76l2.83-2.83M40.93 23.07l2.83-2.83" />
          <polyline points="24,32 30,38 40,28" />
        </g>
      </svg>
    </div>
  );
}

export default FireworksAnimation;

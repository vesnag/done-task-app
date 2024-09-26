import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logo({ width = 64, height = 64 }) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={width} height={height}>
        <circle cx="32" cy="32" r="30" fill="#1a202c" />
        <g fill="none" stroke="#f774aa" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32 12v4M32 48v4M12 32h4M48 32h4M20.24 20.24l2.83 2.83M40.93 40.93l2.83 2.83M20.24 43.76l2.83-2.83M40.93 23.07l2.83-2.83" />
          <polyline points="24,32 30,38 40,28" stroke="#f774aa" strokeWidth="4" fill="none" />
        </g>
      </svg>
    </div>
  );
}

export default Logo;

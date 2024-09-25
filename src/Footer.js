// Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="w-full py-4 bg-gray-900 text-gray-400 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} DoneTask. All rights reserved.</p>
    </footer>
  );
}

export default Footer;

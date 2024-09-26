import React, { useEffect, useState } from 'react';

import { FiX } from 'react-icons/fi';
import FireworksAnimation from './FireworksAnimation';

function ConfirmationModal({ task, onConfirm, onCancel }) {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onCancel]);

  const handleConfirm = () => {
    setShowAnimation(true);
    setTimeout(() => {
      onConfirm();
    }, 2000); // Match the duration of the animation
  };

  return (
    <>
      {showAnimation && <FireworksAnimation onAnimationEnd={onConfirm} />}
      {!showAnimation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <button
              onClick={onCancel}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
              aria-label="Close"
            >
              <FiX size={24} />
            </button>
            <h3 className="text-2xl font-bold text-lavenderPurple mb-4">Confirm Action</h3>
            <p className="mt-4 text-lg">Are you sure you want to mark the task <span className="font-semibold text-deepLavender">"{task.description}"</span> as done?</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={onCancel}
                className="mr-4 bg-rosePink text-white px-4 py-2 rounded-lg hover:bg-deepRed transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="bg-lavenderPurple text-white px-4 py-2 rounded-lg hover:bg-deepLavender transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmationModal;

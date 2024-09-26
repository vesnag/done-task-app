import React, { useEffect, useState } from 'react';

import { FiX } from 'react-icons/fi';

function TaskHistoryModal({ task, history = [], onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const totalPages = Math.ceil(history.length / itemsPerPage);
  const paginatedHistory = history.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
          aria-label="Close"
        >
          <FiX size={24} />
        </button>
        <h3 className="text-2xl font-bold text-lavenderPurple mb-4">Task History</h3>
        <p className="text-lg mb-4">History of completions for <span className="font-semibold text-deepLavender">"{task.title}"</span>:</p>
        <ul className="space-y-2">
          {paginatedHistory.length > 0 ? (
            paginatedHistory.map((timestamp, index) => (
              <li key={index} className="text-sm text-gray-300 bg-gray-700 p-2 rounded-md">
                {new Date(timestamp.seconds * 1000).toLocaleString()}
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-300">No completions yet.</li>
          )}
        </ul>
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-lavenderPurple text-white px-4 py-2 rounded-lg hover:bg-deepLavender transition disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-lavenderPurple text-white px-4 py-2 rounded-lg hover:bg-deepLavender transition disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-lavenderPurple text-white px-4 py-2 rounded-lg hover:bg-deepLavender transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskHistoryModal;

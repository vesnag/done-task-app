import React from 'react';

const PaginationControls = ({ currentPage, totalPages, onPrevious, onNext }) => (
  <div className="mt-6 flex justify-between items-center">
    <button
      onClick={onPrevious}
      disabled={currentPage === 1}
      className="bg-lavenderPurple text-white px-4 py-2 rounded-lg hover:bg-deepLavender transition disabled:opacity-50"
    >
      Previous
    </button>
    <span className="text-sm text-gray-300">
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={onNext}
      disabled={currentPage === totalPages}
      className="bg-lavenderPurple text-white px-4 py-2 rounded-lg hover:bg-deepLavender transition disabled:opacity-50"
    >
      Next
    </button>
  </div>
);

export default PaginationControls;

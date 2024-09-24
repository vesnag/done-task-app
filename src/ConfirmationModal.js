import React from 'react';

function ConfirmationModal({ task, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-bold text-deepLavender">Confirm Action</h3>
        <p className="mt-4">Are you sure you want to mark the task "{task.task.description}" as done?</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onCancel}
            className="mr-4 bg-rosePink text-white px-4 py-2 rounded-lg hover:bg-deepRed transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-lavenderPurple text-white px-4 py-2 rounded-lg hover:bg-deepLavender transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;

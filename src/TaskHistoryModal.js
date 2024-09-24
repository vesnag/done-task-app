import React from 'react';

function TaskHistoryModal({ task, history = [], onClose }) {
  console.log('Task:', task);
  console.log('History:', history);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-bold text-deepLavender">Task History</h3>
        <p className="mt-4">History of completions for "{task.title}":</p>
        <ul className="mt-4">
          {history.length > 0 ? (
            history.map((timestamp, index) => (
              <li key={index} className="text-sm text-gray-600">
                {new Date(timestamp.seconds * 1000).toLocaleString()}
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-600">No completions yet.</li>
          )}
        </ul>
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

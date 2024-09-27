/* eslint-disable react/prop-types */

import React from 'react';

function HistoryList({ history }) {
  return (
    <ul className="space-y-2">
      {history.length > 0 ? (
        history.map((timestamp) => (
          <li key={timestamp.id} className="text-sm text-gray-300 bg-gray-700 p-2 rounded-md">
            {new Date(timestamp.seconds * 1000).toLocaleString()}
          </li>
        ))
      ) : (
        <li className="text-sm text-gray-300">No completions yet.</li>
      )}
    </ul>
  );
}

export default HistoryList;

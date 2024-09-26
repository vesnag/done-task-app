import { FiClock, FiEdit, FiTrash } from 'react-icons/fi';

import React from 'react';

function TaskListItem({
  task, onMarkAsDone, onViewHistory, onEdit, onDelete,
}) {
  const isColorLight = (hexColor) => {
    const color = hexColor.replace('#', '');
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  };

  const textColor = isColorLight(task.color) ? '#000000' : '#FFFFFF';

  return (
    <li
      className="p-6 border rounded-lg shadow-sm bg-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center"
      style={{ borderColor: task.color }}
    >
      <div className="flex-1">
        <h3 className="font-bold text-xl sm:text-2xl mb-2" style={{ color: task.color }}>
          {task.title}
        </h3>
        <p className="text-gray-300">{task.description}</p>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-4 flex space-x-2">
        <button
          onClick={onMarkAsDone}
          className="px-4 py-2 text-lg font-bold rounded-md transition transform hover:scale-105 focus:scale-105"
          style={{ backgroundColor: task.color, color: textColor }}
          aria-label="Mark task as done"
        >
          Done
        </button>
        <button
          onClick={onViewHistory}
          className="text-lg p-2 rounded-md transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-lavenderPurple"
          style={{ color: task.color }}
          aria-label="View task history"
          title="View Task History"
        >
          <FiClock size={20} />
        </button>
        <button
          onClick={onEdit}
          className="text-lg p-2 rounded-md transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-lavenderPurple"
          style={{ color: task.color }}
          aria-label="Edit task"
          title="Edit Task"
        >
          <FiEdit size={20} />
        </button>
        <button
          onClick={onDelete}
          className="text-lg p-2 rounded-md transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-lavenderPurple"
          style={{ color: task.color }}
          aria-label="Delete task"
          title="Delete Task"
        >
          <FiTrash size={20} />
        </button>
      </div>
    </li>
  );
}

export default TaskListItem;

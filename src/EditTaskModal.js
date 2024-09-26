import React, { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';

import ColorPicker from './ColorPicker';
import { FiX } from 'react-icons/fi';
import { db } from './firebaseConfig';

function EditTaskModal({ task, onClose, onSave }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [color, setColor] = useState(task.color);

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

  const handleSave = async () => {
    try {
      const taskRef = doc(db, 'tasks', task.id);
      await updateDoc(taskRef, {
        title,
        description,
        color,
      });
      onSave();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
          aria-label="Close"
        >
          <FiX size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white"
        />
        <div>
          <label className="block text-lg font-medium text-gray-300">
            Task Color
          </label>
          <ColorPicker selectedColor={color} onColorSelect={setColor} />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTaskModal;

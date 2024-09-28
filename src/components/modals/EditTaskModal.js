/* eslint-disable react/prop-types */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useEffect, useState } from 'react';

import ColorPicker from '../common/ColorPicker';
import { FiX } from 'react-icons/fi';
import TaskField from '../tasks/TaskField';
import processTaskInputWithLLM from '../../services/openaiApi';

function EditTaskModal({ task, onClose, onSave }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [color, setColor] = useState(task.color);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
    if (!title || !description) {
      setMessage('Please enter task title and description.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const parsedTask = await processTaskInputWithLLM(description);

      const updatedTask = {
        ...task,
        title,
        description,
        schedule: parsedTask,
        color,
      };

      onSave(updatedTask);
      setMessage('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error);
      setMessage(error.message || 'Error updating task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
          aria-label="Close"
          type="button"
        >
          <FiX size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
        <TaskField
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          disabled={loading}
        />
        <TaskField
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          disabled={loading}
        />
        <div>
          <label className="block text-lg font-medium text-gray-300" htmlFor="color-picker">Task Color</label>
          <ColorPicker selectedColor={color} onColorSelect={setColor} id="color-picker" />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={handleSave}
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${loading ? 'cursor-not-allowed' : ''}`}
            type="button"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Save'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            type="button"
          >
            Cancel
          </button>
        </div>
        {message && (
          <p className="mt-4 text-center text-rosePink font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}

export default EditTaskModal;

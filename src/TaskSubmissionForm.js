import React, { useState } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';

import ColorPicker from './ColorPicker';
import { db } from './firebaseConfig';
import { processTaskInputWithLLM } from './openaiApi';

function TaskSubmissionForm({ user }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskColor, setTaskColor] = useState('#9151b0'); // Default to lavenderPurple
  const [taskDescription, setTaskDescription] = useState('');
  const [message, setMessage] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTaskSubmission = async () => {
    if (!taskTitle || !taskDescription) {
      setMessage('Please enter task title and description.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const parsedTask = await processTaskInputWithLLM(taskDescription);

      const taskData = {
        title: taskTitle,
        description: taskDescription,
        task: parsedTask,
        color: taskColor,
        userId: user.uid,
      };

      if (editTaskId) {
        await setDoc(doc(db, 'tasks', editTaskId), taskData);
        setMessage('Task updated successfully!');
      } else {
        await setDoc(doc(collection(db, 'tasks')), taskData);
        setMessage('Task submitted successfully!');
      }

      setTaskTitle('');
      setTaskDescription('');
      setTaskColor('#9151b0');
      setEditTaskId(null);
    } catch (error) {
      console.error('Error submitting task:', error);
      setMessage(error.message || 'Error submitting task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl sm:text-3xl font-bold text-lavenderPurple mb-6">
        {editTaskId ? 'Edit Task' : 'Submit a New Task'}
      </h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="taskTitle" className="block text-lg font-medium text-gray-300">
            Task Title
          </label>
          <input
            type="text"
            id="taskTitle"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-700 text-white focus:ring-lavenderPurple focus:border-lavenderPurple"
            disabled={loading}
            aria-required="true"
            placeholder="Enter task title"
          />
        </div>
        <div>
          <label htmlFor="taskDescription" className="block text-lg font-medium text-gray-300">
            Task Description
          </label>
          <textarea
            id="taskDescription"
            className="mt-1 block w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-700 text-white focus:ring-lavenderPurple focus:border-lavenderPurple"
            rows="4"
            placeholder="Describe when the task should be done (e.g., every Monday morning)"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            disabled={loading}
            aria-required="true"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-300">
            Task Color
          </label>
          <ColorPicker selectedColor={taskColor} onColorSelect={setTaskColor} />
        </div>
        <div>
          <button
            onClick={handleTaskSubmission}
            className={`w-full px-6 py-3 text-lg font-semibold text-white rounded-md transition ${loading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-lavenderPurple hover:bg-deepLavender'
              }`}
            disabled={loading}
            aria-label={editTaskId ? 'Update Task' : 'Submit Task'}
          >
            {loading ? 'Processing...' : editTaskId ? 'Update Task' : 'Submit Task'}
          </button>
        </div>
        {message && (
          <p className="mt-4 text-center text-rosePink font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}

export default TaskSubmissionForm;

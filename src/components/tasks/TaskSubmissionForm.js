/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';

import { db } from '../../services/firebaseConfig';
import processTaskInputWithLLM from '../../services/openaiApi';
import ColorPicker from '../common/ColorPicker';

import TaskField from './TaskField';

function TaskSubmissionForm({ user, onTaskAdded }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskColor, setTaskColor] = useState('#9151b0'); // Default to lavenderPurple
  const [taskDescription, setTaskDescription] = useState('');
  const [message, setMessage] = useState('');
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

      const taskRef = await addDoc(collection(db, 'tasks'), taskData);
      setMessage('Task submitted successfully!');
      if (onTaskAdded) {
        onTaskAdded({ id: taskRef.id, ...taskData }); // Pass the new task data
      }

      setTaskTitle('');
      setTaskDescription('');
      setTaskColor('#9151b0');
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
        Submit a New Task
      </h2>
      <div className="space-y-6">
        <TaskField
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Enter task title"
          disabled={loading}
        />
        <TaskField
          type="textarea"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Describe when the task should be done (e.g., every Monday morning)"
          disabled={loading}
        />
        <div>
          <label className="block text-lg font-medium text-gray-300" htmlFor="task-color-picker">
            Task Color
          </label>
          <ColorPicker selectedColor={taskColor} onColorSelect={setTaskColor} id="task-color-picker" />
        </div>
        <div>
          <button
            onClick={handleTaskSubmission}
            className={`w-full px-6 py-3 text-lg font-semibold text-white rounded-md transition ${loading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-lavenderPurple hover:bg-deepLavender'
            }`}
            disabled={loading}
            aria-label="Submit Task"
            type="button" // Add type attribute
          >
            {loading ? 'Processing...' : 'Submit Task'}
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

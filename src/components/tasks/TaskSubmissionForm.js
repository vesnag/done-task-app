import React, { useState } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';

import ColorPicker from '../common/ColorPicker';
import TaskField from './TaskField';
import { db } from '../../services/firebaseConfig';
import { processTaskInputWithLLM } from '../../services/openaiApi';

const TaskSubmissionForm = ({ user }) => {
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
};

export default TaskSubmissionForm;

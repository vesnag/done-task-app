import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';

import ColorPicker from '../common/ColorPicker';
import TaskField from './TaskField';
import { db } from '../../services/firebaseConfig';
import { processTaskInputWithLLM } from '../../services/openaiApi';

function TaskSubmissionForm({ user, onTaskAdded }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskColor, setTaskColor] = useState('#9151b0'); // Default to lavenderPurple
  const [taskDescription, setTaskDescription] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTaskSubmission = async () => {
    console.log('handleTaskSubmission called');
    if (!taskTitle || !taskDescription) {
      setMessage('Please enter task title and description.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      console.log('Processing task input with LLM');
      const parsedTask = await processTaskInputWithLLM(taskDescription);

      const taskData = {
        title: taskTitle,
        description: taskDescription,
        task: parsedTask,
        color: taskColor,
        userId: user.uid,
      };

      console.log('Adding new task');
      const taskRef = await addDoc(collection(db, 'tasks'), taskData);
      setMessage('Task submitted successfully!');
      console.log('Task added, calling onTaskAdded');
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
            aria-label="Submit Task"
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

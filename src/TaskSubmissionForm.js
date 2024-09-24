import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

import { db } from './firebaseConfig'; // Adjust the import according to your project structure
import { processTaskInputWithLLM } from './openaiApi'; // Import the OpenAI processing function

const colors = {
  lavenderPurple: '#9151b0',
  lightPink: '#cb90d2',
  deepLavender: '#7260c3',
  royalPurple: '#6930a1',
  brightMagenta: '#8f49bb',
  softPink: '#efa1cb',
  white: '#FFFFFF',
  darkPurple: '#863591',
  violet: '#623eaa',
  rosePink: '#f774aa',
  deepRed: '#8f2968',
  darkRed: '#98254c',
};

function TaskSubmissionForm({ user }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskColor, setTaskColor] = useState('#000000'); // Default color
  const [taskDescription, setTaskDescription] = useState('');
  const [message, setMessage] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const tasksList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksList);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleTaskSubmission = async () => {
    if (!taskTitle || !taskDescription) {
      setMessage('Please enter task title and description.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Send taskDescription to LLM for processing
      const parsedTask = await processTaskInputWithLLM(taskDescription);

      if (editTaskId) {
        // Update existing task
        await setDoc(doc(db, 'tasks', editTaskId), {
          title: taskTitle,
          description: taskDescription,
          task: parsedTask,
          color: taskColor,
          userId: user.uid,
        });
        setMessage('Task updated successfully!');
      } else {
        // Create new task
        await setDoc(doc(collection(db, 'tasks')), {
          title: taskTitle,
          description: taskDescription,
          task: parsedTask,
          color: taskColor,
          userId: user.uid,
        });
        setMessage('Task submitted successfully!');
      }

      setTaskTitle('');
      setTaskDescription('');
      setTaskColor('#000000');
      setEditTaskId(null);
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error('Error submitting task:', error);
      setMessage('Error submitting task.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditTask = (task) => {
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setTaskColor(task.color);
    setEditTaskId(task.id);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      setMessage('Task deleted successfully!');
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error('Error deleting task:', error);
      setMessage('Error deleting task.');
    }
  };

  if (!user) {
    return (
      <div className="mt-8">
        <button className="px-6 py-2 text-lg bg-lavenderPurple text-white rounded-lg hover:bg-deepLavender transition">
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-lavenderPurple">{editTaskId ? 'Edit Task' : 'Submit a New Task'}</h2>
      <div>
        <label>Task Title:</label>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="border p-2"
          disabled={loading}
        />
      </div>
      <div>
        <label>Task Description:</label>
        <textarea
          className="w-full p-4 mt-4 border rounded-lg bg-white text-deepLavender"
          rows="4"
          placeholder="Describe when the task should be done (e.g., every Monday morning)"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <label>Task Color:</label>
        <div className="flex items-center">
          <input
            type="color"
            value={taskColor}
            onChange={(e) => setTaskColor(e.target.value)}
            className="border p-2"
            disabled={loading}
          />
          <div
            className="w-6 h-6 ml-2 border rounded-full"
            style={{ backgroundColor: taskColor }}
          ></div>
        </div>
      </div>
      <button
        onClick={handleTaskSubmission}
        className={`px-6 py-2 mt-4 text-lg bg-lavenderPurple text-white rounded-lg hover:bg-deepLavender transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {editTaskId ? 'Update Task' : loading ? 'Processing...' : 'Submit Task'}
      </button>
      {message && <p className="mt-4 text-rosePink">{message}</p>}

      <h2 className="text-xl font-bold text-lavenderPurple mt-8">Your Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ backgroundColor: task.color }} className="p-2 mt-2 border rounded-lg">
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <button
              onClick={() => handleEditTask(task)}
              className="px-4 py-2 mt-2 text-sm bg-lightPink text-white rounded-lg hover:bg-deepLavender transition"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="px-4 py-2 mt-2 ml-2 text-sm bg-deepRed text-white rounded-lg hover:bg-darkRed transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskSubmissionForm;

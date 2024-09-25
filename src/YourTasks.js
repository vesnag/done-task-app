// Importing icons from react-icons/fi (Feather Icons)
import { FiClock, FiEdit, FiTrash } from 'react-icons/fi';
// YourTasks.js
import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

import ConfirmationModal from './ConfirmationModal';
import TaskHistoryModal from './TaskHistoryModal';
import { db } from './firebaseConfig';

function YourTasks({ user }) {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [message, setMessage] = useState('');

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

  const handleEditTask = (task) => {
    setSelectedTask(task);
    // You might want to pass this task to a form for editing
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

  const handleMarkAsDone = async (task) => {
    const timestamp = new Date(); // Get the current timestamp
    try {
      const taskRef = doc(db, 'tasks', task.id);
      await updateDoc(taskRef, {
        completedAt: [...(task.completedAt || []), timestamp], // Store multiple timestamps
      });
      setMessage('Task marked as done successfully!');
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error('Error marking task as done:', error);
      setMessage('Error marking task as done.');
    }
  };

  const confirmMarkAsDone = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const showTaskHistory = (task) => {
    setSelectedTask(task);
    setShowHistoryModal(true);
  };

  // Function to determine if the task color is light or dark for text contrast
  const isColorLight = (hexColor) => {
    // Remove '#' if present
    const color = hexColor.replace('#', '');
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-lavenderPurple mb-6">Your Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-300">No tasks available. Add a new task to get started!</p>
      ) : (
        <ul className="space-y-6">
          {tasks.map((task) => {
            const textColor = isColorLight(task.color) ? '#000000' : '#FFFFFF';
            return (
              <li
                key={task.id}
                className="p-6 border rounded-lg shadow-sm bg-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center"
                style={{ borderColor: task.color }}
              >
                <div className="flex-1">
                  <h3
                    className="font-bold text-xl sm:text-2xl mb-2"
                    style={{ color: task.color }}
                  >
                    {task.title}
                  </h3>
                  <p className="text-gray-300">{task.description}</p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-4 flex space-x-2">
                  <button
                    onClick={() => confirmMarkAsDone(task)}
                    className="px-4 py-2 text-lg font-bold rounded-md transition transform hover:scale-105 focus:scale-105"
                    style={{
                      backgroundColor: task.color,
                      color: textColor,
                    }}
                    aria-label="Mark task as done"
                  >
                    Done
                  </button>
                  {/* History Icon Button */}
                  <button
                    onClick={() => showTaskHistory(task)}
                    className="text-lg p-2 rounded-md transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-lavenderPurple"
                    style={{ color: task.color }}
                    aria-label="View task history"
                    title="View Task History"
                  >
                    <FiClock size={20} />
                  </button>
                  {/* Edit Icon Button */}
                  <button
                    onClick={() => handleEditTask(task)}
                    className="text-lg p-2 rounded-md transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-lavenderPurple"
                    style={{ color: task.color }}
                    aria-label="Edit task"
                    title="Edit Task"
                  >
                    <FiEdit size={20} />
                  </button>
                  {/* Delete Icon Button */}
                  <button
                    onClick={() => handleDeleteTask(task.id)}
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
          })}
        </ul>
      )}

      {showModal && selectedTask && (
        <ConfirmationModal
          task={selectedTask}
          onConfirm={() => {
            handleMarkAsDone(selectedTask);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}

      {showHistoryModal && selectedTask && (
        <TaskHistoryModal
          task={selectedTask}
          history={selectedTask.completedAt || []}
          onClose={() => setShowHistoryModal(false)}
        />
      )}

      {message && <p className="mt-4 text-center text-rosePink font-medium">{message}</p>}
    </div>
  );
}

export default YourTasks;

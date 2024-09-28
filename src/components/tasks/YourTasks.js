/* eslint-disable import/order */

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import ModalHandler from '../modals/ModalHandler';
import TaskListItem from './TaskListItem';
import { db } from '../../services/firebaseConfig';
import {
  sortTasksByNextScheduledTime,
} from '../../utils/scheduleUtils';

const YourTasks = forwardRef(({ user }, ref) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [message, setMessage] = useState('');

  const fetchTasks = useCallback(async () => {
    try {
      const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const tasksList = querySnapshot.docs.map((taskDoc) => ({
        id: taskDoc.id,
        ...taskDoc.data(),
      }));

      const sortedTasks = sortTasksByNextScheduledTime(tasksList, new Date());
      setTasks(sortedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchTasks();
  }, [user, fetchTasks]);

  useImperativeHandle(ref, () => ({
    addTask(newTask) {
      setTasks((prevTasks) => sortTasksByNextScheduledTime([...prevTasks, newTask], new Date()));
    },
  }));

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      setMessage('Task deleted successfully!');
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      setMessage('Error deleting task.');
    }
  };

  const handleMarkAsDone = async (task) => {
    const timestamp = new Date().toISOString();
    try {
      const taskRef = doc(db, 'tasks', task.id);
      await updateDoc(taskRef, {
        completedAt: [...(task.completedAt || []), timestamp],
      });
      setMessage('Task marked as done successfully!');
      fetchTasks();
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

  const closeModal = () => {
    setShowModal(false);
    setShowHistoryModal(false);
    setShowEditModal(false);
  };

  const saveEdit = async (updatedTask) => {
    try {
      const taskRef = doc(db, 'tasks', updatedTask.id);
      await updateDoc(taskRef, updatedTask);
      setMessage('Task updated successfully!');
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
      setMessage('Error updating task.');
    }
    setShowEditModal(false);
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-lavenderPurple mb-6">Your Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-300">No tasks available. Add a new task to get started!</p>
      ) : (
        <ul className="space-y-6">
          {tasks.map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              onMarkAsDone={() => confirmMarkAsDone(task)}
              onViewHistory={() => showTaskHistory(task)}
              onEdit={() => handleEditTask(task)}
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))}
        </ul>
      )}

      <ModalHandler
        selectedTask={selectedTask}
        showModal={showModal}
        showHistoryModal={showHistoryModal}
        showEditModal={showEditModal}
        onConfirmMarkAsDone={() => {
          handleMarkAsDone(selectedTask);
          closeModal();
        }}
        onCloseModal={closeModal}
        onSaveEdit={saveEdit}
      />

      {message && <p className="mt-4 text-center text-rosePink font-medium">{message}</p>}
    </div>
  );
});

export default YourTasks;

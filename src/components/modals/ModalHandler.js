/* eslint-disable react/prop-types */
/* eslint-disable import/order */

import ConfirmationModal from './ConfirmationModal';
import EditTaskModal from './EditTaskModal';
import React from 'react';
import TaskHistoryModal from './TaskHistoryModal';

function ModalHandler({
  selectedTask,
  showModal,
  showHistoryModal,
  showEditModal,
  onConfirmMarkAsDone,
  onCloseModal,
  onSaveEdit,
}) {
  return (
    <>
      {showModal && selectedTask && (
      <ConfirmationModal
        task={selectedTask}
        onConfirm={onConfirmMarkAsDone}
        onCancel={onCloseModal}
      />
      )}

      {showHistoryModal && selectedTask && (
      <TaskHistoryModal
        task={selectedTask}
        history={selectedTask.completedAt || []}
        onClose={onCloseModal}
      />
      )}

      {showEditModal && selectedTask && (
      <EditTaskModal
        task={selectedTask}
        onClose={onCloseModal}
        onSave={onSaveEdit}
      />
      )}
    </>
  );
}

export default ModalHandler;

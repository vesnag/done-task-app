import ConfirmationModal from './ConfirmationModal';
import EditTaskModal from './EditTaskModal';
import React from 'react';
import TaskHistoryModal from './TaskHistoryModal';

const ModalHandler = ({
  selectedTask,
  showModal,
  showHistoryModal,
  showEditModal,
  onConfirmMarkAsDone,
  onCloseModal,
  onSaveEdit,
}) => (
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

export default ModalHandler;

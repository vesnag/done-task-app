import CloseButton from '../common/CloseButton';
import FireworksAnimation from '../common/FireworksAnimation';
import ModalButton from '../common/ModalButton';
import React from 'react';

const ConfirmationModal = ({ showAnimation, onConfirm, onCancel, task }) => (
  <>
    {showAnimation ? (
      <FireworksAnimation onAnimationEnd={onConfirm} />
    ) : (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <CloseButton onClick={onCancel} />
          <h3 className="text-2xl font-bold text-lavenderPurple mb-4">Confirm Action</h3>
          <p className="mt-4 text-lg">
            Are you sure you want to mark the task <span className="font-semibold text-deepLavender">"{task.description}"</span> as done?
          </p>
          <div className="mt-6 flex justify-end">
            <ModalButton
              onClick={onCancel}
              className="mr-4 bg-rosePink text-white hover:bg-deepRed"
              ariaLabel="Cancel"
            >
              Cancel
            </ModalButton>
            <ModalButton
              onClick={onConfirm}
              className="bg-lavenderPurple text-white hover:bg-deepLavender"
              ariaLabel="Confirm"
            >
              Confirm
            </ModalButton>
          </div>
        </div>
      </div>
    )}
  </>
);

export default ConfirmationModal;

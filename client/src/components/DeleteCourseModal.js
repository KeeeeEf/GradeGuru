// components/DeleteCourseModal.js
import React from 'react';
import Modal from 'react-modal';

const DeleteCourseModal = ({ isOpen, onClose, onDeleteConfirm, courseName }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Course Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2 className="text-2xl font-bold mb-4">Delete Course</h2>
        <p>{`Are you sure you want to delete the course "${courseName}"?`}</p>
        <div className="flex mt-4">
          <button onClick={onDeleteConfirm} className="bg-red-500 text-white py-2 px-4 rounded">
            Confirm
          </button>
          <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded ml-2">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteCourseModal;

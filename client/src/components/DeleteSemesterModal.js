// components/DeleteSemesterModal.js
import React from 'react';
import Modal from 'react-modal'; // Use your preferred modal library

const DeleteSemesterModal = ({ isOpen, onClose, onDeleteConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} contentLabel="Delete Course Modal"
    className="modal"
    overlayClassName="overlay">
      <div className="modal-content">
      <h2 className="text-2xl font-bold mb-4">Delete Semester</h2>
        <p>Are you sure you want to delete this semester?</p>
        <div className="flex mt-4">
        <button onClick={onDeleteConfirm} className="bg-red-500 text-white py-2 px-4 rounded">Confirm</button>
        <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded ml-2">Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteSemesterModal;

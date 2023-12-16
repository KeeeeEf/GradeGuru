import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SemesterCard from '../components/SemesterCard';
import Modal from 'react-modal';
import Navbar from '../components/Navbar';

const Home = () => {
  const [semesters, setSemesters] = useState([]);
  const [isAddSemesterModalOpen, setAddSemesterModalOpen] = useState(false);
  const [newSemesterName, setNewSemesterName] = useState('');

  useEffect(() => {
    // Fetch list of semesters from the backend upon component mount
    // fetchSemesters()
  }, []);

  const renderSemesters = () => {
    return semesters.map((semester) => (
      <Link to={`/semester/${semester.id}`} key={semester.id}>
        <SemesterCard semester={semester} />
      </Link>
    ));
  };

  const openAddSemesterModal = () => {
    setAddSemesterModalOpen(true);
  };

  const closeAddSemesterModal = () => {
    setAddSemesterModalOpen(false);
  };

  const handleAddSemester = () => {
    // API call to backend to add a new semester (will implement when axios and express are installed)
    // After adding, update the list of semesters and close the modal
    closeAddSemesterModal();
  };

  return (
    <div>
    <Navbar />
    <div className="container mx-auto flex flex-col items-center p-8">
      
      <h1 className="text-3xl font-bold text-center mb-8">GradeGuru</h1>
      <h2 className="text-2xl text-center font-semibold mb-4">Semesters</h2>
      <h2 className="text-xl text-center mb-4">Click on a semester to view your grades!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {renderSemesters()}
      </div>
      <button
        onClick={openAddSemesterModal}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Add Semester
      </button>

      <Modal
        isOpen={isAddSemesterModalOpen}
        onRequestClose={closeAddSemesterModal}
        contentLabel="Add Semester Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <h2 className="text-2xl font-bold mb-4">Add Semester</h2>
          <input
            type="text"
            placeholder="Enter Semester Name"
            value={newSemesterName}
            onChange={(e) => setNewSemesterName(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
          />
          <button
            onClick={handleAddSemester}
            className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={closeAddSemesterModal}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
    </div>
  );
};

export default Home;

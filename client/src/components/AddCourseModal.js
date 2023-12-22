import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import config from '../common/config';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ClearIcon from '@mui/icons-material/Clear';

const AddCourseModal = ({ isOpen, onClose, semesterId, onCourseAdded }) => {
  const [courseName, setCourseName] = useState('');
  const [types, setTypes] = useState([]); // Array to store type and percentage objects
  const [currentType, setCurrentType] = useState('');
  const [currentPercentage, setCurrentPercentage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddType = () => {
    if (currentType && currentPercentage) {
      // Check if percentage is a valid number
      const percentage = parseFloat(currentPercentage);
  
      if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
        const newTotalPercentage = types.reduce((total, type) => total + type.percentage, 0) + percentage;
  
        if (newTotalPercentage <= 100) {
          setTypes([...types, { type: currentType, percentage }]);
          setCurrentType('');
          setCurrentPercentage('');
          setError(''); // Clear any previous error
        } else {
          setError('Total percentages cannot exceed 100%.');
        }
      } else {
        setError('Percentage must be a valid number between 0 and 100.');
      }
    } else {
      setError('Please enter both type and percentage.');
    }
  };

  const handleDeleteType = (index) => {
    const updatedTypes = [...types];
    updatedTypes.splice(index, 1);
    setTypes(updatedTypes);
  };

  const handleAddCourse = async () => {
    if (!courseName || types.length === 0) {
      setError('Please enter a course name and at least one type with percentage.');
      return;
    }
    const totalPercentage = types.reduce((total, type) => total + parseFloat(type.percentage), 0);
    if (totalPercentage === 100) {
    try {
      setIsLoading(true);

      const response = await axios.post(`${config.API}/courses/addCourseBySemester`, {
        sem_id: semesterId,
        course_name: courseName,
      });
      

      if (response.data.success) {
        const course_id = response.data.data.insertId;
        await axios.post(`${config.API}/criteria/addcriteria`, {
          course_id,
          types,
        });

        setIsSubmitting(true);
        setTimeout(()=>{
          setIsSubmitting(false);
          onCourseAdded();
          setCourseName('');
          setTypes([]);
          onClose();
        }, 3000);
        
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error adding course:', error);

      setError('Error adding course. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }else {
    setError('Total percentages must add up to 100%.');
  }
  };

  const resetForm = () => {
    setCourseName('');
    setCurrentType('');
    setCurrentPercentage('');
    setTypes([]);
    setError('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        resetForm();
        setTypes([]);
        onClose();
      }}
      contentLabel="Add Course Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2 className="text-2xl font-bold mb-4">Add Course</h2>
        <label htmlFor="courseName" className="block text-sm font-medium text-gray-600">
          Course Name
        </label>
        {isSubmitting ? (
          <Skeleton height={40} width={"100%"} baseColor="#bcbcbc" />
        ) : (
          <input
            type="text"
            placeholder="Enter Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
          />
        )}

        <label htmlFor="currentType" className="text-sm font-medium text-gray-600">
          Activity
        </label>
        <div className="flex mb-4">
          <div className="w-1/2 mr-2">
            {isSubmitting ? (
              <Skeleton height={40} width={"100%"} baseColor="#bcbcbc" />
            ) : (
              <input
                type="text"
                placeholder="Type"
                value={currentType}
                onChange={(e) => setCurrentType(e.target.value)}
                className="border rounded p-2 w-full"
              />
            )}
          </div>
          <div className="w-1/2">
            {isSubmitting ? (
              <Skeleton height={40} width={"100%"} baseColor="#bcbcbc" />
            ) : (
              <input
                type="text"
                placeholder="Percentage"
                value={currentPercentage}
                onChange={(e) => setCurrentPercentage(e.target.value)}
                className="border rounded p-2 w-full"
              />
            )}
          </div>
          <button onClick={handleAddType} className="bg-blue-500 text-white py-2 px-4 rounded ml-2">
            Add
          </button>
        </div>
        {types.map((type, index) => (
          <div key={index} className="flex mb-2">
            <div className="w-1/3">
              <span className="font-semibold">{type.type}</span>
            </div>
            <div className="w-1/6">
              <span>{type.percentage}%</span>
            </div>
            <button onClick={() => handleDeleteType(index)} className="rounded">
              <ClearIcon />
            </button>
          </div>
        ))}

        <button
          onClick={handleAddCourse}
          className="bg-blue-500 text-white py-2 px-4 rounded mr-2 mt-4"
        >
          Save
        </button>
        <button
          onClick={() => {
            resetForm();
            onClose();
          }}
          className="bg-gray-500 text-white py-2 px-4 rounded mt-4"
        >
          Cancel
        </button>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </Modal>
  );
};

export default AddCourseModal;

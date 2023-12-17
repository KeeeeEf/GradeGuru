import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import config from '../common/config';

const AddCourseModal = ({ isOpen, onClose, semesterId }) => {
  const [courseName, setCourseName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
  setIsLoading(true);
  try {
    const response = await axios.get(`${config.API}/courses/getCourseBySemester?semesterId=${semesterId}`);
    console.log('Courses fetched:', response.data.data);
    setCourses(response.data.data);
  } catch (err) {
    setError('Error fetching courses');
  } finally {
    setIsLoading(false);
  }
};


  useEffect(() => {
    fetchCourses();
  }, [semesterId]);

  const handleAddCourse = async () => {
    if (!courseName) {
      setError('Please enter a course name.');
      return;
    }

    try {
      setIsLoading(true);

      // Make a request to add the course
      const response = await axios.post(`${config.API}/courses/addCourseBySemester`, {
        sem_id: semesterId,
        course_name: courseName,
      });

      if (response.data.success) {
        // Course added successfully
        // Optionally, you can update the courses list for the current semester
        // This is useful if you want to immediately reflect the changes without refreshing the page
        fetchCourses();

        // Close the modal
        onClose();
      } else {
        // Handle the case where adding the course was not successful
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error adding course:', error);

      // Handle error and set appropriate state
      setError('Error adding course. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Course Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2 className="text-2xl font-bold mb-4">Add Course</h2>
        <label htmlFor="courseName" className="block text-sm font-medium text-gray-600">
          Course Name
        </label>
        <input
          type="text"
          placeholder="Enter Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="border rounded p-2 mb-4 w-full"
        />
        <button
          onClick={handleAddCourse}
          className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white py-2 px-4 rounded"
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

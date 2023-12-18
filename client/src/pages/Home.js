import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SemesterCard from '../components/SemesterCard';
import Modal from 'react-modal';
import Navbar from '../components/Navbar';
import config from '../common/config';
import axios from 'axios';
import YearAccordion from '../components/YearAccordion';

const Home = () => {
  const [semesters, setSemesters] = useState([]);
  const [isAddSemesterModalOpen, setAddSemesterModalOpen] = useState(false);
  const [semesterName, setSemesterName]= useState("");
  const [year, setYear]= useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem('userDetails'));
  const account_id = user ? user.userID : null;

  useEffect(() => {
    // Fetch list of semesters from the backend upon component mount
    fetchSemesters();
  }, []); // Empty dependency array ensures that this effect runs only once after the initial render

  const fetchSemesters = async () => {
    try {
      const response = await axios.get(`${config.API}/semesters/getsemester?account_id=${account_id}`);
      setSemesters(response.data.data);
    } catch (err) {
      console.error('Error fetching semesters:', err);
      // Handle error, set appropriate state
    }
  };

  const renderSemesters = () => {
    return semesters.map((semester) => (
      <Link to={`/semester/${semester.sem_id}`} key={semester.sem_id}>
        <SemesterCard semester={semester} />
      </Link>
    ));
  };

  const renderYearAccordions = () => {
    const uniqueYears = Array.from(new Set(semesters.map((semester) => semester.year)));
    const sortedYears = uniqueYears.sort((a, b) => a - b);
    return sortedYears.map((year) => (
      <YearAccordion
        key={year}
        year={year}
        semesters={semesters.filter((semester) => semester.year === year)}
      />
    ));
  };

  const openAddSemesterModal = () => {
    setAddSemesterModalOpen(true);
  };

  const closeAddSemesterModal = () => {
    setAddSemesterModalOpen(false);
    setSemesterName("");
    setYear("");
  };

  const handleAddSemester = async () => {
    if (!semesterName || !year) {
      setError("Please fill in both Semester and Year fields.");
      return;
    }

    const isDuplicate = semesters.some(
      (semester) => semester.semester === semesterName && semester.year === year
    );
  
    if (isDuplicate) {
      setError("Semester with the same name and year already exists.");
      return;
    }

    setIsLoading(true);

    axios.post(`${config.API}/semesters/addsemester`, {
      account_id,
      year: year,
      semester: semesterName,
    }).then((res) => {
      if (res.data.success === true) {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
        fetchSemesters();
      } else {
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
        setError(res.data.error);
      }
    }).catch((err) => {
      setError(err.error);
      setIsLoading(false);
    });

    closeAddSemesterModal();
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold text-center mb-8">GradeGuru</h1>
        <h2 className="text-2xl text-center font-semibold mb-4">Semesters</h2>
        <h2 className="text-xl text-center mb-4">Click on a semester to view your grades!</h2>
        {renderYearAccordions()}
        <div className="grid grid-cols-1 gap-4 w-1/3">
          
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
            <label htmlFor="semester" className="block text-sm font-medium text-gray-600">
              Semester
            </label>
            <select
            value={semesterName}
            onChange={(e) => setSemesterName(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
          >
            <option value="" disabled selected>
                Select Semester
              </option>
            <option value="first">First Semester</option>
            <option value="second">Second Semester</option>
            <option value="summer">Summer</option>
          </select>
          <label htmlFor="year" className="block text-sm font-medium text-gray-600">
              Year
            </label>
            <input
              type="text"
              placeholder="Enter Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
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
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import axios from 'axios';
import config from '../common/config';
import DeleteCourseModal from './DeleteCourseModal';
import { Link } from 'react-router-dom';

const CourseList = ({ semesterId, onCourseAdded }) => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${config.API}/courses/getCourseBySemester?semesterId=${semesterId}`);
      // Sort the courses alphabetically by their names
      const sortedCourses = response.data.data.sort((a, b) => a.course_name.localeCompare(b.course_name));
      setCourses(sortedCourses);
    } catch (err) {
      setError('Error fetching courses');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [onCourseAdded]);

  const handleDeleteCourse = async () => {
    try {
      const response = await axios.delete(`${config.API}/courses/deleteCourse/${selectedCourse}`);
      fetchCourses();
      setSelectedCourse(null);
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error('Error deleting course:', err);
    }
  };

  const handleCourseCardDeleteClick = (courseId) => {
    setSelectedCourse(courseId);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="grid grid-cols-1 gap-4 w-full">
      {courses.map((course) => (
        <div key={course.course_id}>
          <CourseCard course={course} onDelete={(courseId) => handleCourseCardDeleteClick(courseId)} />
        </div>
      ))}
      {selectedCourse && (
        <DeleteCourseModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDeleteConfirm={handleDeleteCourse}
          courseName={courses.find((course) => course.course_id === selectedCourse)?.course_name}
        />
      )}
    </div>
  );
};

export default CourseList;

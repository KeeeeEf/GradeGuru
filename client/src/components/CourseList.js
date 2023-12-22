import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import axios from 'axios';
import config from '../common/config';
import DeleteCourseModal from './DeleteCourseModal';
import { fetchGradesForCourse, fetchCourseUnits } from './utils';

const CourseList = ({ semesterId, onCourseAdded }) => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [semesterGPA, setSemesterGPA] = useState(null);

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

  const fetchSemesterGPA = async () => {
    let totalGPA = 0;
    let totalUnits = 0;

    for (const course of courses) {
      const grades = await fetchGradesForCourse(course.course_id, 'finals'); // Assuming a function to fetch all grades

      console.log('Grades for course', course.course_name, ':', grades);
      const units = await fetchCourseUnits(course.course_id);

      if (grades && units) {
        const courseGPA = calculateCourseGPA(grades, units);
        totalGPA += courseGPA * units;
        totalUnits += units;
      }
    }

    const semesterGPA = totalUnits !== 0 ? totalGPA / totalUnits : 0;
    setSemesterGPA(parseFloat(semesterGPA.toFixed(2)));
  };

  const calculateCourseGPA = (grades, units) => {
    // Ensure that grades is an array
    const gradesArray = Array.isArray(grades) ? grades : [grades];
  
    let totalScore = 0;
  
    gradesArray.forEach((grade) => {
      totalScore += grade.grade.scale * units;
    });
  
    const totalUnits = gradesArray.reduce((total, grade) => total + units, 0);
  
    return totalUnits !== 0 ? totalScore / totalUnits : 0;
  };

  useEffect(() => {
    fetchCourses();
  }, [onCourseAdded]);

  useEffect(() => {
    fetchSemesterGPA();
  }, [courses]);

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
      <div className="grid grid-cols-7">
        <div className="col-span-3">
          <h3 className="text-xl font-semibold">Course Name</h3>
        </div>
        <div className="col-span-1 flex justify-center">
          <p>Units</p>
        </div>
        <div className="col-span-1 flex justify-center">
          <p>Midterm Grade</p>
        </div>
        <div className="col-span-1 flex justify-center">
          <p>Final Grade</p>
        </div>
        <div className="col-span-1 flex justify-center">
          <p></p>
        </div>
      </div>
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
      <div className="grid grid-cols-7">
      <div className="flex col-span-4 justify-center">
          <p></p>
        </div>
        <div className="flex col-span-1 justify-end">
        <h3 className="text-xl font-semibold">GPA:</h3>
        </div>
        <div className="flex col-span-1 justify-center">
        <h3 className="text-xl font-semibold">{semesterGPA}</h3>
        </div>
        </div>
    </div>
  );
};

export default CourseList;

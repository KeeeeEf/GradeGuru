// components/CourseList.js
import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import axios from 'axios';
import config from '../common/config';

const CourseList = ({ semesterId }) => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${config.API}/courses/getCoursesBySemester?semesterId=${semesterId}`);
        setCourses(response.data.data);
      } catch (err) {
        setError('Error fetching courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [semesterId]);

  if (isLoading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>Error fetching courses: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 w-full">
      {courses.map((course) => (
        <CourseCard key={course.course_id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;

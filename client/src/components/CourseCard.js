import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course, onDelete }) => {
  return (
    <div className="border p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 flex justify-between items-center">
      <Link to={`/course/${course.course_id}`} key={course.course_id}>
        <h3 className="text-xl font-semibold mb-2">{course.course_name}</h3>
      </Link>
      <button onClick={() => onDelete(course.course_id)} className="bg-red-500 text-white py-2 px-4 rounded">
        Delete
      </button>
    </div>
  );
};

export default CourseCard;

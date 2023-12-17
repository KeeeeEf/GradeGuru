// components/CourseCard.js
import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="border p-4 rounded-md shadow-md hover:shadow-lg transition duration-300">
      <h3 className="text-xl font-semibold mb-2">{course.course_name}</h3>
    </div>
  );
};

export default CourseCard;

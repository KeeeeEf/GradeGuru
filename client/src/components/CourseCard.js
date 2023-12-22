// CourseCard.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchGradesForCourse } from './utils';

const CourseCard = ({ course, onDelete }) => {
  const [midtermGrade, setMidtermGrade] = useState(null);
  const [finalGrade, setFinalGrade] = useState(null);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    let data = await fetchGradesForCourse(course.course_id, 'midterms');
    setMidtermGrade(data);
    data = await fetchGradesForCourse(course.course_id, 'finals');
    setFinalGrade(data);
  };

  return (
    <div className="border p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 grid grid-cols-7 gap-4">
  <div className="col-span-3">
    <Link to={`/course/${course.course_id}`} key={course.course_id}>
      <h3 className="text-xl font-semibold">{course.course_name}</h3>
    </Link>
  </div>
  <div className="col-span-1 flex justify-center">
      <h3 className="text-xl font-semibold">{course.units}</h3>
      </div>
  {midtermGrade && finalGrade && midtermGrade.grade && finalGrade.grade && (
    <>
      <div className="col-span-1 flex justify-center">
      <h3 className="text-xl font-semibold">{midtermGrade.grade.scale}</h3>
      </div>
      <div className="col-span-1 flex justify-center">
      <h3 className="text-xl font-semibold">{finalGrade.grade.scale}</h3>
      </div>
    </>
  )}
  <div className="col-span-1 flex justify-center">
    <button onClick={() => onDelete(course.course_id)} className=" rounded text-red-500">
      <DeleteIcon />
    </button>
  </div>
</div>

  );
};

export default CourseCard;

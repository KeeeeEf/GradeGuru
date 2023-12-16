import React from 'react';

const SemesterCard = ({ semester }) => {
  return (
    <div className="border p-4 my-4">
      <h3>{semester.name}</h3>
      <p>Start Date: {semester.startDate}</p>
      <p>End Date: {semester.endDate}</p>
    </div>
  );
};

export default SemesterCard;

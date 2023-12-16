// SemesterCard.js

import React from 'react';

const SemesterCard = ({ semester }) => {
  return (
    <div className="border p-4 rounded-md shadow-md hover:shadow-lg transition duration-300">
      <h3 className="text-xl font-semibold mb-2">{semester.semester}</h3>
      <p className="text-gray-600">{semester.year}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default SemesterCard;

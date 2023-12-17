import React, { useState } from 'react';
import Dropdown from './Dropdown';

const Table = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState([
    { activity: 'Activity 1', type: 'Type 1', score: 10, total: 20 },
    { activity: 'Activity 2', type: 'Type 2', score: 15, total: 30 },
    // Add more data as needed
  ]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (index, key, value) => {
    const newData = [...data];
    newData[index][key] = value;
    setData(newData);
  };

  return (
    <div className="w-full">
      <button onClick={handleEdit} className='float-right'>{isEditing ? 'Save Grade' : 'Edit Grade'}</button>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2 w-1/4">Activity</th>
            <th className="border p-2 w-1/4">Type</th>
            <th className="border p-2 w-1/4">Score</th>
            <th className="border p-2 w-1/4">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={item.activity}
                    onChange={(e) => handleInputChange(index, 'activity', e.target.value)}
                  />
                ) : (
                  item.activity
                )}
              </td>
              <td className="border p-2">
                {isEditing ? (
                  <Dropdown title={"Type"} options={props.options}/>
                ) : (
                  item.type
                )}
              </td>
              <td className="border p-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={item.score}
                    onChange={(e) => handleInputChange(index, 'score', e.target.value)}
                  />
                ) : (
                  item.score
                )}
              </td>
              <td className="border p-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={item.total}
                    onChange={(e) => handleInputChange(index, 'total', e.target.value)}
                  />
                ) : (
                  item.total
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

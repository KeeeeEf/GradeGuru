import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import config from '../common/config';
import axios from 'axios';

const Table = (props) => {
  const data = props.data || [];

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState([]); // Use a separate state to store edited data

  useEffect(() => {
    setEditedData([...props.data]);
  }, [props.data]);

  const handleEdit = () => {
    setIsEditing(!isEditing);

    if(isEditing){
      handleUpdate()
    }
  };

  const handleUpdate = () => {
    // Update the backend with editedData
    axios.post(`${config.API}/activity/editactivity`, editedData)
      .then((res) => {
        if (res.data.success === true) {
          alert("Updated Successfully!");
        } else {
          alert("Error updating data");
        }
      });
  };

  const handleInputChange = (index, field, value) => {
    // Update the editedData state when an input field changes

    const newData = [...editedData];
    newData[index][field] = value;
    setEditedData(newData);
  };

  return (
    <div className="w-full">
      <button onClick={handleEdit} className='float-right'>
        {isEditing ? 'Save Grade' : 'Edit Grade'}
      </button>
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
                  <Dropdown
                    title={"Type"}
                    options={props.options}
                    select={item.type}
                    onSelect={(value) => handleInputChange(index, 'type', value)}
                  />
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

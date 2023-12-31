import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import config from '../common/config';
import axios from 'axios';
import Danger from './danger';

const Table = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState([]);
  const [activityId, setActivityId] = useState('');
  const [deleteState, setDeleteState] = useState('');
  const [error, setError] = useState("");

  useEffect(() => {
    setEditedData([...props.data]);
  }, [props.data]);

  useEffect(() => {
    setEditedData([...props.data]);
  }, [props.data, isEditing]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = () => {

    const test = editedData.some((data)=>{
      const numericScore = parseFloat(data.score);
      const numericTotal = parseFloat(data.total);

      return numericScore>numericTotal;
    })


    if(test){
      setError(`Score is greater than Total`)
      return;
  }

    axios.post(`${config.API}/activity/editactivity`, editedData)
      .then((res) => {
        if (res.data.success === true) {
          props.onUpdate(); 
          setIsEditing(!isEditing);
        } else {
        }
      });
  };

  const handleInputChange = (index, field, value) => {
    setEditedData(prevData => {
      const newData = [...prevData];
      newData[index][field] = value;
      return newData;
    });
  };

  const handleDeleteState = (status) => {
    setDeleteState(status);
  };
  
  useEffect(() => {
    if (deleteState === 'one') {
      handleDeleteOne();
    } else if (deleteState === 'all') {
      handleDeleteAll();
    }
  }, [deleteState]);
  
  const handleDeleteOne = async () => {
    try {
      const response = await axios.delete(`${config.API}/activity/deleteactivity`, {
        data: {
          status: 'one',
          data: {
            course_id: 1,
            activity_id: activityId,
          },
        },
      });
  
      console.log("Server response:", response.data);
  
      if (response.data.success === true) {
        alert("Deleted Successfully!");
        props.onUpdate();
        setActivityId('');
        setDeleteState('');
      } else {
        alert("Error deleting data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting data");
    }
  };
  
  const handleDeleteAll = async () => {
    try {
      const response = await axios.delete(`${config.API}/activity/deleteactivity`, {
        data: {
          status: 'all',
          data: {
            course_id: 1,
          },
        },
      });
  
      console.log("Server response:", response.data);
  
      if (response.data.success === true) {
        alert("Deleted All Successfully!");
        props.onUpdate();
        setDeleteState('');
      } else {
        alert("Error deleting all data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting all data");
    }
  };


  return (
    <div className="w-full">
      <div className=''>
        <button onClick={isEditing? handleUpdate : handleEdit} className='float-right'>
          {isEditing ? 'Save Grade' : 'Edit Grade'}
        </button>
        {isEditing ? <button onClick={()=>{;handleDeleteState('all'); }}className='float-right mr-[2rem]'>Delete All</button>:<div></div>}
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 w-1/4">Activity</th>
            <th className="p-2 w-[21%]">Type</th>
            <th className="p-2 w-1/4">Score</th>
            <th className="p-2 w-1/4">Total</th>
            <th className="w-[2%]"></th>
          </tr>
        </thead>
        <tbody>
          {editedData.map((item, index) => (
            <tr key={index}>
              <td className="border p-2 ">
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
              <td className="border p-2 pl-[6px]">

                {isEditing ? (
                  <Dropdown
                    title={"Type"}
                    options={props.options}
                    select={item.type}
                    className={'ml-[-4px]'}
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
              <td className='text-center'>
                {isEditing ? (
                  <button onClick={()=>{setActivityId(item.activity_id);handleDeleteState('one'); }}>
                      x
                  </button>
                ):(
                  <div>

                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error !='' && <Danger message={error} onChanged={(value)=>setError(value)}/>}
    </div>
  );
};

export default Table;

import React, { useEffect, useState } from 'react';

const Dropdown = (props) => {
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    // Set the selected value when the component mounts
    if (props.select) {
      setSelectedValue(props.select);
    }
  }, [props.select]);

  const handleSelectChange = (e) => {
    console.log(e.target.value)
    const changedvalue = e.target.value;
    props.onSelect(changedvalue);
  };

  return (
    <div>
      <select
        className={props.className}
        style={{ width: '150px' }}
        value={props.select}
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          Select {props.title}
        </option>
        {props.options.map((data, index) => (
          <option key={index} value={data}>
            {data}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;

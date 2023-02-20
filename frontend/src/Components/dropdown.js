import React, { useState } from 'react';

import Select from 'react-select';
// import "../style.css";

export const transformListJSON = (list = [])=> {
  let result = [];

    for(let k = 0; k <= list.length; k++){   
            result.push({
            "value":list[k],
            "label":list[k]
        })
    }
    return result
}

const Dropdown = (props) => {
  const handleChange = (selected) => {
    props.setData(selected.value);
    console.log(selected.value);
    
  };
  return (
    <form data-testid="dropdown">
      <Select
      data-testid="url"
      placeholder="Select"
        className="basic-single"
        classNamePrefix="select"
        defaultValue={''}
        name="dropdown"
        inputId='dropdown'
        options={transformListJSON(props.list)}
        onChange={handleChange}
      />
    </form>
  );
};

export default Dropdown;
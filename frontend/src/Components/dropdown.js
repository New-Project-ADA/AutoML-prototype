import React, { useState } from 'react';

import Select from 'react-select';
// import "../style.css";

const urls = [
  { value: "20090118_064750", label: "20090118_064750" },
  { value: "20090119_211141", label: "20090119_211141" },
  { value: "20100208_112154", label: "20100208_112154" },
  { value: "20120915_163224", label: "20120915_163224" }
];

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
    props.stateChanger(selected);
    props.setMseedSelected(selected);
    
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
import React, { useState } from "react";

function SelectInput({ label, value, options, optionName, isDisabled, setOnChange, onChoose }) {
  const fnc = (option, name) => {
    return <option key={option.id}>{option.name || option.faculty_name || option.course_name}</option>;
  };

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        value={value}
        onChange={(e) => {
          setOnChange(e.target.value);
          if (onChoose) {
            onChoose(e.target.value);
          }
        }}
      >
        {options.map((option) => fnc(option, optionName))}
      </select>
    </div>
  );
}

export default SelectInput;

import React, { useEffect, useState } from "react";

function SelectInput({ label, value, options, optionName, isDisabled, setOnChange, onChoose }) {
  const fnc = (option, name) => {
    return (
      <option key={option.id} onMouseOver={() => {}}>
        {option.name || option.faculty_name || option.course_name}
      </option>
    );
  };

  const [inputValue, setInputValue] = useState();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        disabled={isDisabled}
        value={inputValue}
        onChange={(e) => {
          setOnChange(e.target.value);
          if (onChoose) {
            onChoose(e.target.value);
          }
        }}
      >
        <option></option>
        {options.map((option) => fnc(option, optionName))}
      </select>
    </div>
  );
}

export default SelectInput;

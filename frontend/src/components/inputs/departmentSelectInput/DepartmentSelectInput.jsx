import React, { useEffect, useState } from "react";

function DepartmentSelectInput({ label, value, departmentId, options, optionName, isDisabled, setOnChange, onChoose, setCourseCode }) {
  const fnc = (option, name) => {
    return <option key={option.id}>{option?.description}</option>;
  };

  const [inputValue, setInputValue] = useState("");

  const handleGetId = (selectedItem) => {
    for (let i = 0; i < options?.length; i++) {
      if (options[i]?.description.includes(selectedItem)) {
        //setCourseCode(options[i].course_code);
        return options[i].id;
      }
    }
  };

  const handleGetDepartmentName = (departmentId) => {
    for (let i = 0; i < options?.length; i++) {
      if (options[i].id === departmentId) {
        console.log(options[i].description);
        //setCourseCode(options[i].course_code);
        console.log(options[i].description);
        return setInputValue(options[i].description);
      }
    }
  };

  useEffect(() => {
    handleGetDepartmentName(departmentId);
  }, [departmentId]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        disabled={isDisabled}
        value={inputValue}
        onChange={(e) => {
          setOnChange(e.target.value);
          handleGetId(e.target.value);
          onChoose(handleGetId(e.target.value));
        }}
      >
        <option></option>
        {options?.map((option) => fnc(option, optionName))}
      </select>
    </div>
  );
}

export default DepartmentSelectInput;

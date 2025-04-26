import React, { useEffect, useState } from "react";

function DepartmentSelectInput({ label, value, courseId, options, optionName, isDisabled, setOnChange, onChoose, setCourseCode }) {
  const fnc = (option, name) => {
    return <option key={option.id}>{`${option?.department_name} - ${option?.description}`}</option>;
  };

  const [inputValue, setInputValue] = useState("");

  const handleGetId = (selectedItem) => {
    for (let i = 0; i < options?.length; i++) {
      if (options[i]?.department_name === selectedItem) {
        //setCourseCode(options[i].course_code);
        return options[i].id;
      }
    }
  };

  const handleGetDepartmentName = (courseId) => {
    for (let i = 0; i < options?.length; i++) {
      if (options[i].id === courseId) {
        //setCourseCode(options[i].course_code);
        return setInputValue(options[i].department_name);
      }
    }
  };

  useEffect(() => {
    handleGetDepartmentName(courseId);
  }, [courseId]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        disabled={isDisabled}
        value={value}
        onChange={(e) => {
          setOnChange(e.target.value);
          //onChoose(handleGetId(e.target.value));
        }}
      >
        <option></option>
        {options?.map((option) => fnc(option, optionName))}
      </select>
    </div>
  );
}

export default DepartmentSelectInput;

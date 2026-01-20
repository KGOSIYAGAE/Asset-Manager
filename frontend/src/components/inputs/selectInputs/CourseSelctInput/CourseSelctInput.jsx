import React, { useEffect, useState } from "react";

function CourseSelctInput({ label, value, courseList, isDisabled, setOnChange, setCourseCode }) {
  const handleSetCourseCode = (selected_course) => {
    for (let i = 0; i < courseList?.length; i++) {
      if (courseList[i]?.course_name === selected_course) {
        setCourseCode(courseList[i]?.course_code);
      }
    }
  };

  const handleSetCourse = (value) => {
    for (let i = 0; i < courseList?.length; i++) {
      if (courseList[i]?.course_name === value) {
      }
    }
  };

  useEffect(() => {
    handleSetCourse(value);
  }, [value, courseList]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        disabled={isDisabled}
        value={value}
        onChange={(e) => {
          setOnChange(e.target.value);
          handleSetCourseCode(e.target.value);
        }}
      >
        <option></option>
        {courseList && courseList.map((item) => <option key={item.id}>{item.course_name}</option>)}
      </select>
    </div>
  );
}

export default CourseSelctInput;

/**
 import React, { useEffect, useState } from "react";

function CourseSelctInput({ label, value, courseId, options, optionName, isDisabled, setOnChange, onChoose, setCourseCode }) {
  const fnc = (option, name) => {
    return <option key={option.id}>{option?.invoice_number || option?.course_name}</option>;
  };

  const [inputValue, setInputValue] = useState("");

  const handleGetId = (selectedItem) => {
    for (let i = 0; i < options?.length; i++) {
      if (options[i]?.course_name === selectedItem) {
        setCourseCode(options[i].course_code);

        return options[i].id;
      }
    }
  };

  const handleGetCourseName = (courseId) => {
    for (let i = 0; i < options?.length; i++) {
      if (options[i].id === courseId) {
        setCourseCode(options[i].course_code);
        console.log(options);
        return setInputValue(options[i].course_name);
      }
    }
  };

  useEffect(() => {
    handleGetCourseName(courseId);
    console.log(courseId);
  }, [courseId]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        disabled={isDisabled}
        value={inputValue}
        onChange={(e) => {
          setOnChange(e.target.value);
          onChoose(handleGetId(e.target.value));
        }}
      >
        <option></option>
        {options?.map((option) => fnc(option, optionName))}
      </select>
    </div>
  );
}

export default CourseSelctInput;

 */

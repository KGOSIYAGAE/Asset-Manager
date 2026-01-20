import React, { useEffect, useState } from "react";

function StudentFacultySelectInput({ label, value, facultiesDataList, isDisabled, setOnChange, setCourseList }) {
  const [facultyCourses, setFacultyCourses] = useState([]);

  const showFaculty = (value) => {
    for (let i = 0; i < facultiesDataList?.length; i++) {
      if (facultiesDataList[i]?.faculty_name === value) {
        setOnChange(facultiesDataList[i].faculty_name);
      }
    }
  };

  const showFacultiesCourses = (selected_faculty) => {
    for (let i = 0; i < facultiesDataList?.length; i++) {
      if (facultiesDataList[i]?.faculty_name === selected_faculty) {
        setCourseList(facultiesDataList[i].courses);
      }
    }
  };

  useEffect(() => {
    showFacultiesCourses(value);
    showFaculty(value);
  }, [value, facultiesDataList]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        value={value}
        isDisabled={isDisabled}
        onChange={(e) => {
          setOnChange(e.target.value);
          showFacultiesCourses(e.target.value);
        }}
      >
        <option></option>
        {facultiesDataList && facultiesDataList.map((item) => <option key={item.id}>{item.faculty_name}</option>)}
      </select>
    </div>
  );
}

export default StudentFacultySelectInput;

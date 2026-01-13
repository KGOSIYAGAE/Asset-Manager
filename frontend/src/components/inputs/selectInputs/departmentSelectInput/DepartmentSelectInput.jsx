import React, { useEffect, useState } from "react";

function DepartmentSelectInput({ label, value, faculty, departmentList, isDisabled, setOnChange, setPositions }) {
  const [faculty_depts, setFaculty_deps] = useState([]);

  const showDepartment = () => {
    for (let i = 0; i < departmentList.length; i++) {
      if (departmentList[i].faculty === faculty) {
        setFaculty_deps(departmentList[i].departments);
        setOnChange(value);
        //setPositions
      }
    }
  };

  const setSelecedPos = (pos) => {
    for (let i = 0; i < faculty_depts.length; i++) {
      if (faculty_depts[i].name === pos) {
        setPositions(faculty_depts[i].positions);
        console.log(faculty_depts[i].positions);
      }
    }
  };

  useEffect(() => {
    showDepartment();
  }, [faculty]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        value={value}
        isDisabled={isDisabled}
        onChange={(e) => {
          setOnChange(e.target.value);
          setSelecedPos(e.target.value);
        }}
      >
        {faculty_depts.map((item) => (
          <option key={item.id}>{item.name}</option>
        ))}
      </select>
    </div>
  );
}

export default DepartmentSelectInput;

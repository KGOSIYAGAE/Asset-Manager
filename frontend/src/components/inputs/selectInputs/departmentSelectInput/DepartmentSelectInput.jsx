import React, { useEffect, useState } from "react";

function DepartmentSelectInput({ label, value, faculty, departmentList, isDisabled, setOnChange }) {
  const [faculty_depts, setFaculty_deps] = useState([]);

  const showDepartment = () => {
    for (let i = 0; i < departmentList.length; i++) {
      if (departmentList[i].faculty === faculty) {
        setFaculty_deps(departmentList[i].departments);
        setOnChange(value);
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
          console.log(e.target.value);
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

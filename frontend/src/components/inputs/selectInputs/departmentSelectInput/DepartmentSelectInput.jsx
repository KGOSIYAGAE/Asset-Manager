import React, { useEffect, useState } from "react";
import { getDepartments, getDepartmentsList, getDepartmentsOfFaculty } from "../../../../services/api/organization/Organization";

function DepartmentSelectInput({ label, department_id, faculty_id, isDisabled, setDepartment_id }) {
  const [department_name, setDepartment_name] = useState();
  const [departments, setDepartments] = useState([]);

  const handleSetDepartmentId = (selectedDepartment) => {
    for (let i = 0; i < departments?.length; i++) {
      if (departments[i]?.department_name === selectedDepartment) {
        setDepartment_id(departments[i].department_id);
      }
    }
  };

  const handleSetDepartmentName = (department_id) => {
    for (let i = 0; i < departments?.length; i++) {
      if (departments[i].department_id === department_id) {
        setDepartment_name(departments[i]?.department_name);
      }
    }
  };

  useEffect(() => {
    getDepartmentsList(setDepartments);
  }, []);

  useEffect(() => {
    if (faculty_id) {
      getDepartmentsOfFaculty(faculty_id, setDepartments);
    }
  }, [faculty_id]);

  useEffect(() => {
    if (departments?.length > 0) {
      handleSetDepartmentName(department_id);
    }
  }, [department_id, departments]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        value={department_name}
        isDisabled={isDisabled}
        onChange={(e) => {
          setDepartment_name(e.target.value);
          handleSetDepartmentId(e.target.value);
        }}
      >
        <option></option>
        {departments?.map((item) => (
          <option key={item.department_id}>{item.department_name}</option>
        ))}
      </select>
    </div>
  );
}

export default DepartmentSelectInput;

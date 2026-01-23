import React, { useEffect } from "react";

function FacultySelectInput({ label, value, departmentEntitiesList, isDisabled, setOnChange, setDepartmentList }) {
  const handleSetDepartmentList = (selectedEntity) => {
    for (let i = 0; i < departmentEntitiesList.length; i++) {
      if (departmentEntitiesList[i].faculty === selectedEntity) {
        setDepartmentList(departmentEntitiesList[i].departments);
      }
    }
  };

  useEffect(() => {
    handleSetDepartmentList(value);
  }, [value]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        value={value}
        isDisabled={isDisabled}
        onChange={(e) => {
          setOnChange(e.target.value);
          handleSetDepartmentList(e.target.value);
        }}
      >
        <option></option>
        {departmentEntitiesList.map((item) => (
          <option key={item.id}>{item.faculty}</option>
        ))}
      </select>
    </div>
  );
}

export default FacultySelectInput;

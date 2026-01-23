import React, { useEffect, useState } from "react";

function DepartmentSelectInput({ label, value, departmentList, isDisabled, setOnChange, setPositionList }) {
  const handleSetPositionsList = (selectedDepartement) => {
    for (let i = 0; i < departmentList?.length; i++) {
      if (departmentList[i].name === selectedDepartement) {
        setPositionList(departmentList[i].positions);
      }
    }
  };

  useEffect(() => {
    handleSetPositionsList(value);
  }, [departmentList]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        value={value}
        isDisabled={isDisabled}
        onChange={(e) => {
          setOnChange(e.target.value);
          handleSetPositionsList(e.target.value);
        }}
      >
        <option></option>
        {departmentList?.map((item) => (
          <option key={item.id}>{item.name}</option>
        ))}
      </select>
    </div>
  );
}

export default DepartmentSelectInput;

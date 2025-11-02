import React, { useEffect } from "react";

function FacultySelectInput({ label, value, departmentList, isDisabled, setOnChange }) {
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
        <option></option>
        {departmentList.map((item) => (
          <option key={item.id}>{item.faculty}</option>
        ))}
      </select>
    </div>
  );
}

export default FacultySelectInput;

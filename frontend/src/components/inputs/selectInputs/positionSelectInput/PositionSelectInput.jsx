import React, { useEffect, useState } from "react";

function PositionSelectInput({ value, label, positionsList, isDisabled, setOnChange }) {
  const showPosition = () => {
    console.log(positionsList);
    for (let i = 0; i < positionsList?.length; i++) {
      /*if (positionsList[i].faculty === faculty) {
        setFaculty_deps(positionsList[i].departments);
        setOnChange(value);
        console.log(positionsList[i].departments);
        //setPositions
      }*/
    }
  };

  useEffect(() => {
    showPosition();
  }, []);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        disabled={isDisabled}
        value={value}
        onChange={(e) => {
          setOnChange(e.target.value);
        }}
      >
        <option></option>
        {positionsList?.map((option) => (
          <option key={option.id}>{option.title}</option>
        ))}
      </select>
    </div>
  );
}

export default PositionSelectInput;

import React, { useEffect, useState } from "react";

function PositionSelectInput({ value, label, positionsList, isDisabled, setOnChange }) {
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

import React, { useEffect } from "react";

function TextInput({ label, value, isDisabled, setOnChange }) {
  useEffect((e) => {}, []);
  return (
    <div className="text-input">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <input
        type="text"
        className="outline-none"
        name="input-text"
        disabled={isDisabled}
        value={value}
        onChange={(e) => {
          setOnChange(e.target.value);
          console.log(e.target.value);
        }}
      />
    </div>
  );
}

export default TextInput;

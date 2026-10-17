import React, { useEffect } from "react";

function TextInput({ label, value, isDisabled, maxLength, placeHolder, setOnChange, type }) {
  useEffect((e) => {}, []);
  return (
    <div className="text-input group focus-within:border-red-600 ">
      <span className="w-fit group-focus-within:text-red-600 text-zinc-500 -mt-5 bg-white">{label}</span>
      <input
        type={type ? type : "text"}
        className="outline-none"
        maxLength={maxLength}
        placeholder={placeHolder && placeHolder ? placeHolder : ""}
        name="input-text"
        disabled={isDisabled}
        value={value}
        onChange={(e) => {
          setOnChange(e.target.value);
        }}
      />
    </div>
  );
}

export default TextInput;

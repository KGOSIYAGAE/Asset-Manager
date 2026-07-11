import React, { useEffect } from "react";

function TextArea({ label, value, isDisabled, maxLength, setOnChange }) {
  useEffect((e) => {}, []);
  return (
    <div className="text-area">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <textarea
        type="text"
        className="h-[50px] outline-none"
        maxLength={maxLength}
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

export default TextArea;

import React, { useEffect } from "react";

function TextArea({ label, value, isDisabled, maxLength, document, setOnChange }) {
  useEffect((e) => {}, []);
  return (
    <div className="text-input group focus-within:border-red-600 ">
      <span className="w-fit group-focus-within:text-red-600 text-zinc-500 -mt-5 bg-white">{label}</span>
      <textarea
        type="text"
        className={`${document && document ? `lg:h-[350px]` : "h-[150px] lg:h-[50px]"}  outline-none`}
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

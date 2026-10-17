import React from "react";

function LoginEmailInput({ label, value, isDisabled, maxLength, setOnChange, type }) {
  return (
    <div className="text-input group focus-within:border-red-600 ">
      <span className="w-fit group-focus-within:text-red-600 text-zinc-500 -mt-5 bg-white">{label}</span>
      <input
        type={type}
        className="w-full outline-none rounded-md p-1"
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

export default LoginEmailInput;

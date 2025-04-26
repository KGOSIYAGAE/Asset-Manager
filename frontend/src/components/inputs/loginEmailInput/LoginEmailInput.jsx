import React from "react";

function LoginEmailInput({ label, value, isDisabled, maxLength, setOnChange, type }) {
  return (
    <div className="flex flex-col">
      <span className="w-fit text-zinc-500  bg-white">{label}</span>
      <div className="flex justify-between items-center p-1">
        <input
          type={type}
          className="w-full outline-none border-2 focus:border-red-600 rounded-md p-1"
          maxLength={maxLength}
          name="input-text"
          disabled={isDisabled}
          value={value}
          onChange={(e) => {
            setOnChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default LoginEmailInput;

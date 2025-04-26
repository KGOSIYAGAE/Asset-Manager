import React, { useEffect, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";

function TextInput({ label, value, isDisabled, maxLength, setOnChange, type }) {
  useEffect((e) => {
    setTextType("password");
    setIsVisible(false);
  }, []);

  const [textType, setTextType] = useState("text");
  const [isVisible, setIsVisible] = useState(false);

  const togglePassword = () => {
    if (textType === "password") {
      setTextType("text");
      setIsVisible(true);
    } else {
      setTextType("password");
      setIsVisible(false);
    }
  };

  return (
    <div className="flex flex-col">
      <span className="w-fit text-zinc-500  bg-white">{label}</span>
      <div className="flex justify-between items-center p-1">
        <input
          type={textType}
          className="w-full outline-none border-2 focus:border-red-600 rounded-md p-1"
          maxLength={maxLength}
          name="input-text"
          disabled={isDisabled}
          value={value}
          onChange={(e) => {
            setOnChange(e.target.value);
          }}
        />
        <div className="absolute right-8">
          {isVisible ? (
            <FaEye
              size={20}
              className="text-zinc-600"
              onClick={() => {
                togglePassword();
              }}
            />
          ) : (
            <FaEyeSlash
              size={20}
              className="text-zinc-600"
              onClick={() => {
                togglePassword();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TextInput;

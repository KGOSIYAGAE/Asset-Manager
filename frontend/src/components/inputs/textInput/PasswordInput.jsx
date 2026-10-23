import React, { useEffect, useRef, useState } from "react";
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
    <div className=" text-input flex flex-row justify-between text-input group focus-within:border-red-600 ">
      <span className="w-fit absolute  group-focus-within:text-red-600 text-zinc-500 -mt-5 bg-white">{label}</span>
      <input
        type={textType}
        className="w-full outline-none "
        maxLength={maxLength}
        name="input-text"
        disabled={isDisabled}
        value={value}
        onChange={(e) => {
          setOnChange(e.target.value);
        }}
      />
      <button>
        {isVisible ? (
          <FaEye
            size={20}
            className="text-zinc-600"
            onClick={(e) => {
              e.preventDefault();
              togglePassword();
            }}
          />
        ) : (
          <FaEyeSlash
            size={20}
            className="text-zinc-600"
            onClick={(e) => {
              e.preventDefault();
              togglePassword();
            }}
          />
        )}
      </button>
    </div>
  );
}

export default TextInput;

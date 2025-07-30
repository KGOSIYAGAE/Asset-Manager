import React, { useEffect, useState } from "react";

function PositionSelectInput({ value, label, positionId, options, optionName, isDisabled, setOnChange, onChoose }) {
  const fnc = (option, name) => {
    return <option key={option.id}>{option.title}</option>;
  };

  const [inputValue, setInputValue] = useState("");

  const handleGetPositionId = (position_title) => {
    for (let i = 0; i < options?.length; i++) {
      if (options[i].title === position_title) {
        setInputValue(options[i].id);

        return options[i].id;
      }
    }
  };

  const handleGetpositionTitle = (title) => {
    for (let i = 0; i < options?.length; i++) {
      if (options[i].title === title) {
        setOnChange(options[i].title);
        return setInputValue(options[i].title);
      }
    }
  };

  useEffect(() => {
    onChoose(handleGetPositionId(value));
    handleGetpositionTitle(value);
  }, [value]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        disabled={isDisabled}
        value={inputValue}
        onChange={(e) => {
          setOnChange(e.target.value);
          onChoose(handleGetPositionId(e.target.value));
        }}
      >
        <option></option>
        {options?.map((option) => fnc(option, optionName))}
      </select>
    </div>
  );
}

export default PositionSelectInput;

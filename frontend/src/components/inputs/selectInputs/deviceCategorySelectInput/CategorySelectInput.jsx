import React, { useEffect, useState } from "react";

function CategorySelectInput({ label, value, options, setOnChange, onChoose }) {
  const [inputValue, setInputValue] = useState();

  const fnc = (option) => {
    return <option key={option.id}>{option.category || option.name}</option>;
  };

  useEffect(() => {
    setInputValue(value);

    if (onChoose) {
      onChoose(value);
    }
  }, [value]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        value={inputValue}
        onChange={(e) => {
          setOnChange(e.target.value);
          if (onChoose) {
            onChoose(e.target.value);
          }
        }}
      >
        {/*options.map((option) => (
          <option key={option.id}></option>
        ))*/}
        <option></option>
        {options.map((option) => fnc(option))}
      </select>
    </div>
  );
}

export default CategorySelectInput;

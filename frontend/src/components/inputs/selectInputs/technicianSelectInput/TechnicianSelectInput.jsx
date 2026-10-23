import React, { useEffect, useState } from "react";

function TechnicianSelectInput({ label, value, options, optionName, isDisabled, setTechnicianName, setTechnicianId }) {
  const fnc = (option, name) => {
    return (
      <option
        key={option.id}
        value={option.id}
        onClick={() => {
          console.log("Hello");
        }}
      >
        {`${option.name} ${option.surname}`}
      </option>
    );
  };

  const handleUserChange = (event) => {
    const selectedId = event.target.value;

    // Find the full user object from your original data array
    const selectedUser = options.find((user) => String(user.id) === selectedId);

    setTechnicianName(`${selectedUser.name} ${selectedUser.surname}`);
    setTechnicianId(selectedUser.id);
  };

  const [inputValue, setInputValue] = useState();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select className="outline-none" disabled={isDisabled} value={inputValue} onChange={handleUserChange}>
        <option>- Select Technician -</option>
        {options?.map((option) => fnc(option, optionName))}
      </select>
    </div>
  );
}

export default TechnicianSelectInput;

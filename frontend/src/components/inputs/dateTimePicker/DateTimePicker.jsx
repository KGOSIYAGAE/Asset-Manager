import React from "react";

function DateTimePicker({ label, value, setOnChange }) {
  return (
    <div className="text-input">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <input
        type="date"
        className="flex outline-none"
        value={value}
        onChange={(e) => {
          const oldDate = e.target.value;
          const newDate = oldDate.split("T")[0];
          setOnChange(newDate);
        }}
      />
    </div>
  );
}

export default DateTimePicker;

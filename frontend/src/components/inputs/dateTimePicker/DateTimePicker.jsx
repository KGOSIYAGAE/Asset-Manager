import React, { useEffect, useState } from "react";
import { handleTimeStamp } from "../../../utils/dateConverter";

function DateTimePicker({ label, value, setOnChange }) {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(handleTimeStamp(value));
  }, [value]);
  return (
    <div className="text-input">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <input
        type="date"
        className="flex outline-none"
        value={date ? date : value}
        onChange={(e) => {
          console.log(e.target.value);
          setOnChange(e.target.value);
        }}
      />
    </div>
  );
}

export default DateTimePicker;

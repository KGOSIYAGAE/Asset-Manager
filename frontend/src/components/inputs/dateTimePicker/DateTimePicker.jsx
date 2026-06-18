import React, { useEffect, useState } from "react";
import { handleTimeStamp } from "../../../utils/dateConverter";

function DateTimePicker({ label, value, minimunDate, setOnChange }) {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(handleTimeStamp(value));
  }, [value]);
  return (
    <div className="text-input ">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <input
        type="date"
        className="flex  outline-none "
        value={date}
        min={minimunDate ? minimunDate : null}
        onChange={(e) => {
          setOnChange(e.target.value);
        }}
      />
    </div>
  );
}

export default DateTimePicker;

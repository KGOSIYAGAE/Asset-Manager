import React, { useEffect, useState } from "react";

function InvoiceSelectInput({ label, value, options, optionName, isDisabled, setOnChange, onChoose }) {
  const fnc = (option, name) => {
    return <option key={option.id}>{option.invoice_number}</option>;
  };

  const [inputValue, setInputValue] = useState("");

  const handleGetInvoiceId = (invoiceNumber) => {
    for (let i = 0; i < options.length; i++) {
      if (options[i].invoice_number === invoiceNumber) {
        return options[i].id;
      }
    }
  };

  useEffect(() => {
    setInputValue(value);
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
          onChoose(handleGetInvoiceId(e.target.value));
        }}
      >
        {options.map((option) => fnc(option, optionName))}
      </select>
    </div>
  );
}

export default InvoiceSelectInput;

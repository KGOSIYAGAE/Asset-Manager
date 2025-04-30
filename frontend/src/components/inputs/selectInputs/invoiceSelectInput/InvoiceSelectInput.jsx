import React, { useEffect, useState } from "react";

function InvoiceSelectInput({ label, value, invoiceId, options, optionName, isDisabled, setOnChange, onChoose, setCourseCode }) {
  const fnc = (option, name) => {
    return <option key={option.id}>{option?.invoice_number}</option>;
  };

  const [inputValue, setInputValue] = useState("");

  const handleGetId = (selectedItem) => {
    for (let i = 0; i < options?.length; i++) {
      if (options[i]?.invoice_number.includes(selectedItem)) {
        return options[i].id;
      }
    }
  };

  const handleGetInvoiceNumber = (invoiceId) => {
    for (let i = 0; i < options?.length; i++) {
      if (options[i].id === invoiceId) {
        return setInputValue(options[i].invoice_number);
      }
    }
  };

  useEffect(() => {
    handleGetInvoiceNumber(invoiceId);
  }, [invoiceId]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        disabled={isDisabled}
        value={inputValue}
        onChange={(e) => {
          setOnChange(e.target.value);
          handleGetId(e.target.value);
          onChoose(handleGetId(e.target.value));
        }}
      >
        <option></option>
        {options?.map((option) => fnc(option, optionName))}
      </select>
    </div>
  );
}

export default InvoiceSelectInput;

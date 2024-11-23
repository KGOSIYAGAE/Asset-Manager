import React, { useState } from "react";
import TextInput from "../inputs/textInput/TextInput";
import TextArea from "../inputs/textArea/TextArea";
import SubmitButton from "../buttons/SubmitButton";
import CancelButton from "../buttons/CancelButton";
import DateTimePicker from "../inputs/dateTimePicker/DateTimePicker";

function AddEditDevice({ path }) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [serial_no, setSerial_no] = useState("");
  const [assetTag, setAssetTag] = useState("");
  const [spec, setSpec] = useState("");
  const [category, setCategory] = useState(""); // Laptop, desktop, all in one, Monitor
  const [condition, setCondition] = useState(""); //New, Used, Faulty/ Scrap
  const [status, setStatus] = useState(""); //Available, Loaned, Assigned, Under Maintenance, Lost
  const [warrantyExpiration, setWarrantyExperation] = useState("");
  const [userId, setUserId] = useState("");
  const [supplier, setSupplier] = useState("");
  const [invoice_no, setInvoice_no] = useState("");
  const [purchaseValue, setPurchaseValue] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [location, setLocation] = useState(""); //Datacenter or user department
  const [assignedTo, setAssignedTo] = useState(""); //Stude/Staff
  const [loanStartDate, setLoanStartDate] = useState("");
  const [loanEndDate, setLoanEndDate] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50">
      <span className="text-sm">
        <b>Devices /</b> {path}
      </span>
      <div className="flex flex-col bg-white p-3 gap-5 rounded-md shadow-md">
        <div className="flex justify-between">
          <span className="heading-text">Device Details</span>
        </div>
        <div className="grid grid-cols-8 gap-8 pt-5">
          <div className="col-span-3">
            <TextInput label={"Serial Number"} value={serial_no} isDisabled={false} maxLength={15} setOnChange={setSerial_no} />
          </div>
          <div className="col-span-3">
            <TextInput label={"Asset Tag"} value={assetTag} isDisabled={false} maxLength={8} setOnChange={setAssetTag} />
          </div>

          <div className="col-span-2">
            <TextInput label={"Status"} value={status} isDisabled={false} maxLength={15} setOnChange={setStatus} />
          </div>

          <div className="col-span-4">
            <TextInput label={"Location"} value={location} isDisabled={false} maxLength={50} setOnChange={setLocation} />
          </div>
          <div className="col-span-2">
            <TextInput label={"Condition"} value={condition} isDisabled={false} maxLength={50} setOnChange={setCondition} />
          </div>

          <div className="col-span-2">
            <TextInput label={"Category"} value={category} isDisabled={false} maxLength={50} setOnChange={setCategory} />
          </div>
          <div className="col-span-3">
            <DateTimePicker label={"Warranty Experation date"} value={warrantyExpiration} setOnChange={setWarrantyExperation} />
          </div>

          <div className="col-span-3">
            <DateTimePicker label={"Purchase Date"} value={purchaseDate} setOnChange={setPurchaseDate} />
          </div>

          <div className="col-span-2">
            <TextInput label={"Manufacture"} value={make} isDisabled={false} maxLength={50} setOnChange={setMake} />
          </div>

          <div className="col-span-4">
            <TextInput label={"Supplier"} value={supplier} isDisabled={false} maxLength={50} setOnChange={setSupplier} />
          </div>

          <div className="col-span-2">
            <TextInput label={"Invoice Number"} value={invoice_no} isDisabled={false} maxLength={50} setOnChange={setInvoice_no} />
          </div>

          <div className="col-span-2">
            <TextInput label={"Model"} value={model} isDisabled={false} maxLength={50} setOnChange={setModel} />
          </div>
          <div className="col-span-2">
            <TextInput label={"Purchase Value"} value={purchaseValue} isDisabled={false} maxLength={50} setOnChange={setPurchaseValue} />
          </div>

          <div className="col-span-2">
            <DateTimePicker label={"Loan Start Date"} value={loanStartDate} setOnChange={setLoanStartDate} />
          </div>
          <div className="col-span-2">
            <DateTimePicker label={"Loan End Date"} value={loanEndDate} setOnChange={setLoanEndDate} />
          </div>
          <div className="col-span-6">
            <TextArea label={"Specification"} value={spec} isDisabled={false} setOnChange={setSpec} />
          </div>
        </div>
        <div className="flex justify-end gap-5">
          <CancelButton text={"Cancel"} />
          <SubmitButton text={"Submit"} />
        </div>
      </div>
    </div>
  );
}

export default AddEditDevice;

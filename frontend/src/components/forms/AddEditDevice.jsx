import React, { useEffect, useState } from "react";
import TextInput from "../inputs/textInput/TextInput";
import TextArea from "../inputs/textArea/TextArea";
import SubmitButton from "../buttons/SubmitButton";
import CancelButton from "../buttons/CancelButton";
import DateTimePicker from "../inputs/dateTimePicker/DateTimePicker";
import SelectInput from "../inputs/selectInput/SelectInput";
import { deviceCondition, deviceStatus } from "../../utils/deviceStatus.Condition";
import { deviceCategory, deviceManufacture } from "../../utils/deviceDetails";
import ToastMessage from "../toastMessage/ToastMessage";
import { useParams } from "react-router-dom";

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

  const [modelList, setModelList] = useState([]);
  const [showToast, setShowToast] = useState({ isShown: false, type: null, message: null });

  const params = useParams();

  //handle auto populate model
  const handleModel = (deviceMake) => {
    switch (deviceMake) {
      case "HP":
        setModelList([...deviceManufacture[0].deviceModel]);
        setModel(deviceManufacture[0].deviceModel[0].name);
        break;
      case "DELL":
        setModelList([...deviceManufacture[1].deviceModel]);
        setModel(deviceManufacture[1].deviceModel[0].name);
        break;
      case "Lenovo":
        setModelList([...deviceManufacture[2].deviceModel]);
        setModel(deviceManufacture[2].deviceModel[0].name);
        break;
      case "H3C":
        setModelList([...deviceManufacture[3].deviceModel]);
        setModel(deviceManufacture[3].deviceModel[0].name);
        break;

      default:
        break;
    }
  };

  //Handle add device
  const handleAddDevice = () => {
    const deviceDetails = {
      assetTag,
      make,
      model,
      serial_no,
      spec,
      category,
      condition,
      status,
      warrantyExpiration,
      location,
      supplier,
      invoice_no,
      purchaseValue,
      purchaseDate,
      loanStartDate,
      loanEndDate,
      assignedTo,
      userId,
    };
    console.log(deviceDetails);
  };

  //Handle Submit
  const handleSubmit = () => {
    if (!serial_no) {
      return setShowToast({ isShown: true, type: "error", message: "Device serial number must be provided." });
    }
    if (!assetTag) {
      return setShowToast({ isShown: true, type: "error", message: "Device asset number must be provided." });
    }
    if (!status) {
      return setShowToast({ isShown: true, type: "error", message: "Device status must be provided." });
    }
    if (!location) {
      return setShowToast({ isShown: true, type: "error", message: "Device location must be provided." });
    }
    if (!condition) {
      return setShowToast({ isShown: true, type: "error", message: "Device condition must be provided." });
    }
    if (!category) {
      return setShowToast({ isShown: true, type: "error", message: "Device category must be selected." });
    }
    if (!make) {
      return setShowToast({ isShown: true, type: "error", message: "Device manufacture must be provided." });
    }
    if (!warrantyExpiration) {
      return setShowToast({ isShown: true, type: "error", message: "Device warranty expiration date must be provided." });
    }
    if (!purchaseDate) {
      return setShowToast({ isShown: true, type: "error", message: "Device purchase date must be provided." });
    }
    if (!purchaseValue) {
      return setShowToast({ isShown: true, type: "error", message: "Device purchase value must be provided." });
    }
    if (!supplier) {
      return setShowToast({ isShown: true, type: "error", message: "Device supplier must be provided." });
    }
    if (!invoice_no) {
      return setShowToast({ isShown: true, type: "error", message: "Device invoice number must be provided." });
    }

    if (!spec) {
      return setShowToast({ isShown: true, type: "error", message: "Device specification must be provided." });
    }

    handleAddDevice();
  };

  useEffect(() => {}, []);

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
            <TextInput label={"Serial Number"} value={serial_no} isDisabled={false} maxLength={12} setOnChange={setSerial_no} />
          </div>
          <div className="col-span-3">
            <TextInput label={"Asset Tag"} value={assetTag} isDisabled={false} maxLength={6} setOnChange={setAssetTag} />
          </div>

          <div className="col-span-2">
            <SelectInput label={"Status"} value={status} options={deviceStatus} optionName={"name"} isDisabled={false} setOnChange={setStatus} onChoose={() => {}} />
          </div>

          <div className="col-span-4">
            <TextInput label={"Location"} value={location} isDisabled={false} maxLength={50} setOnChange={setLocation} />
          </div>
          <div className="col-span-2">
            <SelectInput label={"Condition"} value={condition} options={deviceCondition} optionName={"name"} isDisabled={false} setOnChange={setCondition} onChoose={() => {}} />
          </div>

          <div className="col-span-2">
            <SelectInput label={"Category"} value={category} options={deviceCategory} optionName={"name"} isDisabled={false} setOnChange={setCategory} />
          </div>
          <div className="col-span-3">
            <DateTimePicker label={"Warranty Experation date"} value={warrantyExpiration} setOnChange={setWarrantyExperation} />
          </div>

          <div className="col-span-3">
            <DateTimePicker label={"Purchase Date"} value={purchaseDate} setOnChange={setPurchaseDate} />
          </div>

          <div className="col-span-2">
            <SelectInput label={"Manufacture"} value={make} options={deviceManufacture} optionName={"name"} isDisabled={false} setOnChange={setMake} onChoose={handleModel} />
          </div>

          <div className="col-span-4">
            <TextInput label={"Supplier"} value={supplier} isDisabled={false} maxLength={50} setOnChange={setSupplier} />
          </div>

          <div className="col-span-2">
            <TextInput label={"Invoice Number"} value={invoice_no} isDisabled={false} maxLength={10} setOnChange={setInvoice_no} />
          </div>

          <div className="col-span-2">
            <SelectInput label={"Model"} value={model} options={modelList} optionName={"name"} opisDisabled={false} setOnChange={setModel} />
          </div>
          <div className="col-span-2">
            <TextInput label={"Purchase Value"} value={purchaseValue} isDisabled={false} maxLength={10} setOnChange={setPurchaseValue} />
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
          <SubmitButton text={"Submit"} onClick={handleSubmit} />
        </div>
      </div>
      <ToastMessage isShown={showToast.isShown} type={showToast.type} message={showToast.message} onClose={() => setShowToast({ isShown: false })} />
    </div>
  );
}

export default AddEditDevice;

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
import { useNavigate, useParams } from "react-router-dom";
import { addDevice, getDevice, updateDevice } from "../../services/api/devices/Device.Api";
import { getAllInvoices } from "../../services/api/invoices/Inovices.Api";
import { useInvoiceContext } from "../../hooks/useInvoiceContext";
import InvoiceSelectInput from "../inputs/invoiceSelectInput/InvoiceSelectInput";

function AddEditDevice({ path }) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [serial_no, setSerial_no] = useState("");
  const [assetTag, setAssetTag] = useState("");
  const [spec, setSpec] = useState("");
  const [category, setCategory] = useState("Laptop"); // Laptop, desktop, all in one, Monitor
  const [device_condition, setDevice_Condition] = useState("New"); //New, Used, Faulty/ Scrap
  const [status, setStatus] = useState("Available"); //Available, Loaned, Assigned, Under Maintenance, Lost
  const [warranty_end_date, setWarranty_End_date] = useState("");
  const [invoice_no, setInvoice_no] = useState("");
  const [invoice_id, setInvoice_id] = useState(0);
  const [purchaseValue, setPurchaseValue] = useState("");
  const [currentValue, setCurrentValue] = useState("");

  const [modelList, setModelList] = useState([]);
  const [showToast, setShowToast] = useState({ isShown: false, type: null, message: null });
  const [formType, setFormType] = useState("Add");

  const { invoiceState, invoiceDispatch } = useInvoiceContext();

  const params = useParams();
  const navigate = useNavigate();

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

  //handle set form data
  const setFormData = (deviceDetails) => {
    setFormType("Edit");
    setSerial_no(deviceDetails[0].serial_no);
    setAssetTag(deviceDetails[0].asset_tag);
    setMake(deviceDetails[0].make);
    handleModel(deviceDetails[0].make);
    setSpec(deviceDetails[0].specification);
    setCategory(deviceDetails[0].category);
    setDevice_Condition(deviceDetails[0].device_condition);
    setStatus(deviceDetails[0].status);
    setWarranty_End_date(deviceDetails[0].warranty_end_date);
    setInvoice_no(deviceDetails[0].invoice_number);
    setPurchaseValue(deviceDetails[0].purchase_price);
    setCurrentValue(deviceDetails[0].purchase_price);
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
    if (!device_condition) {
      return setShowToast({ isShown: true, type: "error", message: "Device condition must be provided." });
    }
    if (!category) {
      return setShowToast({ isShown: true, type: "error", message: "Device category must be selected." });
    }
    if (!make) {
      return setShowToast({ isShown: true, type: "error", message: "Device manufacture must be provided." });
    }
    if (!warranty_end_date) {
      return setShowToast({ isShown: true, type: "error", message: "Device warranty end date must be provided." });
    }
    if (!purchaseValue) {
      return setShowToast({ isShown: true, type: "error", message: "Device purchase value must be provided." });
    }
    if (!currentValue) {
      return setShowToast({ isShown: true, type: "error", message: "Device current value must be provided." });
    }
    if (invoice_id <= 0) {
      return setShowToast({ isShown: true, type: "error", message: "Device invoice number must be provided." });
    }
    if (!spec) {
      return setShowToast({ isShown: true, type: "error", message: "Device specification must be provided." });
    }

    const deviceDetails = {
      assetTag,
      make,
      model,
      serial_no,
      spec,
      category,
      device_condition,
      status,
      warranty_end_date,
      invoice_id,
      purchaseValue,
      currentValue,
    };

    if (formType === "Add") {
      addDevice(deviceDetails, setShowToast);
    } else {
      const { id } = params;
      if (id) {
        updateDevice(id, deviceDetails, setShowToast);
      }
    }
  };

  //API CALL
  const getDeviceDetails = () => {
    const { id } = params;
    if (id) {
      getDevice(id, setFormData);
    }
  };

  useEffect(() => {
    getDeviceDetails();
    getAllInvoices(invoiceDispatch);
  }, []);

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
          <div className="col-span-2">
            <SelectInput label={"Manufacture"} value={make} options={deviceManufacture} optionName={"name"} isDisabled={false} setOnChange={setMake} onChoose={handleModel} />
          </div>
          <div className="col-span-2">
            <SelectInput label={"Model"} value={model} options={modelList} optionName={"name"} opisDisabled={false} setOnChange={setModel} />
          </div>

          <div className="col-span-3">
            <SelectInput label={"Category"} value={category} options={deviceCategory} optionName={"name"} isDisabled={false} setOnChange={setCategory} />
          </div>

          <div className="col-span-2">
            <TextInput label={"Serial Number"} value={serial_no} isDisabled={false} maxLength={12} setOnChange={setSerial_no} />
          </div>
          <div className="col-span-2">
            <TextInput label={"Asset Tag"} value={assetTag} isDisabled={false} maxLength={6} setOnChange={setAssetTag} />
          </div>

          <div className="col-span-2">
            <SelectInput label={"Status"} value={status} options={deviceStatus} optionName={"name"} isDisabled={false} setOnChange={setStatus} onChoose={() => {}} />
          </div>

          <div className="col-span-2">
            <SelectInput label={"Condition"} value={device_condition} options={deviceCondition} optionName={"name"} isDisabled={false} setOnChange={setDevice_Condition} onChoose={() => {}} />
          </div>

          <div className="col-span-2">
            <DateTimePicker label={"Warranty End Date"} value={warranty_end_date} setOnChange={setWarranty_End_date} />
          </div>

          <div className="col-span-3">
            <TextInput label={"Purchase Value"} value={purchaseValue} isDisabled={false} maxLength={10} setOnChange={setPurchaseValue} />
          </div>

          <div className="col-span-3">
            <TextInput label={"Current Value"} value={currentValue} isDisabled={false} maxLength={10} setOnChange={setCurrentValue} />
          </div>

          <div className="col-span-2">
            <InvoiceSelectInput
              label={"Invoice Number"}
              value={invoice_no}
              options={invoiceState?.invoiceList}
              optionName={"invoice_number"}
              isDisabled={false}
              setOnChange={setInvoice_no}
              onChoose={setInvoice_id}
            />
          </div>

          <div className="col-span-8">
            <TextArea label={"Specification"} value={spec} isDisabled={false} setOnChange={setSpec} />
          </div>
        </div>
        <div className="flex justify-end gap-5">
          <CancelButton
            onClick={() => {
              navigate("/devices");
            }}
          />

          {formType === "Add" ? <SubmitButton text={"Submit"} onClick={handleSubmit} /> : <SubmitButton text={"Update"} onClick={handleSubmit} />}
        </div>
      </div>
      <ToastMessage isShown={showToast.isShown} type={showToast.type} message={showToast.message} onClose={() => setShowToast({ isShown: false })} />
    </div>
  );
}

export default AddEditDevice;

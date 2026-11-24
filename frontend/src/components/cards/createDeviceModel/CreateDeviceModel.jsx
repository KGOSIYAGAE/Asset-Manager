import React, { useEffect, useState } from "react";
import CancelButton from "../../buttons/CancelButton";
import SubmitButton from "../../buttons/SubmitButton";
import TextInput from "../../inputs/textInput/TextInput";
import { useToast } from "../../../context/ToastContext";
import DeviceCategorySelectInput from "../../inputs/selectInputs/deviceCategorySelectInput/DeviceCategorySelectInput ";
import { createManufacturer, createModel, updateManufacturer, updateModel } from "../../../services/api/ICT Assets/ICTAssets";
import DeviceManufactureSelectInput from "../../inputs/selectInputs/deviceManufactureSelectInput/DeviceManufactureSelectInput ";

function CreateDeviceModel({ onCanel, onSubmit, modalType, modalData }) {
  const [modelName, setModelName] = useState();
  const [specification, setSpecification] = useState();
  const [manufacturer_id, setManufacturer_id] = useState();
  const [category_id, setCategory_id] = useState();
  const [model_id, setModel_id] = useState();

  const { showToast } = useToast();

  useEffect(() => {
    if (modalData) {
      setModelName(modalData.model_name);
      setManufacturer_id(modalData.manufacturer_id);
      setSpecification(modalData.specification);
      setModel_id(modalData.model_id);
      setCategory_id(modalData.category_id);
    }
  }, [modalData]);

  return (
    <div className="bg-white">
      <div className="flex flex-col gap-2 ">
        <span className="font-semibold p-2">Add Model</span>
        <div className="flex flex-col gap-3">
          {/** */}
          <div>
            <TextInput label={"Model Name"} value={modelName} isDisabled={false} maxLength={255} setOnChange={setModelName} type={"text"} />
          </div>

          {/** */}
          <div>
            <TextInput label={"Specification"} value={specification} isDisabled={false} maxLength={255} setOnChange={setSpecification} type={"text"} />
          </div>

          <div>
            <DeviceCategorySelectInput label={"Category Name"} category_id={category_id} isDisabled={false} setCategory_id={setCategory_id} />
          </div>
          <div>
            <DeviceManufactureSelectInput label={"Manufacture Name"} deviceMake_id={manufacturer_id} isDisabled={false} deviceCategory_id={category_id} setDeviceMake_id={setManufacturer_id} />
          </div>

          <div className="flex justify-end p-3 gap-8">
            <CancelButton onClick={onCanel} />
            {modalType && modalType === "add-model" ? (
              <SubmitButton
                text={"Add Model"}
                onClick={() => {
                  createModel({ model_name: modelName, specification: specification, manufacturer_id: manufacturer_id }, showToast);
                  onSubmit();
                }}
              />
            ) : (
              <SubmitButton
                text={"Update Model"}
                onClick={() => {
                  updateModel(model_id, { model_name: modelName, specification: specification, manufacturer_id: manufacturer_id }, showToast);
                  onSubmit();
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateDeviceModel;

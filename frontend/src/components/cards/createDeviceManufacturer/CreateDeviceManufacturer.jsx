import React, { useEffect, useState } from "react";
import CancelButton from "../../buttons/CancelButton";
import SubmitButton from "../../buttons/SubmitButton";
import TextInput from "../../inputs/textInput/TextInput";
import { useToast } from "../../../context/ToastContext";
import DeviceCategorySelectInput from "../../inputs/selectInputs/deviceCategorySelectInput/DeviceCategorySelectInput ";
import { createManufacturer, updateManufacturer } from "../../../services/api/ICT Assets/ICTAssets";

function CreateDeviceManufacturer({ onCanel, onSubmit, modalType, modalData }) {
  const [manufactureName, setManufactureName] = useState();
  const [manufactureDescription, setManufactureDescription] = useState();
  const [manufacturer_id, setManufacturer_id] = useState();
  const [category_id, setCategory_id] = useState();

  const { showToast } = useToast();

  useEffect(() => {
    if (modalData) {
      setManufactureName(modalData.manufacturer_name);
      setManufacturer_id(modalData.manufacturer_id);
      setManufactureDescription(modalData.description);
      setCategory_id(modalData.category_id);
    }
  }, [modalData]);

  return (
    <div className="bg-white">
      <div className="flex flex-col gap-2 ">
        <span className="font-semibold p-2">Add Manufacturer</span>
        <div className="flex flex-col gap-3">
          {/** */}
          <div>
            <TextInput label={"Manufacturer Name"} value={manufactureName} isDisabled={false} maxLength={255} setOnChange={setManufactureName} type={"text"} />
          </div>

          {/** */}
          <div>
            <TextInput label={"Manufacturer Description"} value={manufactureDescription} isDisabled={false} maxLength={255} setOnChange={setManufactureDescription} type={"text"} />
          </div>

          <div>
            <DeviceCategorySelectInput label={"Category Name"} category_id={category_id} isDisabled={false} setCategory_id={setCategory_id} />
          </div>

          <div className="flex justify-end p-3 gap-8">
            <CancelButton onClick={onCanel} />
            {modalType && modalType === "add-manufacturer" ? (
              <SubmitButton
                text={"Add Manufacturer"}
                onClick={() => {
                  createManufacturer({ manufacturer_name: manufactureName, description: manufactureDescription, category_id: category_id }, showToast);
                  onSubmit();
                }}
              />
            ) : (
              <SubmitButton
                text={"Update Manufacturer"}
                onClick={() => {
                  updateManufacturer(manufacturer_id, { manufacturer_name: manufactureName, description: manufactureDescription, category_id: category_id }, showToast);
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

export default CreateDeviceManufacturer;

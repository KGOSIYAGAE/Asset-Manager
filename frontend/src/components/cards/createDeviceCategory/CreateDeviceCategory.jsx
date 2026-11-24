import React, { useEffect, useState } from "react";
import CancelButton from "../../buttons/CancelButton";
import SubmitButton from "../../buttons/SubmitButton";
import TextInput from "../../inputs/textInput/TextInput";
import { createDepartment, updateDepartment } from "../../../services/api/organization/Organization";
import FacultySelectInput from "../../inputs/selectInputs/facultySelectInput/FacultySelectInput";
import { useToast } from "../../../context/ToastContext";
import { createCategory, updateCategory } from "../../../services/api/ICT Assets/ICTAssets";

function CreateDeviceCategory({ onCanel, onSubmit, modalType, modalData }) {
  const [categoryName, setCategoryName] = useState();
  const [deviceType, setDeviceType] = useState();
  const [category_id, setCategory_id] = useState();

  const { showToast } = useToast();

  useEffect(() => {
    if (modalData) {
      setCategoryName(modalData.category_name);
      setCategory_id(modalData.category_id);
      setDeviceType(modalData.device_type);
    }
  }, [modalData]);

  return (
    <div className="bg-white">
      <div className="flex flex-col gap-2 ">
        <span className="font-semibold p-2">Add Category</span>
        <div className="flex flex-col gap-5">
          {/** */}
          <div>
            <TextInput label={"Category Name"} value={categoryName} isDisabled={false} maxLength={255} setOnChange={setCategoryName} type={"text"} />
          </div>
          <div>
            <TextInput label={"Device Type"} value={deviceType} isDisabled={false} maxLength={255} setOnChange={setDeviceType} type={"text"} />
          </div>
          <div className="flex justify-end p-3 gap-8">
            <CancelButton onClick={onCanel} />
            {modalType && modalType === "add-category" ? (
              <SubmitButton
                text={"Add Category"}
                onClick={() => {
                  createCategory({ category_name: categoryName, device_type: deviceType }, showToast);
                  onSubmit();
                }}
              />
            ) : (
              <SubmitButton
                text={"Update Category"}
                onClick={() => {
                  updateCategory(category_id, { category_name: categoryName, device_type: deviceType }, showToast);
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

export default CreateDeviceCategory;

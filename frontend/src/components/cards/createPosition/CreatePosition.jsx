import React, { useEffect, useState } from "react";
import CancelButton from "../../buttons/CancelButton";
import SubmitButton from "../../buttons/SubmitButton";
import TextInput from "../../inputs/textInput/TextInput";
import { createDepartment, createPosition, updateDepartment, updatePosition } from "../../../services/api/organization/Organization";
import FacultySelectInput from "../../inputs/selectInputs/facultySelectInput/FacultySelectInput";
import DepartmentSelectInput from "../../inputs/selectInputs/departmentSelectInput/DepartmentSelectInput";
import SelectInput from "../../inputs/selectInputs/selectInput/SelectInput";

function CreatePosition({ onCanel, onSubmit, setShowToast, modalType, modalData }) {
  const [postionName, setPositionName] = useState();
  const [position_id, setPosition_id] = useState();
  const [postType, setPostType] = useState();
  const [department_id, setDepartment_id] = useState();
  const [faculty_id, setFaculty_id] = useState();

  const postTypes = [
    { id: 1, name: "ACADEMIC" },
    { id: 2, name: "ADMIN" },
  ];

  useEffect(() => {
    if (modalData) {
      setPositionName(modalData.post_name);
      setPosition_id(modalData.position_id);
      setPostType(modalData.post_type);
      setFaculty_id(modalData.faculty_id);
      setDepartment_id(modalData.department_id);
      console.log(modalData);
    }
  }, [modalData]);

  return (
    <div className="bg-white">
      <div className="flex flex-col gap-2 ">
        <span className="font-semibold p-2">Add Position</span>
        <div className="flex flex-col gap-5">
          {/** */}
          <div>
            <TextInput label={"Position Name"} value={postionName} isDisabled={false} maxLength={255} setOnChange={setPositionName} type={"text"} />
          </div>
          <div>
            <SelectInput label={"Position Type"} value={postType} options={postTypes} optionName={"post_type"} isDisabled={false} setOnChange={setPostType} />
          </div>
          <div>
            <FacultySelectInput label={"Faculty Name"} faculty_id={faculty_id} isDisabled={false} setFaculty_id={setFaculty_id} />
          </div>
          <div>
            <DepartmentSelectInput label={"Department Name"} department_id={department_id} faculty_id={faculty_id} isDisabled={false} setDepartment_id={setDepartment_id} />
          </div>
          <div className="flex justify-end p-3 gap-8">
            <CancelButton onClick={onCanel} />
            {modalType && modalType === "add-position" ? (
              <SubmitButton
                text={"Add Position"}
                onClick={() => {
                  createPosition({ post_name: postionName, post_type: postType, department_id: department_id }, setShowToast);
                  onSubmit();
                }}
              />
            ) : (
              <SubmitButton
                text={"Update Position"}
                onClick={() => {
                  updatePosition(position_id, { post_name: postionName, post_type: postType, department_id: department_id }, setShowToast);
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

export default CreatePosition;

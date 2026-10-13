import React, { useEffect, useState } from "react";
import CancelButton from "../../buttons/CancelButton";
import SubmitButton from "../../buttons/SubmitButton";
import TextInput from "../../inputs/textInput/TextInput";
import { createDepartment, updateDepartment } from "../../../services/api/organization/jobDetails";
import FacultySelectInput from "../../inputs/selectInputs/facultySelectInput/FacultySelectInput";

function CreateDepartment({ onCanel, onSubmit, setShowToast, modalType, modalData }) {
  const [departmentName, setDepartmentName] = useState();
  const [department_id, setDepartment_id] = useState();
  const [faculty_id, setFaculty_id] = useState();

  useEffect(() => {
    if (modalData) {
      setDepartmentName(modalData.department_name);
      setDepartment_id(modalData.department_id);
      setFaculty_id(modalData.faculty_id);
    }
  }, [modalData]);

  return (
    <div className="bg-white">
      <div className="flex flex-col gap-2 ">
        <span className="font-semibold p-2">Add Department</span>
        <div className="flex flex-col gap-5">
          {/** */}
          <div>
            <TextInput label={"Department Name"} value={departmentName} isDisabled={false} maxLength={255} setOnChange={setDepartmentName} type={"text"} />
          </div>
          <div>
            <FacultySelectInput label={"Faculty Name"} faculty_id={faculty_id} isDisabled={false} setFaculty_id={setFaculty_id} />
          </div>
          <div className="flex justify-end p-3 gap-8">
            <CancelButton onClick={onCanel} />
            {modalType && modalType === "add-department" ? (
              <SubmitButton
                text={"Add Department"}
                onClick={() => {
                  createDepartment({ department_name: departmentName, faculty_id: faculty_id }, setShowToast);
                  console.log();
                  onSubmit();
                }}
              />
            ) : (
              <SubmitButton
                text={"Update Department"}
                onClick={() => {
                  updateDepartment(department_id, { department_name: departmentName, faculty_id: faculty_id }, setShowToast);
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

export default CreateDepartment;

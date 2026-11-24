import React, { useEffect, useState } from "react";
import CancelButton from "../../buttons/CancelButton";
import SubmitButton from "../../buttons/SubmitButton";
import TextInput from "../../inputs/textInput/TextInput";
import { createFaculty, updateFaculty } from "../../../services/api/organization/Organization";
import SelectInput from "../../inputs/selectInputs/selectInput/SelectInput";
import { useToast } from "../../../context/ToastContext";

function CreateFaculty({ onCanel, onSubmit, modalType, modalData }) {
  const [facultyName, setFacultyName] = useState();
  const [facultyType, setFacultyType] = useState();
  const [faculty_id, setFaculty_id] = useState();

  const { showToast } = useToast();

  const options = [
    { id: 0, name: "Academic" },
    { id: 1, name: "Administration" },
  ];

  useEffect(() => {
    if (modalData) {
      setFacultyName(modalData.faculty_name);
      setFaculty_id(modalData.faculty_id);
      setFacultyType(modalData.faculty_type);
    }
  }, [modalData]);

  return (
    <div className="bg-white">
      <div className="flex flex-col gap-2 ">
        <span className="font-semibold p-2">Add Faculty</span>
        <div className="flex flex-col gap-3">
          {/** */}
          <div>
            <TextInput label={"Faculty Name"} value={facultyName} isDisabled={false} maxLength={255} setOnChange={setFacultyName} type={"text"} />
          </div>

          {/** */}
          <div>
            <SelectInput label={"Faculty Type"} value={facultyType} options={options} isDisabled={false} maxLength={255} setOnChange={setFacultyType} />
          </div>

          <div className="flex justify-end p-3 gap-8">
            <CancelButton onClick={onCanel} />
            {modalType && modalType === "add-faculty" ? (
              <SubmitButton
                text={"Add Faculty"}
                onClick={() => {
                  createFaculty({ faculty_name: facultyName, facultyType: facultyType }, showToast);
                  onSubmit();
                }}
              />
            ) : (
              <SubmitButton
                text={"Update Faculty"}
                onClick={() => {
                  updateFaculty(faculty_id, { faculty_name: facultyName, facultyType: facultyType }, showToast);
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

export default CreateFaculty;

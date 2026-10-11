import React, { useEffect, useState } from "react";
import CancelButton from "../../buttons/CancelButton";
import SubmitButton from "../../buttons/SubmitButton";
import TextInput from "../../inputs/textInput/TextInput";
import { createFaculty, updateFaculty } from "../../../services/api/jobDetails/jobDetails";

function CreateFaculty({ onCanel, onSubmit, setShowToast, modalType, modalData }) {
  const [facultyName, setFacultyName] = useState();
  const [faculty_id, setFaculty_id] = useState();

  useEffect(() => {
    if (modalData) {
      setFacultyName(modalData.faculty_name);
      setFaculty_id(modalData.faculty_id);
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
          <div className="flex justify-end p-3 gap-8">
            <CancelButton onClick={onCanel} />
            {modalType && modalType === "add-faculty" ? (
              <SubmitButton
                text={"Add Faculty"}
                onClick={() => {
                  createFaculty({ faculty_name: facultyName }, setShowToast);
                  onSubmit();
                }}
              />
            ) : (
              <SubmitButton
                text={"Update Faculty"}
                onClick={() => {
                  updateFaculty(faculty_id, { faculty_name: facultyName }, setShowToast);
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

import React, { useEffect, useState } from "react";
import CancelButton from "../../buttons/CancelButton";
import TextInput from "../../inputs/textInput/TextInput";
import { IoAddCircleSharp, IoCloseCircleOutline } from "react-icons/io5";
import SubmitButton from "../../buttons/SubmitButton";
import { getStudentDetails } from "../../../services/api/students/Students.Api";
import { getStaffDetails } from "../../../services/api/staff/Staff.Api";
import { sendFormWithEmail } from "../../../services/api/notification/notification.Api";

function ComposeEmail({ onCanel, user_id, form_type, device_id, setShowToast }) {
  const [emailReciever, setEmailReciver] = useState([]);
  const [emailInput, setEmailInput] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [userData, setUserData] = useState();

  const handleShowAdd = (value) => {
    if (value.length <= 0) {
      setShowAdd(false);
    } else {
      setShowAdd(true);
    }
  };

  const handleRemoveByValue = (valueToRemove) => {
    setEmailReciver((prevItems) =>
      // Keep only the items that do NOT match the value you want to delete
      prevItems.filter((item) => item !== valueToRemove),
    );
  };

  //Get Staff data
  const getUserData = () => {
    if (user_id.toString().length > 5) {
      getStudentDetails(user_id, setUserData);
    } else {
      getStaffDetails(user_id, setUserData);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    setEmailReciver([userData?.email]);
  }, [userData]);

  return (
    <div className="bg-white p-2 rounded-md">
      <div className="flex flex-col gap-2 -z-50">
        <span className="font-semibold p-2">Send Form Using Email</span>

        {/**/}
        <div>
          <div className="flex relative  bg-white border border-zinc-300 rounded-md p-2 text-sm">
            <span className="w-fit text-zinc-500 -mt-5 bg-white">To</span>
            <div className="flex gap-2">
              {emailReciever &&
                emailReciever.map((email, id) => (
                  <div key={id} className="w-fit flex items-center p-2 gap-2 border border-red-500 rounded-full">
                    <span>{email}</span>
                    <div
                      onClick={() => {
                        handleRemoveByValue(email);
                      }}
                    >
                      <IoCloseCircleOutline size={18} />
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex items-center ">
              <input
                type={"text"}
                className="w-[200px] outline-none  p-2"
                maxLength={50}
                disabled={false}
                value={emailInput}
                autoFocus
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  handleShowAdd(e.target.value);
                }}
              />
              <div
                className={showAdd === true ? "" : "opacity-0"}
                onClick={() => {
                  setEmailReciver([...emailReciever, emailInput]);
                }}
              >
                <IoAddCircleSharp size={18} className="text-blue-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-3 gap-8">
          <SubmitButton
            text={"Send Email"}
            onClick={() => {
              const emailData = {
                user_id: user_id,
                device_id: device_id,
                formType: form_type,
                emailReciever: emailReciever,
              };

              console.log(emailData);

              sendFormWithEmail(emailData, setShowToast);
            }}
          />
          <CancelButton onClick={onCanel} />
        </div>
      </div>
    </div>
  );
}

export default ComposeEmail;

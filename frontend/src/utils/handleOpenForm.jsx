//Handle Open  form
export const handleOpenForm = (transaction, setOpenModal, setShowToast) => {
  //let user_Id = deviceDetails?.current_user_id.toString();
  let userType;
  let formType;
  let formData = null;

  /*if (user_Id?.length > 5) {
    userType = "Student";
  } else {
    userType = "Staff";
  }

  if (userType === "Staff" && deviceDetails?.status === "Assigned") {
    formType = "Staff-Issue";
  } else if (userType === "Student" && deviceDetails?.status === "Assigned") {
    formType = "Student-Issue";
  } else {
    formType = "Loan-Issue";
  }*/

  try {
    if (!transaction) {
      return console.log("Device Transaction details not recieved.");
    }

    let user_Id = transaction?.user_id.toString();

    if (user_Id?.length > 5) {
      userType = "Student";
    } else {
      userType = "Staff";
    }

    if (userType === "Staff" && transaction?.status === "Assigned") {
      formType = "Staff-Issue";
    } else if (userType === "Student" && transaction?.status === "Assigned") {
      formType = "Student-Issue";
    } else if (transaction?.status === "Loaned") {
      formType = "Loan-Issue";
    } else if (transaction?.status === "Returned") {
      formType = "Return-form";
      formData = transaction;
    } else {
      return setShowToast({ isShow: true, type: null, message: "The device needs to be approved first." });
    }

    return setOpenModal({ isShown: true, type: formType, data: formData });
  } catch (error) {
    return console.log(error + ": Provided status does not match requirements");
  }
};

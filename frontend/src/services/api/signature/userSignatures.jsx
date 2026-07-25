import axiosInstance from "../../../utils/axiosInstance";

export const getUserSignature = async (user_id, setSignature) => {
  if (!user_id) {
    return console.log("Staff number must be provided");
  }

  try {
    const response = await axiosInstance.get("/signatures/" + user_id, { showSpinner: true });

    if (response.data && response.data.signatureList) {
      return setSignature(response.data.signatureList[0].image_base64);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again.");
    }
  }
};

export const getIssureApproverSignature = async (data) => {
  if (!data.device_serial_number || !data.status) {
    return console.log("Staff number must be provided");
  }

  try {
    const response = await axiosInstance.get("/signatures/issuer-approver-signature", { params: data, showSpinner: true });

    if (response.data && response.data.signatures) {
      return response.data.signatures;
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again.");
    }
  }
};

export const setUserSignature = async (user_id, image_base64) => {
  if (!user_id) {
    return console.log("User ID must be provided");
  }

  if (!image_base64) {
    return console.log("Image base 64 fomart must be provided");
  }

  const data = {
    user_id,
    image_base64,
  };

  try {
    const response = await axiosInstance.post("/signatures/create-signature", data, { showSpinner: true });
    if (response.data) {
      return console.log(response.data.message);
    }
  } catch (error) {
    if (error.response.data && error.response.data.message) {
      return console.log(error.response.data.message);
    } else {
      console.log(error.response);
      return console.log("An unexpected error occured, please try again");
    }
  }
};

//add device api
export const addDevice = async (deviceData, setShowToast) => {};

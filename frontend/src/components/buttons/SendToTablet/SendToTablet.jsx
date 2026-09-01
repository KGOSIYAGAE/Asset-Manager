import React, { useState } from "react";
import SubmitButton from "../SubmitButton";
import { getSession } from "../../../services/api/testApi/Test.Api";
import { getLoggedInUser } from "../../../utils/getLoggedInUser";
import { socket } from "../../../utils/socket";

function SendToTablet({ btnLable, userId, deviceId, formType, returnDate, setShowQrCode, setQrCodeURL }) {
  const [session, setSession] = useState(null);

  const startSigningSession = async () => {
    try {
      const data = await getSession();

      setSession(data);

      const user = getLoggedInUser();

      const BASE_URL = process.env.NODE_ENV === "production" ? "http://10.10.4.186" : `http://192.168.8.4:5173`;

      if (deviceId && returnDate) {
        setQrCodeURL(` ${BASE_URL}/sign-form/${formType}/${userId}/${deviceId}/${user.id}/${returnDate}/${data.sessionId}/${data.tempToken}`);
      } else if (deviceId && user.id) {
        setQrCodeURL(` ${BASE_URL}/sign-form/${formType}/${userId}/${deviceId}/${user.id}/${data.sessionId}/${data.tempToken}`);
      } else if (deviceId) {
        setQrCodeURL(` ${BASE_URL}/sign-form/${formType}/${deviceId}/${data.sessionId}/${data.tempToken}`);
      } else {
        setQrCodeURL(` ${BASE_URL}/sign-form/${userId}/${data.sessionId}/${data.tempToken}`);
      }

      setShowQrCode(true);
      socket.connect();

      if (!data.sessionId) {
        return console.log("session id not provided");
      }

      socket.emit("join_session", data.sessionId);

      return console.log("session created");
    } catch (error) {
      console.error("Failed creating session", error);
    }
  };

  return (
    <>
      <SubmitButton text={btnLable} onClick={startSigningSession} />
    </>
  );
}

export default SendToTablet;

import React, { useEffect, useState } from "react";
import QrCodeCard from "../qrCodeCard/QrCodeCard";
import CancelButton from "../../buttons/CancelButton";
import OpenSecondScreenButton from "../../buttons/OpenSecondScreenButton/OpenSecondScreenButton";
import SendToTablet from "../../buttons/SendToTablet/SendToTablet";
import { socket } from "../../../utils/socket";

function BlankCard({ onCanel, onSubmit, userId }) {
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrCodeURL, setQrCodeURL] = useState(null);
  const [isSigned, setIsSigned] = useState(false);

  useEffect(() => {
    if (!socket.connected) {
      console.log("not connected");
      socket.connect();
    }

    // Debug check: Verify the laptop is physically hearing events
    console.log("Laptop listening for signature_saved event...");

    socket.on("signature_saved", (image) => {
      //setSignature(image.image);
      setIsSigned(true);
      onSubmit();
      socket.disconnect();
    });

    return () => {
      socket.off("signature_saved");
    };
  }, []);

  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-md border ">
      {showQrCode && showQrCode ? (
        <div className="flex flex-col items-center p-2">
          <QrCodeCard text={qrCodeURL} size={250} />
          <div>
            <CancelButton onClick={onCanel} />
          </div>
        </div>
      ) : (
        <div className="flex gap-3">
          <div>
            <SendToTablet btnLable={"Captuer with Tablet (Wireless)"} userId={userId} deviceId={null} formType={null} setShowQrCode={setShowQrCode} setQrCodeURL={setQrCodeURL} />
          </div>
          <OpenSecondScreenButton btnLable={"Capture with USB Tablet"} userId={userId} deviceId={null} setShowToast={null} />
        </div>
      )}
    </div>
  );
}

export default BlankCard;

import React from "react";
import SendToTablet from "../../buttons/SendToTablet/SendToTablet";
import OpenSecondScreenButton from "../../buttons/OpenSecondScreenButton/OpenSecondScreenButton";

function CaptureSignatureCard({ userId, onSubmit, setShowQrCode, setQrCodeURL }) {
  return (
    <div className="flex gap-5">
      <SendToTablet btnLable={"Captuer with Tablet (Wireless)"} userId={userId} deviceId={null} formType={null} setShowQrCode={setShowQrCode} setQrCodeURL={setQrCodeURL} onSubmit={onSubmit} />
      <OpenSecondScreenButton btnLable={"Capture with USB Tablet"} userId={userId} deviceId={null} setShowToast={null} />
    </div>
  );
}

export default CaptureSignatureCard;

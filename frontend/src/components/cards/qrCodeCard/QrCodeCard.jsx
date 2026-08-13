import React, { useEffect, useState } from "react";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { MdOutlineFacebook } from "react-icons/md";

import { QRCodeSVG } from "qrcode.react";

function QrCodeCard({ title, text, size }) {
  useEffect(() => {
    console.log(text);
  }, [text]);

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 ">
      <span className="font-semibold text-sm">{title}</span>

      <div className="flex bg-white p-5">
        <QRCodeSVG
          value={text}
          size={size}
          fgColor="#000000"
          bgColor="#ffffff"
          level="H" // Error correction level: L, M, Q, H
        />
      </div>
    </div>
  );
}

export default QrCodeCard;

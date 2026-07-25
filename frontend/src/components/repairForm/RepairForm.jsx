import React from "react";

function RepairForm() {
  return (
    <div className="printable p-2 h-[1000px]">
      <div class="page-header ">
        <img src="/SPU-logo-1024x1024.jpg" alt="spu logo" class="page-logo" />
        <div class="page-address">
          <span class="address-heading">SOL PLAATJE UNIVERSITY</span>
          <span class="address-text">Private Bag X 5008, Kimberly, 8300</span>
          <span class="address-text">Luka Jantjie House, Chapel Street,</span>
          <span class="address-text">Kimberly</span>
          <span class="address-text">Tel: 053 491 0000</span>
          <span class="address-text">
            <a href="http://spu.ac.za">www.spu.ac.za</a>
          </span>
        </div>
      </div>
      {/** */}
      <div className="flex flex-col gap-5 p-5">
        <div className="w-full border border-black">
          <div className="flex items-center justify-center  p-2 ">
            <span className="font-bold text-xl">LAPTOP REPAIR INTAKE FORM</span>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <span>
            Repair No: <b>MNT000050</b>
          </span>
        </div>
      </div>
      {/** */}
    </div>
  );
}

export default RepairForm;

import React, { useEffect } from "react";
import { handleTimeStampToText } from "../../../utils/dateConverter";

function RejectionDetails({ transaction }) {
  useEffect(() => {
    console.log(transaction);
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-2 -z-50 bg-white p-2 rounded-md">
        <span className="font-semibold p-2">Device Rejection Details</span>

        <div className="flex flex-col border-t-2 border-b-2 py-5 gap-5">
          <div className="flex flex-col  p-2 gap-3 rounded-md">
            <span className="text-sm"></span>
            <div className="flex  gap-2">
              <span className=" text-sm font-semibold">Rejected by:</span>
              <span className="text-sm">{transaction?.rejected_by}</span>
            </div>

            <div className="flex  gap-2">
              <span className=" text-sm font-semibold">Date rejected:</span>
              <span className="text-sm">
                {(() => {
                  return handleTimeStampToText(transaction?.rejection_date);
                })()}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className=" text-sm font-semibold">Rejection reason:</span>
              <span className="text-sm">{transaction?.rejection_reason}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-3 gap-8"></div>
      </div>
    </div>
  );
}

export default RejectionDetails;

import React from "react";
import { MdCloudUpload } from "react-icons/md";
import { MdClose } from "react-icons/md";

function ImportFile({ onClose }) {
  return (
    <div>
      <span
        className="flex justify-end"
        onClick={() => {
          onClose();
        }}
      >
        <MdClose size={25} className="text-red-500" />
      </span>
      <div className="flex flex-col items-center justify-center p-2 gap-5">
        <span className="text-gray-500">Upload file</span>
        <div className="w-11/12 p-2 border rounded-md">
          <input type="file" name="" id="" />
        </div>
        <button className="primary-btn gap-5" onClick={() => onClick()}>
          <MdCloudUpload size={25} />
          UPLOAD
        </button>
      </div>
    </div>
  );
}

export default ImportFile;

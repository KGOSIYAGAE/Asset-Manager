import React, { useState } from "react";
import { MdFileDownload, MdOutlineHelpOutline } from "react-icons/md";
import { MdClose } from "react-icons/md";
import CancelButton from "../../buttons/CancelButton";

import ToastMessage from "../../toastMessage/ToastMessage";
import { bulkCreateDevices } from "../../../utils/bulkImport";

function ImportFile({ type, setShowToast, onClose }) {
  const [isDrag, setIsDrag] = useState(false);
  const [file, setFiles] = useState([]);

  //Read Excel file
  const handleUploadFile = (file) => {
    if (type === "devices") {
      return bulkCreateDevices(file, setShowToast, onClose);
    }

    if (type === "staff") {
      return console.log(type);
    }

    if (type === "students") {
      return console.log(type);
    }
  };

  //Drag and drop file
  const onFileDrop = (event) => {
    event.preventDefault();

    const droppedFile = event.dataTransfer.files;
    setFiles([...droppedFile]);
    setIsDrag(false);
  };

  //Select file
  const handleSelectFile = (event) => {
    const selectedFile = event.target.files;
    setFiles([...selectedFile]);
  };

  //Convert file size
  const getFileSize = (size) => {
    if ((size > 10) & (size < 1000)) {
      return `${Math.round(size)} B`;
    }

    if ((size > 1000) & (size < 1000000)) {
      return `${Math.round(size / 1024)} KB`;
    }

    if ((size > 1000000) & (size < 10000000)) {
      return `${Math.round((size / 1024) * 1024)} MB`;
    }
  };

  //Remove file
  const onRemoveFile = () => {
    setFiles([]);
  };

  //on Download Template
  const onDownloadTemplate = () => {};

  return (
    <div>
      <div className="flex flex-col p-2 gap-7">
        <div className="flex justify-between">
          <span className="text-xl font-semibold">Upload file</span>
          <MdClose
            size={25}
            className="text-slate-500"
            onClick={() => {
              onClose();
            }}
          />
        </div>
        <div
          className={`h-[240px] border-dashed border-2 ${isDrag ? "border-blue-500 bg-blue-50" : "border-slate-300"} rounded-md relative`}
          onDrop={(event) => {
            onFileDrop(event);
          }}
          onDragOver={(event) => {
            setIsDrag(true);
            event.preventDefault();
          }}
          onDragLeave={(event) => {
            setIsDrag(false);
            event.preventDefault();
          }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center ">
            <img src="\public\upload-file.png" className="w-[80px]" alt="" />
            <div className="flex gap-1">
              <input type="file" name="" id="browseFile" className="" hidden accept=".xls, xlsx" onChange={(event) => handleSelectFile(event)} />
              <span>Drag and Drop file here or</span>
              <label htmlFor="browseFile" className="font-semibold underline">
                Choose file
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-between text-sm text-slate-500">
          <span className="">Supported formats: XLS, XLSX</span>
          <span>Maximum size: 25 MB</span>
        </div>
        {/**/}
        {file.length > 0 ? (
          <div className="bg-slate-50 flex justify-between rounded-md p-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <div className="flex bg-white rounded-md  gap-3 p-2">
                  <img src="\public\excel-48.png" alt="" className="w-[30px]" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{file[0]?.name}</span>
                    {file[0]?.size > 250000 ? (
                      <span className="text-sm text-red-500">File must be less than 25 MB</span>
                    ) : (
                      <span className="text-sm text-slate-400">{file[0] ? getFileSize(file[0].size) : ""}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-center">
              <MdClose
                size={25}
                className="text-slate-500"
                onClick={() => {
                  onRemoveFile();
                }}
              />
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 flex justify-between rounded-md p-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-md p-2">
                  <img src="\public\excel-48.png" alt="" className="w-[30px]" />
                </div>
                <span className="text-sm font-semibold">Table Example</span>
              </div>
              <span className="text-slate-500">You can download the attached example and use them as a starting point for your own file.</span>
            </div>
            <div className=" flex items-center justify-center">
              <button className="bg-white border  rounded-md p-2">Download</button>
            </div>
          </div>
        )}
        {/**/}
        <div className="flex justify-between">
          <div className="flex items-center text-sm text-slate-500 gap-2">
            <MdOutlineHelpOutline size={20} />
            <span>Help Center</span>
          </div>
          <div className="flex gap-3">
            <CancelButton onClick={onClose} />
            <button
              type="submit"
              className="bg-blue-900 text-white px-8 rounded-md"
              onClick={() => {
                handleUploadFile(file);
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImportFile;

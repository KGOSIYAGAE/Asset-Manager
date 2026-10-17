import React, { useEffect, useState, version } from "react";
import CancelButton from "../../buttons/CancelButton";
import SubmitButton from "../../buttons/SubmitButton";
import TextInput from "../../inputs/textInput/TextInput";
import PasswordInput from "../../inputs/textInput/PasswordInput";
import { createAzureGraphSettings, updateAzureGraphSettings } from "../../../services/api/email/emailSettings";
import TextArea from "../../inputs/textArea/TextArea";
import { IoMdClose } from "react-icons/io";
import { MdPreview } from "react-icons/md";
import DcoumentPreview from "../documentTemplatePreview/DcoumentPreview";
import { createTemplate, updateTemplate } from "../../../services/api/documentTemplates/documentTemplates";

function AddEditDocumentTemplate({ onCancel, onSubmit, selectedDocument, setShowToast }) {
  const [documentName, setDocumentName] = useState();
  const [documentVersion, setDocumentVersion] = useState();
  const [documentTemplate, setDocumentTemplate] = useState();
  const [showPreview, setShowPreview] = useState(false);

  const setForm = () => {
    setDocumentName(selectedDocument?.name);
    setDocumentVersion(selectedDocument?.version);
    setDocumentTemplate(selectedDocument?.template_content);
  };

  const handleCreateUpdateTemplate = () => {
    if (!documentName) {
      return setShowToast({ isShown: true, type: "error", message: "Document name must be provided." });
    }

    if (!documentVersion) {
      return setShowToast({ isShown: true, type: "error", message: "Document version must be provided." });
    }

    if (!documentTemplate) {
      return setShowToast({ isShown: true, type: "error", message: "Document template must be provided." });
    }

    if (selectedDocument) {
      updateTemplate(selectedDocument?.document_id, { name: documentName, version: documentVersion, template_content: documentTemplate }, setShowToast);
    } else {
      createTemplate({ name: documentName, version: documentVersion, template_content: documentTemplate }, setShowToast);
    }

    return onSubmit();
  };

  useEffect(() => {
    setForm();
  }, []);

  const handlePreview = () => {
    if (showPreview) {
      setShowPreview(false);
    } else {
      setShowPreview(true);
    }
  };

  return (
    <div className="flex gap-2 items-center justify-center overflow-auto">
      {showPreview && showPreview ? (
        <DcoumentPreview documentTemplate={documentTemplate} showPreview={showPreview} setShowPreview={setShowPreview} />
      ) : (
        <div className="w-[900px] flex flex-col gap-3  bg-white rounded-md p-5">
          <span className="heading-text ">Document Upate</span>
          <div className="flex flex-col gap-5 border-t pt-5">
            <TextInput label={"Document Name"} value={documentName} isDisabled={false} setOnChange={setDocumentName} type={"text"} />
            <TextInput label={"Document Version"} value={documentVersion} isDisabled={false} setOnChange={setDocumentVersion} type={"text"} />
            <TextArea label={"Document HTML & CSS"} value={documentTemplate} isDisabled={false} document={true} setOnChange={setDocumentTemplate} type={"text"} />
          </div>
          <div className="flex justify-end  border-gray-200  pt-3 gap-3">
            <CancelButton onClick={onCancel} />{" "}
            {documentTemplate && (
              <button
                className="flex  text-sm items-center bg-blue-400 text-white py-2 px-5 gap-1 rounded-md hover:bg-blue-500"
                onClick={() => {
                  handlePreview();
                }}
              >
                <MdPreview size={20} />
                <span>Preview</span>
              </button>
            )}
            <SubmitButton
              text={`${selectedDocument && selectedDocument ? "Update" : "Save"}`}
              onClick={() => {
                handleCreateUpdateTemplate();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AddEditDocumentTemplate;

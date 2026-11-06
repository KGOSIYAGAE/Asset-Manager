import React, { useEffect, useState } from "react";
import CancelButton from "../../buttons/CancelButton";
import SubmitButton from "../../buttons/SubmitButton";
import TextInput from "../../inputs/textInput/TextInput";
import TextArea from "../../inputs/textArea/TextArea";
import { MdPreview } from "react-icons/md";
import DcoumentPreview from "../documentTemplatePreview/DcoumentPreview";
import { createEmailTemplate, updateEmailTemplate } from "../../../services/api/emailTemplates/emailTemplates";
import { useToast } from "../../../context/ToastContext";

function AddEditEmailTemplate({ onCancel, onSubmit, selectedDocument }) {
  const [documentName, setDocumentName] = useState();
  const [documentVersion, setDocumentVersion] = useState();
  const [documentTemplate, setDocumentTemplate] = useState();
  const [showPreview, setShowPreview] = useState(false);

  const { showToast } = useToast();

  const setForm = () => {
    setDocumentName(selectedDocument?.name);
    setDocumentVersion(selectedDocument?.version);
    setDocumentTemplate(selectedDocument?.template_content);
  };

  const handleCreateUpdateTemplate = () => {
    if (!documentName) {
      return showToast("Document name must be provided.", "error");
    }

    if (!documentVersion) {
      return showToast("Document version must be provided.", "error");
    }

    if (!documentTemplate) {
      return showToast("Document template must be provided.", "error");
    }

    if (selectedDocument) {
      updateEmailTemplate(selectedDocument?.template_id, { name: documentName, version: documentVersion, template_content: documentTemplate }, showToast);
      console.log(selectedDocument);
    } else {
      createEmailTemplate({ name: documentName, version: documentVersion, template_content: documentTemplate }, showToast);
      console.log("Add");
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
    <div className="flex gap-2 items-center justify-center ">
      {showPreview && showPreview ? (
        <DcoumentPreview documentTemplate={documentTemplate} showPreview={showPreview} setShowPreview={setShowPreview} />
      ) : (
        <div className="w-[900px] flex flex-col gap-3  bg-white rounded-md p-5">
          <span className="heading-text ">{`${selectedDocument && selectedDocument ? "Update Document" : "Add Document"}`}</span>
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

export default AddEditEmailTemplate;

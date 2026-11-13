import React, { useEffect, useState } from "react";
import CancelButton from "../../buttons/CancelButton";
import SubmitButton from "../../buttons/SubmitButton";
import TextInput from "../../inputs/textInput/TextInput";
import TextArea from "../../inputs/textArea/TextArea";
import { MdPreview } from "react-icons/md";
import DcoumentPreview from "../documentTemplatePreview/DcoumentPreview";
import { useToast } from "../../../context/ToastContext";
import { createDisclaimerTemplate, updateDisclaimerTemplate } from "../../../services/api/desclaimerTemplates/desclaimerTemplates.Api";

function AddEditDisclaimerTemplate({ onCancel, onSubmit, selectedDocument }) {
  const [disclaimerName, setDisclaimerName] = useState();
  const [disclaimerVersion, setDisclaimerVersion] = useState();
  const [disclaimerTemplate, setDisclaimerTemplate] = useState();
  const [showPreview, setShowPreview] = useState(false);

  const { showToast } = useToast();

  const setForm = () => {
    setDisclaimerName(selectedDocument?.name);
    setDisclaimerVersion(selectedDocument?.version);
    setDisclaimerTemplate(selectedDocument?.template_content);
  };

  const handleCreateUpdateTemplate = () => {
    if (!disclaimerName) {
      return showToast("Disclaimer name must be provided.", "error");
    }

    if (!disclaimerVersion) {
      return showToast("Disclaimer version must be provided.", "error");
    }

    if (!disclaimerTemplate) {
      return showToast("Disclaimer template must be provided.", "error");
    }

    if (selectedDocument) {
      updateDisclaimerTemplate(selectedDocument?.template_id, { name: disclaimerName, version: disclaimerVersion, template_content: disclaimerTemplate }, showToast);
      console.log("Update");
    } else {
      createDisclaimerTemplate({ name: disclaimerName, version: disclaimerVersion, template_content: disclaimerTemplate }, showToast);
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
        <DcoumentPreview documentTemplate={disclaimerTemplate} showPreview={showPreview} setShowPreview={setShowPreview} />
      ) : (
        <div className="w-[900px] flex flex-col gap-3  bg-white rounded-md p-5">
          <span className="heading-text ">{`${selectedDocument && selectedDocument ? "Update Disclaimer" : "Add Disclaimer"}`}</span>
          <div className="flex flex-col gap-5 border-t pt-5">
            <TextInput label={"Disclaimer Name"} value={disclaimerName} isDisabled={false} setOnChange={setDisclaimerName} type={"text"} />
            <TextInput label={"Disclaimer Version"} value={disclaimerVersion} isDisabled={false} setOnChange={setDisclaimerVersion} type={"text"} />
            <TextArea label={"Disclaimer HTML & CSS"} value={disclaimerTemplate} isDisabled={false} document={true} setOnChange={setDisclaimerTemplate} type={"text"} />
          </div>
          <div className="flex justify-end  border-gray-200  pt-3 gap-3">
            <CancelButton onClick={onCancel} />{" "}
            {disclaimerTemplate && (
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

export default AddEditDisclaimerTemplate;

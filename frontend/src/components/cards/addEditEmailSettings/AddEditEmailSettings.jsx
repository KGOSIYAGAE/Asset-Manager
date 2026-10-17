import React, { useEffect, useState } from "react";
import CancelButton from "../../buttons/CancelButton";
import SubmitButton from "../../buttons/SubmitButton";
import TextInput from "../../inputs/textInput/TextInput";
import PasswordInput from "../../../components/inputs/textInput/PasswordInput";
import { createAzureGraphSettings, updateAzureGraphSettings } from "../../../services/api/email/emailSettings";

function AddEditEmailSettings({ onCancel, onSubmit, mailerName, msGraphSettings, setShowToast }) {
  const [clientId, setClientId] = useState();
  const [tenantId, setTenantId] = useState();
  const [clientSecret, setClientSecret] = useState();
  const [isSecretSet, setIsSecretSet] = useState(false);
  const [senderEmail, setSenderEmail] = useState();
  const [scopes, setScopes] = useState();

  const setForm = (msGraphSettings) => {
    setClientId(msGraphSettings?.clientId);
    setTenantId(msGraphSettings?.tenantId);
    setIsSecretSet(msGraphSettings?.isSecretSet);
    setSenderEmail(msGraphSettings?.senderEmail);
    setScopes(msGraphSettings?.scopes);
  };

  const handleCreateUpdateAzureGraphSettings = () => {
    if (!clientId) {
      return setShowToast({ isShown: true, type: "error", message: "Client ID must be provided." });
    }

    if (!tenantId) {
      return setShowToast({ isShown: true, type: "error", message: "Tenant ID must be provided." });
    }

    if (!msGraphSettings && !clientSecret) {
      return setShowToast({ isShown: true, type: "error", message: "Client Secret must be provided." });
    }

    if (!scopes) {
      return setShowToast({ isShown: true, type: "error", message: "Scopes URL must be provided." });
    }

    if (!senderEmail) {
      return setShowToast({ isShown: true, type: "error", message: "Sender Email must be provided." });
    }

    if (msGraphSettings) {
      updateAzureGraphSettings(msGraphSettings?.configId, { clientId, tenantId, clientSecret, scopes, senderEmail }, setShowToast);
    } else {
      createAzureGraphSettings({ clientId, tenantId, clientSecret, scopes, senderEmail }, setShowToast);
    }

    return onSubmit();
  };

  useEffect(() => {
    setForm(msGraphSettings);
  }, []);

  return (
    <div className="flex flex-col gap-3 p-2">
      <span className="heading-text ">{mailerName}</span>
      <div className="flex flex-col gap-5 border-t pt-5">
        <TextInput label={"Client ID"} value={clientId} isDisabled={false} setOnChange={setClientId} type={"text"} />
        <TextInput label={"Tenant ID"} value={tenantId} isDisabled={false} setOnChange={setTenantId} type={"text"} />
        <TextInput
          label={"Client Secret"}
          value={clientSecret}
          isDisabled={false}
          placeHolder={msGraphSettings && msGraphSettings ? "Secret has been stored, type here to update" : ""}
          setOnChange={setClientSecret}
          type={"password"}
        />
        <TextInput label={"Scopes"} value={scopes} isDisabled={false} setOnChange={setScopes} type={"text"} />
        <TextInput label={"From Email Address"} value={senderEmail} isDisabled={false} setOnChange={setSenderEmail} type={"text"} />
      </div>
      <div className="flex justify-end  border-gray-200  pt-3 gap-3">
        <CancelButton onClick={onCancel} />{" "}
        <SubmitButton
          text={`${msGraphSettings ? "Update" : "Save"}`}
          onClick={() => {
            handleCreateUpdateAzureGraphSettings();
          }}
        />
      </div>
    </div>
  );
}

export default AddEditEmailSettings;

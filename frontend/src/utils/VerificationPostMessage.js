//Handle postMessage
export const postMessage = (message) => {
  if (window.opener) {
    window.opener.postMessage({ type: "form_submitted", payload: message }, window.location.origin);
  }

  window.close();
};

//Handle postMessage
export const postMessageSiganture = () => {
  if (window.opener) {
    window.opener.postMessage({ type: "form_submitted_signature", payload: `Signature has been updated` }, window.location.origin);
  }

  window.close();
};

//Handle postMessage
export const postMessageDeviceLoan = (message) => {
  if (window.opener) {
    window.opener.postMessage({ type: "device_loaned", payload: message }, window.location.origin);
  }

  window.close();
};

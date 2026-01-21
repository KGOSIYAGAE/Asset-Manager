//Handle postMessage
export const postMessage = (name, surname) => {
  if (window.opener) {
    window.opener.postMessage({ type: "form_submitted", payload: `Device issued to ${name} ${surname}` }, window.location.origin);
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

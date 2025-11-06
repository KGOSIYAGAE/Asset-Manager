//Handle postMessage
export const postMessage = (name, surname) => {
  if (window.opener) {
    window.opener.postMessage({ type: "form_submitted", payload: `Device issued to ${name} ${surname}` }, window.location.origin);
  }

  window.close();
};

import React from "react";

function SubmitButton({ handleSubmit }) {
  return (
    <button className="primary-btn" onClick={() => handleSubmit()}>
      Submit
    </button>
  );
}

export default SubmitButton;
